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
import { get, post, put} from "../utils/serverCall.js";
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
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  DatePicker,
} from 'antd';
import { Navigate } from "react-router-dom";
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import PayPalTest from "./paypalTest.js";

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'merchant',
    headerName: 'Merchant',
    width: 150,
  }, 
//    {
//     field: 'redirectLink',
//     headerName: 'Link',
//     width: 150,
//   },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 100,
  },
  {
    field: 'from',
    headerName: 'From',
    width: 150,
  }, 
  {
    field: 'to',
    headerName: 'To',
    width: 150,
  },
  {
    field: 'isApproved',
    headerName: 'Approved',
    width: 150,
  },
{
    field: 'isPaid',
    headerName: 'Payment',
    width: 100,
  },
  {
    field: 'Clickthrough rate (CTR)',
    headerName: 'Clickthrough rate (CTR)',
    width: 200,
  },
];

export default function AdDetails() {
const [redirToAds,setRedirToAds]=useState(false)
const [rows, setRows] = React.useState([]);
const [email, setEmail] = React.useState("");
const [selectedRequest, setSelectedRequest] = React.useState("");
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: adsCampaign,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rowSelected = (e) => {
    console.log("selected request ",e)
    setSelectedRequest(e)
  }

   const searchUser = () => {
    get(`/admin/addetails?id=${email}`)
      .then((result) => { 
        console.log(result)
        var arr=new Array()
            for(var u of result)
            {
                 var ob={
                        "id":u._id,
                        "merchantId":u.merchantId._id,
                        "name":u.firstName+" "+u.lastName,
                        "merchant":u.merchantId!=undefined?u.merchantId.storeName:"",
                        "redirectLink":u.redirectLink,
                        "amount":u.amount,
                        "from":u.fromDate.substr(0, 10),
                        "to":u.toDate.substr(0, 10),
                        "isApproved":u.isApproved,
                        "isPaid":u.isPaid,
                        "created":u.created,
                        "phone":u.phone,
                        "Clickthrough rate (CTR)":u.status=="PAID"?u.clicks==0 || u.views==0?0:(parseInt(u.clicks)/u.views).toFixed(1)+" %":"NA"
                }     
                arr.push(ob)
            }
            setRows([...arr])
       })
        .catch((err) => {
        
      });
  }

    const paid = (e) => {
      console.log("in paid func")
      let requestdetails={
        "id":e,
        "isPaid":"PAID",
        "status":"PAID"
    }
    console.log(requestdetails)
     put(`/admin/adpaid`,requestdetails)
      .then((result) => { 
            setSelectedAd("")
            
      })
        .catch((err) => {
        
      });

        get(`/admin/addetails?id=${email}`)
      .then((result) => { 
        console.log(result)
        var arr=new Array()
            for(var u of result)
            {
                 var ob={
                        "id":u._id,
                        "merchantId":u.merchantId._id,
                        "name":u.firstName+" "+u.lastName,
                        "merchant":u.merchantId!=undefined?u.merchantId.storeName:"",
                        "redirectLink":u.redirectLink,
                        "amount":u.amount,
                        "from":u.fromDate.substr(0, 10),
                        "to":u.toDate.substr(0, 10),
                        "isApproved":u.isApproved,
                        "isPaid":u.isPaid,
                        "created":u.created,
                        "phone":u.phone
                }     
                arr.push(ob)
            }
            setRows([...arr])
       })
        .catch((err) => {
        
      });
      setSelectedAd("")
  }
  

    if (redirToAds) {
    return <Navigate to={"/ads"}/>;
  }

    return (<>
            <div style={{backgroundColor:"whitesmoke",position:"fixed",height:"100vh",width:"100vw"}}></div>
            <div style={{position:"relative"}}>
    <Grid container spacing={2} sx={{backgroundColor:"linen",padding:"10px",top:0}}>
      <Grid item xs={3}>
          <Lottie options={defaultOptions} height={200} width={280} />
      </Grid>
      <Grid item xs={6}>
          <h1>Find your previous AD requests</h1>    
        <p>You can pay for the approved requests before the request start date or resubmit a rejected request.</p>
      </Grid >
      <Grid item xs={3}>
          <img src={adReqImg} height='190'></img>
      </Grid>
    </Grid>
    <Grid container spacing={2} sx={{padding:"20px"}}>
       
        <Grid item xs={12} sx={{textAlign:"right"}}>
              <Button
                      variant="outlined"
                    startIcon={<KeyboardBackspaceTwoToneIcon />}
                    onClick={()=>setRedirToAds(true)}
                  >
                    Back
                  </Button>
        </Grid>
        <Grid container>
            <Grid item xs={2.5}></Grid>
            <Grid item xs={4}>
                  <input type="text" 
                    style={{width: '100%',height:"42px",paddingLeft:'15px',borderRadius:"4px",
                    borderStyle:"solid",borderColor:"black",borderWidth:"1px"}}
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    ></input>
            </Grid>
            <Grid item xs={3}>
                <Button
                     variant="contained"
                     startIcon={<SearchRoundedIcon />}
                    onClick={searchUser}
                  >
                    Search
                  </Button> 
            </Grid>
            <Grid item xs={2.5}></Grid>
            </Grid>
            <Grid container spacing={0} sx={{marginTop:"2vh"}}>
                <Grid item xs={0.5}></Grid>
                <Grid item xs={8} sx={{height:"50vh"}}>
                    {rows.length==0?"":<>
                     <DataGrid
                    components={{
                                Toolbar: GridToolbar,
                                }}
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    onRowClick={(e)=>rowSelected(e.row)}
                    />
                    
                    </>}
                </Grid>
                {rows.length==0?"":<>
                <Grid item xs={3} sx={{borderStyle:"solid",borderWidth:"1px",padding:"10px",marginLeft:"2vw",borderRadius:"3px",borderColor:"#D8D8D8",maxHeight:"50vh",overflowY:"scroll"}}>
                     {selectedRequest==""?
                                    <div style={{marginTop:"15vh"}}>Select a request</div>:
                                    ((selectedRequest.isApproved=="APPROVED" && selectedRequest.isPaid=="PAID")) ?
                                    <div style={{marginTop:"15vh"}}>NO ACTION TO PERFORM</div>:
                                    (selectedRequest.isApproved=="APPROVED" && (selectedRequest.isPaid=="" || selectedRequest.isPaid==undefined))?
                               <div style={{maxHeight:"40vh",marginTop:"10vh"}}> <PayPalTest id={selectedRequest.id} price={selectedRequest.amount} name={selectedRequest.name} paid={paid}/></div>:
                               selectedRequest.isApproved==""?<div style={{marginTop:"15vh"}}>APPROVAL PENDING BY <br/> LOKA ADMIN</div>:
                               selectedRequest.isApproved=="REJECTED"?<div style={{marginTop:"15vh"}}>REQUEST REJECTED BY <br/> LOKA ADMIN. <br/>YOU CAN RAISE A NEW REQUEST.</div>:""
                              
                     }
                </Grid></>}
                <Grid item xs={0.5}></Grid>
            </Grid>
    </Grid>
    </div>
    </>)
}