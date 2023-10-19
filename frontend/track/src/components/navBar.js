import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Item, SubMenu } = Menu;

const NavBar = () => {
  return (
    <Menu mode="horizontal">
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>
      <Item key="attendance">
        <Link to="/attendance">Attendance</Link>
      </Item>
      <Item key="todo">
        <Link to="/ToDo">To-Do</Link>
      </Item>
      <Item key="submissions">
        <Link to="/submissions">Submissions</Link>
      </Item>
      <SubMenu key="auth" title="Auth" icon={<UserOutlined />}>
        <Item key="login">
          <Link to="/auth/login">Login</Link>
        </Item>
        <Item key="signup">
          <Link to="/auth/signup">Signup</Link>
        </Item>
      </SubMenu>
    </Menu>
  );
}

export default NavBar;
