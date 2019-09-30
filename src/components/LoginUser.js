import React from "react"
import {connect} from "react-redux"
import {loginUser} from "../redux/reducers/userReducer"

class LoginUser extends React.Component {
    constructor(){
        super()
        this.state ={
            email: "",
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
    handleSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state)
    }

    render(){
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <button type="submit" >Login</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {
    loginUser
})(LoginUser)