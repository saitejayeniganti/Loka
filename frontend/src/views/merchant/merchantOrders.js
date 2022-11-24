import merchantOrders from "../../images/merchant/merchantOrders.jpg"
import { Grid } from '@mui/material'
import OrderCard from '../../components/merchant/OrderCard'
import { useOrders } from './customhooks/index'
import { connect } from "react-redux";

function MerchantOrders(props) {
    const { orders, fetchAllOrdersByMerchantId } = useOrders(props.id)
    console.log(orders)

    return (
        <>
            <Grid container spacing={1} sx={{ padding: '10px' }}>
                <Grid item xs={3}>
                    <div style={{ position: 'fixed', top: '80px', left: '20px', zIndex: 1 }}>
                        <img style={{ height: '170px' }} src={merchantOrders} />
                        <h2>Your Orders</h2>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={1} sx={{ padding: '10px' }}>
                        {orders.map(order => <Grid item xs={12} key={order._id}><OrderCard order={order} /></Grid>)}
                    </Grid>
                </Grid>
            </Grid>
            <a href="https://www.freepik.com/free-vector/manager-prioritizing-tasks-list_7732645.htm#query=orders&position=1&from_view=search&track=sph">Image by pch.vector</a> on Freepik
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.sessionReducer.user.id,
    };
};

export default connect(mapStateToProps)(MerchantOrders);