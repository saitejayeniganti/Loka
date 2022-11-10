import { useState, useEffect } from 'react'
import { get } from '../../../utils/serverCall'

export const useInventory = () => {
    const [inventory, setInventory] = useState([])

    const fetchAllProductsByMerchantId = (merchantId) => {
        get(`/product/merchant/` + merchantId).then(data => {
            console.log(data)
            setInventory(data.product)
        })
    }

    return { inventory, fetchAllProductsByMerchantId }
}