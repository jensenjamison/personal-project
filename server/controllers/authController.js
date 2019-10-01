const bcrypt = require("bcryptjs")

module.exports = {
    getSession: (req, res) => {
        if (req.session.user) {
            res.status(200).json(req.session.user)
        } else {
            res.sendStatus(200)
        }
        
    },
    register: async (req, res) => {
        const { email, first_name, last_name, password } = req.body
        const db = req.app.get("db")

        const foundUser = await db.auth.checkForUser(email);

        if (foundUser[0]) {
            res.status(409).json("Email Taken")
        } else {

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)

            const newUser = await db.auth.registerUser(email, first_name, last_name, hash)
            req.session.user = {
                email: newUser[0].email,
                first_name: newUser[0].first_name,
                last_name: newUser[0].last_name
            }

            res.status(200).json(req.session.user)
        }
    },
    editUser: (req, res) => {

    },
    login: async (req, res) => {
        const { email, password } = req.body
        const db = req.app.get("db")

        const foundUser = await db.auth.checkForUser(email);

        if (!foundUser[0]) {
            res.status(403).json("Email or Password Incorrect")

        } else {

            const isMatch = bcrypt.compareSync(password, foundUser[0].hash)

            if (!isMatch) {
                res.status(403).json("Email or Password incorrect")

            } else {

                req.session.user = {
                    email: foundUser[0].email,
                    first_name: foundUser[0].first_name,
                    last_name: foundUser[0].last_name
                }
                res.status(200).json(req.session.user)
            }
        }
    },
    logout: (req, res) => {
        console.log("hit")
        console.log (req.session)
        req.session.destroy();
        res.sendStatus(200)
    }
}