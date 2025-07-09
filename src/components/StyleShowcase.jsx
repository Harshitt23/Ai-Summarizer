import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import StatusBadge from './StatusBadge';
import FloatingActionButton from './FloatingActionButton';
import ProgressBar from './ProgressBar';
import ModernCard from './ModernCard';

const StyleShowcase = () => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-4">
          Style Showcase
        </h2>
        <p className="text-lg text-gray-600 font-inter">
          Explore our enhanced styling options and components
        </p>
      </div>

      {/* Button Showcase */}
      <ModernCard variant="gradient" className="text-center">
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-gray-800">Button Variations</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="primary_btn">Primary Button</button>
          <button className="accent_btn">Accent Button</button>
          <button className="ghost_btn">Ghost Button</button>
          <button className="black_btn">Classic Button</button>
        </div>
      </ModernCard>

      {/* Card Variations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModernCard variant="default">
          <h4 className="text-lg font-poppins font-semibold mb-3">Default Card</h4>
          <p className="text-gray-600 font-inter">Clean and modern design with subtle shadows.</p>
        </ModernCard>
        
        <ModernCard variant="glass">
          <h4 className="text-lg font-poppins font-semibold mb-3">Glass Effect</h4>
          <p className="text-gray-600 font-inter">Frosted glass appearance with backdrop blur.</p>
        </ModernCard>
        
        <ModernCard variant="neon">
          <h4 className="text-lg font-poppins font-semibold mb-3">Neon Glow</h4>
          <p className="text-gray-600 font-inter">Glowing border effect with primary colors.</p>
        </ModernCard>
      </div>

      {/* Loading States */}
      <ModernCard>
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Loading States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <LoadingSpinner size="lg" variant="primary" text="Processing..." />
          </div>
          <div className="text-center">
            <LoadingSpinner size="lg" variant="accent" text="Analyzing..." />
          </div>
          <div className="text-center">
            <div className="loading_shimmer h-8 w-32 rounded-lg mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Shimmer Effect</p>
          </div>
        </div>
      </ModernCard>

      {/* Progress Bars */}
      <ModernCard>
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Progress Indicators</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Primary Progress</label>
            <ProgressBar progress={progress} variant="primary" showPercentage={true} />
          </div>
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Accent Progress</label>
            <ProgressBar progress={75} variant="accent" size="lg" />
          </div>
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Success Progress</label>
            <ProgressBar progress={90} variant="success" />
          </div>
        </div>
      </ModernCard>

      {/* Status Badges */}
      <ModernCard>
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Status Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusBadge status="success" message="Article summarized successfully!" />
          <StatusBadge status="error" message="Failed to process article" />
          <StatusBadge status="warning" message="Article is quite long" />
          <StatusBadge status="info" message="Processing your request..." />
        </div>
      </ModernCard>

      {/* Floating Action Buttons */}
      <ModernCard>
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Floating Actions</h3>
        <div className="flex justify-center gap-8">
          <FloatingActionButton 
            icon="+" 
            variant="primary" 
            tooltip="Add new article"
            onClick={() => console.log('Add clicked')}
          />
          <FloatingActionButton 
            icon="⚡" 
            variant="accent" 
            tooltip="Quick summarize"
            onClick={() => console.log('Quick summarize clicked')}
          />
          <FloatingActionButton 
            icon="📋" 
            variant="secondary" 
            tooltip="Copy to clipboard"
            onClick={() => console.log('Copy clicked')}
          />
        </div>
      </ModernCard>

      {/* Text Effects */}
      <ModernCard>
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Text Effects</h3>
        <div className="space-y-4 text-center">
          <h4 className="text-2xl gradient_text_animated font-bold">Animated Gradient Text</h4>
          <h4 className="text-2xl text_glow font-bold">Glowing Text Effect</h4>
          <h4 className="text-2xl text_shadow font-bold">Text with Shadow</h4>
          <div className="typewriter_text text-xl font-mono">Typewriter Effect</div>
        </div>
      </ModernCard>

      {/* Background Patterns */}
      <ModernCard className="mesh_bg">
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center text-white">Mesh Background</h3>
        <p className="text-center text-white/90 font-inter">
          Beautiful gradient mesh background pattern
        </p>
      </ModernCard>

      <ModernCard className="gradient_bg">
        <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Gradient Background</h3>
        <p className="text-center text-gray-700 font-inter">
          Subtle gradient background with primary and accent colors
        </p>
      </ModernCard>
    </div>
  );
};

export default StyleShowcase; 