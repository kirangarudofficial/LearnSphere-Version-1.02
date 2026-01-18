/**
 * Design Tokens
 * Centralized design system for consistent styling across the application
 */

export const colors = {
  // Primary Brand Colors - Vibrant Blue Gradient
  primary: {
    50: 'hsl(210, 100%, 97%)',
    100: 'hsl(210, 100%, 94%)',
    200: 'hsl(210, 100%, 88%)',
    300: 'hsl(210, 100%, 78%)',
    400: 'hsl(210, 100%, 66%)',
    500: 'hsl(210, 100%, 56%)', // Main brand color
    600: 'hsl(210, 100%, 48%)',
    700: 'hsl(210, 100%, 40%)',
    800: 'hsl(210, 100%, 32%)',
    900: 'hsl(210, 100%, 24%)',
  },
  
  // Secondary - Teal/Cyan
  secondary: {
    50: 'hsl(174, 80%, 96%)',
    100: 'hsl(174, 80%, 90%)',
    200: 'hsl(174, 80%, 80%)',
    300: 'hsl(174, 70%, 65%)',
    400: 'hsl(174, 70%, 52%)',
    500: 'hsl(174, 70%, 42%)',
    600: 'hsl(174, 70%, 35%)',
    700: 'hsl(174, 70%, 28%)',
    800: 'hsl(174, 70%, 22%)',
    900: 'hsl(174, 70%, 16%)',
  },
  
  // Accent - Purple/Violet
  accent: {
    50: 'hsl(270, 90%, 97%)',
    100: 'hsl(270, 85%, 94%)',
    200: 'hsl(270, 85%, 88%)',
    300: 'hsl(270, 80%, 76%)',
    400: 'hsl(270, 75%, 64%)',
    500: 'hsl(270, 70%, 54%)',
    600: 'hsl(270, 65%, 46%)',
    700: 'hsl(270, 60%, 38%)',
    800: 'hsl(270, 55%, 30%)',
    900: 'hsl(270, 50%, 22%)',
  },
  
  // Success
  success: {
    50: 'hsl(142, 76%, 96%)',
    100: 'hsl(142, 76%, 90%)',
    200: 'hsl(142, 70%, 80%)',
    300: 'hsl(142, 65%, 65%)',
    400: 'hsl(142, 60%, 52%)',
    500: 'hsl(142, 70%, 42%)',
    600: 'hsl(142, 75%, 35%)',
    700: 'hsl(142, 75%, 28%)',
    800: 'hsl(142, 75%, 22%)',
    900: 'hsl(142, 75%, 16%)',
  },
  
  // Warning
  warning: {
    50: 'hsl(38, 100%, 96%)',
    100: 'hsl(38, 100%, 90%)',
    200: 'hsl(38, 100%, 80%)',
    300: 'hsl(38, 95%, 65%)',
    400: 'hsl(38, 90%, 52%)',
    500: 'hsl(38, 90%, 45%)',
    600: 'hsl(38, 90%, 38%)',
    700: 'hsl(38, 85%, 30%)',
    800: 'hsl(38, 80%, 24%)',
    900: 'hsl(38, 75%, 18%)',
  },
  
  // Error/Danger
  error: {
    50: 'hsl(0, 90%, 97%)',
    100: 'hsl(0, 90%, 94%)',
    200: 'hsl(0, 90%, 88%)',
    300: 'hsl(0, 85%, 76%)',
    400: 'hsl(0, 80%, 64%)',
    500: 'hsl(0, 75%, 54%)',
    600: 'hsl(0, 72%, 46%)',
    700: 'hsl(0, 70%, 38%)',
    800: 'hsl(0, 68%, 30%)',
    900: 'hsl(0, 65%, 22%)',
  },
  
  // Neutral/Gray
  neutral: {
    50: 'hsl(220, 20%, 98%)',
    100: 'hsl(220, 18%, 95%)',
    200: 'hsl(220, 16%, 88%)',
    300: 'hsl(220, 14%, 75%)',
    400: 'hsl(220, 12%, 60%)',
    500: 'hsl(220, 10%, 45%)',
    600: 'hsl(220, 12%, 35%)',
    700: 'hsl(220, 14%, 26%)',
    800: 'hsl(220, 16%, 18%)',
    900: 'hsl(220, 18%, 12%)',
  },
};

export const typography = {
  fontFamily: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.875rem' }],  // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px
    '6xl': ['3.75rem', { lineHeight: '4rem' }],     // 60px
    '7xl': ['4.5rem', { lineHeight: '4.5rem' }],    // 72px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.625rem',   // 10px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const boxShadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  colored: {
    primary: '0 10px 30px -5px hsla(210, 100%, 56%, 0.3)',
    secondary: '0 10px 30px -5px hsla(174, 70%, 42%, 0.3)',
    accent: '0 10px 30px -5px hsla(270, 70%, 54%, 0.3)',
  },
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const transitions = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
};

export const animation = {
  fadeIn: 'fadeIn 0.3s ease-in',
  fadeOut: 'fadeOut 0.3s ease-out',
  slideUp: 'slideUp 0.3s ease-out',
  slideDown: 'slideDown 0.3s ease-out',
  scaleIn: 'scaleIn 0.2s ease-out',
  spin: 'spin 1s linear infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',
};

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  transitions,
  animation,
  zIndex,
};
