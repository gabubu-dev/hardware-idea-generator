/**
 * Project Template Manager
 * Manages hardware project templates
 */

export class TemplateManager {
  constructor() {
    this.templates = this._loadTemplates();
  }

  /**
   * Get all available templates
   */
  getAll() {
    return this.templates;
  }

  /**
   * Get templates by category
   */
  getByCategory(category) {
    return this.templates.filter(t => t.category === category);
  }

  /**
   * Get template by ID
   */
  getById(id) {
    return this.templates.find(t => t.id === id);
  }

  /**
   * Get templates by skill level
   */
  getBySkillLevel(skillLevel) {
    return this.templates.filter(t => t.skillLevel === skillLevel);
  }

  /**
   * Create project from template
   */
  createFromTemplate(templateId, customizations = {}) {
    const template = this.getById(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    return {
      ...template,
      ...customizations,
      createdFrom: templateId,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Load all templates
   */
  _loadTemplates() {
    return [
      // Arduino Templates
      {
        id: 'arduino-blink',
        name: 'LED Blink',
        category: 'Display',
        platform: 'Arduino',
        skillLevel: 'beginner',
        description: 'Classic first Arduino project - blink an LED',
        files: {
          'sketch.ino': this._getArduinoBlinkCode(),
          'README.md': 'Simple LED blink project for Arduino beginners'
        },
        components: [
          { name: 'Arduino Uno', quantity: 1, cost: 25 },
          { name: 'LED', quantity: 1, cost: 0.5 },
          { name: '220Ω Resistor', quantity: 1, cost: 0.1 }
        ],
        estimatedCost: { min: 25, max: 30 },
        estimatedTime: '30 minutes'
      },
      
      // ESP32 IoT Template
      {
        id: 'esp32-weather',
        name: 'WiFi Weather Station',
        category: 'IoT',
        platform: 'ESP32',
        skillLevel: 'intermediate',
        description: 'Internet-connected weather station with cloud dashboard',
        files: {
          'main.ino': this._getESP32WeatherCode(),
          'config.h': this._getESP32ConfigCode(),
          'README.md': 'ESP32 weather station with WiFi connectivity'
        },
        components: [
          { name: 'ESP32', quantity: 1, cost: 10 },
          { name: 'DHT22 Temperature/Humidity Sensor', quantity: 1, cost: 5 },
          { name: 'BMP280 Pressure Sensor', quantity: 1, cost: 4 },
          { name: 'OLED Display', quantity: 1, cost: 8 }
        ],
        estimatedCost: { min: 30, max: 50 },
        estimatedTime: '4-6 hours'
      },

      // Raspberry Pi Template
      {
        id: 'rpi-camera',
        name: 'Smart Security Camera',
        category: 'Automation',
        platform: 'Raspberry Pi',
        skillLevel: 'intermediate',
        description: 'Motion-detecting security camera with cloud storage',
        files: {
          'camera.py': this._getRPiCameraCode(),
          'requirements.txt': 'opencv-python\npicamera\nrequests',
          'README.md': 'Raspberry Pi security camera with motion detection'
        },
        components: [
          { name: 'Raspberry Pi 4', quantity: 1, cost: 55 },
          { name: 'Pi Camera Module', quantity: 1, cost: 25 },
          { name: 'PIR Motion Sensor', quantity: 1, cost: 3 },
          { name: 'MicroSD Card 32GB', quantity: 1, cost: 10 }
        ],
        estimatedCost: { min: 90, max: 120 },
        estimatedTime: '6-8 hours'
      },

      // Robotics Template
      {
        id: 'robot-car',
        name: 'Obstacle-Avoiding Robot Car',
        category: 'Robotics',
        platform: 'Arduino',
        skillLevel: 'intermediate',
        description: 'Autonomous robot car that avoids obstacles using ultrasonic sensors',
        files: {
          'robot_car.ino': this._getRobotCarCode(),
          'README.md': 'Build an autonomous obstacle-avoiding robot car'
        },
        components: [
          { name: 'Arduino Uno', quantity: 1, cost: 25 },
          { name: 'Motor Driver L298N', quantity: 1, cost: 5 },
          { name: 'DC Motors', quantity: 4, cost: 12 },
          { name: 'Ultrasonic Sensor HC-SR04', quantity: 1, cost: 3 },
          { name: 'Robot Car Chassis', quantity: 1, cost: 15 },
          { name: '9V Battery Pack', quantity: 1, cost: 5 }
        ],
        estimatedCost: { min: 60, max: 80 },
        estimatedTime: '6-8 hours'
      },

      // Audio Template
      {
        id: 'music-visualizer',
        name: 'LED Music Visualizer',
        category: 'Audio',
        platform: 'Arduino',
        skillLevel: 'intermediate',
        description: 'Audio-reactive LED strip that visualizes music in real-time',
        files: {
          'visualizer.ino': this._getMusicVisualizerCode(),
          'README.md': 'Build a music-reactive LED visualizer'
        },
        components: [
          { name: 'Arduino Nano', quantity: 1, cost: 8 },
          { name: 'WS2812B LED Strip (1m)', quantity: 1, cost: 12 },
          { name: 'Microphone Module', quantity: 1, cost: 3 },
          { name: '5V Power Supply', quantity: 1, cost: 10 }
        ],
        estimatedCost: { min: 35, max: 50 },
        estimatedTime: '4-6 hours'
      },

      // Advanced PCB Template
      {
        id: 'custom-pcb-badge',
        name: 'Animated LED Badge',
        category: 'Display',
        platform: 'Custom PCB',
        skillLevel: 'advanced',
        description: 'Custom PCB badge with animated LED display and USB charging',
        files: {
          'firmware.ino': this._getLEDBadgeCode(),
          'schematic.txt': 'KiCad schematic reference',
          'README.md': 'Design and build a custom PCB LED badge'
        },
        components: [
          { name: 'ATtiny85', quantity: 1, cost: 2 },
          { name: '8x8 LED Matrix', quantity: 1, cost: 5 },
          { name: 'CR2032 Battery Holder', quantity: 1, cost: 1 },
          { name: 'Custom PCB', quantity: 1, cost: 10 }
        ],
        estimatedCost: { min: 20, max: 35 },
        estimatedTime: '10-15 hours'
      }
    ];
  }

  /**
   * Template code snippets
   */
  _getArduinoBlinkCode() {
    return `// Simple LED Blink
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`;
  }

  _getESP32WeatherCode() {
    return `#include <WiFi.h>
#include <DHT.h>
#include "config.h"

DHT dht(DHT_PIN, DHT22);

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  Serial.printf("Temp: %.1f°C, Humidity: %.1f%%\\n", temp, humidity);
  delay(10000);
}`;
  }

  _getESP32ConfigCode() {
    return `// WiFi Configuration
#define WIFI_SSID "your-wifi-name"
#define WIFI_PASSWORD "your-password"
#define DHT_PIN 4`;
  }

  _getRPiCameraCode() {
    return `#!/usr/bin/env python3
import picamera
import time
from datetime import datetime

camera = picamera.PiCamera()
camera.resolution = (1280, 720)

while True:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    camera.capture(f'capture_{timestamp}.jpg')
    time.sleep(60)`;
  }

  _getRobotCarCode() {
    return `#include <Servo.h>

// Motor pins
#define MOTOR_LEFT_FWD 5
#define MOTOR_LEFT_BWD 6
#define MOTOR_RIGHT_FWD 9
#define MOTOR_RIGHT_BWD 10

// Ultrasonic sensor
#define TRIG_PIN 7
#define ECHO_PIN 8

void setup() {
  pinMode(MOTOR_LEFT_FWD, OUTPUT);
  pinMode(MOTOR_LEFT_BWD, OUTPUT);
  pinMode(MOTOR_RIGHT_FWD, OUTPUT);
  pinMode(MOTOR_RIGHT_BWD, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  int distance = getDistance();
  
  if (distance < 20) {
    // Obstacle detected - turn
    turnRight();
    delay(500);
  } else {
    // Path clear - move forward
    moveForward();
  }
}

int getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2;
}

void moveForward() {
  digitalWrite(MOTOR_LEFT_FWD, HIGH);
  digitalWrite(MOTOR_RIGHT_FWD, HIGH);
}

void turnRight() {
  digitalWrite(MOTOR_LEFT_FWD, HIGH);
  digitalWrite(MOTOR_RIGHT_BWD, HIGH);
}`;
  }

  _getMusicVisualizerCode() {
    return `#include <FastLED.h>

#define LED_PIN 6
#define NUM_LEDS 60
#define MIC_PIN A0

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(50);
}

void loop() {
  int audio = analogRead(MIC_PIN);
  int brightness = map(audio, 0, 1023, 0, 255);
  
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CHSV(i * 4, 255, brightness);
  }
  
  FastLED.show();
  delay(10);
}`;
  }

  _getLEDBadgeCode() {
    return `#include <Adafruit_GFX.h>
#include <Max72xxPanel.h>

Max72xxPanel matrix = Max72xxPanel(CS_PIN, 1, 1);

void setup() {
  matrix.setIntensity(5);
}

void loop() {
  // Animate LED patterns
  for(int x = 0; x < 8; x++) {
    for(int y = 0; y < 8; y++) {
      matrix.drawPixel(x, y, HIGH);
      matrix.write();
      delay(50);
    }
  }
}`;
  }
}
