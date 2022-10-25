import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import cost from "../../images/merchant/cost.png";
import "../../App.css";
import delivery from "../../images/merchant/delivery.png";
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import Footer from "../../components/footer/footer";
import banner from "../../images/theme/banner.jpeg"
import banner1 from "../../images/theme/banner1.jpeg"
import banner2 from "../../images/theme/banner2.jpeg";
import { buttonUnstyledClasses } from "@mui/base";



const vendors=[
  {
    id:1,
    name:"Costco",
    image:cost,
    rating:"4.5",
    categories:["grocery","Frozen","Meat"],
    driveTime:"12 - 15 min"
  }
  ,
   {
    id:2,
    name:"Walmart",
    image:cost,
    rating:"3.5",
    categories:["Dairy","Meat"],
    driveTime:"21 - 25 min"
  }
  ,
   {
    id:2,
    name:"Walmart",
    image:cost,
    rating:"3.5",
    categories:["Dairy","Meat"],
    driveTime:"21 - 25 min"
  }
]

 const onVendorClick = (vendorId) => {
   console.log(vendorId)
  };
 

function CustomerHome() {
    return (
      <>
      
      <div className="homeBanner" style={{textAlign:"right"}}>
          <img src={banner1} height="220px"></img>
      </div>

      <div className="homeBanner1">
          <h1>Order products for pickup or delivery today</h1>
          <p>Whatever you want from local stores, brought right to your door.</p>
      </div>

      <div style={{ textSizeAdjust: "none",
        fontSize: "31px",
        lineHeight: "40px",
        fontWeight: "normal",
        marginTop: "8px",
        textAlign: "center",}}>
          Select a store nearby
      </div>
  
      <div className="row" >
        {
          vendors.map((vendor)=>(
    <Paper key={vendor.id} onClick={()=>onVendorClick(vendor.id)} elevation={2} sx={{maxWidth:"20%", borderRadius:"10px",padding:"0px !important",marginLeft:"20px",marginTop:"25px" }}> 
    
      <Grid container spacing={0}>
         <Grid item xs={4} sx={{display:"flex",flexDirection:"column",justifyContent:"center",height:"140px", padding:"10px"}}>
          <div style={{borderStyle: "solid",borderWidth: "0.1rem", borderColor:"#d3d3d3",borderRadius: "50%",marginLeft:"10px"}}> 
              <img src={vendor.image} style={{ borderColor:"black",padding:"0px !important",height:"100%",width:"100%"}}></img>
          </div>
         </Grid>
          <Grid container xs={8} sx={{background:"#ffe3ac", padding:"0px !important",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
              <Grid item xs={8}>
                    <div style={{textAlign:"left"}}>{vendor.name}</div>
              </Grid>
              <Grid item xs={4}>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",backgroundColor:"#F5F5F5",borderRadius:"45px",paddingTop:"2px",paddingBottom:"3px"}}>
                    <div style={{textAlign:"left",marginTop:"2px",fontSize:"14px"}}>{vendor.rating} &nbsp;</div>
                    <div ><StarPurple500SharpIcon fontSize="small"/></div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div style={{textAlign:"left",fontSize:"13px"}}>
                  {vendor.categories[0]}
                    {vendor.categories.slice(1,2).map((v)=><>{" - "}{v} </>)} ..
                </div>
              </Grid>
                
              <Grid item xs={12}>
                <div style={{textAlign:"left",fontSize:"13px"}}>
                   opening and close timings
                </div>
              </Grid>
                <Grid item xs={6}>
                
              </Grid>
              <Grid item xs={6}>
                <div style={{textAlign:"left",display:"flex"}}>
                    <img src={delivery} style={{width:"20px",height:"20px",display: "inline-block"}}></img>&nbsp;
                    <div style={{color:"rgb(10 173 10)",fontSize:"12px",display: "inline-block",marginTop:"5px"}}>{vendor.driveTime}</div>
                </div>
              </Grid>
         </Grid>
      </Grid>
      </Paper>
      
          ))
        }
      </div>
      <div style={{marginTop:"5% "}}></div>
      <Footer/>
      </>
    );
  }

  export default CustomerHome;