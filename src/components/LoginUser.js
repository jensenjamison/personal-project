import React from "react"
import { connect } from "react-redux"
import { loginUser } from "../redux/reducers/userReducer"
import "./LoginUser.css"


class LoginUser extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "jamisonjensen1999@gmail.com",
            password: "123"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state).then(() => this.props.history.push("/"))
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-box">
                    <h2 className="login-text">Login</h2>
                    <form onSubmit={this.handleSubmit} className="login-input">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, {
    loginUser
})(LoginUser)