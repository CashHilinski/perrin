'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiDatabase, FiGlobe, FiCpu, FiBarChart2, FiLayers, FiUsers, FiMessageCircle, FiStar, FiBookOpen, FiZap } from 'react-icons/fi'
import { useState } from 'react'

// Lab data
const LABS = [
  {
    id: 'ai-governance',
    title: 'AI Governance',
    icon: <FiCpu className="h-6 w-6" />,
    color: 'from-blue-500 to-indigo-600',
    textColor: 'text-blue-400',
    description: 'Developing ethical frameworks and policy recommendations for responsible AI deployment, focusing on transparency, fairness, and accountability in algorithmic systems.',
    stats: [
      { label: 'Focus Areas', value: '4' },
      { label: 'Projects', value: '7' },
      { label: 'Partnerships', value: '5' }
    ],
    image: '/lab-ai-policy.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Algorithmic Impact Assessment Framework',
      'AI Governance Models for Public Sector',
      'Ethics in Machine Learning Research'
    ]
  },
  {
    id: 'inclusive-policy',
    title: 'Inclusive Policy',
    icon: <FiUsers className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-600',
    textColor: 'text-purple-400',
    description: 'Creating policy frameworks that ensure equitable access and representation, addressing systemic barriers and promoting diversity across public policy initiatives.',
    stats: [
      { label: 'Focus Areas', value: '3' },
      { label: 'Projects', value: '6' },
      { label: 'Case Studies', value: '8' }
    ],
    image: '/lab-inclusive-policy.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Equity Impact Assessment Tools',
      'Inclusive Public Engagement Models',
      'Accessibility Policy Framework'
    ]
  },
  {
    id: 'climate-technology',
    title: 'Climate Technology',
    icon: <FiGlobe className="h-6 w-6" />,
    color: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-400',
    description: 'Researching policy frameworks that accelerate the deployment of climate technologies while ensuring equitable access and implementation.',
    stats: [
      { label: 'Focus Areas', value: '5' },
      { label: 'Projects', value: '9' },
      { label: 'Policy Briefs', value: '12' }
    ],
    image: '/lab-climate-tech.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Carbon Capture Policy Framework',
      'Green Energy Transition Models',
      'Climate Tech Equity Assessment'
    ]
  },
  {
    id: 'deliberative-democracy',
    title: 'Deliberative Democracy',
    icon: <FiMessageCircle className="h-6 w-6" />,
    color: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-400',
    description: 'Exploring innovative approaches to democratic participation, focusing on citizen assemblies, participatory budgeting, and digital deliberation tools.',
    stats: [
      { label: 'Focus Areas', value: '3' },
      { label: 'Projects', value: '5' },
      { label: 'Case Studies', value: '7' }
    ],
    image: '/lab-democracy.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Digital Citizens Assembly Framework',
      'Cross-Partisan Dialogue Models',
      'Participatory Policy Design'
    ]
  },
  {
    id: 'special-projects',
    title: 'Special Projects Lab',
    icon: <FiStar className="h-6 w-6" />,
    color: 'from-cyan-500 to-blue-600',
    textColor: 'text-cyan-400',
    description: 'Tackling high-impact, time-sensitive policy challenges through rapid response research and innovative cross-disciplinary approaches.',
    stats: [
      { label: 'Focus Areas', value: 'Varies' },
      { label: 'Projects', value: '10+' },
      { label: 'Response Time', value: 'Rapid' }
    ],
    image: '/lab-special-projects.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Rapid Response Policy Analysis',
      'Cross-Disciplinary Crisis Solutions',
      'Emerging Challenges Assessment'
    ]
  },
  {
    id: 'foreign-affairs',
    title: 'Foreign Affairs Lab',
    icon: <FiGlobe className="h-6 w-6" />,
    color: 'from-indigo-500 to-purple-600',
    textColor: 'text-indigo-400',
    description: 'Analyzing global policy trends and developing frameworks for international cooperation, diplomatic engagement, and transnational governance.',
    stats: [
      { label: 'Focus Areas', value: '4' },
      { label: 'Projects', value: '6' },
      { label: 'Partnerships', value: 'Global' }
    ],
    image: '/lab-foreign-affairs.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Transnational Governance Models',
      'Digital Diplomacy Framework',
      'Global Cooperation Mechanisms'
    ]
  },
  {
    id: 'economic-policy',
    title: 'Economic Policy Lab',
    icon: <FiBarChart2 className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-600',
    textColor: 'text-green-400',
    description: 'Developing innovative economic policy solutions that promote sustainable growth, equitable prosperity, and financial stability.',
    stats: [
      { label: 'Focus Areas', value: '5' },
      { label: 'Projects', value: '8' },
      { label: 'Economic Models', value: '6' }
    ],
    image: '/lab-economic.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Inclusive Growth Framework',
      'Green Economy Transition Models',
      'Digital Economy Regulation'
    ]
  },
  {
    id: 'legal-research',
    title: 'Legal Research Lab',
    icon: <FiBookOpen className="h-6 w-6" />,
    color: 'from-red-500 to-rose-600',
    textColor: 'text-red-400',
    description: 'Analyzing legal frameworks and developing policy recommendations at the intersection of law, technology, and public governance.',
    stats: [
      { label: 'Focus Areas', value: '3' },
      { label: 'Projects', value: '7' },
      { label: 'Legal Analyses', value: '15+' }
    ],
    image: '/lab-legal.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Digital Rights Framework',
      'Regulatory Innovation Models',
      'Technology Law Assessment'
    ]
  },
  {
    id: 'policy-entrepreneurship',
    title: 'Policy Entrepreneurship Lab',
    icon: <FiZap className="h-6 w-6" />,
    color: 'from-yellow-500 to-amber-600',
    textColor: 'text-yellow-400',
    description: 'Incubating innovative policy solutions and developing frameworks for effective implementation and scaling of successful initiatives.',
    stats: [
      { label: 'Focus Areas', value: '4' },
      { label: 'Projects', value: '9' },
      { label: 'Pilot Programs', value: '5' }
    ],
    image: '/lab-entrepreneurship.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Policy Innovation Incubator',
      'Implementation Science Framework',
      'Policy Scaling Models'
    ]
  }
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LabsPage() {
  const [activeLabId, setActiveLabId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black text-white">
      {/* Hero Section with 3D tech elements */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute w-full h-full opacity-[0.03]">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={`h-line-${i}`} 
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={`v-line-${i}`} 
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" 
                style={{ left: `${i * 5}%` }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          
          {/* Enhanced floating particles with 3D depth effect */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute bg-blue-400 rounded-full"
              style={{
                width: Math.random() * 4 + (i % 3) + "px",
                height: Math.random() * 4 + (i % 3) + "px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: `blur(${i % 2 ? 1 : 0}px)`,
                opacity: 0.1 + (i % 10) * 0.01,
                zIndex: i % 3
              }}
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, Math.random() * 0.5 + 1.2, 1],
                opacity: [0.1 + (i % 10) * 0.01, 0.3 + (i % 10) * 0.01, 0.1 + (i % 10) * 0.01],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Glowing orbs in background for depth */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, rgba(59, 130, 246, 0) 70%)`,
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2,
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            {/* Enhanced badge with 3D hover effect */}
            <motion.div 
              className="relative group mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "blur(15px)" }}
              />
              <motion.div 
                className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg shadow-blue-900/5"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 0 20px 2px rgba(59, 130, 246, 0.3)" 
                }}
              >
                <motion.div 
                  className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3 relative"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-400"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>
                <span className="text-blue-300 text-sm uppercase tracking-widest font-medium">Research Labs</span>
              </motion.div>
            </motion.div>
            
            {/* Title with animated highlight */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 relative">Research Labs</span>
              </h1>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <p className="max-w-3xl mx-auto text-lg text-blue-100/70 leading-relaxed">
                Our specialized labs bring together researchers, policy experts, and technologists 
                to address the most challenging problems at the intersection of technology and public policy.
              </p>
            </motion.div>
            
            {/* Research Areas Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { label: "Research Labs", value: "9" },
                { label: "Policy Researchers", value: "250+" },
                { label: "Specialized Teams", value: "15" },
                { label: "Focus Areas", value: "30+" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/10 px-6 py-4 rounded-xl flex flex-col items-center relative overflow-hidden group"
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 1 }}
                  />
                  <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-blue-300/70">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Labs Showcase Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {LABS.map((lab, index) => (
              <motion.div 
                key={lab.id}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="relative group"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                onClick={() => setActiveLabId(activeLabId === lab.id ? null : lab.id)}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                
                <div className={`h-full rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-sm relative z-10 transition-all duration-300 ${activeLabId === lab.id ? 'ring-2 ring-blue-500/50' : 'group-hover:border-blue-500/30'}`}>
                  {/* Lab card header with gradient */}
                  <div className={`h-2 w-full bg-gradient-to-r ${lab.color}`}></div>
                  
                  <div className="p-6">
                    {/* Icon and title row */}
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${lab.color} flex items-center justify-center mr-4 shadow-lg`}>
                        <div className="text-white">
                          {lab.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{lab.title}</h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{lab.description}</p>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {lab.stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
                          <div className={`text-lg font-bold ${lab.textColor}`}>{stat.value}</div>
                          <div className="text-gray-400 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Projects list - only visible when active */}
                    <motion.div 
                      className="space-y-2 mb-6"
                      initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                      animate={{ 
                        height: activeLabId === lab.id ? 'auto' : 0,
                        opacity: activeLabId === lab.id ? 1 : 0,
                        marginBottom: activeLabId === lab.id ? 24 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-medium text-white mb-2">Current Projects:</h4>
                      <ul className="space-y-1">
                        {lab.projects.map((project, i) => (
                          <li key={i} className="flex items-start">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${lab.textColor} mt-1.5 mr-2`}></span>
                            <span className="text-gray-300 text-sm">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    {/* Action link */}
                    <div className="flex justify-between items-center">
                      <button 
                        className={`text-sm ${lab.textColor} flex items-center transition-all hover:opacity-80`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLabId(activeLabId === lab.id ? null : lab.id);
                        }}
                      >
                        <span>{activeLabId === lab.id ? 'View Less' : 'View Details'}</span>
                        <FiArrowRight className="ml-1" />
                      </button>
                      
                      <div className="text-xs text-gray-500">Lab ID: {lab.id}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <motion.div 
                className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full mr-2"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <span className="text-blue-300 text-xs uppercase tracking-widest font-medium">Technologies</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Research Technologies</span>
            </h2>
            
            <p className="max-w-3xl mx-auto text-gray-300 mb-4">
              Our labs leverage advanced technologies and methodologies to push the boundaries of policy research and analysis.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Data Analytics",
                description: "Utilizing big data techniques to uncover patterns and insights in complex policy datasets",
                icon: "📊",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Machine Learning Models",
                description: "Developing predictive models to forecast policy outcomes and scenario planning",
                icon: "🧠",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Natural Language Processing",
                description: "Analyzing policy documents and public discourse to extract meaningful insights",
                icon: "📝",
                color: "from-amber-500 to-orange-500"
              },
              {
                title: "Visualization Tools",
                description: "Creating interactive data visualizations to communicate complex policy concepts",
                icon: "📈",
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Simulation Frameworks",
                description: "Building policy simulations to test intervention strategies before implementation",
                icon: "🔬",
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Network Analysis",
                description: "Mapping relationship networks to understand stakeholder dynamics in policy ecosystems",
                icon: "🌐",
                color: "from-indigo-500 to-blue-500"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center mb-4 text-2xl`}>
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{tech.title}</h3>
                  <p className="text-gray-400">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
