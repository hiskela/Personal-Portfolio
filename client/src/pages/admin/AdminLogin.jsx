import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      navigate("/admin/messages");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-gray-900 dark:bg-[#0a0a0a] dark:text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Admin
          </p>

          <h1 className="mt-4 text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-[#111111]"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
              />
            </div>

           <div>
  <label className="mb-2 block text-sm font-medium">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-20 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
    />

    <button
      type="button"
      onClick={() => setShowPassword((current) => !current)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;