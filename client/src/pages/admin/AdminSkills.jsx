import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 70,
  });

  const token = localStorage.getItem("adminToken");

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch skills");
      }

      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/api/skills/${editingId}`
      : `${import.meta.env.VITE_API_URL}/api/skills`;

    const method = editingId ? "PUT" : "POST";

    try {
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
        throw new Error(data.message || "Something went wrong");
      }

      if (editingId) {
        setSkills((current) =>
          current.map((skill) =>
            skill._id === editingId ? data : skill
          )
        );
      } else {
        setSkills((current) => [data, ...current]);
      }

      resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const editSkill = (skill) => {
    setEditingId(skill._id);

    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteSkill = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete skill");
      }

      setSkills((current) =>
        current.filter((skill) => skill._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      level: 70,
    });
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
              Skills
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Add and manage your technical skills.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]"
          >
            <h2 className="mb-6 text-xl font-semibold">
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Skill Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="React"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Frontend"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Skill Level: {formData.level}%
              </label>

              <input
                type="range"
                name="level"
                min="0"
                max="100"
                value={formData.level}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {editingId ? "Update Skill" : "Add Skill"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium dark:border-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div>
            <h2 className="mb-5 text-xl font-semibold">
              Your Skills
            </h2>

            {loading ? (
              <p className="text-gray-500">
                Loading skills...
              </p>
            ) : skills.length === 0 ? (
              <p className="text-gray-500">
                No skills yet.
              </p>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {skill.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {skill.category}
                        </p>
                      </div>

                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() => editSkill(skill)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteSkill(skill._id)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-red-600 dark:border-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminSkills;