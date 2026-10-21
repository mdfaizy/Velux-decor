import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search, Trash2, Upload, UserPlus } from "lucide-react";
import Button from "../../components/ui/Button";
import {
  Customer,
  CustomerImportRow,
  getCustomersApi,
  createCustomerApi,
  importCustomersApi,
  updateCustomerApi,
  deleteCustomerApi,
} from "../../services/customerApi";

const PAGE_SIZE = 25;
const IMPORT_CHUNK = 1000;

const SOURCE_LABEL: Record<Customer["source"], string> = {
  contact: "Contact form",
  manual: "Added by admin",
  import: "Imported",
};

// "919876543210" → "+91 98765 43210"
const formatPhone = (p: string) =>
  p.length === 12 && p.startsWith("91")
    ? `+91 ${p.slice(2, 7)} ${p.slice(7)}`
    : `+${p}`;

/* Reads pasted text / CSV: one customer per line, columns in any order.
   The cell with 10+ digits is the phone, a cell with "@" is the email,
   the first other cell is the name. Header rows are skipped automatically. */
const parseCustomerLines = (text: string): CustomerImportRow[] =>
  text
    .split(/\r?\n/)
    .map((line) => line.split(/[,;\t]/).map((c) => c.trim().replace(/^"|"$/g, "")))
    .map((cells) => {
      const phone = cells.find((c) => c.replace(/\D/g, "").length >= 10);
      if (!phone) return null;
      const email = cells.find((c) => c.includes("@"));
      const name = cells.find((c) => c && c !== phone && c !== email);
      return { phone, email, name };
    })
    .filter((r): r is CustomerImportRow => r !== null);

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [counts, setCounts] = useState({ total: 0, optedIn: 0 });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [optInFilter, setOptInFilter] = useState<"" | "yes" | "no">("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [panel, setPanel] = useState<"add" | "import" | null>(null);
  const [addForm, setAddForm] = useState({ name: "", phone: "", email: "", whatsappOptIn: false });
  const [importText, setImportText] = useState("");
  const [importOptIn, setImportOptIn] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomersApi({ page, limit: PAGE_SIZE, search, optIn: optInFilter });
      setCustomers(res.data || []);
      setCounts(res.counts);
      setPagination(res.pagination);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load customers ❌");
    } finally {
      setLoading(false);
    }
  };

  // debounce typing in the search box
  useEffect(() => {
    const t = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(t);
  }, [page, search, optInFilter]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.phone.trim()) {
      toast.warning("Phone number is required ⚠️");
      return;
    }
    try {
      setSaving(true);
      await createCustomerApi(addForm);
      toast.success("Customer added ✅");
      setAddForm({ name: "", phone: "", email: "", whatsappOptIn: false });
      fetchCustomers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add customer ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImportText(String(reader.result || ""));
    reader.readAsText(file);
    e.target.value = "";
  };

  const importRows = parseCustomerLines(importText);

  const handleImport = async () => {
    if (!importRows.length) {
      toast.warning("No phone numbers found ⚠️");
      return;
    }
    try {
      setSaving(true);
      const total = { added: 0, alreadySaved: 0, invalid: 0 };
      for (let i = 0; i < importRows.length; i += IMPORT_CHUNK) {
        const res = await importCustomersApi(importRows.slice(i, i + IMPORT_CHUNK), importOptIn);
        total.added += res.data.added;
        total.alreadySaved += res.data.alreadySaved;
        total.invalid += res.data.invalid;
      }
      toast.success(
        `${total.added} added, ${total.alreadySaved} already saved` +
          (total.invalid ? `, ${total.invalid} invalid skipped` : "")
      );
      setImportText("");
      setPanel(null);
      fetchCustomers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Import failed ❌");
    } finally {
      setSaving(false);
    }
  };

  const toggleOptIn = async (c: Customer) => {
    try {
      await updateCustomerApi(c._id, { whatsappOptIn: !c.whatsappOptIn });
      fetchCustomers();
    } catch {
      toast.error("Failed to update ❌");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomerApi(id);
      toast.success("Customer deleted ✅");
      setConfirmDeleteId(null);
      fetchCustomers();
    } catch {
      toast.error("Failed to delete ❌");
    }
  };

  const inputCls =
    "w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ===== HEADER + COUNTS ===== */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
          <p className="text-gray-500 text-sm">
            Phone numbers for WhatsApp offers. Contact form submissions are added automatically.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total customers</p>
            <p className="text-2xl font-bold text-gray-800">{counts.total.toLocaleString()}</p>
          </div>
          <div className="bg-white border rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-500">WhatsApp opted in</p>
            <p className="text-2xl font-bold text-green-600">{counts.optedIn.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setPanel(panel === "add" ? null : "add")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            panel === "add" ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white hover:bg-gray-50"
          }`}
        >
          <UserPlus size={16} /> Add customer
        </button>
        <button
          onClick={() => setPanel(panel === "import" ? null : "import")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            panel === "import" ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white hover:bg-gray-50"
          }`}
        >
          <Upload size={16} /> Import many
        </button>
      </div>

      {/* ===== ADD ONE ===== */}
      {panel === "add" && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow border">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                placeholder="Rahul Sharma"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                value={addForm.phone}
                onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                placeholder="98765 43210"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                value={addForm.email}
                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                placeholder="optional"
                className={inputCls}
              />
            </div>
          </div>
          <label className="flex items-start gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={addForm.whatsappOptIn}
              onChange={(e) => setAddForm({ ...addForm, whatsappOptIn: e.target.checked })}
              className="w-4 h-4 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              This customer agreed to receive offers on WhatsApp
            </span>
          </label>
          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Customer"}
            </Button>
          </div>
        </form>
      )}

      {/* ===== IMPORT MANY ===== */}
      {panel === "import" && (
        <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Paste numbers (one per line) or upload a CSV file
            </p>
            <p className="text-xs text-gray-500">
              Each line can be just a number, or "Name, Number, Email" in any order. From Excel use
              File → Save As → CSV. Numbers without a country code are treated as Indian (+91).
            </p>
          </div>
          <textarea
            rows={8}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={"Rahul Sharma, 9876543210\nPriya, +91 91234 56789, priya@example.com\n9988776655"}
            className="w-full border px-4 py-2 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload size={16} /> Choose CSV file
              <input type="file" accept=".csv,.txt" onChange={handleFile} className="hidden" />
            </label>
            <span className="text-sm text-gray-600">
              {importRows.length.toLocaleString()} number{importRows.length === 1 ? "" : "s"} found
            </span>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={importOptIn}
              onChange={(e) => setImportOptIn(e.target.checked)}
              className="w-4 h-4 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              All these customers agreed to receive offers on WhatsApp
            </span>
          </label>
          <div className="flex justify-end">
            <Button onClick={handleImport} disabled={saving || !importRows.length}>
              {saving ? "Importing..." : `Import ${importRows.length.toLocaleString()} customers`}
            </Button>
          </div>
        </div>
      )}

      {/* ===== LIST ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name, number or email"
              className="w-full border pl-9 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={optInFilter}
            onChange={(e) => { setOptInFilter(e.target.value as any); setPage(1); }}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All customers</option>
            <option value="yes">Opted in</option>
            <option value="no">Not opted in</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">WhatsApp Number</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">WhatsApp offers</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && !customers.length ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">No customers found</td></tr>
              ) : (
                customers.map((c) => (
                  <tr key={c._id} className="border-t">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{c.name || "—"}</p>
                      {c.email && <p className="text-xs text-gray-500">{c.email}</p>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatPhone(c.phone)}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{SOURCE_LABEL[c.source]}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleOptIn(c)}
                        title="Click to change"
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          c.whatsappOptIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {c.whatsappOptIn ? "Opted in" : "Not opted in"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end items-center gap-2">
                        {confirmDeleteId === c._id ? (
                          <>
                            <span className="text-xs text-gray-600">Delete?</span>
                            <button
                              onClick={() => handleDelete(c._id)}
                              className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-3 py-1 text-xs rounded border hover:bg-gray-50"
                            >
                              No
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(c._id)}
                            className="p-2 rounded hover:bg-red-50 text-red-600"
                            aria-label="Delete customer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
          <span>
            {pagination.total.toLocaleString()} result{pagination.total === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span>Page {pagination.page} of {pagination.pages}</span>
            <button
              disabled={page >= pagination.pages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
