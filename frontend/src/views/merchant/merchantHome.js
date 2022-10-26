import React, { useEffect, useState } from "react";
import shopLanding from '../../images/merchant/shopLandingPage.jpg'
import MerchantFooter from "../../components/footer/merchantFooter";

function MerchantHome() {
  return (
    <div >
      <div style={{ position: "relative" }}>
        <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
        <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Welcome To Your Store!</h1>
      </div>
      <MerchantFooter />
    </div >
  );
}

export default MerchantHome;