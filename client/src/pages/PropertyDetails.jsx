import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then((response) => setProperty(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p className="text-gray-700 mb-4">{property.description}</p>
      <p className="text-lg font-semibold">${property.price_per_night} $ / night</p>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
        Book Now
      </button>
    </div>
  );
};

export default PropertyDetails;