import React from 'react';

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'dark';
  fullWidth?: boolean;
}

export const GlitchButton: React.FC<GlitchButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative group overflow-hidden px-8 py-4 font-orbitron font-bold tracking-widest text-sm uppercase transition-all duration-300 clip-path-polygon";
  
  const variants = {
    primary: "bg-white text-black border border-white hover:bg-gray-200 hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]",
    secondary: "bg-gray-800/50 text-gray-400 border border-gray-600 hover:bg-gray-700 hover:text-white",
    danger: "bg-cyber-danger/10 text-cyber-danger border border-cyber-danger hover:bg-cyber-danger hover:text-black hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    dark: "bg-black text-white border border-black hover:bg-gray-800 hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.6)]"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-300 skew-x-12"></div>
    </button>
  );
};