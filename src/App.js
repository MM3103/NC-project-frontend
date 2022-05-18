import React, {Suspense} from "react";
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
import NotAnswer from "./pages/NotAnswer";
import DBNotAnswer from "./pages/DBNotAnswer";
import Citiespage from "./pages/Citiespage";
import CreateCity from "./pages/CreateCity";
import UpdateCity from "./pages/UpdateCity";
import ShowAllCity from "./pages/ShowAllCity";
import CreateStreet from "./pages/CreateStreet";
import ShowAllStreets from "./pages/ShowAllStreets";
import AddCity from "./pages/AddCity";
import AddStreet from "./pages/AddStreet";
import UpdateStreet from "./pages/UpdateStreet";
import Spinner from "react-bootstrap/Spinner";




function App() {
    return (
        <div>
            <ReactKeycloakProvider authClient={keycloak}>
                <Nav />
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<WelcomePage />} />
                        <Route exact path="/nt" element={<NotAnswer />} />
                        <Route
                            path="/ntDB"
                            element={
                                <PrivateRoute>
                                    <DBNotAnswer />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/client"
                            element={
                                <PrivateRoute>
                                    <SecuredPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/citiespage"
                            element={
                                <PrivateRoute>
                                    <Citiespage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/createCity"
                            element={
                                <PrivateRoute>
                                    <CreateCity />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/updateCity/:id"
                            element={
                                <PrivateRoute>
                                    <UpdateCity />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/showAllCities"
                            element={
                                <PrivateRoute>
                                        <ShowAllCity />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/showAllStreets"
                            element={
                                <PrivateRoute>
                                    <ShowAllStreets />
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
                            path="/createStreet"
                            element={
                                <PrivateRoute>
                                    <CreateStreet />
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
                        <Route
                            path="/addCity"
                            element={
                                <PrivateRoute>
                                    <AddCity />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/addStreet"
                            element={
                                <PrivateRoute>
                                    <AddStreet />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/updateStreet/:id"
                            element={
                                <PrivateRoute>
                                    <UpdateStreet />
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
