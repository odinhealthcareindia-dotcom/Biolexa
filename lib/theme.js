/**
 * BioLexa Design System — Single Source of Truth
 *
 * Every design token used across the BioLexa site lives here.
 * Components reference these tokens via CSS variables (see app/globals.css)
 * or by importing this module directly.
 */

export const theme = {
    brand: {
        name: "BioLexa",
        tagline: "Intelligent Healthcare Solutions",
        logo: {
            part1: "Bio",
            part1Color: "#FF3333",
            part2: "Lexa",
            part2Color: "#1A1A1A",
            iconColor: "#FF3333",
        },
    },

    colors: {
        light: {
            primary: "#FF3333",
            primaryHover: "#E02020",
            primarySoft: "#FFF0F0",
            secondary: "#1A1A1A",
            background: "#FFFFFF",
            surface: "#F9F9F9",
            surfaceAlt: "#F1F1F1",
            textPrimary: "#1A1A1A",
            textSecondary: "#555555",
            textMuted: "#888888",
            border: "#E0E0E0",
            borderStrong: "#CCCCCC",
            success: "#22C55E",
            warning: "#F59E0B",
            error: "#EF4444",
            info: "#3B82F6",
        },
        dark: {
            primary: "#FF3333",
            primaryHover: "#FF5555",
            primarySoft: "#2A1010",
            secondary: "#F5F5F5",
            background: "#0D0D0D",
            surface: "#1A1A1A",
            surfaceAlt: "#2A2A2A",
            textPrimary: "#F5F5F5",
            textSecondary: "#CCCCCC",
            textMuted: "#888888",
            border: "#333333",
            borderStrong: "#444444",
            success: "#4ADE80",
            warning: "#FCD34D",
            error: "#F87171",
            info: "#60A5FA",
        },
    },

    typography: {
        fontFamily: {
            primary: "'Inter', system-ui, -apple-system, sans-serif",
            fallback: "sans-serif",
        },
        sizes: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
        },
        weights: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeights: {
            tight: "1.2",
            normal: "1.5",
            relaxed: "1.7",
            loose: "2.0",
        },
    },

    spacing: {
        base: "4px",
        scale: {
            1: "4px",
            2: "8px",
            3: "12px",
            4: "16px",
            5: "20px",
            6: "24px",
            8: "32px",
            10: "40px",
            12: "48px",
            16: "64px",
            20: "80px",
            24: "96px",
        },
    },

    radius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
    },

    shadows: {
        sm: "0 1px 3px rgba(0,0,0,0.08)",
        md: "0 4px 12px rgba(0,0,0,0.10)",
        lg: "0 8px 24px rgba(0,0,0,0.12)",
        xl: "0 16px 48px rgba(0,0,0,0.14)",
    },

    transitions: {
        duration: {
            fast: "150ms",
            default: "300ms",
            slow: "500ms",
        },
        easing: {
            default: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
    },
}

// Framer Motion shared animation primitives — confident, precise, forward-moving
export const ease = [0.25, 0.1, 0.25, 1]

export const motionVariants = {
    fadeUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease },
    },
    fadeUpLarge: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease },
    },
    staggerContainer: {
        animate: { transition: { staggerChildren: 0.1 } },
    },
    staggerWord: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease },
    },
    viewport: { once: true, amount: 0.2 },
}

export const storageKey = "biolexa_theme"

export default theme