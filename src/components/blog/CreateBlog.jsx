import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const CreateBlog = () => {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
   const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const onsubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("coverImage", data.coverImage[0]);
    formData.append("author", data.author);
    formData.append("title", data.title);
    formData.append("content", data.content);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/add-blog",
        formData
      );
      reset();
      Navigate("/manage-blog");
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6  pb-2">
        <h1 className="text-3xl underline font-bold text-fuchsia-700">
          Create Coupon
        </h1>

        <Link
          to="/manage-blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
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
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Blog Content
            </label>
            <textarea
              id="content"
              rows={6}
              {...register("content", { required: "Content is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              {...register("author", { required: "Author is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="minOrderAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Blog Image
            </label>
            <input
              type="file"
              id="coverImage"
              {...register("coverImage", { required: "Image is required" })}
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverImage.message}
              </p>
            )}
          </div>
          {preview && (
            <div style={{ marginTop: "1rem" }}>
              <p>Preview:</p>
              <img
                src={preview}
                alt="preview"
                 style={{ width: "80px", height: "80px", borderRadius: "6px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-start">
            <button
              type="submit"
              className={`bg-fuchsia-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <span>Creating...</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                "Create Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
