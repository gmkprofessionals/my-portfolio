/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { JSX, useState } from 'react';
import { use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DelCatParams {
    params: Promise<{
        BlgId?: string;
    }>;
}

const PublishBlog: React.FC<DelCatParams> = ({ params }): JSX.Element => {
    
    const router = useRouter();
    const { BlgId } = use(params);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
    const handleDelBlog = async (): Promise<void> => {
      setIsSaving(true);
        try {
            const res = await fetch(`/api/blogs/${BlgId}`, {
                method: 'PATCH',
            });

            const post = await res.json();
            if (post.success === false) {
                toast.error(post.msg);
            } else {
                toast.success(post.msg);
                router.push('/account/blog-list');
            }
        } catch (error:any) {
            toast.error("Blog publishing failed.");
        } finally {
          setIsSaving(false);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col p-9 border-[1.5px] shadow-2xl border-blue-900 rounded-md w-[350px] my-58">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl p-3 text-center text-yellow-600 font-semibold">Warning !</h1>
                        <p className="text-center">
                            Are you sure you want to publish this blog?
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <button type="button" onClick={handleDelBlog} className="btnLeft w-full" disabled={isSaving}>
                            {isSaving ? "Confirming..." : "Confirm"}
                        </button>
                        <button type="button" onClick={() => router.push('/account/blog-list')} className="btnRight w-full">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublishBlog;
