import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import cost from "../../images/merchant/cost.png";
import "../../App.css";
import delivery from "../../images/merchant/delivery.png";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import Footer from "../../components/footer/footer";
import banner from "../../images/theme/banner.jpeg";
import banner1 from "../../images/theme/banner1.jpeg";
import banner2 from "../../images/theme/banner2.jpeg";
import { buttonUnstyledClasses } from "@mui/base";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { CONSTANTS, REDUCER } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils/serverCall";
import isEqual from "lodash/isEqual";
import { Navigate } from "react-router-dom";
import shoppingOrderConfirm from "../../animations/shopping-order-confirm.json";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

function CustomerHome() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: shoppingOrderConfirm,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigatorState = useSelector((state) => state.navigatorReducer);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [redirToMerchant, setRedirToMerchant] = useState(false);

  // const vendors = [
  //   {
  //     id: 1,
  //     name: "Costco",
  //     image: cost,
  //     rating: "4.5",
  //     categories: ["grocery", "Frozen", "Meat"],
  //     driveTime: "12 - 15 min",
  //   },
  //   {
  //     id: 2,
  //     name: "Walmart",
  //     image: cost,
  //     rating: "3.5",
  //     categories: ["Dairy", "Meat"],
  //     driveTime: "21 - 25 min",
  //   },
  //   {
  //     id: 2,
  //     name: "Walmart",
  //     image: cost,
  //     rating: "3.5",
  //     categories: ["Dairy", "Meat"],
  //     driveTime: "21 - 25 min",
  //   },
  // ];

  const [vendors, setVendors] = useState([]);
  const [productVendors, setProductVendors] = useState([]);
  const [vendorDetails, setVendorDetails] = useState([]);

  const onVendorClick = (vendorId) => {
    console.log(vendorId);
  };

  const fetchMerchants = (location, searchInput) => {
    location &&
      get("/customer/multiSearch", { location, searchInput }).then((result) => {
        console.log("nearby stores", result);
        setVendors(result.vendors);
        setProductVendors(result.productVendors);
        setVendorDetails(result.vendorDetails);
      });
  };

  const saveMerchantIcon = () => {
    console.log("saved");
  };

  const redirectToMerchant = (merchant) => {
    setSelectedMerchant(merchant);
    setRedirToMerchant(true);
  };

  useEffect(() => {
    // console.log("navigator Change", navigatorState);
    const newLoc = navigatorState[REDUCER.LOCATION];
    const newSearch = navigatorState[REDUCER.SEARCHINPUT];
    if (newLoc) {
      console.log("new Location", newLoc);
      setLocation(newLoc);
    }
    if (newSearch) {
      console.log("new Search", newSearch);
      setSearchInput(newSearch);
    }
    // fetchMerchants(newLoc, newSearch);
  }, [navigatorState]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const initialRender = useRef(true);
  const prevLocation = usePrevious(location);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!isEqual(prevLocation, location)) {
      fetchMerchants(location, searchInput);
    }
  }, [location, prevLocation]);

  const searchInitialRender = useRef(true);
  const prevSearchInput = usePrevious(searchInput);
  useEffect(() => {
    if (searchInitialRender.current) {
      searchInitialRender.current = false;
      return;
    }
    if (!isEqual(prevSearchInput, searchInput)) {
      fetchMerchants(location, searchInput);
    }
  }, [searchInput, prevSearchInput]);

  // useEffect(() => {
  //   fetchMerchants(location, searchInput);
  // }, [location, searchInput]);

  if (redirToMerchant) {
    return <Navigate to={"/customermerchant?id=" + selectedMerchant} />;
  }

  const createVendorCards = () => {
    return vendors.map((vendor) => (
      <Paper
        key={vendor._id}
        elevation={3}
        sx={{
          maxWidth: "20%",
          borderRadius: "10px",
          padding: "0px !important",
          marginLeft: "30px",
          marginTop: "25px",
          cursor: "pointer",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "140px",
              padding: "10px",
            }}
            title="Redirect to merchant"
            onClick={() => redirectToMerchant(vendor._id)}
          >
            <div
              style={{
                borderStyle: "solid",
                borderWidth: "0.1rem",
                borderColor: "#d3d3d3",
                borderRadius: "50%",
                marginLeft: "10px",
              }}
            >
              <img
                src={vendor.image ? vendor.image : cost}
                style={{
                  borderColor: "black",
                  padding: "0px !important",
                  height: "100%",
                  width: "100%",
                }}
              ></img>
            </div>
          </Grid>
          <Grid
            container
            xs={8}
            sx={{
              background: "#e5e8e8",
              padding: "0px !important",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              padding: "10px",
            }}
          >
            <Grid item xs={6}>
              <div style={{ textAlign: "left" }}>{vendor.storeName}</div>
            </Grid>
            <Grid item xs={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: "45px",
                  paddingTop: "2px",
                  paddingBottom: "3px",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    marginTop: "2px",
                    fontSize: "14px",
                  }}
                >
                  {vendor.rating} &nbsp;
                </div>
                <div style={{ color: "#FFD700" }}>
                  <StarPurple500SharpIcon fontSize="medium" />
                </div>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid
              item
              xs={1}
              sx={{ marginTop: "2px", opacity: "60%" }}
              title="Save Merchant"
            >
              <BookmarkRoundedIcon
                color=""
                onClick={() => saveMerchantIcon()}
              />
            </Grid>
            {/* vendor.categories && <Grid item xs={12}>
              <div style={{ textAlign: "left", fontSize: "13px" }}>
                {vendor.categories[0]}
                {vendor.categories.slice(1, 2).map((v) => (
                  <>
                    {" - "}
                    {v}{" "}
                  </>
                ))}{" "}
                ..
              </div>
            </Grid> */}

            <Grid item xs={12}>
              <div style={{ textAlign: "left", fontSize: "13px" }}>
                opening and close timings
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: "left", display: "flex" }}>
                <img
                  src={delivery}
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                  }}
                ></img>
                &nbsp;
                <div
                  style={{
                    color: "rgb(10 173 10)",
                    fontSize: "12px",
                    display: "inline-block",
                    marginTop: "5px",
                  }}
                >
                  {vendor.driveTime}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ));
  };

  const createProductVendorCards = () => {
    return (
      vendorDetails &&
      vendorDetails.map((vendor) => (
        <Paper
          key={vendor._id}
          elevation={3}
          sx={{
            maxWidth: "20%",
            borderRadius: "10px",
            padding: "0px !important",
            marginLeft: "30px",
            marginTop: "25px",
            cursor: "pointer",
          }}
        >
          <Grid container spacing={0}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "140px",
                padding: "10px",
              }}
              title="Redirect to merchant"
              onClick={() => redirectToMerchant(vendor._id)}
            >
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: "0.1rem",
                  borderColor: "#d3d3d3",
                  borderRadius: "50%",
                  marginLeft: "10px",
                }}
              >
                <img
                  src={vendor.image ? vendor.image : cost}
                  style={{
                    borderColor: "black",
                    padding: "0px !important",
                    height: "100%",
                    width: "100%",
                  }}
                ></img>
              </div>
            </Grid>
            <Grid
              container
              xs={8}
              sx={{
                background: "#e5e8e8",
                padding: "0px !important",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                padding: "10px",
              }}
            >
              <Grid item xs={6}>
                <div style={{ textAlign: "left" }}>{vendor.storeName}</div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    borderRadius: "45px",
                    paddingTop: "2px",
                    paddingBottom: "3px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "left",
                      marginTop: "2px",
                      fontSize: "14px",
                    }}
                  >
                    {vendor.rating} &nbsp;
                  </div>
                  <div style={{ color: "#FFD700" }}>
                    <StarPurple500SharpIcon fontSize="medium" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={1}
                sx={{ marginTop: "2px", opacity: "60%" }}
                title="Save Merchant"
              >
                <BookmarkRoundedIcon
                  color=""
                  onClick={() => saveMerchantIcon()}
                />
              </Grid>
              {/* vendor.categories && <Grid item xs={12}>
              <div style={{ textAlign: "left", fontSize: "13px" }}>
                {vendor.categories[0]}
                {vendor.categories.slice(1, 2).map((v) => (
                  <>
                    {" - "}
                    {v}{" "}
                  </>
                ))}{" "}
                ..
              </div>
            </Grid> */}

              <Grid item xs={12}>
                <div style={{ textAlign: "left", fontSize: "13px" }}>
                  opening and close timings
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <div style={{ textAlign: "left", display: "flex" }}>
                  <img
                    src={delivery}
                    style={{
                      width: "20px",
                      height: "20px",
                      display: "inline-block",
                    }}
                  ></img>
                  &nbsp;
                  <div
                    style={{
                      color: "rgb(10 173 10)",
                      fontSize: "12px",
                      display: "inline-block",
                      marginTop: "5px",
                    }}
                  >
                    {vendor.driveTime}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))
    );
  };

  return (
    <>
      <div className="homeBanner" style={{ textAlign: "left" }}>
        <img src={banner1} height="220px"></img>
      </div>

      <div className="homeBanner1">
        <h1>Order products for pickup or delivery today</h1>
        <p>Whatever you want from local stores, brought right to your door.</p>
      </div>

      <div
        style={{
          textSizeAdjust: "none",
          fontSize: "31px",
          lineHeight: "40px",
          fontWeight: "normal",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        Select a store nearby
      </div>

      <div className="row" style={{ paddingLeft: "20px" }}>
        {createProductVendorCards()}
      </div>
      <div style={{ marginTop: "5% " }}></div>
      <Footer />
    </>
  );
}

export default CustomerHome;
