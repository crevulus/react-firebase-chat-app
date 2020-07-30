import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signinWithGoogle } from "../helpers/auth";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signinWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <h1>Log in to Le Chat</h1>
          <p>Fill in the form below to get back into it.</p>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            ></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit">Log in</button>
          </div>
          <p>or</p>
          <button onClick={this.googleSignIn} type="button">
            Log in with Google
          </button>
          <p>
            Not signed up yet? <Link to="/sigup">Signup</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
