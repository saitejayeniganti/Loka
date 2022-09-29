import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";


import './App.css';

import Navigator from "./components/Navigator";
import { get } from "./utils/serverCall";
import AdminHome from "./views/admin/adminHome";
import CustomerHome from "./views/customer/customerHome";
import Home from "./views/common/Home";
import Login from "./views/common/Login";
import MerchantHome from "./views/merchant/merchantHome";
import Signup from "./views/common/Signup";
import LocationSearch from "./components/LocationSearch";
import LocationTest from "./components/LocationTest";



function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            });
          }
        } else {
          setUser(response.user);
          setIsLoggedIn(true);
        }
        //store in local storage ?
        //store in redux
        //pass as params to child components
        //setUser()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigator isLoggedIn={isLoggedIn} user={user} />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          
          <Route
            path="/login"
            exact
            element={
              user ? <Navigate to="/" /> : <Login isLoggedIn={isLoggedIn} />
            }
          ></Route>
          <Route
            path="/signup"
            exact
            element={<Signup user={user} isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route path="/home" exact element={<Home />}></Route>
     
     
     <Route path="/customerhome" exact element={<CustomerHome />}></Route>
     <Route path="/merchanthome" exact element={<MerchantHome />}></Route>
     <Route path="/adminhome" exact element={<AdminHome />}></Route>
     <Route path="/loc" exact element={<LocationTest />}></Route>
     <Route path="/loca" exact element={<LocationSearch />}></Route>
          
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
