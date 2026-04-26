import { Edit2 } from "lucide-react";

export const ShowroomTable = ({ data, onEdit }: any) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Thumbnail</th>
            <th className="p-3">Title</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">

              <td className="p-3">
                <img
                  src={item.thumbnail}
                  className="w-20 h-14 object-cover rounded"
                />
              </td>

              <td className="p-3 font-medium">{item.title}</td>

              <td className="p-3">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};