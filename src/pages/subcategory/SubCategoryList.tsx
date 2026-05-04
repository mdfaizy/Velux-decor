// import React, { useEffect, useState } from "react";
// import {
//   getSubCategoriesApi,
//   deleteSubCategoryApi,
//   toggleSubCategoryApi,
// } from "../../services/subCategoryApi";

// import Button from "../../components/ui/Button";

// const SubCategoryList = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔥 Fetch SubCategories
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await getSubCategoriesApi();
//       setData(res.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔥 DELETE
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Delete this subcategory?")) return;

//     try {
//       await deleteSubCategoryApi(id);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 TOGGLE STATUS
//   const handleToggle = async (id: string, current: boolean) => {
//     try {
//       await toggleSubCategoryApi(id, !current);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     // <div className="p-6 bg-white rounded-2xl shadow">
      
//     //   {/* HEADER */}
//     //   <div className="flex justify-between items-center mb-6">
//     //     <h2 className="text-xl font-bold">Sub Categories</h2>

//     //     <Button onClick={() => (window.location.href = "/admin/subcategory")}>
//     //       + Add SubCategory
//     //     </Button>
//     //   </div>

//     //   {/* LOADING */}
//     //   {loading ? (
//     //     <p>Loading...</p>
//     //   ) : (
//     //     <div className="overflow-x-auto">
//     //       <table className="w-full border text-sm">

//     //         <thead className="bg-gray-100">
//     //           <tr>
//     //             <th className="p-3 text-left">#</th>
//     //             <th className="p-3 text-left">Image</th>
//     //             <th className="p-3 text-left">Name</th>
//     //             <th className="p-3 text-left">Category</th>
//     //             <th className="p-3 text-left">Status</th>
//     //             <th className="p-3 text-left">Actions</th>
//     //           </tr>
//     //         </thead>

//     //         <tbody>
//     //           {data.length === 0 ? (
//     //             <tr>
//     //               <td colSpan={6} className="text-center p-4">
//     //                 No Data Found
//     //               </td>
//     //             </tr>
//     //           ) : (
//     //             data.map((item, index) => (
//     //               <tr key={item._id} className="border-t">

//     //                 <td className="p-3">{index + 1}</td>

//     //                 {/* IMAGE */}
//     //                 <td className="p-3">
//     //                   {item.image ? (
//     //                     <img
//     //                       src={item.image}
//     //                       className="w-12 h-12 rounded object-cover"
//     //                     />
//     //                   ) : (
//     //                     <span className="text-gray-400">No Image</span>
//     //                   )}
//     //                 </td>

//     //                 {/* NAME */}
//     //                 <td className="p-3 font-medium">{item.name}</td>

//     //                 {/* CATEGORY */}
//     //                 <td className="p-3">
//     //                   {item.category?.name || "N/A"}
//     //                 </td>

//     //                 {/* STATUS */}
//     //                 <td className="p-3">
//     //                   <button
//     //                     onClick={() =>
//     //                       handleToggle(item._id, item.isActive)
//     //                     }
//     //                     className={`px-3 py-1 rounded text-white text-xs ${
//     //                       item.isActive
//     //                         ? "bg-green-500"
//     //                         : "bg-red-500"
//     //                     }`}
//     //                   >
//     //                     {item.isActive ? "Active" : "Inactive"}
//     //                   </button>
//     //                 </td>

//     //                 {/* ACTIONS */}
//     //                 <td className="p-3 flex gap-2">
//     //                   <Button
//     //                     onClick={() =>
//     //                       (window.location.href = `/admin/subcategory?id=${item._id}`)
//     //                     }
//     //                   >
//     //                     Edit
//     //                   </Button>

//     //                   <Button
//     //                     variant="danger"
//     //                     onClick={() => handleDelete(item._id)}
//     //                   >
//     //                     Delete
//     //                   </Button>
//     //                 </td>

//     //               </tr>
//     //             ))
//     //           )}
//     //         </tbody>

//     //       </table>
//     //     </div>
//     //   )}
//     // </div>

//     <div className="p-6 bg-gray-100 min-h-screen">

//   {/* 🔥 HEADER */}
//   <div className="flex justify-between items-center mb-6">
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800">
//         Sub Category Management
//       </h1>
//       <p className="text-sm text-gray-500">
//         Manage all sub categories
//       </p>
//     </div>

//     <Button
//       onClick={() => (window.location.href = "/admin/subcategory")}
//       className="bg-blue-600 hover:bg-blue-700"
//     >
//       + Add SubCategory
//     </Button>
//   </div>

//   {/* 🔍 SEARCH */}
//   <div className="bg-white p-4 rounded-xl shadow mb-4">
//     <input
//       type="text"
//       placeholder="Search subcategory..."
//       className="w-full max-w-sm border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//     />
//   </div>

