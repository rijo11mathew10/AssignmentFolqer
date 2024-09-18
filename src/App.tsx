import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, theme, Typography } from "antd";
import MainTable from "./components/MainTable";
import SubTable from "./components/SubTable";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const items1: MenuProps["items"] = ["1", "2"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedYear, setSelectedyear] = useState<number | null>(null);

  const handleRowSelect = (year: number) => {
    setSelectedyear(year);
  };
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "250vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: 0,
          background: "#001529",
        }}
      >
        <Title level={2} style={{ color: "white" }}>
          ML Engineer Salaries
        </Title>
      </Header>
      <Layout style={{ flex: 1 }}>
        <Layout style={{ padding: "0", flex: 1 }}>
          <Content
            style={{ padding: "24px", margin: 0, background: colorBgContainer }}
          >
            <Title level={2} style={{ paddingBottom: "5px" }}>
              Main Table
            </Title>
            <MainTable onRowSelect={handleRowSelect} />
            {selectedYear && (
              <>
                <Title level={3} style={{ paddingBottom: "5px" }}>
                  Aggregated Jobs for {selectedYear}
                </Title>
                <SubTable year={selectedYear} />
              </>
            )}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
