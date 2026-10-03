import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

function AdminAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    education: "",
    location: "",
    email: "",
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/about`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch about information"
          );
        }

        if (data) {
          setAbout(data);

          setFormData({
            title: data.title || "",
            description: data.description || "",
            education: data.education || "",
            location: data.location || "",
            email: data.email || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
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

    try {
      const url = about
        ? `${import.meta.env.VITE_API_URL}/api/about`
        : `${import.meta.env.VITE_API_URL}/api/about`;

      const method = about ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save about information"
        );
      }

      setAbout(data);

      setFormData({
        title: data.title || "",
        description: data.description || "",
        education: data.education || "",
        location: data.location || "",
        email: data.email || "",
      });

      alert("About information saved successfully.");
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
              About
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage the information displayed in your About section.
            </p>
          </div>

          {loading ? (
            <p className="text-gray-500">
              Loading about information...
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]"
            >
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Title
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Software Engineering Student & Full-Stack Developer"
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
                    placeholder="Tell visitors about yourself..."
                    rows="6"
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Education
                  </label>

                  <input
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Software Engineering at JIT University"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Location
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ethiopia"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : about
                    ? "Update About"
                    : "Create About"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminAbout;