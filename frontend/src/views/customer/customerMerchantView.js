import React, { useEffect, useState } from "react";
import shopLanding from "../../images/merchant/shopLandingPage.jpg";
import { Link } from "react-scroll";
import CustomerMerchantFooter from "../../components/footer/customerMerchantFooter";
import { useNavigate, useSearchParams } from "react-router-dom";
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import kiwi from "../../images/customer/kiwi.png";
import { Carousel } from 'antd';
import { get, post,put } from "../../utils/serverCall.js";

import { doSignIn, showMessage } from "../../reducers/actions.js";
import { actionCreators } from "../../reducers/actionCreators.js";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, CardMedia, CardActions, Button, Typography, Grid, Stack, Divider } from '@mui/material';
import { Navigate } from "react-router-dom";


export default function CustomerMerchantView() {
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("id");
  const [redirAdLink,setRedirAdLink]=React.useState("");
  const [products, setProducts] = React.useState({});
  const [allImages, setAllImages] = React.useState([1, 2, 3]);
  const [redirProductDetail, setRedirProductDetail] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(false);
  const [storeName, setStoreName] = React.useState(false);

      //Toget product details
      useEffect(() => {
          get(`/admin/allproducts?id=${searchParams.get("id")}`)
          .then((result) => {
            console.log(result)
            let productSubCat = {};
            for (let product of result) {
              if (!productSubCat[product.category.name]) productSubCat[product.category.name] = [];
              productSubCat[product.category.name].push(product);
            }
            setProducts(productSubCat)
            // console.log("sub cat is ",productSubCat)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []); 


    //To get ads from external sources
      useEffect(() => {
        let today=new Date()
        //merchant id in the API
        get(`/admin/adimages?id=${searchParams.get("id")}&date=${today}`)
      .then((result) => {
        console.log("API result for ads",result)
        
        let ads=result.ads
        let merchant=result.merchant[0]
        setStoreName(merchant.storeName)
        // console.log("link is",ads.redirectLink)

        if(ads!={})
          setRedirAdLink(ads.redirectLink)
        else
          setRedirAdLink("")
        let arr=[]
        arr.push({
                  "id":ads._id,
                  "src":"vendor",
                  "img":merchant.image,
                    })
        if(merchant.ads!=undefined && merchant.ads.length!=0)
        {
          // console.log("merchant own ads",merchant.ads)
          // console.log("before merchant owen ads",arr)
            for(let i in merchant.ads)
                    {
                      let obj={
                                "id":ads._id,
                                "src":"vendor",
                                "img":merchant.ads[i],
                              }
                      console.log("merchant ads iteration")
                      arr.push(obj)
                    }
          // console.log("after merchant own ads",arr)
        }
        if(ads!={})
              {
                   for(let i in ads.imageList)
                    {
                      let obj={
                                "id":ads._id,
                                "src":"ad",
                                "img":ads.imageList[i],
                              }
                      arr.push(obj)
                      // console.log("after outside iteration")
                    }
          // console.log("after outside ads",arr)
              }       
        setAllImages([...arr])
      })
      .catch((err) => {
        console.log(err);
      });
    }, []); 

const renderImages=()=>{
    return(<>
    <Carousel autoplay effect="fade">
            {allImages.map((image) => {return(<>
                 <div onClick={()=>{
                  if(image.src=="vendor")
                  { }
                  else
                  {
                    console.log(image)
                    let requestdetails={
                                  "id":image.id,
                              }
                  put(`/admin/adclick`,requestdetails)
                    .then((result) => {
                      console.log("ad click API result",result)
                      window.open(redirAdLink, "_blank")
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  }
                  }}>
                    <img src={image.img} style={{ width: "100%", height: "300px" }}></img>
                </div>
              </>
            );
          })}
        </Carousel>
      </>
    );
  };

  const renderProducts = () => {
    let headers = Object.keys(products);
    return (
      <>
        <div
          className="row"
          style={{
            top: 0,
            position: "-webkit-sticky",
            position: "sticky",
            zIndex: "100",
            backgroundColor: "white",
          }}
        >
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "left",
              marginTop: "10px",
              marginLeft: "30px",
            }}
          >
            {headers.map((header) => {
              return (
                <>
                  <li style={{ paddingRight: "50px" }}>
                    <Link to={header} spy={true} smooth={false} duration={1000}>
                      <label
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                      >
                        {header}
                      </label>
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
          <hr></hr>
        </div>

        <div style={{ position: "relative",paddingLeft:"20px",paddingTop:"0px !important" }}>
          {headers.map((header) => {
            return (
              <>
                <div class="row" id={header} style={{ marginTop: "0px",marginBottom:"30px" }}>
                 <div style={{textAlign:"left"}}> 
                  <label style={{fontSize:"20px",fontWeight:"400",textTransform: "capitalize",marginBottom:"20px",marginLeft:"10px"}}>{header}</label>
                  </div>

                  {products[header].map((dish) => {
                    return (
                      <>
                         <Card sx={{ maxWidth: 180, textAlign: 'left',marginLeft:"20px",marginBottom:"20px",cursor:"pointer",
                                      borderRadius:"7px",boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",transition: "0.3s", "&:hover": {
                                      boxShadow: "0 8px 16px 0 rgba(2, 25, 77, 0.5)"
                            
                            } }} raised onClick={()=>{setSelectedProduct(dish);setRedirProductDetail(true)}}>
                            <CardMedia component="img" height="130" src={kiwi}/>
                            <Stack spacing={1} sx={{ padding: "5px" }}>
                              <div style={{textTransform: "capitalize",fontSize:"16px",fontWeight:"500"}}>{dish.name}</div>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    <div>{`Price: `}&nbsp;${dish.price}</div>
                                </Stack>
                                <div>{`Brand: `}{dish.brand.name}</div>
                                <Divider sx={{ opacity: '1' }} />
                                <div style={{overflow:"hidden"}}>
                                    {dish.desription}
                                </div>
                                    
                                
                                
                                {/* <Divider sx={{ opacity: '1' }} /> */}
                                <CardActions>
                                    {/* <Grid container spacing={1} justifyContent="flex-end">
                                        <Grid item>{props.isMerchant && <Button size="small" variant="outlined" onClick={() => props.handleOpenUpdateModal(props.singleItem)} >Edit</Button>}</Grid>
                                        <Grid item> {props.isMerchant && <Button size="small" variant="outlined" onClick={() => props.handleOpenDeleteDialog(props.singleItem._id)} color="error">Delete</Button>}</Grid>
                                    </Grid> */}
                                </CardActions>
                            </Stack>
                          </Card>
                          
                      </>
                    );
                  })}
                </div>
                {/* <Divider sx={{ opacity: '1' }} /> */}
              </>
            );
          })}
        </div>
      </>
    );
  };

 if (redirProductDetail) {
  console.log("redirecting",selectedProduct._id)
    return <Navigate to={"/product?id=" + selectedProduct._id} />;
  }

  return (
    <>
      <div style={{ position: "relative", background: "black" }}>
        {renderImages()}
        <h1
          style={{
            position: "absolute",
            bottom: "8px",
            left: "16px",
            color: "white",
            backgroundColor: "#063970",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          Welcome To {storeName}!
        </h1>
      </div>
      {/* ***************************** body ********************************* */}
      <div>{Object.keys(products).length===0?<div style={{marginTop:"5vh"}}>This merchant has no products.</div>:renderProducts()}</div>

      {/* ***************************** footer ********************************* */}

      <CustomerMerchantFooter />
    </>
  );
}
