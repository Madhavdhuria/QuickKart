import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, id, name, description, price, stock }) => {
  const truncatedDescription =
    description.length > 60 ? description.slice(0, 57) + "..." : description;

    const navigate=useNavigate()

  return (
    <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden mr-4 cursor-pointer" onClick={()=>{navigate(`/product/${id}`);
    }}>
      <img
        src={image || "/placeholder.png"}
        alt={name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <p className="text-sm text-gray-500">{truncatedDescription}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-green-600 font-bold text-md">₹{price}</p>
          <span className="text-xs text-gray-400">Stock: {stock}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
