// cSpell:words Canva canva dishwashing Dishwashing grillerie Grillerie

// This file contains all project definitions
import { Project, ProjectCategory, ProjectType } from '@/shared/types/project.js';

// Import portfolio images
import calendarManagement from '@/shared/assets/images/portfolio/calendar-management.png';
import emailManagement from '@/shared/assets/images/portfolio/email-management.png';
import jbyWebsite from '@/shared/assets/images/portfolio/jby-website.png';
import masterclass from '@/shared/assets/images/portfolio/masterclass-virtual-assistant-program.png';
import oldPortfolioCanva from '@/shared/assets/images/portfolio/old-portfolio-using-canva.png';
import oldPortfolioVscode from '@/shared/assets/images/portfolio/old-portfolio-using-vscode.png';
import oldPortfolioWix from '@/shared/assets/images/portfolio/old-portfolio-using-wix.png';
import surgeApprenticeship from '@/shared/assets/images/portfolio/surge-apprenticeship.png';
import surgeContent from '@/shared/assets/images/portfolio/surge-content-creation.png';
import trello from '@/shared/assets/images/portfolio/trello.png';

// Import technical project images - Kitchen Equipment
import grillerieUpdate1 from '@/shared/assets/images/projects/1.3M Grillerie Update p1.png';
import grillerieUpdate2 from '@/shared/assets/images/projects/1.3M Grillerie Update p2.png';
import grillerieUpdate3 from '@/shared/assets/images/projects/1.3M Grillerie Update p3.png';
import dishwashingHoodDamper from '@/shared/assets/images/projects/Dishwashing Hood Damper.png';
import dishwashingHoodFinal from '@/shared/assets/images/projects/Dishwashing Hood Final.png';
import dishwashingHoodFlrPlan from '@/shared/assets/images/projects/Dishwashing Hood Flr Plan.png';
import dishwashingHoodRev from '@/shared/assets/images/projects/Dishwashing Hood rev.png';
import hoodBends from '@/shared/assets/images/projects/Hood Bends.png';
import hoodSpecsRev from '@/shared/assets/images/projects/Hood Specs rev.png';
import hoodSpecs from '@/shared/assets/images/projects/Hood Specs.png';
import kitchenHoodFinal from '@/shared/assets/images/projects/Kitchen Hood Final.png';
import kitchenHoodRev from '@/shared/assets/images/projects/Kitchen Hood rev.png';
import kitchenHoodRev2 from '@/shared/assets/images/projects/Kitchen Hood rev2.png';

// Import technical project images - Storage Solutions
import breadRackRev from '@/shared/assets/images/projects/Bread Rack Rev.png';
import breadRack from '@/shared/assets/images/projects/Bread Rack.png';
import kitchenDryingRack from '@/shared/assets/images/projects/Kitchen Drying Rack.png';
import rack1286 from '@/shared/assets/images/projects/Rack 1286 x 470 x 1300.png';
import rack1700 from '@/shared/assets/images/projects/Rack 1700 x 25inches x 2200.png';
import rack2000 from '@/shared/assets/images/projects/Rack 2000 x 25inches x 2200.png';
import thawingRackClark4 from '@/shared/assets/images/projects/Thawing Rack Clark (4).png';
import thawingRackClark from '@/shared/assets/images/projects/Thawing Rack Clark.png';
import thawingRack from '@/shared/assets/images/projects/Thawing Rack.png';
import tubeRack from '@/shared/assets/images/projects/Tube Rack.png';

// Import technical project images - Industrial Systems
import conveyorA2 from '@/shared/assets/images/projects/conveyor-a2-white.png';
import conveyorB1 from '@/shared/assets/images/projects/conveyor-b1-white.png';
import conveyorB2 from '@/shared/assets/images/projects/conveyor-b2-white.png';
import conveyorB3 from '@/shared/assets/images/projects/conveyor-b3-white.png';
import conveyorC2 from '@/shared/assets/images/projects/conveyor-c2-white.png';
import flightAssemblyV2 from '@/shared/assets/images/projects/Flight Assembling Catering Truck Loading Project v2.png';
import flightAssemblyV3 from '@/shared/assets/images/projects/Flight Assembling Catering Truck Loading Project v3.png';
import flightAssemblyV4 from '@/shared/assets/images/projects/Flight Assembling Catering Truck Loading Project v4.png';
import flightAssembly from '@/shared/assets/images/projects/Flight Assembling Catering Truck Loading Project.png';

