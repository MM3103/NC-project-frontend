import React from 'react';
import {useKeycloak} from "@react-keycloak/web";
import './Nav.css';

const Citiespage = () => {
    const { keycloak } = useKeycloak();


    if (keycloak.tokenParsed.preferred_username ==="admin") {
        return (
            <div>
                <h1 align="center">What do you want to do ?</h1>
                <div className="left">
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/createCity')}
                    >
                        Add new city
                    </button>
                    <h1>       </h1>
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/showAllCities')}
                    >
                        Show all  cities
                    </button>
                    <h1>       </h1>
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/createStreet')}
                    >
                        Add new street
                    </button>
                    <h1>       </h1>
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/showAllStreets')}
                    >
                        Show all  streets
                    </button>
                    <h1>       </h1>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1 align="center">You need to be an admin to view this page</h1>
            </div>
        );
    }

};

export default Citiespage;