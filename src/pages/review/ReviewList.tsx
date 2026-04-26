import React, { useEffect, useState } from "react";
import {
  getReviewsApi,
  deleteReviewApi,
} from "../../services/reviewApi";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/Table";

import { Trash2 } from "lucide-react";

const ReviewList = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviewsApi();
      setData(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    await deleteReviewApi(id);
    fetchReviews();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Reviews
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>

          <TableHeader>
            <TableRow>
              <TableCell isHeader>#</TableCell>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Title</TableCell>
              <TableCell isHeader>Location</TableCell>
              <TableCell isHeader>Rating</TableCell>
              <TableCell isHeader>Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>

            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={item._id}>

                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{item.reviewerName}</TableCell>

                  <TableCell>{item.title}</TableCell>

                  <TableCell>{item.location}</TableCell>

                  <TableCell>
                    ⭐ {item.rating}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  No reviews found
                </TableCell>
              </TableRow>
            )}

          </TableBody>

        </Table>
      )}

    </div>
  );
};

export default ReviewList;