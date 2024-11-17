export const aboutData = {
  title: 'About Me',
  description: 'As a versatile professional with over 13 years of experience, I blend technical expertise with creative problem-solving. My journey spans AutoCAD design, web development, and virtual assistance, enabling me to deliver comprehensive solutions that drive business growth and efficiency.',
  personalInfo: [
    { label: 'Birthday', value: '18 June 1987', icon: 'calendar' },
    { label: 'Age', value: `${new Date().getFullYear() - 1987}`, icon: 'calendar' },
    { label: 'Website', value: 'va-ralphbserrano.github.io', icon: 'globe', href: 'https://va-ralphbserrano.github.io' },
    { label: 'Email', value: 'ralph.b.serrano@gmail.com', icon: 'mail', href: 'mailto:ralph.b.serrano@gmail.com' },
    { label: 'Phone', value: '+63 995 846 2469', icon: 'phone', href: 'tel:+639958462469' },
    { 
      label: 'Location', 
      value: 'Muntinlupa City, Philippines', 
      icon: 'location',
      href: 'https://www.google.com/maps/place/Muntinlupa,+Metro+Manila,+Philippines/@14.4079323,121.0107124,13z'
    },
    { label: 'Freelance', value: 'Available', icon: 'status' }
  ],
  skills: [
    { name: 'AutoCAD Design', percentage: 95, color: 'from-blue-500 to-blue-600' },
    { name: 'Business Administration', percentage: 90, color: 'from-purple-500 to-purple-600' },
    { name: 'Web Design', percentage: 85, color: 'from-pink-500 to-pink-600' },
    { name: 'Video Editing', percentage: 80, color: 'from-green-500 to-green-600' },
    { name: 'Web Development', percentage: 75, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Project Management', percentage: 85, color: 'from-red-500 to-red-600' }
  ],
  education: [
    {
      title: "Masterclass Virtual Assistant Course",
      school: "Surge Freelancing Marketplace",
      year: "2024",
      description: "Earned a Gold Certificate of Completion and gained essential skills for virtual assistance."
    },
    {
      title: "Advance Diploma in Gaming and Animation Technology",
      school: "Informatics College Northgate",
      year: "2012 - 2013",
      description: "Gained a solid foundation in game design principles, animation techniques, and digital media production."
    },
    {
      title: "Bachelor of Science in Electronics and Communications Engineering",
      school: "Mapúa Institute of Technology",
      year: "2004 - 2005",
      description: "Developed a comprehensive understanding of electronic systems, telecommunications, and circuit design principles."
    }
  ],
  experience: [
    {
      title: "Executive Assistant Apprenticeship Program",
      company: "Surge Freelancing Marketplace",
      year: "2024",
      description: "Completed an intensive program focused on developing essential skills for virtual assistance, including project management, communication, and productivity tools."
    },
    {
      title: "AutoCAD Designer & Office Administrator",
      company: "JBY Industrial Supply and Services",
      year: "2011 - 2020",
      description: "Led multiple AutoCAD design projects and streamlined office workflows, resulting in a 25% increase in operational efficiency and improved client satisfaction."
    },
    {
      title: "Owner & Manager",
      company: "REHUB Internet Café",
      year: "2007 - 2011",
      description: "Successfully managed all aspects of business operations, from customer service to technical maintenance, while maintaining high customer satisfaction rates."
    }
  ],
  tools: {
    'Design & Media': [
      { name: 'AutoCAD', icon: 'pencilRuler' },
      { name: 'Autodesk Inventor', icon: 'autodesk' },
      { name: 'Adobe Photoshop', icon: 'photoshop' },
      { name: 'Adobe Premiere Pro', icon: 'premiere' },
      { name: 'DaVinci Resolve', icon: 'video' },
      { name: 'Canva', icon: 'canva' },
      { name: 'Figma', icon: 'figma' }
    ],
    'Development': [
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'HTML/CSS', icon: 'html' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' }
    ],
    'Productivity': [
      { name: 'Microsoft Office', icon: 'microsoft' },
      { name: 'Google Workspace', icon: 'google' },
      { name: 'Slack', icon: 'slack' },
      { name: 'Trello', icon: 'trello' },
      { name: 'Asana', icon: 'asana' },
      { name: 'Notion', icon: 'notion' }
    ]
  }
} as const;

export type AboutData = typeof aboutData;
