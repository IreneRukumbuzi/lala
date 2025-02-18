import { useState } from "react";
import PropTypes from "prop-types";
import { Select, DatePicker, Button, Input } from "antd";
import { DownOutlined, CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const locations = [
  { value: "melbourne-au", label: "Melbourne, AU" },
  { value: "sydney-au", label: "Sydney, AU" },
  { value: "brisbane-au", label: "Brisbane, AU" },
];

const PropertyFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ location: "", date: null, price: "" });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      <Select
        placeholder="Select location"
        value={filters.location}
        onChange={(value) => handleChange("location", value)}
        className="w-full md:w-[200px]"
        suffixIcon={<DownOutlined />}
      >
        {locations.map((loc) => (
          <Option key={loc.value} value={loc.value}>
            {loc.label}
          </Option>
        ))}
      </Select>

      <DatePicker
        placeholder="Pick a date"
        className="w-full md:w-[200px]"
        format="DD MMM YYYY"
        onChange={(date) => handleChange("date", date ? dayjs(date).format("DD MMM YYYY") : null)}
        suffixIcon={<CalendarOutlined />}
      />

      <Select
        placeholder="Any price"
        className="w-full md:w-[200px]"
        onChange={(value) => handleChange("price", value)}
        suffixIcon={<DownOutlined />}
      >
        <Option value="low">Low to High</Option>
        <Option value="high">High to Low</Option>
      </Select>

      {/* Search */}
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        className="w-full md:w-[200px]"
      />

      <Button className="w-full md:w-auto" onClick={() => onFilterChange(filters)}>Search</Button>
    </div>
  );
}

PropertyFilters.propTypes = {
  onFilterChange: PropTypes.func,
}

export default PropertyFilters;