import React from 'react';

export default class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: ""

        }
        this.handleInput=this.handleInput.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleInput(e){
            this.setState({
                [e.target.name]: e.target.value
            })
    }
    handleSubmit(e){
        e.preventDefault();

        const {question, option1, option2, option3, option4} = this.state;

        let options = [option1, option2, option3, option4];

        for (let i = options.length - 1; i >=0 ; i--) {
            if (!options[i]) options.splice(i,  1)
        }

        let questionObj = {
            question,
            options
        }

        this.props.handleAddQuestion(questionObj)

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Question Component</h1>
                    <input 
                        placeholder="Question Here" 
                        name="question"
                        onChange={this.handleInput}
                    />
                    <input
                        placeholder="option 1"
                        name="option1"
                        onChange={this.handleInput}
                    />
                    <input
                        placeholder="option 2"
                        name="option2"
                        onChange={this.handleInput}
                    />
                    <input
                        placeholder="option 3"
                        name="option3"
                        onChange={this.handleInput}
                    />
                    <input
                        placeholder="option 4"
                        name="option4"
                        onChange={this.handleInput}
                    />
                    <button type="submit" >Add Question</button>
                </form>
            </div>
        )
    }
}