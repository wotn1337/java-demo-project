import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import { Header } from "./header";

const { Content } = AntdLayout;

export const Layout: React.FC = () => {
  return (
    <AntdLayout style={{ width: "100%" }}>
      <Header />
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
};
