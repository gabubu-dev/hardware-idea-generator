/**
 * Components Database
 * Common hardware components with pricing and specifications
 */

export const COMPONENTS_DB = [
  // Microcontrollers
  {
    name: 'Arduino Uno R3',
    price: 25,
    categories: ['general', 'IoT', 'Robotics', 'Automation'],
    purpose: 'Main microcontroller board',
    specs: { voltage: '5V', pins: 14, memory: '32KB' }
  },
  {
    name: 'Arduino Nano',
    price: 8,
    categories: ['general', 'Display', 'Audio'],
    purpose: 'Compact microcontroller',
    specs: { voltage: '5V', pins: 14, memory: '32KB' }
  },
  {
    name: 'ESP32 DevKit',
    price: 10,
    categories: ['IoT', 'Automation'],
    purpose: 'WiFi/Bluetooth enabled microcontroller',
    specs: { voltage: '3.3V', wifi: true, bluetooth: true }
  },
  {
    name: 'ESP8266 NodeMCU',
    price: 7,
    categories: ['IoT'],
    purpose: 'Budget WiFi microcontroller',
    specs: { voltage: '3.3V', wifi: true }
  },
  {
    name: 'Raspberry Pi 4 (4GB)',
    price: 55,
    categories: ['IoT', 'Automation'],
    purpose: 'Single-board computer',
    specs: { cpu: 'Quad-core', ram: '4GB', os: 'Linux' }
  },
  {
    name: 'Raspberry Pi Zero W',
    price: 15,
    categories: ['IoT'],
    purpose: 'Compact Linux board with WiFi',
    specs: { cpu: 'Single-core', ram: '512MB', wifi: true }
  },

  // Sensors
  {
    name: 'DHT22 Temperature/Humidity Sensor',
    price: 5,
    categories: ['IoT', 'Automation'],
    purpose: 'Environmental monitoring',
    specs: { range: '-40 to 80°C', accuracy: '±0.5°C' }
  },
  {
    name: 'HC-SR04 Ultrasonic Sensor',
    price: 3,
    categories: ['Robotics', 'Automation'],
    purpose: 'Distance measurement',
    specs: { range: '2cm-4m', accuracy: '3mm' }
  },
  {
    name: 'PIR Motion Sensor',
    price: 3,
    categories: ['Automation', 'IoT'],
    purpose: 'Motion detection',
    specs: { range: '7m', angle: '120°' }
  },
  {
    name: 'BMP280 Pressure Sensor',
    price: 4,
    categories: ['IoT'],
    purpose: 'Atmospheric pressure measurement',
    specs: { range: '300-1100 hPa' }
  },
  {
    name: 'MQ-2 Gas Sensor',
    price: 4,
    categories: ['Automation', 'IoT'],
    purpose: 'Gas and smoke detection',
    specs: { gases: 'LPG, CO, CH4' }
  },
  {
    name: 'Microphone Module',
    price: 3,
    categories: ['Audio', 'IoT'],
    purpose: 'Sound detection and recording',
    specs: { sensitivity: 'adjustable' }
  },

  // Displays
  {
    name: '0.96" OLED Display (128x64)',
    price: 8,
    categories: ['Display', 'IoT'],
    purpose: 'Visual output',
    specs: { resolution: '128x64', interface: 'I2C' }
  },
  {
    name: '16x2 LCD Display',
    price: 5,
    categories: ['Display', 'general'],
    purpose: 'Text display',
    specs: { characters: '16x2', interface: 'I2C/Parallel' }
  },
  {
    name: '8x8 LED Matrix',
    price: 5,
    categories: ['Display'],
    purpose: 'LED array display',
    specs: { leds: 64, interface: 'SPI' }
  },
  {
    name: 'TFT LCD 2.4" Touchscreen',
    price: 15,
    categories: ['Display', 'IoT'],
    purpose: 'Color touchscreen display',
    specs: { resolution: '240x320', touch: true }
  },

  // LEDs and Lighting
  {
    name: 'WS2812B LED Strip (1m, 60 LEDs)',
    price: 12,
    categories: ['Display', 'Audio'],
    purpose: 'Addressable RGB lighting',
    specs: { leds: 60, voltage: '5V', addressable: true }
  },
  {
    name: '5mm LED Assortment (100pcs)',
    price: 5,
    categories: ['general', 'Display'],
    purpose: 'Basic LED indicators',
    specs: { colors: 'mixed', quantity: 100 }
  },

  // Motors and Actuators
  {
    name: 'DC Motor (3-6V)',
    price: 3,
    categories: ['Robotics', 'Automation'],
    purpose: 'Basic movement',
    specs: { voltage: '3-6V', rpm: '200' }
  },
  {
    name: 'Servo Motor SG90',
    price: 4,
    categories: ['Robotics', 'Automation'],
    purpose: 'Precise positioning',
    specs: { angle: '180°', torque: '1.8kg/cm' }
  },
  {
    name: 'Stepper Motor (28BYJ-48)',
    price: 5,
    categories: ['Robotics', 'Automation'],
    purpose: 'Precise stepping control',
    specs: { steps: 2048, voltage: '5V' }
  },
  {
    name: 'L298N Motor Driver',
    price: 5,
    categories: ['Robotics', 'Automation'],
    purpose: 'Motor speed and direction control',
    specs: { motors: 2, current: '2A' }
  },

  // Power
  {
    name: '9V Battery Holder',
    price: 2,
    categories: ['general'],
    purpose: 'Portable power supply',
    specs: { voltage: '9V', type: 'battery clip' }
  },
  {
    name: '5V 2A Power Supply',
    price: 8,
    categories: ['general', 'Display'],
    purpose: 'Wall power adapter',
    specs: { voltage: '5V', current: '2A' }
  },
  {
    name: 'LiPo Battery 3.7V 1000mAh',
    price: 10,
    categories: ['Robotics', 'IoT'],
    purpose: 'Rechargeable portable power',
    specs: { voltage: '3.7V', capacity: '1000mAh' }
  },

  // Audio
  {
    name: 'Mini Speaker 8Ω 0.5W',
    price: 2,
    categories: ['Audio'],
    purpose: 'Audio output',
    specs: { impedance: '8Ω', power: '0.5W' }
  },
  {
    name: 'PAM8403 Amplifier Module',
    price: 3,
    categories: ['Audio'],
    purpose: 'Audio amplification',
    specs: { power: '3W', channels: 2 }
  },

  // Communication
  {
    name: 'nRF24L01 RF Module',
    price: 4,
    categories: ['IoT', 'Robotics'],
    purpose: 'Wireless communication',
    specs: { range: '100m', frequency: '2.4GHz' }
  },
  {
    name: 'HC-05 Bluetooth Module',
    price: 6,
    categories: ['IoT', 'Robotics'],
    purpose: 'Bluetooth connectivity',
    specs: { range: '10m', version: 'Bluetooth 2.0' }
  },

  // Miscellaneous
  {
    name: 'Breadboard (830 points)',
    price: 5,
    categories: ['general'],
    purpose: 'Prototyping platform',
    specs: { points: 830, size: 'standard' }
  },
  {
    name: 'Jumper Wire Kit',
    price: 5,
    categories: ['general'],
    purpose: 'Connections',
    specs: { quantity: '120 pieces', types: 'M-M, M-F, F-F' }
  },
  {
    name: 'Resistor Kit (600pcs)',
    price: 8,
    categories: ['general'],
    purpose: 'Current limiting',
    specs: { range: '10Ω-1MΩ', quantity: 600 }
  },
  {
    name: 'Relay Module (5V)',
    price: 4,
    categories: ['Automation', 'IoT'],
    purpose: 'High-power switching',
    specs: { voltage: '5V', current: '10A' }
  },
  {
    name: 'Push Button Switches (20pcs)',
    price: 3,
    categories: ['general'],
    purpose: 'User input',
    specs: { quantity: 20, type: 'tactile' }
  },
  {
    name: 'Potentiometer 10KΩ (5pcs)',
    price: 3,
    categories: ['general', 'Audio'],
    purpose: 'Variable resistance',
    specs: { resistance: '10KΩ', quantity: 5 }
  },
  {
    name: 'MicroSD Card Module',
    price: 3,
    categories: ['IoT', 'Automation'],
    purpose: 'Data storage',
    specs: { interface: 'SPI', max: '32GB' }
  },
  {
    name: 'Camera Module (OV7670)',
    price: 8,
    categories: ['IoT', 'Automation'],
    purpose: 'Image capture',
    specs: { resolution: '640x480', interface: 'I2C' }
  },
  {
    name: 'Pi Camera Module V2',
    price: 25,
    categories: ['IoT', 'Automation'],
    purpose: 'High-quality imaging for Raspberry Pi',
    specs: { resolution: '8MP', video: '1080p' }
  }
];
