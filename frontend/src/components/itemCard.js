import * as React from 'react';
import '../App.js';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import g from '../images/merchant/g.jpeg'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


export default function ItemCard(props) {
  const [expanded, setExpanded] = React.useState(false);


  return (
   <Paper style={{width:180, height:240 ,borderRadius:"10px"}}>
        <Grid container sx={{ height: "100%",Padding:"15px"}}>
            <Grid item xs={12} >
                     <Typography>
                    Name
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <img src={g} style={{width:"160px", height:"160px"}}></img>
            </Grid>
            <Grid item xs={12} >
                <Typography style={{wordBreak:"break-all"}}>
                    sadfsagsafgagfd
                    sadfsagsafgagfdsadfsagsafgagfdsadfsagsafgagfd sadfsagsafgagfd
                </Typography>
            </Grid>
        </Grid>
   </Paper>
  );
}
