import React from 'react';
import { Avatar, Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Viewer } from '../../../../lib/types';
import { useMutation } from '@apollo/client';
import { LOG_OUT } from '../../../../lib/graphql/mutations/LogOut';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import {
  displayErrorMessage,
  displaySuccessNotification,
  iconColor,
} from '../../../../lib/components/utils';

interface MenuItemsProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: MenuItemsProps) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!",
      );
    },
  });

  const handleLogOut = () => logOut();

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />} key="/sub">
        <Item key="/user">
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined className="icon" style={{ color: iconColor }} />
            Profile
          </Link>
        </Item>
        <Item key="/logout" onClick={handleLogOut}>
          <LoginOutlined className="icon" style={{ color: iconColor }} />
          Log out
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu" key="/menu">
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined className="icon" style={{ color: iconColor }} />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
