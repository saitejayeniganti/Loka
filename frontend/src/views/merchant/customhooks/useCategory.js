import { useState, useEffect } from 'react'
import { get } from '../../../utils/serverCall'

export const useCategory = () => {
    const [categoryData, setCategoryData] = useState([])

    useEffect(() => {
        fetchAllCategory()
    }, [])

    const fetchAllCategory = () => {
        get(`/category`).then((data) => {
            const categoryDataForAutoComplete = data.allCategories.map((category) => ({ id: category._id, label: category.name }))
            setCategoryData(categoryDataForAutoComplete)
        });
    }

    return { categoryData }
}