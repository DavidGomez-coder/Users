import { Component } from "react";
import User from "./User.js";
import { Container, Nav, Navbar } from 'react-bootstrap';
import {Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';


const API_HOST = "http://localhost:8888";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            users_load: false
        }
    }

    componentDidMount() {
        fetch(API_HOST+"/api/users")
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            this.setState({
                users: json, 
                users_load: true
            });
        });
    }

    render() {
        return (
            <>
            {/* NavBar */}
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Users</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#allusers">Show all users</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <br></br>
            {/* Show users */}
            <Container>
            {this.state.users.map((user) => (
                <Row id={user.id} className="justify-content-md-center">
                    <User  user_name={user.name} users_connected={user.connections.length} users_not_connected={this.state.users.length - user.connections.length} style={{"margin" : "2%"}}/>
                </Row>
                
            ))}
            </Container>
            
           
            </>
        )
    }
}