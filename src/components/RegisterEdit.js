import React from "react"
import {connect} from "react-redux";
import {registerUser, editUser} from "../redux/reducers/userReducer"

class RegisterEdit extends React.Component {
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

    componentDidMount(){
        if (this.props.location.pathname === "/edit"){
            this.setState({
                email: this.props.email,
                first_name: this.props.first_name,
                last_name: this.props.last_name
            })
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.props.location.pathname === "/register"){
            this.props.registerUser(this.state).then(() => this.props.history.push("/"))
        } else {
            this.props.editUser(this.state).then(() => this.props.history.push("/"))
        }
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
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                    <label>Last Name</label>
                    <input 
                        type="text"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input 
                        type="text"
                        name="password"
                        placeholder={
                            this.props.location.pathname ===  '/edit' ? 'leave blank for no change' : null
                        }
                        onChange={this.handleChange}
                    />
                    <button type="submit" >
                        {
                            this.props.location.pathname ===  '/register' ? "Register" : "Update"
                        }</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        first_name: reduxState.user.first_name,
        last_name: reduxState.user.last_name,
        email: reduxState.user.email
    };
}

export default connect(mapStateToProps, {
    registerUser, editUser
})(RegisterEdit)