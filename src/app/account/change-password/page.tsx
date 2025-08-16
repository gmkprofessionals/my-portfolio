/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";

const ChangePassword = () => {

  const [form, setForm] = useState({
    oldPass: "",
    newPass: "",
    confPass: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (form.newPass !== form.confPass) {
      setMessage("New password and confirm password do not match ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password changed successfully ✅");
        setForm({ oldPass: "", newPass: "", confPass: "" });
      } else {
        setMessage(data.error || "Something went wrong ❌");
      }
    } catch (error:any) {
      setMessage("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
        <div className="flex flex-col w-[350px] my-56 p-9 border border-blue-800 rounded-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="password"
            name="oldPass"
            placeholder="Old Password"
            value={form.oldPass}
            onChange={handleChange}
            className="inputBox w-full"
            required
            />

            <input
            type="password"
            name="newPass"
            placeholder="New Password"
            value={form.newPass}
            onChange={handleChange}
            className="inputBox w-full"
            required
            />

            <input
            type="password"
            name="confPass"
            placeholder="Confirm New Password"
            value={form.confPass}
            onChange={handleChange}
            className="inputBox w-full"
            required
            />

            <button
            type="submit"
            disabled={loading}
            className="btnLeft w-full"
            >
            {loading ? "Updating..." : "Update Password"}
            </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    </div>
  );
};

export default ChangePassword;
