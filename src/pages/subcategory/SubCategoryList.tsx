// import React, { useEffect, useState } from "react";
// import {
//   getSubCategoriesApi,
//   deleteSubCategoryApi,
//   toggleSubCategoryApi,
// } from "../../services/subCategoryApi";
// import { getCategoriesApi } from "../../services/categoryApi";
// import { updateSubCategoryApi } from "../../services/subCategoryApi";

// import Button from "../../components/ui/Button";
// import Modal from "../../components/ui/Modal";
// import { toast } from "react-toastify";

// const SubCategoryList = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     description: "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");

//   // 🔥 Fetch data
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await getSubCategoriesApi();
//       setData(res.data || []);
//     } catch (err) {
//       toast.error("Failed to load");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 Fetch categories
//   const fetchCategories = async () => {
//     const res = await getCategoriesApi();
//     setCategories(res.data || []);
//   };

//   useEffect(() => {
//     fetchData();
//     fetchCategories();
//   }, []);

//   // 🔥 DELETE
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Delete this subcategory?")) return;

//     try {
//       await deleteSubCategoryApi(id);
//       toast.success("Deleted");
//       fetchData();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   // 🔥 TOGGLE
//   const handleToggle = async (id: string, current: boolean) => {
//     try {
//       await toggleSubCategoryApi(id, !current);
//       fetchData();
//     } catch {
//       toast.error("Toggle failed");
//     }
//   };

//   // 🔥 OPEN EDIT
//   const handleEdit = (item: any) => {
//     setSelected(item);
//     setForm({
//       name: item.name || "",
//       category: item.category?._id || "",
//       description: item.description || "",
//     });
//     setPreview(item.image || "");
//     setOpenModal(true);
//   };

//   // 🔥 UPDATE
//   const handleUpdate = async () => {
//     try {
//       const data = new FormData();

//       data.append("name", form.name);
//       data.append("category", form.category);
//       data.append("description", form.description);

//       if (image) data.append("image", image);

//       await updateSubCategoryApi(selected._id, data);

//       toast.success("Updated Successfully ✅");
//       setOpenModal(false);
//       fetchData();

//     } catch {
//       toast.error("Update failed ❌");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Sub Category Management</h1>
//           <p className="text-gray-500 text-sm">Manage sub categories</p>
//         </div>

//         <div className='rounded w-48'>
//           <Button  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 " onClick={() => (window.location.href = "/admin/subcategory")}>
//           + Add SubCategory
//         </Button>
//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="overflow-x-auto">

//           <table className="w-full text-sm">

//             <thead className="bg-gray-50 text-xs uppercase text-gray-600">
//               <tr>
//                 <th className="px-4 py-3 text-left">#</th>
//                 <th className="px-4 py-3 text-left">SubCategory</th>
//                 <th className="px-4 py-3 text-left">Category</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={item._id} className="border-t hover:bg-gray-50">

//                   <td className="px-4 py-3">{index + 1}</td>

//                   <td className="px-4 py-3 flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       className="w-10 h-10 rounded object-cover"
//                     />
//                     {item.name}
//                   </td>

//                   <td className="px-4 py-3">
//                     {item.category?.name}
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => handleToggle(item._id, item.isActive)}
//                       className={`px-3 py-1 text-xs rounded-full ${
//                         item.isActive
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {item.isActive ? "Active" : "Inactive"}
//                     </button>
//                   </td>

//                   <td className="px-4 py-3 text-right space-x-2">

//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="text-blue-600"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="text-red-600"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       </div>

//       {/* 🔥 EDIT MODAL */}
//       <Modal
//         isOpen={openModal}
//         onClose={() => setOpenModal(false)}
//         title="Edit SubCategory"
//       >
//         <div className="space-y-4">

//           <input
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             placeholder="Name"
//             className="w-full border p-2 rounded"
//           />

//           <select
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//             className="w-full border p-2 rounded"
//           >
//             <option value="">Select Category</option>
//             {categories.map((c: any) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <textarea
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             placeholder="Description"
//             className="w-full border p-2 rounded"
//           />

