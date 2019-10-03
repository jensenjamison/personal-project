import React, {Component} from "react";
import {updateAllSurveys} from "../redux/reducers/surveysReducer"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

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
            console.log(survey)
            return (
                <div key={index}>
                    <Link to={{
                        pathname: `/surveys/${survey.survey_id}`,
                        state: {
                            name: `${survey.survey_name}`
                        }
                    }}>
                        <h2>{survey.survey_name}</h2>
                    </Link>
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