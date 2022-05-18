import { useState, useEffect } from 'react'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'

export const useAx12 = () => {
    const {keycloak, initialized} = useKeycloak()
    const [axiosInstance, setAxiosInstance] = useState({id: 0,name:'',city:{id:'',name:''}})

    useEffect(() => {
        axios.get('http://localhost:8484/street/getAllStreets',
            { headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then(response => {
            setAxiosInstance(response.data)
        }).catch(response => window.location.assign('http://localhost:3000/ntDB'))

        return () => {
            setAxiosInstance({id: '',name:'',city:{id:'',name:''}})
        }
    }, [ initialized, keycloak, keycloak.token])

    return axiosInstance;

}