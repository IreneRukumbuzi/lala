import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import { Row, Col, Pagination } from "antd";

const PropertyList = ({ role }) => {
  const [propertiesData, setPropertiesData] = useState({
    properties: [],
    totalProperties: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 8,
  });

  const [filters, setFilters] = useState({
    location: "",
    date: null,
    price: "",
    searchQuery: "",
  });

  const fetchProperties = useCallback(
    async (page = propertiesData.currentPage, updatedFilters = filters) => {
      const { location, date, price, searchQuery } = updatedFilters;
      const endpoint = role === "Host" ? "/properties/host" : "/properties";

      try {
        const response = await api.get(endpoint, {
          params: {
            page,
            location,
            date,
            price,
            search: searchQuery,
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
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPropertiesData((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="container mx-auto p-6">
      <PropertyFilters onFilterChange={handleFilterChange} />

      <Row gutter={[24, 24]} className="mt-6">
        {propertiesData.properties.map((property) => (
          <Col key={property.id} xs={24} sm={12} md={8} lg={6}>
            <PropertyCard
              property={property}
              role={role}
              onUpdate={fetchProperties}
            />
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
    </div>
  );
};

PropertyList.propTypes = {
  role: PropTypes.string,
};

export default PropertyList;
