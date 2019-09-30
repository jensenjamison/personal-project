import React from 'react';

export default class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            question: "",
            option1: {},
            option2: {},
            option3: {},
            option4: {}

        }
    }
    

    render() {
        return (
            <div>
                
            <h1>Question Component</h1>
                <input placeholder="Question Here" ></input>
                <input placeholder="option 1" name="option1"></input>
                <input placeholder="option 2" name="option2"></input>
                <input placeholder="option 3" name="option3"></input>
                <input placeholder="option 4" name="option4"></input>

            </div>
        )
    }
}