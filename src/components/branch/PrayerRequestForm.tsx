import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, CheckCircle, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PrayerRequestFormProps {
  branchId: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  request: string;
  category: string;
  contactMethod: string;
  anonymous: boolean;
}

const categories = [
  'Healing',
  'Family',
  'Finances',
  'Career',
  'Relationships',
  'Spiritual Growth',
  'Thanksgiving',
  'Other',
];

const PrayerRequestForm: React.FC<PrayerRequestFormProps> = ({ branchId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    request: '',
    category: '',
    contactMethod: 'Email',
    anonymous: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.anonymous) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    }
    if (!formData.request.trim()) newErrors.request = 'Please share your prayer request';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('prayer_requests').insert({
        branch_id: branchId,
        name: formData.anonymous ? null : formData.name,
        email: formData.anonymous ? null : formData.email,
        phone: formData.anonymous ? null : formData.phone || null,
        request: formData.request,
        category: formData.category || null,
        anonymous: formData.anonymous,
        status: 'new',
      });

      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', request: '', category: '', contactMethod: 'Email', anonymous: false });
    } catch (err) {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
      console.error('Prayer request submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto"
      >
        <CheckCircle className="text-emerald-500 mx-auto mb-4" size={56} />
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Your Request Has Been Received</h3>
        <p className="text-gray-600 mb-6">
          Our prayer team is standing with you. We believe God will meet you at your point of need.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-blue-700 hover:text-blue-900 font-semibold transition-colors"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Heart className="text-rose-500 mr-3" size={28} />
        <h3 className="text-2xl font-bold text-blue-900">Share Your Prayer Request</h3>
      </div>

      {/* Anonymous toggle */}
      <div className="mb-6 bg-blue-50 rounded-lg p-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mr-3"
          />
          <span className="text-gray-700 font-medium">Submit anonymously</span>
        </label>
      </div>

      {!formData.anonymous && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
      )}

      {!formData.anonymous && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Contact</label>
            <select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Email</option>
              <option>Phone</option>
              <option>No contact needed</option>
            </select>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Prayer Request *</label>
        <textarea
          name="request"
          value={formData.request}
          onChange={handleChange}
          rows={5}
          className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.request ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Share what's on your heart..."
        />
        {errors.request && <p className="text-red-500 text-xs mt-1">{errors.request}</p>}
      </div>

      {/* Privacy notice */}
      <div className="flex items-start mb-6 text-sm text-gray-500">
        <Lock size={16} className="mr-2 mt-0.5 flex-shrink-0" />
        <p>
          Your prayer request is sent securely to our pastoral team. We respect your privacy and will
          only use your contact information to follow up on your request.
        </p>
      </div>

      {submitError && (
        <div className="mb-4 bg-red-50 text-red-700 rounded-lg p-3 text-sm">{submitError}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center"
      >
        {isSubmitting ? (
          <span>Sending...</span>
        ) : (
          <>
            <Send size={18} className="mr-2" />
            Submit Prayer Request
          </>
        )}
      </button>
    </form>
  );
};

export default PrayerRequestForm;
