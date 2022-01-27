import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import axios from 'axios';
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

export default function RoleList() {
    const [dataSource, setdataSource] = useState([]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger type="primary" shape="circle" icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)} />
                    <Button type="primary" shape="circle" 
                    icon={<EditOutlined />} />
                </div>
            }
        },
    ]

    const confirmMethod = (item) => {
        confirm({
            title: '您确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                // console.log('确认');
                deleteMethod(item)
            },
            onCancel() {
                // console.log('取消');
            },
        });
    }
    //删除
    const deleteMethod = (item) => { //从操作传item找到路径删除
        setdataSource(dataSource.filter(data => data.id !== item.id))
        //filter过滤 dataSource每一项过滤 判断当前data.id 与 要删除的item.id是否相等，把不相等的过滤出来
        axios.delete(`http://localhost:4000/roles/${item.id}`)
    }

    useEffect(() => {
        axios.get("http://localhost:4000/roles").then(res => {
            // console.log(res.data);
            setdataSource(res.data)
        })
    }, [])
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                rowKey={(item) => item.id}></Table>
            {/* 箭头函数返回值是item.id */}
        </div>
    )
}
