// Accessibility utilities for improved keyboard navigation and screen reader support

/**
 * Manages focus trap within a modal or dialog
 */
export const useFocusTrap = (isActive: boolean) => {
    const FOCUSABLE_ELEMENTS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isActive || e.key !== 'Tab') return;

        const focusableElements = document.querySelectorAll(FOCUSABLE_ELEMENTS);
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    };

    return handleKeyDown;
};

/**
 * Generates accessible label and description IDs
 */
export const generateA11yIds = (baseId: string) => ({
    labelId: `${baseId}-label`,
    descriptionId: `${baseId}-description`,
    errorId: `${baseId}-error`
});

/**
 * Announces messages to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

/**
 * Screen reader only text class
 */
export const srOnlyClass = 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';
