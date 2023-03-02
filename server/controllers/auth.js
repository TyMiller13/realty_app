import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from '../models/user.js'
import { nanoid } from "nanoid";
import validator from "email-validator"


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
        const hashedPassword = await hashPassword(password);
        const user = await new User({
            username: nanoid(8),
            email, 
            password: hashedPassword,
        }).save();

        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {expiresIn: "1h",});
        const Refreshtoken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {expiresIn: "7d",});

        user.password = undefined;
        user.resetCode = undefined;

        return res.json({ token, Refreshtoken, user});
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
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.json({
          error: "Wrong password",
        });
      }
      //  create json web token
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
      });
      //send user and token response (dont include PW)
      user.password = undefined;
      user.resetCode = undefined;
  
      res.json({
        user,
        token,
        refreshToken,
      });
    } catch (err) {
      console.log(err);
      res.json({ error: "Something went wrong. Try again." });
    }
  };