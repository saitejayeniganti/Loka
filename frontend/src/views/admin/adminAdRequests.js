import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from "react-lottie";
import dataAnalysis from "../../animations/data-analysis.json";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import testingDone from '../../images/admin/testing-done.png';
import reviewsimg from '../../images/admin/reviews.png';
import waiting from '../../images/admin/waiting.png';
import approved from '../../images/admin/approved.png';
import order from '../../images/admin/order.png';
import pending from '../../images/admin/pending.png';
import graphBar from '../../images/admin/graph-bar.png';
import { get, post,put } from "../../utils/serverCall.js";
import { Navigate } from "react-router-dom";
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
    width: 150,
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
    width: 150,
  },
  // {
  //   field: 'clicks',
  //   headerName: 'Clicks',
  //   width: 150,
  // },

   {
    field: 'Clickthrough rate (CTR)',
    headerName: 'Clickthrough rate (CTR)',
    width: 450,
  },
];


function AdminHome() {

    const [redirToHome, setRedirToHome] = useState(false);
    const [rows, setRows] = React.useState([]);
    const [btnVisible, setBtnVisible] = React.useState(false);
    const [selectedAd, setSelectedAd] = React.useState("");

      useEffect(() => {
   get(`/admin/alladdetails`)
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
                        // "clicks":u.status=="PAID"?u.clicks:"NA",
                        "Clickthrough rate (CTR)":u.status=="PAID"?u.clicks==0 || u.views==0?0:(parseInt(u.clicks)/u.views).toFixed(1)+" %":"NA"
                }     
                arr.push(ob)
            }
            setRows([...arr])
       }) 
        .catch((err) => {
        
      });
    }, []);
  
   const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: dataAnalysis,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const approve = () => {
    let requestdetails={
        "id":selectedAd.id,
        "isApproved":"APPROVED",
        "status":"APPROVED"
    }
    console.log(requestdetails)
     put(`/admin/adstatus`,requestdetails)
      .then((result) => { 
        setSelectedAd("")
        window.location.reload(true);
      })
        .catch((err) => {
        
      });
  };

  const reject = () => {
     let requestdetails={
        "id":selectedAd.id,
        "isApproved":"REJECTED",
        "status":"REJECTED"
    }
    console.log(requestdetails)
     put(`/admin/adstatus`,requestdetails)
      .then((result) => { 
            setSelectedAd("")
            window.location.reload(true);
      })
        .catch((err) => {
        
      });
  };

  const rowSelected = (e) => {
    console.log(e)
    setSelectedAd(e)
    if(e.isApproved=="" )
        setBtnVisible(true)
    else
        setBtnVisible(false)
    
  }

    if (redirToHome) {
    return <Navigate to={"/adminhome"} />;
  }

    return (
      <>
        <div style={{backgroundColor:"#e7e4e4",position:"fixed",height:"40vh",width:"100vw"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"35vh",width:"100vw",borderBottomLeftRadius:"45%",borderBottomRightRadius:"5%"}}></div>
        <div style={{height:"60vh",backgroundColor:"#e7e4e4",width:"100vw",marginTop:"40vh",position:"fixed"}}></div>

        <div style={{position:"relative"}}>
          <div style={{padding:"15px"}}>
            <Grid container spacing={0} sx={{paddingLeft:"30px"}}>
              <Grid item xs={8} >
                <Grid item xs={12} style={{color:"white",fontSize:"40px",fontWeight:"600px",textAlign:"left",marginBottom:"15px"}}>
                    AD Requests
                </Grid>
                {/* <Grid item xs={12} style={{color:"white",fontSize:"16px",textAlign:'left',fontWeight:"600",marginBottom:"15px"}}>
                    Welcome back to the Dashboard.
                </Grid> */}
                <Grid item xs={12} style={{color:"white",fontSize:"16px",textAlign:'left'}}>
                    See quick links and overviews of Loka platform, new accounts, total vendors, users and more.
                </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Lottie options={defaultOptions} height={200} width={500} />
                </Grid>
            </Grid>
          </div>
          <Grid container spacing={2} sx={{padding:"20px"}}>
            
            {/* -------------------------------------------left 1--------------------------------------------- */}
        
               

                                 <Grid item xs={12} >
                    <Paper style={{height:"60vh",borderRadius:"15px",padding:"20px"}}>
                          <div style={{ height: '50vh', width: '100%',background:"white", }}>
                              <Grid item xs={12} sx={{textAlign:"right"}}>
                               <div style={{paddingLeft:"20px",marginBottom:'10px'}}>
                                {btnVisible?<>
                                       <Button variant="outlined" startIcon={<ThumbUpAltIcon />} sx={{}} onClick={approve}>
                            Approve
                            </Button>
                         <Button variant="outlined" startIcon={<ThumbDownAltIcon />} sx={{marginLeft:"10px"}} onClick={reject}>
                            Reject
                            </Button>
                                </>:""}
                             
                                  <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />} sx={{marginLeft:"10px"}} onClick={()=>setRedirToHome(true)}>
                                     Home
                                     </Button>
                                 
                                 </div>
                         </Grid>
                    <DataGrid
                    components={{
                                Toolbar: GridToolbar,
                                }}
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    // rowsPerPageOptions={[5,10,15,20]}
                    onRowClick={(e)=>rowSelected(e.row)}
                    />
                    </div>
                    </Paper>
                </Grid>

                
          
            
            
           
          </Grid>
        </div>
      </>
    );
  }

export default AdminHome;
