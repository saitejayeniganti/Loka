import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
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

import RouteMap from "./views/routeMap";
import MerchantLogin from "./views/merchant/merchantLogin";
import MerchantInventory from "./views/merchant/merchantInventory";
import { useSelector } from "react-redux";
import { REDUCER } from "./utils/consts";
import CustomerSignup from "./views/customer/customerSignup";
import { ErrorPath } from "./views/common/ErrorPath";
import Profile from "./views/common/Profile";

import Progress from "./components/Progress";

import { actionCreators } from "./reducers/actionCreators";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import MapsWithIcon from "../src/components/merchantMap";
import AdRequest from "./views/AdRequest";



function App() {
  const [user, setUser] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const { setSession, clearSession } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const updateSessionState = (user, isLoggedIn) => {
    setUser(user);
    setIsLoggedIn(isLoggedIn);
    setSession({ user, isLoggedIn });
  };

  const getUser = async () => {
    setLoadSpinner(true);
    get("/auth/loggedUser")
      .then((response) => {
        // console.log(response);
        if (response.user && response.user.temp === 1) {
          // console.log(window.location.pathname);
          if (window.location.pathname.includes("/signup")) {
            // setUser(response.user);
            updateSessionState(response.user, false);
          } else {
            // delete cookie
            get("/auth/reset").then(() => {
              // setUser(null);
              updateSessionState(null, false);
              // cookies.remove("Token");
            });
          }
        } else {
          // console.log("logged in - ", response.user);
          updateSessionState(response.user, true);
          // setUser(response.user);
          // setIsLoggedIn(true);
        }
        // setSession({ user, isLoggedIn });
        setLoadSpinner(false);
        //store in local storage ?
        //store in redux
        //pass as params to child components
        //setUser()
      })
      .catch((error) => {
        // setSession({ user, isLoggedIn });
        setLoadSpinner(false);

        // console.log(error);
      });
  };

  // useEffect(() => {
  //   setSession({ user, isLoggedIn });
  // }, [user, isLoggedIn]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // console.log("login changed", loginState[REDUCER.SIGNEDIN]);
    if (loginState[REDUCER.SIGNEDIN] == "true") {
      getUser();
    }
  }, [loginState]);

  const inProgressComponent = () => {
    return <Progress></Progress>;
  };

  const routes = () => {
    return (
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
            isLoggedIn ? <Navigate to="/" /> : <Login isLoggedIn={isLoggedIn} />
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

        <Route path="/customerhome" exact element={<CustomerHome />}></Route>
        <Route
          path="/customersignup"
          exact
          element={<CustomerSignup />}
        ></Route>
        <Route path="/merchanthome" exact element={<MerchantHome />}></Route>
        <Route path="/merchantlogin" exact element={<MerchantLogin />}></Route>
        <Route
          path="/merchantinventory"
          exact
          element={<MerchantInventory />}
        ></Route>
        <Route path="/adminhome" exact element={<AdminHome />}></Route>
        <Route path="/productList" exact element={<ProductList />}></Route>
        <Route path="/product" exact element={<Product />}></Route>
        <Route path="/route" exact element={<RouteMap />}></Route>
        {/* <Route path="/map" exact element={<SimpleMap />}></Route> */}
        <Route path="/location" exact element={<LocationSearch />}></Route>
        <Route path="/profile" exact element={<Profile />}></Route>
        <Route path="/progress" element={<Progress></Progress>}></Route>
        <Route path="/adrequest" element={<AdRequest/>}></Route>
        <Route path="*" element={<ErrorPath></ErrorPath>}></Route>
      </Routes>
    );
  };

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
          {loadSpinner ? inProgressComponent() : routes()}
        </div>
      </Router>
    </div>
  );
}

export default App;
