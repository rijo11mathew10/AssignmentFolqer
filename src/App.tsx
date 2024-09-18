import React, { useState } from "react";

import { Layout, theme, Typography } from "antd";
import MainTable from "./components/MainTable";
import SubTable from "./components/SubTable";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
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
