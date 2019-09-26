import React from 'react';

export default class Question extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <div>
                
            <h1>Question Component</h1>
                <input placeholder="Title Here" ></input>
                <input placeholder="Question Here" ></input>
               
            </div>
        )
    }
}