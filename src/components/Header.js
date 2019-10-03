import React from "react";
import { Link } from "react-router-dom"
import "./Header.css"
import { connect } from "react-redux";
import { logOutUser, getSession } from "../redux/reducers/userReducer"
import { clearSurveyData } from "../redux/reducers/surveysReducer"


class Header extends React.Component {

    componentDidMount(){
        this.props.getSession()
    }

    logOutUser=() => {
        this.props.logOutUser().then(() => this.props.clearSurveyData())
    }

    render() {
        return (
            <nav className="nav">
                {
                    this.props.first_name ? <Link to="/"><button>Home</button></Link> : null
                }

                {this.props.first_name ?
                    <div className="nav-right">
                        <Link to="/create"><button>Create</button></Link>
                        <Link to="/surveys"><button>Surveys</button></Link>
                        <Link to="/login"><button onClick={this.logOutUser} >Log Out</button></Link>
                    </div>
                    :
                    <div className="nav-right">
                        <Link to="/register"><button>Register</button></Link>
                        <Link to="/login"><button>Log In</button></Link>
                    </div>
                }
            </nav>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        first_name: reduxState.user.first_name

    }
}

export default connect(mapStateToProps, { logOutUser, getSession, clearSurveyData })(Header)