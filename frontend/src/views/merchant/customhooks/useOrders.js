import { useState, useEffect } from 'react'
import { get } from '../../../utils/serverCall'

export const useOrders = (merchantId) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchAllOrdersByMerchantId()
    }, [])

    const fetchAllOrdersByMerchantId = () => {
        get(`/order/merchant/myOrder/` + merchantId).then(data => {
            setOrders(data.orders)
        })
    }

    return { orders, fetchAllOrdersByMerchantId }
}