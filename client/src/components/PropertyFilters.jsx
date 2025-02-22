import { useState } from "react";
import PropTypes from "prop-types";
import { Select, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

const { Option } = Select;

const PropertyFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    price: "",
  });

  const debouncedFilterChange = debounce((updatedFilters) => {
    onFilterChange(updatedFilters);
  }, 500);

  const handleChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      debouncedFilterChange(newFilters);
      return newFilters;
    });
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
    </div>
  );
};

PropertyFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default PropertyFilters;
