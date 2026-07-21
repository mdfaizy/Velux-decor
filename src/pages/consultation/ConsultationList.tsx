// import React, { useEffect, useState } from "react";
// import {
//   getConsultationsApi,
//   deleteConsultationApi,
//   updateConsultationStatusApi
// } from "../../services/consultationApi";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "../../components/ui/Table";

// import { 
//   Trash2, 
//   Search, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Calendar, 
//   Inbox, 
//   Loader2 
// } from "lucide-react";

// const ConsultationList = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [filtered, setFiltered] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   // 🔥 FETCH
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await getConsultationsApi();
//       const list = res.data || [];
//       setData(list);
//       setFiltered(list);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔍 SEARCH
//   useEffect(() => {
//     const result = data.filter((item) =>
//       item.fullName.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(result);
//   }, [search, data]);

//   // ❌ DELETE
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this consultation?")) return;

//     await deleteConsultationApi(id);
//     fetchData();
//   };


//   const handleStatusChange = async (
//   id: string,
//   status: string
// ) => {
//   try {
//     await updateConsultationStatusApi(id, status);
//     fetchData();
//   } catch (err) {
//     console.log(err);
//   }
// };


//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//       {/* 🔥 HEADER */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <h2 className="text-xl font-bold text-gray-900">Consultation Requests</h2>
//           <p className="text-sm text-gray-500 mt-1">Manage all your client inquiries and bookings.</p>
//         </div>

//         {/* SEARCH */}
//         <div className="relative group">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-gray-50 focus:bg-white"
//           />
//         </div>
//       </div>

//       {/* 🔥 TABLE WRAPPER */}
//       <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
//         <Table>
//           <TableHeader className="bg-gray-50/80 border-b border-gray-200">
//             <TableRow>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">#</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Client Name</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Contact Info</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Location</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Preferred Date</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Status</TableCell>
//               <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 text-right">Action</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="h-48 text-center">
//                   <div className="flex flex-col items-center justify-center text-gray-500">
//                     <Loader2 className="animate-spin mb-2" size={28} />
//                     <span className="text-sm">Fetching records...</span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : filtered.length > 0 ? (
//               filtered.map((item, index) => (
//                 <TableRow key={item._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-none">
                  
//                   {/* Index */}
//                   <TableCell className="text-gray-500 text-sm font-medium py-4">
//                     {index + 1 < 10 ? `0${index + 1}` : index + 1}
//                   </TableCell>

//                   {/* Name */}
//                   <TableCell className="py-4">
//                     <span className="font-semibold text-gray-900">{item.fullName}</span>
//                   </TableCell>

//                   {/* Contact Info (Mobile + Email combined for cleaner look) */}
//                   <TableCell className="py-4">
//                     <div className="flex flex-col gap-1.5">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Phone size={14} className="text-gray-400" />
//                         {item.mobileNumber}
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Mail size={14} className="text-gray-400" />
//                         <a href={`mailto:${item.emailAddress}`} className="hover:text-blue-600 transition-colors">
//                           {item.emailAddress}
//                         </a>
//                       </div>
//                     </div>
//                   </TableCell>

//                   {/* City */}
//                   <TableCell className="py-4">
//                     <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
//                       <MapPin size={15} className="text-red-400" />
//                       {item.city}
//                     </div>
//                   </TableCell>

//                   {/* Date */}
//                   <TableCell className="py-4">
//                     <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
//                       <Calendar size={14} />
//                       {new Date(item.preferredDate).toLocaleDateString('en-GB', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric'
//                       })}
//                     </div>
//                   </TableCell>
// <TableCell>
//   <select
//     value={item.status}
//     onChange={(e) =>
//       handleStatusChange(item._id, e.target.value)
//     }
//     className="border rounded-lg px-2 py-1 text-sm"
//   >
//     <option value="pending">Pending</option>
//     <option value="contacted">Contacted</option>
//     <option value="resolved">Resolved</option>
//     <option value="cancelled">Cancelled</option>
//   </select>
// </TableCell>
//                   {/* Action */}
//                   <TableCell className="py-4 text-right">
//                     <div className="flex justify-end">
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                         title="Delete Consultation"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </TableCell>

//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="h-64 text-center">
//                   <div className="flex flex-col items-center justify-center text-gray-400">
//                     <div className="bg-gray-50 p-4 rounded-full mb-3">
//                       <Inbox size={32} className="text-gray-300" />
//                     </div>
//                     <p className="text-base font-medium text-gray-700">No consultations found</p>
//                     <p className="text-sm mt-1">Try adjusting your search query.</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default ConsultationList;




import React, { useEffect, useState } from "react";
import {
  getConsultationsApi,
  deleteConsultationApi,
  updateConsultationStatusApi
} from "../../services/consultationApi";
import { toast } from "react-toastify";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/Table";

import Modal from "../../components/ui/Modal";

import { 
  Trash2, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Inbox, 
  RefreshCw,
  Eye,
  Filter,
  X,
  Clock,
  CheckCircle,
  XCircle,
  PhoneCall,
  User,
  MessageSquare,
  AlertCircle,
  MoreVertical
} from "lucide-react";

// Types
interface Consultation {
  _id: string;
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  city: string;
  preferredDate: string;
  status: "pending" | "contacted" | "resolved" | "cancelled";
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ConsultationList = () => {
  const [data, setData] = useState<Consultation[]>([]);
  const [filteredData, setFilteredData] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getConsultationsApi();
      const list = res.data || [];
      setData(list);
      setFilteredData(list);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load consultations");
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
        item.fullName.toLowerCase().includes(term) ||
        item.emailAddress.toLowerCase().includes(term) ||
        item.mobileNumber.includes(term) ||
        item.city.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(item => item.status === statusFilter);
    }
    
