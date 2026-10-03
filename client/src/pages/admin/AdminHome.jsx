import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

function AdminHome() {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
const [cvFile, setCvFile] = useState(null);
const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    github: "",
    linkedin: "",
    cv: "",
    status: "Available for opportunities",
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(
   `${import.meta.env.VITE_API_URL}/api/home?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch home information"
          );
        }

        if (data) {
          setHome(data);

          setFormData({
            name: data.name || "",
            title: data.title || "",
            description: data.description || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            cv: data.cv || "",
            status: data.status || "Available for opportunities",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setSaving(true);

  const data = new FormData();

  data.append("name", formData.name);
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("github", formData.github);
  data.append("linkedin", formData.linkedin);
  data.append("status", formData.status);

  if (cvFile) {
    data.append("cv", cvFile);
  }
if (profileImage) {
  data.append("profileImage", profileImage);
}

  try {
    const response = await fetch(
     `${import.meta.env.VITE_API_URL}/api/home`,
      {
        method: home ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to save home information"
      );
    }

    setHome(result);

    setFormData({
      name: result.name || "",
      title: result.title || "",
      description: result.description || "",
      github: result.github || "",
      linkedin: result.linkedin || "",
      cv: result.cv || "",
      status: result.status || "",
    });

    setCvFile(null);
setProfileImage(null)

    alert("Home information saved successfully.");
  } catch (error) {
    alert(error.message);
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-white">
      <AdminSidebar />

      <main className="md:ml-64">
        <div className="p-6 md:p-10">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Portfolio
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Home
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage the content displayed on your homepage.
            </p>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]"
            >
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Name
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Hiskel Dibera"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Professional Title
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Software Engineering Student | Full-Stack Developer"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write a short introduction..."
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    GitHub URL
                  </label>

                  <input
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    LinkedIn URL
                  </label>

                  <input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

             <div>
  <label className="mb-2 block text-sm font-medium">
    CV PDF
  </label>

  <input
    type="file"
    accept="application/pdf"
    onChange={(event) => {
      setCvFile(event.target.files[0] || null);
    }}
    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-700 dark:bg-[#171717]"
  />

  {home?.cv && (
    <a
      href={`${import.meta.env.VITE_API_URL}${home.cv}`}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
    >
      View Current CV
    </a>
  )}

  <p className="mt-2 text-xs text-gray-500">
    PDF only. Maximum size: 5 MB.
  </p>
</div>
<div>
  <label className="mb-2 block text-sm font-medium">
    Profile Image
  </label>

  <input
    type="file"
    accept="image/jpeg,image/png,image/webp"
    onChange={(e) => setProfileImage(e.target.files[0])}
    className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
  />

  <p className="mt-1 text-xs text-gray-500">
    JPG, PNG or WebP. Maximum 5MB.
  </p>
</div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <input
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Available for opportunities"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : home
                    ? "Update Home"
                    : "Create Home"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminHome;