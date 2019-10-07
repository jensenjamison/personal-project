import React, {Component} from "react";
import {updateAllSurveys} from "../redux/reducers/surveysReducer"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import"./Surveys.css"

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

        const allSurveysMapped = allSurveys.length > 0 ? allSurveys.map((survey, index) => {

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
        }) : "Loading..."

        return(
            <div className="surveys-page">
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