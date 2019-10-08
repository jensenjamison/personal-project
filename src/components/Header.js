import React from "react";
import { Link } from "react-router-dom"
import "./Header.css"
import { connect } from "react-redux";
import { logOutUser, getSession } from "../redux/reducers/userReducer"
import { clearSurveyData } from "../redux/reducers/surveysReducer"


class Header extends React.Component {
    constructor(){
        super()
        this.state={
            menuStatus: "side-menu-close",
            buttonStatus: ""
        }
    }


    componentDidMount() {
        this.props.getSession()
    }

    logOutUser = () => {
        this.props.logOutUser().then(() => this.props.clearSurveyData());
        this.setState({menuStatus: "side-menu-close"})
    }

    handleClick=()=>{
        if (this.state.menuStatus === "side-menu-close"){
            this.setState({
                menuStatus: "side-menu-open", buttonStatus: "side-menu-open"
            })
        } else {
            this.setState({
                menuStatus: "side-menu-close", buttonStatus: "side-menu-close"
            })
        }
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
                                <img className="burger-button-1" src="https://static.thenounproject.com/png/703781-200.png" onClick={this.handleClick}></img>
                            </div>
                        </div>
                        :
                        <div className="nav-login">
                            <Link to="/register"><button>Register</button></Link>
                            <Link to="/login"><button>Log In</button></Link>
                        </div>
                    }
                </nav>
                <section className="drop-down">
                    <div className={this.state.menuStatus}>
                    {this.props.first_name ?
                    <section>
                        <Link to="/create"><h2>Create</h2></Link>
                        <Link to="/surveys"><h2>Surveys</h2></Link>
                        <Link to="/edit"><h2>Edit Profile</h2></Link>
                        <Link to="/login"><h2 onClick={this.logOutUser} >Log Out</h2></Link>
                    </section>
                        :
                        null
                    }
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