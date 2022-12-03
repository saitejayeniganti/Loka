import React, { useEffect, useState } from "react";

import "./footer.css";
import footer1 from "../../images/theme/footer1.jpeg";
import footer2 from "../../images/theme/footer2.jpeg";
import footer3 from "../../images/theme/footer3.jpeg";
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import deliveryHome from "../../animations/deliveryHome.json";
import Lottie from "react-lottie";
import nearBy from "../../images/theme/nearby.jpeg";
import adsNeww from "../../images/admin/addds.png";
import searching from "../../images/admin/search.jpeg";
import preview from "../../images/admin/preview.jpeg";
import CommonFooter from "./CommonFooter";

function Footer() {
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
          <h2 className="css-1u4uyso">Explore our App</h2>
          <div className="div2">
            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Searching Made Easy</h3>
                </div>
                <p>
                  Search for near by merchants and products using search input
                  at top.
                </p>
              </div>
              <img src={searching} ></img>
            </div>

            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Place Order</h3>
                </div>
                <p>
                  Select near by merchants, add items to cart , and place your
                  order
                </p>
              </div>
              <img src={preview}></img>
            </div>

            <div className="div3">
              <div style={{ padding: "5px" }}>
                <div>
                  <h3>Subscribe</h3>
                </div>
                <p>You can subscribe to LOKA's newsletter to get latest updates</p>
              </div>
              <img src={adsNeww}></img>
            </div>
          </div>
        </div>
      </footer>
      <CommonFooter></CommonFooter>
    </>
  );
}

export default Footer;
