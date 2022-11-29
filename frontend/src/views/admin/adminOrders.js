import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from "react-lottie";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useLocation } from 'react-router-dom';
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
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import cardShopping from "../../animations/card-shopping.json";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { get, post } from "../../utils/serverCall.js";
import { Navigate } from "react-router-dom";
import Divider from '@mui/material/Divider';

const columns = [
    {
    field: 'customerName',
    headerName: 'Customer Name',
    width: 200,
  },
  // {
  //   field: 'vendorName',
  //   headerName: 'Vendor Name',
  //   width: 200,
  // },
  {
    field: 'placed',
    headerName: 'Placed on',
    width: 200,
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 200,
  },
];

export default function AdminOrders() {
  const location = useLocation();
  console.log("state in orders",location.state)
  const [redirToUserDetail, setRedirToUserDetail] = useState(false);
  const [selectedOrder,setSelectedOrder]=useState("")

  const [rows, setRows] = React.useState([]);
    const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: cardShopping,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
        get(`/admin/allorders`)
      .then((result) => {   
        console.log("all orders",result)
        var arr=new Array()
        for(var u of result)
        {
          if(u.user)
          {
          var userTemp=u.user

          var ob={
            "id":u._id,
            "customerName":userTemp.firstName+" "+userTemp.lastName,
            // "vendorName":"",
            "total":"$ "+u.total.toFixed(2),
            "placed":u.created.substr(0, 10),
            "allData":u
          }
          // console.log(u._id,"its data is",ob)
          arr.push(ob)
          }
        
        }
        setRows([...arr])
        // console.log("result arr",arr)
      })
       .catch((err) => {
        
      });
    }, []);

   const rowSelected = (e) => {
    setSelectedOrder(e)
        console.log(e)
    };

    const renderProducts = () => {
      return( <>
        <Grid container>
          <Grid container style={{marginBottom:"2vh",fontWeight:"800"}}>
          <Grid item xs={7.5} sx={{alignSelf: "center",textAlign:"center"}}>
              ITEM 
          </Grid>
          <Grid item xs={2.5} sx={{textAlign:"left",alignSelf: "center"}}>
            QUANTITY
          </Grid>
          <Grid item xs={2} sx={{alignSelf: "center"}}>
            PRICE
          </Grid>
            </Grid>
            {selectedOrder.products.map((p)=><>
            <Grid item xs={3} sx={{textAlign:"left",marginTop:"5px",marginBottom:"5px"}}>
                <img src={p.image} height="64px" width="64px"/>
            </Grid>
          <Grid item xs={5} sx={{textAlign:"left",alignSelf: "center"}}>
              {p.name}
          </Grid>
          <Grid item xs={2} sx={{textAlign:"left",alignSelf: "center"}}>
            X&nbsp;&nbsp;{p.quantity}
          </Grid>
          <Grid item xs={2} sx={{alignSelf: "center"}}>
            $&nbsp;{p.totalPrice}
          </Grid>
        </>)}
        
        </Grid>
      </>
        
        )
    };

    if (redirToUserDetail) {
    return <Navigate to={"/adminhome"}/>;
  }

    return(<>
            <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"30vw",marginLeft:"70vw",position:"fixed"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>
         <div style={{position:"relative",padding:"20px",marginLeft:"1%",marginRight:"1%"}}>
            <Grid container spacing={2} sx={{}}>
                <Grid item xs={12}>
                        <Grid container sx={{padding:"20px"}}>
                            <Grid item xs={9} sx={{textAlign:"left",color:"white"}}>
                                <Grid item xs={12}>
                                    <h2 style={{color:'white'}}>All Orders</h2>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    customer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etc
                                </Grid> */}
                            </Grid>
                            {/* <Grid item xs={3} sx={{textAlign:"left"}}>
                                <Lottie options={defaultOptions} height={200} width={280} />
                            </Grid> */}
                            </Grid>
                </Grid>

            {/* *************************End of header******************** */}

                <Grid item xs={8.5}>
                <div style={{ height: '75vh', width: '100%',background:"white",padding:"20px",borderRadius:"10px" }}>
                    <Grid container spacing={2} sx={{marginBottom:"15px"}}>
                        <Grid item xs={12} sx={{textAlign:"right"}}>
                              <div style={{paddingLeft:"20px"}}>
                                 <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />} onClick={()=>setRedirToUserDetail(true)}>
                                    Go Back
                                    </Button>
                                </div>
                        </Grid>
                      
                    </Grid>
                    <div style={{ height: '65vh', width: '100%',background:"white"}}>
                      
                    <DataGrid
                    components={{
                                Toolbar: GridToolbar,
                                }}
                    columns={columns}
                    rows={rows}
                    pageSize={8}
                    // rowsPerPageOptions={[5,10,15,20]}
                    onRowClick={(e)=>rowSelected(e.row.allData)}
                    />
                    </div>
                </div>
                </Grid>

                <Grid item xs={3.5} sx={{}}>
                    <div style={{ height: '75vh', width: '100%',background:"white",padding:"20px",borderRadius:"10px",marginLeft:"15px"}}>
                          <Grid container spacing={2}>
                            {selectedOrder==""?<>
                             <Grid item xs={12}>
                                  <Lottie options={defaultOptions} height={380} width={380} />
                            </Grid>
                                <Grid item xs={12} sx={{}}>
                                    Click an order to know the order details.
                                </Grid>
                            </>:
                            <>
                            <Grid item xs={12}>
                                  <div style={{fontSize:"20px"}}>Order Details</div>
                            </Grid>
                            <Grid item xs={12} sx={{marginTop:"5vh",maxHeight:"40vh",overflowY:"scroll"}}>
                                    <Grid item xs={12}>
                                      {renderProducts()}
                                    </Grid>
                                    <Grid item xs={12} sx={{marginTop:"5vh",marginBottom:"3vh"}}>
                                                <Divider style={{opacity:"500%"}}/>
                                                <Divider style={{opacity:"500%"}}/>
                                    </Grid>
                                          
                                    <Grid container>
                                        <Grid item xs={7.2}></Grid>
                                        <Grid item xs={2.8} style={{fontWeight:"800"}}>
                                          TOTAL
                                        </Grid>
                                        <Grid item xs={2} style={{fontWeight:"800"}}>
                                            $&nbsp;{selectedOrder.total.toFixed(2)}
                                        </Grid>
                                    </Grid>
                            </Grid>
                            
                            </>}
                           
                          </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
          </>)
}