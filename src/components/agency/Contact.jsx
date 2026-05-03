import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_95xs632';   // 👈 Paste from EmailJS → Email Services
const EMAILJS_TEMPLATE_ID = 'template_k44dzfr';  // 👈 Paste from EmailJS → Email Templates
const EMAILJS_PUBLIC_KEY  = 'x-T8gQsChBd7S-CzH';   // 👈 Paste from EmailJS → Account → General

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  formData.name,
        from_email: formData.email,
        company:    formData.company,
        message:    formData.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    })
    .catch(() => {
      setStatus('error');
    });
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Let's Create Something
            <br />
            <span className="text-[#FF4D2D]">Extraordinary</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch and let's start a conversation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF4D2D]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#FF4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-600">hello@iuxoa.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF4D2D]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-[#FF4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600">+91 77468 19776</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF4D2D]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#FF4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Office</h4>
                  <p className="text-gray-600">
                    123 Creative Street<br />San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 border-2 border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 border-2 border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-6 py-4 border-2 border-gray-200 focus:border-black outline-none transition-colors"
            />
            <textarea
              placeholder="Tell us about your project"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full px-6 py-4 border-2 border-gray-200 focus:border-black outline-none transition-colors resize-none"
              required
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-8 py-4 bg-black text-white font-medium hover:bg-[#FF4D2D] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
              <Send size={20} />
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-center font-medium">✅ Message sent! We'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-center font-medium">❌ Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
