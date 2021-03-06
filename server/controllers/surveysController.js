require('dotenv').config()
const nodemailer =require('nodemailer')

const {EMAIL_NAME, EMAIL_PW} = process.env;



module.exports = {
    getAll: async (req, res) => {
        const db = req.app.get('db');  // bring in db

        const surveys = await db.surveys.getAll()
        res.status(200).json(surveys)
    },
    getUserSurveys: async (req, res) => {
        const { user_id } = req.session.user;
        const db = req.app.get('db');

        const userSurveys = await db.surveys.getUserSurveys(user_id)
        res.status(200).json(userSurveys)
    },
    getOne: async (req, res) => {
        const survey_id = +req.params.survey_id;
        const db = req.app.get("db");

        const getOneRes = await db.surveys.getOne(survey_id)
        const survey = getOneRes[0]

        res.status(200).json(getOneRes)
    },
    addNewSurvey: async (req, res) => {
        console.log(req.body)

        const { title, questions } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get("db");

        const addTitleRes = await db.surveys.addTitle(user_id, title);
        const survey_id = addTitleRes[0].survey_id;

        try {
            for (let i = 0; i < questions.length; i++) {
                const addQuestionRes = await db.surveys.addQuestion(survey_id, questions[i].question);
                const question_id = addQuestionRes[0].question_id;

                for (let j = questions[i].options.length - 1; j >= 0; j--) {
                    if (questions[i].options[j] === "") questions[i].options.splice(j, 1)
                }

                for (let k = 0; k < questions[i].options.length; k++) {
                    await db.surveys.addOptions(question_id, questions[i].options[k])
                }
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }

        const surveys = await db.surveys.getAll()
        res.status(200).json(surveys)
    },

    addCompletedSurvey: async (req, res) => {

        const { survey_id, radioAnswers } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get("db");
        
        let surveyInfoToStrings = {
            survey_name: '',
            survey_maker_email: '',
            survey_answers: []
        };

        const getCompletedSurveyTitleRes = await db.surveys.getCompletedSurveyTitle(survey_id);
        surveyInfoToStrings.survey_name = getCompletedSurveyTitleRes[0].survey_name;

        const getCompletedSurveyMakerRes = await db.surveys.getCompletedSurveyMaker(survey_id);
        surveyInfoToStrings.survey_maker_email = getCompletedSurveyMakerRes[0].email;

        for (let i = 0; i < radioAnswers.length; i++) {
            const addCompletedSurveyRes = await db.surveys.addCompletedSurvey(user_id, survey_id, radioAnswers[i].question_id, radioAnswers[i].option_id)

            const getCompletedSurveyQuestionRes = await db.surveys.getCompletedSurveyQuestion(addCompletedSurveyRes[0].question_id)
            const getCompletedSurveyAnswerRes = await db.surveys.getCompletedSurveyAnswer(addCompletedSurveyRes[0].option_id)

            surveyInfoToStrings.survey_answers.push({question: getCompletedSurveyQuestionRes[0].question, answer: getCompletedSurveyAnswerRes[0].option})
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: EMAIL_NAME,
                pass: EMAIL_PW
            }
        });

        let mailOptions ={
            from: '"Survey Response"<jamisonjensen1999@gmail.com>',
            to: surveyInfoToStrings.survey_maker_email,
            subject: `${req.session.user.first_name} ${req.session.user.last_name} (${req.session.user.email}) took your survey: ${surveyInfoToStrings.survey_name}!`,
            text:'Survey Response',
            html: `<div>
                    <h3>${surveyInfoToStrings.survey_name} questions as answered by ${req.session.user.first_name}:</h3>
                        ${JSON.stringify(surveyInfoToStrings, null, 15)}
                </div>`
        }

        transporter.sendMail(mailOptions)
            .then(res => {
                console.log('Email Sent')
            })
            .catch((err)=>{
                console.log('nodemailer error:', err)
            })


        const surveys = await db.surveys.getAll()
        res.status(200).json(surveys)
    },

    deleteSurvey: async (req, res) => {
        const { user_id } = req.session.user;
        const survey_id = +req.params.survey_id;
        const db = req.app.get('db');

        const updatedSurveys = await db.surveys.deleteSurvey(survey_id, user_id)
        res.status(200).json(updatedSurveys)
    }
}