    setFilteredData(result);
  }, [searchTerm, statusFilter, data]);

  // Delete
  const handleDelete = async (id: string) => {
    if (deleteConfirm !== "DELETE") {
      toast.warning('Type "DELETE" to confirm');
      return;
    }
    
    try {
      setDeleting(true);
      await deleteConsultationApi(id);
      toast.success("Consultation deleted successfully");
      setDeleteModal(false);
      setSelectedConsultation(null);
      setDeleteConfirm("");
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete consultation");
    } finally {
      setDeleting(false);
    }
  };

  // Status Change
  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingStatus(id);
    try {
      await updateConsultationStatusApi(id, status);
      toast.success(`Status updated to ${status}`);
      fetchData();
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // View Consultation
  const handleView = (item: Consultation) => {
    setSelectedConsultation(item);
    setViewModal(true);
  };

  // Delete Click
  const handleDeleteClick = (item: Consultation) => {
    setSelectedConsultation(item);
    setDeleteConfirm("");
    setDeleteModal(true);
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: Clock
      },
      contacted: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: PhoneCall
      },
      resolved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle
      },
      cancelled: {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-200",
        icon: XCircle
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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

  // Consultation Table Row
  const ConsultationTableRow = ({ item, index }: { item: Consultation; index: number }) => (
    <TableRow className="hover:bg-gray-50/80 transition-colors group">
      <TableCell className="text-gray-500 px-4 py-3 text-sm w-12 text-center">
        {index + 1}
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-xs">
            {item.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900">{item.fullName}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <User className="w-3 h-3" />
              {item.emailAddress}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{item.mobileNumber}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <a 
              href={`mailto:${item.emailAddress}`} 
              className="hover:text-blue-600 transition-colors"
            >
              {item.emailAddress}
            </a>
          </div>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <MapPin className="w-4 h-4 text-red-400" />
          {item.city}
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(item.preferredDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={item.status} />
          {item.status !== "resolved" && item.status !== "cancelled" && (
            <select
              value={item.status}
              onChange={(e) => handleStatusChange(item._id, e.target.value)}
              disabled={updatingStatus === item._id}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
            >
              <option value="pending">Set Pending</option>
              <option value="contacted">Set Contacted</option>
              <option value="resolved">Set Resolved</option>
              <option value="cancelled">Set Cancelled</option>
            </select>
          )}
          {updatingStatus === item._id && (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
          )}
        </div>
      </TableCell>

      <TableCell className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            onClick={() => handleView(item)}
            icon={Eye}
            label="View"
            color="blue"
            title="View consultation details"
          />
          
          <ActionButton
            onClick={() => handleDeleteClick(item)}
            icon={Trash2}
            label="Delete"
            color="red"
            title="Delete consultation"
          />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* HEADER SECTION */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Consultations
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage all client inquiries and consultation requests
              {filteredData.length > 0 && (
                <span className="ml-2 text-gray-400">
                  ({filteredData.length} {filteredData.length === 1 ? "request" : "requests"})
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
                placeholder="Search by name, email, phone, or city..."
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

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-200">
            <TableRow>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm w-12 text-center">#</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm">Client</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm">Contact</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm">Location</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm">Date</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm">Status</TableCell>
              <TableCell isHeader className="text-gray-500 font-semibold py-3 px-4 text-sm text-right">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <RefreshCw className="w-8 h-8 text-blue-600 mb-3 animate-spin" />
                    <p className="text-sm">Loading consultations...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Inbox className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      {searchTerm || statusFilter !== "all"
                        ? "No matching consultations found" 
                        : "No consultation requests"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Consultation requests will appear here"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <ConsultationTableRow 
                  key={item._id} 
                  item={item} 
                  index={index} 
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* VIEW CONSULTATION MODAL */}
      <Modal
        isOpen={viewModal}
        onClose={() => {
          setViewModal(false);
          setSelectedConsultation(null);
        }}
        title="Consultation Details"
        size="lg"
      >
        {selectedConsultation && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-2xl flex-shrink-0">
                {selectedConsultation.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedConsultation.fullName}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <StatusBadge status={selectedConsultation.status} />
                  <span className="text-xs text-gray-500">
                    {new Date(selectedConsultation.createdAt || selectedConsultation.preferredDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Email Address</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2 mt-0.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {selectedConsultation.emailAddress}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Phone Number</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2 mt-0.5">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedConsultation.mobileNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">City</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                    {selectedConsultation.city}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Preferred Date</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2 mt-0.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(selectedConsultation.preferredDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            {selectedConsultation.message && (
              <div className="pt-4 border-t border-gray-100">
                <label className="text-xs font-medium text-gray-500">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedConsultation.message}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Update Status:</label>
                <select
                  value={selectedConsultation.status}
                  onChange={(e) => {
                    handleStatusChange(selectedConsultation._id, e.target.value);
                    setViewModal(false);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                onClick={() => setViewModal(false)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Close
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
          setSelectedConsultation(null);
          setDeleteConfirm("");
        }}
        title="Delete Consultation"
      >
        {deleteModal && selectedConsultation && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-800">Confirm Deletion</h4>
                <p className="text-sm text-red-600 mt-1">
                  You are about to delete consultation from "{selectedConsultation.fullName}".
                  This action cannot be undone.
                </p>
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
                  setSelectedConsultation(null);
                  setDeleteConfirm("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedConsultation._id)}
                disabled={deleting || deleteConfirm !== "DELETE"}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Consultation"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ConsultationList;