import React, { Fragment, useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { logout, isAuthenticated } from "../../../actions/authAction";
import { itemTotal } from "../cart/CartHelper";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../../actions/types";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const { SubMenu, Item } = Menu;

const MenuMain = ({ history }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const dispatch = useDispatch();

  const loggedOut = () => {
    dispatch({ type: LOGOUT });
    if (!token) {
      history.push("/");
    }
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <SubMenu icon={<AppstoreOutlined />} title="Menu">
        <Item className="nav-item">
          <Link to="/shop">Shop</Link>
        </Item>

        <Item className="nav-item">
          <Link to="/cart">
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>
        </Item>

        {user && user.role === 0 && (
          <Item className="nav-item">
            <Link to="/user/dashboard">Dashboard</Link>
          </Item>
        )}

        {user && user.role === 1 && (
          <Item className="nav-item">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Item>
        )}

        {!user && (
          <Fragment>
            <Item className="nav-item">
              <Link to="/signin">Signin</Link>
            </Item>

            <Item className="nav-item">
              <Link to="/signup">Signup</Link>
            </Item>
          </Fragment>
        )}

        {user && (
          <Item className="nav-item">
            <span style={{ cursor: "pointer" }} onClick={() => console.log("logged out")}>
              Signout
            </span>
          </Item>
        )}
      </SubMenu>
    </Menu>
  );
};

export default withRouter(MenuMain);
