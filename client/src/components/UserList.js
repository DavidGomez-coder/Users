import { Component } from "react";
import User from "./User.js";
import { Container, Nav, Navbar, Offcanvas, Button, Form, Col } from 'react-bootstrap';
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
            userToFilter: "all",
            //
            responseStatus: 200,
            selected_user: "",
            connectionUsers: ""
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
                    user1_to_connect: json[0].id,
                    user2_to_connect: json[0].id,
                    userToFilter: json[0].id,
                });
            });
    }

    async addNewUser() {
        const fetch_config = {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "name": this.state.newUserName
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
        // update users list
        await this.getAllUsers();
    }

    async addNewConnection() {
        const userid1 = this.state.user1_to_connect;
        const userid2 = this.state.user2_to_connect;

        const fetch_config = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "id1": userid1,
                "id2": userid2
            })
        }

        await fetch(API_HOST + "/api/addConnection", fetch_config)
            .then(async (res) => {
                
            })
            .catch(error => {
                console.log(error.message)
                this.setState(prevState => {
                    return {
                        ...prevState,
                        responseStatus: 404
                    }
                });
            });
            await this.getAllUsers();

    }

    async getAllUsers() {
        await this.updateAllUsers();
    }

    async updateAllUsers() {
        await fetch(API_HOST + "/api/users")
            .then((res) => res.json())
            .then((json) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        users : json,
                        current_users : json,
                        users_load: true,
                    }
                })
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

    async getUserConnections() {
        await this.getAllUsers();
        console.log("USER_ID: " + this.state.connectionUsers)
        await fetch (API_HOST + `/api/connections/${this.state.connectionUsers}`)
        .then ( (res) => { return res.json()})
        .then ( (json) => {
            console.log(json)
            this.setState(prevState => {
                return {
                    ...prevState,
                    current_users: json  
                }
            })
        })
        .catch (error => {
            console.log(error.message);
            this.setState(prevState => {
                return {
                    ...prevState,
                    users_load: false,
                    responseStatus: 404
                }
            });
        });
        
    }

    async getUser(userid){
        if (userid === "all"){
            await this.getAllUsers();
        }else {
            await fetch(API_HOST + "/api/user/" + userid)
            .then( (res) => res.json())
            .then((json) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        current_users: [json]
                    }
                })
            })
        }
        
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

    setSelectedUser(selectedUser){
        this.setState(prevState => {
            return {
                ...prevState,
                selected_user: selectedUser
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
                            <Nav.Link href="#addConnection" onClick={(ev) => { this.turnOnCanvas(CANVAS_CONNECTION) }} >New Connection</Nav.Link>
                            <Nav.Link href="#newUser" onClick={(ev) => { this.turnOnCanvas(CANVAS_USER) }}>Add New User</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            < Form.Select value={this.state.userToFilter} onChange={(ev) => { this.setState({userToFilter : ev.target.value}) }}>
                                <option key="all-users" value="all">
                                    All
                                </option>
                                {this.state.users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}

                            </Form.Select>
                            <Button variant="outline-success" onClick={(ev) => {this.getUser(this.state.userToFilter) }}>Get</Button>
                        </Form>
                    </Container>
                </Navbar>

                <br></br>
                {/* Show users */}
                <Container>
                    {this.state.current_users.map((user) => (
                        <Row id={user.id} className="justify-content-md-center">
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} style={{"margin" : "1%"}}>
                            <User key={user.id} user_name={user.name} users_connected={user.connections.length} 
                                                users_not_connected={this.state.users.length - user.connections.length - 1} 
                                                style={{ "margin": "2%" }} />
                                                
                            <Button style={{"marginLeft" : "1%"}} disabled={user.connections.length === 0} onClick={ (ev) => {
                                 this.setState(prevState => {return {...prevState, connectionUsers : user.id}})
                                 this.getUserConnections(); }}>Connections</Button>
                            </Col>
                        </Row>

                    ))}
                </Container>

                {/* Off Canvas */}
                <Offcanvas show={this.state.show_canvas} onHide={(ev) => { this.turnOffCanvas() }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{this.state.current_canvas === CANVAS_CONNECTION ? "Add new connection" :
                            this.state.current_canvas === CANVAS_USER ? "Add new user" : ""}</Offcanvas.Title>
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
                                                        <option key={user.id + "_2"} value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="userconnection2">
                                                <Form.Label>User 2</Form.Label>
                                                <Form.Select value={this.state.user2_to_connect} onChange={(ev) => { this.setUser2ToConnect(ev.target.value) }}>
                                                    {this.state.users.map((user) => (
                                                        <option key={user.id + "_3"} value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Text className="muted">
                                                {this.state.user1_to_connect === this.state.user2_to_connect ? "Users cannot connect with theirself" : ""}
                                            </Form.Text>
                                            <br /> <br />
                                            <Button variant="success" onClick={(ev) => { this.addNewConnection(); this.turnOffCanvas(); }} disabled={this.state.user1_to_connect === this.state.user2_to_connect}>Connect</Button>
                                            <br />

                                        </>
                                    )
                                } else if (this.state.current_canvas === CANVAS_USER) {
                                    return (
                                        <>
                                            <Form.Group className="mb-3" controlId="userconnection1">
                                                <Form.Label></Form.Label>
                                                <Form.Control value={this.state.newUserName} type="text" placeholder="Username" onChange={(ev) => {
                                                    this.setState({ newUserName: ev.target.value })
                                                }} />
                                            </Form.Group>
                                            <Form.Text className="muted">
                                                {this.state.responseStatus !== 200 || this.state.newUserName.trim().length === 0 ? "Username format is not valid" : ""}
                                            </Form.Text>
                                            <br /> <br />
                                            <Button variant="success" onClick={(ev) => { this.addNewUser(); this.turnOffCanvas(); }} disabled={this.state.newUserName.trim().length === 0}>Add user</Button>


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