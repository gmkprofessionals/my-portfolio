'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBlogs } from '../../../../actions/getBlogs';

const BlogListClient: React.FC = () => {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [query, setQuery] = useState(search);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { blogs, totalCount } = await getBlogs(search, page);
        setBlogs(blogs);
        setTotalCount(totalCount);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query !== search) {
        router.push(`?search=${query}&page=1`);
      }
    }, 400); // debounce delay in ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const totalPages = Math.ceil(totalCount / 100);

  return (
    <div className="p-4 my-10">
      {/* Search Input without form */}
      <div className="mb-2">
        <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or category..."
          className="border-[1.5px] border-blue-500 px-3 py-2 rounded w-64 focus:outline-none"
        />
      </div>

      {/* Table or Loading */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <>
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-blue-800">
              <tr className="text-white">
                <th className="p-2 border">Blog Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Published At</th>
                <th className="p-2 border">Author</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog: any) => (
                <tr key={blog._id} className="text-center border-t">
                  <td className="p-2 border">{blog?.title}</td>
                  <td className="p-2 border">{blog?.category}</td>
                  <td className="p-2 border">
                    {blog?.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : 'Draft'}
                  </td>
                  <td className="p-2 border">
                    {blog?.author?.usrName || 'Unknown'}
                  </td>
                  <td className="p-2 border space-x-2">
                    <Link href={`/account/blog-list/${blog._id}/edit-blog`} className="text-yellow-600 underline">Edit</Link>
                    <Link href={`/account/blog-list/${blog._id}/${blog.isPublished ? 'unpublish-blog' : 'publish-blog'}`} className="text-green-600 underline">{blog.isPublished ? 'Unpublish' : 'Publish'}</Link>
                    <Link href={`/account/blog-list/${blog._id}/delete-blog`} className="text-red-600 underline">Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-6 flex justify-between">
            <Link
              href={`?search=${search}&page=${Math.max(1, page - 1)}`}
              className={`px-4 py-2 bg-gray-200 rounded ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              Previous
            </Link>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <Link
              href={`?search=${search}&page=${page + 1}`}
              className={`px-4 py-2 bg-gray-200 rounded ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              Next
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogListClient;
