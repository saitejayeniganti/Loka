import { useEffect, useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import Navigator from "./components/Navigator";
import { get } from "./utils/serverCall";
import AdminHome from "./views/admin/adminHome";
import CustomerHome from "./views/customer/customerHome";
import Home from "./views/common/Home";
import Login from "./views/common/Login";
import ProductList from "./views/product/ProductList";
import Product from "./views/product/Product";
import MerchantHome from "./views/merchant/merchantHome";
import Signup from "./views/common/Signup";
import LocationSearch from "./components/LocationSearch";

import MapTest from "./views/maptest";

import RouteMap from "./views/routeMap";
import MerchantLogin from "./views/merchant/merchantLogin";
import MerchantInventory from "./views/merchant/merchantInventory";
import { useSelector } from "react-redux";
import { REDUCER } from "./utils/consts";
import CustomerSignup from "./views/customer/customerSignup";
import { ErrorPath, Unknown } from "./views/common/ErrorPath";
import Profile from "./views/common/Profile";
import PayPalTest from "./views/paypalTest";
import AdRequest from "./views/AdRequest";
import MerchantMap from "./views/maptest";
import SimpleMap from "./views/maptest";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = useSelector((state) => state.loginReducer);
  // const location = useLocation();
  // location.pathname;

  const getUser = async () => {
    get("/auth/loggedUser")
      .then((response) => {
        console.log(response);
        if (response.user && response.user.temp === 1) {
          console.log(window.location.pathname);
          if (window.location.pathname.includes("/signup")) {
            setUser(response.user);
          } else {
            // delete cookie
            get("/auth/reset").then(() => {
              setUser(null);
              // cookies.remove("Token");
            });
          }
        } else {
          console.log("logged in - ", response.user);
          setUser(response.user);
          setIsLoggedIn(true);
        }
        //store in local storage ?
        //store in redux
        //pass as params to child components
        //setUser()
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // console.log("login changed", loginState[REDUCER.SIGNEDIN]);
    if (loginState[REDUCER.SIGNEDIN] == "true") {
      getUser();
    }
  }, [loginState]);

  return (
    <div className="App">
      <Router>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "64px",
            zIndex: "100",
          }}
        >
          <Navigator isLoggedIn={isLoggedIn} user={user} />
        </div>

        <div style={{ paddingTop: "64px" }}>
          {/* padding relative to navigator height*/}
          <Routes>
            <Route
              path="/"
              exact
              element={<Home user={user} isLoggedIn={isLoggedIn} />}
            ></Route>

            <Route
              path="/login"
              exact
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login isLoggedIn={isLoggedIn} />
                )
              }
            ></Route>

            <Route
              path="/signup"
              exact
              element={<Signup user={user} isLoggedIn={isLoggedIn} />}
            ></Route>
            <Route
              path="/home"
              exact
              element={<Home user={user} isLoggedIn={isLoggedIn} />}
            ></Route>

            <Route
              path="/customerhome"
              exact
              element={<CustomerHome />}
            ></Route>
            <Route
              path="/customersignup"
              exact
              element={<CustomerSignup />}
            ></Route>
            <Route
              path="/merchanthome"
              exact
              element={<MerchantHome />}
            ></Route>
            <Route
              path="/merchantlogin"
              exact
              element={<MerchantLogin />}
            ></Route>
            <Route
              path="/merchantinventory"
              exact
              element={<MerchantInventory />}
            ></Route>
            <Route path="/adminhome" exact element={<AdminHome />}></Route>
            <Route path="/productList" exact element={<ProductList />}></Route>
            <Route path="/product" exact element={<Product />}></Route>
            <Route path="/route" exact element={<RouteMap />}></Route>
            <Route path="/map" exact element={<SimpleMap />}></Route>
            <Route path="/location" exact element={<LocationSearch />}></Route>
            <Route path="/profile" exact element={<Profile />}></Route>
            <Route path="*" element={<ErrorPath></ErrorPath>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
