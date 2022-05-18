import React from "react";
import {useAx} from "./ShowUserOrdersRequest";
import {Spin, Table} from "antd";
import './Loading.css';
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";

const ShowUserOrders = () => {
    const {keycloak, initialized} = useKeycloak();
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
            }).then( response =>  window.location.assign('http://localhost:3000/showUserOrders') )}

    const columns2 = [
/*        {title: 'Id', dataIndex: 'id', key: 'id'},*/
        {title: 'First name', dataIndex: 'firstName', key: 'firstName'},
        {title: 'Last name', dataIndex: 'lastName', key: 'lastName'},
        {title: 'Email', dataIndex: 'email', key: 'email'},
        {title: 'Type of order', dataIndex: 'typeOrder', key: 'typeOrder'},
        {title: 'Address', dataIndex: 'address', key: 'address'},
        {title: 'Order status', dataIndex: 'orderStatus', key: 'orderStatus',
            render(text, record) {
                return {
                    props: {
                        style:  {background: text === "WAITING" ? "yellow" : (text === "REJECTED" ? "red":(text === "ACCEPTED" ? "green":"blue") )}
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
                     > Delete </button>
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
                         onClick={() =>(window.location.assign('http://localhost:3000/updateForUser/'+record.id))}
                         disabled={record.orderStatus !== "WAITING"}
                     >
                         Update
                     </button>
                </span>
            ),
        }
    ];
    if (axiosInstance.length === undefined || typeof (axiosInstance) === "string") {
        return (
            <div className="example">
                <Spin size="large"/>
            </div>
        );
    } else {
        return (
            <div>
                <Table
                    columns={columns2}
                    expandable={{
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={axiosInstance}
                />
            </div>
        );
    }
};
export default ShowUserOrders;