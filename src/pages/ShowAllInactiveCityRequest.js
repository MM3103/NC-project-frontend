import { useState, useEffect } from 'react'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'

export const useAx23 = () => {
    const {keycloak, initialized} = useKeycloak()
    const [axiosInstance, setAxiosInstance] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8484/city/getAllInactiveCities',
            { headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then(response => {
            setAxiosInstance(response.data)
        })

        return () => {
            setAxiosInstance('')
        }
    }, [ initialized, keycloak, keycloak.token])

    return axiosInstance;

}