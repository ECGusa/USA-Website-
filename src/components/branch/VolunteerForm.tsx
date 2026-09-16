import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface VolunteerFormProps {
  branchId: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  areas: string;
  availability: string;
  experience: string;
  message: string;
}

const volunteerAreas = [
  'Worship', 'Media', 'Ushers', 'Children\'s Ministry',
  'Youth', 'Prayer', 'Outreach', 'Events', 'Administration',
];

const VolunteerForm: React.FC<VolunteerFormProps> = ({ branchId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', areas: '', availability: '', experience: '', message: '',
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
      const { error } = await supabase.from('volunteer_requests').insert({
        branch_id: branchId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        areas: formData.areas || null,
        availability: formData.availability || null,
        experience: formData.experience || null,
        message: formData.message || null,
        status: 'new',
      });
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', areas: '', availability: '', experience: '', message: '' });
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.');
      console.error('Volunteer form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-bold text-blue-900 mb-2">Thank You for Your Interest!</h3>
        <p className="text-gray-600 mb-4">Our team will be in touch with you soon about volunteering opportunities.</p>
        <button onClick={() => setIsSubmitted(false)} className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Volunteer Application</h3>

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
          <label className="block text-sm font-semibold text-gray-700 mb-1">Areas of Interest</label>
          <select
            name="areas" value={formData.areas} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an area</option>
            {volunteerAreas.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Availability</label>
          <input
            type="text" name="availability" value={formData.availability} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Weekends, weekday evenings"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Previous Experience</label>
          <input
            type="text" name="experience" value={formData.experience} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any relevant experience"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange} rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us a bit about yourself..."
        />
      </div>

      {submitError && <div className="mb-4 bg-red-50 text-red-700 rounded-lg p-3 text-sm">{submitError}</div>}

      <button
        type="submit" disabled={isSubmitting}
        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center"
      >
        {isSubmitting ? 'Submitting...' : (<><Send size={18} className="mr-2" />Submit Application</>)}
      </button>
    </form>
  );
};

export default VolunteerForm;
