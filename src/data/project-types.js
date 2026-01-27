/**
 * Project Types and Templates Database
 * Defines categories and template projects
 */

export const PROJECT_TEMPLATES = [
  // IoT Projects
  {
    title: 'Smart Plant Watering System',
    description: 'Automatically water plants based on soil moisture levels with smartphone notifications',
    category: 'IoT',
    skillLevel: 'beginner',
    estimatedCost: { min: 30, max: 50 },
    estimatedTime: '4-6 hours',
    features: ['Automatic watering', 'Soil monitoring', 'WiFi notifications'],
    tags: ['arduino', 'sensor', 'automation', 'wifi'],
    popularity: 9,
    variations: [
      {
        title: 'Smart Garden Irrigation System',
        description: 'Multi-zone irrigation with weather API integration',
        features: ['Multiple zones', 'Weather-based scheduling', 'Mobile app control']
      }
    ]
  },
  {
    title: 'WiFi Weather Station',
    description: 'Monitor temperature, humidity, and pressure with cloud data logging',
    category: 'IoT',
    skillLevel: 'intermediate',
    estimatedCost: { min: 35, max: 55 },
    estimatedTime: '6-8 hours',
    features: ['Multiple sensors', 'Web dashboard', 'Data logging'],
    tags: ['esp32', 'sensor', 'wifi', 'cloud'],
    popularity: 8
  },
  {
    title: 'Smart Door Lock',
    description: 'Remote-controlled door lock with PIN pad and smartphone access',
    category: 'IoT',
    skillLevel: 'advanced',
    estimatedCost: { min: 60, max: 90 },
    estimatedTime: '10-15 hours',
    features: ['Remote control', 'PIN authentication', 'Activity logging'],
    tags: ['esp32', 'servo', 'wifi', 'security'],
    popularity: 7
  },

  // Robotics Projects
  {
    title: 'Line Following Robot',
    description: 'Autonomous robot that follows a black line on white surface',
    category: 'Robotics',
    skillLevel: 'beginner',
    estimatedCost: { min: 40, max: 60 },
    estimatedTime: '6-8 hours',
    features: ['Autonomous navigation', 'IR sensors', 'Speed control'],
    tags: ['arduino', 'motor', 'sensor', 'autonomous'],
    popularity: 10
  },
  {
    title: 'Obstacle Avoiding Robot',
    description: 'Robot car that navigates around obstacles using ultrasonic sensors',
    category: 'Robotics',
    skillLevel: 'intermediate',
    estimatedCost: { min: 50, max: 75 },
    estimatedTime: '8-10 hours',
    features: ['Obstacle detection', 'Autonomous navigation', 'Speed control'],
    tags: ['arduino', 'motor', 'ultrasonic', 'autonomous'],
    popularity: 9
  },
  {
    title: 'Robotic Arm',
    description: '4-DOF robotic arm with servo control and optional gripper',
    category: 'Robotics',
    skillLevel: 'advanced',
    estimatedCost: { min: 80, max: 120 },
    estimatedTime: '15-20 hours',
    features: ['4 degrees of freedom', 'Precise control', 'Object manipulation'],
    tags: ['arduino', 'servo', 'control', 'precision'],
    popularity: 8
  },

  // Audio Projects
  {
    title: 'LED Music Visualizer',
    description: 'Audio-reactive LED strip that visualizes music in real-time',
    category: 'Audio',
    skillLevel: 'intermediate',
    estimatedCost: { min: 35, max: 55 },
    estimatedTime: '4-6 hours',
    features: ['Real-time visualization', 'Multiple patterns', 'Adjustable sensitivity'],
    tags: ['arduino', 'led', 'microphone', 'realtime'],
    popularity: 9
  },
  {
    title: 'Bluetooth Speaker',
    description: 'Custom Bluetooth speaker with LED indicators and touch controls',
    category: 'Audio',
    skillLevel: 'intermediate',
    estimatedCost: { min: 45, max: 70 },
    estimatedTime: '8-10 hours',
    features: ['Bluetooth connectivity', 'Volume control', 'LED indicators'],
    tags: ['bluetooth', 'amplifier', 'speaker'],
    popularity: 7
  },
  {
    title: 'Voice-Activated Assistant',
    description: 'DIY voice assistant with offline speech recognition',
    category: 'Audio',
    skillLevel: 'advanced',
    estimatedCost: { min: 70, max: 100 },
    estimatedTime: '15-20 hours',
    features: ['Speech recognition', 'Voice synthesis', 'Home automation control'],
    tags: ['raspberry-pi', 'microphone', 'speaker', 'ai'],
    popularity: 6
  },

  // Display Projects
  {
    title: 'LED Matrix Display',
    description: 'Scrolling text and animations on 8x8 LED matrix',
    category: 'Display',
    skillLevel: 'beginner',
    estimatedCost: { min: 20, max: 35 },
    estimatedTime: '3-5 hours',
    features: ['Text scrolling', 'Custom animations', 'Brightness control'],
    tags: ['arduino', 'led', 'display'],
    popularity: 8
  },
  {
    title: 'Smart Mirror',
    description: 'Two-way mirror with embedded display showing time, weather, news',
    category: 'Display',
    skillLevel: 'advanced',
    estimatedCost: { min: 150, max: 250 },
    estimatedTime: '20-30 hours',
    features: ['Two-way mirror', 'Web dashboard', 'Voice control'],
    tags: ['raspberry-pi', 'display', 'wifi'],
    popularity: 7
  },
  {
    title: 'POV Display',
    description: 'Persistence of Vision display creating floating images',
    category: 'Display',
    skillLevel: 'intermediate',
    estimatedCost: { min: 30, max: 50 },
    estimatedTime: '6-8 hours',
    features: ['Spinning LED array', 'Custom patterns', 'High speed control'],
    tags: ['arduino', 'led', 'motor', 'realtime'],
    popularity: 6
  },

  // Automation Projects
  {
    title: 'Smart Light Controller',
    description: 'Voice and app-controlled lighting system with scheduling',
    category: 'Automation',
    skillLevel: 'intermediate',
    estimatedCost: { min: 35, max: 55 },
    estimatedTime: '5-7 hours',
    features: ['Remote control', 'Scheduling', 'Dimming'],
    tags: ['esp32', 'relay', 'wifi'],
    popularity: 8
  },
  {
    title: 'Garage Door Opener',
    description: 'Smartphone-controlled garage door with status monitoring',
    category: 'Automation',
    skillLevel: 'intermediate',
    estimatedCost: { min: 40, max: 60 },
    estimatedTime: '6-8 hours',
    features: ['Remote control', 'Open/close detection', 'Notifications'],
    tags: ['esp32', 'relay', 'sensor', 'wifi'],
    popularity: 7
  },
  {
    title: 'Pet Feeder',
    description: 'Automated pet feeder with portion control and scheduling',
    category: 'Automation',
    skillLevel: 'beginner',
    estimatedCost: { min: 35, max: 50 },
    estimatedTime: '5-7 hours',
    features: ['Scheduled feeding', 'Portion control', 'Low food alerts'],
    tags: ['arduino', 'servo', 'rtc'],
    popularity: 8
  },
  {
    title: 'Security System',
    description: 'Multi-sensor security system with camera and notifications',
    category: 'Automation',
    skillLevel: 'advanced',
    estimatedCost: { min: 100, max: 150 },
    estimatedTime: '15-20 hours',
    features: ['Motion detection', 'Camera streaming', 'SMS alerts'],
    tags: ['raspberry-pi', 'sensor', 'camera', 'wifi'],
    popularity: 7
  }
];

export const PROJECT_CATEGORIES = [
  {
    name: 'IoT',
    description: 'Internet-connected devices and smart home projects',
    difficulty: 'intermediate',
    popularity: 9
  },
  {
    name: 'Robotics',
    description: 'Moving robots, autonomous vehicles, and robotic systems',
    difficulty: 'intermediate',
    popularity: 8
  },
  {
    name: 'Audio',
    description: 'Sound projects including speakers, visualizers, and music',
    difficulty: 'intermediate',
    popularity: 7
  },
  {
    name: 'Display',
    description: 'LED projects, screens, and visual displays',
    difficulty: 'beginner',
    popularity: 8
  },
  {
    name: 'Automation',
    description: 'Home automation, control systems, and smart devices',
    difficulty: 'intermediate',
    popularity: 9
  }
];
