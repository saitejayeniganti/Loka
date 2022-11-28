import React, { useEffect, useState } from "react";

import "./footer.css";
import footer1 from "../../images/theme/footer1.jpeg";
import footer2 from "../../images/theme/footer2.jpeg";
import footer3 from "../../images/theme/footer3.jpeg";
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import deliveryHome from "../../animations/deliveryHome.json";
import Lottie from "react-lottie";
import nearBy from "../../images/theme/nearby.jpeg";
import Footer from "./footer";
import CommonFooter from "./CommonFooter";

function CustomerMerchantFooter() {
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);
  const [q4, setQ4] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: deliveryHome,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <footer>
        <div className="div1">
          <h2 className="css-1u4uyso">Product delivery you can count on</h2>
          <div className="div2">
            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Check out near by markets</h3>
                </div>
                <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <p>
                    Get to know your nearby markets and find out if the products
                    are available.
                  </p>
                </div>
              </div>
              <img src={footer1}></img>
            </div>

            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Choose what you want</h3>
                </div>
                <p>
                  Personal shoppers pick items with care. Chat as they shop and
                  manage your order.
                </p>
              </div>
              <img src={footer1}></img>
            </div>

            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>See real-time updates</h3>
                </div>
                <p>
                  Pick a convenient time for you. Enjoy Loka 100% quality
                  guarantee on every order.
                </p>
              </div>
              <img src={footer2}></img>
            </div>

            <div className="div3">
              <div style={{ padding: "5px" }}>
                <div>
                  <h3>Get your products delivered </h3>
                </div>
                <p>
                  Select items from your nearby stores at Loka.com to get them
                  delivered to you.
                </p>
              </div>
              <img src={footer3}></img>
            </div>
          </div>
        </div>
      </footer>
      <CommonFooter></CommonFooter>
    </>
  );
}

export default CustomerMerchantFooter;
