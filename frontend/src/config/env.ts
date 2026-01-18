/**
 * Environment configuration utilities
 */

interface EnvConfig {
    apiUrl: string;
    environment: 'development' | 'production' | 'staging';
    features: {
        analytics: boolean;
        aiFeatures: boolean;
        liveClasses: boolean;
    };
    services: {
        sentryDsn?: string;
        googleAnalyticsId?: string;
        stripePublicKey?: string;
    };
    upload: {
        maxFileSize: number;
        allowedFileTypes: string[];
    };
    session: {
        timeout: number;
    };
    debug: boolean;
}

/**
 * Loads and validates environment configuration
 */
export const getEnvConfig = (): EnvConfig => {
    return {
        apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
        environment: (import.meta.env.VITE_APP_ENV as EnvConfig['environment']) || 'development',
        features: {
            analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
            aiFeatures: import.meta.env.VITE_ENABLE_AI_FEATURES === 'true',
            liveClasses: import.meta.env.VITE_ENABLE_LIVE_CLASSES === 'true',
        },
        services: {
            sentryDsn: import.meta.env.VITE_SENTRY_DSN,
            googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
            stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        },
        upload: {
            maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10485760', 10),
            allowedFileTypes: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'pdf,doc,docx,jpg,png').split(','),
        },
        session: {
            timeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '3600000', 10),
        },
        debug: import.meta.env.VITE_DEBUG_MODE === 'true',
    };
};

/**
 * Checks if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof EnvConfig['features']): boolean => {
    const config = getEnvConfig();
    return config.features[feature];
};

/**
 * Gets API base URL
 */
export const getApiUrl = (): string => {
    return getEnvConfig().apiUrl;
};

/**
 * Checks if running in production
 */
export const isProduction = (): boolean => {
    return getEnvConfig().environment === 'production';
};

/**
 * Checks if debug mode is enabled
 */
export const isDebugMode = (): boolean => {
    return getEnvConfig().debug;
};
