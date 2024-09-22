import React, { ChangeEvent, useState } from "react";
import { Input, Button, List, Card, Row, Col, Typography, message } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

const Insights: React.FC = () => {
  const [input, setInput] = useState(""); // State to hold user input
  const [messages, setMessages] = useState<
    { user: string; response: string }[]
  >([]); // State to hold the conversation history
  const [loading, setLoading] = useState(false); // State for loading

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value); // Update state when user types in the input field
  };

  // Function to fetch the response from the backend
  const fetchResponse = async (userMessage: string) => {
    setLoading(true); // Show loading state
    try {
      const response = await fetch(
        "https://assignment-folqer-backend.onrender.com/insights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userMessage }), // Send the user's message to the backend
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data.result; // Assuming the backend returns the result in the 'result' field
      } else {
        throw new Error(data.message || "Error fetching response");
      }
    } catch (error) {
      console.error("API error:", error);
      message.error("Failed to get a response from the model.");
      return "Error fetching response."; // Fallback message
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleSendClick = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages([...messages, { user: userMessage, response: "Loading..." }]); // Show temporary loading message

      const modelResponse = await fetchResponse(userMessage); // Fetch the real model response
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, response: modelResponse }
            : msg
        )
      );
      setInput(""); // Clear the input field after sending
    }
  };

  return (
    <Card
      title={<Title level={3}>Insights - Ask Me Anything</Title>}
      style={{
        maxWidth: 800,
        margin: "40px auto",
        borderRadius: 8,
        padding: "24px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <List
        dataSource={messages}
        renderItem={(item) => (
          <List.Item style={{ padding: "16px 0" }}>
            <List.Item.Meta
              title={
                <Row gutter={[16, 8]}>
                  <Col span={24}>
                    <strong>User:</strong> {item.user}
                  </Col>
                  <Col span={24} style={{ marginTop: 8 }}>
                    <strong>Agent:</strong> {item.response}
                  </Col>
                </Row>
              }
            />
          </List.Item>
        )}
        style={{
          height: 400,
          overflowY: "auto",
          marginBottom: 24,
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />

      <Row gutter={[16, 16]}>
        <Col span={20}>
          <TextArea
            rows={4}
            placeholder="Type your question here..."
            value={input}
            onChange={handleInputChange}
            style={{ borderRadius: 8 }}
            onPressEnter={handleSendClick} // Allow sending with the Enter key
            disabled={loading}
          />
        </Col>

        <Col span={4}>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendClick}
            style={{ width: "100%", height: "48px", borderRadius: 8 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Insights;
