import {useKeycloak} from "@react-keycloak/web";
import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router";

const UpdateForUser = () => {

    const params = useParams();
    const orderId = params.id;

    const {keycloak, initialized} = useKeycloak()
    const [typeOrder, setTypeOrder] = useState("");
    const [address, setAddress] = useState("");

    function patchOrder(typeOrder, address) {
        const response = axios.patch('http://localhost:8484/order/' + orderId, {typeOrder, address},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then(response => window.location.assign('http://localhost:3000/showUserOrders'))
    }


    function CheckEmpty(typeOrder, address) {
        return (typeOrder.trim() !== '') && (address.trim() !== '');
    }

    return (

        <div>
            <h1 align="center">What do you want to update ?</h1>
            <form align="center">
                <label>
                    <h3> Type of order:</h3>
                    <input
                        type="typeOrder"
                        name="typeOrder"
                        placeholder="enter a type of order"
                        value={typeOrder}
                        onChange={event => setTypeOrder(event.target.value)}
                    />
                </label>
                <label>
                    <h3> Address:</h3>
                    <input
                        type="address"
                        name="address"
                        placeholder="enter an address"
                        value={address}
                        onChange={event => setAddress(event.target.value)}
                    />
                </label>

                <h1></h1>
            </form>

            <button
                type="button"
                className="but1"
                align="center"
                onClick={() => patchOrder(typeOrder, address)}
                disabled={CheckEmpty(typeOrder, address) === false}

            >
                Update order
            </button>
        </div>
    );
};
export default UpdateForUser;