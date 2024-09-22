import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, Col, Row, Menu, MenuProps } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainTable from "./components/MainTable";
import SubTable from "./components/SubTable";
import RightSidebar from "./components/RightSidebar";
import Insights from "./components/Insights"; // Create this component

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const items1: MenuProps["items"] = [
  { key: "home", label: <Link to="/">Home</Link> }, // Links to home route
  { key: "insights", label: <Link to="/insights">Insights</Link> }, // Links to insights route
];

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
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#001529",
            padding: "10px 30px",
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
              fontSize: "2rem",
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

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>

        <Content
          style={{ padding: "24px", background: "#f0f2f5", marginTop: "80px" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Row
                  gutter={{
                    xs: 0,
                    sm: 16,
                    md: 16,
                    lg: 16,
                  }}
                >
                  <Col
                    xs={24}
                    sm={24}
                    md={16}
                    lg={16}
                    style={{ paddingRight: "16px" }}
                  >
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
              }
            />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </Content>

        <Footer
          style={{ textAlign: "center", background: "#001529", color: "white" }}
        >
          Made with ❤ & 🏃
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
