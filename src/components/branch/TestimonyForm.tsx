import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TestimonyFormProps {
  branchId: string;
}

interface FormData {
  name: string;
  testimony: string;
  category: string;
}

const categories = [
  'Healing', 'Family', 'Finances', 'Career',
  'Relationships', 'Spiritual Growth', 'Thanksgiving', 'Other',
];

const TestimonyForm: React.FC<TestimonyFormProps> = ({ branchId }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', testimony: '', category: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.testimony.trim()) newErrors.testimony = 'Please share your testimony';
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
      const { error } = await supabase.from('testimonies').insert({
        branch_id: branchId,
        name: formData.name,
        testimony: formData.testimony,
        category: formData.category || null,
        status: 'pending',
      });
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', testimony: '', category: '' });
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.');
      console.error('Testimony form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-bold text-blue-900 mb-2">Thank You for Sharing!</h3>
        <p className="text-gray-600 mb-4">
          Your testimony has been submitted for review. Once approved, it will be shared on our testimony wall
          to encourage others.
        </p>
        <button onClick={() => setIsSubmitted(false)} className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
          Share Another Testimony
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Share Your Testimony</h3>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
        <select
          name="category" value={formData.category} onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Testimony *</label>
        <textarea
          name="testimony" value={formData.testimony} onChange={handleChange} rows={6}
          className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.testimony ? 'border-red-300' : 'border-gray-300'}`}
          placeholder="Share what God has done in your life..."
        />
        {errors.testimony && <p className="text-red-500 text-xs mt-1">{errors.testimony}</p>}
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Submitted testimonies are reviewed by our team before being published.
      </p>

      {submitError && <div className="mb-4 bg-red-50 text-red-700 rounded-lg p-3 text-sm">{submitError}</div>}

      <button
        type="submit" disabled={isSubmitting}
        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center"
      >
        {isSubmitting ? 'Submitting...' : (<><Send size={18} className="mr-2" />Submit Testimony</>)}
      </button>
    </form>
  );
};

export default TestimonyForm;
