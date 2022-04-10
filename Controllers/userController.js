import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';

class userController {
    static Home = (req, res) => {
        res.render("index");
    }

    static Registration = (req, res) => {
        res.render("register");
    }

    static createUserDoc = async (req, res) => {
        console.log(req.body);
        const hashPassword = await bcrypt.hash(req.body.Password, 10)
        try {
            console.log(req.body);
            const {Name, Email, Password} = req.body;

            const doc = new UserModel({
                name: Name,
                email: Email,
                password: hashPassword
            })

            await doc.save();
            
            res.render('index');
            
        } catch (error) {
            console.log(error);
        }

    }

    static Login = (req, res) => {
        res.send("Login Page");
    }

    static verifyLogin = async(req, res) => {
        try {
            console.log(req.body);
            const {Email, Password} = req.body;
            const result = await UserModel.findOne({email: Email})
            console.log(result.password);
            console.log(Password);

            const isMatch = await bcrypt.compare(Password, result.password)
            if (result != null){
                if (result.email === Email && isMatch){
                    req.session.userEmail = Email;
                    res.send(`<h1>DashBoard-----${result}</h1>`)
                }
                else{
                    res.send(`<h1>Email or Password is invalid...!`)
                }
            }
            else {
                res.send(`<h1> You are not a registered user!</h1>`)
            }
           
        } catch (error) {
            console.log(error);
        }
    }
}

export default userController;