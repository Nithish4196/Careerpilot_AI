import React, { useRef, useEffect, useState } from 'react';
import ProfessionalTemplate from './Templates/ProfessionalTemplate';
import ModernTemplate from './Templates/ModernTemplate';
import CreativeTemplate from './Templates/CreativeTemplate';

export default function ResumeCanvas({ data }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Auto-scale the canvas to fit the container
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        // A4 paper is 210mm wide. We assume roughly 794px for standard 96dpi display.
        const containerWidth = entry.contentRect.width;
        // Add some padding to the scale calculation so it doesn't touch the edges
        const availableWidth = containerWidth - 64; 
        
        // 794 is approx A4 width in pixels
        const newScale = Math.min(availableWidth / 794, 1); 
        setScale(newScale);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const renderTemplate = () => {
    switch (data.template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'professional':
      default:
        return <ProfessionalTemplate data={data} />;
    }
  };

  return (
    <div 
      className="resume-canvas-pane" 
      ref={containerRef}
    >
      <div 
        className="resume-paper"
        style={{ transform: `scale(${scale})` }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
