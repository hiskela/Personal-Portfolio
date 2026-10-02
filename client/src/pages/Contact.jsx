import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="scroll-mt-20 bg-white px-6 py-20 text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Contact
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Let's build something
              <span className="block text-blue-600 dark:text-blue-400">
                useful together.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              I'm open to opportunities, collaborations, internships, and
              interesting software projects.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="https://github.com/hiskela"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-gray-200 p-5 transition hover:border-blue-400 dark:border-gray-800 dark:hover:border-blue-700"
              >
                <p className="text-sm text-gray-500">GitHub</p>
                <p className="mt-1 font-medium">github.com/hiskela ↗</p>
              </a>

              <a
                href="https://www.linkedin.com/in/hiskel-dibera-gemta/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-gray-200 p-5 transition hover:border-blue-400 dark:border-gray-800 dark:hover:border-blue-700"
              >
                <p className="text-sm text-gray-500">LinkedIn</p>
                <p className="mt-1 font-medium">
                  linkedin.com/in/hiskel-dibera-gemta ↗
                </p>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-[#111111]">
            <h2 className="text-2xl font-semibold">Send a message</h2>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your message"
                required
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-[#171717]"
              />

              {status.message && (
                <p
                  className={
                    status.type === "success"
                      ? "text-sm text-green-600 dark:text-green-400"
                      : "text-sm text-red-600 dark:text-red-400"
                  }
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;