import { Component } from "react";
import User from "./User.js";
import { Container, Nav, Navbar, Offcanvas, Button, Form } from 'react-bootstrap';
import { Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { First } from "react-bootstrap/esm/PageItem.js";


const API_HOST = "http://localhost:8888";

const CANVAS_CONNECTION = 0;
const CANVAS_USER = 1;

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            users_load: false,
            current_users: [],
            //off canvas 
            show_canvas: false,
            current_canvas: CANVAS_CONNECTION,
            // connect users
            user1_to_connect: "",
            user2_to_connect: "",
            //USER NAME
            newUserName: "",
            //
            responseStatus: 200,
        }

    }



    async componentDidMount() {
        await fetch(API_HOST + "/api/users")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    users: json,
                    users_load: true,
                    current_users: json,
                    user1_to_connect : json[0].id,
                    user2_to_connect : json[0].id
                });
            });
    }

    async addNewUser() {
        const fetch_config = {
            method : "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify({
                "name" : this.state.newUserName
            })
        }
        await fetch(API_HOST + "/api/user/add", fetch_config)
        .then((res) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    responseStatus: res.status,
                    show_canvas: false,
                }
            });

        })
        .catch(error => {
            console.log(error.message)
            this.setState(prevState => {
                return {
                    ...prevState,
                    responseStatus: 404
                }
            });
        })
        window.location.reload();
    }

    async addNewConnection(){
        const userid1 = this.state.user1_to_connect;
        const userid2 = this.state.user2_to_connect;

        const fetch_config = {
            method : "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify({
                "id1" : userid1,
                "id2" : userid2
            })
        }

        await fetch(API_HOST + "/api/addConnection", fetch_config)
        .then((res) => {
            console.log(res)
        })
        .catch(error => {
            console.log(error.message)
            this.setState(prevState => {
                return {
                    ...prevState,
                    responseStatus: 404
                }
            });
        })
        window.location.reload();
    }

    async getAllUsers() {
        await fetch(API_HOST + "/api/users")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    users: json,
                    users_load: true,
                    current_users: json
                });
            })
            .catch(error => {
                console.log(error.message)
                this.setState(prevState => {
                return {
                    ...prevState,
                    responseStatus: 404
                }
            });
            }) 
    }

    setUser1ToConnect(userid) {
        this.setState(prevState => {
            return {
                ...prevState,
                user1_to_connect: userid
            }
        })
    }

    setUser2ToConnect(userid) {
        this.setState(prevState => {
            return {
                ...prevState,
                user2_to_connect: userid
            }
        })
    }



    turnOnCanvas(canvas) {
        this.setState(prevState => {
            return {
                ...prevState,
                show_canvas: true,
                current_canvas: canvas
            }
        })
    }

    turnOffCanvas() {
        this.setState(prevState => {
            return {
                ...prevState,
                show_canvas: false
            }
        })
    }

    render() {
        return (
            <>
                {/* NavBar */}
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Container>
                        <Navbar.Brand href="#home">Users</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#allusers" onClick={(ev) => {this.getAllUsers()}}>Show all users</Nav.Link>
                            <Nav.Link href="#addConnection" onClick={(ev) => { this.turnOnCanvas(CANVAS_CONNECTION) }} >New Connection</Nav.Link>
                            <Nav.Link href="#newUser" onClick={(ev) => { this.turnOnCanvas(CANVAS_USER) }}>Add New User</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <br></br>
                {/* Show users */}
                <Container>
                    {this.state.current_users.map((user) => (
                        <Row id={user.id} className="justify-content-md-center">
                            <User user_name={user.name} users_connected={user.connections.length} users_not_connected={this.state.users.length - user.connections.length} style={{ "margin": "2%" }} />
                        </Row>

                    ))}
                </Container>

                {/* Off Canvas */}
                <Offcanvas show={this.state.show_canvas} onHide={(ev) => { this.turnOffCanvas() }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{this.state.current_canvas === CANVAS_CONNECTION ? "Add new connection" : 
                                          this.state.current_canvas === CANVAS_USER       ? "Add new user" : ""}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form>

                            {(() => {
                                if (this.state.current_canvas === CANVAS_CONNECTION) {
                                    return (
                                        <>
                                            <Form.Group className="mb-3" controlId="userconnection1">
                                                <Form.Label>User 1</Form.Label>
                                                <Form.Select value={this.state.user1_to_connect} onChange={(ev) => { this.setUser1ToConnect(ev.target.value) }}>
                                                    {this.state.users.map((user) => (
                                                        <option value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userconnection2">
                                                <Form.Label>User 2</Form.Label>
                                                <Form.Select value={this.state.user2_to_connect} onChange={(ev) => { this.setUser2ToConnect(ev.target.value) }}>
                                                    {this.state.users.map((user) => (
                                                        <option value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Text className="muted">
                                                    {this.state.user1_to_connect === this.state.user2_to_connect ? "Users cannot connect with theirself" : ""}
                                            </Form.Text>
                                            <br /> <br />
                                            <Button variant="success" onClick={(ev) => { this.addNewConnection() }} disabled={this.state.user1_to_connect === this.state.user2_to_connect}>Connect</Button>
                                            <br />

                                        </>
                                    )
                                } else if (this.state.current_canvas === CANVAS_USER) {
                                    return (
                                        <>
                                            <Form.Group className="mb-3" controlId="userconnection1">
                                                <Form.Label></Form.Label>
                                                <Form.Control value={this.state.newUserName} type="text" placeholder="Username" onChange={(ev) => {
                                                    this.setState({newUserName: ev.target.value})
                                                }}/>
                                            </Form.Group>
                                            <Form.Text className="muted">
                                                    {this.state.responseStatus !== 200 || this.state.newUserName.trim().length === 0 ? "Username format is not valid" : ""}
                                            </Form.Text>
                                            <br /> <br />
                                            <Button variant="success" onClick={(ev) => { this.addNewUser();}} disabled={this.state.newUserName.trim().length === 0}>Add user</Button>
                                           
                                            
                                        </>)
                                }
                            })()}


                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>

            </>
        )
    }
}