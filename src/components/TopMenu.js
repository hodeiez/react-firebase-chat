import { Menu, Layout } from "antd";
import { Profile } from "./profile";
import { MainPage } from "./chat";
import { useState } from "react";
import { SignOut } from "./signInOut";
export default function TopMenu({ auth }) {
  const {Header, Content, Sider } = Layout;
  const [showCont, setShow] = useState();
  const [showSide, setShowSide] = useState();
  const getIt = (e) => {
    e.key === "profile"
      ? setShow(<Profile auth={auth} />)
      : setShowSide(<MainPage auth={auth} />);
  };

  return (
    <Layout>
    <Header>
      <Menu theme="dark" mode="horizontal" onClick={getIt}>
        <Menu.Item key="chat">Chat</Menu.Item>
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="signout"><SignOut/></Menu.Item>
      </Menu>
      </Header>
      <Layout>
      <Content >{showCont}</Content>
      <Sider theme="light">{showSide}</Sider>
      </Layout>
    </Layout>
  );
}
