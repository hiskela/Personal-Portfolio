import { useEffect, useState, useRef } from "react";
import AdminSidebar from "./components/AdminSidebar";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    github: "",
    live: "",
    featured: false,
  });

const [imageFile, setImageFile] = useState(null);
const imageInputRef = useRef(null);

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchProjects = async () => {
    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/projects`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch projects");
      }

      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const data = new FormData();

  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("technologies", formData.technologies);
  data.append("github", formData.github);
  data.append("live", formData.live);
  data.append("featured", formData.featured);

  if (imageFile) {
    data.append("image", imageFile);
  }

  const url = editingId
    ? `${import.meta.env.VITE_API_URL}/api/projects/${editingId}`
    : `${import.meta.env.VITE_API_URL}/api/projects`;

  const method = editingId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    if (editingId) {
      setProjects((current) =>
        current.map((project) =>
          project._id === editingId ? result : project
        )
      );
    } else {
      setProjects((current) => [result, ...current]);
    }

    resetForm();
  } catch (error) {
    alert(error.message);
  }
};

  const editProject = (project) => {
  setEditingId(project._id);

  setFormData({
    title: project.title,
    description: project.description,
    image: project.image || "",
    technologies: project.technologies.join(", "),
    github: project.github || "",
    live: project.live || "",
    featured: project.featured,
  });

  setImageFile(null);
  setImagePreview("");

  if (imageInputRef.current) {
    imageInputRef.current.value = "";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((current) =>
        current.filter((project) => project._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

const resetForm = () => {
  setEditingId(null);

  setFormData({
    title: "",
    description: "",
    image: "",
    technologies: "",
    github: "",
    live: "",
    featured: false,
  });

  setImageFile(null);
  setImagePreview("");

  if (imageInputRef.current) {
    imageInputRef.current.value = "";
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
              Projects
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Add and manage your portfolio projects.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]"
          >
            <h2 className="mb-6 text-xl font-semibold">
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                />
              </div>

              <div>
  <label className="mb-2 block text-sm font-medium">
    Project Image
  </label>

  <input
    ref={imageInputRef}
    type="file"
    name="image"
    accept="image/png,image/jpeg,image/webp"
    onChange={(event) => {
  const file = event.target.files[0];

  setImageFile(file || null);

  if (file) {
    setImagePreview(URL.createObjectURL(file));
  } else {
    setImagePreview("");
  }
}}
    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-700 dark:bg-[#171717]"
  />
{imagePreview && (
  <div className="mt-4">
    <p className="mb-2 text-sm font-medium">Preview</p>

    <img
      src={imagePreview}
      alt="Selected project"
      className="h-48 w-full rounded-xl object-cover"
    />
  </div>
)}
  <p className="mt-2 text-xs text-gray-500">
    JPG, PNG or WebP • Maximum 5MB
  </p>

  {formData.image && (
    <img
      src={
        formData.image.startsWith("/uploads/")
          ? `${import.meta.env.VITE_API_URL}${formData.image}`
          : formData.image
      }
      alt="Current project"
      className="mt-4 h-32 w-full rounded-xl object-cover"
    />
  )}
</div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Technologies
              </label>

              <input
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  GitHub URL
                </label>

                <input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Live URL
                </label>

                <input
                  name="live"
                  value={formData.live}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
                />
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Featured project
              </span>
            </label>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {editingId ? "Update Project" : "Add Project"}
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
              Your Projects
            </h2>

            {loading ? (
              <p className="text-gray-500">
                Loading projects...
              </p>
            ) : projects.length === 0 ? (
              <p className="text-gray-500">
                No projects yet.
              </p>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {project.title}
                        </h3>

                        {project.featured && (
                          <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => editProject(project)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProject(project._id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-red-600 dark:border-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800"
                        >
                          {technology}
                        </span>
                      ))}
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

export default AdminProjects;