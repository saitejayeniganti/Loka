import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderItem from './OrderItem'

function OrderCard(props) {
    let key = 0

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Order ID: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{props.order._id}</span></div></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Customer Name: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{`${props.order.user.firstName} ${props.order.user.lastName}`}</span></div></Grid>
                        <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Customer Email: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{props.order.user.email}</span></div></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Customer Phone: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{props.order.user.phone}</span></div></Grid>
                        <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                        <Grid item xs={12}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Order On: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{new Date(props.order.created).toString()}</span></div></Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        {props.order.products.map((product) => {
                            const itemKey = key;
                            key++;
                            return <Grid item xs={3} key={itemKey}><OrderItem product={product} /></Grid>
                        }
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default OrderCard