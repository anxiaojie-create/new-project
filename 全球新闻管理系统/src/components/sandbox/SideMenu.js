import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
  HomeOutlined,
  CrownOutlined,
} from '@ant-design/icons'; //导航栏图标

const { Sider } = Layout; //ES6 解构
const { SubMenu } = Menu;

//模拟数组结构
// const menuList = [
//   {
//     key: "/home",
//     title: "首页",
//     icon: <HomeOutlined />,
//   },
//   {
//     key: "/user-manage",
//     title: "用户管理",
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: "/user-manage/list",
//         title: "用户列表",
//         icon: <UserOutlined />,
//       },
//     ],
//   },
//   {
//     key: "/right-manage",
//     title: "权限管理",
//     icon: <CrownOutlined />,
//     children: [
//       {
//         key: "/right-manage/role/list",
//         title: "角色列表",
//         icon: <CrownOutlined />,
//       },
//       {
//         key: "/right-manage/right/list",
//         title: "权限列表",
//         icon: <CrownOutlined />,
//       },
//     ],
//   },
// ];

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <HomeOutlined />,
  "/right-manage": <SettingOutlined />,
  "/news-manage": < VideoCameraOutlined />,
  "/audit-manage": <UploadOutlined />,
  "/publish-manage": <CrownOutlined />,
}

export default function SideMenu({ collapsed }) {

  const [menu, setmenu] = useState([]);

  useEffect(() => { //封装了一个axios 传了一个空数组[]
    axios.get("http://localhost:4000/rights?_embed=children").then(res => {
      console.log(res.data);
      setmenu(res.data)
    })
  }, [])

  let navigate = useNavigate();
  let location = useLocation();
  const selectKeys = [location.pathname]; // 菜单栏刷新依旧被选中
  const openKeys = ["/" + location.pathname.split("/")[1]];

  const checkpagepermission = (item) => {
    return item.pagepermission === 1
  }

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && checkpagepermission(item)) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}  {/* 这是一个函数递归 */}
          </SubMenu>
        );
      }
      return checkpagepermission(item) && (
        <Menu.Item key={item.key} icon={item.icon} onClick={() => {
          navigate(item.key)
        }}> {item.title} </Menu.Item>
      );
    });
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo" >新闻发布管理系统</div>
        <div style={{ flex: 1, "overflow": 'auto' }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}
