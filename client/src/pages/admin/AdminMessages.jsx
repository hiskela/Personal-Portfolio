import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchMessages();
  }, [token, navigate]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark message as read");
      }

      setMessages((current) =>
        current.map((message) =>
          message._id === id
            ? { ...message, read: true }
            : message
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      setMessages((current) =>
        current.filter((message) => message._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-gray-900 dark:bg-[#0a0a0a] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Admin
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Messages
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage messages sent from your portfolio.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-red-400 hover:text-red-600 dark:border-gray-700 dark:hover:border-red-500 dark:hover:text-red-400"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center dark:border-gray-800 dark:bg-[#111111]">
            <p className="text-gray-500 dark:text-gray-400">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <article
                key={message._id}
                className={`rounded-2xl border p-6 transition ${
                  message.read
                    ? "border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111111]"
                    : "border-blue-200 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-500/5"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold">
                        {message.name}
                      </h2>

                      {!message.read && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {message.email}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>

                <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-700 dark:text-gray-300">
                  {message.message}
                </p>

                <div className="mt-6 flex gap-3">
                  {!message.read && (
                    <button
                      onClick={() => markAsRead(message._id)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-400 hover:bg-red-50 dark:border-gray-700 dark:hover:border-red-500 dark:hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminMessages;