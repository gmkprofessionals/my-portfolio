/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getBlogs } from "../../../../actions/getBlogs";
import Link from "next/link";

interface PageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

const BlogListPage = async ({ searchParams }: PageProps) => {

  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1", 10);
  const { blogs, totalCount } = await getBlogs(search, page);
  const totalPages = Math.ceil(totalCount / 100);

  return (
    <div className="p-4 my-10">
      {/* Search */}
      <form className="mb-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by title or category..."
          className="border-[1.5px] border-blue-500 px-3 py-2 rounded w-64 focus:outline-none"
        />
        <button
          type="submit"
          className="ml-1 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Blog Table */}
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-blue-800">
          <tr className="text-white">
            <th className="p-2 border">Blog Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Published At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog: any) => (
            <tr key={blog._id} className="text-center border-t">
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.category}</td>
              <td className="p-2 border">
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString()
                  : "Draft"}
              </td>
              <td className="p-2 border">
                {blog.author?.usrName || "Unknown"}
              </td>
              <td className="p-2 border space-x-2">
                <Link
                  href={`/blogs/${blog._id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
                <Link
                  href={`/blogs/${blog._id}/edit`}
                  className="text-yellow-600 underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/blogs/${blog._id}/publish`}
                  className="text-green-600 underline"
                >
                  Publish
                </Link>
                <Link
                  href={`/blogs/${blog._id}/delete`}
                  className="text-red-600 underline"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex justify-between">
        <Link
          href={`?search=${search}&page=${Math.max(1, page - 1)}`}
          className={`px-4 py-2 bg-gray-200 rounded ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Previous
        </Link>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <Link
          href={`?search=${search}&page=${page + 1}`}
          className={`px-4 py-2 bg-gray-200 rounded ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default BlogListPage;
