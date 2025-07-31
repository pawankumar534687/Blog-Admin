import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import EditBlog from "./components/blog/EditBlog";
import Dashboard from "./components/Dashboard";
import CreateBlog from "./components/blog/CreateBlog";
import ManageBlog from "./components/blog/ManageBlog";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/manage-blog" />}>
          <Route path="/manage-blog" element={<ManageBlog />} />

          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
