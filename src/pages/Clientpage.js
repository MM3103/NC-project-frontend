import React from 'react';
import {useKeycloak} from "@react-keycloak/web";
import './Nav.css';

const Client = () => {
    const { keycloak } = useKeycloak();


    if (keycloak.tokenParsed.preferred_username ==="admin") {
        return (
            <div>
                <h1 align="center">What do you want to do ?</h1>
                <div className="left">
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/createNewOrder')}
                    >
                        Add new order
                    </button>
                    <h1>       </h1>
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/showUserOrders')}
                    >
                        Show all your orders
                    </button>
                    <h1>       </h1>
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/showAll')}
                    >
                        Show orders of all users
                    </button>

                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1 align="center">What do you want to do ?</h1>
                <div className="left">
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/createNewOrder')}
                    >
                        Add new order
                    </button>
                    <h1>       </h1>
                    <button
                        type="button"
                        className="but1"
                        onClick={() => window.location.assign('http://localhost:3000/showUserOrders')}
                    >
                        Show all your orders
                    </button>
                </div>
            </div>
        );
    }

};

export default Client;