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
                user_id: newUser[0].user_id,
                email: newUser[0].email,
                first_name: newUser[0].first_name,
                last_name: newUser[0].last_name
            }

            res.status(200).json(req.session.user)
        }
    },
    editUser: async (req, res) => {
        const { email, first_name, last_name, password } = req.body
        const { user_id } = req.session.user;
        const db = req.app.get("db")

        // handle email
        if (email !== req.session.user.email) {
            const foundUser = await db.auth.checkForUser(email);

            if (foundUser[0]) {
                return res.status(409).json("Email Taken")
            }
        }

        // handle password
        if (password !== '') {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)
            const updatedUser = await db.auth.updateUserWithNewPW(user_id, email, first_name, last_name, hash)

            req.session.user = {
                user_id: updatedUser[0].user_id,
                email: updatedUser[0].email,
                first_name: updatedUser[0].first_name,
                last_name: updatedUser[0].last_name
            }
            return res.status(200).json(req.session.user)
        } else {
            const updatedUser = await db.auth.updateUserWithoutNewPW(user_id, email, first_name, last_name)

            req.session.user = {
                user_id: updatedUser[0].user_id,
                email: updatedUser[0].email,
                first_name: updatedUser[0].first_name,
                last_name: updatedUser[0].last_name
            }
            return res.status(200).json(req.session.user)
        }
        res.status(500).json("Something went wrong :(")
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const db = req.app.get("db")

        const foundUser = await db.auth.checkForUser(email);

        if (!foundUser[0]) {
            res.status(403).json({ message: "Email or Password Incorrect" })

        } else {

            const isMatch = bcrypt.compareSync(password, foundUser[0].hash)

            if (!isMatch) {
                res.status(403).json({ message: "Email or Password Incorrect" })

            } else {

                req.session.user = {
                    user_id: foundUser[0].user_id,
                    email: foundUser[0].email,
                    first_name: foundUser[0].first_name,
                    last_name: foundUser[0].last_name
                }
                res.status(200).json(req.session.user)
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    }
}