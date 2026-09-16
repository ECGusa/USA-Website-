import React, { useState } from 'react';
import { Send, CheckCircle, UserPlus, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CellGroupRequestFormProps {
  branchId: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  preferred_day: string;
  message: string;
  request_type: string;
}

const CellGroupRequestForm: React.FC<CellGroupRequestFormProps> = ({ branchId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', city: '', preferred_day: '', message: '', request_type: 'join',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('cell_group_requests').insert({
        branch_id: branchId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        city: formData.city || null,
        preferred_day: formData.preferred_day || null,
        message: formData.message || null,
        request_type: formData.request_type,
        status: 'new',
      });
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', city: '', preferred_day: '', message: '', request_type: 'join' });
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.');
      console.error('Cell group request error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-bold text-blue-900 mb-2">Request Received!</h3>
        <p className="text-gray-600 mb-4">Our team will connect you with a cell group soon.</p>
        <button onClick={() => setIsSubmitted(false)} className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
      {/* Request type toggle */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, request_type: 'join' }))}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center ${
            formData.request_type === 'join' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Users size={18} className="mr-2" />
          Join a Group
        </button>
        <button
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, request_type: 'start' }))}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center ${
            formData.request_type === 'start' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <UserPlus size={18} className="mr-2" />
          Start a Group
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
          <input
            type="text" name="name" value={formData.name} onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
          <input
            type="text" name="city" value={formData.city} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your city"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Meeting Day</label>
        <select
          name="preferred_day" value={formData.preferred_day} onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a day</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange} rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={formData.request_type === 'join' ? 'Tell us what you\'re looking for in a cell group...' : 'Tell us about the group you\'d like to start...'}
        />
      </div>

      {submitError && <div className="mb-4 bg-red-50 text-red-700 rounded-lg p-3 text-sm">{submitError}</div>}

      <button
        type="submit" disabled={isSubmitting}
        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center"
      >
        {isSubmitting ? 'Submitting...' : (<><Send size={18} className="mr-2" />Submit Request</>)}
      </button>
    </form>
  );
};

export default CellGroupRequestForm;
