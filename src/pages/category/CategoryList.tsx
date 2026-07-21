

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "../../components/ui/Table";

// import { getCategoriesApi ,deleteCategoryApi,
//   toggleCategoryApi,} from "../../services/categoryApi";
// import Modal from "../../components/ui/Modal";
// import EditForm from "./EditForm";
// import { toast } from "react-toastify";

// const CategoryList = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [selected, setSelected] = useState<any>(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await getCategoriesApi();
//       setData(res.data || []);
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteCategoryApi(id);
//       toast.success("Deleted Successfully");
//       fetchData();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const handleToggle = async (id: string) => {
//     try {
//       await toggleCategoryApi(id);
//       toast.success("Status updated");
//       fetchData();
//     } catch {
//       toast.error("Toggle failed");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-full overflow-x-auto">
      
//       {/* HEADER SECTION */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">Categories</h2>
//           <p className="text-sm text-gray-500 mt-1">Manage your product categories and their status.</p>
//         </div>
//         <button 
//           onClick={fetchData}
//           className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors flex items-center gap-2"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
//           Refresh
//         </button>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="rounded-xl border border-gray-200 overflow-hidden">
//         <Table>
//           <TableHeader className="bg-gray-50/80 border-b border-gray-200">
//             <TableRow>
//               <TableCell isHeader className="text-gray-500 font-semibold py-4 px-4">#</TableCell>
//               <TableCell isHeader className="text-gray-500 font-semibold py-4">Image</TableCell>
//               <TableCell isHeader className="text-gray-500 font-semibold py-4">Category</TableCell>
//               <TableCell isHeader className="text-gray-500 font-semibold py-4">Badge</TableCell>
//               <TableCell isHeader className="text-gray-500 font-semibold py-4">Status</TableCell>
//               <TableCell isHeader className="text-gray-500 font-semibold py-4 text-right pr-6">Actions</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="divide-y divide-gray-100">
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-10">
//                   <div className="flex flex-col items-center justify-center text-gray-500">
//                     <svg className="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     Loading categories...
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : data.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-10 text-gray-500">
//                   No categories found.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               data.map((item, index) => (
//                 <TableRow key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                  
//                   <TableCell className="text-gray-500 px-4 py-3">{index + 1}</TableCell>

//                   <TableCell className="py-3">
//                     {item.image ? (
//                       <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm" />
//                     ) : (
//                       <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
//                         No Img
//                       </div>
//                     )}
//                   </TableCell>

//                   <TableCell className="py-3">
//                     <div className="flex items-center gap-3">
//                       {item.icon && <img src={item.icon} alt="icon" className="w-6 h-6 rounded-md object-contain" />}
//                       <div>
//                         <p className="font-medium text-gray-900">{item.name}</p>
//                         <p className="text-sm text-gray-500 line-clamp-1 max-w-[200px]">{item.description || "No description"}</p>
//                       </div>
//                     </div>
//                   </TableCell>

//                   <TableCell className="py-3">
//                     {item.badge ? (
//                       <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 text-xs font-medium rounded-full">
//                         {item.badge}
//                       </span>
//                     ) : (
//                       <span className="text-gray-400 text-sm">-</span>
//                     )}
//                   </TableCell>

//                   <TableCell className="py-3">
//                     <button 
//                       onClick={() => handleToggle(item._id)}
//                       className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
//                         item.isActive
//                           ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
//                           : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
//                       }`}
//                     >
//                       {item.isActive ? "Active" : "Inactive"}
//                     </button>
//                   </TableCell>

//                   {/* MODERN ACTIONS WITH ICONS */}
//                   <TableCell className="py-3 pr-6 text-right space-x-2">
//                     <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      
//                       {/* View Button */}
//                       <button
//                         onClick={() => {
//                           setSelected(item);
//                           setModalType("view");
//                           setOpenModal(true);
//                         }}
//                         className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                         title="View"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
//                       </button>

//                       {/* Edit Button */}
//                       <button
//                         onClick={() => {
//                           setSelected(item);
//                           setModalType("edit");
//                           setOpenModal(true);
//                         }}
//                         className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
//                         title="Edit"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => {
//                           if(window.confirm("Are you sure you want to delete this category?")) {
//                             handleDelete(item._id)
//                           }
//                         }}
//                         className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                         title="Delete"
//                       >
//                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                       </button>

//                     </div>
//                   </TableCell>

//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* MODAL VIEW */}
//       <Modal
//         isOpen={openModal}
//         onClose={() => setOpenModal(false)}
//         title={modalType === "view" ? "Category Details" : "Edit Category"}
//       >
//         {modalType === "view" && selected && (
//           <div className="space-y-6">
            
