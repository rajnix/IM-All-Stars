'use client';

import React, { useState, useEffect } from 'react';

interface BookingSeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: 'excel' | 'conquer' | 'general';
}

export default function BookingSeatModal({ isOpen, onClose, plan = 'general' }: BookingSeatModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    message: '',
    plan: plan
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    emailInvalid: false,
    whatsapp: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Update plan in form data when prop changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, plan: plan }));
  }, [plan]);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setFormData({ fullName: '', email: '', whatsapp: '', message: '', plan: plan });
    setErrors({ fullName: false, email: false, emailInvalid: false, whatsapp: false });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
    // Clear email invalid error when user types in email field
    if (field === 'email' && errors.emailInvalid) {
      setErrors(prev => ({ ...prev, emailInvalid: false }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      fullName: !formData.fullName.trim(),
      email: !formData.email.trim(),
      emailInvalid: formData.email.trim() && !isValidEmail(formData.email),
      whatsapp: !formData.whatsapp.trim()
    };

    setErrors(newErrors);
    setSubmitError(null);

    // Check if there are any errors
    if (!newErrors.fullName && !newErrors.email && !newErrors.emailInvalid && !newErrors.whatsapp) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: formData.fullName.trim(),
            email: formData.email.trim(),
            whatsapp: formData.whatsapp.trim(),
            message: formData.message.trim() || null,
            plan: formData.plan
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setIsSubmitted(true);
          console.log('Booking submitted successfully:', result.data);
        } else {
          setSubmitError(result.error || 'Failed to submit booking');
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        setSubmitError('An unexpected error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[24px] border border-violet-500/30 p-8 sm:p-12"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(2, 6, 23, 0.95) 100%)',
          boxShadow: '0 0 80px rgba(140, 82, 255, 0.3), inset 0 0 80px rgba(140, 82, 255, 0.05)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 bg-transparent border-none text-gray-400 text-xl cursor-pointer hover:text-white transition-colors duration-200"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <p className="text-orange-400 text-[11px] tracking-[3px] uppercase font-medium mb-2">
                JOIN THE COHORT
              </p>
              <h2 className="text-white text-[28px] font-bold leading-tight mb-2">
                Book Your Seat
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fill in your details and we'll reach out to confirm your spot.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Hidden plan field */}
              <input type="hidden" name="plan" value={formData.plan} />
              {/* Full Name */}
              <div>
                <label className="block text-gray-400 text-[13px] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white text-[15px] outline-none transition-all duration-200 ${
                    errors.fullName 
                      ? 'border-red-500' 
                      : 'border-white/10 focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(255,107,43,0.1)]'
                  }`}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-gray-400 text-[13px] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white text-[15px] outline-none transition-all duration-200 ${
                    errors.email || errors.emailInvalid
                      ? 'border-red-500' 
                      : 'border-white/10 focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(255,107,43,0.1)]'
                  }`}
                />
                {errors.emailInvalid && (
                  <p className="text-red-400 text-xs mt-1">Please enter a valid email address</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-gray-400 text-[13px] mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="XXXX XXXX"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white text-[15px] outline-none transition-all duration-200 ${
                    errors.whatsapp 
                      ? 'border-red-500' 
                      : 'border-white/10 focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(255,107,43,0.1)]'
                  }`}
                />
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-gray-400 text-[13px] mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any questions or context you'd like to share..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[15px] outline-none resize-y transition-all duration-200 focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(255,107,43,0.1)]"
                />
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full mt-6 h-[52px] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-base rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application →'
              )}
            </button>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            {/* Large checkmark */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-400/20 flex items-center justify-center">
              <span className="text-orange-400 text-3xl font-bold">✓</span>
            </div>

            {/* Success heading */}
            <h2 className="text-white text-2xl font-bold mb-3">
              You're on the list!
            </h2>

            {/* Success subtext */}
            <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
              We'll reach out on WhatsApp to confirm your seat. Keep an eye out!
            </p>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}