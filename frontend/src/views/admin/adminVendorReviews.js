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
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useDemoData } from '@mui/x-data-grid-generator';
import './admin.css'
import { Button, MenuItem, Select, TextField } from "@mui/material";
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import customerReviews from "../../animations/good-reviews.json";
import { get, post } from "../../utils/serverCall.js";
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';


const columns = [
  {
    field: 'product',
    headerName: 'Product',
    width: 200,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
  },
   {
    field: 'status',
    headerName: 'Status',
    width: 200,
  },
   {
    field: 'isRecommended',
    headerName: 'Recommended',
    width: 200,
  },
   
];

export default function AdminVendorReviews() {
    

    const [rows, setRows] = React.useState([]);
    const [redirToVendordetail, setRedirToVendordetail] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const [selectedReview, setSelectedReview] = useState("");
    const location = useLocation();
    console.log("state in vendor reviews",location.state)

    const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: customerReviews,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

    const deleteReview = () => {
    
    };


   const rowSelected = (e) => {
        console.log(e)
        setBtnDisable(false)
        setSelectedReview(e)
    };

   useEffect(() => {
        get(`/admin/vendorreviews?id=${location.state.id}`)
      .then((result) => { 
        console.log("server data in vendor reviews",result)
        var arr=new Array()
        for(var u of result)
        {
          var ob={
            "id":u._id,
            "title":u.title,
            "review":u.review,
            "status":u.status,
            "rating":u.rating,
            "isRecommended":u.isRecommended,
            "product":u.product.name,
            "productDetails":u.product,
            "created":u.created
          }
          arr.push(ob)
        }
        setRows([...arr])
      })
      .catch((err) => {
        
      });
    }, []);

  if (redirToVendordetail) {
    return <Navigate to={"/adminvendordetail"} state={location.state}/>;
  }

    return(<>
    <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"30vw",marginLeft:"70vw",position:"fixed"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>
         
        
         <div style={{position:"relative",padding:"20px"}}>
           <Grid container spacing={2} sx={{}}>
                <Grid item xs={12}>
                        <Grid container sx={{}}>
                            <Grid item xs={9} sx={{textAlign:"left",color:"white"}}>
                                <Grid item xs={12}>
                                    <h2 style={{color:'white'}}>Reviews of {location.state.storeName}</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    customer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etc
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={3} sx={{textAlign:"left"}}>
                                <Lottie options={defaultOptions} height={200} width={280} />
                            </Grid> */}
                            </Grid>
                </Grid>

            {/* *************************End of header******************** */}

                <Grid item xs={8.4}>
                <div style={{ height: '75vh', width: '100%',background:"white",padding:"20px",borderRadius:"10px" }}>
                    <Grid container spacing={2} sx={{marginBottom:"15px"}}>
                         <Grid item xs={12} sx={{textAlign:"right"}}>
                               <div style={{paddingLeft:"20px"}}>
                                  <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />} onClick={()=>setRedirToVendordetail(true)}>
                                     Go Back
                                     </Button>
                                      <Button
                                 variant="contained"
                                 sx={{ width: "10%"}}
                                 onClick={deleteReview}
                                 style={{marginLeft:"10px"}}
                                 disabled={btnDisable}
                             >
                              Delete
                             </Button>
                                 </div>
                         </Grid>
                    </Grid>
                    <div style={{ height: '65vh', width: '100%',background:"white", }}>
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
                </div>
                </Grid>

                <Grid item xs={3.6} sx={{}}>
                    <div style={{ height: '75vh', width: '100%',background:"white",padding:"20px",borderRadius:"10px",marginLeft:"5px"}}>
                          <Grid container spacing={2}>
                          {selectedReview==""?
                            <>
                            <Grid item xs={12}>
                                  <Lottie options={defaultOptions} height={380} width={380} />
                            </Grid>
                            <Grid item xs={12} sx={{}}>
                                  Click a review to know the details.
                            </Grid>
                            </>:
                            <>
                            <Grid container xs={12}>
                                  <Grid item xs={12}>
                                    <img src={money} height="200" width="200" style={{borderRadius:"50%"}}></img>
                                  </Grid>
                               
                                <Grid item xs={12} sx={{paddingLeft:"2vw"}}>
                                    <Grid item xs={12} sx={{marginTop:"5vh",textAlign:"center",textTransform:"capitalize"}}>
                                        {selectedReview.productDetails.name}
                                    </Grid>
                                    
                                    <Grid item xs={12} sx={{marginTop:"5vh",textAlign:"left"}}>
                                        <Rating name="read-only" value={selectedReview.rating} readOnly />
                                    </Grid>
                                    <Grid item xs={12} sx={{marginTop:"5vh",textAlign:"left"}}>
                                        {selectedReview.review}
                                    </Grid>
                                    <Grid item xs={12} sx={{marginTop:"5vh",textAlign:"left"}}>
                                        {selectedReview.created}
                                    </Grid>
                                     <Grid item xs={12} sx={{marginTop:"5vh",textAlign:"left"}}>
                                        Change Status
                                    </Grid>
                                </Grid>
                            </Grid>
                            </>
                          }
                            
                          </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
            </>)
}