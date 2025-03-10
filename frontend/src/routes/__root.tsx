import "../App.css";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuth } from "../providers/AuthProvider";
import { Menu, Button, Layout } from "antd";

const { Header, Content } = Layout;

export const Route = createRootRoute({
  component: () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const restrictedRoutes = ["/users", "/myprofile", "/acquisitions"];
    if (restrictedRoutes.includes(window.location.pathname) && !token) {
      navigate({ to: "/login", params: { token } });
    }

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["main"]}
            style={{ flex: 1 }}>
            <Menu.Item key="main">
              <Link to="/">Main</Link>
            </Menu.Item>

            {!token ? (
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="users">
                  <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item key="myprofile">
                  <Link to="/myprofile">My Profile</Link>
                </Menu.Item>
                <Menu.Item key="acquisitions">
                  <Link to="/acquisitions">Acquisitions</Link>
                </Menu.Item>
              </>
            )}
          </Menu>

          {token && (
            <Button
              type="primary"
              danger
              onClick={logout}>
              Logout
            </Button>
          )}
        </Header>

        <Content style={{ padding: "24px", marginTop: 20 }}>
          <Outlet />
        </Content>

        <TanStackRouterDevtools />
      </Layout>
    );
  },
});