// Import technical project images - Steel Works
import steelGrates14 from '@/shared/assets/images/projects/14in Steel Grates.png';
import steelGrille325 from '@/shared/assets/images/projects/325mm Steel Grille.png';
import steelGrille341 from '@/shared/assets/images/projects/341mm Steel Grille.png';
import steelGrates650 from '@/shared/assets/images/projects/650mm Steel Grates.png';
import louverDoor from '@/shared/assets/images/projects/Full Louver Steel Door.png';
import grilles from '@/shared/assets/images/projects/Grilles.png';

// Import technical project images - Construction & Installation
import concreteWall from '@/shared/assets/images/projects/Concrete Wall Details.png';
import proposedLinenRoom from '@/shared/assets/images/projects/Proposed Linen Room.png';
import proposedRepair from '@/shared/assets/images/projects/Proposed Repair of Roof and Ceiling Area.png';
import proposedRoofInstall2 from '@/shared/assets/images/projects/Proposed Roof Installation2.png';
import proposedRoofing from '@/shared/assets/images/projects/Proposed Roofing.png';
import proposedSolar from '@/shared/assets/images/projects/Proposed Solar Inverter Installation.png';

// Import technical project images - Mechanical Components
import backhoe from '@/shared/assets/images/projects/Backhoe Plate.png';
import die from '@/shared/assets/images/projects/Die.png';
import flange from '@/shared/assets/images/projects/Flange.png';
import gearV2 from '@/shared/assets/images/projects/Gear V2.png';
import gear from '@/shared/assets/images/projects/Gear.png';
import platform from '@/shared/assets/images/projects/Platform.png';
import sheering from '@/shared/assets/images/projects/Sheering and Bending.png';

// Import technical project images - Store Planning
import boxLayout from '@/shared/assets/images/projects/Box Layout.png';
import mobileStore1 from '@/shared/assets/images/projects/MOBILE-STORE-Layout1.png';
import mobileStore2 from '@/shared/assets/images/projects/MOBILE-STORE-Layout2.png';
import mobileStore3 from '@/shared/assets/images/projects/MOBILE-STORE-Layout3.png';
import mobileStore4 from '@/shared/assets/images/projects/MOBILE-STORE-Layout4.png';
import mobileStore5 from '@/shared/assets/images/projects/MOBILE-STORE-Layout5.png';
import mobileStore6 from '@/shared/assets/images/projects/MOBILE-STORE-Layout6.png';
import mobileStore7 from '@/shared/assets/images/projects/MOBILE-STORE-Layout7.png';
import mobileStore8 from '@/shared/assets/images/projects/MOBILE-STORE-Layout8.png';
import sheetsLayout from '@/shared/assets/images/projects/Sheets Layout.png';

// Import technical project images - Industrial Equipment
import dripPan from '@/shared/assets/images/projects/Drip Pan Layout.png';
import pipeAssembly from '@/shared/assets/images/projects/Pipe Assembly.png';
import pressureTank200L from '@/shared/assets/images/projects/Pressure Tank 200L 1.5mmT.png';
import pressureTank500L from '@/shared/assets/images/projects/Pressure Tank 500L 3mm,5mm T.png';
import waterIntakeHose from '@/shared/assets/images/projects/Proposed Water Intake Hose.png';
import tankMixer12L from '@/shared/assets/images/projects/Tank Mixer 1.2L.png';
import tankMixer from '@/shared/assets/images/projects/Tank Mixer.png';
import waterIntake from '@/shared/assets/images/projects/Water Intake Pipe Assembly.png';

// Import technical project images - Miscellaneous
import radius480 from '@/shared/assets/images/projects/480mm Radius.png';
import sealingMould480Rev from '@/shared/assets/images/projects/480mm Sealing Mould revised.png';
import sealingMould480 from '@/shared/assets/images/projects/480mm Sealing Mould.png';
import radius585 from '@/shared/assets/images/projects/585mm Radius.png';
import sealingMould585Rev from '@/shared/assets/images/projects/585mm Sealing Mould revised.png';
import sealingMould585 from '@/shared/assets/images/projects/585mm Sealing Mould.png';

// Import technical project images - Ladder
import ladder from '@/shared/assets/images/projects/Ladder.png';

