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
import { get, post } from "../../utils/serverCall.js";
import { Navigate } from "react-router-dom";
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

const labels = ['Selected Vendor', '1', '2', '3', '4'];


const columns = [
  {
    field: 'storeName',
    headerName: 'Name',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 250,
  },
    {
    field: 'status',
    headerName: 'Status',
    width: 250,
  },
];


export default function AdminVendors() {
   const [value, setValue] = React.useState('1');
   const [rows, setRows] = React.useState([]);
   const [redirToHome, setRedirToHome] = useState(false);
   const [redirToDetail, setRedirToDetail] = useState(false);
   const [selectedVendor,setSelectedVendor]=useState(null)
   const [orderMap, setOrderMap] = React.useState("");
   const [revenueMap, setRevenueMap] = React.useState("");

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

  useEffect(() => {
        get("/admin/vendors")
      .then((result) => { 
        console.log(result)
        var arr=new Array()
        for(var u of result)
        {
          var ob={
            "id":u._id,
            "storeName":u.storeName,
            "email":u.email,
            "status":u.status,
            "address":u.location.address,
          }
          arr.push(ob)
        }
        setRows([...arr])
       })
      .catch((err) => {
        
      });
    }, []);

  const rowSelected = (e) => {
        setSelectedVendor(e)
        console.log("selected row",e)
        get(`/admin/vendororder?id=${e}`)
      .then((result) => { 
          console.log("vendor orders",result)
          var orderMapDetails=[]
          var mapOrder=[]
           for(var o of result.orders)
          {
            if(e.id!=o._id)
            {
              orderMapDetails.push(o.count)
              mapOrder.push(o._id)
            }
            if(e.id==o._id)
            {
            orderMapDetails.unshift(o.count)
            mapOrder.unshift(e.id)
            }
          }
          console.log("maporder",mapOrder)
          var spentMapDetails=new Array(mapOrder.length).fill(0)
          setOrderMap({
                        labels,
                        datasets: [
                          {
                            label: 'Orders',
                            data: orderMapDetails.splice(0,orderMapDetails.length>4?4:orderMapDetails.length),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: ["#000000",'rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)']
                          },

                        ],
                        })  
           for(var i=0;i<mapOrder.length;i++)
          {
            for(var j=0;j<result.allOrders.length;j++)
            {
              if(mapOrder[i]==result.allOrders[j].user)
                {spentMapDetails[i]+=result.allOrders[j].total}
            }
          }
          console.log(spentMapDetails)
          setRevenueMap({
                        labels,
                        datasets: [
                          {
                            label: 'Revenue',
                            data: spentMapDetails,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: ["#000000",'rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)']
                          },

                        ],
                        })
      })
      .catch((err) => {
        
      });
    };


  if (redirToHome) {
    return <Navigate to={"/adminhome"} />;
  }

  if (redirToDetail) {
    return <Navigate to={"/adminvendordetail"}  state={selectedVendor}/>;
   }   

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
                                        {orderMap!=""?<>
                                         <Grid item xs={12} >
                                             <Bar options={options} data={orderMap} />
                                          </Grid>
                                             <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"left"}}>
                                                Comparison of orders between the selected vendor with the orders of the nearest 5 restaurants within 5 mile radius.
                                             </Grid>
                                              <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"right"}}>
                                                                  <Button
                                                                variant="contained"
                                                                sx={{ width: "100%"}}
                                                                onClick={()=>setRedirToDetail(true)}
                                                                >
                                                                    View Vendor
                                                                </Button>
                                            </Grid>
                                        </>:
                                        <>
                                          <Grid item xs={12} >
                                             <div style={{height:"100%",width:"100%"}}>
                                                <div style={{marginTop:"5vh"}}><Lottie options={defaultOptions} height={200} width={200} /></div>
                                             </div>
                                          </Grid>
                                          <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"center"}}>
                                            <div style={{fontSize:"16px",fontweight:"400"}}>select a vendor to see the comparison</div>
                                          </Grid>
                                        </>
                                        }
                                    </Grid>
                                    
                                 </TabPanel>
                                 <TabPanel value="2">
                                    <Grid container style={{height:"100%",width:"100%"}}>
                                        {revenueMap!=""?<>
                                             <Grid item xs={12} >
                                             <Bar options={options} data={revenueMap} />
                                          </Grid>
                                          <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"left"}}>
                                                Comparison of revenue generated between the selected vendor with the revenue of the top 5 merchants on LOKA.
                                             </Grid>
                                            <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"right"}}>
                                                                  <Button
                                                                variant="contained"
                                                                sx={{ width: "100%"}}
                                                                onClick={()=>setRedirToDetail(true)}
                                                                >
                                                                    View Vendor
                                                                </Button>
                                            </Grid>
                                        </>:<>
                                             <Grid item xs={12} >
                                             <div style={{height:"100%",width:"100%"}}>
                                                <div style={{marginTop:"5vh"}}><Lottie options={defaultOptions} height={200} width={200} /></div>
                                             </div>
                                          </Grid>
                                          <Grid item xs={12} sx={{marginTop:'5vh',textAlign:"center"}}>
                                            <div style={{fontSize:"16px",fontweight:"400"}}>select a vendor to see the comparison</div>
                                          </Grid>
                                          </>}
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
                                 <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />} onClick={()=>setRedirToHome(true)}>
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
                    onRowClick={(e)=>rowSelected(e.row)}
                    />
                    </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </>)
}