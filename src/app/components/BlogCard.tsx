'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import InnerBanner from '../components/InnerBanner';
import Container from '../components/Container';
import Footer from '../components/Footer';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  slug: string;
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding GST Filing: A Complete Guide for Indian Businesses',
    summary: 'Learn the basics of GST filing, due dates, and common mistakes to avoid for smoother compliance.',
    image: '/blog/gst-filing.jpg',
    date: 'July 10, 2025',
    slug: 'understanding-gst-filing',
  },
  {
    id: 2,
    title: 'Benefits of MSME Registration You Shouldn’t Miss',
    summary: 'Explore how MSME registration can offer tax benefits, easier loans, and government support.',
    image: '/blog/msme-benefits.jpg',
    date: 'July 5, 2025',
    slug: 'benefits-of-msme-registration',
  },
  {
    id: 3,
    title: 'Trademark vs Copyright: What Should Your Business Register?',
    summary: 'A quick breakdown of what’s best for your brand identity and how to legally protect your IP.',
    image: '/blog/trademark-vs-copyright.jpg',
    date: 'June 25, 2025',
    slug: 'trademark-vs-copyright',
  },
];

const BlogCard :React.FC = () => {
  
  const [posts] = useState<BlogPost[]>(initialPosts);

  return (
    <div>
      <InnerBanner />
      <Container>
        <h2 className='h1-heading mb-9'>Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-16">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-9 ">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{post.summary}</p>
                  <button
                    type='button'
                    onClick={() => window.location.href = `/blog/${post.slug}`}
                    className="btnLeft w-full"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
      </Container>
      <Footer />
    </div>
  );
};

export default BlogCard;
