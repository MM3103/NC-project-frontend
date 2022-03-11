import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import './Nav.css';

const Nav = () => {
    const { keycloak } = useKeycloak();

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
                                            onClick={() => keycloak.login()}
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
};

export default Nav;