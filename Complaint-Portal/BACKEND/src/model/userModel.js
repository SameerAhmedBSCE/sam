import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    firstname: {
        type: String,
        default : ""
    },
    lastname: {
        type: String,
        default : ""
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email must be unique'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    number : {
        type : String,
    },
    password : {
        type : String,
        minlength: [6, 'Password must be at least 6 characters long'],
        required: true
    },
    long: { type: Number, },
    lat: { type: Number, },
    address: { type: String, },
    role: { type: String,
        default: "admin"
    },
    otp:{
        type : Number,
        default : 0
    },
    verificationToken:{
        type : String,
        default : ""
    },
},{
    timestamps : true
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)