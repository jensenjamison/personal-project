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
        if (e.target.value > 10) return;
        this.setState({
            numberOfQuestions: +e.target.value
        })
    }
    render(){
        return(
            <div className="create-page">
                <button className="create-survey-button">Create Survey</button>
                
                <input 
                    placeholder="Number of Questions 1-10"
                    value={this.state.numberOfQuestions}
                    onChange={this.handleNumberOfQuestions}
                    type='number' 
                    max='10'
                />

                {
                    Array(this.state.numberOfQuestions).fill(<Question />)
                }


            </div>
        )
    }

}