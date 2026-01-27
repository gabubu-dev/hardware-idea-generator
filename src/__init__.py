"""Hardware Idea Generator - AI-powered hardware product ideation tool."""

__version__ = "0.1.0"
__author__ = "gabubu-dev"

from .idea_generator import HardwareIdeaGenerator
from .models import HardwareIdea, Component

__all__ = ["HardwareIdeaGenerator", "HardwareIdea", "Component"]
