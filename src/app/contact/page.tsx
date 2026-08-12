"use client";
import { useState } from "react";
import PublicNavbar from "@/components/landing/PublicNavbar";
import Footer from "@/components/landing/Footer";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  AlertCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@Bugify.dev",
    desc: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 000-1234",
    desc: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "San Francisco, CA",
    desc: "Remote-first team",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 for critical issues",
    desc: "Community forum always open",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success("Message sent! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Have a question, found a bug, or want to give feedback? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, desc }) => (
                <div key={label} className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      {value}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="card p-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                    Message sent!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="btn-secondary"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="card p-8">
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6">
                    Send us a message
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label" htmlFor="c-name">
                          Full name
                        </label>
                        <input
                          id="c-name"
                          className={`input ${errors.name ? "input-error" : ""}`}
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                            setErrors({ ...errors, name: "" });
                          }}
                        />
                        {errors.name && (
                          <p className="error-msg">
                            <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="label" htmlFor="c-email">
                          Email address
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          className={`input ${errors.email ? "input-error" : ""}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            setErrors({ ...errors, email: "" });
                          }}
                        />
                        {errors.email && (
                          <p className="error-msg">
                            <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="label" htmlFor="c-subject">
                        Subject
                      </label>
                      <select
                        id="c-subject"
                        className={`input ${errors.subject ? "input-error" : ""}`}
                        value={form.subject}
                        onChange={(e) => {
                          setForm({ ...form, subject: e.target.value });
                          setErrors({ ...errors, subject: "" });
                        }}
                      >
                        <option value="">Select a topic...</option>
                        <option value="bug">Report a bug</option>
                        <option value="feature">Feature request</option>
                        <option value="support">Technical support</option>
                        <option value="billing">Billing question</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="error-msg">
                          <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label" htmlFor="c-message">
                        Message
                      </label>
                      <textarea
                        id="c-message"
                        className={`input resize-none h-36 ${errors.message ? "input-error" : ""}`}
                        placeholder="Describe your question or issue in detail (min. 20 characters)..."
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          setErrors({ ...errors, message: "" });
                        }}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message ? (
                          <p className="error-msg">
                            <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <p className="text-xs text-slate-400">
                          {form.message.length} chars
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn-primary px-8"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
