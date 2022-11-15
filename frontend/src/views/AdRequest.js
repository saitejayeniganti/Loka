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
import adsCampaign from "../animations/ads-campaign.json";
import { Button } from "@mui/material";
import empty from '../images/admin/empty-folder.png'
import adReqImg from '../images/admin/business-advertisement.png'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import banner1 from "../images/theme/banner1.jpeg";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  DatePicker,
} from 'antd';

window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "event-scout",
  //   dirName: "" /* optional */,
  region: "us-east-1",
  accessKeyId: "AKIA5SITFOMDE2SHCWOK",
  secretAccessKey: "/xpkY98lNxt3736mp1r5bFyVlQjZtylEtTNnx2ugN",
};

function AdRequest() {
  const [imageList, setImageList] = useState([]);
  const [file, setFile] = useState("");
  const requestdetails=useState({
    firstName:"",
    lastName:"",
    phone:"",
    company:"",
    merchantId:"",
    amount:"",
    redirectLink:"",
    startDate:"",
    endDate:"",
    imageList:[]
  })

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: adsCampaign,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const deleteImage = (e) => {
      console.log(e) 
      var arr=[...imageList]
      var filtered=arr.filter(el => el!=e)
      setImageList([...filtered])
  }

   const submitForm = (e) => {
    // e.preventDefault();
    // post("/auth/login", filledData)
    //   .then((result) => {
    //     console.log(result);
    //     doSignIn("true");
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
    <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>
    <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"50vw",marginLeft:"50vw",position:"fixed",borderTopLeftRadius:"70%"}}></div>
    <div style={{position:"relative"}}>
      
    <Grid container spacing={2} sx={{backgroundColor:"#aedbde",padding:"10px",top:0}}>
      <Grid item xs={3}>
          <Lottie options={defaultOptions} height={200} width={280} />
      </Grid>
      <Grid item xs={6}>
          <h1>Make a request to get your advertisement promoted</h1>
        <p>Whatever you want from local stores, brought right to your door.</p>
      </Grid>
      <Grid item xs={3}>
          <img src={adReqImg} height='190'></img>
      </Grid>
    </Grid>

      <Grid container spacing={2} sx={{padding:"10px",paddingTop:"20px"}}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{padding:'20px',borderRadius:"10px",height:"63vh"}}>
            <Grid container spacing={2}  sx={{paddingTop:"10px"}}>
            <Grid item xs={12} sx={{marginBottom:"2vh",fontSize:"28px"}}>Submit a request</Grid>
            <Grid item xs={6}>
               <Grid item xs={12} style={{marginBottom:"4vh"}}>
                   <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                       }}
                      placeholder="First Name"
                      size="small"
                    />
              </Grid> 
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                    <TextField
                      fullWidth
                      id="outlined-size-small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                      }}
                      placeholder="Last Name"
                      size="small"
                      name="lastName"
                    />
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                <TextField
                        fullWidth
                        id="outlined-size-small"
                        InputProps={{
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                        placeholder="Phone"
                        size="small"
                        name="phone"
                      />
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                  <TextField
                          fullWidth
                          id="outlined-size-small"
                          InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                          }}
                          placeholder="Company"
                          size="small"
                          name="company"
                        />
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                        <Select
                          value={10}
                          displayEmpty
                          sx={{width:"100%"}}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
              </Grid>
            
            </Grid>
            <Grid item xs={6}>
               <Grid item xs={12} style={{marginBottom:"4vh"}}>
                <TextField
                        fullWidth
                        id="outlined-size-small"
                        InputProps={{
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                        type="number"
                        placeholder="Amount"
                        size="small"
                        name="amount"
                      />
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                  <TextField
                          fullWidth
                          id="outlined-size-small"
                          InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                          }}
                          placeholder="Redirect Link"
                          size="small"
                          name="redirectLink"
                        />
                       
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                       <DatePicker
                          style={{
                            width: '50%',
                          }}
                          placeholder="Start Date"
                        />
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
                      <DatePicker
                        style={{
                          width: '50%',
                        }}
                        placeholder="End Date"
                      />
              </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh",paddingTop:"2vh"}}>
                    <FileUpload
                      callback={(e) => {
                        console.log("location", e);
                        var arr=[]
                        arr=[...imageList]
                        arr.push(e)
                        setImageList([...arr])
                        console.log("do other operation");
                      }}
                      fileName={uuidv4()}
                      folderPath="hello/"
                    />
              </Grid>
            </Grid>
              <Grid item xs={12} style={{marginBottom:"4vh"}}>
              <Button
                    variant="contained"
                    onClick={submitForm}
                    sx={{width:'30%'}}
                  >
                    Submit
                  </Button>
                  </Grid>
                  </Grid>
          </Paper>
          </Grid>

          <Grid item xs={3} >
            <Paper elevation={3} style={{borderRadius:"10px",height:"63vh",padding:"15px",overflowY:"scroll",paddingTop:"10vh"}}>
                   {imageList.length == 0 ? (
                    <><img src={empty} width="fill" height="50%"></img><div>No images are selected</div></>
                  ) : (
                    <>
                    
                    <Grid container spacing={1}>
                      {imageList.map((item) => (
                        <>
                        <Paper elevation={1} style={{borderRadius:"5px",width:"100%", padding:"10px",marginBottom:"10px",backgroundColor:"rgb(235 245 245)"}}>
                          <Grid container spacing={1}>
                          <Grid item xs={10} key={item} style={{textAlign:"left"}}>
                               <img
                              src={item}
                              height="100"
                              width="200"
                              loading="lazy"
                              onClick={()=>{window.open(item,'_blank','noopener')}}
                              />
                        </Grid>
                        <Grid item xs={2} title="Delete image" style={{marginBottom:"10px",display: "flex",justifyContent:" center",alignItems:" center",cursor:"pointer"}} onClick={()=>deleteImage(item)}>
                            <DeleteForeverIcon fontSize="large"/>
                        </Grid>
                        </Grid>
                        </Paper>
                        </>
                      ))}
                      </Grid>
                      
                    </>
                  )}
            </Paper>
          </Grid>
          <Grid item xs={1.5}></Grid>
     
      </Grid>
      </div>
    </>
  );
}

export default AdRequest;
