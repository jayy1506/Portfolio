import React, { useState, useEffect, useRef } from 'react';
import { profileData } from '../../data/profile';
import { Cpu, Zap, Activity, Code2, Database, Brain, Terminal, Server } from 'lucide-react';

export function SkillsConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const containerRef = useRef(null);

  // Smooth orbit rotation loop
  useEffect(() => {
    let animId;
    let angle = 0;
    const loop = () => {
      angle += 0.003;
      setOrbitAngle(angle);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const skills = profileData.skillsConstellation;

  // Node position calculation on a 2.5D elliptical plane
  const nodes = skills.map((skill, index) => {
    const baseAngle = (index / skills.length) * Math.PI * 2;
    const currentAngle = baseAngle + orbitAngle;
    const rx = 240;
    const ry = 110;

    const x = Math.cos(currentAngle) * rx;
    const y = Math.sin(currentAngle) * ry;
    const zScale = 0.8 + (Math.sin(currentAngle) + 1) * 0.25;
    const opacity = 0.5 + (Math.sin(currentAngle) + 1) * 0.25;

    return {
      ...skill,
      px: x + 300,
      py: y + 190,
      scale: zScale,
      opacity,
    };
  });

  const activeConnections = new Set(hoveredSkill ? hoveredSkill.connections : []);

  return (
    <section id="skills" className="relative min-h-screen py-20 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span>TECHNICAL COMPETENCIES // NEURAL GRAPH & STACK</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-rajdhani font-bold text-white tracking-wide">
          SKILLS & SYSTEM ARCHITECTURE
        </h2>
        <p className="text-sm font-inter text-slate-400 max-w-xl mx-auto mt-2">
          Interactive neural knowledge cluster mapping language proficiencies, ML frameworks, and distributed cloud tools.
        </p>
      </div>

      {/* Interactive Constellation Canvas Frame */}
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl aspect-[16/10] glass-panel ambient-grid-bg rounded-2xl border border-white/[0.08] p-4 sm:p-6 shadow-2xl flex items-center justify-center overflow-hidden mb-12"
      >
        {/* Core Center Reactor Hub */}
        <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-indigo/40 animate-ping opacity-30" />
            <span className="absolute inset-1 rounded-full border border-cyan/60 animate-spin-slow" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan via-indigo to-emerald-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center justify-center text-[10px] font-mono font-bold text-dark-950">
              CORE
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 tracking-widest mt-1">AI / ML STACK</span>
        </div>

        {/* SVG Render for Synaptic Connectors & Orbiting Nodes */}
        <svg
          viewBox="0 0 600 380"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Synapse Lines */}
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find((n) => n.id === targetId);
              if (!targetNode || targetNode.id < node.id) return null;

              const isHighlighted =
                hoveredSkill &&
                (hoveredSkill.id === node.id ||
                  hoveredSkill.id === targetNode.id ||
                  (activeConnections.has(node.id) && activeConnections.has(targetNode.id)));

              return (
                <line
                  key={`${node.id}-${targetNode.id}`}
                  x1={node.px}
                  y1={node.py}
                  x2={targetNode.px}
                  y2={targetNode.py}
                  stroke={isHighlighted ? "#38bdf8" : "#818cf8"}
                  strokeWidth={isHighlighted ? 2.2 : 0.8}
                  strokeOpacity={isHighlighted ? 0.95 : 0.22}
                  strokeDasharray={isHighlighted ? "none" : "3,3"}
                  className="transition-all duration-300"
                />
              );
            })
          )}

          {/* Orbiting Skill Nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredSkill?.id === node.id;
            const isConnected = activeConnections.has(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${node.px}, ${node.py}) scale(${node.scale})`}
                className="cursor-pointer transition-transform duration-200"
                onMouseEnter={() => setHoveredSkill(node)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Node Outer Halo */}
                <circle
                  r={isHovered ? 26 : 20}
                  fill={isHovered ? "rgba(56, 189, 248, 0.25)" : isConnected ? "rgba(129, 140, 248, 0.2)" : "rgba(12, 17, 29, 0.85)"}
                  stroke={isHovered ? "#38bdf8" : isConnected ? "#818cf8" : "rgba(255, 255, 255, 0.2)"}
                  strokeWidth={isHovered ? 2.5 : 1.2}
                  className="transition-all duration-300"
                />

                {/* Inner Core Bullet */}
                <circle
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? "#38bdf8" : isConnected ? "#818cf8" : "#f8fafc"}
                />

                {/* Skill Label */}
                <text
                  y={34}
                  textAnchor="middle"
                  fill={isHovered ? "#38bdf8" : isConnected ? "#818cf8" : "#f1f5f9"}
                  fontSize="11"
                  fontFamily="Rajdhani, sans-serif"
                  fontWeight="600"
                  letterSpacing="0.05em"
                  className="select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Skill Diagnostic Pill */}
        <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between p-3 rounded-xl bg-dark-950/85 border border-white/10 backdrop-blur-md font-mono text-xs">
          {hoveredSkill ? (
            <>
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                <div>
                  <span className="text-white font-bold font-rajdhani text-base mr-2">{hoveredSkill.name}</span>
                  <span className="text-[11px] text-slate-400">[{hoveredSkill.category}]</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-slate-400 text-[11px]">PROFICIENCY INDEX:</span>
                <span className="text-cyan font-bold font-rajdhani text-base">{hoveredSkill.level}%</span>
              </div>
            </>
          ) : (
            <div className="w-full text-center text-slate-400 text-[11px] tracking-wider">
              HOVER ANY NODE TO INSPECT ARCHITECTURAL SYNAPSES & PROFICIENCY LEVELS
            </div>
          )}
        </div>
      </div>

      {/* Complete Categorized Technical Stack Matrix */}
      {profileData.technicalSkillsCategories && (
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {profileData.technicalSkillsCategories.map((group, gIdx) => (
            <div
              key={gIdx}
              className="glass-panel ambient-grid-bg p-6 rounded-xl border border-white/[0.08] hover:border-cyan/40 transition-all shadow-glass-panel"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                <h4 className="text-base font-rajdhani font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan" />
                  <span>{group.category}</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">{group.skills.length} TECHNOLOGIES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-cyan/50 hover:text-cyan transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
