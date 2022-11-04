import React, { useEffect, useState } from "react";
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
import { Button, MenuItem, Select, TextField } from "@mui/material";
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';

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
   const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<>
        
        <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"30vw",marginLeft:"70vw",position:"fixed"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>

        <div style={{position:"relative"}}>
            <Grid container spacing={2} style={{padding:"20px"}}>
                 <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",backgroundColor:"rgb(215 229 242)"}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                <img src={order} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total orders</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>56</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>   

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",backgroundColor:"rgb(215 229 242)"}}>
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
                    <Paper elevation={3} style={{padding:"10px",backgroundColor:"rgb(215 229 242)"}}>
                         <Grid container style={{padding:"10px"}}>
                            <Grid item xs={2} >
                                 <img src={money} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                            </Grid>
                             <Grid item xs={10} >
                                <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Total money spent</div>
                            </Grid>
                             <Grid item xs={12} >
                                <div style={{fontSize: "4vh",textAlign: "center",marginTop:"2vh"}}>$ 56</div>
                            </Grid>
                      </Grid>
                    </Paper>
                 </Grid>  

                  <Grid item xs={3}>
                    <Paper elevation={3} style={{padding:"10px",backgroundColor:"rgb(215 229 242)"}}>
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
                    <Paper elevation={3} style={{height:"70vh",backgroundColor:"#e7e4e4",padding:"10px"}}>
                          <Grid container spacing={3} >
                                <Grid item xs={5}>
                                    <img src={money} height="100" width="100" style={{borderRadius:"50%"}}></img>
                                </Grid>
                                <Grid item xs={7}>
                                  <div style={{marginTop:"3vh",textAlign:"left"}}>
                                    <Grid item xs={12}>
                                      <div style={{fontSize:"22px",fontWeight:"500"}}>
                                        sai teja
                                      </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{color:"#464847",fontSize:"16px"}}>
                                        saiteja@gmail.com
                                      </div>
                                    </Grid>
                                    </div>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={location} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8}>
                                          san josesan josesan josesan josesan josesan josesan jose
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} sx={{marginTop:"4vh"}}>
                                    <Grid item xs={3}>
                                      <img src={location} height="40px" weight='40px'/>
                                    </Grid>
                                    <Grid item xs={8}>
                                          san josesan josesan josesan josesan josesan josesan jose
                                    </Grid>
                                </Grid>
                          </Grid>
                    </Paper>
                    </Grid>
                 <Grid item xs={9}>
                    <Paper elevation={3} style={{height:"70vh",backgroundColor:"#e7e4e4"}}>
                        <Grid container style={{padding:"10px"}}>
                            <Grid item xs={12} sx={{textAlign:"right"}}>
                               <div style={{paddingLeft:"20px"}}>
                                  <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />}>
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
                                            <div style={{fontSize:"30px",textAlign:"left"}}>Customer onboarding frequency on Loka</div>
                                         </Grid>
                                        <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             <Line options={options} data={data} />
                                             </div>
                                          </Grid>
                                    </Grid>
                                 </TabPanel>
                                 <TabPanel value="2">
                                    <Grid container style={{height:"90%",width:"90%"}}>
                                         <Grid item xs={12} >
                                             <div style={{fontSize:"30px",textAlign:"left"}}>Vendor onboarding frequency on Loka</div>
                                        </Grid>
                                         <Grid item xs={12} >
                                             <div style={{height:"90%",width:"90%"}}>
                                             <Line options={options} data={data} />
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