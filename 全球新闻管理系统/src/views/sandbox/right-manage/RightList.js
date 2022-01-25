import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import axios from 'axios';
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
const { confirm } = Modal;

export default function RightList() {
    const [dataSource, setdataSource] = useState([]);
    //dataSource：所有的数组
    useEffect(() => {
        axios.get("http://localhost:4000/rights?_embed=children").then(res => {
            const list = res.data
            // list[0].children = "" //设置权限里面的首页 不可展开

            list.forEach(item => {
                if (item.children.length === 0) {
                    item.children = ""
                }
            })

            setdataSource(list) //(useState)把res数据值设置上去
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="purple">{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger type="primary" shape="circle" icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)} />
                    <Popover content={<div style={{ textAlign: "center" }}><Switch checked={item.pagepermission}
                        onClick={() => SwitchMethod(item)}>
                    </Switch></div>} title="页面配置项"
                        trigger={item.pagepermission === undefined ? '' : "click"}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                            disabled={item.pagepermission === undefined} />
                    </Popover>
                </div>
            }
        },
    ];

    const SwitchMethod = (item) => {
        item.pagepermission = item.pagepermission === 1 ? 0 : 1
        // console.log(item);
        setdataSource([...dataSource])

        if (item.grade === 1) { //设置
            axios.patch(`http://localhost:4000/rights/${item.id}`, {
                pagepermission: item.pagepermission
            })
        } else {
            axios.patch(`http://localhost:4000/children/${item.id}`, {
                pagepermission: item.pagepermission
            })
        }
    }
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
        console.log(item);
        //当前页面同步状态 + 后端同步
        if (item.grade === 1) {
            setdataSource(dataSource.filter(data => data.id !== item.id))
            //filter过滤 dataSource每一项过滤 判断当前data.id 与 要删除的item.id是否相等，把不相等的过滤出来
            axios.delete(`http://localhost:4000/rights/${item.id}`)
        } else {
            console.log(item.rightId);

            let list = dataSource.filter(data => data.id === item.rightId)

            list[0].children = list[0].children.filter(data => data.id !== item.id)
            console.log(list.dataSource);

            setdataSource([...dataSource])
            axios.delete(`http://localhost:4000/children/${item.id}`)
        }
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5 //（操作）分页设置 每一页只显示5页
                }} />
        </div>
    )
}