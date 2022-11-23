import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from "react-lottie";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import TabPanel from '@mui/lab/TabPanel';
import money from "../../images/admin/money.png"
import order from "../../images/admin/order (1).png"
import review from "../../images/admin/reviews (2).png"
import ads from "../../images/admin/ads.png"
import location from "../../images/admin/location.png"
import testBanner from "../../images/admin/testBanner.jpg"
import { Button, MenuItem, Select, TextField } from "@mui/material";
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { get, post } from "../../utils/serverCall.js";
import { Navigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import locationpng from "../../images/admin/location.png"
import emailpng from "../../images/admin/email.png"
import phonepng from "../../images/admin/phone.png"
import time from "../../images/admin/calendar.png"
import namepng from "../../images/admin/name-tag.png"
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      // text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"];

function AdminVendorDetail() {
  const location = useLocation();
  console.log("location in vendor detail",location.state)
  const [value, setValue] = React.useState('1');
  const [redirToVendors, setRedirToVendors] = useState(false);
  const [redirToOrders, setRedirToOrders] = useState(false);
  const [redirToReviews, setRedirToReviews] = useState(false);
  const [redirToAds, setRedirToAds] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({
                                                    storeName:"",
                                                    location:{address:""},
                                                    email:"",
                                                    created:""
                                                    });
   const [reviews, setReviews] = useState([]);
  const [orders, setorders] = useState([]);
  const [created, setCreated] = useState("");
  const [moneyVal, setMoneyVal] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [ordersMap, setOrdersMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Orders',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );
  
  const [reviewsMap, setReviewsMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Reviews',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );          
  
  const [spentMap, setSpentMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Revenue',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );             
                                                    
  const [adsMap, setAdsMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Ads clicked',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );                                                          

    useEffect(() => {
        get(`/admin/vendor?id=${location.state.id}`)
      .then((result) => {   
        console.log(result)
        setVendorDetails(result.vendor[0])
        // setReviews(result.reviews)
        setorders(result.orders)
        var d=result.vendor[0].created.substr(0, 10)
        setCreated(d)
        
        var moneyValue=0;
        for(let o of result.orders)
          moneyValue+=o.total;
        setMoneyVal(moneyValue)
        var ordersArr=new Array(12).fill(0)
        var reviewsArr=new Array(12).fill(0)
        var spentArr=new Array(12).fill(0)
        var adsArr=new Array(12).fill(0)
        for(var u of result.orders)
        {
          var d= new Date(u.created)
          var m=d.getMonth()
          ordersArr[m]+=1
        }
         setOrdersMap({
                    labels,
                    datasets: [
                      {
                        label: 'Orders',
                        data: ordersArr,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },

                    ]
                    })
        //  for(var u of result.reviews)
        // {
        //   var d= new Date(u.created)
        //   var m=d.getMonth()
        //   reviewsArr[m]+=1
        // }
        //  setReviewsMap({
        //             labels,
        //             datasets: [
        //               {
        //                 label: 'Reviews',
        //                 data: reviewsArr,
        //                 borderColor: 'rgb(255, 99, 132)',
        //                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //               },

        //             ]
        //             })
         for(var u of result.orders)
        {
          var d= new Date(u.created)
          var m=d.getMonth()
          spentArr[m]+=u.total
        }
         setSpentMap({
                    labels,
                    datasets: [
                      {
                        label: '$ Spent',
                        data: spentArr,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },

                    ]
                    })
       })
      .catch((err) => {
        
      });
    }, []);                                                    

      if (redirToVendors) {
    return <Navigate to={"/adminvendors"} />;
  }

    if (redirToOrders) {
    return <Navigate to={"/adminvendororders"} state={location.state}/>;
  }

    if (redirToReviews) {
    return <Navigate to={"/adminvendorreviews"} state={location.state}/>;
  }

  return (<>
        
        <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"30vw",marginLeft:"70vw",position:"fixed"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>

        <div style={{position:"relative"}}>
            <Grid container spacing={2} style={{padding:"20px"}}>
                 <Grid item xs={3} onClick={()=>setRedirToOrders(true)}>
                    <Paper elevation={3} style={{padding:"10px",cursor:"pointer"}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                <img src={order} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total orders</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>{orders.length}</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>   

                  <Grid item xs={3} onClick={()=>setRedirToReviews(true)}>
                    <Paper elevation={3} style={{padding:"10px",cursor:"pointer"}} onClick={()=>setRedirToReviews(true)}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                <img src={review} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total reviews</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>56</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>  

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                 <img src={money} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total revenue</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>$ {moneyVal}</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>  

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                 <img src={ads} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10}>
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total Ad revenue</div>
                            </Grid>
                             <Grid item xs={12}>
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>0</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>  

                 <Grid item xs={3}>
                    <Paper elevation={3} style={{height:"70vh",padding:"10px"}}>
                          <Grid container spacing={3} >
                                <Grid item xs={12}>
                                    <img src={testBanner} height="150" width="100%"></img>
                                </Grid>
                                {/* <Grid item xs={12}>
                                <div style={{marginTop:"1vh",textAlign:"left",paddingLeft:"24px"}}>
                                    <Grid item xs={12}>
                                      <div style={{fontSize:"22px",fontWeight:"500"}}>
                                        {vendorDetails.storeName}
                                      </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{color:"#464847",fontSize:"16px"}}>
                                        {vendorDetails.email}
                                      </div>
                                    </Grid>
                                </div>
                                </Grid> */}
                                 <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={namepng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {vendorDetails.storeName}
                                    </Grid>
                                </Grid>
                                 <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={emailpng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {vendorDetails.email}
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={locationpng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"0.5vh"}}>
                                          {vendorDetails.location.address}
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={time} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {created}
                                    </Grid>
                                </Grid>
                                {/* <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={time} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8}>
                                          {created}
                                    </Grid>
                                </Grid> */}
                          </Grid>
                    </Paper>
                    </Grid>

                 <Grid item xs={9}>
                    <Paper elevation={3} style={{height:"70vh"}}>
                        <Grid container style={{padding:"10px"}}>
                            <Grid item xs={12} sx={{textAlign:"right",marginBottom:"1vh"}}>
                              <div style={{paddingLeft:"20px"}}>
                                 <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />} onClick={()=>setRedirToVendors(true)}>
                                    Go Back
                                    </Button>
                                </div>
                        </Grid>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                         <Tab label="Orders" value="1" />
                                        <Tab label="Reviews" value="2" />
                                        <Tab label="Revenue Generated" value="3" />
                                        <Tab label="Ads Clicked" value="4" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                        <Grid item xs={12} >
                                            <div style={{fontSize:"30px",textAlign:"left"}}>Order frequency</div>
                                         </Grid>
                                        <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             <Line options={options} data={ordersMap} />
                                             </div>
                                          </Grid>
                                    </Grid>
                                 </TabPanel>
                                 <TabPanel value="2">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                         <Grid item xs={12} >
                                             <div style={{fontSize:"30px",textAlign:"left"}}>Review frequency</div>
                                        </Grid>
                                         <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             <Line options={options} data={reviewsMap} />
                                             </div>
                                          </Grid>
                                     </Grid>
                                 </TabPanel>
                                 <TabPanel value="3">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                        <Grid item xs={12} >
                                            <div style={{fontSize:"30px",textAlign:"left"}}>Revenue accrued over different months</div>
                                         </Grid>
                                        <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             <Line options={options} data={spentMap} />
                                             </div>
                                          </Grid>
                                    </Grid>
                                 </TabPanel>
                                 <TabPanel value="4">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                         <Grid item xs={12} >
                                             <div style={{fontSize:"30px",textAlign:"left"}}>Review frequency</div>
                                        </Grid>
                                         <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             <Line options={options} data={adsMap} />
                                             </div>
                                          </Grid>
                                     </Grid>
                                 </TabPanel>
                             </TabContext>
                        </Grid>
                    </Paper>
                 </Grid>

                  

                  
            </Grid>
        </div>    
        </>)
}

export default AdminVendorDetail;