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

  const [content, setContent] = useState<string>(''); // HTML from TipTap
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
    form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
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
        toast.error('Image upload failed: No secure_url returned.');
      }
    } catch {
      toast.error('Image upload failed.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.category || !content.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
          tags: formData.tags.split(',').map(tag => tag.trim()),
          content,
          isPublished: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.msg || 'Blog created successfully!');
        router.push('/blogs');
      } else {
        toast.error(data.msg || 'Failed to create blog.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error. Try again later.');
    }
  };

  return (
    <div className="p-24">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-lg shadow w-full gap-4 bg-gray-100 p-9 items-center justify-center"
        >
          {/* Image Preview */}
          <div className="flex flex-col items-center w-full">
            {previewImage && (
              <Image
                src={previewImage}
                alt="Blog Banner"
                width={1200}
                height={400}
                className="w-full h-auto max-h-64 object-contain border border-blue-500 rounded mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
          </div>

          {/* Form Fields */}
          {['title', 'slug', 'category', 'tags'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={
                field === 'slug' ? 'Slug (e.g. how-to-code)' : field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="w-full p-2 border border-blue-500 rounded bg-white"
              value={(formData as any)[field]}
              onChange={handleChange}
              required={field !== 'tags'}
            />
          ))}

          {/* HTML Editor */}
          <div className="w-full">
            <Tiptap onContentChange={(html: string) => setContent(html)} />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white border border-gray-400 px-4 py-2 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}