import { useEffect, useState } from "react";
import api from "../utils/api";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import { Row, Col, Pagination } from "antd";

const Home = () => {
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

  useEffect(() => {
    fetchProperties(propertiesData.currentPage, filters);
  }, [propertiesData.currentPage, filters]);

  const fetchProperties = (page, filters) => {
    const { location, date, price, searchQuery } = filters;
    api
      .get(`/properties`, {
        params: {
          page,
          location,
          date,
          price,
          search: searchQuery,
          limit: 8,
        },
      })
      .then((response) => {
        setPropertiesData(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handlePageChange = (page) => {
    setPropertiesData((prevData) => ({
      ...prevData,
      currentPage: page,
    }));
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
            <PropertyCard property={property} />
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

export default Home;
