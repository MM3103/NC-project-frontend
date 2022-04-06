import { useState, useEffect } from 'react'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'

export const useAx231 = () => {
    const {keycloak, initialized} = useKeycloak()
    const [axiosInstance, setAxiosInstance] = useState({id: 0,name:'',city:{id:'',name:''},streetStatus:''})

    useEffect(() => {
        axios.get('http://localhost:8484/street/getAllInactiveStreets',
            { headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then(response => {
            setAxiosInstance(response.data)
        })

        return () => {
            setAxiosInstance({id: '',name:'',city:{id:'',name:''},streetStatus:''})
        }
    }, [ initialized, keycloak, keycloak.token])

    return axiosInstance;

}