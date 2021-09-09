import React, { Component } from "react";
import { Table, Form,Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBarMenu  from "./NavBarMenu";
import { Link } from "react-router-dom";

class ResturantSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchData: null,
      noData: false,
      lastSearch:"",
    };
  }
  search(key) {
    console.warn(key);
    this.setState({lastSearch:key})
    fetch("http://localhost:3000/restuarant?q=" + key).then((data) => {
      data.json().then((resp) => {
        console.warn("resp", resp);
        if (resp.length > 0) {
          this.setState({ searchData: resp, noData: false });
        } else {
          this.setState({ noData: true, searchData: null });
        }
      });
    });
  }
  delete(id) {
    fetch("http://localhost:3000/restuarant/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((resp) => {
        alert("Resturant has been deleted");
        this.search(this.state.lastSearch);
      });
    });
  }
  render() {
    return (
      <Container>
          <NavBarMenu/>
        <h1>Resturant Search</h1>
        
        <Form.Control type="text"  onChange={(event) => this.search(event.target.value)} placeholder="Search Resturant" />
        <div>
          {this.state.searchData ? (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Location</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.searchData.map((item) => (
                  <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.rating}</td>
                  <td>{item.address}</td>
                  <td>
                    <Link to={"/update/" + item.id}>
                      <FontAwesomeIcon icon={faEdit} color="Orange" />
                    </Link>
                    <span onClick={() => this.delete(item.id)}>
                      <FontAwesomeIcon icon={faTrash} color="red" />
                    </span>
                  </td>
                </tr>
                ))}
                </tbody>
              </Table>
            </div>
          ) : (
            ""
          )}

          {this.state.noData ? <h3>No Data Found </h3> : null}
        </div>
      </Container>
    );
  }
}
export default ResturantSearch;
