const Filters = ({
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  categories,
}) => {
  return (
    <aside className="w-64 p-4 border-r bg-gray-100">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Max Price</label>
        <input
          type="range"
          min={0}
          max={50000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">Up to ₹{maxPrice}</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          className="w-full border rounded p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default Filters;
