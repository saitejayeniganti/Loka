import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigator from "./components/Navigator";
import AdminHome from "./views/admin/adminHome";
import CustomerHome from "./views/customer/customerHome";
import Home from "./views/Home";
import Login from "./views/login";
import MerchantHome from "./views/merchant/merchantHome";

function App() {
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
