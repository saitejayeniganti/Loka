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
import { Button, MenuItem, Select, TextField } from "@mui/material";
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { Navigate } from "react-router-dom";
import { get, post } from "../../utils/serverCall.js";
import locationpng from "../../images/admin/location.png"
import emailpng from "../../images/admin/email.png"
import phonepng from "../../images/admin/phone.png"
import time from "../../images/admin/calendar.png"
import namepng from "../../images/admin/name-tag.png"
import { Bar } from 'react-chartjs-2';

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

export const data = {
  labels,
  datasets: [
    {
      label: 'Customers',
      data: [0,1,5,0,0,0,0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};

function AdminUserDetail() {
  const location = useLocation();
  const [value, setValue] = React.useState('1');
  const [redirToUsers, setRedirToUsers] = useState(false);
  const [redirToOrders, setRedirToOrders] = useState(false);
  const [redirToReviews, setRedirToReviews] = useState(false);
  const [redirToAds, setRedirToAds] = useState(false);
  const [userDetails, setUserDetails] = useState({
                                                    firstName:"",
                                                    lastName:"",
                                                    location:{address:""},
                                                    phone:"",
                                                    time:""
                                                    });
  const [reviews, setReviews] = useState([]);
  const [orders, setorders] = useState([]);
  const [created, setCreated] = useState("");
  const [moneyVal, setMoneyVal] = useState(0);
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
                                                          label: '$ spent',
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        get(`/admin/user?id=${location.state}`)
      .then((result) => {   
        console.log(result)
        setUserDetails(result.user[0])
        setReviews(result.reviews)
        setorders(result.orders)
        var d=result.user[0].created.substr(0, 10)
        setCreated(d)
        // $ Spent
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
         for(var u of result.reviews)
        {
          var d= new Date(u.created)
          var m=d.getMonth()
          reviewsArr[m]+=1
        }
         setReviewsMap({
                    labels,
                    datasets: [
                      {
                        label: 'Reviews',
                        data: reviewsArr,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },

                    ]
                    })
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

   if (redirToUsers) {
    return <Navigate to={"/adminusers"} />;
  }

    if (redirToOrders) {
    return <Navigate to={"/adminuserorders"} state={{"id":location.state,"name":userDetails.firstName+" "+userDetails.lastName}}/>;
  }

    if (redirToReviews) {
    return <Navigate to={"/adminuserreviews"} state={{"id":location.state,"name":userDetails.firstName+" "+userDetails.lastName}}/>;
  }


  return (<>
        
        <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"30vw",marginLeft:"70vw",position:"fixed"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>

        <div style={{position:"relative"}}>
            <Grid container spacing={2} style={{padding:"20px"}}>
                 <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",cursor:"pointer"}} onClick={()=>setRedirToOrders(true)}>
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

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",cursor:"pointer"}} onClick={()=>setRedirToReviews(true)}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                <img src={review} style={{height:"4vh",width:"4vh",textAlign:"left"}} />
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total reviews</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>{reviews.length}</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>  

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",cursor:"pointer"}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                 <img src={money} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total money spent</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>$ {moneyVal}</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>  

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",cursor:"pointer"}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                 <img src={ads} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10}>
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total Ads clicked</div>
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
                                <Grid item xs={5}>
                                    <img src={money} height="100" width="100" style={{borderRadius:"50%"}}></img>
                                </Grid>
                                <Grid item xs={7}>
                                  <div style={{marginTop:"3vh",textAlign:"left"}}>
                                    <Grid item xs={12}>
                                      <div style={{fontSize:"22px",fontWeight:"500"}}>
                                        {userDetails.firstName}{" "}{userDetails.lastName}
                                      </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{color:"#464847",fontSize:"16px"}}>
                                        {userDetails.email}
                                      </div>
                                    </Grid>
                                    </div>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"8vh"}}>
                                    <Grid item xs={3}>
                                      <img src={namepng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {userDetails.firstName}
                                    </Grid>
                                </Grid>
                                  <Grid container xs={12} sx={{marginTop:"6vh"}}>
                                    <Grid item xs={3}>
                                      <img src={namepng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {userDetails.lastName}
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"6vh"}}>
                                    <Grid item xs={3}>
                                      <img src={locationpng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left"}}>
                                          {userDetails.location.address}
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"6vh"}}>
                                    <Grid item xs={3}>
                                      <img src={phonepng} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {userDetails.phone}
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"6vh"}}>
                                    <Grid item xs={3}>
                                      <img src={time} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8} sx={{textAlign:"left",marginTop:"1vh"}}>
                                          {created}
                                    </Grid>
                                </Grid>
                          </Grid>
                    </Paper>
                    </Grid>
                 <Grid item xs={9}>
                    <Paper elevation={3} style={{height:"70vh"}}>
                        <Grid container style={{padding:"10px"}}>
                            <Grid item xs={12} sx={{textAlign:"right"}}>
                               <div style={{paddingLeft:"20px"}}>
                                  <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />} onClick={()=>setRedirToUsers(true)}>
                                     Go Back
                                     </Button>
                                 </div>
                         </Grid>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                         <Tab label="Orders" value="1" />
                                        <Tab label="Reviews" value="2" />
                                        <Tab label="$ spend" value="3" />
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
                                             {/* <Line options={options} data={adsMap} /> */}
                                             <Bar options={options} data={ordersMap} />
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
                                             {/* <Line options={options} data={adsMap} /> */}
                                             <Bar options={options} data={reviewsMap} />
                                             </div>
                                          </Grid>
                                     </Grid>
                                 </TabPanel>
                                   <TabPanel value="3">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                         <Grid item xs={12} >
                                             <div style={{fontSize:"30px",textAlign:"left"}}>$ Spent frequency</div>
                                        </Grid>
                                         <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             {/* <Line options={options} data={adsMap} /> */}
                                             <Bar options={options} data={spentMap} />
                                             </div>
                                          </Grid>
                                     </Grid>
                                 </TabPanel>
                                    <TabPanel value="4">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                         <Grid item xs={12} >
                                             <div style={{fontSize:"30px",textAlign:"left"}}>Ad click frequency</div>
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

export default AdminUserDetail;