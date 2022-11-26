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
import shopLanding from '../../images/merchant/shopLandingPage.jpg'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  DatePicker,
} from 'antd';
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
window.Buffer = window.Buffer || require("buffer").Buffer;

function MerchantPostAd(props) {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
    get(`/admin/merchant?id=${props.id}`)
      .then((result) => {
        console.log("result ads",result.ads)
        setImageList([...result.ads])
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

     const deleteImage = (e) => {
        console.log("in del image",e)
      console.log(e) 
      var arr=[...imageList]
      var filtered=arr.filter(el => el!=e)
      setImageList([...filtered])
  }

        const saveAds = () => {
            
            let requestdetails={
                    "id":props.id,
                    "ads":imageList
                }

            put(`/admin/savemerchantads`,requestdetails)
                .then((result) => { 
                    console.log(result)
                    alert("Saved!")
                 })
                .catch((err) => {
        
                });
        }

          const renderTable = () => {
            return(<>
                        <TableContainer component={Paper} sx={{ width: "55vw",maxHeight:"40vh",borderRadius:"10px" }}>
                            <Table sx={{ width: "55vw" }} aria-label="simple table">
                                <TableHead >
                                <TableRow>
                                    <TableCell style={{fontWeight:"600"}}>Image</TableCell>
                                    <TableCell align="right" style={{fontWeight:"600"}}>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody style={{overflowY:"scroll"}}>
                                {imageList.map((row) => (
                                    <TableRow
                                    key={row}
                                    >
                                    <TableCell component="th" scope="row">
                                        <img src={row} height="70vh" width="120vw"></img>
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteForeverRoundedIcon style={{cursor:"pointer"}} onClick={()=>deleteImage(row)}/>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                </>)
        }

    return(<>
    <div style={{backgroundColor:"whitesmoke",position:"fixed",height:"100vh",width:"100vw"}}></div>
         <div style={{ position: "relative" }}>
        <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
        {/* <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Welcome To Your Store!</h1> */}
      </div>
      <div style={{backgroundColor:"whitesmoke",position:"fixed",height:"100vh",width:"100vw"}}>
             <div>
        <Grid container spacing={2} sx={{padding:"10px",padding:"20px"}}>
            <Grid item xs={12} sx={{marginBottom:"20px",fontSize:"28px"}}>
                Post AD to your home page
            </Grid>
            <Grid item xs={2.8}></Grid>
            <Grid item xs={5} sx={{textAlign:'right'}}>
                 <FileUpload
                      callback={(e) => {
                        console.log("location", e);
                        var arr=[]
                        arr=[...imageList]
                        arr.push(e)
                        setImageList([...arr])
                        console.log("do other operation");
                      }}
                      fileName={uuidv4()}
                      folderPath="hello/"
                    />
            </Grid>
            <Grid item xs={4} sx={{textAlign:'left'}}>
                    <Button
                    variant="contained"
                    onClick={saveAds}
                    sx={{width:'30%'}}
                  >
                    Save
                  </Button>
            </Grid>


            <Grid item xs={12} sx={{marginTop:"15px",textAlign:"center !important",textAlign:"-webkit-center !important"}}>
                {imageList.length==0?"You havent posted any Ads":
                            renderTable()
                    }
            </Grid>
        </Grid>
      </div>
      </div>
     
    </>)
}

const mapStateToProps = (state) => {
    return {
        id: state.sessionReducer.user.id,
    };
};

export default connect(mapStateToProps)(MerchantPostAd);