import React from 'react'
import './AnimatedBackground.css'

export default function AnimatedBackground() {
  return (
    <div className="animated-background">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
        <div className="shape shape-7"></div>
        
        {/* Geometric shapes */}
        <div className="geometric-shape triangle"></div>
        <div className="geometric-shape square"></div>
        <div className="geometric-shape hexagon"></div>
        
        {/* Robot-themed elements */}
        <div className="robot-eye"></div>
        <div className="robot-eye"></div>
        <div className="circuit-board"></div>
        <div className="robot-arm"></div>
        <div className="tech-circle"></div>
        
        {/* Floating particles */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        
        {/* Wave effects */}
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  )
} 