/**
 * Input sanitization utilities to prevent XSS attacks
 */

/**
 * Sanitizes HTML string by removing potentially dangerous content
 */
export const sanitizeHtml = (html: string): string => {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
};

/**
 * Escapes HTML special characters
 */
export const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Validates and sanitizes URL to prevent javascript: and data: protocols
 */
export const sanitizeUrl = (url: string): string => {
    const sanitized = url.trim();

    // Block dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
    const lowerUrl = sanitized.toLowerCase();

    for (const protocol of dangerousProtocols) {
        if (lowerUrl.startsWith(protocol)) {
            return '#';
        }
    }

    return sanitized;
};

/**
 * Removes script tags and event handlers from HTML
 */
export const stripScripts = (html: string): string => {
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/on\w+\s*=\s*[^\s>]*/gi, '');
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Sanitizes filename to prevent directory traversal
 */
export const sanitizeFilename = (filename: string): string => {
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/\.{2,}/g, '.')
        .substring(0, 255);
};

/**
 * Validates file type against allowed extensions
 */
export const isAllowedFileType = (filename: string, allowedTypes: string[]): boolean => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension ? allowedTypes.includes(extension) : false;
};

/**
 * Validates file size
 */
export const isValidFileSize = (size: number, maxSize: number): boolean => {
    return size <= maxSize;
};
