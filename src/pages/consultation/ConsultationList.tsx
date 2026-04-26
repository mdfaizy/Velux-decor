import React, { useEffect, useState } from "react";
import {
  getConsultationsApi,
  deleteConsultationApi,
} from "../../services/consultationApi";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/Table";

import { 
  Trash2, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Inbox, 
  Loader2 
} from "lucide-react";

const ConsultationList = () => {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // 🔥 FETCH
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getConsultationsApi();
      const list = res.data || [];
      setData(list);
      setFiltered(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 SEARCH
  useEffect(() => {
    const result = data.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, data]);

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this consultation?")) return;

    await deleteConsultationApi(id);
    fetchData();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      {/* 🔥 HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Consultation Requests</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all your client inquiries and bookings.</p>
        </div>

        {/* SEARCH */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {/* 🔥 TABLE WRAPPER */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-200">
            <TableRow>
              <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">#</TableCell>
              <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Client Name</TableCell>
              <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Contact Info</TableCell>
              <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Location</TableCell>
              <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Preferred Date</TableCell>
              <TableCell isHeader className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 text-right">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Loader2 className="animate-spin mb-2" size={28} />
                    <span className="text-sm">Fetching records...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length > 0 ? (
              filtered.map((item, index) => (
                <TableRow key={item._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-none">
                  
                  {/* Index */}
                  <TableCell className="text-gray-500 text-sm font-medium py-4">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </TableCell>

                  {/* Name */}
                  <TableCell className="py-4">
                    <span className="font-semibold text-gray-900">{item.fullName}</span>
                  </TableCell>

                  {/* Contact Info (Mobile + Email combined for cleaner look) */}
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        {item.mobileNumber}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        <a href={`mailto:${item.emailAddress}`} className="hover:text-blue-600 transition-colors">
                          {item.emailAddress}
                        </a>
                      </div>
                    </div>
                  </TableCell>

                  {/* City */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <MapPin size={15} className="text-red-400" />
                      {item.city}
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="py-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                      <Calendar size={14} />
                      {new Date(item.preferredDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="py-4 text-right">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Consultation"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <div className="bg-gray-50 p-4 rounded-full mb-3">
                      <Inbox size={32} className="text-gray-300" />
                    </div>
                    <p className="text-base font-medium text-gray-700">No consultations found</p>
                    <p className="text-sm mt-1">Try adjusting your search query.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConsultationList;