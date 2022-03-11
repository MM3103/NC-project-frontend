import React from 'react';

import './Nav.css';
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import {useParams} from "react-router";

const Accept = () => {
    const {keycloak, initialized} = useKeycloak();
    const params = useParams();
    const orderId = params.id;

    function accept() {
        const response = axios.get('http://localhost:8484/order/acceptedorder/'+orderId,
            { headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/acceptOrder') )}

    function reject() {
        axios.get('http://localhost:8484/order/unacceptedorder/'+orderId,
            { headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/unacceptOrder') )}

         return (
            <div>
                <h1 align="center">
                    Do you want to accept order?</h1>
                <button
                    type="button"
                    className="but2"
                    onClick={()=>accept()}
                >
                    Accept
                </button>
                <button
                    type="button"
                    className="but2"
                    onClick={()=>reject()}
                >
                    Reject
                </button>
            </div>
        );
};

export default Accept;