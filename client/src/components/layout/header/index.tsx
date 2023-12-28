import { Layout as AntdLayout, Menu, MenuProps } from "antd";
import { useCurrentPage } from "../../../hooks";
import { NavLink } from "react-router-dom";

const { Header: AntdHeader } = AntdLayout;

export const Header = () => {
  const currentPage = useCurrentPage();
  const items: MenuProps["items"] = [
    {
      label: <NavLink to="players">Игроки</NavLink>,
      key: "/players",
      // icon: <SettingOutlined />,
    },
    {
      label: <NavLink to="teams">Команды</NavLink>,
      key: "/teams",
      // icon: <SettingOutlined />,
    },
    {
      label: <NavLink to="tournaments">Турниры</NavLink>,
      key: "/tournaments",
      // icon: <SettingOutlined />,
    },
  ];

  return (
    <AntdHeader>
      <Menu
        mode="horizontal"
        items={items}
        disabledOverflow={true}
        selectedKeys={[currentPage]}
      />
    </AntdHeader>
  );
};
