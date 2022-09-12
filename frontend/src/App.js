import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import AdminHome from "./views/admin/adminHome";
import CustomerHome from "./views/customer/customerHome";
import Home from "./views/Home";
import MerchantHome from "./views/merchant/merchantHome";

function App() {
  return (
    <div className="App">
     <Router>
     <Routes>
     <Route path="/home" exact element={<Home />}></Route>
     <Route path="/customerhome" exact element={<CustomerHome />}></Route>
     <Route path="/merchanthome" exact element={<MerchantHome />}></Route>
     <Route path="/adminhome" exact element={<AdminHome />}></Route>
     </Routes>
     </Router>
    </div>
  );
}

export default App;
