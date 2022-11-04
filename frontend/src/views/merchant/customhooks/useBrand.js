import { useState, useEffect } from 'react'
import { get } from '../../../utils/serverCall'

export const useBrand = () => {
    const [brandData, setBrandData] = useState([])

    useEffect(() => {
        fetchAllBrand()
    }, [])

    const fetchAllBrand = () => {
        get(`/brand`).then((data) => {
            const brandDataForAutoComplete = data.allBrands.map((brand) => ({ id: brand._id, label: brand.name }))
            setBrandData(brandDataForAutoComplete)
        });
    }

    return { brandData, fetchAllBrand }
}