// Portfolio Projects
const portfolioProjects: Project[] = [
  {
    id: "portfolio-1",
    title: "JBY Website",
    category: ProjectCategory.WEB_DEVELOPMENT,
    type: ProjectType.WEB_APP,
    description: "Developed and maintained a website for JBY, implementing modern design principles and functionality.",
    technologies: ["Web Development", "HTML", "CSS", "JavaScript"],
    image: jbyWebsite,
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
    image: oldPortfolioVscode,
    gallery: [
      oldPortfolioCanva,
      oldPortfolioWix
    ],
    imageLabels: [
      "Old Portfolio Using VSCode",
      "Old Portfolio Using Canva",
      "Old Portfolio Using Wix"
    ],
    date: "2022",
    featured: true
  },
  {
    id: "portfolio-3",
    title: "Email Management",
    category: ProjectCategory.VIRTUAL_ASSISTANCE,
    type: ProjectType.VIRTUAL_ASSISTANT,
    description: "Comprehensive email management service including inbox organization, response handling, and priority management.",
    technologies: ["Gmail", "Email Management", "Communication"],
    image: emailManagement,
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
    image: calendarManagement,
    imageLabels: ["Calendar Management Interface"],
    date: "2023",
    featured: true
  },
  {
    id: "portfolio-5",
    title: "Trello Project Management",
    category: ProjectCategory.PROJECT_MANAGEMENT,
    type: ProjectType.MANAGEMENT,
    description: "Implementation of Trello for efficient project tracking and team collaboration.",
    technologies: ["Trello", "Project Management", "Task Organization"],
    image: trello,
    imageLabels: ["Trello Project Board"],
    date: "2023",
    featured: true
  },
  {
    id: "portfolio-6",
    title: "Virtual Assistant Masterclass",
    category: ProjectCategory.PROFESSIONAL_DEVELOPMENT,
    type: ProjectType.EDUCATION,
    description: "Comprehensive training program covering essential virtual assistant skills and business practices.",
    technologies: ["Virtual Assistance", "Professional Development", "Business Skills"],
    image: masterclass,
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
    image: surgeApprenticeship,
    imageLabels: ["Surge Apprenticeship Certificate"],
    date: "2023",
    featured: true
  },
  {
    id: "portfolio-8",
    title: "Surge Content Creation",
    category: ProjectCategory.CONTENT_CREATION,
    type: ProjectType.DESIGN,
    description: "Created engaging content for Surge's social media platforms and marketing materials.",
    technologies: ["Content Creation", "Social Media", "Marketing"],
    image: surgeContent,
    imageLabels: ["Surge Content Sample"],
    date: "2023",
    featured: true
  }
].sort((a, b) => {
  // Sort by category order
  const categoryOrder: Record<ProjectCategory, number> = {
    [ProjectCategory.ALL]: 0,
    [ProjectCategory.WEB_DEVELOPMENT]: 1,
    [ProjectCategory.VIRTUAL_ASSISTANCE]: 2,
    [ProjectCategory.PROJECT_MANAGEMENT]: 3,
    [ProjectCategory.PROFESSIONAL_DEVELOPMENT]: 4,
    [ProjectCategory.CONTENT_CREATION]: 5,
    [ProjectCategory.TECHNICAL_DESIGN]: 6,
    [ProjectCategory.COMMERCIAL]: 7,
    [ProjectCategory.INDUSTRIAL]: 8
  };
  return categoryOrder[a.category] - categoryOrder[b.category];
});

