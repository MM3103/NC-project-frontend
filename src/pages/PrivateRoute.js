import { useKeycloak } from "@react-keycloak/web";
import {Spin} from "antd";
import React from "react";
import './Loading.css';

const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children:
        <div className="example">
            <Spin size="large" />
         </div>;
};

export default PrivateRoute;