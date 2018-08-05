import React, { Component } from 'react';
import IndexNav from "../navbars/indexnav"
import "../../static/css/forms.css"
import "../../static/css/main.css"
import axios from "axios"
import {Redirect} from "react-router-dom"

const url = "http://localhost:5000/api/v1/auth/register";
class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            confirm_password: "",
            registered: false,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let axiosConfig = {
            header: {
                "Content-Type": "application/json",
                AccessControlAllowOrigin: "http://localhost:5000/api/v1/auth/register"
            } 
        };
        let payload = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        };
        axios.post(url, payload, axiosConfig)
        .then(res => {
            this.setState({registered: true})
            console.log("====>", res)
        })
        .catch(error => {
            this.setState({error: error.message})
        });

    }
    render() { 
        return ( 
            this.state.registered ? <Redirect to="/login"/> :
            <React.Fragment>
                <IndexNav/>
                <div className="container">
                    <div className="row">
                    <div className="col-md-4"/>
                        <div className="col-md-4">
                        <form onSubmit={this.handleSubmit} className="registration-form">
                            <div className="error">{this.state.error ? this.state.error : ""}</div>
                            <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                placeholder="Enter First Name"
                                onChange={this.handleChange}
                                name="first_name"
                                value={this.state.first_name}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="Enter Last Name"
                                onChange={this.handleChange}
                                name="last_name"
                                value={this.state.last_name}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter Username"
                                onChange={this.handleChange}
                                name="username"
                                value={this.state.username}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                name="password"
                                value={this.state.password}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_password"
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                                name="confirm_password"
                                value={this.state.confirm_password}
                            />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                        </div>
                        <div className="col-md-4"/>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Register;