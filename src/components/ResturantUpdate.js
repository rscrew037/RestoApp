import React, { Component } from 'react'
import NavBarMenu  from "./NavBarMenu";

 class ResturantUpdate extends Component {
    constructor(){
        super();
        this.state={
            name: null,
            email: null,
            address: null,
            rating: null,
            id:null,
        }
    }
     componentDidMount()
     {
         fetch('http://localhost:3000/restuarant/'+this.props.match.params.id).then((response) => {
            response.json().then((result) => {
              console.warn(result)
                this.setState({
                     name: result.name,
                     email: result.email,
                     rating: result.rating,
                     address:result.address,
                     id: result.id,
                 })
            })
          })
     }
     update()
     {
        fetch('http://localhost:3000/restuarant/' + this.state.id ,{
            
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        }) .then((result)=>{
            result.json().then((resp)=>{
               alert("Resturant has been updated")
            })
        })
     }
    render() {

        return (
            <div>
               <NavBarMenu/>
                
                <div>
                <h1>Resturant Update</h1>
                <input  onChange={(event )=>{this.setState({name:event.target.value})}} 
                placeholder ="Resturant Name" value={this.state.name} /> <br/>  <br/>
                 <input  onChange={(event )=>{this.setState({email:event.target.value})}} 
                placeholder ="Resturant Email" value={this.state.email}  /> <br/>  <br/>
                <input  onChange={(event )=>{this.setState({rating:event.target.value})}} 
                placeholder ="Resturant Rating" value={this.state.rating} /> <br/>  <br/>
                 <input  onChange={(event )=>{this.setState({address:event.target.value})}} 
                placeholder ="Resturant Address" value={this.state.address}  /> <br/>  <br/>
                <button onClick={()=>{this.update()}}>Update Resturant</button>
            </div>
            </div>
        )
    }
}
export default ResturantUpdate;