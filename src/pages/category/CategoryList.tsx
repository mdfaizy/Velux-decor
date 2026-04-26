import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/Table";
import { getCategoriesApi } from "../../services/categoryApi";

const CategoryList = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCategoriesApi();
      setData(res.data || []);
    };
    fetch();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Category List
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>#</TableCell>
            <TableCell isHeader>Name</TableCell>
            <TableCell isHeader>Status</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.isActive ? "Active" : "Inactive"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryList;