import { useState } from "react";
import PropTypes from "prop-types";
import { Select, Button, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const PropertyFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    price: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      <Input
        placeholder="Search properties..."
        prefix={<SearchOutlined />}
        className="w-full md:w-[250px]"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      <Select
        placeholder="Sort by price"
        className="w-full md:w-[200px]"
        onChange={(value) => handleChange("price", value)}
        suffixIcon={<DownOutlined />}
      >
        <Option value="low">Low to High</Option>
        <Option value="high">High to Low</Option>
      </Select>

      <Button className="w-full md:w-auto" onClick={() => onFilterChange(filters)}>
        Search
      </Button>
    </div>
  );
};

PropertyFilters.propTypes = {
  onFilterChange: PropTypes.func,
};

export default PropertyFilters;