//             {/* Modal Header inside Body */}
//             <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
//               {selected.icon ? (
//                 <img src={selected.icon} alt="Icon" className="w-12 h-12 p-1 bg-gray-50 border border-gray-200 rounded-xl" />
//               ) : (
//                 <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">#</div>
//               )}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
//                 <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${selected.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
//                   {selected.isActive ? "Active" : "Inactive"}
//                 </span>
//               </div>
//             </div>

//             {selected.image && (
//               <div className="rounded-xl overflow-hidden border border-gray-200">
//                 <img src={selected.image} alt="Preview" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
//               </div>
//             )}

//             <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-sm">
//               <div>
//                 <span className="block text-gray-500 font-medium mb-1">Description</span>
//                 <p className="text-gray-800">{selected.description || "No description provided."}</p>
//               </div>
//               {selected.badge && (
//                 <div>
//                   <span className="block text-gray-500 font-medium mb-1">Badge</span>
//                   <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
//                     {selected.badge}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="pt-4 flex justify-end">
//                <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
//                  Close
//                </button>
//             </div>
//           </div>
//         )}

//         {/* EDIT */}
//         {modalType === "edit" && selected && (
//           <EditForm
//             selected={selected}
//             onClose={() => {
//               setOpenModal(false);
//               fetchData();
//             }}
//           />
//         )}
//       </Modal>

//     </div>
//   );
// };

// export default CategoryList;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/Table";
import {
  getCategoriesApi,
  deleteCategoryApi,
  toggleCategoryApi,
} from "../../services/categoryApi";
import Modal from "../../components/ui/Modal";
import EditForm from "./EditForm";
import { toast } from "react-toastify";
import { 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  X,
  Search,
  Filter,
  Plus,
  Image as ImageIcon,
  Tag,
  AlertCircle,
  CheckCircle,
  Circle,
  Power
} from "lucide-react";

// Types
interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  icon?: string;
  badge?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  subCategories?: number;
  products?: number;
}

