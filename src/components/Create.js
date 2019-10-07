import React, { Component } from "react";
import "./Create.css"
import {connect} from "react-redux"
import Axios from "axios"
import {addNewSurvey} from "../redux/reducers/surveysReducer"


class Create extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            questions: [{
                question: '', options: ['', '', '', '']
            }]       
        }
        this.handleUpdateSurveyTitle = this.handleUpdateSurveyTitle.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
        this.submitSurvey = this.submitSurvey.bind(this)
    }

    handleUpdateSurveyTitle(e) {
        this.setState({ title: e.target.value })
    }
    handleInput(e, index) {
        let newQuestions = [...this.state.questions];

        if (e.target.name === 'question') {
            newQuestions[index].question = e.target.value;

            this.setState({
                questions: newQuestions
            })
        } else {
            newQuestions[index].options[+e.target.name] = e.target.value
            this.setState({
                questions: newQuestions
            })
        }
    }
    addQuestion() {
        let newQuestions = [...this.state.questions]
        newQuestions.push({
            question: '', options: ['', '', '', '']
        })
        this.setState({ questions: newQuestions })

    }
    deleteQuestion(e, index) {
        e.preventDefault();
        let newQuestions = [...this.state.questions]
        newQuestions.splice(index, 1)
        this.setState({ questions: newQuestions })
    }
    submitSurvey() {
        this.props.addNewSurvey(this.state)
            .then(() => {
                this.setState({
                    title: "",
                    questions: [{
                        question: '', options: ['', '', '', '']
                    }]       
                })
            })
    }
    render() {
        return (
            <div className="create-page">
                <button className="create-survey-button">Create Survey</button>

                <input
                    type="text"
                    placeholder="Title Here"
                    value={this.state.title}
                    onChange={this.handleUpdateSurveyTitle}
                />

                {
                    this.state.questions.map((question, index) => {
                        return (
                            <div>
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        placeholder="Question Here"
                                        name="question"
                                        value={question.question}
                                        onChange={(e) => this.handleInput(e, index)}
                                    />

                                    <input
                                        placeholder="option 1"
                                        name="0"
                                        value={question.options[0]}
                                        onChange={(e) => this.handleInput(e, index)}
                                    />
                                    <input
                                        placeholder="option 2"
                                        name="1"
                                        value={question.options[1]}
                                        onChange={(e) => this.handleInput(e, index)}
                                    />
                                    <input
                                        placeholder="option 3"
                                        name="2"
                                        value={question.options[2]}
                                        onChange={(e) => this.handleInput(e, index)}
                                    />
                                    <input
                                        placeholder="option 4"
                                        name="3"
                                        value={question.options[3]}
                                        onChange={(e) => this.handleInput(e, index)}
                                    />
                                    <button onClick={e => this.deleteQuestion(e, index)}>Delete</button>
                                </form>
                            </div>
                        )
                    })
                }

                <button onClick={this.addQuestion}>Add Another Question</button>
                <button onClick={this.submitSurvey}>Submit Survey</button>
            </div>
        )
    }
}

export default connect(null, {
    addNewSurvey
})(Create)