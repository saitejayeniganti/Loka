import { useState, useEffect } from 'react'
import { get } from '../../../utils/serverCall'

export const useInventory = (merchantId) => {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        fetchAllProductsByMerchantId()
    }, [])

    const fetchAllProductsByMerchantId = () => {
        get(`/product/merchant/` + merchantId).then(data => {
            setInventory(data.product)
        })
    }

    return { inventory, fetchAllProductsByMerchantId }
}