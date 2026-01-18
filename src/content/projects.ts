export type Project = {
    slug: string;
    title: string;
    summary: string;
    year: number;
    role?: string;
    tags: string[];
    links: {
        live?: string;
        github?: string;
        caseStudy?: string; // we'll use internal pages later
    };
    caseStudy?: {
        problem: string;
        approach: string[];
        outcome: string[];
    };
    cover?: {
        src: string;
        alt: string;
    };
    highlights?: string[]; // quick bullet wins
};

export const projects: Project[] = [
    {
        slug: "nebula-ui",
        title: "Nebula UI",
        summary: "A component-driven design system with motion, theming, and accessibility built-in.",
        year: 2025,
        role: "Frontend",
        tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
        links: {
            live: "https://example.com",
            github: "https://github.com/example",
        },
        highlights: ["Accessible components", "Token-based theming", "Motion presets"],
        cover: {
            src: "/projects/nebula-ui/cover.jpg",
            alt: "Nebula UI preview",
        },
        caseStudy: {
            problem:
                "Teams were shipping inconsistent UI and spending too long rebuilding common patterns. The goal was to create a reusable, accessible system with motion and theming.",
            approach: [
                "Built a token-based theming system for colors, spacing, radius, and shadows.",
                "Created accessible primitives (focus, keyboard nav, ARIA) as defaults.",
                "Added motion presets for consistent interactions and transitions.",
            ],
            outcome: [
                "Reduced UI build time by standardizing components and patterns.",
                "Improved consistency across pages and features.",
                "Established a scalable foundation for new components.",
            ],
        },
    },
    {
        slug: "orbit-commerce",
        title: "Orbit Commerce",
        summary: "High-performance e-commerce frontend with instant navigation and polished UI details.",
        year: 2024,
        role: "Frontend",
        tags: ["Next.js", "RSC", "Performance", "SEO"],
        links: {
            live: "https://example.com",
        },
        highlights: ["Lighthouse 95+", "Optimized images", "Fast product filtering"],
        cover: {
            src: "/projects/orbit-commerce/cover.jpg",
            alt: "Orbit Commerce preview",
        },
        caseStudy: {
            problem:
                "The storefront needed faster navigation, better SEO, and a smoother browsing experience for users on mid-range devices.",
            approach: [
                "Improved route-level performance by reducing unnecessary client JS.",
                "Optimized images and critical rendering paths for faster LCP.",
                "Built responsive filters and UI states with clear loading feedback.",
            ],
            outcome: [
                "Better perceived performance and smoother browsing experience.",
                "Improved SEO foundations via clean metadata and structure.",
                "More maintainable UI patterns for product pages and lists.",
            ],
        },

    },
    {
        slug: "three-landing",
        title: "Three.js Landing Experience",
        summary: "A WebGL hero section that stays smooth on mid-range devices using smart render controls.",
        year: 2024,
        role: "Creative Dev",
        tags: ["Three.js", "R3F", "Drei", "UX"],
        links: {
            github: "https://github.com/example",
        },
        highlights: ["Reduced-motion support", "Lazy loaded canvas", "DPR tuning"],
        cover: {
            src: "/projects/three-landing/cover.jpg",
            alt: "Three.js landing experience preview",
        },
        caseStudy: {
            problem:
                "A WebGL hero can easily tank performance or feel gimmicky. The challenge was creating a premium 3D moment that stays smooth and accessible.",
            approach: [
                "Used a lightweight scene with tuned DPR and minimal geometry cost.",
                "Implemented reduced-motion support and subtle interactions.",
                "Designed lighting/environment for a premium look without heavy assets.",
            ],
            outcome: [
                "A signature hero that feels premium without overwhelming the UI.",
                "Improved accessibility with motion preferences respected.",
                "Kept rendering smooth on mid-range devices.",
            ],
        },

    },
];
