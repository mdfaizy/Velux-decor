// import { useState } from "react";
// import { toast } from "react-toastify";

// const EditForm = ({ selected, onClose }: any) => {
//   const [form, setForm] = useState({
//     name: selected.name || "",
//     description: selected.description || "",
//     badge: selected.badge || "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [icon, setIcon] = useState<File | null>(null);

//   const [imagePreview, setImagePreview] = useState(selected.image || "");
//   const [iconPreview, setIconPreview] = useState(selected.icon || "");

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImage = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleIcon = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIcon(file);
//     setIconPreview(URL.createObjectURL(file));
//   };

//   const handleUpdate = async () => {
//     try {
//       const data = new FormData();

//       data.append("name", form.name);
//       data.append("description", form.description);
//       data.append("badge", form.badge);

//       if (image) data.append("image", image);
//       if (icon) data.append("icon", icon);

//       // await updateCategoryApi(selected._id, data);

//       toast.success("Updated Successfully ✅");
//       onClose();

//     } catch {
//       toast.error("Update failed ❌");
//     }
//   };

// return (
//   <div className="bg-white rounded-2xl shadow p-6">

//     {/* 🔥 HEADER */}
//     <div className="mb-6">
//       <h2 className="text-xl font-semibold text-gray-800">
//         Edit Category
//       </h2>
//       <p className="text-sm text-gray-500">
//         Update category details and media
//       </p>
//     </div>

//     <div className="grid md:grid-cols-1 gap-6">

//       {/* LEFT SIDE */}
//       <div className="space-y-5">

//         {/* NAME */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Category Name
//           </label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter category name"
//             className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
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

//         {/* BADGE */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Badge
//           </label>
//           <input
//             name="badge"
//             value={form.badge}
//             onChange={handleChange}
//             placeholder="e.g. Trending / New"
//             className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//       </div>

//       {/* RIGHT SIDE */}
//       <div className="space-y-6 flex justify-between">

//         {/* 🔥 IMAGE */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Banner Image
//           </label>

//           <div className="mt-2 border-2 border-dashed p-4 rounded-xl text-center hover:border-blue-400 transition">

//             {!imagePreview ? (
//               <>
//                 <p className="text-sm text-gray-500">
//                   Upload banner image
//                 </p>
//                 <input type="file" onChange={handleImage} />
//               </>
//             ) : (
//               <div className="relative">
//                 <img
//                   src={imagePreview}
//                   className="w-full h-40 object-cover rounded-lg"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setImage(null);
//                     setImagePreview("");
//                   }}
//                   className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 🔥 ICON */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Icon
//           </label>

//           <div className="mt-2 border-2 border-dashed p-4 rounded-xl text-center hover:border-blue-400 transition">

//             {!iconPreview ? (
//               <>
//                 <p className="text-sm text-gray-500">
//                   Upload icon
//                 </p>
//                 <input type="file" onChange={handleIcon} />
//               </>
//             ) : (
//               <div className="relative flex justify-center">
//                 <img
//                   src={iconPreview}
//                   className="w-16 h-16 object-cover rounded-full"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIcon(null);
//                     setIconPreview("");
//                   }}
//                   className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded"
//                 >
//                   ✖
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>

//     </div>

//     {/* 🔥 ACTION BUTTONS */}
//     <div className="mt-8 flex justify-end gap-3">

//       <button
//         onClick={onClose}
//         className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
//       >
//         Cancel
//       </button>

//       <button
//         onClick={handleUpdate}
//         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         Update Category
//       </button>

//     </div>

//   </div>
// );
// };

// export default EditForm;


import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Tag, 
  AlignLeft, 
  Award,
  Trash2,
  Eye,
  Save,
  Loader2,
  FileImage,
  Sparkles
} from "lucide-react";

const EditForm = ({ selected, onClose }: any) => {
  const [form, setForm] = useState({
    name: selected.name || "",
    description: selected.description || "",
    badge: selected.badge || "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(selected.image || "");
  const [iconPreview, setIconPreview] = useState(selected.icon || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const imageInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Cleanup preview URLs on unmount
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      if (iconPreview && iconPreview.startsWith('blob:')) {
        URL.revokeObjectURL(iconPreview);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (form.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (form.description && form.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (form.badge && form.badge.length > 30) {
      newErrors.badge = "Badge must be less than 30 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
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
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(URL.createObjectURL(file));
  };

  const handleIcon = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid icon (JPEG, PNG, WEBP, or SVG)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Icon size must be less than 2MB");
      return;
    }

    setIcon(file);
    if (iconPreview && iconPreview.startsWith('blob:')) {
      URL.revokeObjectURL(iconPreview);
    }
    setIconPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
  };

  const removeIcon = () => {
    setIcon(null);
    if (iconPreview && iconPreview.startsWith('blob:')) {
      URL.revokeObjectURL(iconPreview);
    }
    setIconPreview("");
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("badge", form.badge);
      if (image) data.append("image", image);
      if (icon) data.append("icon", icon);

      // await updateCategoryApi(selected._id, data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success("Category updated successfully! ✨");
      onClose();
    } catch (error) {
      toast.error("Failed to update category. Please try again.");
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
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
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Category</h2>
              <p className="text-sm text-gray-500 mt-0.5">Update category details and media assets</p>
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
                    <Tag className="w-4 h-4 text-blue-500" />
                    Category Name <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Electronics, Fashion, Home & Living"
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">2-50 characters, unique category identifier</p>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-blue-500" />
                    Description
                  </div>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what this category is about..."
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
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

              {/* Badge Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-500" />
                    Badge
                  </div>
                </label>
                <input
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="e.g., Trending, New, Best Seller, Limited"
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                    errors.badge ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.badge && (
                  <p className="mt-1 text-xs text-red-500">{errors.badge}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">Optional badge to highlight category</p>
              </div>
            </div>

            {/* Right Column - Media Uploads */}
            <div className="space-y-6">
              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    Banner Image
                  </div>
                </label>
                
                {!imagePreview ? (
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImage}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                    <p className="text-sm text-gray-500 mb-1">Click to upload banner image</p>
                    <p className="text-xs text-gray-400">JPG, PNG, WEBP up to 5MB</p>
                    <p className="text-xs text-gray-400 mt-2">Recommended: 1200 x 400 pixels</p>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Change image"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={removeImage}
                        className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Icon Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4 text-blue-500" />
                    Category Icon
                  </div>
                </label>
                
                {!iconPreview ? (
                  <div
                    onClick={() => iconInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <input
                      ref={iconInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                      onChange={handleIcon}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                    <p className="text-sm text-gray-500 mb-1">Click to upload icon</p>
                    <p className="text-xs text-gray-400">JPG, PNG, WEBP, SVG up to 2MB</p>
                    <p className="text-xs text-gray-400 mt-2">Recommended: 200 x 200 pixels</p>
                  </div>
                ) : (
                  <div className="relative group inline-block">
                    <div className="relative">
                      <img
                        src={iconPreview}
                        alt="Icon preview"
                        className="w-24 h-24 object-cover rounded-2xl border-2 border-gray-200 shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={removeIcon}
                          className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
                          title="Remove icon"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Category
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;