import React, {Component} from "react";
import {updateAllSurveys} from "../redux/reducers/surveysReducer"
import {connect} from "react-redux"

class Surveys extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount() {
        this.props.updateAllSurveys();
    }
    render(){

        const {allSurveys} = this.props;

        const allSurveysMapped = allSurveys.map((survey, index) => {
            return (
                <div key={index}>
                    <h2>{survey.survey_name}</h2>
                </div>
            )
        })

        return(
            <div>
                <h1>All Surveys</h1>
                {allSurveysMapped}
            </div>
        )
    }

} 

const mapStateToProps = reduxState => {
    return{
        allSurveys: reduxState.surveys.allSurveys
    }
}

export default connect(mapStateToProps, {updateAllSurveys})(Surveys)