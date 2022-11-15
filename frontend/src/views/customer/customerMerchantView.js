import React, { useEffect, useState } from "react";
import shopLanding from '../../images/merchant/shopLandingPage.jpg'
import { Link } from "react-scroll";
import CustomerMerchantFooter from "../../components/footer/customerMerchantFooter";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ubereatslogo from "../../images/theme/UberEatsWhite.png";
import kiwi from "../../images/customer/kiwi.png";
import { Carousel } from 'antd';
import Grid from '@mui/material/Grid';
import { get, post } from "../../utils/serverCall.js";
import { useNavigate } from "react-router-dom";
import { doSignIn, showMessage } from "../../reducers/actions.js";
import { actionCreators } from "../../reducers/actionCreators.js";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const data={
        dairy:[
        {
            name:"milk"
        },
        {
            name:"cheese"
        },
        {
            name:"butter"
        },{
            name:"butter"
        },{
            name:"butter"
        },{
            name:"butter"
        },{
            name:"butter"
        }],
        meat:[
             {
            name:"chicken"
        },
        {
            name:"fish"
        },
        {
            name:"lamb"
        }],
        drinks:[
        {
            name:"coke"
        },
        {
            name:"pepsi"
        },
        {
            name:"sprite"
        }],
    }

export default function CustomerMerchantView() {
    
    const [products,setProducts]=React.useState(data)
    const [aproducts,setaProducts]=React.useState(data)
    const [allImages,setAllImages]=React.useState([1,2,3])
    

    // useEffect(() => {
    //     get("/auth/login", filledData)
    //   .then((result) => {
    //      let productsSubCat = {};
    //     for (let product of result.data) {
    //       if (!productsSubCat[product.category]) productsSubCat[product.category] = [];
    //       productsSubCat[product.category].push(product);
    //     }
    //     setProducts(productsSubCat)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }, []);

const renderImages=()=>{
    return(<>
    <Carousel autoplay>
            {allImages.map((image) => {return(<>
                 <div>
                    <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
                </div>
            </>);
            })}
            </Carousel>
         </>)
}    

const renderProducts = () => {
         let headers = Object.keys(aproducts);
    return (<>
                
        <div
          className="row"
          style={{
            top: 0,
            position: "-webkit-sticky",
            position: "sticky",
            zIndex: "100",
            backgroundColor:"white"
          }}
        >
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "left",
              marginTop: "10px",
              marginLeft:"30px"
            }}
          >
            {headers.map((header) => {
              return (
                <>
                  <li style={{ paddingRight: "50px"}}>
                    <Link to={header} spy={true} smooth={false} duration={1000}>
                      <label style={{fontSize:"23px",fontWeight:"500",textTransform: "capitalize",cursor:"pointer"}}>{header}</label>
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
          <hr></hr>
        </div>

        <div style={{ position: "relative",padding:"20px",paddingTop:"0px !important" }}>
          {headers.map((header) => {
            return (
              <>
                <div class="row" id={header} style={{ marginTop: "20px" }}>
                 <div style={{textAlign:"left"}}> 
                  <label style={{fontSize:"22px",fontWeight:"400",textTransform: "capitalize",marginBottom:"10px"}}>{header}</label>
                  </div>
                  

                  {products[header].map((dish) => {
                    return (
                      <>
                        <div
                          class="col-md-2"
                          style={{ padding: "10px", paddingBottom: "20px" }}
                        //   onClick={() => this.handleOpen(dish)}
                        >
                          <Card sx={{ width: "14vw",height:"30vh",borderWidth:"2px",backgroundColor:"#e5e8e8",cursor:"pointer",borderRadius:"10px" }}>
                            <CardMedia
                                component="img"
                                height="190vh"
                                image={kiwi}
                            />
                                <CardContent>
                                    <Grid container spacing={2} style={{marginBottom:"10px"}}>
                                            <Grid item xs={6} style={{textAlign:"left",fontSize:"18px",fontWeight:"500"}}>
                                                    Lizard
                                            </Grid>
                                            <Grid item xs={6} style={{textAlign:"right",fontSize:"14px",fontWeight:"400"}}>
                                                    $ 2.56
                                            </Grid>
                                    </Grid>
                                 
                                     <Typography variant="body2" color="text.secondary" style={{height:"4vh",textAlign:"left",inlineSize: "250px"}}>
                                            Lizards are a widespread group of squamate reptiles
                                     </Typography>
                                </CardContent>
                        
                          </Card>
                      

                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
        </>)
    }

    return (<>
        
         <div style={{ position: "relative",background:"black" }}>
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
            <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Welcome To Your Store!</h1>
        </div>
            {/* ***************************** body ********************************* */}
        <div>
            {renderProducts()}
        </div>

        {/* ***************************** footer ********************************* */}

        <CustomerMerchantFooter/>
    </>)
}
