import React, { useEffect, useState } from "react";

import "./footer.css";
import footer1 from "../../images/theme/footer1.jpeg";
import footer2 from "../../images/theme/footer2.jpeg";
import footer3 from "../../images/theme/footer3.jpeg";
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import deliveryHome from "../../animations/deliveryHome.json";
import Lottie from "react-lottie";
import nearBy from "../../images/theme/nearby.jpeg";
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
            {/* <div className="div3">
                            <div>
                                <div style={{padding:"5px"}}><h3>Check out near by markets</h3></div>
                                <p>Get to know your nearby markets and find out if the products are available.</p>
                                </div>
                                <img src={nearBy} width="376px" height="232px" marginBottonLeftRadius="20px" marginBottonRightRadius="20px"></img>
                        </div> */}

            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Simple Search</h3>
                </div>
                <p>
                  Search for near by merchants and products using search input
                  at top of the screen.
                </p>
              </div>
              <img src={footer1}></img>
            </div>

            <div className="div3">
              <div>
                <div style={{ padding: "5px" }}>
                  <h3>Real time updates</h3>
                </div>
                <p>Track your orders in real time and manage your orders.</p>
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
        {/* ___________________________________________________________________blocks______________________________________________________________________________ */}

        {/* <div>
          <h2>Friendly neighbourhood product delivery</h2>
          <div>
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div> */}

        {/* ___________________________________________________________________Questions______________________________________________________________________________ */}

        {/* <div className="div4">
          <div className="div5">
            <h2>Common questions</h2>
            <div>
              <div className="div6">
                <h3>
                  <button
                    onClick={() => {
                      setQ1(!q1);
                    }}
                    aria-expanded="false"
                    className="divButton"
                  >
                    How to search nearch by stores?
                    <div className="div7">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#343538"
                        xmlns="http://www.w3.org/2000/svg"
                        size="24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </h3>
                {q1 ? (
                  <div style={{ textAlign: "left" }}>
                    Loka makes it easy to order from your favorite stores. Shop
                    for items from stores near you, with a selection of more
                    than 500 retailers and trusted local grocers across North
                    America. Then, Loka will connect you with a personal shopper
                    in your area to shop and deliver your order. Contactless
                    delivery is available with our “Leave at my door” option.
                    <br />
                    <br />
                    You can track your orders progress and communicate with your
                    shopper every step of the way using the Loka app or website.
                    <br />
                    <br />
                    Loka also offers curbside pickup at select retail locations.
                    Simply place your order and choose a pickup time, and a
                    shopper will prepare your order at the store.
                    <br />
                    <br />
                    When you get to the store, use the Loka app to notify us.
                    Depending on the store, a shopper or store employee will
                    bring the groceries to your car, or you can pick them up at
                    the designated area.
                    <br />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="div6">
                <h3>
                  <button
                    onClick={() => {
                      setQ2(!q2);
                    }}
                    aria-expanded="false"
                    className="divButton"
                  >
                    How much does Loka cost?
                    <div className="div7">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#343538"
                        xmlns="http://www.w3.org/2000/svg"
                        size="24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </h3>
                {q2 ? (
                  <div style={{ textAlign: "left" }}>
                    You don’t need a membership to order with Loka. In fact, you
                    can even order from warehouse clubs, like Costco, Sam’s
                    Club, and BJ’s Wholesale Club, without a retailer club
                    membership.
                    <br />
                    <br />
                    To get started, create an account, select the store you want
                    to shop, and place your order. New customers may be eligible
                    for free delivery promotions.
                    <br />
                    <br />
                    Delivery: Fees start at $3.99 for same-day orders over $35.
                    Fees vary for one-hour deliveries, club store deliveries,
                    and deliveries under $35.
                    <br />
                    <br />
                    Pickup: There may be a “pickup fee” (equivalent to a
                    delivery fee for pickup orders) on your pick up order.
                    <br />
                    <br />
                    Service fees: Service fees vary and are subject to change
                    based on factors like location and the number and types of
                    items in your cart. Orders containing alcohol have a
                    separate service fee.
                    <br />
                    <br />
                    With an optional Loka+ membership, you can get $0 delivery
                    fee on every order over $35 and lower service fees too.
                    <br />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="div6">
                <h3>
                  <button
                    onClick={() => {
                      setQ3(!q3);
                    }}
                    aria-expanded="false"
                    className="divButton"
                  >
                    Will I pay the same price on Loka as I would in store?
                    <div className="div7">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#343538"
                        xmlns="http://www.w3.org/2000/svg"
                        size="24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </h3>
                {q3 ? (
                  <div style={{ textAlign: "left" }}>
                    Retail partners set the prices of items on the Loka
                    marketplace. While many retailers offer everyday store
                    prices on Loka, some retailers may set prices on the Loka
                    platform that are different from in-store prices.
                    <br />
                    You can view pricing policies for each retailer on the Loka
                    app and website.
                    <br />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="div6">
                <h3>
                  <button
                    onClick={() => {
                      setQ4(!q4);
                    }}
                    aria-expanded="false"
                    className="divButton"
                  >
                    Can I get contactless delivery with Loka?
                    <div className="div7">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#343538"
                        xmlns="http://www.w3.org/2000/svg"
                        size="24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </h3>
                {q4 ? (
                  <div style={{ textAlign: "left" }}>
                    The health and safety of our community is our number one
                    priority. We are excited to offer contactless delivery
                    through our Leave at My Door delivery feature.
                    <br />
                    <br />
                    Leave at My Door delivery gives you the flexibility to have
                    your groceries delivered without having to come to the door
                    or be at home. You can leave delivery instructions for your
                    shopper at checkout, and we’ll notify you when your order
                    arrives.
                    <br />
                    <br />
                    Leave at My Door is now the default setting for all Loka
                    deliveries. If you’d prefer to not use this feature, simply
                    uncheck the box that says “Leave at my door if I’m not
                    around” at checkout.
                    <br />
                    <br />
                    Customers who order alcohol, prescriptions, or certain
                    high-value items may need to show ID upon delivery. We ask
                    shoppers to wear masks whenever they come into contact with
                    customers.
                    <br />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div> */}

        {/* ___________________________________________________________________________________from eats____________________________________________________________ */}
      </footer>
      <CommonFooter></CommonFooter>
    </>
  );
}

export default Footer;
