import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AlgaeCell {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  type: number; // Different algae cell types (1-4)
}

const FloatingAlgaeCells = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cells = useRef<AlgaeCell[]>([]);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const activeTooltipId = useRef<number | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Algae cell info for tooltips
  const algaeInfo = [
    { name: "Chlorella", fact: "Contains 50-60% protein and all essential amino acids" },
    { name: "Spirulina", fact: "One of the most nutrient-dense foods on the planet" },
    { name: "Haematococcus", fact: "Produces astaxanthin, a powerful antioxidant" },
    { name: "Dunaliella", fact: "Thrives in extremely salty environments" }
  ];
  
  const createCells = () => {
    const newCells: AlgaeCell[] = [];
    const cellCount = 6; // Number of floating cells
    
    for (let i = 0; i < cellCount; i++) {
      newCells.push({
        id: i,
        x: Math.random() * 80 + 10, // 10-90% of container width
        y: Math.random() * 70 + 15, // 15-85% of container height
        size: Math.random() * 60 + 40, // 40-100px
        rotate: Math.random() * 360, // Random initial rotation
        delay: Math.random() * 2, // Random delay
        duration: Math.random() * 10 + 15, // 15-25s for full animation cycle
        type: Math.floor(Math.random() * 4) + 1 // 1-4 cell types
      });
    }
    
    cells.current = newCells;
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    cells.current.forEach((cell, index) => {
      const cellElement = document.getElementById(`algae-cell-${cell.id}`);
      if (!cellElement) return;
      
      const cellRect = cellElement.getBoundingClientRect();
      const cellCenterX = cellRect.left + cellRect.width / 2 - rect.left;
      const cellCenterY = cellRect.top + cellRect.height / 2 - rect.top;
      
      const dx = mouseX - cellCenterX;
      const dy = mouseY - cellCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        // Move away from cursor
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 5;
        
        const moveX = Math.cos(angle) * force;
        const moveY = Math.sin(angle) * force;
        
        cellElement.style.transform = `translate(${-moveX}px, ${-moveY}px) rotate(${cell.rotate}deg)`;
      } else {
        cellElement.style.transform = `rotate(${cell.rotate}deg)`;
      }
    });
  };
  
  const showTooltip = (cell: AlgaeCell) => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    
    tooltipTimeout.current = setTimeout(() => {
      if (!containerRef.current) return;
      
      activeTooltipId.current = cell.id;
      
      if (!tooltipRef.current) {
        tooltipRef.current = document.createElement('div');
        tooltipRef.current.className = 'algae-tooltip';
        containerRef.current.appendChild(tooltipRef.current);
      }
      
      const cellElement = document.getElementById(`algae-cell-${cell.id}`);
      if (!cellElement || !tooltipRef.current) return;
      
      const cellRect = cellElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Position tooltip above the cell
      const cellInfo = algaeInfo[cell.type - 1];
      tooltipRef.current.innerHTML = `
        <strong>${cellInfo.name}</strong>
        <p>${cellInfo.fact}</p>
      `;
      
      tooltipRef.current.style.left = `${cellRect.left - containerRect.left + cellRect.width / 2}px`;
      tooltipRef.current.style.top = `${cellRect.top - containerRect.top - 10}px`;
      tooltipRef.current.style.opacity = '1';
      tooltipRef.current.style.transform = 'translateY(-100%) translateX(-50%)';
    }, 2000); // 2 seconds hover
  };
  
  const hideTooltip = () => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
      activeTooltipId.current = null;
    }
  };
  
  useEffect(() => {
    createCells();
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      
      // Set up hover listeners for all cells
      cells.current.forEach(cell => {
        const element = document.getElementById(`algae-cell-${cell.id}`);
        if (element) {
          element.addEventListener('mouseenter', () => showTooltip(cell));
          element.addEventListener('mouseleave', hideTooltip);
        }
      });
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        
        // Clean up hover listeners
        cells.current.forEach(cell => {
          const element = document.getElementById(`algae-cell-${cell.id}`);
          if (element) {
            element.removeEventListener('mouseenter', () => showTooltip(cell));
            element.removeEventListener('mouseleave', hideTooltip);
          }
        });
      }
      
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
      
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {cells.current.map((cell) => (
        <motion.div
          key={cell.id}
          id={`algae-cell-${cell.id}`}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
          }}
          initial={{ rotate: cell.rotate }}
          animate={{ 
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            rotate: [cell.rotate, cell.rotate + 30, cell.rotate - 30, cell.rotate]
          }}
          transition={{ 
            repeat: Infinity,
            duration: cell.duration,
            delay: cell.delay,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full relative">
            {cell.type === 1 && (
              // Chlorella - circular cell
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#38B09D]/60 to-[#80DEEA]/80 backdrop-blur-sm border border-white/30 shadow-lg"></div>
            )}
            {cell.type === 2 && (
              // Spirulina - spiral-shaped
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00796B]/60 to-[#B2DFDB]/80 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-white/70">
                  <path d="M50,20 Q70,30 60,50 T50,80" stroke="currentColor" fill="none" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </div>
            )}
            {cell.type === 3 && (
              // Haematococcus - reddish tint
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#B71C1C]/40 to-[#80DEEA]/60 backdrop-blur-sm border border-white/30 shadow-lg"></div>
            )}
            {cell.type === 4 && (
              // Dunaliella - irregular shape
              <div className="w-full h-full rounded-[40%_30%_50%_30%] bg-gradient-to-br from-[#388E3C]/60 to-[#C8E6C9]/80 backdrop-blur-sm border border-white/30 shadow-lg"></div>
            )}
          </div>
        </motion.div>
      ))}
      
      {/* Styles moved to index.css */}
    </div>
  );
};

export default FloatingAlgaeCells;