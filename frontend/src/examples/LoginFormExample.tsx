import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { FormField } from '../components/common/FormField';
import { Button } from '../components/common/Button';
import { useToast } from '../contexts/ToastContext';

// Example usage of the form validation hook
interface LoginFormData {
    email: string;
    password: string;
}

export const LoginFormExample: React.FC = () => {
    const { success, error } = useToast();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAll,
        reset
    } = useFormValidation<LoginFormData>(
        { email: '', password: '' },
        {
            email: [
                { required: true, message: 'Email is required' },
                {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address'
                }
            ],
            password: [
                { required: true, message: 'Password is required' },
                { minLength: 8, message: 'Password must be at least 8 characters' }
            ]
        }
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAll()) {
            error('Please fix the form errors');
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            success('Login successful!');
            reset();
        } catch (err) {
            error('Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

            <FormField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={(value) => handleChange('email', value)}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                placeholder="you@example.com"
                required
            />

            <FormField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={(value) => handleChange('password', value)}
                onBlur={() => handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                placeholder="••••••••"
                required
            />

            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
            >
                Sign In
            </Button>
        </form>
    );
};
