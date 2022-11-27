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
import { get, post } from "../../utils/serverCall.js";
import { Navigate } from "react-router-dom";
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

function AdminHome() {
  const [value, setValue] = React.useState('1');
  const [reviews, setReviews] = React.useState("");
  const [orders, setOrders] = React.useState('');
  const [vendors, setVendors] = React.useState('');
  const [users, setUsers] = React.useState("");
  const [redirToUsers, setRedirToUsers] = useState(false);
  const [redirToReviews, setRedirToReviews] = useState(false);
  const [redirToOrders, setRedirToOrders] = useState(false);
  const [redirToVendors, setRedirToVendors] = useState(false);
  
  const [usersMap, setUsersMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Customers',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );
  
   const [vendorsMap, setVendorsMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Vendors',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );
  
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
                                                    
   const [reviewsMap, setReviewssMap] = React.useState(
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
                                                                                                    
                                                    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: dataAnalysis,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

    useEffect(() => {
        get("/admin/dashboard")
      .then((result) => { 
        console.log(result.users)
        setReviews(result.reviews)
        setOrders(result.orders)
        setUsers(result.users)
        setVendors(result.vendors)
        var usersArr=new Array(12).fill(0)
        var ordersArr=new Array(12).fill(0)
        var reviewsArr=new Array(12).fill(0)
        var vendorsArr=new Array(12).fill(0)
        for(var u of result.users)
        {
          var d= new Date(u.created)
          var m=d.getMonth()
          usersArr[m]+=1
        }
        setUsersMap({
                    labels,
                    datasets: [
                      {
                        label: 'Customers',
                        data: usersArr,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },

                    ]
                    })
         for(var o of result.orders)
        {
          var d= new Date(o.created)
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
         for(var r of result.reviews)
        {
          var d= new Date(r.created)
          var m=d.getMonth()
          reviewsArr[m]+=1
        }
         setReviewssMap({
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
         for(var v of result.vendors)
        {
          var d= new Date(v.created)
          var m=d.getMonth()
          vendorsArr[m]+=1
        }
        setVendorsMap({
                    labels,
                    datasets: [
                      {
                        label: 'Vendors',
                        data: vendorsArr,
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
   
   if (redirToVendors) {
    return <Navigate to={"/adminvendors"} />;
   }   

   if (redirToOrders) {
    return <Navigate to={"/adminorders"} />;
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
                    Dashboard
                </Grid>
                <Grid item xs={12} style={{color:"white",fontSize:"16px",textAlign:'left',fontWeight:"600",marginBottom:"15px"}}>
                    Welcome back to the Dashboard.
                </Grid>
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
            <Grid item xs={8} >
              <Paper style={{height:"60vh",borderRadius:"15px",padding:"20px"}}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Customers" value="1" />
                            <Tab label="Vendors" value="2" />
                            <Tab label="Orders" value="3" />
                            <Tab label="Reviews" value="4" />
                        </TabList>
                      </Box>
        <TabPanel value="1">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"30px",textAlign:"left"}}>Customer onboarding frequency on LOKA</div>
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{height:"90%",width:"90%"}}>
                          <Line options={options} data={usersMap} />
                          </div>
                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"30px",textAlign:"left"}}>Vendor onboarding frequency on LOKA</div>
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{height:"90%",width:"90%"}}>
                          <Line options={options} data={vendorsMap} />
                          </div>
                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"30px",textAlign:"left"}}>Order frequency on LOKA</div>
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{height:"90%",width:"90%"}}>
                          <Line options={options} data={ordersMap} />
                          </div>
                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="4">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"30px",textAlign:"left"}}>Review frequency on LOKA</div>
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{height:"90%",width:"90%"}}>
                          <Line options={options} data={reviewsMap} />
                          </div>
                      </Grid>
                  </Grid>
        </TabPanel>
        
      </TabContext>

               
              </Paper>
            </Grid>
            {/* -------------------------------------------left 1--------------------------------------------- */}
            <Grid item xs={2}>
              <Grid item xs={12} style={{marginBottom:"2vh",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",borderRadius:"15px"}} onClick={()=>setRedirToUsers(true)}>
                    <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                          <PeopleAltRoundedIcon sx={{height:"4vh",width:"4vh"}}/>
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Users</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "7vh",textAlign: "center",marginTop:"2vh"}}>{users.length}</div>
                      </Grid>
                      
                      <Grid item xs={12} style={{marginTop:"4vh"}} >

                      </Grid>

                       <Grid item xs={2} >
                            <img src={testingDone} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={waiting} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Users pending for approval"/>
                      </Grid>

                      <Grid item xs={2} >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>4</div>
                      </Grid>
                  </Grid>
                  </Paper>
              </Grid>
            {/* -----------------------------------------------left2------------------------------------------------- */}
             
              
              <Grid item xs={12} style={{marginBottom:"20px",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",borderRadius:"15px"}} onClick={()=>setRedirToOrders(true)}>
                   <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                           <img src={order} style={{height:"5vh",width:"5vh",textAlign:"left"}} />
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Orders</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "7vh",textAlign: "center",marginTop:"2vh"}}>{orders.length}</div>
                      </Grid>
                      
                      <Grid item xs={12} style={{marginTop:"1.5vh"}} >

                      </Grid>

                       {/* <Grid item xs={2} >
                            <img src={testingDone} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={waiting} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Users pending for approval"/>
                      </Grid> */}

                      
                  </Grid>
                  <Grid item xs={12} style={{opacity:"30%",bottom:"0px"}}>
                        
                      </Grid>
                  </Paper>
              </Grid>
            </Grid>
            {/* -------------------------------------------right 1--------------------------------------------- */}
            <Grid item xs={2}>
        

               <Grid item xs={12} style={{marginBottom:"20px",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",borderRadius:"15px"}}>
                       <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                          <img src={reviewsimg} style={{height:"4vh",width:"4vh",textAlign:"left"}} />
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Reviews</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "7vh",textAlign: "center",marginTop:"2vh"}}>{reviews.length}</div>
                      </Grid>
                      
                      <Grid item xs={12} style={{marginTop:"4vh"}} >

                      </Grid>

                       {/* <Grid item xs={2} >
                            <img src={testingDone} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={waiting} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Users pending for approval"/>
                      </Grid>

                      <Grid item xs={2} >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>4</div>
                      </Grid> */}
                  </Grid>
                  </Paper>
              </Grid>
              
              <Grid item xs={12} style={{marginBottom:"2vh",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",borderRadius:"15px",}} onClick={()=>setRedirToVendors(true)}> 
                  <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                          <StorefrontRoundedIcon sx={{height:"4vh",width:"4vh"}}/>
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Vendors</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "60px",textAlign: "center",marginTop:"2vh"}}>{vendors.length}</div>
                      </Grid>
                      
                        <Grid item xs={12} style={{marginTop:"4vh"}}>

                      </Grid>

                       <Grid item xs={2} >
                            <img src={approved} style={{height:"4.5vh",width:"4.5vh",textAlign:"left"}} title="Approved vendors"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={pending} style={{height:"3.5vh",width:"3.5vh",textAlign:"left",marginTop:"2px"}} title="Vendors pending for approval"/>
                      </Grid>
                    
                      <Grid item xs={2} >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>4</div>
                      </Grid>
                  </Grid></Paper>
              </Grid>
            </Grid>
            
           
          </Grid>
        </div>
      </>
    );
  }

export default AdminHome;
