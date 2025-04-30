"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

// Form validation schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "New Client Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev: Partial<Record<keyof ContactFormData, string>>) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      contactFormSchema.parse(formData);

      // Reset errors
      setErrors({});

      // Show submitting state
      setIsSubmitting(true);

      // Send form data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      // Show success
      setSubmitStatus("success");

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "New Client Inquiry",
        message: "",
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Format and set validation errors
        const formattedErrors: Partial<Record<keyof ContactFormData, string>> =
          {};
        error.errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        setSubmitStatus("error");
      }
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      data-section
      className="w-full py-16 md:py-24 bg-background relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 relative inline-block">
            Begin Your Healing Journey
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </h2>
          <p className="text-foreground/90 mt-4 max-w-2xl mx-auto font-medium">
            Take the first step toward mental wellness. Contact us to schedule a
            free 15-minute consultation and learn how our services can help you
            achieve lasting positive change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Get in Touch
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-white/5 border ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 dark:border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-white/5 border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Subject <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-white/5 border ${
                      errors.subject
                        ? "border-red-500"
                        : "border-gray-300 dark:border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                    placeholder="What is this regarding?"
                  />
                  <div className="absolute right-2 top-2.5">
                    <select
                      className="text-xs bg-transparent border-none focus:ring-0 cursor-pointer text-primary dark:text-primary [&>option]:bg-white [&>option]:dark:bg-gray-900 [&>option]:text-gray-800 [&>option]:dark:text-gray-200"
                      onChange={(e) => {
                        if (e.target.value) {
                          setFormData((prev) => ({
                            ...prev,
                            subject: e.target.value,
                          }));
                        }
                      }}
                      value=""
                    >
                      <option value="" disabled>
                        Quick select
                      </option>
                      <option value="New Client Inquiry">
                        New Client Inquiry
                      </option>
                      <option value="Schedule Consultation">
                        Schedule Consultation
                      </option>
                      <option value="Insurance Question">
                        Insurance Question
                      </option>
                      <option value="General Information">
                        General Information
                      </option>
                    </select>
                  </div>
                </div>
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white dark:bg-white/5 border ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300 dark:border-white/10"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 dark:bg-green-500/20 border border-green-500/30 rounded-lg text-green-700 dark:text-green-400 text-sm font-medium"
                  >
                    Thank you! Your message has been sent successfully.
                    We&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && !Object.keys(errors).length && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-100 dark:bg-red-500/20 border border-red-500/30 rounded-lg text-red-700 dark:text-red-400 text-sm font-medium"
                  >
                    Something went wrong. Please try again later.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl p-5 flex items-start hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    Phone
                  </h4>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm truncate">
                    +1 612-412-4873
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl p-5 flex items-start hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    Email
                  </h4>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm truncate">
                    ericpeterson@solistichealing.org
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl p-5 flex items-start hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    Hours
                  </h4>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm">
                    Mon-Fri: 9am - 7pm
                  </p>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm">
                    Sat: 10am - 4pm
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl p-5 flex items-start hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    Address
                  </h4>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm truncate">
                    1611 County Road B West, Suite 214
                  </p>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm truncate">
                    Roseville, MN, 55113
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-10"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2821.9881682844716!2d-93.18211382392826!3d45.00982896578788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32b127a732e65%3A0xdb51158edf4f11ef!2s1611%20County%20Rd%20B%20W%20%23214%2C%20Roseville%2C%20MN%2055113!5e0!3m2!1sen!2sus!4v1710815421018!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-black/30 backdrop-blur-sm border-t border-gray-300 dark:border-white/10">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></div>
                  <p className="text-sm font-medium text-foreground/90 dark:text-foreground/80">
                    Solistic Healing - Suite 214
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-40 left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </div>
    </section>
  );
}
