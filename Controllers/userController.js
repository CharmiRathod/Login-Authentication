class userController {
    static Home = (req, res) => {
        res.send("Login/Registration Page");
    }

    static Registration = (req, res) => {
        res.send("Registration Page");
    }

    static Login = (req, res) => {
        res.send("Login Page");
    }
}

export default userController;