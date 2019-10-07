import React from "react";
import { Link } from "react-router-dom"
import "./Header.css"
import { connect } from "react-redux";
import { logOutUser, getSession } from "../redux/reducers/userReducer"
import { clearSurveyData } from "../redux/reducers/surveysReducer"


class Header extends React.Component {

    componentDidMount() {
        this.props.getSession()
    }

    logOutUser = () => {
        this.props.logOutUser().then(() => this.props.clearSurveyData())
    }

    render() {
        return (
            <>
                <nav className="nav">
                    {
                        this.props.first_name ? <Link to="/"><button className="home-button">Home</button></Link> : null
                    }
                    {this.props.first_name ?
                        <div className="nav-right">
                            <div className="nav-buttons-1">
                                <Link to="/create"><button>Create</button></Link>
                                <Link to="/surveys"><button>Surveys</button></Link>
                                <Link to="/edit"><button>Edit Profile</button></Link>
                                <Link to="/login"><button onClick={this.logOutUser} >Log Out</button></Link>
                            </div>
                            <div className="burger-button">
                                <img className="burger-button-1" src="https://static.thenounproject.com/png/703781-200.png"></img>
                            </div>
                        </div>
                        :
                        <div className="nav-right">
                            <Link to="/register"><button>Register</button></Link>
                            <Link to="/login"><button>Log In</button></Link>
                        </div>
                    }
                </nav>
                <section className="drop-down">
                    <div className="side-menu">
                        <h2>CREATE</h2>
                        <h2>SURVEYS</h2>
                        <h2>EDIT PROFILE</h2>
                        <h2>LOG OUT</h2>
                    </div>
                </section>
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        first_name: reduxState.user.first_name

    }
}

export default connect(mapStateToProps, { logOutUser, getSession, clearSurveyData })(Header)