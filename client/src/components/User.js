import React, { Component } from "react";
import { Card, Container, Row, Col, Button, Popover, OverlayTrigger } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import user_photo from "../assets/user_photo.png";
import { PieChart, Pie, Cell, Legend, LabelList } from "recharts";

const pie_data = [
    {
        "name" : "Conectados",
        "value" : 200,
    },

    {
        "name" : "No Conectados",
        "value": 100
    }
]

const COLORS = ["#19a82a", "#a82519"]


export default class User extends Component {
    constructor(props) {
        super(props);

        //initial state
        this.state = {
            user_name : props.user_name,
            data_chart : [
                {
                    "name" : "Reached",
                    "value" : props.users_connected,
                },
            
                {
                    "name" : "Not reached",
                    "value": props.users_not_connected
                }
            ]
        }

    }
    

    render () {
        return  (
            <>  
                                {/* User and photo*/}
                                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} style={{"margin" : "1%"}}>
                                    
                                    <img src={user_photo} width="15%"/>
                                    <br />
                                    <label><strong>{this.state.user_name}</strong></label>
                                    <br /> <br />
                                    <OverlayTrigger trigger="click" placement="left" overlay={
                                        <Popover id="stats-popover">
                                            <Popover.Header as="h3">Number of people reached</Popover.Header>
                                            <Popover.Body>
                                                <PieChart width={200} height={200}>
                                                    <Legend></Legend>
                                                    <Pie data={this.state.data_chart} dataKey="value" nameKey="name"  outerRadious={40} fill="#8884d8">
                                                        <LabelList dataKey="value" position="inside"/>
                                                        {
                                                            this.state.data_chart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                                        }
                                                    </Pie>
                                                </PieChart>

                                            </Popover.Body>
                                        </Popover>
                                    }>
                                        <Button style={{"marginRight" : "1%"}} variant="success">Connection Stats</Button>
                                    </OverlayTrigger>
                                    
                                    <Button style={{"marginLeft" : "1%"}}>Connections</Button>
                                    
                                    
                                </Col>
                                
                                
            </>
        )
    }
}



