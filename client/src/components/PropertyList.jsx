import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import { Row, Col, Pagination, Empty, Button, Modal, Form, Input, InputNumber, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const PropertyList = ({ role }) => {
  const [propertiesData, setPropertiesData] = useState({
    properties: [],
    totalProperties: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 8,
  });

  const [filters, setFilters] = useState({
    search: "",
    price: "",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();

  const fetchProperties = useCallback(
    async (page = propertiesData.currentPage, updatedFilters = filters) => {
      const { search, price } = updatedFilters;
      const endpoint = role === "Host" ? "/properties/host" : "/properties";

      try {
        const response = await api.get(endpoint, {
          params: {
            page,
            search,
            price,
            limit: 8,
          },
        });

        setPropertiesData(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    },
    [propertiesData.currentPage, filters, role]
  );

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handlePageChange = (page) => {
    setPropertiesData((prev) => ({ ...prev, currentPage: page }));
    fetchProperties(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPropertiesData((prev) => ({ ...prev, currentPage: 1 }));
    fetchProperties(1, newFilters);
  };

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
      fetchProperties();

      openNotification("success", "Property Created", "Your property has been successfully added.");
    } catch (error) {
      console.error("Failed to create property:", error);
      openNotification("error", "Creation Failed", "An error occurred while adding the property. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <PropertyFilters onFilterChange={handleFilterChange} />

      {role === "Host" && (
        <Button type="primary" className="mb-2 mt-6" onClick={() => setShowCreateModal(true)}>
          Add Property
        </Button>
      )}

      {propertiesData.properties.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <Empty description="No properties found" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} className="mt-6">
            {propertiesData.properties.map((property) => (
              <Col key={property.id} xs={24} sm={12} md={8} lg={6}>
                <PropertyCard property={property} role={role} onUpdate={fetchProperties} />
              </Col>
            ))}
          </Row>

          <div className="mt-8 flex justify-center">
            <Pagination
              current={propertiesData.currentPage}
              total={propertiesData.totalProperties}
              pageSize={propertiesData.pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      <Modal title="Create Property" open={showCreateModal} onCancel={() => setShowCreateModal(false)} onOk={handleCreateProperty}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter a title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter a description" }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="pricePerNight" label="Price per Night" rules={[{ required: true, message: "Please enter a price" }]}>
            <InputNumber className="w-full" min={1} />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please enter a location" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Upload Image" rules={[{ required: true, message: "Please upload an image" }]}>
            <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

PropertyList.propTypes = {
  role: PropTypes.string,
};

export default PropertyList;
