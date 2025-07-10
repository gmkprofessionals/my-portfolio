"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface FormDataProps {
  name: string;
  email: string;
  phone: string;
}

interface SubmissionStatus {
  submitted: boolean;
  message: string;
  success: boolean | null;
}

const RequestCallback: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    phone: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    submitted: false,
    message: "",
    success: null,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setFormData({ name: "", email: "", phone: "" });
    setSubmissionStatus({ submitted: false, message: "", success: null });
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus({ submitted: true, message: "Submitting...", success: null });

    try {
      const res = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setSubmissionStatus({
          submitted: true,
          message: "Submitted successfully!",
          success: true,
        });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      setSubmissionStatus({
        submitted: true,
        message: "Failed to submit request.",
        success: false,
      });
    }
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btnLeft mt-9 w-full"
      >
        Request a Callback
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-9 rounded-xl w-full max-w-sm shadow-lg relative"
          >
            {submissionStatus.submitted ? (
              <div className="text-center text-green-600 text-lg font-medium">
                Thanks for taking interest in our services. <br />
                We will call you shortly.
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Request a Callback
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {["name", "email", "phone"].map((field) => (
                    <div key={field}>
                      <label className="block text-md font-medium text-gray-700 capitalize">
                        {field}:
                      </label>
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        name={field}
                        placeholder={
                          field === "phone"
                            ? "Phone with country code"
                            : `Enter your ${field}`
                        }
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        className="inputBox w-full"
                      />
                    </div>
                  ))}
                  <button type="submit" className="w-full btnLeft">
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCallback;
