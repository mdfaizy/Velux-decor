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

        <div className='rounded w-48'>
          <Button  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 " onClick={() => (window.location.href = "/admin/subcategory")}>
          + Add SubCategory
        </Button>
        </div>

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