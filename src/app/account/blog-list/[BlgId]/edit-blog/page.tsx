/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/account/Loader";
import toast from "react-hot-toast";
import Tiptap from "@/app/components/TiptapEditor/TipTap";

interface IParamsBlog {
  params: {
    BlgId: string;
  };
}

interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  tags: string;
  featuredImage: string;
}

const EditBlog: React.FC<IParamsBlog> = ({ params }) => {
  const router = useRouter();
  const { BlgId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    category: "",
    tags: "",
    featuredImage: "",
  });

  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "category" && value.trim()) {
      setCategoryError("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          featuredImage: data.secure_url,
        }));
        setPreviewImage(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch {
      toast.error("Image upload failed.");
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setFormData((prev) => ({ ...prev, featuredImage: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      setCategoryError("Category is required.");
    }

    if (!formData.title || !formData.slug || !formData.category || !content.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/blogs/${BlgId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug.toLowerCase().replace(/\s+/g, "-"),
          tags: formData.tags.split(",").map((tag) => tag.trim()),
          content,
          isPublished: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.msg || "Blog updated successfully!");
        router.push("/account/blog-list");
      } else {
        toast.error(data.msg || "Failed to update blog.");
      }
    } catch (err) {
        console.error(err);
        toast.error("Server error. Try again later.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/blogs/${BlgId}`);
        if (!response.ok) throw new Error("Failed to fetch blog data");

        const data = await response.json();
        if (data.success) {
          setFormData({
            title: data.blgById.title,
            slug: data.blgById.slug,
            category: data.blgById.category,
            tags: data.blgById.tags.join(", "),
            featuredImage: data.blgById.featuredImage || "",
          });
          setContent(data.blgById.content);
          setPreviewImage(data.blgById.featuredImage || "");
        } else {
          setErrorMessage(data.msg || "Failed to load blog data");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred while fetching blog data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [BlgId]);

  if (isLoading) return <Loader />;
  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-gray-100 p-6 rounded-lg shadow"
      >
        {/* Image Preview and Upload */}
        <div className="flex flex-col items-center gap-2 w-full">
          {previewImage ? (
            <div className="relative w-full">
              <Image
                src={previewImage}
                alt="Blog Banner"
                width={1200}
                height={400}
                className="w-full h-auto max-h-64 object-contain border border-blue-500 rounded"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="w-full border-2 border-dashed border-blue-400 p-6 text-center rounded cursor-pointer hover:bg-blue-50">
              <p className="text-blue-600 mb-2">Upload Blog Banner Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Form Fields */}
        {["title", "slug", "category", "tags"].map((field) => (
          <div key={field} className="w-full">
            <input
              type="text"
              name={field}
              placeholder={
                field === "slug"
                  ? "Slug (e.g. how-to-code)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="w-full p-2 border border-blue-500 rounded bg-white"
              value={(formData as any)[field]}
              onChange={handleChange}
              required={field !== "tags"}
            />
            {field === "category" && categoryError && (
              <p className="text-red-500 text-sm mt-1">{categoryError}</p>
            )}
          </div>
        ))}

        {/* Tiptap HTML Editor */}
        <div className="w-full">
          <Tiptap
            onContentChange={(html: string) => setContent(html)}
            initialContent={content}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 rounded text-white ${
              isSaving
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : "Submit"}
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
    </div>
  );
};

export default EditBlog;
