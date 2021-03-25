import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import Login from './Login'
import SignUp from './SignUp'

export class Navbar extends Component {
  state = {

  }

  handleLogin=()=>{
    const obj = {
      name:this.state.name,
      password:this.state.password,
    }
    console.log(obj)
    
    fetch(`http://localhost:4000/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        obj
      ),
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  handleSignUp=()=>{
    const obj = {
      name:this.state.name,
      password:this.state.password,
      confirm:this.state.confirm,
    }
    console.log(obj)
    
    fetch(`http://localhost:4000/user/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        obj
      ),
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  test=()=>{
    fetch(`http://localhost:4000/user/`,{
      method: 'GET',
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  render() {
    const loginFunctions = {
      handleLogin:this.handleLogin,
      handleChange:this.handleChange
    }

    const signUpFunctions = {
      handleSignUp:this.handleSignUp,
      handleChange:this.handleChange
    }

    // handleSignUp
    return (
      <>
      <header>
        <nav>
          <div className="nav-right">
            <img src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt='placeholder' className="logo-img"/>
            <h1 className="nav-name text-shadow">Wayfarer</h1>
          </div>
          
          <div>
            <ul>
              <li><Link to="/new"><span className="nav-item text-shadow">New Post</span></Link></li>
              <li><Login state={this.state} function={loginFunctions}/></li>
              <li><SignUp state={this.state} function={signUpFunctions}/></li>
              
            </ul>
          </div>
        </nav>

      </header>
    </>
    )
  }
}

export default Navbar
