

module.exports = {
    getAll: async (req, res) => {
        const db = req.app.get('db');  // bring in db
        
            // fire our getAll sql statement
            // return (res)  the results from firing our sql statement

            // using a sql statement, get and  return all surveys



    },
    getOne: (req, res) => {

    },
    addSurvey: async (req, res) => {
        console.log(req.body)

        const {question, options} = req.body;
        const {user_id} = req.session.user;
        const db = req.app.get("db");

        const addTitleRes = await db.surveys.addTitle(user_id, question);
        const survey_id = addTitleRes[0].survey_id;

        for (let i = options.length - 1; i >= 0; i--){
            if (options[i] === "" ) options.splice(i, 1)
        }

        for (let i = 0; i < options.length; i++){
            await db.surveys.addOptions(survey_id, options[i]) 
        }

        const allSurveys = await db.surveys.getAll()


        res.sendStatus(200)
    },
    deleteSurvey: (req, res) => {

    }
}