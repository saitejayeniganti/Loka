import { useState, useEffect } from 'react'
import { get, post } from '../../../utils/serverCall'

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

    const createBrand = async (newBrandName) => {
        const newBrandObject = { name: newBrandName }
        try {
            const createdBrandResult = await post(`/brand/create`, newBrandObject)
            return createdBrandResult
        } catch (e) {
            throw e
        }
    }

    return { brandData, fetchAllBrand, createBrand }
}