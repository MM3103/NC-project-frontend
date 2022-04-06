import {useKeycloak} from "@react-keycloak/web";
import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router";

const UpdateCity = () => {

    const params = useParams();
    const cityId = params.id;

    const {keycloak, initialized} = useKeycloak()
    const [name,setName] = useState("");

    function patchCity(name) {
        const response =  axios.patch('http://localhost:8484/city/update/'+ cityId ,{name},
            { headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/showAllCities') )}


    function CheckEmpty(name) {
        return (name.trim() !== '');
    }


    return     (

        <div>
            <h1 align="center">What do you want to update ?</h1>
            <form align="center">
                <label>
                    <h3> Name:</h3>
                    <input
                        type="name"
                        name="name"
                        placeholder="enter a name"
                        value={name}
                        onChange={event =>setName(event.target.value)  }
                    />
                </label>
            </form>

            <button
                type="button"
                className="but1"
                align="center"
                onClick={()=>patchCity(name)}
                disabled={CheckEmpty(name)===false}

            >
                Update city
            </button>
        </div>
    );
};
export default UpdateCity;