import {useKeycloak} from "@react-keycloak/web";
import React, {useState} from "react";
import axios from "axios";

const CreateCity = () => {
    const {keycloak, initialized} = useKeycloak()
    const [name, setName] = useState("");


    function handleSubmit() {
        const response = axios.post('http://localhost:8484/city/add', {name},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then(response => window.location.assign('http://localhost:3000/addCity')).catch(response =>window.location.assign('http://localhost:3000/ntDB'))

    }

    function CheckEmpty(name) {
        return (name.trim() !== '');
    }


    return (
        <div>
            <h1 align="center">What city do you want to add ?</h1>
            <form align = "center">
                <h2>New city:</h2>
                <label>
                    <h3>Name:</h3>
                    <input
                        type="name"
                        name="name"
                        placeholder="enter a name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </label>
            </form>

            <button
                type="button"
                className="but1"
                onClick={()=>handleSubmit()}
                disabled={CheckEmpty(name)===false}
            >
                Add new city
            </button>

        </div>
    );

};
export default CreateCity;