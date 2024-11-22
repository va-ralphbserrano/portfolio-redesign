// This file contains all project definitions
import { Project, ProjectCategory, ProjectType } from '@/types/project';
import * as Images from './images';

// Technical Engineering Projects
const technicalProjects: Project[] = [
  // Kitchen Equipment Projects
  {
    id: "tech-1",
    title: "Commercial Kitchen Hood System",
    category: ProjectCategory.TECHNICAL_DESIGN,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Complete design of a commercial kitchen hood ventilation system with multiple revisions and specifications.",
    technologies: ["AutoCAD", "Sheet Metal Design", "Ventilation Systems"],
    image: Images.kitchenHoodFinal,
    gallery: [
      Images.kitchenHood,
      Images.kitchenHoodRev,
      Images.kitchenHoodRev2,
      Images.hoodSpecs,
      Images.hoodSpecsRev,
      Images.hoodBends
    ],
    imageLabels: [
      "Final Kitchen Hood Design",
      "Initial Hood Design",
      "Hood Design Revision 1",
      "Hood Design Revision 2",
      "Hood Specifications",
      "Hood Specifications Revision",
      "Hood Bend Details"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-2",
    title: "Dishwashing Area Ventilation",
    category: ProjectCategory.TECHNICAL_DESIGN,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Design of a specialized ventilation system for commercial dishwashing area including damper system and floor plan.",
    technologies: ["AutoCAD", "Sheet Metal Design", "Ventilation Systems"],
    image: Images.dishwashingHoodFinal,
    gallery: [
      Images.dishwashingHood,
      Images.dishwashingHoodRev,
      Images.dishwashingHoodDamper,
      Images.dishwashingHoodFloorPlan
    ],
    imageLabels: [
      "Final Dishwashing Hood Design",
      "Initial Dishwashing Hood",
      "Hood Design Revision",
      "Hood Damper System",
      "Floor Plan Layout"
    ],
    date: "2023",
    featured: true
  },
  
  // Storage Solutions
  {
    id: "tech-3",
    title: "Commercial Kitchen Storage Solutions",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Various storage solutions for commercial kitchens including drying racks, bread racks, and thawing racks.",
    technologies: ["AutoCAD", "Steel Fabrication", "Storage Design"],
    image: Images.kitchenDryingRack,
    gallery: [
      Images.breadRack,
      Images.breadRackRev,
      Images.thawingRack,
      Images.thawingRackClark,
      Images.thawingRackClark4,
      Images.tubeRack,
      Images.rack1286,
      Images.rack1700,
      Images.rack2000
    ],
    imageLabels: [
      "Kitchen Drying Rack",
      "Bread Rack Design",
      "Bread Rack Revision",
      "Thawing Rack Design",
      "Clark Thawing Rack",
      "Clark Thawing Rack V4",
      "Tube Storage Rack",
      "Rack Design 1286",
      "Rack Design 1700",
      "Rack Design 2000"
    ],
    date: "2023",
    featured: true
  },

  // Industrial Equipment
  {
    id: "tech-4",
    title: "Industrial Tank Systems",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of pressure tanks and mixing systems for industrial applications.",
    technologies: ["AutoCAD", "Pressure Vessel Design", "Industrial Equipment"],
    image: Images.pressureTank500L,
    gallery: [
      Images.pressureTank200L,
      Images.tankMixer,
      Images.tankMixer12L,
      Images.pipeAssembly,
      Images.waterIntakePipe
    ],
    imageLabels: [
      "500L Pressure Tank",
      "200L Pressure Tank",
      "Tank Mixer System",
      "12L Tank Mixer",
      "Pipe Assembly Design",
      "Water Intake Pipe"
    ],
    date: "2023",
    featured: true
  },

  // Conveyor Systems
  {
    id: "tech-5",
    title: "Conveyor System Design",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Comprehensive design of industrial conveyor systems with multiple configurations.",
    technologies: ["AutoCAD", "Conveyor Design", "Industrial Equipment"],
    image: Images.conveyorA2,
    gallery: [
      Images.conveyorB1,
      Images.conveyorB2,
      Images.conveyorB3,
      Images.conveyorC2
    ],
    imageLabels: [
      "Conveyor System A2",
      "Conveyor System B1",
      "Conveyor System B2",
      "Conveyor System B3",
      "Conveyor System C2"
    ],
    date: "2023",
    featured: true
  },

  // Steel Works
  {
    id: "tech-6",
    title: "Custom Steel Works",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Various custom steel works including grilles, grates, and doors for commercial applications.",
    technologies: ["AutoCAD", "Sheet Metal Design", "Steel Fabrication"],
    image: Images.steelGrates650,
    gallery: [
      Images.steelGrates14,
      Images.steelGrille325,
      Images.steelGrille341,
      Images.grilles,
      Images.fullLouverDoor
    ],
    imageLabels: [
      "Steel Grates 650",
      "Steel Grates 14",
      "Steel Grille 325",
      "Steel Grille 341",
      "Custom Grilles",
      "Full Louver Door"
    ],
    date: "2023",
    featured: false
  },

  // Store Design
  {
    id: "tech-7",
    title: "Mobile Store Layout Design",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Complete layout design for a mobile store with multiple configurations and views.",
    technologies: ["AutoCAD", "Store Planning", "Layout Design"],
    image: Images.mobileStore1,
    gallery: [
      Images.mobileStore2,
      Images.mobileStore3,
      Images.mobileStore4,
      Images.mobileStore5,
      Images.mobileStore6,
      Images.mobileStore7,
      Images.mobileStore8
    ],
    imageLabels: [
      "Mobile Store Layout 1",
      "Mobile Store Layout 2",
      "Mobile Store Layout 3",
      "Mobile Store Layout 4",
      "Mobile Store Layout 5",
      "Mobile Store Layout 6",
      "Mobile Store Layout 7",
      "Mobile Store Layout 8"
    ],
    date: "2023",
    featured: true
  },

  // Construction Projects
  {
    id: "tech-8",
    title: "Commercial Construction Projects",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Various construction and installation projects including roofing, solar, and facility improvements.",
    technologies: ["AutoCAD", "Construction Planning", "Installation Design"],
    image: Images.proposedRoofing,
    gallery: [
      Images.proposedLinenRoom,
      Images.proposedRoofRepair,
      Images.proposedRoofInstall,
      Images.proposedSolarInverter,
      Images.proposedWaterIntake,
      Images.concreteWallDetails
    ],
    imageLabels: [
      "Proposed Roofing Design",
      "Proposed Linen Room",
      "Roof Repair Plan",
      "Roof Installation Details",
      "Solar Inverter Installation",
      "Water Intake Design",
      "Concrete Wall Details"
    ],
    date: "2023",
    featured: false
  },

  // Assembly Projects
  {
    id: "tech-9",
    title: "Assembly Projects",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Various assembly projects including flight catering truck loading systems and pipe assemblies.",
    technologies: ["AutoCAD", "Assembly Design", "Industrial Equipment"],
    image: Images.flightAssembly,
    gallery: [
      Images.flightAssemblyV2,
      Images.flightAssemblyV3,
      Images.flightAssemblyV4,
      Images.assembly1,
      Images.pipeAssembly,
      Images.waterIntakePipe
    ],
    imageLabels: [
      "Flight Assembly System",
      "Flight Assembly V2",
      "Flight Assembly V3",
      "Flight Assembly V4",
      "Assembly Design 1",
      "Pipe Assembly",
      "Water Intake Pipe"
    ],
    date: "2023",
    featured: true
  },

  // Mechanical Components
  {
    id: "tech-10",
    title: "Mechanical Components",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of various mechanical components including gears, dies, flanges, and specialized parts.",
    technologies: ["AutoCAD", "Mechanical Design", "Component Design"],
    image: Images.gear,
    gallery: [
      Images.gearV2,
      Images.die,
      Images.flange,
      Images.bachoePlate,
      Images.platform,
      Images.sheetsLayout,
      Images.sheeringAndBending,
      Images.signage,
      Images.signageV2
    ],
    imageLabels: [
      "Gear Design",
      "Gear Design V2",
      "Die Design",
      "Flange Design",
      "Bachoe Plate Design",
      "Platform Design",
      "Sheets Layout",
      "Sheering and Bending",
      "Signage Design",
      "Signage Design V2"
    ],
    date: "2023",
    featured: false
  },

  // Sealing Moulds
  {
    id: "tech-11",
    title: "Sealing Mould Design",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of sealing moulds with different sizes and specifications.",
    technologies: ["AutoCAD", "Mould Design", "Industrial Equipment"],
    image: Images.sealingMould480,
    gallery: [
      Images.sealingMould480Rev,
      Images.sealingMould585,
      Images.sealingMould585Rev,
      Images.radius480,
      Images.radius585
    ],
    imageLabels: [
      "Sealing Mould 480",
      "Sealing Mould 480 Revision",
      "Sealing Mould 585",
      "Sealing Mould 585 Revision",
      "Radius 480",
      "Radius 585"
    ],
    date: "2023",
    featured: false
  },

  // Grillerie Project
  {
    id: "tech-12",
    title: "Grillerie Updates",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Updates and modifications for a 1.3M Grillerie system.",
    technologies: ["AutoCAD", "Equipment Design", "Commercial Kitchen"],
    image: Images.grillerieUpdate1,
    gallery: [
      Images.grillerieUpdate2,
      Images.grillerieUpdate3
    ],
    imageLabels: [
      "Grillerie Update 1",
      "Grillerie Update 2",
      "Grillerie Update 3"
    ],
    date: "2023",
    featured: false
  }
];

// Helper function to determine priority based on category
const getCategoryPriority = (category: ProjectCategory): number => {
  switch (category) {
    case ProjectCategory.VIRTUAL_ASSISTANCE:
      return 1;
    case ProjectCategory.WEB_DEVELOPMENT:
      return 2;
    case ProjectCategory.PROJECT_MANAGEMENT:
      return 3;
    case ProjectCategory.CONTENT_CREATION:
      return 4;
    default:
      return 5;
  }
};

// Portfolio Projects grouped by category
const portfolioProjects: Project[] = [
  // Web Development Projects
  {
    id: "portfolio-1",
    title: "JBY Website",
    category: ProjectCategory.WEB_DEVELOPMENT,
    type: ProjectType.WEB_APP,
    description: "Developed and maintained a website for JBY, implementing modern design principles and functionality.",
    technologies: ["Web Development", "HTML", "CSS", "JavaScript"],
    image: "/src/assets/images/portfolio/jby-website.png",
    imageLabels: ["JBY Website Homepage"],
    date: "2023",
    featured: true
  },
  {
    id: "portfolio-2",
    title: "Portfolio Evolution",
    category: ProjectCategory.WEB_DEVELOPMENT,
    type: ProjectType.WEB_APP,
    description: "Evolution of my portfolio through different platforms, showcasing growth in web development skills.",
    technologies: ["Web Development", "Design", "Multiple Platforms"],
    image: "/src/assets/images/portfolio/old-portfolio-using-vscode.png",
    gallery: [
      "/src/assets/images/portfolio/old-portfolio-using-canva.png",
      "/src/assets/images/portfolio/old-portfolio-using-wix.png"
    ],
    imageLabels: [
      "Old Portfolio Using VSCode",
      "Old Portfolio Using Canva",
      "Old Portfolio Using Wix"
    ],
    date: "2022",
    featured: true
  },

  // Virtual Assistant Services
  {
    id: "portfolio-3",
    title: "Email Management",
    category: ProjectCategory.VIRTUAL_ASSISTANCE,
    type: ProjectType.VIRTUAL_ASSISTANT,
    description: "Comprehensive email management service including inbox organization, response handling, and priority management.",
    technologies: ["Gmail", "Email Management", "Communication"],
    image: "/src/assets/images/portfolio/email-management.png",
    imageLabels: ["Email Management System"],
    date: "2023",
    featured: true
  },
  {
    id: "portfolio-4",
    title: "Calendar Management",
    category: ProjectCategory.VIRTUAL_ASSISTANCE,
    type: ProjectType.VIRTUAL_ASSISTANT,
    description: "Professional calendar management service ensuring efficient scheduling and time optimization.",
    technologies: ["Google Calendar", "Scheduling", "Time Management"],
    image: "/src/assets/images/portfolio/calendar-management.png",
    imageLabels: ["Calendar Management Interface"],
    date: "2023",
    featured: true
  },

  // Project Management
  {
    id: "portfolio-5",
    title: "Trello Project Management",
    category: ProjectCategory.PROJECT_MANAGEMENT,
    type: ProjectType.MANAGEMENT,
    description: "Implementation of efficient project management systems using Trello for task organization and team collaboration.",
    technologies: ["Trello", "Project Management", "Task Organization"],
    image: "/src/assets/images/portfolio/trello.png",
    imageLabels: ["Trello Project Board"],
    date: "2023",
    featured: true
  },

  // Professional Development
  {
    id: "portfolio-6",
    title: "Virtual Assistant Masterclass",
    category: ProjectCategory.PROFESSIONAL_DEVELOPMENT,
    type: ProjectType.EDUCATION,
    description: "Comprehensive virtual assistant training program enhancing professional skills and service capabilities.",
    technologies: ["Virtual Assistance", "Professional Development", "Business Skills"],
    image: "/src/assets/images/portfolio/masterclass-virtual-assistant-program.png",
    imageLabels: ["VA Masterclass Certificate"],
    date: "2023",
    featured: true
  },
  {
    id: "portfolio-7",
    title: "Surge Apprenticeship Program",
    category: ProjectCategory.PROFESSIONAL_DEVELOPMENT,
    type: ProjectType.EDUCATION,
    description: "Intensive apprenticeship program focusing on virtual assistance and professional service delivery.",
    technologies: ["Virtual Assistance", "Professional Development", "Business Skills"],
    image: "/src/assets/images/portfolio/surge-apprenticeship.png",
    imageLabels: ["Surge Apprenticeship Certificate"],
    date: "2023",
    featured: true
  },

  // Content Creation
  {
    id: "portfolio-8",
    title: "Surge Content Creation",
    category: ProjectCategory.CONTENT_CREATION,
    type: ProjectType.DESIGN,
    description: "Development of engaging content for Surge, including social media materials and marketing content.",
    technologies: ["Content Creation", "Social Media", "Marketing"],
    image: "/src/assets/images/portfolio/surge-content-creation.png",
    imageLabels: ["Surge Content Sample"],
    date: "2023",
    featured: true
  }
].sort((a, b) => {
  // Sort by category order
  const categoryOrder = {
    [ProjectCategory.WEB_DEVELOPMENT]: 1,
    [ProjectCategory.VIRTUAL_ASSISTANCE]: 2,
    [ProjectCategory.PROJECT_MANAGEMENT]: 3,
    [ProjectCategory.PROFESSIONAL_DEVELOPMENT]: 4,
    [ProjectCategory.CONTENT_CREATION]: 5
  };
  
  const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
  if (categoryDiff !== 0) return categoryDiff;
  
  // If same category, sort by date (newest first)
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// Other portfolio projects without matching images can be added here
const otherPortfolioProjects: Project[] = [
  // Add other projects here
];

// Combine the arrays, ensuring image projects come first
const combinedPortfolioProjects: Project[] = [...portfolioProjects, ...otherPortfolioProjects];

// Web Development Projects
const webProjects: Project[] = [
  {
    id: "web-1",
    title: "Dice Roller App",
    category: ProjectCategory.WEB_DEVELOPMENT,
    type: ProjectType.WEB_APP,
    description: "A simple web application for rolling dice.",
    technologies: ["JavaScript", "HTML", "CSS"],
    image: Images.diceroller,
    imageLabels: ["Dice Roller Application"],
    date: "2023",
    featured: false
  }
];

// Combine all projects with specific order
export const projects = [...combinedPortfolioProjects, ...webProjects, ...technicalProjects];

// Export helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  if (category === ProjectCategory.ALL) return projects;
  return projects.filter(project => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getTechnicalProjects(): Project[] {
  return technicalProjects;
}

export function getPortfolioProjects(): Project[] {
  // Return portfolio projects first, excluding technical projects
  return projects.filter(project => 
    project.category !== ProjectCategory.TECHNICAL_DESIGN && 
    project.category !== ProjectCategory.COMMERCIAL && 
    project.category !== ProjectCategory.INDUSTRIAL
  );
}
