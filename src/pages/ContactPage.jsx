import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="bg-bg py-20">
      <div className="container max-w-7xl mx-auto px-5">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text mb-4">Contact Us</h1>
          <p className="text-lg text-muted">Have a question or want to work with us? Drop us a line.</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-surface p-8 sm:p-12 rounded-2xl">
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-text mb-6">Get in Touch</h2>
            <p className="text-muted mb-8">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent text-2xl" />
                <span className="text-muted">123 Cyberpunk Ave, Neo-Tokyo, 90210</span>
              </div>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-accent text-2xl" />
                <a href="mailto:hello@aura.com" className="text-muted hover:text-accent">hello@aura.com</a>
              </div>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPhone} className="text-accent text-2xl" />
                <a href="tel:+1234567890" className="text-muted hover:text-accent">+1 (234) 567-890</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-muted">Full Name</label>
              <input type="text" id="name" name="name" required className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-muted">Email Address</label>
              <input type="email" id="email" name="email" required className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-muted">Subject</label>
              <input type="text" id="subject" name="subject" required className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-muted">Message</label>
              <textarea id="message" name="message" rows="5" required className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-accent text-bg font-bold uppercase tracking-wider py-3 rounded-lg transition-opacity hover:bg-opacity-80">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* --- MAP SECTION --- */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
          <div className="bg-surface rounded-2xl overflow-hidden p-2 border border-border">
          
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950143!2d-73.98731968482795!3d40.75889497932687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1673125442148!5m2!1sen!2sus"
              className="w-full h-96 border-0 rounded-xl filter grayscale invert-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* --- END OF MAP SECTION --- */}

      </div>
    </div>
  );
};

export default ContactPage;