import React, { Component } from "react"
import {getOne} from "../redux/reducers/surveysReducer"
import {connect} from "react-redux"

class Survey extends Component {
    constructor() {
        super();
        this.state = {
            radioAnswers: []
        }
    }
    componentDidMount() {
        this.props.getOne(this.props.match.params.survey_id)
    }

    makeSurvey(survey) {
        let mySurvey = [];
        survey.forEach((val, i) => {
            let index = mySurvey.findIndex(q => q.question_id === val.question_id);
            if(index < 0) {
                mySurvey.push({
                    question_id: val.question_id,
                    question: val.question,
                    options: [{id: val.option_id, text: val.option}]
                })
            } else {
                mySurvey[index].options.push({id: val.option_id, text: val.option});
            }
        })
        return mySurvey
    }

    handleRadio(question_id, option_id) { // need to somehow dynamically render a holder in state for our radio buttons to work properly
        const newRadioAnswers = [...this.state.radioAnswers];
        let foundAnswer = newRadioAnswers.findIndex((el, i) => {



            
        })

        this.setState({
            [question_id]: []
        });
    }


    render() {

        const {survey} = this.props
        let surveyQuestionsMapped = 'Loading...';
        
        if(Array.isArray(survey) && survey.length > 0) {
            let surveyFormatted = this.makeSurvey(survey);
            console.log(surveyFormatted)
        

            surveyQuestionsMapped = surveyFormatted.map((question, i) => {

                let optionsMapped = question.options.map((option,  i) => {

                    return (
                        <div>
                            <input 
                                type='radio' 
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
        survey: reduxState.surveys.survey
    }
}

export default connect(mapStateToProps, {
    getOne
})(Survey)