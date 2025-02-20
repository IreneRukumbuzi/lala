import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DatePicker,
  Form,
  Modal,
  Input,
  InputNumber,
  Upload,
} from "antd";
import { UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import api from "../utils/api";

const PropertyCard = ({ property, role, onUpdate }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleBooking = async () => {
    try {
      const values = await form.validateFields();
      const [checkInDate, checkOutDate] = values.dateRange;

      await api.post("/bookings", {
        propertyId: property.id,
        checkInDate: checkInDate.format("YYYY-MM-DD"),
        checkOutDate: checkOutDate.format("YYYY-MM-DD"),
      });

      setShowBookingForm(false);
      form.resetFields();
    } catch (error) {
      console.error("Booking Failed:", error);
    }
  };

  const handleEditProperty = async () => {
    try {
      const values = await editForm.validateFields();
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("pricePerNight", values.pricePerNight);
      formData.append("location", values.location);
      if (values.image) {
        formData.append("file", values.image.file);
      }

      await api.put(`/properties/${property.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowEditForm(false);
      onUpdate();
    } catch (error) {
      console.error("Failed to update property:", error);
    }
  };

  const handleDeleteProperty = async () => {
    console.log("Delete button clicked");
    Modal.warning({
      title: "Are you sure you want to delete this property?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await api.delete(`/properties/${property.id}`);
          onUpdate();
        } catch (error) {
          console.error("Failed to delete property:", error);
        }
      },
    });
  };

  return (
    <div className="w-full overflow-hidden">
      <img
        alt={property.title}
        src={property.imageUrl}
        className="w-full h-56 object-cover rounded-lg"
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{property.location}</p>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {property.description}
        </p>
        <p className="text-gray-900 mt-1">${property.pricePerNight} night</p>

        {role === "Renter" ? (
          <Button
            type="primary"
            className="mt-3 w-full"
            onClick={() => setShowBookingForm(true)}
          >
            Book Now
          </Button>
        ) : (
          <div className="mt-3 flex flex-col sm:flex-row items-center gap-2 w-full">
            <Button
              type="primary"
              className="w-full sm:w-auto"
              style={{
                backgroundColor: "#FAAD14",
                color: "white",
                border: "none",
              }}
              onClick={() => setShowEditForm(true)}
            >
              Edit
            </Button>

            <Button
              type="primary"
              danger
              className="w-full sm:w-auto"
              onClick={handleDeleteProperty}
            >
              Delete
            </Button>
          </div>
        )}

        <Modal
          title={`Book ${property?.title}`}
          open={showBookingForm}
          onCancel={() => setShowBookingForm(false)}
          onOk={handleBooking}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="dateRange"
              label="Booking Dates"
              rules={[
                {
                  required: true,
                  message: "Please select your check-in and check-out dates",
                },
              ]}
            >
              <DatePicker.RangePicker
                className="w-full"
                disabledDate={(current) =>
                  current && current < new Date().setHours(0, 0, 0, 0)
                }
                placeholder={["Check-in Date", "Check-out Date"]}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Edit Property"
          open={showEditForm}
          onCancel={() => setShowEditForm(false)}
          onOk={handleEditProperty}
        >
          <Form form={editForm} layout="vertical" initialValues={property}>
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
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
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
            <Form.Item name="image" label="Upload Image">
              <Upload
                beforeUpload={() => false}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  role: PropTypes.string,
  onUpdate: PropTypes.func,
};

export default PropertyCard;
