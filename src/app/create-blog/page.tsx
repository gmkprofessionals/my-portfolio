/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Container from '../components/Container';
import Tiptap from '../components/TiptapEditor/TipTap';

interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  tags: string;
  featuredImage: string;
}

export default function WriteBlog() {
  const router = useRouter();

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    category: '',
    tags: '',
    featuredImage: '',
  });

  const [content, setContent] = useState<string>(''); // for tiptap content
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // ✅ from .env
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
        {
          method: 'POST',
          body: form,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, featuredImage: data.secure_url }));
        setPreviewImage(data.secure_url);
      } else {
        toast.error('Image upload failed: No URL returned.');
      }
    } catch {
      toast.error('Image upload failed.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Blog content cannot be empty.');
      return;
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug.toLowerCase(),
          tags: formData.tags.split(',').map((t) => t.trim()),
          content,
          isPublished: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.msg || 'Blog created successfully');
        router.push('/blogs');
      } else {
        toast.error(data.msg || 'Error creating blog');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while submitting.');
    }
  };

  return (
    <div className="p-24">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-lg shadow w-full gap-4 bg-gray-100 p-9 items-center justify-center"
        >
          {/* Banner Image */}
          <div className="flex justify-center items-center h-[360px] rounded-sm w-full border-[1.5px] border-blue-500 bg-white p-9">
            {previewImage && (
              <Image
                src={previewImage}
                alt="Preview"
                width={1200}
                height={400}
                className="w-full max-h-64 object-contain border border-blue-500 rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="ml-4"
            />
          </div>

          {/* Form Inputs */}
          {['title', 'slug', 'category', 'tags'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field === 'slug' ? 'Slug (URL-friendly)' : field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-2 border border-blue-500 rounded bg-white"
              value={(formData as any)[field]}
              onChange={handleChange}
              required={field !== 'tags'}
            />
          ))}

          {/* Tiptap Editor */}
          <div className="w-full">
            <Tiptap onContentChange={(html: string) => setContent(html)} />
          </div>

          {/* Actions */}
          <div className="flex gap-1">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white px-4 py-2 border-[1.5px] rounded hover:bg-gray-200"
            >
              Back
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