//   {/* 📦 TABLE CARD */}
//   <div className="bg-white rounded-xl shadow overflow-hidden">

//     <div className="overflow-x-auto">

//       <table className="w-full text-sm">

//         {/* HEADER */}
//         <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//           <tr>
//             <th className="px-4 py-3 text-left">#</th>
//             <th className="px-4 py-3 text-left">SubCategory</th>
//             <th className="px-4 py-3 text-left">Category</th>
//             <th className="px-4 py-3 text-left">Status</th>
//             <th className="px-4 py-3 text-right">Actions</th>
//           </tr>
//         </thead>

//         {/* BODY */}
//         <tbody>

//           {data.map((item, index) => (
//             <tr
//               key={item._id}
//               className="border-t hover:bg-gray-50 transition"
//             >

//               <td className="px-4 py-3">{index + 1}</td>

//               {/* SUBCATEGORY */}
//               <td className="px-4 py-3">
//                 <div className="flex items-center gap-3">

//                   {item.image ? (
//                     <img
//                       src={item.image}
//                       className="w-10 h-10 rounded-lg object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 bg-gray-200 rounded-lg" />
//                   )}

//                   <div>
//                     <p className="font-medium text-gray-800">
//                       {item.name}
//                     </p>
//                   </div>

//                 </div>
//               </td>

//               {/* CATEGORY */}
//               <td className="px-4 py-3 text-gray-600">
//                 {item.category?.name || "N/A"}
//               </td>

//               {/* STATUS */}
//               <td className="px-4 py-3">
//                 <button
//                   onClick={() =>
//                     handleToggle(item._id, item.isActive)
//                   }
//                   className={`px-3 py-1 text-xs rounded-full font-medium ${
//                     item.isActive
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {item.isActive ? "Active" : "Inactive"}
//                 </button>
//               </td>

//               {/* ACTION */}
//               <td className="px-4 py-3 text-right space-x-2">

//                 <button
//                   onClick={() =>
//                     (window.location.href = `/admin/subcategory?id=${item._id}`)
//                   }
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="text-red-600 hover:underline text-sm"
//                 >
//                   Delete
//                 </button>

//               </td>

//             </tr>
//           ))}

//         </tbody>
//       </table>
//     </div>

//     {/* EMPTY */}
//     {data.length === 0 && !loading && (
//       <div className="text-center py-10 text-gray-500">
//         No subcategories found
//       </div>
//     )}

//     {/* LOADING */}
//     {loading && (
//       <div className="text-center py-10 text-gray-500">
//         Loading subcategories...
//       </div>
//     )}

//   </div>
// </div>
//   );
// };

// export default SubCategoryList;



import React, { useEffect, useState } from "react";
import {
  getSubCategoriesApi,
  deleteSubCategoryApi,
  toggleSubCategoryApi,
} from "../../services/subCategoryApi";

import { getCategoriesApi } from "../../services/categoryApi";
import { updateSubCategoryApi } from "../../services/subCategoryApi";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { toast } from "react-toastify";

const SubCategoryList = () => {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // 🔥 Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getSubCategoriesApi();
      setData(res.data || []);
    } catch (err) {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fetch categories
  const fetchCategories = async () => {
    const res = await getCategoriesApi();
    setCategories(res.data || []);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this subcategory?")) return;

    try {
      await deleteSubCategoryApi(id);
      toast.success("Deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔥 TOGGLE
  const handleToggle = async (id: string, current: boolean) => {
    try {
      await toggleSubCategoryApi(id, !current);
      fetchData();
    } catch {
      toast.error("Toggle failed");
    }
  };

  // 🔥 OPEN EDIT
  const handleEdit = (item: any) => {
    setSelected(item);
    setForm({
      name: item.name || "",
      category: item.category?._id || "",
      description: item.description || "",
    });
    setPreview(item.image || "");
    setOpenModal(true);
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("category", form.category);
      data.append("description", form.description);

      if (image) data.append("image", image);

      await updateSubCategoryApi(selected._id, data);

      toast.success("Updated Successfully ✅");
      setOpenModal(false);
      fetchData();

    } catch {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sub Category Management</h1>
          <p className="text-gray-500 text-sm">Manage sub categories</p>
        </div>

        <Button onClick={() => (window.location.href = "/admin/subcategory")}>
          + Add SubCategory
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">SubCategory</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded object-cover"
                    />
                    {item.name}
                  </td>

                  <td className="px-4 py-3">
                    {item.category?.name}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggle(item._id, item.isActive)}
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-right space-x-2">

                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* 🔥 EDIT MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Edit SubCategory"
      >
        <div className="space-y-4">

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((c: any) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            onChange={(e: any) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <img src={preview} className="w-24 rounded" />
          )}

          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>

        </div>
      </Modal>

    </div>
  );
};

export default SubCategoryList;