import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserSurveys } from "../redux/reducers/surveysReducer"

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
        const { userSurveys } = this.props;

        const userSurveysMapped = userSurveys.map((survey, index) => {
            return (
                <div key={index}>
                    <h2>{survey.survey_name}</h2>
                </div>
            )
        })

        return (
            <div>
                <h1>My Surveys</h1>
                {userSurveysMapped}
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        userSurveys: reduxState.surveys.userSurveys
    }
}

export default connect(mapStateToProps, { updateUserSurveys })(Home)