// import React, { useState } from "react";
// import { createReviewApi } from "../../services/reviewApi";

// const CreateReview = () => {
//   const [form, setForm] = useState({
//     reviewerName: "",
//     title: "",
//     location: "",
//     testimonial: "",
//     rating: 5,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await createReviewApi(form);

//       alert("Review Created ✅");

//       setForm({
//         reviewerName: "",
//         title: "",
//         location: "",
//         testimonial: "",
//         rating: 5,
//       });

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

//       <h2 className="text-xl font-bold mb-4">
//         Create Review
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           name="reviewerName"
//           value={form.reviewerName}
//           onChange={handleChange}
//           placeholder="Reviewer Name"
//           className="w-full border p-3 rounded"
//         />

//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full border p-3 rounded"
//         />

//         <input
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholder="Location"
//           className="w-full border p-3 rounded"
//         />

//         <textarea
//           name="testimonial"
//           value={form.testimonial}
//           onChange={handleChange}
//           placeholder="Testimonial"
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="number"
//           name="rating"
//           value={form.rating}
//           onChange={handleChange}
//           min={0}
//           max={5}
//           className="w-full border p-3 rounded"
//         />

//         <button className="w-full bg-blue-600 text-white py-3 rounded">
//           {loading ? "Saving..." : "Create Review"}
//         </button>

//       </form>
//     </div>
//   );
// };

// export default CreateReview;




import React, { useState } from "react";
import { createReviewApi } from "../../services/reviewApi";

import Form from "../../components/ui/Form";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import StarRating from "../../components/ui/StarRating";
import Label from "../../components/ui/Label";

const CreateReview = () => {
  const [form, setForm] = useState({
    reviewerName: "",
    title: "",
    location: "",
    project: "", 
    rating: 5,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (image) {
        formData.append("image", image);
      }

      const res = await createReviewApi(formData);

      if (res.success) {
        alert("Review Created ✅");

        setForm({
          reviewerName: "",
          title: "",
          location: "",
          project:"",
          rating: 5,
          
        });

        setImage(null);
        setPreview(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">Create Review</h2>

      <Form onSubmit={handleSubmit} className="space-y-4">

        {/* Reviewer Name */}
        <div>
          <Label>Reviewer Name</Label>
          <Input
            name="reviewerName"
            value={form.reviewerName}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

        {/* Review */}
        <div>
          <Label>Review</Label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Write review"
          />
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>
        {/* Project */}
<div>
  <Label>Project</Label>
  <Input
    name="project"
    value={form.project}
    onChange={handleChange}
    placeholder="e.g. Living Room Curtains"
  />
</div>

        {/* Image Upload */}
        <div>
          <Label>Upload Image</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full object-cover border"
            />

            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        )}

        {/* Star Rating */}
        <StarRating
          rating={form.rating}
          setRating={(value: number) =>
            setForm((prev) => ({ ...prev, rating: value }))
          }
        />

        <Button type="submit" className="w-full">
          {loading ? "Saving..." : "Create Review"}
        </Button>

      </Form>
    </div>
  );
};

export default CreateReview;