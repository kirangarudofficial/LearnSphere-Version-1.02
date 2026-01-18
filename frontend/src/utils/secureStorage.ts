/**
 * Secure Storage Utility
 * Provides encrypted storage for sensitive data with automatic cleanup
 */

interface StorageOptions {
    encrypt?: boolean;
    expiresIn?: number; // milliseconds
}

interface StorageItem<T> {
    value: T;
    expires?: number;
    encrypted?: boolean;
}

class SecureStorage {
    private readonly prefix = 'learnhub_';

    /**
     * Simple encryption/decryption (for basic obfuscation)
     * For production, consider using Web Crypto API
     */
    private encrypt(data: string): string {
        return btoa(encodeURIComponent(data));
    }

    private decrypt(data: string): string {
        return decodeURIComponent(atob(data));
    }

    /**
     * Set item in storage
     */
    set<T>(key: string, value: T, options: StorageOptions = {}): void {
        try {
            const item: StorageItem<T> = {
                value,
                encrypted: options.encrypt,
            };

            if (options.expiresIn) {
                item.expires = Date.now() + options.expiresIn;
            }

            let serialized = JSON.stringify(item);

            if (options.encrypt) {
                serialized = this.encrypt(serialized);
            }

            localStorage.setItem(this.prefix + key, serialized);
        } catch (error) {
            console.error('[SecureStorage] Failed to set item:', error);
        }
    }

    /**
     * Get item from storage
     */
    get<T>(key: string): T | null {
        try {
            const raw = localStorage.getItem(this.prefix + key);
            if (!raw) return null;

            let serialized = raw;

            // Try to decrypt if it looks encrypted
            if (raw.match(/^[A-Za-z0-9+/]+=*$/)) {
                try {
                    serialized = this.decrypt(raw);
                } catch {
                    // Not encrypted or invalid, use as is
                }
            }

            const item: StorageItem<T> = JSON.parse(serialized);

            // Check expiration
            if (item.expires && Date.now() > item.expires) {
                this.remove(key);
                return null;
            }

            return item.value;
        } catch (error) {
            console.error('[SecureStorage] Failed to get item:', error);
            return null;
        }
    }

    /**
     * Remove item from storage
     */
    remove(key: string): void {
        try {
            localStorage.removeItem(this.prefix + key);
        } catch (error) {
            console.error('[SecureStorage] Failed to remove item:', error);
        }
    }

    /**
     * Clear all items with prefix
     */
    clear(): void {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach((key) => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('[SecureStorage] Failed to clear storage:', error);
        }
    }

    /**
     * Check if key exists and is not expired
     */
    has(key: string): boolean {
        return this.get(key) !== null;
    }

    /**
     * Get all keys with prefix
     */
    keys(): string[] {
        try {
            return Object.keys(localStorage)
                .filter((key) => key.startsWith(this.prefix))
                .map((key) => key.replace(this.prefix, ''));
        } catch (error) {
            console.error('[SecureStorage] Failed to get keys:', error);
            return [];
        }
    }
}

// Session Storage variant
class SecureSessionStorage extends SecureStorage {
    private readonly sessionPrefix = 'session_learnhub_';

    set<T>(key: string, value: T, options: StorageOptions = {}): void {
        try {
            const item: StorageItem<T> = {
                value,
                encrypted: options.encrypt,
            };

            if (options.expiresIn) {
                item.expires = Date.now() + options.expiresIn;
            }

            let serialized = JSON.stringify(item);

            if (options.encrypt) {
                serialized = btoa(encodeURIComponent(serialized));
            }

            sessionStorage.setItem(this.sessionPrefix + key, serialized);
        } catch (error) {
            console.error('[SecureSessionStorage] Failed to set item:', error);
        }
    }

    get<T>(key: string): T | null {
        try {
            const raw = sessionStorage.getItem(this.sessionPrefix + key);
            if (!raw) return null;

            let serialized = raw;

            if (raw.match(/^[A-Za-z0-9+/]+=*$/)) {
                try {
                    serialized = decodeURIComponent(atob(raw));
                } catch {
                    // Not encrypted
                }
            }

            const item: StorageItem<T> = JSON.parse(serialized);

            if (item.expires && Date.now() > item.expires) {
                this.remove(key);
                return null;
            }

            return item.value;
        } catch (error) {
            console.error('[SecureSessionStorage] Failed to get item:', error);
            return null;
        }
    }

    remove(key: string): void {
        try {
            sessionStorage.removeItem(this.sessionPrefix + key);
        } catch (error) {
            console.error('[SecureSessionStorage] Failed to remove item:', error);
        }
    }

    clear(): void {
        try {
            const keys = Object.keys(sessionStorage);
            keys.forEach((key) => {
                if (key.startsWith(this.sessionPrefix)) {
                    sessionStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('[SecureSessionStorage] Failed to clear storage:', error);
        }
    }
}

// Export singleton instances
export const secureStorage = new SecureStorage();
export const secureSessionStorage = new SecureSessionStorage();

export default secureStorage;
