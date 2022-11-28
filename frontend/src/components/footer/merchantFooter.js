import React, { useEffect, useState } from "react";

import "./footer.css";
import footer1 from "../../images/merchant/inventoryImage.jpeg";
import footer2 from "../../images/merchant/manageOrders.jpg";
import footer3 from "../../images/merchant/shopAnalytics.jpeg";
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import deliveryHome from "../../animations/deliveryHome.json";
import Lottie from "react-lottie";
import nearBy from "../../images/theme/nearby.jpeg";
import CommonFooter from "./CommonFooter";

function MerchantFooter() {
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
          <h2 className="css-1u4uyso" style={{ marginBottom: "20px" }}>
            Manage Your Shop With Ease!
          </h2>
          <div className="div2">
            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Manage Product Inventory</h3>
                </div>
                <p>
                  Now you can manage your inventory easily with our help. Add
                  new products, view and update details of products
                </p>
              </div>
              <img
                src={footer1}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>

            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Manage Your Orders</h3>
                </div>
                <p>
                  You can easily manage orders placed by the customers. View
                  your orders and update them at your convenience
                </p>
              </div>
              <img
                src={footer2}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>

            <div className="div3">
              <div style={{ padding: "5px" }}>
                <div>
                  <h3>Shop Analytics</h3>
                </div>
                <p>
                  We provide various analytics on how the shop is performing,
                  based on those analytics you can improve your business
                </p>
              </div>
              <img
                src={footer3}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
          </div>
        </div>
      </footer>
      <CommonFooter></CommonFooter>
    </>
  );
}

export default MerchantFooter;
