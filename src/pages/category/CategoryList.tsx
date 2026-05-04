// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "../../components/ui/Table";
// import { getCategoriesApi } from "../../services/categoryApi";

// const CategoryList = () => {
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await getCategoriesApi();
//       setData(res.data || []);
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-xl shadow">

//       <h2 className="text-lg font-semibold mb-4">
//         Category List
//       </h2>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell isHeader>#</TableCell>
//             <TableCell isHeader>Name</TableCell>
//             <TableCell isHeader>Status</TableCell>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={item._id}>
//               <TableCell>{index + 1}</TableCell>
//               <TableCell>{item.name}</TableCell>
//               <TableCell>
//                 {item.isActive ? "Active" : "Inactive"}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CategoryList;


// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "../../components/ui/Table";
// import {
//   getCategoriesApi,
//   // toggleCategoryStatusApi,
// } from "../../services/categoryApi";
// import Modal from "../../components/ui/Modal";
// const CategoryList = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
// const [modalType, setModalType] = useState(""); // view | edit
// const [selected, setSelected] = useState<any>(null);
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await getCategoriesApi();
//       console.log(res);
//       setData(res.data || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔥 TOGGLE STATUS
//   const handleToggle = async (id: string) => {
//     try {
//       // await toggleCategoryStatusApi(id);
//       fetchData();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//   try {
//     // await deleteCategoryApi(id);
//     fetchData();
//     toast.success("Deleted Successfully");
//   } catch (err) {
//     toast.error("Delete failed");
//   }
// };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow">

//       <h2 className="text-lg font-semibold mb-4">
//         Category List
//       </h2>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell isHeader>#</TableCell>
//             <TableCell isHeader>Image</TableCell>
//             <TableCell isHeader>Name</TableCell>
//             <TableCell isHeader>Description</TableCell>
//             <TableCell isHeader>Badge</TableCell>
//             <TableCell isHeader>Status</TableCell>
//             <TableCell isHeader>Action</TableCell>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={item._id}>
//               <TableCell>{index + 1}</TableCell>

//               {/* IMAGE */}
//               <TableCell>
//                 {item.image ? (
//                   <img
//                     src={item.image}
//                     alt=""
//                     className="w-12 h-12 rounded object-cover"
//                   />
//                 ) : (
//                   "-"
//                 )}
//               </TableCell>

//               {/* NAME + ICON */}
//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   {item.icon && (
//                     <img
//                       src={item.icon}
//                       className="w-5 h-5"
//                     />
//                   )}
//                   {item.name}
//                 </div>
//               </TableCell>

//               {/* DESCRIPTION */}
//               <TableCell>
//                 {item.description || "-"}
//               </TableCell>

//               {/* BADGE */}
//               <TableCell>
//                 {item.badge ? (
//                   <span className="bg-yellow-400 px-2 py-1 text-xs rounded">
//                     {item.badge}
//                   </span>
//                 ) : (
//                   "-"
//                 )}
//               </TableCell>

//               {/* STATUS */}
//               <TableCell>
//                 <span
//                   className={`px-2 py-1 rounded text-xs ${
//                     item.isActive
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {item.isActive ? "Active" : "Inactive"}
//                 </span>
//               </TableCell>

//               {/* ACTION */}
//               <TableCell>
//                 <button
//                   onClick={() => handleToggle(item._id)}
//                   className="text-blue-500 text-sm"
//                 >
//                   Toggle
//                 </button>
//               </TableCell>

//               <TableCell className="space-x-2">

//   {/* VIEW */}
//   <button
//     onClick={() => {
//       setSelected(item);
//       setModalType("view");
//       setOpenModal(true);
//     }}
//     className="text-green-600 text-sm"
//   >
//     View
//   </button>

//   {/* EDIT */}
//   <button
//     onClick={() => {
//       setSelected(item);
//       setModalType("edit");
//       setOpenModal(true);
//     }}
//     className="text-blue-600 text-sm"
//   >
//     Edit
//   </button>

//   {/* DELETE */}
//   <button
//     onClick={() => handleDelete(item._id)}
//     className="text-red-600 text-sm"
//   >
//     Delete
//   </button>

// </TableCell>

//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {loading && (
//         <p className="text-center mt-4">Loading...</p>
//       )}


//       <Modal
//   isOpen={openModal}
//   onClose={() => setOpenModal(false)}
//   title={modalType === "view" ? "View Category" : "Edit Category"}
// >

//   {/* 🔍 VIEW MODE */}
//   {modalType === "view" && selected && (
//     <div className="space-y-3">
//       <p><b>Name:</b> {selected.name}</p>
//       <p><b>Description:</b> {selected.description}</p>
//       <p><b>Badge:</b> {selected.badge}</p>

//       {selected.image && (
//         <img src={selected.image} className="w-32 rounded" />
//       )}
//     </div>
//   )}

//   {/* ✏️ EDIT MODE */}
//   {modalType === "edit" && selected && (
//     <EditForm
//       selected={selected}
//       onClose={() => {
//         setOpenModal(false);
//         fetchData();
//       }}
//     />
//   )}

// </Modal>
//     </div>
//   );
// };

// export default CategoryList;




// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "../../components/ui/Table";

// import {
//   getCategoriesApi,
// } from "../../services/categoryApi";

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
//       // await deleteCategoryApi(id);
//       toast.success("Deleted Successfully");
//       fetchData();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const handleToggle = async (id: string) => {
//     try {
//       // await toggleCategoryStatusApi(id);
//       fetchData();
//     } catch {
//       toast.error("Toggle failed");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow">

