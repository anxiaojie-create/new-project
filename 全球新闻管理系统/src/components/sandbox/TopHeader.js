import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from "react-router";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AntDesignOutlined
} from '@ant-design/icons';

const { Header } = Layout; //解构函数
export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false) //创建hooks
    const changeCollapsed = () => {
        setCollapsed(!collapsed) //取返
    }

    let navigate = useNavigate();
    const menu = (
        <Menu>
            <Menu.Item>
                个人中心
            </Menu.Item>
            <Menu.Item >
                个人设置
            </Menu.Item>
            <Menu.Item>
                订单中心
            </Menu.Item>
            <Menu.Item danger onClick={()=>{
                localStorage.removeItem("token")
                navigate("/login"); //设置退出登录
            }}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}
                /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }

            <div style={{ float: "right" }}>
                <span>欢迎admin回来</span>
                <Dropdown overlay={menu}>
                    <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}
