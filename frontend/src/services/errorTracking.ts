/**
 * Error tracking integration setup
 * This file provides a wrapper for error tracking services like Sentry
 */

import { getEnvConfig, isProduction } from '../config/env';

interface ErrorContext {
    user?: {
        id: string;
        email?: string;
    };
    tags?: Record<string, string>;
    extra?: Record<string, any>;
}

class ErrorTracker {
    private isInitialized = false;

    /**
     * Initialize error tracking service
     */
    init() {
        const config = getEnvConfig();

        if (config.services.sentryDsn && isProduction()) {
            // In production, initialize Sentry or similar service
            // Example: Sentry.init({ dsn: config.services.sentryDsn })
            console.log('Error tracking initialized');
            this.isInitialized = true;
        } else {
            console.log('Error tracking disabled (development mode or no DSN)');
        }
    }

    /**
     * Capture an exception
     */
    captureException(error: Error, context?: ErrorContext) {
        if (this.isInitialized) {
            // Send to error tracking service
            // Example: Sentry.captureException(error, { ...context })
            console.error('[Error Tracker]', error, context);
        } else {
            // In development, just log
            console.error('[Dev Error]', error, context);
        }
    }

    /**
     * Capture a message
     */
    captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
        if (this.isInitialized) {
            // Send to error tracking service
            // Example: Sentry.captureMessage(message, level)
            console.log(`[Error Tracker - ${level}]`, message, context);
        } else {
            console.log(`[Dev - ${level}]`, message, context);
        }
    }

    /**
     * Set user context
     */
    setUser(user: { id: string; email?: string } | null) {
        if (this.isInitialized) {
            // Set user context in error tracking service
            // Example: Sentry.setUser(user)
            console.log('[Error Tracker] User set:', user);
        }
    }

    /**
     * Add breadcrumb for debugging
     */
    addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
        if (this.isInitialized) {
            // Add breadcrumb to error tracking service
            // Example: Sentry.addBreadcrumb({ message, category, data })
            console.log('[Breadcrumb]', { message, category, data });
        }
    }
}

export const errorTracker = new ErrorTracker();