// Technical Projects
const technicalProjects: Project[] = [
  {
    id: "tech-kitchen-1",
    title: "Commercial Kitchen Hood System",
    category: ProjectCategory.TECHNICAL_DESIGN,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Complete design of a commercial kitchen hood ventilation system with multiple revisions and detailed specifications.",
    technologies: ["AutoCAD", "Sheet Metal Design", "Ventilation Systems", "Technical Documentation"],
    image: kitchenHoodFinal,
    gallery: [
      kitchenHoodRev,
      kitchenHoodRev2,
      hoodSpecs,
      hoodSpecsRev,
      hoodBends
    ],
    imageLabels: [
      "Final Kitchen Hood Design",
      "Hood Design Revision",
      "Hood Design Revision 2",
      "Hood Specifications",
      "Hood Specifications Revision",
      "Hood Bending Details"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-kitchen-2",
    title: "Dishwashing Area Ventilation",
    category: ProjectCategory.TECHNICAL_DESIGN,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Comprehensive ventilation system design for commercial dishwashing area, including damper system and detailed floor plan.",
    technologies: ["AutoCAD", "Sheet Metal Design", "Ventilation Systems", "Floor Planning"],
    image: dishwashingHoodFinal,
    gallery: [
      dishwashingHoodRev,
      dishwashingHoodDamper,
      dishwashingHoodFlrPlan
    ],
    imageLabels: [
      "Final Dishwashing Hood Design",
      "Hood Design Revision",
      "Damper System Detail",
      "Floor Plan Layout"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-kitchen-3",
    title: "Grillerie System Updates",
    category: ProjectCategory.TECHNICAL_DESIGN,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Detailed updates and modifications for a 1.3M Grillerie system, including multiple revision phases.",
    technologies: ["AutoCAD", "Equipment Design", "Commercial Kitchen", "System Modification"],
    image: grillerieUpdate1,
    gallery: [
      grillerieUpdate2,
      grillerieUpdate3
    ],
    imageLabels: [
      "Grillerie Update Phase 1",
      "Grillerie Update Phase 2",
      "Grillerie Update Phase 3"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-storage-1",
    title: "Commercial Kitchen Storage Solutions",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Comprehensive storage solutions for commercial kitchens, including specialized racks for various purposes.",
    technologies: ["AutoCAD", "Steel Fabrication", "Storage Design", "Kitchen Equipment"],
    image: kitchenDryingRack,
    gallery: [
      breadRackRev,
      breadRack,
      thawingRackClark,
      thawingRackClark4,
      thawingRack
    ],
    imageLabels: [
      "Kitchen Drying Rack",
      "Bread Rack Revised Design",
      "Standard Bread Rack",
      "Clark Thawing Rack",
      "Clark Thawing Rack Variation",
      "Standard Thawing Rack"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-storage-2",
    title: "Industrial Storage Systems",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Custom-designed industrial storage systems with various configurations and sizes.",
    technologies: ["AutoCAD", "Steel Fabrication", "Industrial Storage", "Custom Design"],
    image: rack1286,
    gallery: [
      rack1700,
      rack2000,
      tubeRack
    ],
    imageLabels: [
      "1286mm Storage Rack",
      "1700mm Storage System",
      "2000mm Storage System",
      "Specialized Tube Rack"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-industrial-1",
    title: "Conveyor System Design Series",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Comprehensive design of industrial conveyor systems with multiple configurations and variations.",
    technologies: ["AutoCAD", "Conveyor Design", "Industrial Equipment", "System Integration"],
    image: conveyorA2,
    gallery: [
      conveyorB1,
      conveyorB2,
      conveyorB3,
      conveyorC2
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
  {
    id: "tech-industrial-2",
    title: "Flight Assembly Systems",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of specialized flight assembly and catering truck loading systems with multiple iterations.",
    technologies: ["AutoCAD", "Assembly Design", "Industrial Equipment", "Loading Systems"],
    image: flightAssembly,
    gallery: [
      flightAssemblyV2,
      flightAssemblyV3,
      flightAssemblyV4
    ],
    imageLabels: [
      "Initial Flight Assembly System",
      "Version 2 Improvements",
      "Version 3 Refinements",
      "Final Design Implementation"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-steel-1",
    title: "Custom Steel Works Collection",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Comprehensive collection of custom steel works including various sizes of grilles, grates, and specialized doors.",
    technologies: ["AutoCAD", "Steel Fabrication", "Custom Design", "Metal Works"],
    image: steelGrates650,
    gallery: [
      steelGrates14,
      steelGrille325,
      steelGrille341,
      louverDoor,
      grilles
    ],
    imageLabels: [
      "650mm Steel Grates",
      "14-inch Steel Grates",
      "325mm Steel Grille",
      "341mm Steel Grille",
      "Full Louver Door",
      "Custom Grilles Collection"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-construction-1",
    title: "Commercial Construction Projects",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Comprehensive construction and installation projects including roofing, solar systems, and facility improvements.",
    technologies: ["AutoCAD", "Construction Planning", "Installation Design", "Facility Improvement"],
    image: proposedRoofing,
    gallery: [
      proposedRoofInstall2,
      proposedRepair,
      proposedSolar,
      proposedLinenRoom,
      concreteWall
    ],
    imageLabels: [
      "Proposed Roofing Design",
      "Roof Installation Details",
      "Repair and Ceiling Details",
      "Solar Inverter Installation",
      "Linen Room Layout",
      "Concrete Wall Specifications"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-mechanical-1",
    title: "Mechanical Components Collection",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of various precision mechanical components including gears, dies, flanges, and specialized industrial parts.",
    technologies: ["AutoCAD", "Mechanical Design", "Component Design", "Precision Engineering"],
    image: gear,
    gallery: [
      gearV2,
      die,
      flange,
      platform,
      backhoe,
      sheering
    ],
    imageLabels: [
      "Gear Design",
      "Gear Design Version 2",
      "Die Component",
      "Flange Design",
      "Platform Structure",
      "Backhoe Plate",
      "Sheering and Bending Details"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-store-1",
    title: "Mobile Store Layout Series",
    category: ProjectCategory.COMMERCIAL,
    type: ProjectType.TECHNICAL_DESIGN,
    description: "Comprehensive store layout design with multiple configurations, including detailed floor plans and spatial organization.",
    technologies: ["AutoCAD", "Store Planning", "Layout Design", "Space Optimization"],
    image: mobileStore1,
    gallery: [
      mobileStore2,
      mobileStore3,
      mobileStore4,
      mobileStore5,
      mobileStore6,
      mobileStore7,
      mobileStore8,
      boxLayout,
      sheetsLayout
    ],
    imageLabels: [
      "Main Store Layout",
      "Alternative Layout 2",
      "Alternative Layout 3",
      "Alternative Layout 4",
      "Alternative Layout 5",
      "Alternative Layout 6",
      "Alternative Layout 7",
      "Alternative Layout 8",
      "Box Layout Details",
      "Sheet Layout Plans"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-industrial-3",
    title: "Industrial Tank and Mixer Systems",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of industrial pressure tanks and mixing systems with various capacities and specifications.",
    technologies: ["AutoCAD", "Pressure Vessel Design", "Industrial Equipment", "System Design"],
    image: pressureTank500L,
    gallery: [
      pressureTank200L,
      tankMixer,
      tankMixer12L,
      waterIntake,
      waterIntakeHose,
      pipeAssembly,
      dripPan
    ],
    imageLabels: [
      "500L Pressure Tank",
      "200L Pressure Tank",
      "Tank Mixer System",
      "1.2L Tank Mixer",
      "Water Intake Assembly",
      "Water Intake Hose System",
      "Pipe Assembly Details",
      "Drip Pan Layout"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-industrial-4",
    title: "Precision Mould Design Series",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Comprehensive design of precision sealing moulds with multiple sizes and detailed specifications.",
    technologies: ["AutoCAD", "Mould Design", "Precision Engineering", "Industrial Manufacturing"],
    image: sealingMould480Rev,
    gallery: [
      sealingMould480,
      sealingMould585,
      sealingMould585Rev,
      radius480,
      radius585
    ],
    imageLabels: [
      "480mm Sealing Mould (Revised)",
      "480mm Sealing Mould",
      "585mm Sealing Mould",
      "585mm Sealing Mould (Revised)",
      "480mm Radius Details",
      "585mm Radius Details"
    ],
    date: "2023",
    featured: true
  },
  {
    id: "tech-industrial-5",
    title: "Industrial Access Ladder",
    category: ProjectCategory.INDUSTRIAL,
    type: ProjectType.INDUSTRIAL_DESIGN,
    description: "Design of an industrial-grade access ladder with safety features and compliance with industrial standards.",
    technologies: ["AutoCAD", "Industrial Design", "Safety Standards", "Structural Engineering"],
    image: ladder,
    date: "2023",
    featured: false
  }
];

// Portfolio Projects grouped by category
const combinedPortfolioProjects: Project[] = [...portfolioProjects];

// Technical Projects grouped by category
const combinedTechnicalProjects: Project[] = [...technicalProjects];

// Combine all projects
const allProjects: Project[] = [...portfolioProjects, ...technicalProjects];

// Default export for the Portfolio component
export const projects = allProjects;

// Helper functions
const getProjectById = (id: string): Project | undefined => {
  return allProjects.find(project => project.id === id);
};

const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return allProjects.filter(project => project.category === category);
};

const getFeaturedProjects = (): Project[] => {
  return allProjects.filter(project => project.featured);
};

const getTechnicalProjects = (): Project[] => {
  return technicalProjects;
};

const getPortfolioProjects = (): Project[] => {
  return portfolioProjects;
};

// Export everything together
export {
  combinedPortfolioProjects,
  combinedTechnicalProjects, getFeaturedProjects, getPortfolioProjects, getProjectById,
  getProjectsByCategory, getTechnicalProjects, portfolioProjects,
  technicalProjects
};
