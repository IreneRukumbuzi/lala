import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((response) => setProperty(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!property) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-lg mt-6">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-72 object-cover rounded-lg"
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4">{property.title}</h1>
      <p className="text-gray-700 text-sm md:text-base mt-2">{property.location}</p>
      <p className="text-gray-600 text-base mt-3">{property.description}</p>
      <p className="text-lg md:text-xl font-semibold text-gray-900 mt-3">
        ${property.pricePerNight} / night
      </p>
    </div>
  );
};

export default PropertyDetails;