//       <h2 className="text-lg font-semibold mb-4">
//         Category List
//       </h2>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell isHeader>#</TableCell>
//             <TableCell isHeader>Image</TableCell>
//             <TableCell isHeader>Name</TableCell>
//             <TableCell isHeader>Description</TableCell>
//             <TableCell isHeader>Badge</TableCell>
//             <TableCell isHeader>Status</TableCell>
//             <TableCell isHeader>Action</TableCell>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={item._id}>

//               <TableCell>{index + 1}</TableCell>

//               <TableCell>
//                 {item.image ? (
//                   <img src={item.image} className="w-12 h-12 rounded" />
//                 ) : "-"}
//               </TableCell>

//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   {item.icon && <img src={item.icon} className="w-5 h-5" />}
//                   {item.name}
//                 </div>
//               </TableCell>

//               <TableCell>{item.description || "-"}</TableCell>

//               <TableCell>
//                 {item.badge ? (
//                   <span className="bg-yellow-400 px-2 py-1 text-xs rounded">
//                     {item.badge}
//                   </span>
//                 ) : "-"}
//               </TableCell>

//               <TableCell>
//                 <span className={`px-2 py-1 rounded text-xs ${
//                   item.isActive
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}>
//                   {item.isActive ? "Active" : "Inactive"}
//                 </span>
//               </TableCell>

//               {/* 🔥 FINAL ACTION */}
//               <TableCell className="space-x-2">

//                 <button onClick={() => handleToggle(item._id)}>Toggle</button>

//                 <button
//                   onClick={() => {
//                     setSelected(item);
//                     setModalType("view");
//                     setOpenModal(true);
//                   }}
//                   className="text-green-600"
//                 >
//                   View
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSelected(item);
//                     setModalType("edit");
//                     setOpenModal(true);
//                   }}
//                   className="text-blue-600"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="text-red-600"
//                 >
//                   Delete
//                 </button>

//               </TableCell>

//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {loading && <p className="text-center mt-4">Loading...</p>}

//       {/* 🔥 MODAL */}
//       <Modal
//         isOpen={openModal}
//         onClose={() => setOpenModal(false)}
//         title={modalType === "view" ? "View Category" : "Edit Category"}
//       >

//         {/* VIEW */}
//         {modalType === "view" && selected && (
//           <div className="space-y-4">

//             <div className="flex items-center gap-3">
//               {selected.icon && (
//                 <img src={selected.icon} className="w-10 h-10 rounded-full" />
//               )}
//               <h3 className="text-lg font-semibold">{selected.name}</h3>
//             </div>

//             {selected.image && (
//               <img src={selected.image} className="w-full h-40 object-cover rounded" />
//             )}

//             <p><b>Description:</b> {selected.description || "-"}</p>
//             <p><b>Badge:</b> {selected.badge || "-"}</p>

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

import { getCategoriesApi } from "../../services/categoryApi";
import Modal from "../../components/ui/Modal";
import EditForm from "./EditForm";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getCategoriesApi();
      setData(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // await deleteCategoryApi(id);
      toast.success("Deleted Successfully");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      // await toggleCategoryStatusApi(id);
      toast.success("Status updated");
      fetchData();
    } catch {
      toast.error("Toggle failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-full overflow-x-auto">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your product categories and their status.</p>
        </div>
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-200">
            <TableRow>
              <TableCell isHeader className="text-gray-500 font-semibold py-4 px-4">#</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-4">Image</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-4">Category</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-4">Badge</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-4">Status</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-4 text-right pr-6">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg className="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Loading categories...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                  
                  <TableCell className="text-gray-500 px-4 py-3">{index + 1}</TableCell>

                  <TableCell className="py-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                        No Img
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      {item.icon && <img src={item.icon} alt="icon" className="w-6 h-6 rounded-md object-contain" />}
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1 max-w-[200px]">{item.description || "No description"}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-3">
                    {item.badge ? (
                      <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 text-xs font-medium rounded-full">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </TableCell>

                  <TableCell className="py-3">
                    <button 
                      onClick={() => handleToggle(item._id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        item.isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </button>
                  </TableCell>

                  {/* MODERN ACTIONS WITH ICONS */}
                  <TableCell className="py-3 pr-6 text-right space-x-2">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      
                      {/* View Button */}
                      <button
                        onClick={() => {
                          setSelected(item);
                          setModalType("view");
                          setOpenModal(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setSelected(item);
                          setModalType("edit");
                          setOpenModal(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if(window.confirm("Are you sure you want to delete this category?")) {
                            handleDelete(item._id)
                          }
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>

                    </div>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* MODAL VIEW */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={modalType === "view" ? "Category Details" : "Edit Category"}
      >
        {modalType === "view" && selected && (
          <div className="space-y-6">
            
            {/* Modal Header inside Body */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              {selected.icon ? (
                <img src={selected.icon} alt="Icon" className="w-12 h-12 p-1 bg-gray-50 border border-gray-200 rounded-xl" />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">#</div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${selected.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  {selected.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {selected.image && (
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <img src={selected.image} alt="Preview" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-sm">
              <div>
                <span className="block text-gray-500 font-medium mb-1">Description</span>
                <p className="text-gray-800">{selected.description || "No description provided."}</p>
              </div>
              {selected.badge && (
                <div>
                  <span className="block text-gray-500 font-medium mb-1">Badge</span>
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                    {selected.badge}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
               <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                 Close
               </button>
            </div>
          </div>
        )}

        {/* EDIT */}
        {modalType === "edit" && selected && (
          <EditForm
            selected={selected}
            onClose={() => {
              setOpenModal(false);
              fetchData();
            }}
          />
        )}
      </Modal>

    </div>
  );
};

export default CategoryList;