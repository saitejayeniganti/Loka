import React, { useEffect, useState, useRef } from "react";
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import s from '../../images/theme/s.png'

function ProductReviews(props) {
    return(<>
        <Paper style={{width:"100%",padding:"15px",paddingRight:"25px"}}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <h3>Customer Reviews</h3>
                </Grid>
                <Grid item xs={12} >
                    <div style={{justifyContent:"center",display:"flex"}}>
                    <div><Rating value={3} /></div>
                    <div style={{marginTop:"1px"}}> &nbsp;&nbsp;&nbsp;&nbsp; 3.9 / 5</div>
                   </div>
                </Grid>
                <Grid item xs={12} sx={{justifyContent:"center",color:"#787a7c", padding:"0px",marginBottom:"10px"}}>
                    40 Customer ratings
                </Grid>
               {/* --------------------- 1 star ------------------ */}
                <Grid item xs={2}>
                    1&nbsp;<StarBorderIcon style={{color:"#faaf00"}}/>
                </Grid>
                <Grid item xs={10}>
                    <Progress percent={30} size="small" />
                </Grid>
                {/* --------------------- 2 star ------------------ */}
                <Grid item xs={2}>
                    2&nbsp;<StarBorderIcon style={{color:"#faaf00"}}/>
                </Grid>
                <Grid item xs={10}>
                    <Progress percent={40} size="small" />
                </Grid>
                {/* --------------------- 3 star ------------------ */}
                <Grid item xs={2}>
                    3&nbsp;<StarBorderIcon style={{color:"#faaf00"}}/>
                </Grid>
                <Grid item xs={10}>
                    <Progress percent={70} size="small" />
                </Grid>
                {/* --------------------- 4 star ------------------ */}
                <Grid item xs={2}>
                    4&nbsp;<StarBorderIcon style={{color:"#faaf00"}}/>
                </Grid>
                <Grid item xs={10}>
                    <Progress percent={10} size="small" />
                </Grid>
                {/* --------------------- 5 star ------------------ */}
                 <Grid item xs={2}>
                    5&nbsp;<StarBorderIcon style={{color:"#faaf00"}}/>
                </Grid>
                <Grid item xs={10}>
                    <Progress percent={80} size="small" />
                </Grid>
            </Grid>  
        </Paper>

        {/* ----------------------------------------------------Reviews------------------------------------------------------ */}

        <Paper style={{width:"100%",padding:"10px",marginTop:"20px"}}>
            <Grid container spacing={0} sx={{
                marginBottom:"15px",
                padding:"10px",
                "&:hover": {
                            backgroundColor: "#dadada",
                            // opacity: [0.9, 0.8, 0.7]
                            }}}
                            
                            >
                <Grid item xs={2} >
                    <div>
                        <img src={s} height="45px" width="45px" style={{borderRadius:"50%"}}></img>
                    </div>
                    <div>
                        <Rating value={3} />
                    </div>
                </Grid>
                <Grid item xs={10} >
                     <Box
                        sx={{
                            width: "100%",
                            minHeight: 50,
                            marginTop:"10px",
                            marginLeft:"20px",
                            textAlign:"left",
                            marginTop:"15px"
                            
                            // "&:hover": {
                            // backgroundColor: "#dadada",
                            // opacity: [0.9, 0.8, 0.7]
                            // }
                            }}
                             >
                            Great item to buy. Worthy Product.
                             </Box>
                </Grid>
                </Grid>

                {/* ------------------- */}
                <Grid container spacing={0} sx={{
                    marginBottom:"15px",
                    padding:"10px",
                "&:hover": {
                            backgroundColor: "#dadada",
                            // opacity: [0.9, 0.8, 0.7]
                            }}}
                            >
                 <Grid item xs={2} >
                     <div>
                        <img src={s} height="45px" width="45px" style={{borderRadius:"50%"}}></img>
                    </div>
                    <div>
                        <Rating value={3} />
                    </div>
                </Grid>
                <Grid item xs={10} >
                     <Box
                        sx={{
                            width: "100%",
                            height: 50,
                            marginTop:"10px",
                            marginLeft:"20px",
                            textAlign:"left",
                            marginTop:"15px"
                            }}
                             >
                                Great item to buy. very useful.
                             </Box>
                </Grid>
               
            </Grid>
        </Paper>
    </>)
}

export default ProductReviews;