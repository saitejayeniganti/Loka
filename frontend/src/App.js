import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../src/styles/mapView.css";
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
import Bill from "./views/bill/Bill";
import Order from "./views/order/Order";
import MyOrder from "./views/order/MyOrder";
import MerchantHome from "./views/merchant/merchantHome";
import Signup from "./views/common/Signup";
import LocationSearch from "./components/LocationSearch";

// import RouteMap from "./views/routeMap";
import MerchantLogin from "./views/merchant/merchantLogin";
import MerchantAddProducts from "./views/merchant/merchantAddProducts";
import MerchantInventory from "./views/merchant/merchantInventory";
import MerchantOrders from "./views/merchant/merchantOrders";
import { useSelector } from "react-redux";
import { REDUCER } from "./utils/consts";
import CustomerSignup from "./views/customer/customerSignup";
import { ErrorPath } from "./views/common/ErrorPath";
import Profile from "./views/common/Profile";

import Progress from "./components/Progress";

import { actionCreators } from "./reducers/actionCreators";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
// import MapsWithIcon from "../src/components/merchantMap";
import AdRequest from "./views/AdRequest";
import NewsLetter from "./views/NewsLetter";
import MapView from "./components/MapView";
import PayPalTest from "./views/paypalTest";
import ProductReviews from "./components/reviews/ProductReviews";
import ReviewsTest from "./views/ReviewsTest";
import AdminUsers from "./views/admin/adminUsers";
import AdminUserDetail from "./views/admin/adminUserDetail";
import AdminUserOrders from "./views/admin/adminUserOrders";
import AdminUserReviews from "./views/admin/adminUserReviews";
import AdminVendors from "./views/admin/adminVendors";
import AdminVendorDetail from "./views/admin/adminVendorDetail";
import AdminVendorOrders from "./views/admin/adminVendorOrders";
import CustomerMerchantView from "./views/customer/customerMerchantView";
import Fb from "./components/fb";
import SavedMerchants from "./views/customer/savedMerchants";
import AdminVendorReviews from "./views/admin/adminVendorReviews";
import AdminOrders from "./views/admin/adminOrders";
import Ads from "./views/ads";
import AdDetails from "./views/AdDetails";
import AdminAdRequests from "./views/admin/adminAdRequests";
import MerchantPostAd from "./views/merchant/merchantPostAd";
import MerchantSignup from "./views/common/MerchantSignup";
import MerchantAnalytics from "./views/merchant/merchantAnalytics";
import Future from "./views/common/Future";

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
        updateSessionState(null, false);
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
    console.log("profile changed");
    if (loginState[REDUCER.SIGNEDIN] != "") {
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
          path="/merchantSignup"
          exact
          element={<MerchantSignup />}
        ></Route>

        <Route
          path="/merchantorders"
          exact
          element={<MerchantOrders />}
        ></Route>
        <Route
          path="/merchantinventory"
          exact
          element={<MerchantInventory />}
        ></Route>
        <Route path="/merchanthome" exact element={<MerchantHome />}></Route>
        <Route path="/merchantlogin" exact element={<MerchantLogin />}></Route>
        <Route
          path="/merchantaddproducts"
          exact
          element={<MerchantAddProducts />}
        ></Route>

        <Route path="/adminhome" exact element={<AdminHome />}></Route>
        <Route path="/adminusers" exact element={<AdminUsers />}></Route>
        <Route path="/adminvendors" exact element={<AdminVendors />}></Route>
        <Route path="/adminorders" exact element={<AdminOrders />}></Route>
        <Route
          path="/merchantanalytics"
          exact
          element={<MerchantAnalytics />}
        ></Route>

        <Route
          path="/adminuserdetail"
          exact
          element={<AdminUserDetail />}
        ></Route>
        <Route
          path="/adminuserorders"
          exact
          element={<AdminUserOrders />}
        ></Route>
        <Route path="/adminads" exact element={<AdminAdRequests />}></Route>
        <Route
          path="/merchantpostad"
          exact
          element={<MerchantPostAd />}
        ></Route>
        <Route
          path="/adminvendordetail"
          exact
          element={<AdminVendorDetail />}
        ></Route>
        <Route
          path="/adminvendororders"
          exact
          element={<AdminVendorOrders />}
        ></Route>
        <Route
          path="/adminuserreviews"
          exact
          element={<AdminUserReviews />}
        ></Route>
        <Route
          path="/adminvendorreviews"
          exact
          element={<AdminVendorReviews />}
        ></Route>
        <Route path="/ads" exact element={<Ads />}></Route>
        <Route path="/addetail" exact element={<AdDetails />}></Route>
        <Route
          path="/customermerchant"
          exact
          element={<CustomerMerchantView />}
        ></Route>
        <Route path="/productList" exact element={<ProductList />}></Route>
        <Route path="/product" exact element={<Product />}></Route>
        <Route path="/bill" exact element={<Bill />}></Route>
        <Route path="/order" exact element={<Order />}></Route>
        <Route path="/myorder" exact element={<MyOrder />}></Route>
        {/* <Route path="/route" exact element={<RouteMap />}></Route> */}
        <Route path="/location" exact element={<LocationSearch />}></Route>
        <Route
          path="/profile"
          exact
          element={<Profile user={user} isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route path="/progress" element={<Progress></Progress>}></Route>

        <Route
          path="/mapview"
          element={<MapView user={user} isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route path="/adrequest" element={<AdRequest />}></Route>
        <Route path="/newsletter" element={<NewsLetter />}></Route>
        <Route path="/paypal" element={<PayPalTest />}></Route>
        <Route path="/rew" element={<ProductReviews />}></Route>
        <Route path="/review" element={<ReviewsTest />}></Route>
        <Route path="/savedmerchants" element={<SavedMerchants />}></Route>
        <Route path="/fb" element={<Fb />}></Route>
        <Route path="/inprogress" element={<Future></Future>}></Route>
        <Route path="*" element={<ErrorPath></ErrorPath>}></Route>
      </Routes>
    );
  };

  return (
    <div className="App">
      {loadSpinner ? (
        inProgressComponent()
      ) : (
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
            {routes()}
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
