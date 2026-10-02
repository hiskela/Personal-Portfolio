import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

function AdminDashboard() {
const [projectCount, setProjectCount] = useState(0);
const [skillCount, setSkillCount] = useState(0);

const [messageCount, setMessageCount] = useState(0);
 useEffect(() => {
  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const projectResponse = await fetch(
        "http://localhost:5000/api/projects/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectData = await projectResponse.json();

      if (!projectResponse.ok) {
        throw new Error(
          projectData.message || "Failed to fetch project count"
        );
      }

      setProjectCount(projectData.count);

const skillResponse = await fetch(
  "http://localhost:5000/api/skills/count",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const skillData = await skillResponse.json();

if (!skillResponse.ok) {
  throw new Error(
    skillData.message || "Failed to fetch skill count"
  );
}

setSkillCount(skillData.count);
      const messageResponse = await fetch(
        "http://localhost:5000/api/messages/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const messageData = await messageResponse.json();

      if (!messageResponse.ok) {
        throw new Error(
          messageData.message || "Failed to fetch message count"
        );
      }

      setMessageCount(messageData.count);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCounts();
}, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-white">
      <AdminSidebar />

      <main className="md:ml-64">
        <div className="p-6 md:p-10">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your portfolio from here.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]">
              <p className="text-sm text-gray-500">Projects</p>

              <p className="mt-3 text-3xl font-bold">
                {projectCount}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]">
              <p className="text-sm text-gray-500">Skills</p>

              <p className="mt-3 text-3xl font-bold">{skillCount}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]">
              <p className="text-sm text-gray-500">Messages</p>

              <p className="mt-3 text-3xl font-bold">{messageCount}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]">
              <p className="text-sm text-gray-500">Status</p>

              <p className="mt-3 text-3xl font-bold text-green-600">
                Online
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;