/**
 * Performance monitoring utilities
 */

/**
 * Measures the performance of a function
 */
export const measurePerformance = <T>(
    name: string,
    fn: () => T
): T => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);

    return result;
};

/**
 * Measures async function performance
 */
export const measureAsyncPerformance = async <T>(
    name: string,
    fn: () => Promise<T>
): Promise<T> => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);

    return result;
};

/**
 * Creates a performance mark
 */
export const mark = (name: string) => {
    if (performance.mark) {
        performance.mark(name);
    }
};

/**
 * Measures between two marks
 */
export const measure = (name: string, startMark: string, endMark: string) => {
    if (performance.measure) {
        try {
            performance.measure(name, startMark, endMark);
            const measures = performance.getEntriesByName(name);
            if (measures.length > 0) {
                console.log(`[Performance] ${name}: ${measures[0].duration.toFixed(2)}ms`);
            }
        } catch (error) {
            console.warn('Performance measurement failed:', error);
        }
    }
};

/**
 * Logs page load performance
 */
export const logPageLoad = () => {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

            if (perfData) {
                console.log('[Performance] Page Load Metrics:');
                console.log(`  DNS: ${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`);
                console.log(`  TCP: ${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`);
                console.log(`  Request: ${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`);
                console.log(`  Response: ${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`);
                console.log(`  DOM Processing: ${(perfData.domComplete - perfData.domInteractive).toFixed(2)}ms`);
                console.log(`  Total: ${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`);
            }
        }, 0);
    });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
