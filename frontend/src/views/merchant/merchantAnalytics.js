import React, { useEffect, useState, useRef } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FileUpload from "../../components/FileUpload.js";
import { v4 as uuidv4 } from "uuid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { get, post,put } from "../../utils/serverCall.js";
import { Button } from "@mui/material";
import ma from '../../images/admin/ma.jpg'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import dataAnalysis from "../../animations/data-analysis.json";
import Lottie from "react-lottie";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./merchantAnalytics.css"
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
import {
  DatePicker,
} from 'antd';
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
window.Buffer = window.Buffer || require("buffer").Buffer;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"];
const labels1 = ['Brands','Categories'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Products',
      data: [0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};


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

function MerchantAnalytics(props) {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');
    const [orders, setOrders] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [revenue, setRevenue] = React.useState([]);
    const [brands, setBrands] = React.useState(0);
    const [categories, setCategories] = React.useState(0);

     const [productsMap, setProductsMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Products',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );
    
     const [brandsMap, setBrandsMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Brands',
                                                          data: [0],
                                                          borderColor: 'rgb(255, 99, 132)',
                                                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        },

                                                      ]
                                                    }
                                                    );         
                                                    
      const [categoriesMap, setCategoriesMap] = React.useState(
                                                    {
                                                      labels,
                                                      datasets: [
                                                        {
                                                          label: 'Categories',
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

     const [revenueMap, setRevenueMap] = React.useState(
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

    const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: dataAnalysis,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
    get(`/admin/merchantanalytics?id=${props.id}`)
        .then((result) => {
            console.log(result)
            setOrders(result.orders)
            setReviews(result.reviews)
            setProducts(result.products)
            var tot=0
            for(var o of result.orders)
            {
                tot+=o.total
            }
            setRevenue(tot)

        var productsArr=new Array(12).fill(0)
        var ordersArr=new Array(12).fill(0)
        var reviewsArr=new Array(12).fill(0)
        var revenueArr=new Array(12).fill(0)
        var brands=[]
        var categories=[]
        var brandSubcat={}
        var categorySubcat={}

        for(var p of result.products)
        {
          // console.log("counting ")
          var d= new Date(p.created)
          var m=d.getMonth()
          productsArr[m]+=1
          if(!brands.includes(p.brand.name))
            brands.push(p.brand.name)
        if(!categories.includes(p.category.name))
            categories.push(p.category.name)

        if(!brandSubcat[p.brand.name])
            brandSubcat[p.brand.name]=0
        brandSubcat[p.brand.name]+=1

        if(!categorySubcat[p.category.name])
            categorySubcat[p.category.name]=0
        categorySubcat[p.category.name]+=1
        }
        // console.log("brand Sub cat",brandSubcat)
        // console.log("category Sub cat",categorySubcat)
        setBrands(brands.length)
        setCategories(categories.length)

        // setProductsMap({
        //             labels1,
        //             datasets: [
        //               {
        //                 label: 'Products',
        //                 data: productsArr,
        //                 borderColor: 'rgb(255, 99, 132)',
        //                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //               },
        //             ]
        //             })
        var labels=Object.keys(brandSubcat)
        setBrandsMap({
                    labels,
                    datasets: [
                      {
                        label: 'Brands',
                        data: Object.values(brandSubcat),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                    ]
                    })
         labels=Object.keys(categorySubcat)
                setCategoriesMap({
                    labels,
                    datasets: [
                      {
                        label: 'Categories',
                        data: Object.values(categorySubcat),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                    ]
                    })
        // console.log("brand keys arr",Object.keys(brandSubcat))
        // console.log("brand values arr",Object.values(brandSubcat))
        labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"];
        for(var o of result.orders)
        {
          var d= new Date(o.created)
          var m=d.getMonth()
          ordersArr[m]+=1
          revenueArr[m]+=o.total
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

         setRevenueMap({
                    labels,
                    datasets: [
                      {
                        label: 'Revenue',
                        data: revenueArr,
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

        })
        .catch((err) => {
                console.log(err);
            });
            }, []);

    return(<>
     <div style={{ position: "relative" }}>
                <img src={ma} style={{ width: "100%", height: "300px" }}></img>
                <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>&nbsp;Analytics&nbsp;</h1>
            </div>

        {/* <div style={{padding:"15px"}}>
            <Grid container spacing={0} sx={{paddingLeft:"30px"}}>
              <Grid item xs={8} >
                <Grid item xs={12} style={{fontSize:"40px",fontWeight:"600px",textAlign:"left",marginBottom:"15px"}}>
                    Analytics
                </Grid>
                <Grid item xs={12} style={{fontSize:"16px",textAlign:'left',fontWeight:"600",marginBottom:"15px"}}>
                    Welcome to your dashboard.
                </Grid>
               
                </Grid>
                <Grid item xs={4}>
                    <Lottie options={defaultOptions} height={200} width={400} />
                </Grid>
            </Grid>
          </div> */}

    <Grid container spacing={1}  sx={{ padding: '10px',paddingTop: '0px !important' }}>


        <Grid item xs={3} className="flip-card">
        <Grid item xs={12} className="flip-card-inner">
          <Paper elevation={3} className="flip-card-front" style={{height:"20vh",backgroundColor:"white"}}>
            <Grid item xs={12} sx={{  paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>PRODUCTS</h4></Grid>
            <Grid item xs={12} sx={{ fontSize:"6vh"}}>{products.length}</Grid>
          </Paper>
          <Paper elevation={3} className="flip-card-back" style={{height:"20vh",backgroundColor:"rgb(13 92 177)"}}>
            <Grid container spacing={1} sx={{color:"white"}}>
            <Grid item xs={6} sx={{  marginTop: '10px' }}><h4 style={{ fontWeight: 'bold',color:"white" }}>Brands</h4></Grid>
            <Grid item xs={6} sx={{  marginTop: '10px' }}><h4 style={{ fontWeight: 'bold',color:"white" }}>Categories</h4></Grid>
            <Grid item xs={6} sx={{ fontSize:"4vh"}}>{brands}</Grid>
            <Grid item xs={6} sx={{ fontSize:"4vh"}}>{categories}</Grid>
            </Grid>
          </Paper>
        </Grid>
        </Grid>

        <Grid item xs={3} className="">
        <Grid item xs={12} className="flip-card-inner">
          <Paper elevation={3} className="flip-card-front" style={{height:"20vh",backgroundColor:"white"}}>
            <Grid item xs={12} sx={{  paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>ORDERS</h4></Grid>
            <Grid item xs={12} sx={{ fontSize:"6vh"}}>{orders.length}</Grid>
          </Paper>
          <Paper elevation={3} className="flip-card-back" style={{height:"20vh"}}>
            sai teja
          </Paper>
        </Grid>
        </Grid>

        <Grid item xs={3} className="">
        <Grid item xs={12} className="flip-card-inner">
          <Paper elevation={3} className="flip-card-front" style={{height:"20vh",backgroundColor:"white"}}>
            <Grid item xs={12} sx={{  paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>REVENUE</h4></Grid>
            <Grid item xs={12} sx={{ fontSize:"6vh"}}>${revenue}</Grid>
          </Paper>
          <Paper elevation={3} className="flip-card-back" style={{height:"20vh"}}>
            sai teja
          </Paper>
        </Grid>
        </Grid>

        {/* <Grid item xs={3} className="flip-card">
        <Grid item xs={12} className="flip-card-inner">
          <Paper elevation={3} className="flip-card-front" style={{height:"20vh"}}>
            <Grid item xs={12} sx={{  paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>REVIEWS</h4></Grid>
            <Grid item xs={12} sx={{ fontSize:"6vh"}}>{reviews.length}</Grid>
          </Paper>
          <Paper elevation={3} className="flip-card-back" style={{height:"20vh"}}>
            sai teja
          </Paper>
        </Grid>
        </Grid> */}
    
        <Grid item xs={3} ><Paper elevation={3} style={{height:"20vh"}}>
          <Grid item xs={12} sx={{  paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>REVIEWS</h4></Grid>
          <Grid item xs={12} sx={{ fontSize:"6vh"}}>{reviews.length}</Grid>
        </Paper>
        </Grid>

        <Grid item xs={12} >
              <Paper style={{height:"67vh",borderRadius:"15px",padding:"20px"}}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Brands" value="1" />
                            <Tab label="Categories" value="2" />
                            <Tab label="Orders" value="3" />
                            <Tab label="Revenue" value="4" />
                            <Tab label="Reviews" value="5" />
                        </TabList>
                      </Box>
        <TabPanel value="1">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"20px",textAlign:"left"}}>Brands distribution</div>
                      </Grid>
                      <Grid item xs={12} >
                          {/* <Line height="100%" weight="70%" options={options} data={brandsMap} /> */}
                          <Bar height="100%" weight="70%" options={options} data={brandsMap} />

                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"20px",textAlign:"left"}}>Category distribution</div>
                      </Grid>
                      <Grid item xs={12} >
                        <Bar height="100%" weight="70%" options={options} data={categoriesMap} />

                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"20px",textAlign:"left"}}>Orders distribution</div>
                      </Grid>
                      <Grid item xs={12} >
                        
                          <Line height="100%" weight="70%" options={options} data={ordersMap} />
                        
                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="4">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"20px",textAlign:"left"}}>Revnue accrual</div>
                      </Grid>
                      <Grid item xs={12} >
                        
                          <Line height="100%" weight="70%" options={options} data={revenueMap} />
                        
                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="5">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"20px",textAlign:"left"}}>Review frequency</div>
                      </Grid>
                      <Grid item xs={12} >
                        
                          <Line height="100%" weight="70%" options={options} data={reviewsMap} />
                        
                      </Grid>
                  </Grid>
        </TabPanel>
        
      </TabContext>

               
              </Paper>
            </Grid>
      </Grid>
      
    </>)
}

const mapStateToProps = (state) => {
    return {
        id: state.sessionReducer.user.id,
    };
};

export default connect(mapStateToProps)(MerchantAnalytics);