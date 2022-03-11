import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./pages/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Clientpage";
import PrivateRoute from "./pages/PrivateRoute";
import './App.css';
import Accept from "./pages/Accept";
import ShowAll from "./pages/ShowAll";
import ShowUserOrders from "./pages/ShowUserOrders";
import CreateNewOrder from "./pages/CreateNewOrder";
import Update from "./pages/Update";
import AcceptOrder from "./pages/OrderAccept";
import UnacceptOrder from "./pages/OrderUnaccepted";
import Created from "./pages/Created";
import UpdateForUser from "./pages/UpdateForUser";




function App() {
    return (
        <div>
            <ReactKeycloakProvider authClient={keycloak}>
                <Nav />
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<WelcomePage />} />
                        <Route
                            path="/client"
                            element={
                                <PrivateRoute>
                                    <SecuredPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/createNewOrder"
                            element={
                                <PrivateRoute>
                                    <CreateNewOrder />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/accept/:id"
                            element={
                                <PrivateRoute>
                                    <Accept />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/showAll"
                            element={
                                <PrivateRoute>
                                    <ShowAll />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/showUserOrders"
                            element={
                                <PrivateRoute>
                                    <ShowUserOrders />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/acceptOrder"
                            element={
                                <PrivateRoute>
                                    <AcceptOrder />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/unacceptOrder"
                            element={
                                <PrivateRoute>
                                    <UnacceptOrder />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/update/:id"
                            element={
                                <PrivateRoute>
                                    <Update />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/updateForUser/:id"
                            element={
                                <PrivateRoute>
                                    <UpdateForUser />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/created"
                            element={
                                <PrivateRoute>
                                    <Created />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
