import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ManageBlog = () => {
  const [allblogs, setallblogs] = useState([]);

  const getallblogs = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/getallblog");

      setallblogs(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  const deletecoupon = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/deleteblogbyid/${id}`,
        
      );

      getallblogs();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getallblogs();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletecoupon(id);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-fuchsia-700 underline text-3xl font-bold">
          All Coupons
        </h1>
        <Link
          className="bg-fuchsia-700 font-bold flex px-2 text-white rounded-2xl cursor-pointer items-center"
          to="/create-blog"
        >
          Add New
        </Link>
      </div>
      <div className="mt-12 overflow-x-auto  rounded shadow max-h-[450px]">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
            <tr className="">
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                S.No
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
               Title
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
               image
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Author
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Content
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Created Date
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Edit
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allblogs.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.title}
                </td>
                <td className="border border-gray-300 w-34 h-12 px-4 py-2">
                  <img src={item.coverImage.url} alt={item.title} />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.author}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.content}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    className="bg-green-500 hover:bg-green-300 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    to={`/edit-blog/${item._id}`}
                  >
                    <span>Edit</span> <TbEdit className="w-4 h-4" />
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <span>delete</span> <MdDeleteForever className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlog;
