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
        caseStudy?: string;
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
    highlights?: string[];
};

export const projects: Project[] = [
    {
        slug: "foam3d",
        title: "FOAM3D",
        summary:
            "A 3D visualization and image processing tool for creating customizable shapes and extracting outlines from images.",
        year: 2023,
        role: "Full Stack",
        tags: ["Three.js", "WebGL", "Python", "Docker", "Image Processing"],
        links: {
            github: "https://github.com/example",
        },
        highlights: [
            "Custom 3D shape creation",
            "Outline extraction from images",
            "Dockerized deployment",
        ],
        cover: {
            src: "/projects/foam3d/cover.jpg",
            alt: "FOAM3D preview",
        },
        caseStudy: {
            problem:
                "Users needed a way to generate and visualize complex 3D shapes while extracting usable geometry from uploaded images.",
            approach: [
                "Built a Three.js frontend for interactive shape creation and visualization.",
                "Integrated a Python backend for image processing and outline extraction.",
                "Dockerized the platform to ensure scalable and consistent deployments.",
            ],
            outcome: [
                "Enabled fast creation and visualization of complex 3D forms.",
                "Streamlined the pipeline from image upload to 3D geometry.",
                "Improved deployment reliability and scalability.",
            ],
        },
    },
    {
        slug: "urban-tourist-visualization",
        title: "Real-Time Visualization of Urban Data for Tourists",
        summary:
            "A real-time crowd visualization and guidance system for urban tourism, combining simulated live mobility data, historical records, and popularity signals to present intuitive crowd badges, trends, and recommendations.",
        year: 2025,
        role: "Master’s Thesis",
        tags: [
            "Urban Informatics",
            "Crowd Analytics",
            "Visualization",
            "OpenLayers",
            "React",
            "D3.js",
            "Node.js",
            "Redis",
            "MongoDB",
            "Geospatial",
        ],
        links: {},
        highlights: [
            "Tourist-focused crowd badges (Chill, Lively, Overcrowded) with adaptive thresholds",
            "Now & Next recommendations to spread visitors across alternatives",
            "Interactive heatmaps, KDE layers, and 7-day hourly charts",
            "Synthetic crowd data pipeline to simulate live conditions",
        ],
        cover: {
            src: "/projects/urban-tourist-visualization/cover.jpg",
            alt: "Real-time urban crowd visualization interface",
        },
        caseStudy: {
            problem:
                "Urban tourism causes overcrowding in historic centers, reducing visitor experience and livability. Tourists need real-time, easy-to-read guidance rather than raw crowd metrics.",
            approach: [
                "Combined simulated live data, historical records, and popularity signals into a unified pipeline.",
                "Computed capacity, pressure, adaptive thresholds, and flow trends to derive intuitive badges.",
                "Built a React + OpenLayers web UI with heatmaps, KDE layers, charts, and recommendations.",
                "Validated usability through interviews with professional tourist guides.",
            ],
            outcome: [
                "Produced a tourist-friendly visualization system that improves situational awareness.",
                "Showed that enriched indicators and simple badges are easier to interpret than raw data.",
                "Demonstrated recommendations can help distribute visitors more evenly.",
            ],
        },
    },

    {
        slug: "changunarayan-open-data",
        title: "Changunarayan Open Data Portal",
        summary:
            "A municipal geospatial web app for harvesting and visualizing public sector data across Changunarayan Municipality.",
        year: 2022,
        role: "Frontend",
        tags: ["React", "Redux", "D3", "OpenLayers", "Geospatial"],
        links: {
            live: "https://changu-stag.naxa.com.np",
        },
        highlights: [
            "Municipal-level open data portal",
            "Geospatial visualization",
            "Metadata harvesting from public data sources",
        ],
        cover: {
            src: "/projects/changunarayan-open-data/cover.jpg",
            alt: "Changunarayan Open Data Portal preview",
        },
        caseStudy: {
            problem:
                "The municipality needed a centralized platform to collect, manage, and visualize public sector data for transparency and planning.",
            approach: [
                "Designed and developed a React-based frontend with OpenLayers for map visualization.",
                "Integrated Redux for state management and D3 for data-driven visuals.",
                "Built pipelines to harvest and normalize metadata from public data portals.",
            ],
            outcome: [
                "Delivered a functional municipal open data portal.",
                "Improved access to public sector information for citizens and planners.",
                "Enabled geospatial insights through interactive maps and charts.",
            ],
        },
    },

    {
        slug: "webscrapping",
        title: "WebScrapping",
        summary:
            "A web scraping project that collects and processes data from target sites for structured use.",
        year: 2024,
        role: "Developer",
        tags: ["Web Scraping", "Automation", "Data Collection"],
        links: {
            github: "https://github.com/Shushovan015/WebScrapping",
        },
        highlights: [
            "Automated data extraction pipeline",
            "Structured output for reuse/analysis",
        ],
        cover: {
            src: "/projects/webscrapping/cover.jpg",
            alt: "WebScrapping project preview",
        },
    },

];
