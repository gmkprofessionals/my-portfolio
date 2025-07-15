import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/app/components/Container";

interface Blog {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt: string;
}

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?slug=${slug}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (!data.success || !data.blgList?.length) return null;

    return data.blgList[0];
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return notFound();

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="my-24">
      <Container>
        {blog.featuredImage && (
          <div className="mb-8">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              width={1200}
              height={600}
              className="rounded-lg shadow-md object-cover w-full h-auto max-h-[500px]"
              priority
            />
          </div>
        )}

        {/* ✅ Published Date */}
        <p className="text-sm text-gray-500 mb-3">{formattedDate}</p>

        {/* ✅ Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ✅ Title */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>

        {/* ✅ Content */}
        <article
          className="prose prose-lg prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </Container>
    </div>
  );
}
