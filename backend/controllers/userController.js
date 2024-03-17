import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });
import User from "../models/userModel.js";
import sendTocken from "../utils/saveCoockie.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

async function register(req, res) {
    let myCloud;
    try {
        console.log(req.body.avatar);
        myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,
            {
                folder: "avatars",
                width: 150,
                crop: "scale"
            });

        const { name, email, password } = req.body;
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });
        sendTocken(user, res);
    } catch (err) {
        await cloudinary.uploader.destroy(myCloud.public_id);
        if (err.code == 11000)
            res.json({ success: false, message: "user alredy exits login" });
        else if (err.message == "User validation failed: email: Please Enter a valid Email") {
            res.json({ success: false, message: "please enter valid e mail" });
        } else {
            res.json({ success: false, message: err.message });
        }
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).select("+password").exec();
        if (!user) {
            res.json({
                success: false,
                message: "email dosent exist please register"
            });
        } else {
            const isPasswordMatched = await user.comparePassword(password);
            if (!isPasswordMatched) {
                res.json({
                    success: false,
                    message: "incorrect password"
                });
            } else {
                sendTocken(user, res);
            }
        }
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
}

async function logout(req, res) {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({ success: true, message: "logged out successfully" });
}

async function fergotPassword(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(res.json({ success: false, message: "the user dosent exist please create account" }));
    } else {
        const resetToken = await user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
        // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
        const message = `your password reset token is \n\n${resetPasswordUrl} \n\nif you have not requsted this email then, please ignore it`;
        try {
            await sendEmail({
                email: user.email,
                subject: "Ecommerse Password Recovery",
                message: message
            });
            res.json({ success: true, message: `email sent to ${user.email} successfully` });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(res.json({ success: false, message: error.message }));
        }
    }
}

async function resetPassword(req, res, next) {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: resetPasswordToken });
    if (!user) {
        return next(res.json({ success: false, message: "the time has been expired or token is invalid" }));
    } else {
        if (req.body.password !== req.body.confirmPassword) {
            return next(res.json({ success: false, message: "the password dosent match" }));
        } else {
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            sendTocken(user, res);
        }
    }
}

async function getUserDetails(req, res, next) {
    try {
        const user = await User.findById(req.user._id);
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, user:undefined });
    }
}

async function updatePassword(req, res, next) {
    const user = await User.findById(req.user._id).select("+password");
    if (!user.comparePassword(req.body.oldPassword)) {
        return next(res.json({ message: "the passwords did not match", success: false }));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(res.json({ success: false, message: "the new password conform password did not match" }));
    }
    if (req.body.newPassword.length < 8) {
        return next(res.json({ success: false, message: "the password legth should be 8 charactors long" }));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTocken(user, res);
}

async function updateProfile(req, res, next) {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };
    if (req.body.avatar != "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndMofify: false
    });
    res.json({ success: true, user });
}


async function getAllUsers(req, res, next) {
    const users = await User.find();
    res.json({ success: true, users });
}

async function getSingleUser(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(req.json({ success: true, message: "the requested user dosent exist" }))
    }
    res.json({ success: true, user });
}

async function updateUserRole(req, res, next) {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndMofify: false
    });
    res.json({ success: true, user });
}


async function deleteUserProfile(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(res.json({ success: false, message: "user with this id does not exist" }));
    }
    await User.deleteOne({_id:req.params.id});
    res.json({ message: "user deleted succesfully", success: true });
}



export { register, login, logout, fergotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUserProfile };