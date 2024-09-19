import React, { useState } from "react";
import { Layout, Typography, Card } from "antd";
import MainTable from "./components/MainTable";
import SubTable from "./components/SubTable";
import RightSidebar from "./components/RightSidebar";

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [selectedYear, setSelectedyear] = useState<number | null>(null);

  const handleRowSelect = (year: number) => {
    setSelectedyear(year);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          padding: "20px 50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          level={2}
          style={{
            color: "white",
            fontSize: "36px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
          }}
        >
          ML Engineer Salaries
        </Title>
      </Header>
      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: "24px", background: "#f0f2f5" }}>
          <Layout style={{ display: "flex", height: "100%" }}>
            <Layout style={{ flex: 2, marginRight: "20px" }}>
              <Card title="Main Table" bordered={false}>
                <MainTable onRowSelect={handleRowSelect} />
              </Card>
            </Layout>
            <Sider
              width={300} // Set the width of the Sider
              style={{
                background: "#ffffff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                overflow: "auto",
              }}
            >
              {selectedYear ? (
                <SubTable year={selectedYear} />
              ) : (
                <RightSidebar />
              )}
            </Sider>
          </Layout>
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "white",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
