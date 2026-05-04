// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   updateSubCategoryApi,
// } from "../../services/subCategoryApi";
// import { getCategoriesApi } from "../../services/categoryApi";

// const EditSubCategoryForm = ({ selected, onClose }: any) => {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     description: "",
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔥 Load data
//   useEffect(() => {
//     if (selected) {
//       setForm({
//         name: selected.name || "",
//         category: selected.category?._id || "",
//         description: selected.description || "",
//       });

//       setPreview(selected.image || "");
//     }
//   }, [selected]);

//   // 🔥 Load categories
//   useEffect(() => {
//     const fetch = async () => {
//       const res = await getCategoriesApi();
//       setCategories(res.data || []);
//     };
//     fetch();
//   }, []);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImage = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       const data = new FormData();
//       data.append("name", form.name);
//       data.append("category", form.category);
//       data.append("description", form.description);

//       if (image) data.append("image", image);

//       await updateSubCategoryApi(selected._id, data);

//       toast.success("SubCategory Updated ✅");
//       onClose();

//     } catch (err) {
//       console.log(err);
//       toast.error("Update failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

// return (
//   <div className="bg-white rounded-2xl shadow p-6">

//     {/* 🔥 HEADER */}
//     <div className="mb-6">
//       <h2 className="text-xl font-semibold text-gray-800">
//         Edit SubCategory
//       </h2>
//       <p className="text-sm text-gray-500">
//         Update details and image
//       </p>
//     </div>

//     <div className="grid md:grid-cols-2 gap-6">

//       {/* LEFT SIDE */}
//       <div className="space-y-5">

//         {/* NAME */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter subcategory name"
//             className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* CATEGORY */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Category
//           </label>
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           >
//             <option value="">Select Category</option>
//             {categories.map((c: any) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* DESCRIPTION */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//       </div>

//       {/* RIGHT SIDE - IMAGE */}
//       <div>

//         <label className="text-sm font-medium text-gray-700">
//           Upload Image
//         </label>

//         <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-400 transition">

//           {!preview ? (
//             <>
//               <p className="text-gray-500 text-sm">
//                 Click to upload image
//               </p>
//               <input
//                 type="file"
//                 onChange={handleImage}
//                 className="mt-3"
//               />
//             </>
//           ) : (
//             <div className="relative">
//               <img
//                 src={preview}
//                 className="w-full h-48 object-cover rounded-lg"
//               />

//               <button
//                 type="button"
//                 onClick={() => {
//                   setImage(null);
//                   setPreview("");
//                 }}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           )}

//         </div>

//       </div>

//     </div>

//     {/* 🔥 ACTION BUTTON */}
//     <div className="mt-8 flex justify-end gap-3">

//       <button
//         onClick={onClose}
//         className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
//       >
//         Cancel
//       </button>

//       <button
//         onClick={handleUpdate}
//         disabled={loading}
//         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         {loading ? "Updating..." : "Update SubCategory"}
//       </button>

//     </div>

//   </div>
// );
// };

// export default EditSubCategoryForm;


import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  updateSubCategoryApi,
} from "../../services/subCategoryApi";
import { getCategoriesApi } from "../../services/categoryApi";
import {
  X,
  Upload,
  Image as ImageIcon,
  Tag,
  AlignLeft,
  FolderOpen,
  Trash2,
  Eye,
  Save,
  Loader2,
  Sparkles,
  ChevronDown
} from "lucide-react";

const EditSubCategoryForm = ({ selected, onClose }: any) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  // Load data
  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || "",
        category: selected.category?._id || "",
        description: selected.description || "",
      });
      setPreview(selected.image || "");
    }
  }, [selected]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data || []);
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Subcategory name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (form.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!form.category) {
      newErrors.category = "Please select a parent category";
    }

    if (form.description && form.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setForm({ ...form, category: categoryId });
    setIsDropdownOpen(false);
    if (errors.category) {
      setErrors({ ...errors, category: null });
    }
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, or WEBP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setImage(file);
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("description", form.description);
      if (image) data.append("image", image);

      await updateSubCategoryApi(selected._id, data);

      toast.success("Subcategory updated successfully! ✨");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update subcategory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const getSelectedCategoryName = () => {
    const selectedCategory = categories.find(c => c._id === form.category);
    return selectedCategory?.name || "Select a category";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Subcategory</h2>
              <p className="text-sm text-gray-500 mt-0.5">Update subcategory details and image</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-500" />
                    Subcategory Name <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Smartphones, Laptops, Men's Clothing"
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">2-50 characters, descriptive name for the subcategory</p>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-purple-500" />
                    Parent Category <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-left flex justify-between items-center transition-all ${
                      errors.category
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  >
                    <span className={form.category ? 'text-gray-900' : 'text-gray-400'}>
                      {getSelectedCategoryName()}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto animate-in fade-in duration-150">
                      {categories.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                          <p className="text-sm">Loading categories...</p>
                        </div>
                      ) : (
                        categories.map((category) => (
                          <button
                            key={category._id}
                            type="button"
                            onClick={() => handleCategorySelect(category._id)}
                            className="w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors flex items-center justify-between group"
                          >
                            <span className="text-gray-700">{category.name}</span>
                            {form.category === category._id && (
                              <span className="text-purple-600 text-xs font-semibold">Selected</span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {errors.category}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">Select the main category this belongs to</p>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-purple-500" />
                    Description
                  </div>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what this subcategory offers..."
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  {form.description.length}/500 characters
                </p>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-500" />
                  Subcategory Image
                </div>
              </label>

              {!preview ? (
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all group min-h-[300px] flex flex-col items-center justify-center"
                >
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImage}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-purple-500 transition-colors" />
                  <p className="text-sm text-gray-500 mb-1">Click to upload image</p>
                  <p className="text-xs text-gray-400">JPG, PNG, WEBP up to 5MB</p>
                  <p className="text-xs text-gray-400 mt-2">Recommended: 800 x 600 pixels</p>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Subcategory preview"
                    className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => imageInputRef.current?.click()}
                      className="p-2.5 bg-white rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                      title="Change image"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={removeImage}
                      className="p-2.5 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              
              {preview && (
                <p className="mt-2 text-xs text-gray-400 text-center">
                  Hover over image to change or remove
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Subcategory
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategoryForm;