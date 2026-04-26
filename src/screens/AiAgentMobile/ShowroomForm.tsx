// import React, { useState } from "react";
// import apiConnector from "../../services/apiConnector";

// export const ShowroomForm = () => {
//   const [form, setForm] = useState({
//     title: "",
//     src: "",
//     thumbnail: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (key: string, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!form.title || !form.src || !form.thumbnail) {
//         alert("All fields required ❌");
//         return;
//       }

//       setLoading(true);

//       await apiConnector.post("/showrooms", form);

//       alert("Video Created Successfully ✅");

//       // reset form
//       setForm({
//         title: "",
//         src: "",
//         thumbnail: "",
//       });

//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">

//       <h3 className="text-lg font-bold mb-4">
//         Add New Showroom Video
//       </h3>

//       <div className="flex flex-col gap-4">

//         {/* Title */}
//         <input
//           placeholder="Video Title"
//           value={form.title}
//           onChange={(e) => handleChange("title", e.target.value)}
//           className="border p-3 rounded"
//         />

//         {/* Video URL */}
//         <input
//           placeholder="Video URL (src)"
//           value={form.src}
//           onChange={(e) => handleChange("src", e.target.value)}
//           className="border p-3 rounded"
//         />

//         {/* Thumbnail */}
//         <input
//           placeholder="Thumbnail URL"
//           value={form.thumbnail}
//           onChange={(e) => handleChange("thumbnail", e.target.value)}
//           className="border p-3 rounded"
//         />

//         {/* Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className={`py-3 rounded text-white font-semibold ${
//             loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
//           }`}
//         >
//           {loading ? "Creating..." : "Create Video"}
//         </button>

//       </div>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import apiConnector from "../../services/apiConnector";

// export const ShowroomForm = () => {
//   const [form, setForm] = useState({
//     title: "",
//     video: null as File | null,
//     thumbnail: null as File | null,
//   });

//   const [preview, setPreview] = useState({
//     video: "",
//     thumbnail: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (key: string, value: any) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleFileChange = (key: "video" | "thumbnail", file: File) => {
//     handleChange(key, file);

//     const url = URL.createObjectURL(file);
//     setPreview((prev) => ({ ...prev, [key]: url }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!form.title || !form.video || !form.thumbnail) {
//         alert("All fields required ❌");
//         return;
//       }

//       setLoading(true);

//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("video", form.video);
//       formData.append("thumbnail", form.thumbnail);

//       await apiConnector.post("/showrooms", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Video Uploaded Successfully ✅");

//       setForm({
//         title: "",
//         video: null,
//         thumbnail: null,
//       });

//       setPreview({
//         video: "",
//         thumbnail: "",
//       });

//     } catch (error) {
//       console.log(error);
//       alert("Upload failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">

//       <h2 className="text-xl font-bold mb-6 text-gray-800">
//         🎥 Add Showroom Video
//       </h2>

//       <div className="flex flex-col gap-5">

//         {/* Title */}
//         <input
//           placeholder="Enter video title..."
//           value={form.title}
//           onChange={(e) => handleChange("title", e.target.value)}
//           className="border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
//         />

//         {/* Video Upload */}
//         <div>
//           <label className="text-sm font-semibold">Upload Video</label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) =>
//               e.target.files && handleFileChange("video", e.target.files[0])
//             }
//             className="mt-2"
//           />

//           {preview.video && (
//             <video
//               src={preview.video}
//               className="mt-3 w-full rounded-lg"
//               controls
//             />
//           )}
//         </div>

//         {/* Thumbnail Upload */}
//         <div>
//           <label className="text-sm font-semibold">Upload Thumbnail</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               e.target.files &&
//               handleFileChange("thumbnail", e.target.files[0])
//             }
//             className="mt-2"
//           />

//           {preview.thumbnail && (
//             <img
//               src={preview.thumbnail}
//               className="mt-3 w-full h-40 object-cover rounded-lg"
//             />
//           )}
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className={`py-3 rounded-lg font-semibold text-white transition ${
//             loading
//               ? "bg-gray-400"
//               : "bg-black hover:bg-gray-800"
//           }`}
//         >
//           {loading ? "Uploading..." : "Upload Video"}
//         </button>

//       </div>
//     </div>
//   );
// };


import React, { useState } from "react";
import apiConnector from "../../services/apiConnector";

export const ShowroomForm = () => {
  const [form, setForm] = useState({
    title: "",
    video: null as File | null,
    thumbnail: null as File | null,
  });

  const [preview, setPreview] = useState({
    video: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (key: "video" | "thumbnail", file: File) => {
    handleChange(key, file);

    const url = URL.createObjectURL(file);
    setPreview((prev) => ({ ...prev, [key]: url }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.video || !form.thumbnail) {
        alert("All fields required ❌");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("video", form.video);
      formData.append("thumbnail", form.thumbnail);

      await apiConnector.post("/showrooms", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Uploaded successfully ✅");

      setForm({ title: "", video: null, thumbnail: null });
      setPreview({ video: "", thumbnail: "" });

    } catch (error) {
      console.log(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Upload Showroom Video 🎬
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add a new video with thumbnail for your showroom section
        </p>
      </div>

      <div className="space-y-6">

        {/* TITLE */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Video Title
          </label>
          <input
            placeholder="Enter video title..."
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-2 w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* VIDEO UPLOAD */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Upload Video
          </label>

          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-black transition">
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                e.target.files &&
                handleFileChange("video", e.target.files[0])
              }
              className="hidden"
              id="videoUpload"
            />
            <label htmlFor="videoUpload" className="cursor-pointer">
              <p className="text-gray-500 text-sm">
                Click to upload video
              </p>
              <p className="text-xs text-gray-400">
                MP4, max 100MB
              </p>
            </label>
          </div>

          {/* VIDEO PREVIEW */}
          {preview.video && (
            <div className="mt-4">
              <video
                src={preview.video}
                controls
                className="w-full rounded-lg shadow"
              />
              <p className="text-xs text-gray-500 mt-1">
                {form.video?.name}
              </p>
            </div>
          )}
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Upload Thumbnail
          </label>

          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-black transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files &&
                handleFileChange("thumbnail", e.target.files[0])
              }
              className="hidden"
              id="thumbUpload"
            />
            <label htmlFor="thumbUpload" className="cursor-pointer">
              <p className="text-gray-500 text-sm">
                Click to upload thumbnail
              </p>
              <p className="text-xs text-gray-400">
                JPG, PNG recommended
              </p>
            </label>
          </div>

          {/* THUMB PREVIEW */}
          {preview.thumbnail && (
            <div className="mt-4">
              <img
                src={preview.thumbnail}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
              <p className="text-xs text-gray-500 mt-1">
                {form.thumbnail?.name}
              </p>
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

      </div>
    </div>
  );
};