import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/getblogbyid/${id}`
        );
        reset(res.data);
        setImagePreview(res.data.coverImage.url);
      } catch (err) {
        toast.error("Failed to fetch blog details");
      }
    };
    fetchBlog();
  }, [id, reset]);

  const onsubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);

    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }

    try {
      const res = await axios.put(
        `http://localhost:9000/api/editblog/${id}`,
        formData
      );

      toast.success(res.data.message);
      navigate("/manage-blog");
    } catch (err) {
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-fuchsia-700 underline">
          Edit Blog
        </h1>
        <Link
          to="/manage-blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl hover:bg-fuchsia-800"
        >
          ← Back
        </Link>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div>
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full border p-3 rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="content">Blog Content</label>
            <textarea
              id="content"
              rows={5}
              {...register("content", { required: "Content is required" })}
              className="w-full border p-3 rounded-lg"
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              {...register("author", { required: "Author is required" })}
              className="w-full border p-3 rounded-lg"
            />
            {errors.author && (
              <p className="text-red-500">{errors.author.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="coverImage" className="block mb-1">
              Blog Image
            </label>
            <input
              type="file"
              id="coverImage"
              {...register("coverImage")}
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverImage.message}
              </p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded border"
              />
            )}
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className={`bg-fuchsia-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
