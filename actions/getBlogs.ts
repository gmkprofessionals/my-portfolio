export const getBlogs = async (search: string, page: number) => {
  
  const query = new URLSearchParams();
  if (search) query.set('search', search);
  query.set('page', page.toString());

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?${query.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {

    const errorText = await res.text();
    console.error('Blog API Error:', errorText);
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  return {
    blogs: data.blgList,
    totalCount: data.totalCount,
  };
};
