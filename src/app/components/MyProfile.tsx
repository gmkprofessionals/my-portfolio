/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "../account/Loader";

const MyProfile = () => {
  const params = useParams();
  const id = params?.UsrId as string; // profile id from route

  const [form, setForm] = useState({
    usrName: "",
    usrEmail: "",
    usrDesignation: "",
    usrLocation: "",
    usrPhone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile by ID
  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/profile?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setForm((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update/Upsert profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, ...form }), // send id to API
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile saved successfully");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error: any) {
      setMessage("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-[600px] my-36 p-9 border border-gray-300 rounded-md shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="usrName"
            placeholder="Full Name"
            value={form.usrName}
            onChange={handleChange}
            className="inputBox w-full"
            required
          />

          <input
            type="email"
            name="usrEmail"
            placeholder="Email"
            value={form.usrEmail}
            onChange={handleChange}
            className="inputBox w-full"
            required
          />

          <input
            type="text"
            name="usrDesignation"
            placeholder="Designation"
            value={form.usrDesignation}
            onChange={handleChange}
            className="inputBox w-full"
            required
          />

          <input
            type="text"
            name="usrLocation"
            placeholder="Location"
            value={form.usrLocation}
            onChange={handleChange}
            className="inputBox w-full"
            required
          />

          <input
            type="text"
            name="usrPhone"
            placeholder="Phone"
            value={form.usrPhone}
            onChange={handleChange}
            className="inputBox w-full"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btnLeft w-full"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default MyProfile;