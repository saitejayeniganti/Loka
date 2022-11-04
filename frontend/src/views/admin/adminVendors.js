import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from "react-lottie";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import vandorsAdmin from "../../animations/vandorsAdmin.json";
import adminUsersImage from '../../images/admin/adminUsers.jpeg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, MenuItem, Select, TextField } from "@mui/material";
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// for chart ****************************************
export const data = {
  labels,
  datasets: [
    {
      label:"Orders",
      data: [1,4,2,5,6,7,8],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

// for table ****************************************
const initialRows = [
  {
    id: 1,
    first: 'Jane',
    last: 'Carter',
  },
  {
    id: 2,
    first: 'Jack',
    last: 'Smith',
  },
  {
    id: 3,
    first: 'Gill',
    last: 'Martin',
  },
   {
    id: 4,
    first: 'Jane',
    last: 'Carter',
  },
  {
    id: 5,
    first: 'Jack',
    last: 'Smith',
  },
  {
    id: 6,
    first: 'Gill',
    last: 'Martin',
  },
  {
    id: 7,
    first: 'Gill',
    last: 'Martin',
  },
];

const columns = [
  {
    field: 'first',
    headerName: 'First',
    width: 140,
  },
  {
    field: 'last',
    headerName: 'Last',
    width: 140,
  },
];


export default function AdminVendors() {
   const [value, setValue] = React.useState('1');
   
   const [rows, setRows] = React.useState(initialRows);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: vandorsAdmin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rowSelected = (e) => {
        console.log(e)
    };

     const viewVendor = (e) => {
        console.log(e)
    };

return(<>
        <div style={{backgroundColor:"#e7e4e4",position:"fixed",height:"40vh",width:"100vw"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"35vh",width:"100vw",borderBottomRightRadius:"60%",borderBottomLeftRadius:"10%"}}></div>
        <div style={{height:"65vh",backgroundColor:"#e7e4e4",width:"100vw",marginTop:"35vh",position:"fixed"}}></div>
        
        <div style={{position:"relative"}}>
             <div style={{padding:"15px"}}>
            <Grid container spacing={0} sx={{paddingLeft:"30px"}}>
                <Grid item xs={4}>
                    <Lottie options={defaultOptions} height={200} width={500} />
                </Grid>
              <Grid item xs={8} >
                <Grid item xs={12} style={{color:"white",fontSize:"40px",fontWeight:"600px",textAlign:"center",marginBottom:"15px"}}>
                    Loka Vendors
                </Grid>
                
                <Grid item xs={12} style={{color:"white",fontSize:"16px",textAlign:'center'}}>
                    See quick links and overviews of all Loka's vendors, their details, orders, reviews etc.
                </Grid>
                </Grid>
            </Grid>
          </div>
            <Grid container spacing={2} sx={{padding:"10px"}}>
                 <Grid item xs={4} >
                    <Paper style={{height:"60vh",borderRadius:"15px",padding:"20px"}}>

                        <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Orders" value="1" />
                                        <Tab label="Revenue" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Grid container >
                                        {/* <Grid item xs={12} >
                                            <div style={{fontSize:"30px",textAlign:"left"}}>Customer onboarding frequency on Loka</div>
                                         </Grid> */}
                                         <Grid item xs={12} >
                                             <Bar options={options} data={data} />
                                             </Grid>
                                             <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"left"}}>
                                                Comparison of orders between the selected vendor with the orders of the nearest 5 restaurants within 5 mile radius.
                                             </Grid>
                                              <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"right"}}>
                                                                  <Button
                                                                variant="contained"
                                                                sx={{ width: "100%"}}
                                                                onClick={viewVendor}
                                                                >
                                                                    View Vendor
                                                                </Button>
                                            </Grid>

                                    </Grid>
                                 </TabPanel>
                                 <TabPanel value="2">
                                    <Grid container style={{height:"100%",width:"100%"}}>
                                         {/* <Grid item xs={12} >
                                             <div style={{fontSize:"30px",textAlign:"left"}}>Vendor onboarding frequency on Loka</div>
                                        </Grid> */}
                                         <Grid item xs={12} >
                                             <Bar options={options} data={data} />
                                          </Grid>
                                          <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"left"}}>
                                                Comparison of revenue generated between the selected vendor with the revenue of the nearest 5 restaurants within 5 mile radius.
                                             </Grid>
                                            <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"right"}}>
                                                                  <Button
                                                                variant="contained"
                                                                sx={{ width: "100%"}}
                                                                onClick={viewVendor}
                                                                >
                                                                    View Vendor
                                                                </Button>
                                            </Grid>

                                
                                     </Grid>
                                 </TabPanel>
        
                             </TabContext>
                    </Paper>
                </Grid>
                <Grid item xs={8} >
                    <Paper style={{height:"60vh",borderRadius:"15px",padding:"20px"}}>
                        <div style={{ height: '50vh', width: '100%',background:"white", }}>
                          <Grid item xs={12} sx={{textAlign:"right"}}>
                              <div style={{paddingLeft:"20px",marginBottom:"10px"}}>
                                 <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />}>
                                    Go Back
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
                    onRowClick={rowSelected}
                    />
                    </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </>)
}