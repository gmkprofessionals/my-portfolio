"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import SuspenseWrapper from './SuspenseWrapper';

const BlogListClient = dynamic(() => import('./BlogListClient'), { ssr: false });

const BlogListPage = () => {
  return (
    <SuspenseWrapper>
      <BlogListClient />
    </SuspenseWrapper>
  );
};

export default BlogListPage;
