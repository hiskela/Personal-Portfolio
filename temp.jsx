import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
    { name: "About", path: "/admin/about" },
    { name: "Home", path: "/admin/home" },
  ];

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111] md:block">
      <div className="mb-10">
        <h1 className="text-xl font-bold">
          Hiskel<span className="text-blue-600">.</span>
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Portfolio Admin
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="absolute bottom-6 left-6 right-6 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-500/10"
      >
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;