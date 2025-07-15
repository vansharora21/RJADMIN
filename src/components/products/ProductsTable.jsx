import { motion } from "framer-motion";
import { Edit, Search, Trash2, Store, MapPin } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
  { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
  { id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
  { id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
  { id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
];

const RETAILER_DATA = [
  { 
    id: 1, 
    name: "TechHub Store", 
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    totalSales: 15420,
    monthlyRevenue: 89500,
    productsCount: 245,
    status: "Active"
  },
  { 
    id: 2, 
    name: "Fashion Forward", 
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center",
    totalSales: 12800,
    monthlyRevenue: 67200,
    productsCount: 189,
    status: "Active"
  },
  { 
    id: 3, 
    name: "Home Essentials", 
    logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center",
    totalSales: 9650,
    monthlyRevenue: 45300,
    productsCount: 156,
    status: "Inactive"
  },
  { 
    id: 4, 
    name: "Sports Zone", 
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
    totalSales: 18200,
    monthlyRevenue: 92100,
    productsCount: 312,
    status: "Active"
  },
];

const RETAILER_DETAILS = [
  {
    id: 1,
    name: "TechHub Store",
    email: "contact@techhub.com",
    phone: "+1-555-0123",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    joinDate: "2023-01-15",
    category: "Electronics",
    rating: 4.8
  },
  {
    id: 2,
    name: "Fashion Forward",
    email: "info@fashionforward.com",
    phone: "+1-555-0456",
    address: "456 Fashion Ave, New York, NY 10001",
    joinDate: "2023-03-22",
    category: "Fashion & Accessories",
    rating: 4.6
  },
  {
    id: 3,
    name: "Home Essentials",
    email: "support@homeessentials.com",
    phone: "+1-555-0789",
    address: "789 Home Blvd, Austin, TX 73301",
    joinDate: "2023-02-10",
    category: "Home & Garden",
    rating: 4.3
  },
  {
    id: 4,
    name: "Sports Zone",
    email: "hello@sportszone.com",
    phone: "+1-555-0321",
    address: "321 Sports Way, Denver, CO 80202",
    joinDate: "2022-11-08",
    category: "Sports & Fitness",
    rating: 4.9
  },
];

const ProductsTable = () => {
  const [products, setProducts] = useState(PRODUCT_DATA);
  const [retailers, setRetailers] = useState(RETAILER_DATA);
  const [retailerDetails, setRetailerDetails] = useState(RETAILER_DETAILS);
  const [searchTerm, setSearchTerm] = useState("");
  const [retailerSearchTerm, setRetailerSearchTerm] = useState("");
  const [detailsSearchTerm, setDetailsSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleRetailerSearch = (e) => {
    setRetailerSearchTerm(e.target.value.toLowerCase());
  };

  const handleDetailsSearch = (e) => {
    setDetailsSearchTerm(e.target.value.toLowerCase());
  };

  const handleEdit = (productId) => {
    const newProductName = prompt("Enter new product name:");
    if (!newProductName) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, name: newProductName } : product
      )
    );
  };

  const handleDelete = (productId) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    }
  };

  const handleRetailerEdit = (retailerId) => {
    const newRetailerName = prompt("Enter new retailer name:");
    if (!newRetailerName) return;
    setRetailers((prev) =>
      prev.map((retailer) =>
        retailer.id === retailerId ? { ...retailer, name: newRetailerName } : retailer
      )
    );
  };

  const handleRetailerDelete = (retailerId) => {
    const confirmDelete = confirm("Are you sure you want to delete this retailer?");
    if (confirmDelete) {
      setRetailers((prev) => prev.filter((retailer) => retailer.id !== retailerId));
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  const filteredRetailers = retailers.filter(
    (retailer) =>
      retailer.name.toLowerCase().includes(retailerSearchTerm) ||
      retailer.status.toLowerCase().includes(retailerSearchTerm)
  );

  const filteredRetailerDetails = retailerDetails.filter(
    (retailer) =>
      retailer.name.toLowerCase().includes(detailsSearchTerm) ||
      retailer.category.toLowerCase().includes(detailsSearchTerm) ||
      retailer.email.toLowerCase().includes(detailsSearchTerm)
  );

  return (
    <div className="space-y-8">
      {/* Products Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                        alt="Product img"
                        className="size-10 rounded-full"
                      />
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Retailers Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <Store size={24} />
            Retailers Sales Overview
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search retailers..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleRetailerSearch}
              value={retailerSearchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Retailer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Monthly Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRetailers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">No retailers found.</td>
                </tr>
              ) : (
                filteredRetailers.map((retailer) => (
                  <motion.tr
                    key={retailer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-3 items-center">
                      <img
                        src={retailer.logo}
                        alt={`${retailer.name} logo`}
                        className="size-10 rounded-full object-cover"
                      />
                      {retailer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {retailer.totalSales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${retailer.monthlyRevenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {retailer.productsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        retailer.status === 'Active' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {retailer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => handleRetailerEdit(retailer.id)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleRetailerDelete(retailer.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Retailer Details Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <MapPin size={24} />
            Retailer Details
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search retailer details..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleDetailsSearch}
              value={detailsSearchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRetailerDetails.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">No retailer details found.</td>
                </tr>
              ) : (
                filteredRetailerDetails.map((retailer) => (
                  <motion.tr
                    key={retailer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {retailer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="space-y-1">
                        <div>{retailer.email}</div>
                        <div className="text-xs text-gray-400">{retailer.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                      <div className="truncate" title={retailer.address}>
                        {retailer.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {retailer.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(retailer.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{retailer.rating}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsTable;
