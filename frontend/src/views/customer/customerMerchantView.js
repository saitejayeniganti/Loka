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

const data = {
  dairy: [
    {
      name: "milk",
    },
    {
      name: "cheese",
    },
    {
      name: "butter",
    },
    {
      name: "butter",
    },
    {
      name: "butter",
    },
    {
      name: "butter",
    },
    {
      name: "butter",
    },
  ],
  meat: [
    {
      name: "chicken",
    },
    {
      name: "fish",
    },
    {
      name: "lamb",
    },
  ],
  drinks: [
    {
      name: "coke",
    },
    {
      name: "pepsi",
    },
    {
      name: "sprite",
    },
  ],
};

export default function CustomerMerchantView() {
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("id");
  console.log("url id", searchParams.get("id"));
  const [redirAdLink,setRedirAdLink]=React.useState("");
  const [products, setProducts] = React.useState(data);
  const [aproducts, setaProducts] = React.useState(data);
  const [allImages, setAllImages] = React.useState([1, 2, 3]);

    //To get adds from external sources
      useEffect(() => {
        let today=new Date()
        //merchant id in the API
        get(`/admin/adimages?id=${"63752e8e24aed58999808f5c"}&date=${today}`)
      .then((result) => {
        console.log("API result",result)
        console.log("link is",result.redirectLink)
        if(result!={})
          setRedirAdLink(result.redirectLink)
        else
          setRedirAdLink("")
        let arr=[]
        let obj1={
                    "src":"vendor",
                    "img":shopLanding,
                    "link":""
                  }
        arr.push(obj1)
        if(result!=[])
              {
                   for(let i in result.imageList)
                    {
                      let obj={
                                "id":result._id,
                                "src":"ad",
                                "img":result.imageList[i],
                              }
                      arr.push(obj)
                    }
              }       
        setAllImages([...arr])
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

    const openImage=(e)=>{
        console.log(e.target)
    }

const renderImages=()=>{
    return(<>
    <Carousel autoplay>
            {allImages.map((image) => {return(<>
                 <div onClick={()=>{
                  if(image.link=="")
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
    let headers = Object.keys(aproducts);
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
                          fontSize: "23px",
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
                  <label style={{fontSize:"22px",fontWeight:"400",textTransform: "capitalize",marginBottom:"20px",marginLeft:"10px"}}>{header}</label>
                  </div>

                  {products[header].map((dish) => {
                    return (
                      <>
                         <Card sx={{ maxWidth: 250, textAlign: 'left',marginLeft:"20px",marginBottom:"20px",borderRadius:"7px" }} raised>
                            <CardMedia component="img" height="170" src={kiwi} />
                            <Stack spacing={1} sx={{ padding: "15px" }}>
                                <Typography variant="h5" sx={{textTransform:"capitalize"}}>{dish.name}</Typography>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    <Typography variant="subtitle1" >{`Price: `}</Typography>
                                </Stack>
                                <Typography variant="subtitle1" >{`Brand: `}</Typography>
                                <Divider sx={{ opacity: '1' }} />
                                <Typography variant="body1" color="text.secondary" align="justify" sx={{overflow:"hidden"}}>
                                    DescriptionDescriptionDescriptionDescription
                                </Typography>
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
              </>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ position: "relative", background: "black" }}>
        {/* <Carousel autoplay>
                 <div>
                    <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
                </div>
                <div>
                    <img src={ubereatslogo} style={{ width: "100%", height: "300px" }}></img>
                </div>
                <div>
                    <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
                </div>
                <div>
                    <img src={ubereatslogo} style={{ width: "100%", height: "300px" }}></img>
                </div>
            </Carousel> */}
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
          Welcome To Your Store!
        </h1>
      </div>
      {/* ***************************** body ********************************* */}
      <div>{renderProducts()}</div>

      {/* ***************************** footer ********************************* */}

      <CustomerMerchantFooter />
    </>
  );
}