const CategoryList = () => {
  const [data, setData] = useState<Category[]>([]);
  const [filteredData, setFilteredData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"view" | "edit" | "delete">("view");
  const [selected, setSelected] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getCategoriesApi();
      console.log(res);
console.log(res.data);
      const categories = res.data || [];
      setData(categories);
      setFilteredData(categories);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = data;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.badge?.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(item => 
        statusFilter === "active" ? item.isActive : !item.isActive
      );
    }
    
    setFilteredData(result);
  }, [searchTerm, statusFilter, data]);

  const handleDelete = async (id: string) => {
    if (deleteConfirm !== "DELETE") {
      toast.warning('Type "DELETE" to confirm');
      return;
    }
    
    try {
      setDeleting(true);
      await deleteCategoryApi(id);
      toast.success("Category deleted successfully");
      setOpenModal(false);
      setSelected(null);
      setDeleteConfirm("");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

const handleToggle = async (id: string) => {
   console.log("Toggle clicked:", id);
  setTogglingId(id);

  try {
    const res = await toggleCategoryApi(id);

    console.log("Toggle Response:", res);

    toast.success("Status updated successfully");

    await fetchData();
  } catch (error) {
    console.error("Toggle Error:", error);
    toast.error("Failed to update status");
  } finally {
    setTogglingId(null);
  }
};

  // Status badge component - Compact version
  const StatusBadge = ({ isActive }: { isActive: boolean }) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? "bg-green-50 text-green-700 border border-green-200" 
          : "bg-gray-50 text-gray-600 border border-gray-200"
      }`}>
        {isActive ? (
          <CheckCircle className="w-3 h-3" />
        ) : (
          <Circle className="w-3 h-3" />
        )}
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  // Action Button Component
  const ActionButton = ({ 
    onClick, 
    icon: Icon, 
    label, 
    color = "gray",
    title 
  }: { 
    onClick: () => void; 
    icon: any; 
    label: string; 
    color?: "gray" | "blue" | "indigo" | "red";
    title: string;
  }) => {
    const colorClasses = {
      gray: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      blue: "text-gray-500 hover:text-blue-600 hover:bg-blue-50",
      indigo: "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50",
      red: "text-gray-500 hover:text-red-600 hover:bg-red-50",
    };

    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${colorClasses[color]}`}
        title={title}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </button>
    );
  };

  // Table row component - Compact version
  const CategoryTableRow = ({ item, index }: { item: Category; index: number }) => (
    <TableRow className="hover:bg-gray-50/80 transition-colors group">
      <TableCell className="text-gray-500 px-3 py-2 text-xs w-10 text-center">
        {index + 1}
      </TableCell>
      
      <TableCell className="py-2 w-14">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-10 h-10 rounded-lg object-cover border border-gray-200" 
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
            <ImageIcon className="w-4 h-4" />
          </div>
        )}
      </TableCell>

      <TableCell className="py-2">
        <div className="flex items-center gap-2">
          {item.icon && (
            <img 
              src={item.icon} 
              alt="icon" 
              className="w-6 h-6 rounded-lg object-contain bg-gray-50 p-0.5 border border-gray-100" 
            />
          )}
          <div>
            <p className="font-medium text-sm text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
              {item.description || "No description"}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-2">
        {item.badge ? (
          <span className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs font-medium rounded-full">
            <Tag className="w-3 h-3" />
            {item.badge}
          </span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        )}
      </TableCell>

      <TableCell className="py-2">
        <div className="flex items-center gap-1.5">
          <StatusBadge isActive={item.isActive} />
          <button
            onClick={() => handleToggle(item._id)}
            disabled={togglingId === item._id}
            className={`p-1 rounded-md transition-colors ${
              item.isActive 
                ? "text-green-600 hover:bg-green-50" 
                : "text-gray-400 hover:bg-gray-100"
            } disabled:opacity-50`}
            title={item.isActive ? "Deactivate" : "Activate"}
          >
            {togglingId === item._id ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Power className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </TableCell>

      <TableCell className="py-2 pr-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            onClick={() => {
              setSelected(item);
              setModalType("view");
              setOpenModal(true);
            }}
            icon={Eye}
            label="View"
            color="blue"
            title="View details"
          />
          
          <ActionButton
            onClick={() => {
              setSelected(item);
              setModalType("edit");
              setOpenModal(true);
            }}
            icon={Edit}
            label="Edit"
            color="indigo"
            title="Edit category"
          />

          <ActionButton
            onClick={() => {
              setSelected(item);
              setModalType("delete");
              setDeleteConfirm("");
              setOpenModal(true);
            }}
            icon={Trash2}
            label="Delete"
            color="red"
            title="Delete category"
          />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* HEADER SECTION - Compact */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Categories</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage your product categories
              {filteredData.length > 0 && (
                <span className="ml-2 text-gray-400">
                  ({filteredData.length})
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchData}
              className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>

            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH SECTION - Compact */}
      <div className="px-5 py-3 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-[180px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE SECTION - Compact */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-200">
            <TableRow>
              <TableCell isHeader className="text-gray-500 font-semibold py-2 px-3 text-xs w-10 text-center">#</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-2 text-xs w-14">Image</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-2 text-xs">Category</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-2 text-xs">Badge</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-2 text-xs">Status</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-2 text-xs text-right pr-4">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <RefreshCw className="w-6 h-6 text-blue-600 mb-2 animate-spin" />
                    <p className="text-xs">Loading categories...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <AlertCircle className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium text-sm">
                      {searchTerm || statusFilter !== "all" ? "No matching categories found" : "No categories available"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {searchTerm || statusFilter !== "all" 
                        ? "Try adjusting your search or filters" 
                        : "Get started by creating your first category"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <CategoryTableRow 
                  key={item._id} 
                  item={item} 
                  index={index} 
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION - Optional */}
      {filteredData.length > 20 && (
        <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {Math.min(20, filteredData.length)} of {filteredData.length}
          </p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              2
            </button>
            <button className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL - View/Edit/Delete */}
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelected(null);
          setDeleteConfirm("");
        }}
        title={
          modalType === "view" ? "Category Details" :
          modalType === "edit" ? "Edit Category" :
          "Delete Category"
        }
        size={modalType === "view" ? "lg" : "md"}
      >
        {/* VIEW MODE */}
        {modalType === "view" && selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              {selected.image ? (
                <img 
                  src={selected.image} 
                  alt={selected.name} 
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200" 
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  {selected.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge isActive={selected.isActive} />
                  {selected.badge && (
                    <span className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {selected.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700">Description</label>
                <p className="mt-0.5 text-sm text-gray-600">
                  {selected.description || "No description provided."}
                </p>
              </div>

              {selected.icon && (
                <div>
                  <label className="text-xs font-medium text-gray-700">Icon</label>
                  <div className="mt-0.5">
                    <img 
                      src={selected.icon} 
                      alt="Icon" 
                      className="w-10 h-10 rounded-lg object-contain border border-gray-200 p-1" 
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <label className="text-xs text-gray-500">Created</label>
                  <p className="text-sm text-gray-900">
                    {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Last Updated</label>
                  <p className="text-sm text-gray-900">
                    {selected.updatedAt ? new Date(selected.updatedAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODE */}
        {modalType === "delete" && selected && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-800 text-sm">Confirm Deletion</h4>
                <p className="text-sm text-red-600 mt-0.5">
                  You are about to delete "{selected.name}". This action cannot be undone.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setSelected(null);
                  setDeleteConfirm("");
                }}
                className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selected._id)}
                disabled={deleting || deleteConfirm !== "DELETE"}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Category"
                )}
              </button>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {modalType === "edit" && selected && (
          <EditForm
            selected={selected}
            onClose={() => {
              setOpenModal(false);
              setSelected(null);
              fetchData();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryList;