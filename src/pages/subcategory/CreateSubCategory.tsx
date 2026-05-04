// import React, { useEffect, useState } from "react";
// import { getCategoriesApi } from "../../services/categoryApi";
// import { createSubCategoryApi } from "../../services/subCategoryApi";

// import Form from "../../components/ui/Form";
// import Input from "../../components/ui/Input";
// import Select from "../../components/ui/Select";
// import Button from "../../components/ui/Button";

// const CreateSubCategory = () => {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     description: "",
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Load categories
//   useEffect(() => {
//     const fetch = async () => {
//       const res = await getCategoriesApi();
//       setCategories(res.data || []);
//     };
//     fetch();
//   }, []);

//   // ✅ Handle input
//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle image
//   const handleImageChange = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // ✅ Submit
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("name", form.name);
//       formData.append("category", form.category); // 🔥 IMPORTANT (ObjectId)
//       formData.append("description", form.description);

//       if (image) {
//         formData.append("image", image);
//       }

//       await createSubCategoryApi(formData);

//       alert("SubCategory Created ✅");

//       setForm({
//         name: "",
//         category: "",
//         description: "",
//       });

//       setImage(null);
//       setPreview("");

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

//       <h2 className="text-2xl font-bold mb-6">Create SubCategory</h2>

//       <Form onSubmit={handleSubmit} className="space-y-5">

//         {/* NAME */}
//         <Input
//           label="SubCategory Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Enter name"
//         />

//         {/* CATEGORY SELECT */}
//         <Select
//           label="Category"
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           options={categories.map((c: any) => ({
//             label: c.name,
//             value: c._id, // 🔥 IMPORTANT
//           }))}
//         />

//         {/* DESCRIPTION */}
//         <Input
//           label="Description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Enter description"
//         />

//         {/* IMAGE */}
//         <div>
//           <label className="text-sm font-medium">Image</label>

//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="mt-2"
//           />

//           {preview && (
//             <img
//               src={preview}
//               className="w-24 h-24 mt-3 rounded-lg object-cover"
//             />
//           )}
//         </div>

//         {/* SUBMIT */}
//         <Button type="submit" loading={loading}>
//           Create SubCategory
//         </Button>

//       </Form>
//     </div>
//   );
// };

// export default CreateSubCategory;

import React, { useEffect, useState } from "react";
import { getCategoriesApi } from "../../services/categoryApi";
import { createSubCategoryApi } from "../../services/subCategoryApi";

const CreateSubCategory = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCategoriesApi();
      setCategories(res.data || []);
    };
    fetch();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);

      if (image) formData.append("image", image);

      await createSubCategoryApi(formData);

      alert("SubCategory Created ✅");

      setForm({ name: "", category: "", description: "" });
      setImage(null);
      setPreview("");

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md border">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Create SubCategory
        </h2>
        <p className="text-gray-500 text-sm">
          Add a new subcategory with image and details
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium">SubCategory Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div>

            <label className="text-sm font-medium">Upload Image</label>

            <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-400 transition">

              {!preview ? (
                <>
                  <p className="text-gray-500 text-sm">
                    Click to upload or drag & drop
                  </p>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mt-3"
                  />
                </>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    className="w-full h-52 object-cover rounded-lg"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview("");
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* 🔥 BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create SubCategory"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateSubCategory;