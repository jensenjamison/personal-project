import React, { Component } from "react"
import { getOne, addCompletedSurvey } from "../redux/reducers/surveysReducer"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"


class Survey extends Component {
    constructor() {
        super();
        this.state = {
            radioAnswers: []
        }
        this.handleRadio = this.handleRadio.bind(this)
    }
    componentDidMount() {
        this.props.getOne(this.props.match.params.survey_id)
    }

    makeSurvey(survey) {
        let mySurvey = [];
        survey.forEach((val, i) => {
            let index = mySurvey.findIndex(q => q.question_id === val.question_id);
            if (index < 0) {
                mySurvey.push({
                    question_id: val.question_id,
                    question: val.question,
                    options: [{ id: val.option_id, text: val.option }]
                })
            } else {
                mySurvey[index].options.push({ id: val.option_id, text: val.option });
            }
        })
        return mySurvey
    }

    handleRadio(question_id, option_id) { // need to somehow dynamically render a holder in state for our radio buttons to work properly
        let newRadioAnswers = [...this.state.radioAnswers];

        // search state to see if question already has an answer
        // let foundAnswer = newRadioAnswers.findIndex((el, i) => el.question_id === question_id);
        const foundAnswer = this.findAnswer(newRadioAnswers, question_id)

        // if not found, create a state object to hold option
        if (foundAnswer < 0) {
            newRadioAnswers.push({
                question_id: question_id,
                option_id: option_id
            })

            this.setState({
                radioAnswers: newRadioAnswers
            })
        } else {  // if found, update current state object
            newRadioAnswers[foundAnswer].option_id = option_id

            this.setState({
                radioAnswers: newRadioAnswers
            })
        }
    }
    findAnswer(newRadioAnswers, question_id, option_id) {
        const foundQuestionIndex = newRadioAnswers.findIndex((el, i) => el.question_id === question_id);
        if (!option_id) {
            return foundQuestionIndex;
        } else {
            if (foundQuestionIndex < 0) {
                return false;
            } else {
                return newRadioAnswers[foundQuestionIndex].option_id === option_id;
            }
        }
    }

    handleSubmit(){
        // this.props.addCompletedSurvey()
    }

    render() {

        // prevent a guest from taking a survey
        if (!this.props.first_name) {
            alert('Please log in');
            return <Redirect to='/login' />
        }

        const { survey } = this.props
        let surveyQuestionsMapped = 'Loading...';

        if (Array.isArray(survey) && survey.length > 0) {
            let surveyFormatted = this.makeSurvey(survey);
            console.log(surveyFormatted)


            surveyQuestionsMapped = surveyFormatted.map((question, i) => {

                let optionsMapped = question.options.map((option, i) => {

                    return (
                        <div>
                            <input
                                type='radio'
                                checked={this.findAnswer([...this.state.radioAnswers], question.question_id, option.id)}
                                onChange={() => this.handleRadio(question.question_id, option.id)}
                                value={option.id}
                            />{option.text}
                        </div>
                    );
                })

                return (
                    <div>
                        <h4>{question.question}</h4>
                        {optionsMapped}
                    </div>
                );
            })
        }


        return (
            <div>
                <h1>{this.props.location.state.name}</h1>
                {surveyQuestionsMapped}
                <button>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        survey: reduxState.surveys.survey,
        first_name: reduxState.user.first_name
    }
}

export default connect(mapStateToProps, {
    getOne, addCompletedSurvey
})(Survey)