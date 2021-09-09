import React, { Component } from 'react'
import NavBarMenu  from "./NavBarMenu";

export default class Login extends Component {
    constructor()
    {
        super();
        this.state={
            name:'',
            password:'',
        }
    }
    login()
    {
        console.warn(this.state)
       
        fetch("http://localhost:3000/login?q=" + this.state.name).then((data) => {
          data.json().then((resp) => {
            console.warn("resp", resp);
            if(resp.length > 0)
            {
                localStorage.setItem('login',JSON.stringify(resp))
                console.warn(this.props.history.push('list'))
            }
            else
            {
                alert("Please check your username and password")
            }
           
          });
        });
    }
    render() {
        return (
            <div>
                <NavBarMenu />
                 <input type="text"
                 placeholder="Enter name"
                  name="user" onChange={(event)=>this.setState({name:event.target.value})} /> <br/> <br/>
                <input 
                placeholder="Enter password"
                 type="password" name="password" onChange={(event)=>this.setState({password:event.target.value})} /> <br/> <br/>
                <button onClick={()=>{this.login()}}>Login</button>
            </div>
        )
    }
}
