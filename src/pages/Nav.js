import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import './Nav.css';
import axios from "axios";

const Nav = () => {
    const { keycloak,initialized } = useKeycloak();

    function checkInitialized() {
       return ( initialized ? keycloak.login() : window.location.assign('http://localhost:3000/nt')
       );
    }


    if (keycloak.authenticated) {
        if (keycloak.tokenParsed.preferred_username ==="admin") {
            return (
                <div>
                    <div className="mid">
                        <div className="navbar">
                            <li>
                                <a className="seven" href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className="seven" href="/client">
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a className="seven" href="/citiespage">
                                    City
                                </a>
                            </li>
                            <div className="right">
                                {!keycloak.authenticated && (
                                    <button
                                        type="button"
                                        className="but"
                                        onClick={() => checkInitialized()}
                                    >
                                        Login
                                    </button>
                                )}

                                {!!keycloak.authenticated && (
                                    <button
                                        type="button"
                                        className="but"
                                        onClick={() => keycloak.logout()}
                                    >
                                        Logout ({keycloak.tokenParsed.preferred_username})
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="mid">
                        <div className="navbar">
                            <li>
                                <a className="seven" href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className="seven" href="/client">
                                    Orders
                                </a>
                            </li>
                            <div className="right">
                                {!keycloak.authenticated && (
                                    <button
                                        type="button"
                                        className="but"
                                        onClick={() => checkInitialized()}
                                    >
                                        Login
                                    </button>
                                )}

                                {!!keycloak.authenticated && (
                                    <button
                                        type="button"
                                        className="but"
                                        onClick={() => keycloak.logout()}
                                    >
                                        Logout ({keycloak.tokenParsed.preferred_username})
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
    else {
        return (
            <div>
                <div className="mid">
                    <div className="navbar">
                        <li>
                            <a className="seven" href="/">
                                Home
                            </a>
                        </li>
                        <div className="right">
                            {!keycloak.authenticated && (
                                <button
                                    type="button"
                                    className="but"
                                    onClick={() => checkInitialized()}
                                >
                                    Login
                                </button>
                            )}

                            {!!keycloak.authenticated && (
                                <button
                                    type="button"
                                    className="but"
                                    onClick={() => keycloak.logout()}
                                >
                                    Logout ({keycloak.tokenParsed.preferred_username})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Nav;