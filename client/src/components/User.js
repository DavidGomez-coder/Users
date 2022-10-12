import React, { Component } from "react";
import { Card, Container, Row, Col, Button, Popover, OverlayTrigger } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import user_photo from "../assets/user_photo.png";
import { PieChart, Pie, Cell, Legend, LabelList } from "recharts";


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
                                                            this.state.data_chart.map((entry, index) => <Cell key={this.state.user_name} fill={COLORS[index % COLORS.length]}/>)
                                                        }
                                                    </Pie>
                                                </PieChart>

                                            </Popover.Body>
                                        </Popover>
                                    }>
                                        <Button style={{"marginRight" : "1%"}} variant="success">Connection Stats</Button>
                                    </OverlayTrigger>               
            </>
        )
    }
}



