import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function CapabilitiesSection() {
  const [activeItem, setActiveItem] = useState(0);

  const capabilities = [
    {
      num: "01",
      title: "AI FULL STACK DEVELOPMENT",
      short: "End-to-end full stack web platforms integrated with large language models and semantic retrieval.",
      details: "Architecting resilient full-stack systems using React 19, FastAPI, Express 5, and MongoDB with structured schema validation, JWT auth, and Docker deployment.",
      tools: ["React 19", "FastAPI", "Express 5", "MongoDB", "Tailwind CSS", "Docker"]
    },
    {
      num: "02",
      title: "RAG PIPELINES & SEMANTIC LLM TUTORS",
      short: "Retrieval-Augmented Generation systems with embeddings, vector search, and dynamic routing.",
      details: "Building custom RAG engines with Gemini text-embedding-004, ChromaDB, Sentence-Transformers, and multi-key failover pools for grounded clinical & academic learning.",
      tools: ["Gemini API", "ChromaDB", "MiniLM", "Sentence-Transformers", "Vector Search"]
    },
    {
      num: "03",
      title: "BACKEND & HIGH-PERFORMANCE APIS",
      short: "Low-latency REST APIs, Redis rate limiting, and OpenAPI 3.0 documented microservices.",
      details: "Developing asynchronous backends in Python (FastAPI) and Node.js with Redis caching, PostgreSQL/MongoDB indexing, Zod/Pydantic validation, and Pino logging.",
      tools: ["FastAPI", "Node.js", "Redis", "PostgreSQL", "Swagger / OpenAPI", "Pydantic"]
    },
    {
      num: "04",
      title: "APPLIED ML & INTELLIGENT ROUTING",
      short: "Machine learning classifiers, feature engineering, and dynamic query budget optimization.",
      details: "Training XGBoost models with 14 engineered linguistic features for sub-3ms query routing, 2-stage confidence fallbacks (τ = 0.65), and zero under-retrieval.",
      tools: ["XGBoost", "Scikit-Learn", "TensorFlow", "Keras", "Feature Engineering"]
    },
    {
      num: "05",
      title: "MOBILE APP DEVELOPMENT (FLUTTER & KOTLIN)",
      short: "Cross-platform Flutter Android apps and native Jetpack Compose mobile experiences.",
      details: "Building production Android apps with real-time Firestore sync, lockscreen alarms via AlarmManager, STT/TTS hands-free voice debriefs, and role-based isolation.",
      tools: ["Flutter", "Dart", "Kotlin", "Jetpack Compose", "Firebase", "Material 3"]
    },
    {
      num: "06",
      title: "DEVOPS, DOCKER & CLOUD ARCHITECTURE",
      short: "Containerization, automated reaper jobs, AWS S3 chunked uploads, and Razorpay HMAC webhooks.",
      details: "Hardening cloud APIs with Helmet, sliding-window rate limiters, atomic concurrency holds, HMAC-SHA256 signature verification, and automated 30-test Vitest suites.",
      tools: ["Docker", "AWS S3", "Razorpay HMAC", "Vitest", "GitHub Actions", "CI/CD"]
    }
  ];

  return (
    <section id="capabilities" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime mb-3">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>SERVICES & ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-rajdhani font-black text-white tracking-tight uppercase">
            WHAT WE CAN DO
          </h2>
        </div>
        <p className="text-sm font-inter text-slate-400 max-w-md leading-relaxed">
          Comprehensive full-stack AI, ML, and mobile engineering services turning complex technical challenges into scalable, production-ready platforms.
        </p>
      </div>

      {/* Accordion / Capabilities List (Mirrors Screenshot 9 & 10) */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {capabilities.map((item, index) => {
          const isActive = activeItem === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveItem(index)}
              onClick={() => setActiveItem(index)}
              className={`group transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-lime text-dark-950 px-6 sm:px-8 py-7 sm:py-8 shadow-2xl'
                  : 'bg-transparent text-white px-4 sm:px-6 py-6 hover:bg-white/[0.02]'
              }`}
            >
              {/* Row Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 sm:space-x-12">
                  <span
                    className={`text-sm sm:text-base font-mono font-bold tracking-wider ${
                      isActive ? 'text-dark-950' : 'text-slate-500 group-hover:text-lime'
                    }`}
                  >
                    {item.num}
                  </span>
                  <h3
                    className={`text-xl sm:text-3xl font-rajdhani font-bold tracking-wide uppercase transition-colors ${
                      isActive ? 'text-dark-950' : 'text-slate-100 group-hover:text-white'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isActive
                      ? 'bg-dark-950 text-lime rotate-45'
                      : 'border border-white/20 text-slate-400 group-hover:border-lime group-hover:text-lime'
                  }`}
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Expanded Description & Tools when Active */}
              {isActive && (
                <div className="mt-4 pt-4 border-t border-dark-950/20 text-sm font-inter text-dark-950/90 max-w-3xl animate-fadeIn space-y-3">
                  <p className="leading-relaxed font-medium">{item.details}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full bg-dark-950/15 border border-dark-950/20 text-xs font-mono font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
