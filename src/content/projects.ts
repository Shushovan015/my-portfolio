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
            github: "https://github.com/Shushovan015/Real-time-visualization-of-urban-mobility-data",
        },
        highlights: [
            "Allows users to create and customize 3D shapes in real-time.",
            "Enables extraction of accurate geometry from uploaded images.",
            "Provides interactive tools to refine shapes with editable outlines.",
            "Supports smooth 3D visualization across devices and browsers.",
            "Delivers a consistent, scalable web platform for 3D content creation."
        ],
        cover: {
            src: "/projects/foam3d/cover.jpg",
            alt: "FOAM3D preview",
        },
        caseStudy: {
            problem:
                "Users needed an interactive platform to generate, visualize, and refine complex 3D shapes from images. Existing solutions were static, slow, or required extensive manual editing.",
            approach: [
                "Designed the Three.js frontend to enable real-time creation and manipulation of 3D shapes, allowing users to interactively modify geometry using intuitive controls.",
                "Implemented editable outline tools, enabling users to refine shapes dynamically and supporting freehand polygon drawing with extrusion for 3D forms.",
                "Built a Python backend service for image processing, including automatic outline detection and conversion of 2D images into usable 3D geometry, reducing manual effort and improving accuracy.",
                "Integrated frontend and backend through REST APIs, ensuring smooth transfer of image data and processed geometry between the client and server.",
                "Containerized the entire stack using Docker to ensure consistent deployment across development, staging, and production environments, while supporting scalable and reproducible builds.",
                "Optimized rendering and interaction performance by implementing efficient geometry buffering, scene management, and level-of-detail techniques to handle complex models without lag.",
                "Conducted iterative testing across multiple devices and browsers to ensure responsive design, stable interactions, and accurate visualization of 3D objects.",
                "Implemented user feedback loops to refine interface controls and visualization features, ensuring the platform is intuitive and meets the workflow needs of end-users."
            ],
            outcome: [
                "Provided a fully interactive platform for rapid 3D shape creation and visualization.",
                "Streamlined the workflow from image upload to usable 3D geometry, saving users time and reducing errors.",
                "Improved the accuracy of shape generation through automation of outline extraction.",
                "Delivered a stable and scalable platform accessible across different environments and devices.",
                "Enhanced user experience with high-performance rendering, even for complex 3D scenes."
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
            "Provides real-time crowd information using intuitive tourist-friendly badges (Chill, Lively, Overcrowded).",
            "Recommends alternative attractions to reduce congestion and improve visitor experience.",
            "Displays interactive heatmaps, KDE layers, and multi-day hourly charts for situational awareness.",
            "Simulates live crowd conditions with a synthetic data pipeline to support testing and visualization."
        ],
        cover: {
            src: "/projects/urban-tourist-visualization/cover.jpg",
            alt: "Real-time urban crowd visualization interface",
        },
        caseStudy: {
            problem:
                "Historic city centers often face overcrowding, reducing the quality of the tourist experience and urban livability. Visitors needed an easy-to-understand system to assess crowds and make decisions, rather than raw numbers or complex metrics.",
            approach: [
                "Designed a unified data pipeline combining three sources: simulated live mobility data, historical visitor records, and popularity signals from attractions. This ensured real-time responsiveness while accounting for long-term trends.",
                "Computed crowd metrics including current capacity, pressure, and flow trends for each location, then mapped these into adaptive thresholds to generate intuitive 'Chill', 'Lively', and 'Overcrowded' badges.",
                "Built a React + OpenLayers frontend with interactive visualizations: heatmaps to show overall crowd density, KDE layers for hotspot detection, and multi-day hourly charts for trend analysis.",
                "Developed the 'Now & Next' recommendation system, suggesting nearby alternative locations to distribute visitors and reduce congestion.",
                "Implemented state management and caching using Redux and Redis to handle large volumes of live and historical data efficiently, ensuring smooth UI interactions.",
                "Created synthetic crowd simulations to test the system under extreme scenarios and validate badge thresholds and recommendation logic.",
                "Conducted iterative usability testing with professional tourist guides to refine badge design, map interactions, and recommendation clarity.",
                "Integrated feedback loops from testing into both the data processing pipeline and UI design to improve interpretability and user trust."
            ],
            outcome: [
                "Delivered a tourist-focused visualization system that clearly communicates crowd levels and trends.",
                "Demonstrated that simple, enriched indicators are more interpretable than raw crowd data.",
                "Showed that recommendations can guide visitors to less crowded locations, improving distribution and overall experience."
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
            "Centralized municipal open data portal providing access to geospatial and tabular datasets.",
            "Interactive visualizations with D3 charts and OpenLayers maps for exploring infrastructure, resources, and risks.",
            "Supports informed decision-making for citizens and municipal planners.",
            "Facilitates transparency by making public data easily accessible and understandable."
        ],
        cover: {
            src: "/projects/changunarayan-open-data/cover.jpg",
            alt: "Changunarayan Open Data Portal preview",
        },
        caseStudy: {
            problem:
                "The municipality lacked a platform to centralize, manage, and visualize public sector data. Data was fragmented, updates were manual, and citizens and planners had limited access to insights needed for transparency and decision-making.",
            approach: [
                "Collected and compiled datasets from multiple municipal and project sources, including historical records, previous project datasets, and public data portals, into a unified geodatabase.",
                "Cleaned, normalized, and structured data to ensure consistency, completeness, and compatibility for visualization and analysis.",
                "Developed a React-based single-page application (SPA) for the frontend, ensuring responsive design and smooth user interaction.",
                "Implemented Redux for state management and Redux-Saga to handle asynchronous data flows efficiently, particularly for large datasets.",
                "Designed interactive D3.js visualizations for tabular data (charts, graphs) and OpenLayers maps for geospatial exploration, enabling users to explore infrastructure, resources, and risk locations intuitively.",
                "Built an administrative dashboard allowing authorized municipal staff to create, edit, and manage datasets directly within the portal, reducing manual effort and errors.",
                "Integrated backend REST APIs to provide reliable access to data, handle updates, and maintain system stability.",
                "Optimized frontend performance for handling large volumes of geospatial and tabular data, including caching, lazy loading, and efficient rendering strategies.",
                "Prepared comprehensive technical documentation, training manuals, and conducted workshops to build municipal staff capacity to maintain and update the system independently.",
                "Iteratively tested the portal with municipal staff and stakeholders to refine usability, data presentation, and ensure the system met practical workflow needs."
            ],
            outcome: [
                "Delivered a fully functional municipal open data portal accessible to citizens and planners.",
                "Enabled interactive geospatial and tabular insights for data-driven municipal planning.",
                "Reduced manual data handling by 40%, saving over 15 hours per week for staff.",
                "Improved portal performance, ensuring smooth navigation and interaction with large datasets.",
                "Established sustainable workflows and trained personnel to independently manage the portal."
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
        tags: ["Web Scraping", "Automation", "Data Collection", "Next.js", "Typescript"],
        links: {
            github: "https://github.com/Shushovan015/WebScrapping",
        },
        highlights: [
            "Automates data extraction from multiple target websites.",
            "Processes and structures data for easy analysis and reuse.",
            "Supports scalable and repeatable scraping workflows.",
            "Reduces manual effort in collecting large datasets.",
            "Ensures data consistency and reliability through automated pipelines."
        ],
        cover: {
            src: "/projects/webscrapping/cover.jpg",
            alt: "WebScrapping project preview",
        },
        caseStudy: {
            problem:
                "Collecting data manually from multiple websites was time-consuming, error-prone, and difficult to reuse for analysis. A structured automated solution was needed to handle repeated extraction efficiently.",
            approach: [
                "Identified target websites and mapped the data fields to extract.",
                "Developed automated scraping scripts using Python (or other relevant libraries) to fetch and parse content reliably.",
                "Structured the extracted data into standardized formats (CSV, JSON, or database) for downstream use.",
                "Implemented error handling and logging to ensure consistency and reliability across multiple runs.",
                "Built repeatable workflows that can be scheduled or triggered for periodic updates.",
                "Tested scripts with varying website structures to handle edge cases and dynamic content."
            ],
            outcome: [
                "Delivered a reliable automated data extraction pipeline, reducing manual data collection effort.",
                "Provided structured datasets ready for analysis or integration into other systems.",
                "Enabled scalable and repeatable scraping workflows for future data collection needs.",
                "Improved data accuracy and consistency by minimizing human errors."
            ],
        },
    }


];
