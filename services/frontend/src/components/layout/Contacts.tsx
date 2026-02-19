import React, { useState } from "react";
import "./Contacts.css";
import { MapPin, Phone, Mail } from "lucide-react";

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    try {
      // 👉 For now just simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Submitted Data:", formData);

      alert("Message sent successfully! 🚀");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-main">
        {/* ===== CONTACT CARDS ===== */}
        <div className="contact-grid">
          <div className="contact-card">
            <div className="card-icon">
              <MapPin size={28} strokeWidth={1.8} />
            </div>
            <h3>Visit Us</h3>
            <p>Somewhere in Bangalore</p>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <Phone size={28} strokeWidth={1.8} />
            </div>
            <h3>Call Us</h3>
            <p>+91 8967838500</p>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <Mail size={28} strokeWidth={1.8} />
            </div>
            <h3>Email Us</h3>
            <p>support@vormirex.com</p>
          </div>
        </div>

        {/* ===== MESSAGE FORM ===== */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
