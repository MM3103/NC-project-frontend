import React from "react";
import {useAx} from "./ShowAllERequest";
import {Spin, Table} from "antd";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import './Nav.css';
import "antd/dist/antd.css";

const ShowAll = () => {
    const {keycloak, initialized} = useKeycloak()
    const axiosInstance = useAx();
    const data1 = [{}];

    function deleteOrder(record) {
        const response = axios.delete('http://localhost:8484/order/' + record.id,
            {
                headers: {
                    Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
                    "Access-Control-Allow-Origin": "*",
                    mode: "cors"
                }
            }).then( response =>  window.location.assign('http://localhost:3000/showAll') )}


    const Columns1 = [
        {title: 'First name', dataIndex: 'firstName', key: 'firstName'},
        {title: 'Last name', dataIndex: 'lastName', key: 'lastName'},
        {title: 'Email', dataIndex: 'email', key: 'email'},
        {title: 'Type of order', dataIndex: 'typeOrder', key: 'typeOrder'},
        {title: 'Address', dataIndex: 'address', key: 'address'},
        {title: 'Order status', dataIndex: 'orderStatus', key: 'orderStatus',
            render(text, record) {
                return {
                    props: {
                        style: {background: text === "WAITING" ? "yellow" : (text === "REJECTED" ? "red":(text === "ACCEPTED" ? "green":"blue") )}
                    },
                    children: <div>{text}</div>
                };
            }
        },
        {title: 'Self installation', dataIndex: 'selfInstallation', key: 'selfInstallation',
            render(bool, record,text) {
                return {
                    props: {
                        st: {text: bool === true ? text="YES":text="NO"}
                    },
                    children: <div>{text}</div>
                };
            }
        },

        {
            title: 'Delete',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
                 <button
                     type="button"
                     className="but"
                     onClick={()=>deleteOrder(record)}
                     disabled={record.orderStatus !== "WAITING"}

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
                         onClick={() => window.location.assign('http://localhost:3000/update/'+record.id)}
                         disabled={record.orderStatus !== "WAITING"}
                     >
                         Update
                     </button>
                </span>
            ),
        }
    ];

    if (typeof (axiosInstance) === "string" || axiosInstance.length === undefined) {
        return (
            <div className="example">
                <Spin size="large"/>
            </div>
        );
    } else {
        return (
            <div>
                <Table
                    columns={Columns1}
                    expandable={{
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={axiosInstance}
                />
            </div>
        );
    }
};
export default ShowAll;