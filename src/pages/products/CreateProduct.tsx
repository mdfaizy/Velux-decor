// import React, { useEffect, useState } from "react";
// import { getCategoriesApi } from "../../services/categoryApi";
// import { createProductApi } from "../../services/productApi";

// const CreateProduct = () => {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     stock: "",
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [images, setImages] = useState<File[]>([]);
//   const [preview, setPreview] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔥 Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await getCategoriesApi();
//       setCategories(res.data || []);
//     };
//     fetchCategories();
//   }, []);

//   // 🔥 Cleanup (memory leak fix)
//   useEffect(() => {
//     return () => {
//       preview.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [preview]);

//   // 🔥 Handle Input
//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔥 Handle Image Upload
//   const handleImageChange = (e: any) => {
//     const files = Array.from(e.target.files) as File[];

//     // prevent duplicate images
//     const newFiles = files.filter(
//       (file) => !images.some((img) => img.name === file.name)
//     );

//     setImages((prev) => [...prev, ...newFiles]);

//     const previewUrls = newFiles.map((file) =>
//       URL.createObjectURL(file)
//     );

//     setPreview((prev) => [...prev, ...previewUrls]);
//   };

//   // 🔥 Remove Image
//   const removeImage = (index: number) => {
//     const newImages = [...images];
//     const newPreview = [...preview];

//     newImages.splice(index, 1);
//     newPreview.splice(index, 1);

//     setImages(newImages);
//     setPreview(newPreview);
//   };

//   // 🔥 Submit
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!form.name || !form.price || !form.category) {
//       return alert("All fields required");
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       Object.entries(form).forEach(([key, value]) => {
//         formData.append(key, value as string);
//       });

//       images.forEach((img) => {
//         formData.append("image", img);
//       });

//       await createProductApi(formData);

//       alert("Product Created ✅");

//       // reset
//       setForm({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         stock: "",
//       });
//       setImages([]);
//       setPreview([]);

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

//       <h2 className="text-2xl font-bold mb-6">Create Product</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">

//         {/* Name */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
//         />

//         {/* Price + Stock */}
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={form.price}
//             onChange={handleChange}
//             className="border p-3 rounded-lg"
//           />

//           <input
//             type="number"
//             name="stock"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={handleChange}
//             className="border p-3 rounded-lg"
//           />
//         </div>

//         {/* Category */}
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg"
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat: any) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* 🔥 IMAGE UPLOAD */}
//         <div className="space-y-3">
//           <label className="block text-sm font-semibold text-gray-700">
//             Product Images
//           </label>

//           <label className="cursor-pointer bg-gray-100 border border-dashed border-gray-400 px-4 py-6 rounded-lg flex flex-col items-center justify-center hover:bg-gray-200 transition">
//             <span className="text-sm text-gray-600">
//               Click to upload images
//             </span>
//             <input
//               type="file"
//               multiple
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>

//           {/* Preview */}
//           <div className="flex flex-wrap gap-3">
//             {preview.map((img, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={img}
//                   className="w-20 h-20 object-cover rounded-lg border"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>

//           <p className="text-xs text-gray-400">
//             Upload multiple images (PNG, JPG)
//           </p>
//         </div>

//         {/* Submit */}
//         <button
//           disabled={loading}
//           className={`w-full py-3 rounded-lg text-white font-semibold ${
//             loading
//               ? "bg-gray-400"
//               : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading ? "Creating..." : "Create Product"}
//         </button>

//       </form>
//     </div>
//   );
// };

// export default CreateProduct;


import React, { useEffect, useState } from "react";
import { getCategoriesApi } from "../../services/categoryApi";
import { createProductApi } from "../../services/productApi";

import Form from "../../components/ui/Form";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
     features: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch categories
  useEffect(() => {
    const fetch = async () => {
      const res = await getCategoriesApi();
      setCategories(res.data || []);
    };
    fetch();
  }, []);

  // 🔥 Cleanup
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  // 🔥 Handle change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Image upload
  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files) as File[];

    setImages((prev) => [...prev, ...files]);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    const img = [...images];
    const prev = [...preview];

    img.splice(index, 1);
    prev.splice(index, 1);

    setImages(img);
    setPreview(prev);
  };

  // 🔥 Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        formData.append(k, v as string);
      });
formData.append(
  "features",
  JSON.stringify(form.features.split(","))
);
      images.forEach((img) => {
  formData.append("image", img); // keep same key
});

      await createProductApi(formData);

      alert("Product Created ✅");

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
         features: "",
      });
    

      setImages([]);
      setPreview([]);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Product</h2>
        <p className="text-gray-500 text-sm">
          Add new product to catalog
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-5">

        {/* NAME */}
        <Input
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Enter stock"
          />
        </div>

        {/* CATEGORY */}
        <Select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={categories.map((c: any) => ({
            label: c.name,
            value: c._id,
          }))}
        />
<Input
  label="Features (comma separated)"
  name="features"
  value={form.features || ""}
  onChange={handleChange}
  placeholder="e.g. Waterproof, Durable, Premium"
/>
        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write description..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Product Images
          </label>

          <label className="cursor-pointer border border-dashed border-gray-400 p-6 rounded-lg flex flex-col items-center hover:bg-gray-50">
            <span className="text-gray-500 text-sm">
              Click to upload
            </span>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* PREVIEW */}
          <div className="flex flex-wrap gap-3">
            {preview.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img}
                  className="w-20 h-20 rounded-lg object-cover border"
                />

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <Button type="submit" loading={loading}>
          Create Product
        </Button>

      </Form>
    </div>
  );
};

export default CreateProduct;