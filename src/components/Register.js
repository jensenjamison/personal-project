import React from "react"
import {connect} from "react-redux";
import {registerUser} from "../redux/reducers/userReducer"

class Register extends React.Component {
    constructor(){
        super()
        this.state= {
            email: "",
            first_name: "",
            last_name: "",
            password: ""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.registerUser(this.state)
    }

    render(){
        return(
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>First Name</label>
                    <input 
                        type="text"
                        name="first_name"
                        onChange={this.handleChange}
                    />
                    <label>Last Name</label>
                    <input 
                        type="text"
                        name="last_name"
                        onChange={this.handleChange}
                    />
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input 
                        type="text"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <button type="submit" >Register</button>
                </form>

            </div>
        )
    }
}

export default connect(null, {
    registerUser
})(Register)