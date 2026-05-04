// import React, { useState } from "react";
// import { updateProductApi } from "../../services/productApi";

// const EditProductForm = ({ product, onClose }: any) => {
//   const [form, setForm] = useState({
//     name: product.name,
//     price: product.price,
//     stock: product.stock,
//     description: product.description,
//   });

//   // 🔥 existing images
//   const [existingImages, setExistingImages] = useState<string[]>(
//     product.images || []
//   );

//   // 🔥 new images
//   const [newImages, setNewImages] = useState<File[]>([]);

//   // 🔄 INPUT CHANGE
//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🖼 ADD NEW IMAGE
//  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (!e.target.files) return;

//   const files = Array.from(e.target.files) as File[]; // ✅ FIX

//   setNewImages((prev) => [...prev, ...files]);
// };

//   // ❌ REMOVE OLD IMAGE
//   const removeExistingImage = (index: number) => {
//     const updated = [...existingImages];
//     updated.splice(index, 1);
//     setExistingImages(updated);
//   };

//   // ❌ REMOVE NEW IMAGE
//   const removeNewImage = (index: number) => {
//     const updated = [...newImages];
//     updated.splice(index, 1);
//     setNewImages(updated);
//   };

//   // 🚀 SUBMIT
//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("name", form.name);
//       formData.append("price", form.price);
//       formData.append("stock", form.stock);
//       formData.append("description", form.description);

//       // 🔥 existing images (important)
//       formData.append("existingImages", JSON.stringify(existingImages));

//       // 🔥 new images
//       newImages.forEach((img) => {
//         formData.append("image", img);
//       });

//       await updateProductApi(product._id, formData);

//       alert("Product Updated ✅");
//       onClose();

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="space-y-4">

//       {/* 🔥 INPUTS */}
//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Product Name"
//         className="w-full border p-2 rounded"
//       />

//       <input
//         name="price"
//         type="number"
//         value={form.price}
//         onChange={handleChange}
//         placeholder="Price"
//         className="w-full border p-2 rounded"
//       />

//       <input
//         name="stock"
//         type="number"
//         value={form.stock}
//         onChange={handleChange}
//         placeholder="Stock"
//         className="w-full border p-2 rounded"
//       />

//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         placeholder="Description"
//         className="w-full border p-2 rounded"
//       />

//       {/* 🔥 EXISTING IMAGES */}
//       <div>
//         <p className="text-sm font-medium mb-2">Existing Images</p>
//         <div className="flex gap-2 flex-wrap">
//           {existingImages.map((img, i) => (
//             <div key={i} className="relative">
//               <img
//                 src={img}
//                 className="w-16 h-16 rounded object-cover border"
//               />
//               <button
//                 onClick={() => removeExistingImage(i)}
//                 className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔥 NEW IMAGE UPLOAD */}
//       <div>
//         <p className="text-sm font-medium mb-2">Add New Images</p>

//         <input
//           type="file"
//           multiple
//           onChange={handleImageChange}
//           className="w-full"
//         />

//         {/* preview */}
//         <div className="flex gap-2 flex-wrap mt-2">
//           {newImages.map((img, i) => (
//             <div key={i} className="relative">
//               <img
//                 src={URL.createObjectURL(img)}
//                 className="w-16 h-16 rounded object-cover border"
//               />
//               <button
//                 onClick={() => removeNewImage(i)}
//                 className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔥 BUTTON */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//       >
//         Update Product
//       </button>

//     </div>
//   );
// };

// export default EditProductForm;


import React, { useEffect, useState } from "react";
import { updateProductApi } from "../../services/productApi";
import { getCategoriesApi } from "../../services/categoryApi";
import apiConnector from "../../services/apiConnector";
import { toast } from "react-toastify";

const EditProductForm = ({ product, onClose }: any) => {

  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description,
    category: product.category?._id || "",
    subCategory: product.subCategory?._id || "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  const [existingImages, setExistingImages] = useState<string[]>(
    product.images || []
  );

  const [newImages, setNewImages] = useState<File[]>([]);

  // 🔥 Load Categories
  useEffect(() => {
    const fetch = async () => {
      const res = await getCategoriesApi();
      setCategories(res.data || []);
    };
    fetch();
  }, []);

  // 🔥 Load SubCategories
  useEffect(() => {
    if (!form.category) return;

    const fetchSub = async () => {
      const res = await apiConnector.get(
        `/subcategory/category/${form.category}`
      );
      setSubCategories(res.data.data || []);
    };

    fetchSub();
  }, [form.category]);

  // 🔄 INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼 NEW IMAGE
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files) as File[]; // ✅ FIX

  setNewImages((prev) => [...prev, ...files]);
};

  const removeExistingImage = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const removeNewImage = (index: number) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        formData.append(k, v as string);
      });

      formData.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((img) => {
        formData.append("image", img);
      });

      await updateProductApi(product._id, formData);

      toast.success("Product Updated ✅");
      onClose();

    } catch (err) {
      console.log(err);
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl space-y-5">

      <h2 className="text-lg font-semibold">Edit Product</h2>

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border px-3 py-2 rounded"
      />

      {/* PRICE + STOCK */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border px-3 py-2 rounded"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* CATEGORY */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SUBCATEGORY */}
      <select
        name="subCategory"
        value={form.subCategory}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select SubCategory</option>
        {subCategories.map((s: any) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border px-3 py-2 rounded"
      />

      {/* EXISTING IMAGES */}
      <div>
        <p className="text-sm font-medium mb-2">Existing Images</p>
        <div className="flex gap-2 flex-wrap">
          {existingImages.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-16 h-16 rounded" />
              <button
                onClick={() => removeExistingImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* NEW IMAGES */}
      <div>
        <input type="file" multiple onChange={handleImageChange} />

        <div className="flex gap-2 mt-2 flex-wrap">
          {newImages.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={URL.createObjectURL(img)}
                className="w-16 h-16 rounded"
              />
              <button
                onClick={() => removeNewImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Update Product
      </button>

    </div>
  );
};

export default EditProductForm;