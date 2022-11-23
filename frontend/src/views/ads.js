import React, { useEffect, useState, useRef } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NumberFormat from "react-number-format";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "react-s3";
import FileUpload from "../components/FileUpload.js";
import { v4 as uuidv4 } from "uuid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { get, post } from "../utils/serverCall.js";
import { doSignIn, showMessage } from "../reducers/actions.js";
import { actionCreators } from "../reducers/actionCreators.js";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Lottie from "react-lottie";
import adsCampaign from "../animations/ads-promotion.json";
import ads from "../animations/ads.json";
import { Button } from "@mui/material";

import adReqImg from '../images/admin/business-advertisement.png'
import onlineAdvertisement from '../images/admin/online-advertisement.png'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import banner1 from "../images/theme/banner1.jpeg";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  DatePicker,
} from 'antd';
import { Navigate } from "react-router-dom";

export default function Ads() {
    const [redirToAdRequest,setRedirToAdRequest]=useState(false)
    const [redirToAdDetails,setRedirToAdDetails]=useState(false)

    const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: adsCampaign,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: ads,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

   if (redirToAdRequest) {
    return <Navigate to={"/adrequest"}/>;
  }

  if (redirToAdDetails) {
    return <Navigate to={"/addetail"}/>;
  }
    
    return (<>
        <div style={{backgroundColor:"whitesmoke",position:"fixed",height:"100vh",width:"100vw"}}></div>
        <div style={{position:"relative"}}>
    <Grid container spacing={2} sx={{backgroundColor:"linen",padding:"10px",top:0}}>
      <Grid item xs={3}>
          <Lottie options={defaultOptions} height={200} width={280} />
      </Grid>
      <Grid item xs={6}>
          <h1>Make a request to get your advertisement promoted</h1>    
          <p>You can choose where you want your Ad to be displayed for a defined time.</p>
      </Grid >
      <Grid item xs={3}>
          <img src={adReqImg} height='190'></img>
      </Grid>
    </Grid>
     <Grid container spacing={2} sx={{heigth:"50vh"}}>
           
            <Grid item xs={6} sx={{marginTop:"0vh",padding:"10px"}}>
              <Grid item xs={12} sx={{marginLeft:"20px"}}>
                  <Lottie options={defaultOptions1} height={380} width={380} />
              </Grid>
                <Grid item xs={12}>
                     <Button
                    variant="contained"
                    onClick={()=>setRedirToAdRequest(true)}
                    sx={{width:'40%',height:"50px"}}
                  >
                    Submit a request
                  </Button>
                </Grid>
                
                <Grid item xs={12} sx={{marginTop:"6vh"}}>
                   <Button
                    variant="contained"
                    onClick={()=>setRedirToAdDetails(true)}
                    sx={{width:'40%',height:"50px"}}
                  >
                    Check previous requests
                  </Button>
                  </Grid>
            </Grid>
            <Grid item xs={6} sx={{marginTop:"6vh"}}>
                <img src={onlineAdvertisement} alt="Image" height="500px" width="500px"/>
            </Grid>
            
        </Grid>
        </div>
       
    </>)
}