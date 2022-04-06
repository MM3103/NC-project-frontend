import {useKeycloak} from "@react-keycloak/web";
import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import {useAx1} from "./ShowAllActiveStreetsRequest";


const Update = () => {

    const params = useParams();
    const orderId = params.id;

    const {keycloak, initialized} = useKeycloak()
    const [typeOrder, setTypeOrder] = useState("");
    const [cityName, setCityName] = useState("");
    const [streetName, setStreetName] = useState("");
    const [flat, setFlat] = useState(0);
    const [house, setHouse] = useState(0);
    const [selfInstallation, setSelfInstallation] = useState(false);


    const streets = useAx1();
    const citiesNamesSet = new Set();
    citiesNamesSet.add('')
    if (streets.length !== undefined) {
        for (let i = 0; i < streets.length; i++) {
            citiesNamesSet.add(streets[i].city.name);
        }
    }
    const citiesNamesArray = Array.from(citiesNamesSet);
    const options = citiesNamesArray.map((text, index) => {
        return <option key={index}>{text}</option>;
    });



    let options1 = [];
    const streetsOnCity = [];
    if (streets.length !== undefined) {
        for (let i = 0; i < streets.length; i++) {
            if (streets[i].city.name === cityName) {
                streetsOnCity[0]=''
                streetsOnCity[streetsOnCity.length + 1] = streets[i].name
            }
        }
        options1 = streetsOnCity.map((text, index) => {
            return <option key={index}>{text}</option>;
        });
    }

    let options2= [];
    const typeOrders = ['Connection','Deactivation','Repair'];
    options2 = typeOrders.map((text, index) => {
        return <option key={index}>{text}</option>;
    });



    function CheckTrue(checkboxElem) {
        if (checkboxElem) {
            setSelfInstallation(checkboxElem)
        } else {
            setSelfInstallation(checkboxElem)
        }
    }


    function up(nameCity,streetName) {
        if (streets.length !== undefined) {
            for (let i = 0; i < streets.length; i++) {
                if ((nameCity === streets[i].city.name) && (streetName === streets[i].name)) {
                    patchOrder(streets[i].city.id,nameCity,streets[i].id,streetName)
                }
            }

        }

    }




    function patchOrder(cityId, nameCity,streetID,streetName) {
        const city = {
            id: cityId,
            name: nameCity
        }
        const street = {
            id:streetID,
            name:streetName,
            city:city
        }

        const response =  axios.patch('http://localhost:8484/order/'+ orderId ,{typeOrder, city,street,house,flat, selfInstallation},
            { headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/showAll') ).catch(response =>window.location.assign('http://localhost:3000/ntDB'))}


    function CheckEmpty(typeOrder,city,street) {
        return (typeOrder.trim() !== '')&&(city.trim() !== '')&&(street.trim() !== '');
    }


    return     (

        <div>
            <h1 align="center">What do you want to update ?</h1>
            <form align = "center">
                <h2>New order:</h2>
                <label>
                    <h3>Type of order:</h3>
                    Select type of order:
                    <select value={typeOrder} onChange={(event) => setTypeOrder(event.target.value)}>
                        {options2}
                    </select>
                </label>
                <label>
                    <h3>City:</h3>
                    Select city:
                    <select value={cityName} onChange={(event) => setCityName(event.target.value)}>
                        {options}
                    </select>
                </label>
                <h1>   </h1>
                <label>
                    <h3>Street:</h3>
                    Select street:
                    <select value={streetName} onChange={(event) => setStreetName(event.target.value)}>
                        {options1}
                    </select>
                </label>
                <h1>   </h1>
                <label>
                    <h3>House:</h3>
                    <input
                        type="house"
                        name="house"
                        placeholder="enter a house"
                        value={house}
                        onChange={event => setHouse(parseInt(event.target.value))}
                    />
                </label>
                <h1>   </h1>
                <label>
                    <h3>Flat:</h3>
                    <input
                        type="flat"
                        name="flat"
                        placeholder="enter a flat"
                        value={flat}
                        onChange={event => setFlat(parseInt(event.target.value))}
                    />
                </label>
                <h1>   </h1>
                <label>
                    <h3>
                        Self installation:</h3>
                    <input
                        type="checkbox"
                        name="selfInstallation"
                        value={selfInstallation}
                        onChange={event => CheckTrue(event.target.checked)}
                    />
                </label>
                <h1>   </h1>
            </form>

            <button
                type="button"
                className="but1"
                align="center"
                onClick={()=>up(cityName,streetName)}
                disabled={CheckEmpty(typeOrder,cityName,streetName)===false}

            >
                Update order
            </button>
        </div>
    );
};
export default Update;