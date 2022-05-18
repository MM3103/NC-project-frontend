import {useKeycloak} from "@react-keycloak/web";
import React, {useState} from "react";
import axios from "axios";
import {useAx} from "./ShowAllActiveCityRequest";

const CreateStreet = () => {
    const {keycloak, initialized} = useKeycloak();
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const names = useAx();

    const texts = [''];
    if (names.length !== undefined) {
        if (names.length === 1) {
            for (let i = 0; i < names.length; i++) {
                texts[i + 1] = names[i].name;
            }
        }
        else {
            for (let i = 0; i < names.length; i++) {
                texts[i] = names[i].name;
            }
        }
    }


    const options = texts.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    function up(nameCity) {
        if (names.length !== undefined) {
            for (let i = 0; i < names.length; i++) {
                if (nameCity === names[i].name) {
                    handleSubmit(nameCity, names[i].id)
                }
            }
        }

    }

    function handleSubmit(nameCity, id) {
        const city = {
            id: id,
            name: nameCity
        }

        const response = axios.post('http://localhost:8484/street/add', {name, city},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then(response => window.location.assign('http://localhost:3000/addStreet')).catch(response => window.location.assign('http://localhost:3000/ntDB'))

    }

    function CheckEmpty(name) {
        return (name.trim() !== '');
    }

    return (
            <div>
                <h1 align="center">What street do you want to add ?</h1>
                <form align="center">
                    <h2>New street:</h2>
                    <label>
                        Name:
                        <input
                            type="name"
                            name="name"
                            placeholder="enter a name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </label>
                    <label>
                        Select city:
                        <select value={value} onChange={(event) => setValue(event.target.value)}>
                            {options}
                        </select>
                    </label>
                </form>

                <button
                    type="button"
                    className="but1"
                    onClick={() => up(value)}
                    disabled={CheckEmpty(name) === false}
                >
                    Add new street
                </button>

            </div>

    );


};
export default CreateStreet;