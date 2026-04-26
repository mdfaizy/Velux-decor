import React, { useEffect, useState } from "react";
import { getProductsApi, deleteProductApi, toggleProductApi } from "../../services/productApi";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/Table";

import Modal from "../../components/ui/Modal";
import EditProductForm from "./EditProductForm";
import ProductViewModal from "./ProductViewModal";

// 🔥 Added Lucide Icons
import { Search, Eye, Edit2, Trash2, PackageSearch, Loader2, Image as ImageIcon } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const navigate = useNavigate();

  // 🔥 FETCH
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsApi();
      const data = res.data || [];
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 SEARCH
  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, products]);

  // 🔥 ACTIONS
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await deleteProductApi(id);
    fetchProducts();
  };

  const handleToggle = async (id: string, status: boolean) => {
    await toggleProductApi(id, !status);
    fetchProducts();
  };

  const handleView = (product: any) => {
    setSelectedProduct(product);
    setViewModal(true);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      {/* 🔥 HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-sm text-gray-500 mt-1">View, edit, and manage your products.</p>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-72 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 🔥 TABLE WRAPPER */}
      {/* 🔥 TABLE WRAPPER */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

        {/* 📱 MOBILE VIEW (CARD) */}
        <div className="block md:hidden p-4 space-y-4">

          {loading ? (
            <div className="text-center py-10">
              <Loader2 className="animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <div key={product._id} className="border rounded-xl p-4 shadow-sm">

                <div className="flex gap-3">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      className="w-16 h-16 rounded object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
                      <ImageIcon size={20} />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      ₹{product.price}
                    </p>

                    <p className="text-xs text-gray-400">
                      {product.category?.name || "No category"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">

                  {/* STATUS */}
                  <button
                    onClick={() => handleToggle(product._id, product.isAvailable)}
                    className={`text-xs px-2 py-1 rounded ${product.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {product.isAvailable ? "Active" : "Hidden"}
                  </button>

                  {/* ACTIONS (SAME LOGIC) */}
                  <div className="flex gap-3">
                    <button onClick={() => handleView(product)}>
                      <Eye size={18} />
                    </button>

                    <button onClick={() => handleEdit(product)}>
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products</p>
          )}

        </div>

        {/* 💻 DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[900px]">

            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableCell isHeader>#</TableCell>
                  <TableCell isHeader>Image</TableCell>
                  <TableCell isHeader>Name</TableCell>
                  <TableCell isHeader className="hidden sm:table-cell">Category</TableCell>
                  <TableCell isHeader>Price</TableCell>
                  <TableCell isHeader className="hidden lg:table-cell">Stock</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Actions</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((product, index) => (
                  <TableRow key={product._id}>

                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          className="w-10 h-10 rounded"
                        />
                      ) : (
                        <ImageIcon />
                      )}
                    </TableCell>

                    <TableCell>{product.name}</TableCell>

                    <TableCell className="hidden sm:table-cell">
                      {product.category?.name || "N/A"}
                    </TableCell>

                    <TableCell>₹{product.price}</TableCell>

                    <TableCell className="hidden lg:table-cell">
                      {product.stock}
                    </TableCell>

                    <TableCell>
                      <button
                        onClick={() => handleToggle(product._id, product.isAvailable)}
                      >
                        {product.isAvailable ? "Active" : "Hidden"}
                      </button>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <button onClick={() => handleView(product)}>
                          <Eye size={16} />
                        </button>

                        <button onClick={() => handleEdit(product)}>
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>

          </div>
        </div>

      </div>

      {/* VIEW MODAL */}
      <ProductViewModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        product={selectedProduct}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
          setSelectedProduct(null);
        }}
        title="Edit Product"
      >
        {editModal && selectedProduct && (
          <EditProductForm
            product={selectedProduct}
            onClose={() => {
              setEditModal(false);
              setSelectedProduct(null);
              fetchProducts();
            }}
          />
        )}
      </Modal>

    </div>
  );
};

export default ProductList;