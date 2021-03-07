import {useCallback, useState} from 'react'


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
           setLoading(true) 
           try {
            if (body) {
                 body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }  
            console.log(body) 
               const res = await fetch(url, {mode: 'no-cors', method, body: body, headers})
               console.log(res)
               const data = await res.json() 
               setLoading(false)
               return data 
           } catch (e) {     
               setLoading(false)
               setError(e.message)
               console.log(e)
           }
    }, [])

    const clearError = () => setError(null)
    return {loading, request, error, clearError}
}