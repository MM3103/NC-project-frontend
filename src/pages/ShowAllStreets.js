import React, {useState} from "react";
import {Spin, Switch, Table} from "antd";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import './Nav.css';
import './Loading.css';
import "antd/dist/antd.css";
import {useAx231} from "./ShowAllInactiveStreetRequest";
import {useAx12} from "./ShowAllStreetsRequest";
import {useAx1} from "./ShowAllActiveStreetsRequest";

const ShowAllStreets = () => {
    const {keycloak, initialized} = useKeycloak()
    const axiosInstance1 = useAx12();
    const axiosInstance2 = useAx1();
    const axiosInstance3 = useAx231();
    const data1 = [{}];
    const tData = []
    const [value, setValue] = useState("");
    const texts = ['All streets', 'All active streets', 'All inactive streets'];
    const options = texts.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    let options2= [];
    const typeStatus = ['ACTIVE','INACTIVE'];
    options2 = typeStatus.map((text, index) => {
        return <option key={index}>{text}</option>;
    });


    if (axiosInstance1.length !== undefined && (value === 'All streets' || value === '')) {
        for (let i = 0; i < axiosInstance1.length; i++) {
            const tData1 = {number: 0, id: 0, name: '', cityName: '', streetStatus: ''}
            tData1.number = i + 1
            tData1.id = axiosInstance1[i].id
            tData1.name = axiosInstance1[i].name
            tData1.cityName = axiosInstance1[i].city.name
            tData1.streetStatus = axiosInstance1[i].streetStatus
            tData[i] = tData1
        }
    }
    if (axiosInstance2.length !== undefined && value === 'All active streets') {
        for (let i = 0; i < axiosInstance2.length; i++) {
            const tData1 = {number: 0, id: 0, name: '', cityName: '', streetStatus: ''}
            tData1.number = i + 1
            tData1.id = axiosInstance2[i].id
            tData1.name = axiosInstance2[i].name
            tData1.cityName = axiosInstance2[i].city.name
            tData1.streetStatus = axiosInstance2[i].streetStatus
            tData[i] = tData1
        }
    }

    if (axiosInstance3.length !== undefined && value === 'All inactive streets') {
        for (let i = 0; i < axiosInstance3.length; i++) {
            const tData1 = {number: 0, id: 0, name: '', cityName: '', streetStatus: ''}
            tData1.number = i + 1
            tData1.id = axiosInstance3[i].id
            tData1.name = axiosInstance3[i].name
            tData1.cityName = axiosInstance3[i].city.name
            tData1.streetStatus = axiosInstance3[i].streetStatus
            tData[i] = tData1
        }
    }


    function deleteStreet(record) {
        const response = axios.delete('http://localhost:8484/street/delete/' + record.id,
            {
                headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then(response => window.location.assign('http://localhost:3000/showAllStreets')).catch(response => window.location.assign('http://localhost:3000/ntDB'))
    }

/*    function patchStreet(record) {
        if(record.streetStatus === 'ACTIVE'){
            const response = axios.patch('http://localhost:8484/street/updateStatus/' + record.id, 'INACTIVE',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                        "Access-Control-Allow-Origin": "*",
                        mode: "cors"
                    }
                }).then(response => window.location.assign('http://localhost:3000/showAllStreets'))
        }
        else if(record.streetStatus === 'INACTIVE'){
            const response = axios.patch('http://localhost:8484/street/updateStatus/' + record.id, 'ACTIVE',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                        "Access-Control-Allow-Origin": "*",
                        mode: "cors"
                    }
                }).then(response => window.location.assign('http://localhost:3000/showAllStreets'))
        }
    }

    function sw(record) {
        if (record === "INACTIVE"){
            return false
        }
        else {
            return true
        }
    }*/

    function patchStreet2(record,status) {
        const response =  axios.patch('http://localhost:8484/street/updateStatus/'+ record.id ,status,
            { headers: {
                    'Content-Type': 'application/json',
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,"Access-Control-Allow-Origin": "*",mode:"cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/showAllStreets') )
    }

    const Columns1 = [
        {title: '№', dataIndex: 'number', key: 'number'},
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'City', dataIndex: 'cityName', key: 'cityName'},
        {
            title: 'Status',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <select value={record.streetStatus} onChange={(event) => patchStreet2(record,event.target.value)}>
                    {options2}
                </select>
            ),
        },
       /* {
            title: 'Status', dataIndex: 'streetStatus', key: 'streetStatus',
            render(text, record) {
                return {
                    props: {
                        style: {background: text === "ACTIVE" ? "green" : "red"}
                    },
                    children: <div>{text}</div>
                };
            }
        },
        {
            title: 'Set status',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
{/!*                 <button
                     type="button"
                     className="but"
                     onClick={() => patchStreet(record)}
                 > Set status
                 </button>*!/}
                    <Switch
                        checked={sw(record.streetStatus)}
                        onChange={checked => patchStreet(record)}/>
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
                     onClick={() => deleteStreet(record)}
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
                         onClick={() => window.location.assign('http://localhost:3000/updateStreet/' + record.id)}
                     >
                         Update
                     </button>
                </span>
            ),
        }
    ];

    if (typeof (axiosInstance1) === "string" || axiosInstance1.length === undefined) {
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
export default ShowAllStreets;