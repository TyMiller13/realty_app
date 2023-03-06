import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from '../models/user.js'
import { nanoid } from "nanoid";
import validator from "email-validator"

//function that creates JWT and sends user and token response -- for repeated use
const tokenAndUserResponse = (req, res, user) => {
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {expiresIn: "1h",});
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {expiresIn: "7d",});

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({ token, refreshToken, user});  
}

export const welcome = (req, res) => {
    res.json({
        data: "hello from nodejs api from routes... "
    });
};



export const preRegister = async (req, res) => {
    // create jwt using email and password, and then email confirmation with link
     // when user clicks on the link then registration is complete
    
     try {
        // console.log(req.body);

        const { email, password } = req.body;
        //email and password validation
        if (!validator.validate(email)){
            return res.json({ error: "A valid email is required" })
        }
        if(!password){
            return res.json({ error: "Password is required" })
        }
        if(password && password.length < 6){
            return res.json({ error: "Password needs to be 6 or more characters" })
        }

        const user = await User.findOne({ email });
        if(user){
            return res.json({ error: "Email is already registered"})
        }
        
        //assign json web token
        const token = jwt.sign({email, password}, config.JWT_SECRET, { expiresIn: "1h",});
        config.AWS_SES.sendEmail( emailTemplate(email, 
        `<p>Please click the link below to activate your account.</p>
         <a href="${config.CLIENT_URL}/auth/activate-account/${token}"> Activate my account </a>`,
         config.REPLY_TO, "Activate your account" ), (err, data) => {
            if (err) {
                console.log(err);
                return res.json({ ok: false });
            } else {
                console.log(data);
                return res.json({ ok: true });
            }
        });

    } catch (err) {
        console.log(err);
        return res.json({error: 'Something went wrong..Please try again'});
    }
};

export const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.json({ error: "Email is already registered"})
        }

        const hashedPassword = await hashPassword(password);
        const user = await new User({
            username: nanoid(8),
            email, 
            password: hashedPassword,
        }).save();
        
        tokenAndUserResponse(req, res, user);

    } catch (err) {
        console.log(err);
        return res.json({error: 'Something went wrong..Please try again'}); // i.e. user already exists
    }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "Please register first" });
      }
      // compare password
      const confirmPass = await comparePassword(password, user.password);
      if (!confirmPass) {
        return res.json({
          error: "Wrong password",
        });
      }

      tokenAndUserResponse(req, res, user);

    } catch (err) {
      console.log(err);
      res.json({ error: "Something went wrong. Try again." });
    }
  };

  export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user){
            return res.json({ error: "Could not find user with that email" })
        } else {
            const resetCode = nanoid();
            user.resetCode = resetCode;
            const token = jwt.sign({ resetCode }, config.JWT_SECRET, { expiresIn: "1h",});

            config.AWS_SES.sendEmail(emailTemplate(email, 
            `
            <p> Please click the link below to access your account</p>
            <a href="${config.CLIENT_URL}/auth/access-account/${token}">Access account</a>
            `, config.REPLY_TO, "Access your account" ), (err,data) => {
                if (err) {
                    console.log(err);
                    return res.json({ ok: false });
                } else {
                    console.log(data);
                    return res.json({ ok: true });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.json({ error: "Something went wrong. Try again." });        
    }
  }

  export const accessAccount = async (req, res) => {
    try {
        const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);

        const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" });
        console.log(user, resetCode);

        tokenAndUserResponse(req, res, user);
      
    } catch (err) {
        console.log(err);
        res.json({ error: "Token is invalid or expired. Try again." });       
    }
  };
  
  export const refreshToken = async (req, res) => {
    try {
       const {_id} = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
       const user = await User.findById(_id);

       tokenAndUserResponse(req, res, user);

    } catch (err) {
        console.log(err);
        return res.status(403).json({ error: "Failed to refresh token" }); // forbidden route if token is not refreshed          
    }

  };

  export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(403).json({ error: "Unauthorized" });
    }
  };

  export const publicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    }  catch (err) {
        console.log(err);
        return res.status(403).json({ error: err });
    }
  };

  export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;

        if(!password){
            return res.json({ error: "Password is required" });
        }

        if(password && password?.length < 6) {
            return res.json ({ error: "Password entered needs to be atleast 6 characters long. Try again." });
        }

        const user = await User.findById(req.user._id);
        const hashedPassword = await hashPassword(password);

        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
        });
        res.json({ ok: True });
        
    } catch (err) {
        console.log(err);
        return res.status(403).json({ error: "Unauthorized" });
    }
  };

  export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id , { ...req.body, }, { new: true });
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
        if(err.codeName === "DuplicateKey"){
            return res.status(403).json({ error: "Username is already taken" });
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
  };