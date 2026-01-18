import { useState } from 'react';

export type ValidationRule = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    message: string;
};

export type ValidationRules<T> = {
    [K in keyof T]?: ValidationRule[];
};

export type ValidationErrors<T> = {
    [K in keyof T]?: string;
};

export function useFormValidation<T extends Record<string, any>>(
    initialValues: T,
    rules: ValidationRules<T>
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

    const validateField = (field: keyof T, value: any): string | null => {
        const fieldRules = rules[field];
        if (!fieldRules) return null;

        for (const rule of fieldRules) {
            // Required check
            if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
                return rule.message;
            }

            // Skip other validations if value is empty and not required
            if (!value || (typeof value === 'string' && !value.trim())) {
                continue;
            }

            // Min length check
            if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
                return rule.message;
            }

            // Max length check
            if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
                return rule.message;
            }

            // Pattern check
            if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
                return rule.message;
            }

            // Custom validation
            if (rule.custom && !rule.custom(value)) {
                return rule.message;
            }
        }

        return null;
    };

    const validateAll = (): boolean => {
        const newErrors: ValidationErrors<T> = {};
        let isValid = true;

        Object.keys(rules).forEach((field) => {
            const error = validateField(field as keyof T, values[field as keyof T]);
            if (error) {
                newErrors[field as keyof T] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (field: keyof T, value: any) => {
        setValues({ ...values, [field]: value });

        // Validate on change if field has been touched
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors({ ...errors, [field]: error || undefined });
        }
    };

    const handleBlur = (field: keyof T) => {
        setTouched({ ...touched, [field]: true });

        // Validate on blur
        const error = validateField(field, values[field]);
        setErrors({ ...errors, [field]: error || undefined });
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAll,
        reset,
        setValues,
    };
}
