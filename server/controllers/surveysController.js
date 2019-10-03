

module.exports = {
    getAll: async (req, res) => {
        const db = req.app.get('db');  // bring in db
        
        const surveys = await db.surveys.getAll()
        res.status(200).json(surveys)
    },
    getUserSurveys: async (req, res) => {
        const {user_id} = req.session.user;
        const db = req.app.get('db');

        const userSurveys = await db.surveys.getUserSurveys(user_id)
        res.status(200).json(userSurveys)
    },
    getOne: async (req, res) => {
        const survey_id = +req.params.survey_id;
        const db = req.app.get("db");

        const getOneRes = await db.surveys.getOne(survey_id)
        const survey = getOneRes[0]

        res.status(200).json(survey)
    },
    addSurvey: async (req, res) => {
        console.log(req.body)

        const {title, questions} = req.body;
        const {user_id} = req.session.user;
        const db = req.app.get("db");

        const addTitleRes = await db.surveys.addTitle(user_id, title);
        const survey_id = addTitleRes[0].survey_id;

        try {
            for (let i = 0; i < questions.length; i++){
                const addQuestionRes = await db.surveys.addQuestion(survey_id, questions[i].question);
                const question_id = addQuestionRes[0].question_id;
    
                for (let j = questions[i].options.length - 1; j >= 0; j--){
                    if (questions[i].options[j] === "" ) questions[i].options.splice(j, 1)
                }
    
                for (let k = 0; k < questions[i].options.length; k++){
                    await db.surveys.addOptions(question_id, questions[i].options[k]) 
                }
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }




        // const allSurveys = await db.surveys.getAll()


        res.sendStatus(200)
    },
    setInactive: async (req, res) => {
        const {user_id} = req.session.user;
        const survey_id = +req.params.survey_id;
        const db = req.app.get('db'); 

        const updatedSurveys = await db.surveys.setInactive(user_id, survey_id)
        res.status(200).json(updatedSurveys)
    }
}