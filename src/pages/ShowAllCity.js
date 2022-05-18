import React, {useState} from "react";
import { useAx11} from "./ShowAllCitiesRequest";
import {Space, Table} from "antd";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import './Nav.css';
import './Loading.css';
import "antd/dist/antd.css";
import {useAx} from "./ShowAllActiveCityRequest";
import {useAx23} from "./ShowAllInactiveCityRequest";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ShowAllCity = () => {
    const data1 = [{}];
    const {keycloak, initialized} = useKeycloak()
    const [value, setValue] = useState("");
    const texts = ['All cities','All active cities','All inactive cities'];
    const options = texts.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    let options2= [];
    const typeStatus = ['ACTIVE','INACTIVE'];
    options2 = typeStatus.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


    const axiosInstance = useAx11();
    const axiosInstance1 =  useAx();
    const axiosInstance2 =  useAx23();
    const tData = []

    console.log(axiosInstance.length)
    console.log(axiosInstance)
    console.log(typeof (axiosInstance))

    if (axiosInstance.length !== undefined && (value === 'All cities'|| value === '' )){
        for (let i = 0; i < axiosInstance.length ; i++) {
            const tData1 = {number:0,id:0,name:'',city_status:''}
            tData1.number = i+1
            tData1.id = axiosInstance[i].id
            tData1.name = axiosInstance[i].name
            tData1.city_status = axiosInstance[i].cityStatus
            tData[i] = tData1
        }
    }
    if (axiosInstance.length !== undefined && value === 'All active cities'){
        for (let i = 0; i < axiosInstance1.length ; i++) {
            const tData1 = {number:0,id:0,name:'',city_status:''}
            tData1.number = i+1
            tData1.id = axiosInstance1[i].id
            tData1.name = axiosInstance1[i].name
            tData1.city_status = axiosInstance1[i].cityStatus
            tData[i] = tData1
        }
    }
    if (axiosInstance.length !== undefined && value === 'All inactive cities'){
        for (let i = 0; i < axiosInstance2.length ; i++) {
            const tData1 = {number:0,id:0,name:'',city_status:''}
            tData1.number = i+1
            tData1.id = axiosInstance2[i].id
            tData1.name = axiosInstance2[i].name
            tData1.city_status = axiosInstance2[i].cityStatus
            tData[i] = tData1
        }
    }

    function deleteCity(record) {
        const response = axios.delete('http://localhost:8484/city/delete/' + record.id,
            {
                headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/showAllCities') ).catch(response =>window.location.assign('http://localhost:3000/ntDB'))}


/*    function patchCity(record) {
        if(record.city_status === 'ACTIVE'){
            const response =  axios.patch('http://localhost:8484/city/updateStatus/'+ record.id ,'INACTIVE',
                { headers: {
                        'Content-Type': 'application/json',
                        Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                    }
                }).then( response =>  window.location.assign('http://localhost:3000/showAllCities') )
        }
        else if (record.city_status === 'INACTIVE'){
            const response =  axios.patch('http://localhost:8484/city/updateStatus/'+ record.id ,'ACTIVE',
                { headers: {
                        'Content-Type': 'application/json',
                        Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                    }
                }).then( response =>  window.location.assign('http://localhost:3000/showAllCities') )
        }
    }*/

    function patchCity2(record,status) {
            const response =  axios.patch('http://localhost:8484/city/updateStatus/'+ record.id ,status,
                { headers: {
                        'Content-Type': 'application/json',
                        Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                    }
                }).then( response =>  window.location.assign('http://localhost:3000/showAllCities') )
    }


/*    function sw(record) {
        if (record === "INACTIVE"){
            return false
        }
        else {
            return true
        }
    }*/


    const Columns1 = [
        {title: '№', dataIndex: 'number', key: 'number'},
        {title: 'Name', dataIndex: 'name', key: 'name'},
/*        {title: 'Status', dataIndex: 'city_status', key: 'city_status',
            render(text, record) {
                return {
                    props: {
                        style: {background: text === "ACTIVE" ? "green" : "red"}
                    },
                    children: <div>{text}</div>
                };
            }
        },  */
        {
            title: 'Status',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                    <select value={record.city_status} onChange={(event) => patchCity2(record,event.target.value)}>
                        {options2}
                    </select>
            ),
        },


/*        {
            title: 'Set status',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
{/!*                 <button
                     type="button"
                     className="but"
                     onClick={()=>patchCity(record)}
                 >sw1
                 </button>*!/}
                 <Switch
                checked={sw(record.city_status)}
                onChange={checked => patchCity(record)}/>
        </span>
            ),
        },*/

        {
            title: 'Delete',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
                 <button
                     type="button"
                     className="but"
                     onClick={()=>deleteCity(record)}
                 > Delete
                 </button>
        </span>
            ),
        },
        {
            title: 'Update',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
                     <button
                         type="button"
                         className="but"
                         onClick={() => window.location.assign('http://localhost:3000/updateCity/'+record.id)}
                     >
                         Update
                     </button>
                </span>
            ),
        }
    ];


    if (axiosInstance.length === undefined ||typeof (axiosInstance) === "string") {
        return (
            <div className="example">
                <Spin size="large"/>
            </div>
        );
    } else {
        return (
            <div>
                <form align="right">
                    <label>
                        <select value={value} onChange={(event) => setValue(event.target.value)}>
                            {options}
                        </select>
                    </label>
                </form>
                <Table
                    columns={Columns1}
                    expandable={{
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={tData}
                />
            </div>
        );
    }
};
export default ShowAllCity;