//           <input
//             type="file"
//             onChange={(e: any) => {
//               const file = e.target.files[0];
//               setImage(file);
//               setPreview(URL.createObjectURL(file));
//             }}
//           />

//           {preview && (
//             <img src={preview} className="w-24 rounded" />
//           )}

//           <div className="flex justify-end">
//             <button
//               onClick={handleUpdate}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Update
//             </button>
//           </div>

//         </div>
//       </Modal>

//     </div>
//   );
// };

// export default SubCategoryList;


import React, { useEffect, useState } from "react";
import {
  getSubCategoriesApi,
  deleteSubCategoryApi,
  toggleSubCategoryApi,
  updateSubCategoryApi,
} from "../../services/subCategoryApi";
import { getCategoriesApi } from "../../services/categoryApi";
import { toast } from "react-toastify";

import Modal from "../../components/ui/Modal";
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Plus, 
  Image as ImageIcon,
  Tag,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  X,
  Layers
} from "lucide-react";

// Types
interface SubCategory {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  category: {
    _id: string;
    name: string;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const SubCategoryList = () => {
  const [data, setData] = useState<SubCategory[]>([]);
  const [filteredData, setFilteredData] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<SubCategory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getSubCategoriesApi();
      const subCategories = res.data || [];
      setData(subCategories);
      setFilteredData(subCategories);
    } catch (err) {
      toast.error("Failed to load sub categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesApi();
      setCategories(res.data || []);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = data;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.category?.name.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(item => 
        statusFilter === "active" ? item.isActive : !item.isActive
      );
    }
    
    if (categoryFilter !== "all") {
      result = result.filter(item => 
        item.category?._id === categoryFilter
      );
    }
    
    setFilteredData(result);
  }, [searchTerm, statusFilter, categoryFilter, data]);

  // Delete
  const handleDelete = async (id: string) => {
    if (deleteConfirm !== "DELETE") {
      toast.warning('Type "DELETE" to confirm');
      return;
    }
    
    try {
      setDeleting(true);
      await deleteSubCategoryApi(id);
      toast.success("Sub category deleted successfully");
      setDeleteModal(false);
      setSelected(null);
      setDeleteConfirm("");
      fetchData();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // Toggle
  const handleToggle = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      await toggleSubCategoryApi(id, !current);
      toast.success(`Sub category ${!current ? 'activated' : 'deactivated'} successfully`);
      fetchData();
    } catch {
      toast.error("Toggle failed");
    } finally {
      setTogglingId(null);
    }
  };

  // Open Edit
  const handleEdit = (item: SubCategory) => {
    setSelected(item);
    setForm({
      name: item.name || "",
      category: item.category?._id || "",
      description: item.description || "",
    });
    setPreview(item.image || "");
    setImage(null);
    setOpenModal(true);
  };

  // Open Delete
  const handleDeleteClick = (item: SubCategory) => {
    setSelected(item);
    setDeleteConfirm("");
    setDeleteModal(true);
  };

