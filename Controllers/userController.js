import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';

class userController {
    static Home = (req, res) => {
        res.send("Login/Registration Page");
    }

    static Registration = (req, res) => {
        res.send("Registration Page");
    }

    static createUserDoc = async (req, res) => {
        
        const hashPassword = await bcrypt.hash(req.session.body.Password, 10)
        try {
            console.log(req.body);
            const {Name, Email, Password} = req.session.body;

            const doc = new UserModel({
                name: Name,
                email: Email,
                password: hashPassword
            })

            res.send("creating user data...")
            await doc.save();
            res.send("User Data Successfully created!!!");
            res.redirect('/login');
            
        } catch (error) {
            console.log(error);
        }
    }

    static Login = (req, res) => {
        res.send("Login Page");
    }

    static verifyLogin = async(req, res) => {
        try {
            const {Email, Password} = req.session.body;
            const result = await UserModel.findOne({email: Email})
            //console.log(result);

            const isMatch = await bcrypt.compare(Password, result.Password)
            if (result != null){
                if (result.Email === Email && isMatch){
                    res.send(`<h1>DashBoard-----${result}</h1>`)
                }
                else{
                    res.send(`<h1>Email or Passwrod is invalid...!`)
                }
            }
            else {
                res.send(`<h1> You are not a registered user!</h1>`)
            }
           

            res.send("Login Successfull")
        } catch (error) {
            console.log(error);
        }
    }
}

export default userController;