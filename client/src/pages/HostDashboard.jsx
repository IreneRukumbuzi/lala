import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PropertyList from "../components/PropertyList";
import api from "../utils/api";

const HostDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleCreateProperty = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("pricePerNight", values.pricePerNight);
      formData.append("location", values.location);
      if (values.image) {
        formData.append("file", values.image.file);
      }

      await api.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowCreateModal(false);
      form.resetFields();

      // Show success notification
      openNotification(
        "success",
        "Property Created",
        "Your property has been successfully added."
      );
    } catch (error) {
      console.error("Failed to create property:", error);

      // Show error notification
      openNotification(
        "error",
        "Creation Failed",
        "An error occurred while adding the property. Please try again."
      );
    }
  };

  return (
    <div>
      <Button
        type="primary"
        className="m-6 mb-2"
        onClick={() => setShowCreateModal(true)}
      >
        Add Property
      </Button>

      <PropertyList role="Host" />

      <Modal
        title="Create Property"
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        onOk={handleCreateProperty}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="pricePerNight"
            label="Price per Night"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter a location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HostDashboard;
