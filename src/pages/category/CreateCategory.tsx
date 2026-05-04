// import React, { useState } from "react";
// import Form from "../../components/ui/Form";
// import Button from "../../components/ui/Button";
// import { createCategoryApi } from "../../services/categoryApi";

// const CreateCategory = () => {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!name) return alert("Name required");

//     try {
//       setLoading(true);
//       await createCategoryApi({ name });
//       alert("Created ✅");
//       setName("");
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

//       <h2 className="text-xl font-semibold mb-4">Create Category</h2>

//       <Form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Category Name"
//           className="w-full border p-3 rounded-lg"
//         />

//         <Button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Category"}
//         </Button>

//       </Form>
//     </div>
//   );
// };

// export default CreateCategory;

// import React, { useState } from "react";
// import Button from "../../components/ui/Button";
// import { createCategoryApi } from "../../services/categoryApi";

// const CreateCategory = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     badge: "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [icon, setIcon] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔥 FIXED SUBMIT
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // ✅ MOST IMPORTANT

//     if (!formData.name) {
//       alert("Name required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("description", formData.description);
//       data.append("badge", formData.badge);

//       if (image) data.append("image", image);
//       if (icon) data.append("icon", icon);

//       // 🔥 DEBUG (optional)
//       console.log([...data.entries()]);

//       await createCategoryApi(data);

//       alert("Category Created ✅");

//       // reset
//       setFormData({ name: "", description: "", badge: "" });
//       setImage(null);
//       setIcon(null);

//     } catch (err) {
//       console.log(err);
//       alert("Error ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

//       <h2 className="text-xl font-semibold mb-4">
//         Create Category
//       </h2>

//       {/* ✅ USE NORMAL FORM */}
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* NAME */}
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Category Name"
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* DESCRIPTION */}
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* BADGE */}
//         <input
//           name="badge"
//           value={formData.badge}
//           onChange={handleChange}
//           placeholder="Badge (e.g. Most Popular)"
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* IMAGE */}
//         <div>
//           <label className="text-sm font-medium">Banner Image</label>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//         </div>

//         {/* ICON */}
//         <div>
//           <label className="text-sm font-medium">Icon</label>
//           <input
//             type="file"
//             onChange={(e) => setIcon(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//         </div>

//         <Button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Category"}
//         </Button>

//       </form>
//     </div>
//   );
// };

// export default CreateCategory;



import React, { useState } from "react";

import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import { createCategoryApi } from "../../services/categoryApi";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    badge: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);

  // 🔥 preview states
  const [imagePreview, setImagePreview] = useState("");
  const [iconPreview, setIconPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 IMAGE HANDLER
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // 🔥 ICON HANDLER
  const handleIconChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setIcon(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

   if (!formData.name) {
    toast.warning("Category name is required ⚠️");
    return;
  }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("badge", formData.badge);

      if (image) data.append("image", image);
      if (icon) data.append("icon", icon);

      await createCategoryApi(data);

     toast.success("Category Created Successfully ✅");

      // reset
      setFormData({ name: "", description: "", badge: "" });
      setImage(null);
      setIcon(null);
      setImagePreview("");
      setIconPreview("");

    } catch (err) {
     console.log(err);
    toast.error("Failed to create category ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow border">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Create Category
        </h2>
        <p className="text-gray-500 text-sm">
          Add category with banner and icon
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
         <div className="space-y-5">

  {/* NAME */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      Category Name <span className="text-red-500">*</span>
    </label>
    <input
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter category name"
      className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  {/* DESCRIPTION */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      Description
    </label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Enter description"
      className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  {/* BADGE */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      Badge
    </label>
    <input
      name="badge"
      value={formData.badge}
      onChange={handleChange}
      placeholder="e.g. Trending / New / Popular"
      className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

</div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* 🔥 IMAGE */}
            <div>
              <label className="text-sm font-medium">Banner Image</label>

              <div className="mt-2 border-2 border-dashed p-4 rounded-xl text-center">

                {!imagePreview ? (
                  <>
                    <p className="text-sm text-gray-500">Upload Banner</p>
                    <input type="file" onChange={handleImageChange} />
                  </>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 🔥 ICON */}
            <div>
              <label className="text-sm font-medium">Icon</label>

              <div className="mt-2 border-2 border-dashed p-4 rounded-xl text-center">

                {!iconPreview ? (
                  <>
                    <p className="text-sm text-gray-500">Upload Icon</p>
                    <input type="file" onChange={handleIconChange} />
                  </>
                ) : (
                  <div className="relative flex justify-center">
                    <img
                      src={iconPreview}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIcon(null);
                        setIconPreview("");
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default CreateCategory;