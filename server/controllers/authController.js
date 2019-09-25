

module.exports = {
    getSession: (req, res) => {
        if(req.session.user){
            res.status(200).json(req.session.user)
        }
    },
    register: (req, res) => {

    },    
    editUser: (req, res) => {

    },
    login: (req, res) => {

    },
    logout: (req, res) => {

    }
}