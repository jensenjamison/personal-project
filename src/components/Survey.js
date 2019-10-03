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

    render() {

        const {survey} = this.props

        return (
            <div>
                {survey.survey_name}
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