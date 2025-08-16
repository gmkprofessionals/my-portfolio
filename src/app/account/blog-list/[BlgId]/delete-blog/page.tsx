/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { JSX, useState } from 'react';
import { use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from '@/app/account/Loader';

interface DelCatParams {
    params: Promise<{
        BlgId?: string;
    }>;
}

const DeleteBlog: React.FC<DelCatParams> = ({ params }): JSX.Element => {
    
    const router = useRouter();
    const { BlgId } = use(params);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
    const handleDelBlog = async (): Promise<void> => {
      setIsSaving(true);
        try {
            const res = await fetch(`/api/blogs/${BlgId}`, {
                method: 'DELETE',
            });

            const post = await res.json();
            if (post.success === false) {
                toast.error(post.msg);
            } else {
                toast.success(post.msg);
                router.push('/account/blog-list');
            }
        } catch (error:any) {
            toast.error("Blog deletion failed.");
        } finally {
          setIsSaving(false);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col p-9 border-[1.5px] shadow-2xl border-blue-900 rounded-md w-[350px] my-58">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl p-3 text-center text-red-600 font-semibold">Alert !</h1>
                        <p className="text-center">
                            Wont be able to restore. Are you sure to delete?
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

export default DeleteBlog;
