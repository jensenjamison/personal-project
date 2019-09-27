import React from 'react';

export default class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            question: "",
            options: []
        }
    }
    

    render() {
        return (
            <div>
                
            <h1>Question Component</h1>
                <input placeholder="Question Here" ></input>
                <input placeholder="answer 1"></input>
                <input placeholder="answer 2"></input>
                <input placeholder="answer 3"></input>
                <input placeholder="answer 4"></input>

            </div>
        )
    }
}