import React, {Component} from "react";
import "./Create.css"
import Question from './Question';


export default class Create extends Component{
    constructor(){
        super();
        this.state={
            title:"",
            questions:[],
            numberOfQuestions: 1            
        }

    }
    handleNumberOfQuestions = e => {
        if (e.target.value > 5) return;
        this.setState({
            numberOfQuestions: +e.target.value
        })
    }
    render(){
        return(
            <div className="create-page">
                <button className="create-survey-button">Create Survey</button>
                
                <input placeholder="Title Here" ></input>

                <input 
                    placeholder="Number of Questions 1-5"
                    value={this.state.numberOfQuestions}
                    onChange={this.handleNumberOfQuestions}
                    type='number' 
                    max='5'
                />

                {
                    Array(this.state.numberOfQuestions).fill(<Question />)
                }


            </div>
        )
    }

}