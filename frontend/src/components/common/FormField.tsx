import React from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    value: string | number;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    touched?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    required,
    disabled,
    helperText
}) => {
    const showError = touched && error;

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${showError
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300'
                    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                aria-invalid={showError ? 'true' : 'false'}
                aria-describedby={showError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />
            {showError && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
            {helperText && !showError && (
                <p id={`${name}-helper`} className="mt-1 text-sm text-gray-500">
                    {helperText}
                </p>
            )}
        </div>
    );
};
