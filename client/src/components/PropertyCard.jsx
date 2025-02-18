import PropTypes from "prop-types";

const PropertyCard = ({ property }) => {
  return (
    <div
      className="w-full overflow-hidden"
    >
      <img
        alt={property.title}
        src={property.imageUrl}
        className="w-full h-56 object-cover rounded-lg"
      />

      <div className="mt-3 px-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{property.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{property.location}</p>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{property.description}</p>
        <p className="text-gray-900 mt-1">${property.pricePerNight} night</p>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    pricePerNight: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default PropertyCard;
