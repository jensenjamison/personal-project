import React, { Component } from "react"
import {getOne} from "../redux/reducers/surveysReducer"
import {connect} from "react-redux"

class Survey extends Component {
    constructor() {
        super();
        this.state = {

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
                    options: [val.option]
                })
            } else {
                mySurvey[index].options.push(val.option);
            }
        })
        return mySurvey
    }

    render() {

        const {survey} = this.props
        console.log(survey)
        if(Array.isArray(survey)) {
            let survey2 = this.makeSurvey(survey);
            console.log(survey2)
        }

        // if (survey.length > 0) {



        // }
        
        // const questionsFiltered = survey.length > 0 && survey.filter((item, i, arr) => arr.indexOf(item.question === survey.indexOf(item)))

        // const questionsMapped = ((item, i) => {

        //     return (
        //         <div>
        //             <h1></h1>

        //         </div>
        //     )
        // })
        // console.log(questionsFiltered)


        return (
            <div>
                check yo console
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