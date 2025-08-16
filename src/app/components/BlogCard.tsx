'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router
import InnerBanner from '../components/InnerBanner';
import Container from '../components/Container';
import Footer from '../components/Footer';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt: string;
}

const BlogCard: React.FC = () => {
  const router = useRouter(); // Use router hook
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs?isPublished=true');
        const data = await res.json();

        if (data.success) {
          setPosts(data.blgList);
        } else {
          setError(data.msg || 'Failed to load blogs.');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An unexpected error occurred while loading blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <InnerBanner />
      <Container>
        <h2 className="h1-heading mb-9">Blogs</h2>
        {loading ? (
          <p className='text-center italic'>Loading blogs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <Image
                  src={post.featuredImage || '/blog/default.jpg'}
                  alt={post.title}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-9">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.content.replace(/<[^>]+>/g, '').slice(0, 150)}...
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push(`/blogs/${post.slug}`)} // Navigate here
                    className="btnLeft w-full"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          className="btnLeft my-16 "
          onClick={() => router.push('/create-blog')}
        >
          Write your blog
        </button>
      </Container>
      <Footer />
    </div>
  );
};

export default BlogCard;