import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserSurveys, deleteSurvey } from "../redux/reducers/surveysReducer"
import "./Home.css"
import {Redirect} from "react-router-dom";

class Home extends Component {
    constructor() {
        super();
        this.state = {

        }

    }
    componentDidMount() {
        this.props.updateUserSurveys();
    }
    render() {
        if (!this.props.first_name) {
            return <Redirect to="/login" />
        }

        const { userSurveys } = this.props;

        const userSurveysMapped = userSurveys.length < 1 ? "No surveys found." : userSurveys.map((survey, index) => {
            return (
                <div key={index}>
                    <h2>{survey.survey_name}</h2>
                    <button onClick={() => this.props.deleteSurvey(survey.survey_id)}>Delete</button>
                </div>
            )
        })

        return (
            <div className="home-page">
                <h1>My Surveys</h1>
                {userSurveysMapped}
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        userSurveys: reduxState.surveys.userSurveys,
        first_name: reduxState.user.first_name
    }
}

export default connect(mapStateToProps, { updateUserSurveys, deleteSurvey })(Home)