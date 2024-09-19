import { Card, Typography, Space } from "antd";
import { CodeOutlined, ToolOutlined, BulbOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RightSidebar: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Top Job Titles */}
      <Card
        title={
          <>
            <CodeOutlined style={{ marginRight: 10 }} />
            Top Job Titles
          </>
        }
        bordered={false}
      >
        <ul>
          <li>Machine Learning Engineer</li>
          <li>Data Scientist</li>
          <li>AI Researcher</li>
          <li>Deep Learning Specialist</li>
        </ul>
      </Card>

      {/* Top Frameworks */}
      <Card
        title={
          <>
            <ToolOutlined style={{ marginRight: 10 }} />
            Top Frameworks
          </>
        }
        bordered={false}
      >
        <ul>
          <li>TensorFlow</li>
          <li>PyTorch</li>
          <li>Scikit-learn</li>
          <li>Hugging Face</li>
        </ul>
      </Card>

      {/* Popular Tools */}
      <Card
        title={
          <>
            <BulbOutlined style={{ marginRight: 10 }} />
            Popular Tools
          </>
        }
        bordered={false}
      >
        <ul>
          <li>Jupyter Notebooks</li>
          <li>Docker</li>
          <li>Kubernetes</li>
          <li>MLflow</li>
        </ul>
      </Card>

      {/* Motivational Quote */}
      <Card
        bordered={false}
        style={{ textAlign: "center", background: "#f5f5f5", padding: "16px" }}
      >
        <Title level={5} italic>
          "The best way to predict the future is to invent it."
        </Title>
        <Text type="secondary">– Alan Kay</Text>
      </Card>
    </Space>
  );
};

export default RightSidebar;
