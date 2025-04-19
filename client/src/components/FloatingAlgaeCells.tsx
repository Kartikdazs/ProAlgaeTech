import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface TooltipData {
  id: number;
  x: number;
  y: number;
  content: {
    name: string;
    fact: string;
    applications: string;
  };
}

const FloatingAlgaeCells = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<TooltipData | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
  
  // Enhanced algae cell info for tooltips
  const algaeInfo = [
    { 
      name: "Chlorella", 
      fact: "Contains 50-60% protein and all essential amino acids", 
      applications: "Used in nutrition supplements, animal feed, and biofuel production"
    },
    { 
      name: "Spirulina", 
      fact: "One of the most nutrient-dense foods on the planet", 
      applications: "Popular in health foods, supplements, and cosmetics"
    },
    { 
      name: "Haematococcus", 
      fact: "Produces astaxanthin, a powerful antioxidant", 
      applications: "Valued in aquaculture, nutraceuticals, and natural coloring"
    },
    { 
      name: "Dunaliella", 
      fact: "Thrives in extremely salty environments", 
      applications: "Source of beta-carotene and glycerol for biotechnology"
    }
  ];
  
  // Create cells immediately on component definition
  // instead of waiting for useEffect to run
  const generateCells = (): AlgaeCell[] => {
    const newCells: AlgaeCell[] = [];
    const cellCount = 8; // Increased number of floating cells
    
    for (let i = 0; i < cellCount; i++) {
      newCells.push({
        id: i,
        x: Math.random() * 80 + 10, // 10-90% of container width
        y: Math.random() * 70 + 15, // 15-85% of container height
        size: Math.random() * 60 + 40, // 40-100px
        rotate: Math.random() * 360, // Random initial rotation
        delay: Math.random() * 0.5, // Reduced delay for faster initial appearance
        duration: Math.random() * 10 + 15, // 15-25s for full animation cycle
        type: Math.floor(Math.random() * 4) + 1 // 1-4 cell types
      });
    }
    
    return newCells;
  };
  
  // Initialize cells immediately
  const cells = useRef<AlgaeCell[]>(generateCells());
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Apply interactive movement to cells
    cells.current.forEach((cell) => {
      const cellElement = document.getElementById(`algae-cell-${cell.id}`);
      if (!cellElement) return;
      
      const cellRect = cellElement.getBoundingClientRect();
      const cellCenterX = cellRect.left + cellRect.width / 2 - rect.left;
      const cellCenterY = cellRect.top + cellRect.height / 2 - rect.top;
      
      const dx = mouseX - cellCenterX;
      const dy = mouseY - cellCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) { // Increased interaction radius
        // Move away from cursor with subtle acceleration
        const angle = Math.atan2(dy, dx);
        const force = Math.min((150 - distance) / 4, 20); // Cap maximum force
        
        const moveX = Math.cos(angle) * force;
        const moveY = Math.sin(angle) * force;
        
        // Add subtle rotation when moved
        const newRotation = cell.rotate + (dx > 0 ? 5 : -5);
        
        // Apply transform with smooth transition
        cellElement.style.transition = 'transform 0.3s ease-out';
        cellElement.style.transform = `translate(${-moveX}px, ${-moveY}px) rotate(${newRotation}deg)`;
        
        // Add subtle scale effect when cell is very close to cursor
        if (distance < 50) {
          cellElement.style.transform += ' scale(1.1)';
        }
      } else {
        // Reset to original position with slight delay
        cellElement.style.transition = 'transform 0.8s ease-out';
        cellElement.style.transform = `rotate(${cell.rotate}deg)`;
      }
    });
  };
  
  const handleMouseEnter = (cell: AlgaeCell) => {
    // Clear any existing timeout
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    
    setHoveredCellId(cell.id);
    
    // Set hover effect immediately
    const cellElement = document.getElementById(`algae-cell-${cell.id}`);
    if (cellElement) {
      cellElement.classList.add('cell-hover');
    }
    
    // Show tooltip after short delay
    tooltipTimeout.current = setTimeout(() => {
      if (!containerRef.current) return;
      
      const cellElement = document.getElementById(`algae-cell-${cell.id}`);
      if (!cellElement) return;
      
      const cellRect = cellElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const tooltipX = cellRect.left - containerRect.left + cellRect.width / 2;
      const tooltipY = cellRect.top - containerRect.top - 10;
      
      // Set tooltip content and position
      setActiveTooltip({
        id: cell.id,
        x: tooltipX,
        y: tooltipY,
        content: algaeInfo[cell.type - 1]
      });
      
    }, 600); // Reduced delay to 600ms for better usability
  };
  
  const handleMouseLeave = (cell: AlgaeCell) => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    
    setHoveredCellId(null);
    
    // Remove hover effect
    const cellElement = document.getElementById(`algae-cell-${cell.id}`);
    if (cellElement) {
      cellElement.classList.remove('cell-hover');
    }
    
    // Hide tooltip with slight delay for better UX
    setTimeout(() => {
      if (activeTooltip?.id === cell.id) {
        setActiveTooltip(null);
      }
    }, 100);
  };
  
  // Set up event listeners when component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
    };
  }, []);
  
  // Add custom cell glow based on type
  const getCellGlow = (type: number): string => {
    switch (type) {
      case 1: return 'algae-glow-green';
      case 2: return 'algae-glow-teal';
      case 3: return 'algae-glow-red';
      case 4: return 'algae-glow-forest';
      default: return '';
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {/* Floating cells */}
      {cells.current.map((cell) => (
        <motion.div
          key={cell.id}
          id={`algae-cell-${cell.id}`}
          className={`absolute pointer-events-auto cursor-pointer ${getCellGlow(cell.type)}`}
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
          }}
          initial={{ rotate: cell.rotate, scale: 0 }}
          animate={{ 
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            rotate: [cell.rotate, cell.rotate + 30, cell.rotate - 30, cell.rotate],
            scale: 1
          }}
          transition={{ 
            repeat: Infinity,
            duration: cell.duration,
            delay: cell.delay,
            ease: "easeInOut",
            scale: { duration: 0.5, delay: cell.delay }
          }}
          onMouseEnter={() => handleMouseEnter(cell)}
          onMouseLeave={() => handleMouseLeave(cell)}
        >
          <div className={`w-full h-full relative transition-all duration-300 ${hoveredCellId === cell.id ? 'scale-110' : ''}`}>
            {/* Cell type 1: Chlorella - circular cell with inner details */}
            {cell.type === 1 && (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00695C]/60 to-[#26A69A]/80 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center overflow-hidden">
                <div className="absolute w-1/2 h-1/2 rounded-full bg-white/20 top-1/4 left-1/4"></div>
                <div className="absolute w-1/4 h-1/4 rounded-full bg-white/40 bottom-1/4 right-1/4"></div>
              </div>
            )}
            
            {/* Cell type 2: Spirulina - spiral-shaped */}
            {cell.type === 2 && (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#004D40]/60 to-[#4DB6AC]/80 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center overflow-hidden">
                <motion.svg 
                  viewBox="0 0 100 100" 
                  className="w-3/4 h-3/4 text-white/70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M50,20 Q70,30 60,50 T50,80" stroke="currentColor" fill="none" strokeWidth="8" strokeLinecap="round" />
                </motion.svg>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#004D40]/40 to-transparent"></div>
              </div>
            )}
            
            {/* Cell type 3: Haematococcus - reddish tint with cell details */}
            {cell.type === 3 && (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#880E4F]/40 to-[#26A69A]/60 backdrop-blur-sm border border-white/30 shadow-lg overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-[#880E4F]/20"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
                <div className="absolute w-3/5 h-3/5 rounded-full bg-[#880E4F]/30 top-1/5 left-1/5"></div>
              </div>
            )}
            
            {/* Cell type 4: Dunaliella - irregular shape with inner motion */}
            {cell.type === 4 && (
              <div className="w-full h-full rounded-[40%_30%_50%_30%] bg-gradient-to-br from-[#1B5E20]/60 to-[#81C784]/80 backdrop-blur-sm border border-white/30 shadow-lg overflow-hidden">
                <motion.div 
                  className="absolute inset-0 rounded-[40%_30%_50%_30%] bg-gradient-to-br from-[#1B5E20]/0 to-[#1B5E20]/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="absolute w-1/2 h-1/2 rounded-full bg-white/10 top-1/4 left-1/4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
              </div>
            )}
            
            {/* Info icon indicator that appears on hover */}
            <motion.div 
              className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-[#006064] text-xs font-bold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: hoveredCellId === cell.id ? 1 : 0,
                scale: hoveredCellId === cell.id ? 1 : 0,
                y: hoveredCellId === cell.id ? [0, -3, 0] : 0
              }}
              transition={{ 
                duration: 0.3,
                y: { repeat: Infinity, duration: 1.5 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      {/* Interactive tooltip with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {activeTooltip && (
          <motion.div 
            className="algae-tooltip absolute z-30 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-[#004D40]/30 pointer-events-none max-w-xs"
            style={{ 
              left: activeTooltip.x,
              top: activeTooltip.y
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-[#004D40] font-montserrat font-bold text-lg mb-1">{activeTooltip.content.name}</h4>
            <p className="text-[#00695C] text-sm mb-2">{activeTooltip.content.fact}</p>
            <div className="text-xs text-[#00796B]/80 italic">{activeTooltip.content.applications}</div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 border-r border-b border-[#004D40]/30 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingAlgaeCells;