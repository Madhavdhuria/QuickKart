import { ShoppingCart } from "lucide-react";

const ProductCard = ({ image, name, description, price, stock }) => {
  const truncatedDescription =
    description.length > 60 ? description.slice(0, 57) + "..." : description;

  return (
    <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden mr-4">
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
        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md text-sm flex items-center justify-center gap-1">
          <ShoppingCart className="w-4 h-4 cursor-pointer" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
