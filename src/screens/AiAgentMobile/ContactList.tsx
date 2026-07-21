import React, { useEffect, useState } from "react";
import { 
  getContactsApi, 
  deleteContactApi, 
  updateContactApi 
} from "../../services/contactApi";
import { toast } from "react-toastify";
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Inbox,
  X,
  Edit,
  Reply,
  MoreVertical
} from "lucide-react";
import Modal from "../../components/ui/Modal";

// Types
interface Contact {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
  updatedAt?: string;
}

const ContactList = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await getContactsApi();
      if (res.success) {
        const contacts = res.data || [];
        setData(contacts);
        setFilteredData(contacts);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = data;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(item => 
        item.firstName.toLowerCase().includes(term) ||
        item.lastName?.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.phone?.includes(term) ||
        item.message.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(item => item.status === statusFilter);
    }
    
    if (serviceFilter !== "all") {
      result = result.filter(item => item.service === serviceFilter);
    }
    
    setFilteredData(result);
  }, [searchTerm, statusFilter, serviceFilter, data]);

  // Delete Contact
  const handleDelete = async (id: string) => {
    if (deleteConfirm !== "DELETE") {
      toast.warning('Type "DELETE" to confirm');
      return;
    }
    
    try {
      setDeleting(true);
      await deleteContactApi(id);
      toast.success("Contact deleted successfully");
      setDeleteModal(false);
      setSelectedContact(null);
      setDeleteConfirm("");
      fetchContacts();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete contact");
    } finally {
      setDeleting(false);
    }
  };

  // Update Status
  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateContactApi(id, { status });
      toast.success(`Status updated to ${status}`);
      fetchContacts();
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status");
    }
  };

  // Reply to Contact
  const handleReply = async () => {
    if (!replyMessage.trim()) {
      toast.warning("Please enter a reply message");
      return;
    }

    try {
      setSendingReply(true);
      // Here you would call an API to send email reply
      // await sendReplyApi(selectedContact?._id, replyMessage);
      
      // Update status to replied
      await updateContactApi(selectedContact!._id, { status: "replied" });
      
      toast.success("Reply sent successfully");
      setReplyModal(false);
      setReplyMessage("");
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      console.error("Reply error:", err);
      toast.error("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      new: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: Clock
      },
      read: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: CheckCircle
      },
      replied: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: Mail
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
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
    color?: "gray" | "blue" | "indigo" | "red" | "green" | "amber";
    title: string;
    disabled?: boolean;
  }) => {
    const colorClasses = {
      gray: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      blue: "text-gray-500 hover:text-blue-600 hover:bg-blue-50",
      indigo: "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50",
      red: "text-gray-500 hover:text-red-600 hover:bg-red-50",
      green: "text-gray-500 hover:text-green-600 hover:bg-green-50",
      amber: "text-gray-500 hover:text-amber-600 hover:bg-amber-50",
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

  // Contact Table Row
  const ContactTableRow = ({ item, index }: { item: Contact; index: number }) => (
    <tr className="hover:bg-gray-50/80 transition-colors group">
      <td className="px-4 py-3 text-sm text-gray-500 w-12 text-center">
        {index + 1}
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
            {item.firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900">
              {item.firstName} {item.lastName || ""}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Mail className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{item.email}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        {item.phone && (
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{item.phone}</span>
          </div>
        )}
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
          {item.service || "General"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="max-w-[120px]">
          <p className="text-sm text-gray-600 truncate" title={item.message}>
            {item.message.substring(0, 50)}...
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={item.status} />
          <select
            value={item.status}
            onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="new">Set New</option>
            <option value="read">Set Read</option>
            <option value="replied">Set Replied</option>
          </select>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(item.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </td>

      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            onClick={() => {
              setSelectedContact(item);
              setViewModal(true);
            }}
            icon={Eye}
            label="View"
            color="blue"
            title="View contact details"
          />
          
          <ActionButton
            onClick={() => {
              setSelectedContact(item);
              setReplyModal(true);
              setReplyMessage("");
            }}
            icon={Reply}
            label="Reply"
            color="green"
            title="Reply to contact"
          />

          <ActionButton
            onClick={() => {
              setSelectedContact(item);
              setDeleteConfirm("");
              setDeleteModal(true);
            }}
            icon={Trash2}
            label="Delete"
            color="red"
            title="Delete contact"
          />
        </div>
      </td>
    </tr>
  );

  // Get unique services for filter
  const services = [...new Set(data.map(item => item.service).filter(Boolean))];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Contact Messages
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage all customer contact messages
              {filteredData.length > 0 && (
                <span className="ml-2 text-gray-400">
                  ({filteredData.length} {filteredData.length === 1 ? "message" : "messages"})
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchContacts}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>

            {services.length > 0 && (
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="all">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm w-12 text-center">#</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Contact</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Phone</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Service</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Message</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Status</th>
              <th className="text-left text-gray-500 font-semibold py-3 px-4 text-sm">Date</th>
              <th className="text-right text-gray-500 font-semibold py-3 px-4 text-sm">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <RefreshCw className="w-8 h-8 text-indigo-600 mb-3 animate-spin" />
                    <p className="text-sm">Loading messages...</p>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Inbox className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      {searchTerm || statusFilter !== "all" || serviceFilter !== "all"
                        ? "No matching messages found" 
                        : "No contact messages"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchTerm || statusFilter !== "all" || serviceFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Messages from customers will appear here"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <ContactTableRow key={item._id} item={item} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Contact Modal */}
      <Modal
        isOpen={viewModal}
        onClose={() => {
          setViewModal(false);
          setSelectedContact(null);
        }}
        title="Contact Details"
        size="lg"
      >
        {selectedContact && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-medium text-2xl flex-shrink-0">
                {selectedContact.firstName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedContact.firstName} {selectedContact.lastName || ""}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <StatusBadge status={selectedContact.status} />
                  <span className="text-xs text-gray-400">
                    {new Date(selectedContact.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500">Email Address</label>
                <p className="text-sm text-gray-900 flex items-center gap-2 mt-0.5">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${selectedContact.email}`} className="hover:text-indigo-600">
                    {selectedContact.email}
                  </a>
                </p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Phone Number</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2 mt-0.5">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selectedContact.phone}`} className="hover:text-indigo-600">
                      {selectedContact.phone}
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Service */}
            {selectedContact.service && (
              <div>
                <label className="text-xs font-medium text-gray-500">Service Interested</label>
                <p className="text-sm text-gray-900 mt-0.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    {selectedContact.service}
                  </span>
                </p>
              </div>
            )}

            {/* Message */}
            <div className="pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500">Message</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => {
                    handleStatusUpdate(selectedContact._id, e.target.value);
                    setViewModal(false);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setReplyModal(true);
                    setViewModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button
                  onClick={() => setViewModal(false)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={replyModal}
        onClose={() => {
          setReplyModal(false);
          setSelectedContact(null);
          setReplyMessage("");
        }}
        title="Reply to Contact"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500">Replying to:</p>
              <p className="text-sm font-medium text-gray-900">
                {selectedContact.firstName} {selectedContact.lastName || ""}
              </p>
              <p className="text-xs text-gray-500">{selectedContact.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reply Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setReplyModal(false);
                  setSelectedContact(null);
                  setReplyMessage("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={sendingReply || !replyMessage.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {sendingReply ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedContact(null);
          setDeleteConfirm("");
        }}
        title="Delete Contact"
      >
        {deleteModal && selectedContact && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-800">Confirm Deletion</h4>
                <p className="text-sm text-red-600 mt-1">
                  You are about to delete message from "{selectedContact.firstName}".
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
                  setSelectedContact(null);
                  setDeleteConfirm("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedContact._id)}
                disabled={deleting || deleteConfirm !== "DELETE"}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Message"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactList;