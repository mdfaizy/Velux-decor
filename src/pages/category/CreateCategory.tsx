import React, { useState } from "react";
import Form from "../../components/ui/Form";
import Button from "../../components/ui/Button";
import { createCategoryApi } from "../../services/categoryApi";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) return alert("Name required");

    try {
      setLoading(true);
      await createCategoryApi({ name });
      alert("Created ✅");
      setName("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">Create Category</h2>

      <Form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="w-full border p-3 rounded-lg"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </Button>

      </Form>
    </div>
  );
};

export default CreateCategory;