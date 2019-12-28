import React, { Component } from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./about";
import Contact from "./contact";
import Signup from "./signup";
import fire from "./fire";
import "./App.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="col-md-6">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" onClick={this.login} class="btn btn-primary">
            Login
          </button>
          <button
            onClick={this.signup}
            style={{ marginLeft: "25px" }}
            className="btn btn-success"
          >
            Signup
          </button>
        </form>
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        
          <nav className="navi">
            <img src="logo.jpg" alt="logo" className="mylogo" />

            <Link className="navbutton" to="/Home">
              home
            </Link>

            <Link className="navbutton" to="/about">
              about
            </Link>

            <Link className="navbutton" to="/contact">
              contact us
            </Link>
            <span className="sign">
              <Link className="navbutton" to="/">
                Login
              </Link>
              <Link className="navbutton" to="/signup">
                signup
              </Link>
              
            </span>
          </nav>
          <Switch>

            {this.state.user  ? 
            <Route exact  path="/Home" component={Home} /> : 
            <Route exact path="/" component={Login} />
            }
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
