import axios from "axios";
import React, { useState, useEffect } from 'react';

const CustomReactQuery = (urlPath, array) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await axios.get(urlPath)
                setData(response.data)
                setLoading(false)
            } catch (err) {
                throw err
            }
        })()
    }, array ? array : [])
    return { data, error, loading }
}
export default CustomReactQuery;