  // Update
  const handleUpdate = async () => {
    if (!form.name.trim()) {
      toast.warning("Name is required");
      return;
    }
    
    if (!form.category) {
      toast.warning("Please select a category");
      return;
    }
    
    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      await updateSubCategoryApi(selected!._id, formData);
      toast.success("Sub category updated successfully ✅");
      setOpenModal(false);
      setSelected(null);
      fetchData();
    } catch {
      toast.error("Update failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  // Action Button Component
  const ActionButton = ({ 
    onClick, 
    icon: Icon, 
    label, 
    color = "gray",
    title,
    disabled = false
  }: { 
    onClick: () => void; 
    icon: any; 
    label: string; 
    color?: "gray" | "blue" | "indigo" | "red" | "green";
    title: string;
    disabled?: boolean;
  }) => {
    const colorClasses = {
      gray: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      blue: "text-gray-500 hover:text-blue-600 hover:bg-blue-50",
      indigo: "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50",
      red: "text-gray-500 hover:text-red-600 hover:bg-red-50",
      green: "text-gray-500 hover:text-green-600 hover:bg-green-50",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${colorClasses[color]} disabled:opacity-50 disabled:cursor-not-allowed`}
        title={title}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </button>
    );
  };

  // Status Badge Component
  const StatusBadge = ({ isActive }: { isActive: boolean }) => {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive 
          ? "bg-green-50 text-green-700 border border-green-200" 
          : "bg-gray-50 text-gray-600 border border-gray-200"
      }`}>
        {isActive ? (
          <CheckCircle className="w-3 h-3" />
        ) : (
          <XCircle className="w-3 h-3" />
        )}
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  // SubCategory Table Row
  const SubCategoryTableRow = ({ item, index }: { item: SubCategory; index: number }) => (
    <tr className="hover:bg-gray-50/80 transition-colors group">
      <td className="px-4 py-3 text-sm text-gray-500 w-12 text-center">
        {index + 1}
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-10 h-10 rounded-lg object-cover border border-gray-200 shadow-sm" 
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
          <div>
            <p className="font-medium text-sm text-gray-900">{item.name}</p>
            {item.description && (
              <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <Layers className="w-3 h-3" />
          {item.category?.name || "Uncategorized"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <StatusBadge isActive={item.isActive} />
          <button
            onClick={() => handleToggle(item._id, item.isActive)}
            disabled={togglingId === item._id}
            className={`p-1 rounded-md transition-colors ${
              item.isActive 
                ? "text-gray-400 hover:text-amber-600 hover:bg-amber-50" 
                : "text-gray-400 hover:text-green-600 hover:bg-green-50"
            } disabled:opacity-50`}
            title={item.isActive ? "Deactivate" : "Activate"}
          >
            {togglingId === item._id ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </td>

      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            onClick={() => handleEdit(item)}
            icon={Edit}
            label="Edit"
            color="indigo"
            title="Edit sub category"
          />
          
          <ActionButton
            onClick={() => handleDeleteClick(item)}
            icon={Trash2}
            label="Delete"
            color="red"
            title="Delete sub category"
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* HEADER SECTION */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600" />
              Sub Categories
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your product sub categories
              {filteredData.length > 0 && (
                <span className="ml-2 text-gray-400">
                  ({filteredData.length} {filteredData.length === 1 ? "sub category" : "sub categories"})
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

            <button 
              onClick={() => window.location.href = "/admin/subcategory"}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Sub Category
            </button>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH SECTION */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sub categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {categories.length > 0 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm w-12 text-center">#</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Sub Category</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Category</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Status</th>
              <th className="text-right text-gray-500 font-semibold py-3 px-4 text-sm">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <RefreshCw className="w-8 h-8 text-blue-600 mb-3 animate-spin" />
                    <p className="text-sm">Loading sub categories...</p>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Layers className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                        ? "No matching sub categories found" 
                        : "No sub categories available"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Get started by adding your first sub category"}
                    </p>
                    {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
                      <button
                        onClick={() => window.location.href = "/admin/subcategory"}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Sub Category
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <SubCategoryTableRow 
                  key={item._id} 
                  item={item} 
                  index={index} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelected(null);
          setImage(null);
          setPreview("");
        }}
        title="Edit Sub Category"
      >
        {selected && (
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Category Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter sub category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter description (optional)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
              />
              {preview && (
                <div className="mt-2">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200" 
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setSelected(null);
                  setImage(null);
                  setPreview("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Sub Category"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelected(null);
          setDeleteConfirm("");
        }}
        title="Delete Sub Category"
      >
        {deleteModal && selected && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-800">Confirm Deletion</h4>
                <p className="text-sm text-red-600 mt-1">
                  You are about to delete "{selected.name}". This action cannot be undone.
                </p>
                {selected.category && (
                  <p className="text-xs text-red-500 mt-1">
                    Category: {selected.category.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelected(null);
                  setDeleteConfirm("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selected._id)}
                disabled={deleting || deleteConfirm !== "DELETE"}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Sub Category"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubCategoryList;