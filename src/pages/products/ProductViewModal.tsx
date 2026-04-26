import React from "react";
import Modal from "../../components/ui/Modal";

const ProductViewModal = ({ isOpen, onClose, product }: any) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details">

      <div className="space-y-5">

        {/* 🔥 IMAGES */}
        <div className="grid grid-cols-3 gap-3">
          {product.images?.length > 0 ? (
            product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="w-full h-24 object-cover rounded-lg border"
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-3 text-center">
              No Images
            </p>
          )}
        </div>

        {/* 🔥 DETAILS */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{product.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">
              {product.category?.name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-medium text-blue-600">
              ₹{product.price}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Stock</p>
            <p className="font-medium">{product.stock}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p
              className={`font-medium ${
                product.isAvailable
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.isAvailable ? "Active" : "Inactive"}
            </p>
          </div>

        </div>

        {/* 🔥 DESCRIPTION */}
        <div>
          <p className="text-gray-500 text-sm">Description</p>
          <p className="text-gray-700 text-sm mt-1">
            {product.description}
          </p>
        </div>

      </div>

    </Modal>
  );
};

export default ProductViewModal;