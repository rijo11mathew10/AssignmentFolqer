import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, Col, Row } from "antd";
import MainTable from "./components/MainTable";
import SubTable from "./components/SubTable";
import RightSidebar from "./components/RightSidebar";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleRowSelect = (year: number) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    // Scroll to the SubTable when a row is selected on smaller screens
    if (selectedYear) {
      const element = document.querySelector(".sub-table-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedYear]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          padding: "10px 30px", // Reduce padding on smaller screens
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Title
          level={2}
          style={{
            color: "white",
            fontSize: "2rem", // Smaller font for smaller screens
            letterSpacing: "2px",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
            lineHeight: "1.2",
            wordBreak: "break-word",
          }}
        >
          ML Engineer Salaries
        </Title>
      </Header>
      <Content
        style={{ padding: "24px", background: "#f0f2f5", marginTop: "80px" }}
      >
        <Row
          gutter={{
            xs: 0, // No gap for extra small screens
            sm: 16, // Small gap for small screens
            md: 16,
            lg: 16,
          }}
        >
          <Col xs={24} sm={24} md={16} lg={16} style={{ paddingRight: "16px" }}>
            <Card
              title="Main Table"
              bordered={false}
              style={{ height: "100%" }}
            >
              <MainTable onRowSelect={handleRowSelect} />
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
            style={{
              marginTop: "10px",
              paddingLeft: "2px",
              minHeight: "100vh",
              position: "relative",
            }}
          >
            {selectedYear ? (
              <div className="sub-table-container">
                <Card
                  title={`Aggregated Jobs for ${selectedYear}`}
                  bordered={false}
                  style={{ height: "100%" }}
                >
                  <SubTable year={selectedYear} />
                </Card>
              </div>
            ) : (
              <RightSidebar />
            )}
          </Col>
        </Row>
      </Content>

      <Footer
        style={{ textAlign: "center", background: "#001529", color: "white" }}
      >
        Made with ❤ & 🏃{" "}
      </Footer>
    </Layout>
  );
};

export default App;
