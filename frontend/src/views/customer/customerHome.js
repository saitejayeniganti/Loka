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
import { over } from "lodash";

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

  const [vendorsOnly, setVendorsOnly] = useState([]);
  const [productVendors, setProductVendors] = useState([]);
  const [vendorDetails, setVendorDetails] = useState([]);

  const onVendorClick = (vendorId) => {
    console.log(vendorId);
  };

  const fetchMerchants = (location, searchInput) => {
    location &&
      get("/customer/multiSearch", { location, searchInput }).then((result) => {
        console.log("nearby stores", result);
        setVendorsOnly(result.vendorsOnly);
        setProductVendors(result.productVendors);
        setVendorDetails(result.vendorDetails);
      });
  };

  const saveMerchantIcon = () => {
    console.log("saved");
  };

  const redirectToMerchant = (merchant) => {
    // setSelectedMerchant(merchant);
    // setRedirToMerchant(true);
    navigate("/customermerchant?id=" + merchant);
  };

  useEffect(() => {
    // console.log("navigator Change", navigatorState);
    const newLoc = navigatorState[REDUCER.LOCATION];
    const newSearch = navigatorState[REDUCER.SEARCHINPUT];
    if (newLoc) {
      console.log("new Location", newLoc);
      setLocation(newLoc);
    }
    // if (newSearch) {
    console.log("new Search", newSearch);
    setSearchInput(newSearch);
    // }
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

  const createBaseCard = (vendor, productDetails) => {
    return (
      <Paper
        key={vendor._id}
        elevation={3}
        sx={{
          maxWidth: "20%",
          borderRadius: "10px",
          padding: "0px !important",
          marginLeft: "30px",
          marginTop: "25px",
        }}
      >
        <Grid container spacing={0} sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "140px",
              padding: "0px",
              cursor: "pointer",
            }}
            title="Redirect to merchant"
            onClick={() => redirectToMerchant(vendor._id)}
          >
            <div
              style={{
                // borderStyle: "solid",
                // borderWidth: "0.1rem",
                // borderColor: "#d3d3d3",
                // borderRadius: "50%",
                // marginLeft: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  productDetails
                    ? productDetails.image
                    : vendor.image
                    ? vendor.image
                    : cost
                }
                style={{
                  borderColor: "black",
                  padding: "0px !important",
                  maxHeight: "-webkit-fill-available",
                  borderTopRightRadius:"10px",
                  borderTopLeftRadius:"10px"
                }}
              ></img>
            </div>
          </Grid>
          <Grid
            container
            xs={12}
            sx={{
              background: "#e5e8e8",
              padding: "0px !important",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              padding: "10px",
            }}
          >
            <Grid item xs={12}>
              <div
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
                onClick={() => redirectToMerchant(vendor._id)}
              >
                {vendor.storeName}
              </div>
            </Grid>

            {/* <Grid item xs={4}>
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
            </Grid> */}
            <Grid item xs={1}></Grid>
            {/* <Grid
              item
              xs={1}
              sx={{ marginTop: "2px", opacity: "60%" }}
              title="Save Merchant"
            >
              <BookmarkRoundedIcon
                color=""
                onClick={() => saveMerchantIcon()}
              />
            </Grid> */}
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
            {productDetails && (
              <>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", display: "flex" }}>
                    Product:{" "}
                    <div
                      style={{
                        color: "blue",
                        display: "block",
                        cursor: "pointer",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      onClick={() => {
                        return navigate("/product?id=" + productDetails._id);
                      }}
                    >
                      {productDetails.name}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", display: "flex" }}>
                    Brand:{" "}
                    <div
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {productDetails.brand?.name}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", display: "flex" }}>
                    Price:
                    <div
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {" $"}
                      {productDetails.price}
                    </div>
                  </div>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <div style={{ textAlign: "left", fontSize: "13px" }}>
                <div
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {/* {": "} */}
                  {new Date(vendor.openTime).toLocaleTimeString()} -{" "}
                  {new Date(vendor.closeTime).toLocaleTimeString()}
                  {/* {new Date(vendor.openTime).getHours()}:
                  {new Date(vendor.openTime).getMinutes()}-
                  {new Date(vendor.closeTime).getHours()}:
                  {new Date(vendor.closeTime).getMinutes()} */}
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={6}></Grid> */}
            <Grid item xs={12}>
              <div style={{ textAlign: "left", display: "flex" }}>
                <img
                  src={delivery}
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                  }}
                ></img>
                &nbsp;&nbsp;
                <div
                  style={{
                    color: "rgb(10 173 10)",
                    fontSize: "12px",
                    display: "inline-block",
                    marginTop: "5px",
                  }}
                >
                  {vendor.location.address}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const createProductVendorCards = () => {
    return (
      productVendors &&
      productVendors.map((each) => {
        let vendor = vendorDetails[each.merchant];
        return vendor && createBaseCard(vendor, each);
      })
    );
    // return (
    //   vendorDetails &&
    //   vendorDetails.map((vendor) => {
    //     createBaseCard(vendor);
    //   })
    // );
  };

  const createVendorOnlyCards = () => {
    if (vendorsOnly) {
      return vendorsOnly.map((vendor) => {
        return createBaseCard(vendorDetails[vendor]);
      });
    } else {
      // Object.keys(obj)
      let vendors = Object.keys(vendorDetails);
      return vendors.map((vendor) => {
        return createBaseCard(vendorDetails[vendor]);
      });
    }

    // return (
    //   vendorDetails &&
    //   vendorDetails.map((vendor) => {
    //     createBaseCard(vendor);
    //   })
    // );
  };

  return (
    <>
      <div className="homeBanner" style={{ textAlign: "left" }}>
        <img src={banner1} height="220px"></img>
      </div>

      <div className="homeBanner1">
        <h1>Welcome back to LOKA</h1>
        <p>A Hyperlocal Shopping Platform.</p>
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

      {productVendors?.length == 0 && vendorsOnly?.length == 0 ? (
        "No Merchants matching your search criteria"
      ) : (
        <div className="row" style={{ paddingLeft: "20px" }}>
          {createVendorOnlyCards()}
          {createProductVendorCards()}
        </div>
      )}
      <div style={{ marginTop: "5% " }}></div>
      <Footer />
    </>
  );
}

export default CustomerHome;
