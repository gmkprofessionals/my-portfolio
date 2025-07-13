import { notFound } from 'next/navigation';

interface Blog {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  createdAt: string;
}

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?slug=${slug}`, {
      cache: 'no-store',
    });
    const data = await res.json();

    if (!data.success || !data.blgList?.length) return null;
    return data.blgList[0];
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="rounded mb-6 w-full max-h-[400px] object-cover"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}