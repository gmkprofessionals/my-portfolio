
export const getBlogs = async (search: string, page: number) => {

  const query = new URLSearchParams({
    search,
    page: page.toString(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?${query.toString()}`, {
    method: 'GET',        
    cache: 'no-store',  
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  return {
    blogs: data.blgList,
    totalCount: data.totalCount,
  };
};
