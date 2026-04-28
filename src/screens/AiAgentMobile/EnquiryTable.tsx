import { useEffect, useState } from "react";
import { getEnquiryApi, deleteEnquiryApi } from "../../services/enquiryApi";
import { toast } from "react-toastify";

const EnquiryTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const res = await getEnquiryApi();

      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEnquiryApi(id);
      toast.success("Deleted ✅");
      fetchEnquiry();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">Enquiries</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto rounded-xl border">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">

                  <td className="p-3 font-semibold">
                    {item.product?.name || "N/A"}
                  </td>

                  <td className="p-3">{item.name}</td>

                  <td className="p-3">{item.phone}</td>

                  <td className="p-3">
                    {item.message || "-"}
                  </td>

                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
};

export default EnquiryTable;