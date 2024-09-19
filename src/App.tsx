import React, { useState } from "react";
import { Layout, Row, Col, Card, Space, Typography } from "antd";
import MainTable from "./components/MainTable";
import SubTable from "./components/SubTable";
import RightSidebar from "./components/RightSidebar"; // Import the right sidebar component

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleRowSelect = (year: number) => {
    setSelectedYear(year);
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

      <Content style={{ padding: "24px" }}>
        <Row gutter={24}>
          {/* Left side (Main Table and SubTable) */}
          <Col span={16}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card title="Main Table" bordered={false}>
                <MainTable onRowSelect={handleRowSelect} />
              </Card>

              {selectedYear && (
                <Card title={`Aggregated Jobs for ${selectedYear}`} bordered={false}>
                  <SubTable year={selectedYear} />
                </Card>
              )}
            </Space>
          </Col>

          {/* Right side (Dynamic Sidebar) */}
          <Col span={8}>
            {!selectedYear && <RightSidebar />} {/* Display only when no year is selected */}
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center", background: "#001529", color: "white" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
