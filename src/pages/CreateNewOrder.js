import {useKeycloak} from "@react-keycloak/web";
import React, {useState} from "react";
import axios from "axios";

const CreateNewOrder = () => {
    const {keycloak, initialized} = useKeycloak()
    const [typeOrder, setTypeOrder] = useState("");
    const [address, setAddress] = useState("");

function handleSubmit() {
        const response = axios.post('http://localhost:8484/order', {typeOrder, address},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then(response => window.location.assign('http://localhost:3000/created')).catch(response =>window.location.assign('http://localhost:3000/ntDB'))

}

    function CheckEmpty(typeOrder,address) {
        return (typeOrder.trim() !== '')&&(address.trim() !== '');
    }


    return (
            <div>
                <h1 align="center">What kind оf order do you want to create ?</h1>
                <form align = "center">
                    <h2>New order:</h2>
                    <label>
                        <h3>Type of order:</h3>
                        <input
                            type="typeOrder"
                            name="typeOrder"
                            placeholder="enter a type of order"
                            value={typeOrder}
                            onChange={event => setTypeOrder(event.target.value)}
                        />
                    </label>
                    <label>
                    <h3>Address:</h3>
                        <input
                            type="address"
                            name="address"
                            placeholder="enter an address"
                            value={address}
                            onChange={event => setAddress(event.target.value)}
                        />
                    </label>
                    <h1>   </h1>
                </form>

                <button
                    type="button"
                    className="but1"
                    onClick={()=>handleSubmit()}
                    disabled={CheckEmpty(typeOrder,address)===false}
                >
                    Create new order
                </button>

            </div>
        );

};
export default CreateNewOrder;