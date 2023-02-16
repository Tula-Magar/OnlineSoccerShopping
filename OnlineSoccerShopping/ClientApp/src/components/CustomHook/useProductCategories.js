import React, {useState, useEffect} from 'react'
import axios from 'axios'

function useProductCategories() {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        axios
        .get('https://localhost:7217/api/productcategory')
        .then((res) => {
            setCategories(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])
    
    return categories
}

export default useProductCategories;