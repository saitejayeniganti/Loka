import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigator from "./components/Navigator";
import { get } from "./utils/serverCall";
import AdminHome from "./views/admin/adminHome";
import CustomerHome from "./views/customer/customerHome";
import Home from "./views/common/Home";
import Login from "./views/common/Login";
import MerchantHome from "./views/merchant/merchantHome";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    get("/auth/loggedUser")
      .then((response) => {
        console.log(response);
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
        <Navigator />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/customerhome" exact element={<CustomerHome />}></Route>
          <Route path="/merchanthome" exact element={<MerchantHome />}></Route>
          <Route path="/adminhome" exact element={<AdminHome />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
