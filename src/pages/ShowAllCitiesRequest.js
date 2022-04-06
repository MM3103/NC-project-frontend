import { useState, useEffect } from 'react'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'

export const useAx11 = () => {
    const {keycloak, initialized} = useKeycloak()
    const [axiosInstance, setAxiosInstance] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8484/city/getAllCities',
            { headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then(response => {
            setAxiosInstance(response.data)
        }).catch(response => window.location.assign('http://localhost:3000/ntDB'))

        return () => {
            setAxiosInstance('')
        }
    }, [ initialized, keycloak, keycloak.token])

    return axiosInstance;

}