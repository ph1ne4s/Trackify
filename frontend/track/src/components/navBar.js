import React, {useState} from 'react'
import {Menu, Badge} from 'antd';
import {LogoutOutlined, UserOutlined, UserAddOutlined,
    AppstoreOutlined, SettingOutlined, ShoppingOutlined,
ShoppingCartOutlined} from '@ant-design/icons';

import {Link} from 'react-router-dom';


const {SubMenu, Item} = Menu;

const NavBar= () => {
    


    
    return(
        <Menu  mode="horizontal">

            <Item key="home" icon={<AppstoreOutlined/>}>
                <Link to={"/"}> Home </Link>
            </Item>

            <Item key="attendance" icon={<AppstoreOutlined/>}>
                <Link to={"/attendance"}> Attendance </Link>
            </Item>

            <Item key="todo" icon={<ShoppingOutlined/>}>
                <Link to={"/ToDo"}> To-Do </Link>
            </Item>

            <Item key="submissions" icon={<ShoppingOutlined/>}>
                <Link to={"/submissions"}> Submissions </Link>
            </Item>

            <Item key="signup" icon={<UserAddOutlined/>}>
                <Link to={"/signup"}> signup </Link>
            </Item>

            <Item key="login" icon={<UserAddOutlined/>}>
                <Link to={"/login"}> login </Link>
            </Item>
           
        </Menu>

    )
}

export default NavBar;