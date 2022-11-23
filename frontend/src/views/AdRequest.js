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
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import {
  DatePicker,
} from 'antd';
import { Navigate } from "react-router-dom";
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

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [amount,setAmount]=useState("");
  const [redirectLink,setRedirectLink]=useState("");
  const [merchantId,setMerchantId]=useState("");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");
  const [errorDetail,setErrorDetail]=useState("");

  const [allIds,setAllIds]=useState([])
  const [redirToAds,setRedirToAds]=useState(false)

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: adsCampaign,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

   useEffect(() => {
        get("/admin/allmerchants")
      .then((result) => {
          let arr=[]
          for(var a of result.vendor)
          {
            arr.push({"id":a._id,"name":a.storeName})
          }
          setAllIds([...arr])
          console.log("ids array",arr)
       })
        .catch((err) => {
      });
    }, []);


   const sendReq = () => {

    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
   
let currentDate = `${year}-${month}-${day}`;

    let requestdetails={
      "firstName":firstName,
      "lastName":lastName,
      "phone":phone,
      "email":email,
      "amount":amount,
      "redirectLink":redirectLink,
      "merchantId":merchantId,
      "fromDate":startDate,
      "toDate":endDate,
      "imageList":imageList,
      "created":currentDate,
      "isApproved":"",
      "isPaid":"",
      "status":"OPEN",
      "clicks":0
    }
    // console.log(requestdetails)
     if(firstName==""||lastName==""||phone==""||email==""||amount==""||redirectLink==""||merchantId==""||startDate==""||endDate==""||imageList==[])
    {
      setErrorDetail("Please input all the fields.")
      return
    }
    post("/admin/adrequest", requestdetails)
      .then((result) => {
        console.log("result time");
        console.log(result);
        setRedirToAds(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const deleteImage = (e) => {
      console.log(e) 
      var arr=[...imageList]
      var filtered=arr.filter(el => el!=e)
      setImageList([...filtered])
  }

  const calculateAmount = (startDate,endDate) => {
      console.log("start Date",startDate) 
      console.log("end Date",endDate) 
      if(startDate==""||endDate=="")
      return
      var date1 = new Date(startDate);
      var date2 = new Date(endDate);
      if(date1>date2)
      {
        console.log("Start date should be before End date")
        setErrorDetail("Start date should be before End date")
        return
      }
      var diff = date2.getTime() - date1.getTime();
      let days=diff/(1000 * 3600 * 24);
      setAmount((days*0.36).toFixed(2))
  }

  if (redirToAds) {
    return <Navigate to={"/ads"}/>;
  }

  return (
    <>
    <div style={{backgroundColor:"whitesmoke",position:"fixed",height:"100vh",width:"100vw"}}></div>
    {/* <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"50vw",marginLeft:"50vw",position:"fixed",borderTopLeftRadius:"70%"}}></div> */}
    <div style={{position:"relative"}}>
    <Grid container spacing={2} sx={{backgroundColor:"linen",padding:"10px",top:0}}>
      <Grid item xs={3}>
          <Lottie options={defaultOptions} height={200} width={280} />
      </Grid>
      <Grid item xs={6}>
          <h1>Promote your advertisements on LOKA</h1>    
        <p>You can choose where you want your Ad to be displayed for a defined time.</p>
      </Grid >
      <Grid item xs={3}>
          <img src={adReqImg} height='190'></img>
      </Grid>
    </Grid>

      <Grid container spacing={2} sx={{padding:"10px",paddingTop:"20px"}}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{padding:'20px',borderRadius:"10px",height:"63vh"}}>
            <Grid container spacing={2}  sx={{paddingTop:"10px"}}>
               <Grid item xs={12} sx={{textAlign:"right"}}>
                     <Button
                     variant="outlined"
                     startIcon={<KeyboardBackspaceTwoToneIcon />}
                    onClick={()=>setRedirToAds(true)}
                    
                  >
                    Back
                  </Button>
                </Grid>
            <Grid item xs={12} sx={{marginBottom:"1vh",fontSize:"28px"}}>Submit a request</Grid>
           
            <Grid item xs={12} sx={{marginBottom:"1vh",color:"red"}}>{errorDetail}</Grid>
            <Grid item xs={6}>
               <Grid item xs={12} style={{marginBottom:"2vh"}}>
                    <input type="text" 
                    style={{width: '100%',height:"42px",paddingLeft:'15px',borderRadius:"4px",borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="First Name"
                    onChange={(e)=>{setFirstName(e.target.value);setErrorDetail("")}}
                    ></input>
              </Grid> 
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
                     <input type="text" 
                    style={{width: '100%',height:"42px",paddingLeft:'15px',borderRadius:"4px",borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="Last Name"
                    onChange={(e)=>{setLastName(e.target.value);setErrorDetail("")}}
                    ></input>
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
                       <input type="text" 
                    style={{width: '100%',height:"42px",paddingLeft:'15px',borderRadius:"4px",borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="Phone"
                    onChange={(e)=>{setPhone(e.target.value);setErrorDetail("")}}
                    ></input>
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
                          <input type="text" 
                    style={{width: '100%',height:"42px",paddingLeft:'15px',borderRadius:"4px",borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="Email"
                    onChange={(e)=>{setEmail(e.target.value);setErrorDetail("")}}
                    ></input>
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
                        <select style={{width:"100%",height:"40px",borderRadius:"4px",paddingLeft:"15px"}}
                         onChange={(e)=>{setMerchantId(e.target.value);setErrorDetail("")}}>
                            <option value="">Select</option>
                            {allIds.map((m)=><option value={m.id}>{m.name}</option>)}
                          </select>
              </Grid>
            
            </Grid>
            <Grid item xs={6}>
               <Grid item xs={12} style={{marginBottom:"2vh",textAlign:"left"}}>
                         <input type="text" 
                         disabled
                         value={'$ '+amount}
                    style={{width: '50%',height:"42px",paddingLeft:'15px',borderRadius:"4px",borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="Amount"
                    onChange={(e)=>{setAmount(e.target.value);setErrorDetail("")}}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Rate: $ 0.36/day)
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
                            <input type="text" 
                    style={{width: '100%',height:"42px",paddingLeft:'15px',borderRadius:"4px",borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="Redirect Link"
                    onChange={(e)=>{setRedirectLink(e.target.value);setErrorDetail("")}}
                    ></input>
                       
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
                    <input type="date" style={{width: '100%',
                      height:"40px",paddingLeft:'15px'}} 
                      title="Start Date"
                      onChange={(e)=>{calculateAmount(e.target.value,endDate);setStartDate(e.target.value);setErrorDetail("")}}></input>
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}} >
                     <input type="date" style={{width: '100%',
                      height:"40px",paddingLeft:'15px'}}
                      title="End Date"
                      onChange={(e)=>{calculateAmount(startDate,e.target.value);setEndDate(e.target.value);setErrorDetail("")}}></input>
              </Grid>
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
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
              <Grid item xs={12} style={{marginBottom:"2vh"}}>
              <Button
                    variant="contained"
                    onClick={sendReq}
                    sx={{width:'30%'}}
                  >
                    Submit
                  </Button>
                  </Grid>
                  </Grid>
          </Paper>
          </Grid>

          <Grid item xs={3} >
            <Paper elevation={3} style={{borderRadius:"10px",height:"63vh",padding:"15px",overflowY:"scroll",paddingTop:"5vh"}}>
                   {imageList.length == 0 ? (
                    <><img src={empty} width="fill" height="50%"></img><div>No images are selected</div></>
                  ) : (
                    <>
                    <Grid container spacing={1}>
                      {imageList.map((item) => (
                        <>
                        <Paper elevation={1} style={{borderRadius:"5px",width:"100%",marginBottom:"10px",padding:"5px"}}>
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
          
     
      </Grid>
      </div>
    </>
  );
}

export default AdRequest;
