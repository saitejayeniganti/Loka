import React, { useEffect, useState } from "react";

import "./footer.css"
import footer1 from "../../images/theme/footer1.jpeg"
import footer2 from "../../images/theme/footer2.jpeg"
import footer3 from "../../images/theme/footer3.jpeg"
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import deliveryHome from "../../animations/deliveryHome.json";
import Lottie from "react-lottie";
import nearBy from "../../images/theme/nearby.jpeg";

function Footer() {

  const [q1, setQ1] = useState(false)
  const [q2, setQ2] = useState(false)
  const [q3, setQ3] = useState(false)
  const [q4, setQ4] = useState(false)

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
          <h2 class="css-1u4uyso">Product delivery you can count on</h2>
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
                                <div style={{padding:"5px"}}><h3>Choose what you want</h3></div>
                                <p>Personal shoppers pick items with care. Chat as they shop and manage your order.</p>
                                </div>
                                <img src={footer1}></img>
                        </div>

                         <div className="div3">
                            <div>
                                <div style={{padding:"5px"}}><h3>See real-time updates</h3></div>
                                <p>Pick a convenient time for you. Enjoy Loka 100% quality guarantee on every order.</p>
                                </div>
                                <img src={footer2}></img>
                        </div>
                       
                       <div className="div3">
                            <div style={{padding:"5px"}}>
                                <div ><h3>Get your products delivered </h3></div>
                                <p>Select items from your nearby stores at Loka.com to get them delivered to you.</p>
                                </div>
                                <img src={footer3}></img>
                        </div>

           
        

          </div>
        </div>
        {/* ___________________________________________________________________blocks______________________________________________________________________________ */}

        <div>
          <h2>Friendly neighbourhood product delivery</h2>
          <div >
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>

        {/* ___________________________________________________________________Questions______________________________________________________________________________ */}


        <div className="div4">
          <div className="div5">
            <h2>Common questions</h2>
            <div>
              <div class="div6">
                <h3>
                  <button onClick={() => { setQ1(!q1) }} aria-expanded="false" class="divButton">How does Loka delivery and curbside pickup work?
                                        <div class="div7">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg" size="24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z">
                        </path></svg>
                    </div>
                  </button>
                </h3>
                {
                  q1 ? (<div style={{ textAlign: "left" }}>Loka makes it easy to order from your favorite stores. Shop for items from stores near you, with a selection of more than 500 retailers and trusted local grocers across North America. Then, Loka will connect you with a personal shopper in your area to shop and deliver your order. Contactless delivery is available with our “Leave at my door” option.
                    <br />
                    <br />You can track your orders progress and communicate with your shopper every step of the way using the Loka app or website.<br />
                    <br />Loka also offers curbside pickup at select retail locations. Simply place your order and choose a pickup time, and a shopper will prepare your order at the store.<br />
                    <br />When you get to the store, use the Loka app to notify us. Depending on the store, a shopper or store employee will bring the groceries to your car, or you can pick them up at the designated area.<br />
                  </div>) : ""
                }
              </div>

              <div class="div6">
                <h3>
                  <button onClick={() => { setQ2(!q2) }} aria-expanded="false" class="divButton">How much does Loka cost?
                                        <div class="div7">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg" size="24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z">
                        </path></svg>
                    </div>
                  </button>
                </h3>
                {
                  q2 ? (
                    <div style={{ textAlign: "left" }} >You don’t need a membership to order with Loka. In fact, you can even order from warehouse clubs, like Costco, Sam’s Club, and BJ’s Wholesale Club, without a retailer club membership.<br />
                      <br />To get started, create an account, select the store you want to shop, and place your order. New customers may be eligible for free delivery promotions.<br /><br />Delivery: Fees start at $3.99 for same-day orders over $35. Fees vary for one-hour deliveries, club store deliveries, and deliveries under $35.<br /><br />Pickup: There may be a “pickup fee” (equivalent to a delivery fee for pickup orders) on your pick up order.<br /><br />Service fees: Service fees vary and are subject to change based on factors like location and the number and types of items in your cart. Orders containing alcohol have a separate service fee.<br /><br />With an optional Loka+ membership, you can get $0 delivery fee on every order over $35 and lower service fees too.<br /></div>
                  ) : ""
                }
              </div>

              <div class="div6">
                <h3>
                  <button onClick={() => { setQ3(!q3) }} aria-expanded="false" class="divButton">Will I pay the same price on Loka as I would in store?

                                        <div class="div7">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg" size="24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z">
                        </path></svg>
                    </div>
                  </button>
                </h3>
                {
                  q3 ? (
                    <div style={{ textAlign: "left" }}  >Retail partners set the prices of items on the Loka marketplace. While many retailers offer everyday store prices on Loka, some retailers may set prices on the Loka platform that are different from in-store prices.<br />You can view pricing policies for each retailer on the Loka app and website.<br /></div>
                  ) : ""
                }
              </div>

              <div class="div6">
                <h3>
                  <button onClick={() => { setQ4(!q4) }} aria-expanded="false" class="divButton">Can I get contactless delivery with Loka?

                                        <div class="div7">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg" size="24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z">
                        </path></svg>
                    </div>
                  </button>
                </h3>
                {
                  q4 ? (
                    <div style={{ textAlign: "left" }}>The health and safety of our community is our number one priority. We are excited to offer contactless delivery through our Leave at My Door delivery feature.<br /><br />Leave at My Door delivery gives you the flexibility to have your groceries delivered without having to come to the door or be at home. You can leave delivery instructions for your shopper at checkout, and we’ll notify you when your order arrives.<br /><br />Leave at My Door is now the default setting for all Loka deliveries. If you’d prefer to not use this feature, simply uncheck the box that says “Leave at my door if I’m not around” at checkout.<br /><br />Customers who order alcohol, prescriptions, or certain high-value items may need to show ID upon delivery. We ask shoppers to wear masks whenever they come into contact with customers.<br /></div>
                  ) : ""
                }
              </div>
            </div>
          </div>
        </div>

        {/* ___________________________________________________________________________________from eats____________________________________________________________ */}


      </footer>
      <div className="footer">
        <div className="container" style={{ marginTop: "0px" }}>
          <div className="row">
            <div className="col-md-3" style={{ color: "white", fontSize: "60px" }}>
              {/* <img className="uberlogo" src={ubereatslogo} /> */}
                LOKA
              </div>

            <div className="row">
              <div className="col-md-3" style={{ textAlign: "left" }}>
                <br />
                <label className="txt margin15">Get Help</label>
                <br />
                <label className="txt margin15">Search for products</label>
                <br />
                <label className="txt margin15">Add your market</label>
                <br />
                <label className="txt margin15">Signup as a customer</label>
                <br />
                <label className="txt margin15">
                  Create a business account
                </label>
                <br />
              </div>
              <div className="col-md-3" style={{ textAlign: "left" }}>
                <br />
                <label className="txt margin15">Markets near me</label>
                <br />
                <label className="txt margin15">View all cities</label>
                <br />
                <label className="txt margin15">View all countries</label>
                <br />
                <label className="txt margin15">Read our blog</label>
                <br />
                <label className="txt margin15">About LOKA</label>
                <br />
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="">
              <div className="logosAndLinksContainer">
                <div className="logosAndLinks">
                  <div className="footerlogos">
                    <div>
                      <a
                        data-baseweb="button"
                        // href="https://www.facebook.com/UberEats/"
                        aria-label=""
                        target="_self"
                        text="Facebook"
                        data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_facebook_cta3"
                        className="fbButton"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>facebook</title>
                          <path
                            d="M21.79 1H2.21C1.54 1 1 1.54 1 2.21v19.57c0 .68.54 1.22 1.21 1.22h10.54v-8.51H9.9v-3.33h2.86V8.71c0-2.84 1.74-4.39 4.27-4.39.85 0 1.71.04 2.56.13v2.97h-1.75c-1.38 0-1.65.65-1.65 1.62v2.12h3.3l-.43 3.33h-2.89V23h5.61c.67 0 1.21-.54 1.21-1.21V2.21C23 1.54 22.46 1 21.79 1z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a
                        data-baseweb="button"
                        // href="https://twitter.com/UberEats"
                        aria-label=""
                        target="_self"
                        text="Twitter"
                        data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_twitter_cta21"
                        className="twitterButton"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>twitter</title>
                          <path
                            d="M23 5.13c-.81.36-1.69.61-2.61.72.94-.56 1.66-1.45 2-2.51-.88.52-1.85.9-2.89 1.1A4.558 4.558 0 0016.18 3a4.543 4.543 0 00-4.42 5.58c-3.78-.19-7.13-2-9.37-4.75-.39.67-.62 1.45-.62 2.28 0 1.58.8 2.97 2.02 3.78-.75-.02-1.45-.23-2.06-.57v.06c0 2.2 1.57 4.04 3.65 4.45-.38.12-.78.17-1.19.17-.29 0-.58-.03-.85-.08a4.557 4.557 0 004.25 3.16 9.112 9.112 0 01-5.64 1.95c-.37 0-.73-.02-1.08-.06 2.01 1.29 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93 0-.2 0-.39-.01-.59.86-.65 1.63-1.45 2.24-2.36z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a
                        data-baseweb="button"
                        // href="https://www.youtube.com/channel/UC1xnncYc7586km_rIYQLtLQ/featured"
                        aria-label=""
                        target="_self"
                        text="YouTube"
                        data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_youtube_cta22"
                        className="youtubeButton"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>youtube</title>
                          <path
                            d="M23 12s0-3.85-.46-5.58c-.25-.95-1-1.7-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46c-.95.25-1.69 1.01-1.94 1.96C1 8.15 1 12 1 12s.04 3.85.5 5.58c.25.95 1 1.7 1.95 1.96 1.71.46 8.59.46 8.59.46s6.88 0 8.6-.46c.95-.25 1.69-1.01 1.94-1.96.46-1.73.42-5.58.42-5.58zm-13 3.27V8.73L15.5 12 10 15.27z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a
                        data-baseweb="button"
                        // href="https://www.linkedin.com/company/uber-com/"
                        aria-label=""
                        target="_self"
                        text="LinkedIn"
                        data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_linkedin_cta17"
                        className="linkedinButton"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>linkedin</title>
                          <path
                            d="M21.37 1H2.62C1.73 1 1 1.71 1 2.58v18.83c0 .88.73 1.59 1.62 1.59h18.75c.9 0 1.63-.71 1.63-1.59V2.58C23 1.71 22.27 1 21.37 1zM7.53 19.75H4.26V9.25h3.27v10.5zM5.89 7.81C4.85 7.81 4 6.96 4 5.92s.84-1.89 1.89-1.89c1.04 0 1.89.85 1.89 1.89.01 1.04-.84 1.89-1.89 1.89zm13.86 11.94h-3.26v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7v5.19H9.57V9.26h3.13v1.43h.04c.44-.83 1.5-1.7 3.09-1.7 3.3 0 3.91 2.17 3.91 5v5.76h.01z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a
                        data-baseweb="button"
                        // href="https://www.instagram.com/ubereats/"
                        aria-label=""
                        target="_self"
                        text="Instagram"
                        data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_instagram_cta15"
                        className="instagramButton"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>instagram</title>
                          <g fill="currentColor">
                            <path d="M21.15 2.85C19.05.74 16.23 1 12 1 8.04 1 5 .69 2.85 2.85.74 4.95 1 7.77 1 12c0 3.95-.31 7 1.85 9.15C4.95 23.26 7.77 23 12 23c3.96 0 7 .31 9.15-1.85C23.25 19.05 23 16.23 23 12c0-4.31.24-7.07-1.85-9.15zm-1.4 16.9c-1.37 1.37-3.18 1.27-7.75 1.27-4.29 0-6.34.15-7.75-1.27-1.44-1.44-1.27-3.51-1.27-7.75 0-4.23-.15-6.33 1.27-7.75C5.66 2.84 7.6 2.98 12 2.98c4.23 0 6.33-.15 7.75 1.27 1.38 1.38 1.27 3.22 1.27 7.75 0 4.24.15 6.34-1.27 7.75z"></path>
                            <path d="M12 6.35a5.65 5.65 0 10.001 11.301A5.65 5.65 0 0012 6.35zm0 9.32c-2.02 0-3.67-1.64-3.67-3.67 0-2.03 1.64-3.67 3.67-3.67 2.03 0 3.67 1.64 3.67 3.67 0 2.02-1.65 3.67-3.67 3.67zM17.87 4.81c-.73 0-1.32.59-1.32 1.32 0 .73.59 1.32 1.32 1.32.73 0 1.32-.59 1.32-1.32 0-.73-.59-1.32-1.32-1.32z"></path>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="location">
                    <button
                      data-baseweb="button"
                      aria-label="Current language: English"
                      className="footerButton"
                    >
                      <div className="bn gh">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>Globe</title>
                          <path
                            d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm8 11c0 .7-.1 1.4-.3 2-.6-1.5-1.6-3.1-3-4.7l1.8-1.8c1 1.3 1.5 2.8 1.5 4.5zM6.5 6.5c1.3 0 3.6.8 6 2.9l-3.2 3.2C7.1 9.8 6.5 7.5 6.5 6.5zm8.1 5c2.3 2.7 2.9 5 2.9 6-1.3 0-3.6-.8-6-2.9l3.1-3.1zm1.9-6.1l-1.9 1.9c-1.6-1.4-3.2-2.4-4.7-3 .7-.2 1.3-.3 2-.3 1.8 0 3.3.5 4.6 1.4zM4 12c0-.7.1-1.4.3-2 .6 1.5 1.6 3.1 3 4.7l-1.8 1.8C4.5 15.2 4 13.7 4 12zm3.5 6.6l1.9-1.9c1.6 1.4 3.2 2.4 4.7 3-.7.2-1.3.3-2 .3-1.8 0-3.3-.5-4.6-1.4z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      English
                    </button>
                    <button
                      data-baseweb="button"
                      aria-label="Seeing information for this city: San Francisco Bay Area"
                      id="location-banner-button"
                      className="footerButton"
                    >
                      <div className="bn gh">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>Location marker</title>
                          <path
                            d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4zM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <span id="location-banner-label">
                        San Francisco Bay Area
                      </span>
                    </button>
                  </div>
                  <div className="imgContainer">
                    <a
                      data-baseweb="link"
                      // href="https://play.google.com/store/apps/details?id=com.ubercab.eats&amp;hl"
                      alt="Download Uber Eats for Android"
                      target="_self"
                      data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_google_cta4"
                      className="androidImg"
                    >
                      <img
                        src="https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/illustrations/app-store-google-4d63c31a3e.svg"
                        alt="Download Uber Eats for Android"
                        role="presentation"
                        aria-hidden="true"
                      />
                    </a>
                    <a
                      data-baseweb="link"
                      // href="https://apps.apple.com/us/app/uber-eats-food-delivery/id1058959277"
                      alt="Download Uber Eats for iOS"
                      target="_self"
                      data-tracking-name="_6f71ccec-5269-4066-93d7-19e25be78430_apple_cta2"
                      className="appleImg"
                    >
                      <img
                        src="https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/illustrations/app-store-apple-f1f919205b.svg"
                        alt="Download Uber Eats for iOS"
                        role="presentation"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                style={{ textAlign: "left", color: "white" }}
                className="col-md-6"
              >
                &copy; 2022 LOKA Technologies, Inc.
              </div>
              <div
                style={{ textAlign: "right", color: "white" }}
                className="col-md-6"
              >
                Privacy Policy | Terms of Use
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;