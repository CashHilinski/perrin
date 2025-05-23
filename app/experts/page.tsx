'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiSearch, FiFilter, FiX, FiUsers, FiExternalLink, FiChevronRight } from 'react-icons/fi'
import { HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineChip } from 'react-icons/hi'
import Head from 'next/head'

interface Expert {
  id: number
  name: string
  role: string
  bio: string
  image: string
  email?: string
  phone?: string
  mentor?: string
  interests?: string[]
  category?: string
  affiliations?: {
    education?: string[]
    workExperience?: string[]
    organizations?: string[]
  }
  socialLinks?: {
    linkedin?: string
    instagram?: string
    website?: string
  }
  stats?: {
    sat?: string
    act?: string
    lsat?: string
  }
}

const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Finn Järvi",
    role: "Founder & President",
    bio: "Founder and President of Perrin Institute.",
    image: "",
    email: "finnjarvi@perrininstitution.org",
    category: "Leadership"
  },
  {
    id: 2,
    name: "Cash Hilinski",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Co-Founder and Chief Technology Officer leading technical strategy and implementation.",
    image: "",
    email: "admin@perrininstitution.org",
    category: "Leadership"
  },
  {
    id: 3,
    name: "Samuel Riverson",
    role: "Chief Marketing Officer",
    bio: "Chief Marketing Officer responsible for all marketing initiatives.",
    image: "",
    email: "rgf9kk@virginia.edu",
    category: "Leadership"
  },
  {
    id: 4,
    name: "Thomas Fang",
    role: "Chief of Staff",
    bio: "Chief of Staff overseeing operations and team coordination.",
    image: "",
    email: "hayobro7512@gmail.com",
    category: "Leadership"
  },
  {
    id: 5,
    name: "Ayesha Murtaza",
    role: "Chief Operating Officer",
    bio: "Chief Operating Officer managing day-to-day operations.",
    image: "",
    category: "Leadership"
  },
  {
    id: 6,
    name: "Agneya Tharun",
    role: "Chief Information Security Officer",
    bio: "Chief Information Security Officer ensuring data protection and security protocols.",
    image: "",
    category: "Leadership"
  },
  {
    id: 7,
    name: "Arian Rakhmetzhanov",
    role: "Chief Information Officer",
    bio: "Chief Information Officer overseeing information technology strategy.",
    image: "",
    category: "Leadership"
  },
  {
    id: 8,
    name: "Emmanuel Asamoah",
    role: "Chief Compliance Officer",
    bio: "Chief Compliance Officer ensuring regulatory compliance.",
    image: "",
    category: "Leadership"
  },
  {
    id: 9,
    name: "Danielle Dee",
    role: "Editor-In-Chief",
    bio: "Editor-In-Chief managing content strategy and publication.",
    image: "",
    email: "danielled7599@gmail.com",
    category: "Leadership"
  },
  {
    id: 10,
    name: "Larry Franklin",
    role: "Chief Design Officer",
    bio: "Chief Design Officer leading visual design and user experience.",
    image: "",
    category: "Leadership"
  },
  {
    id: 11,
    name: "Avani Agarwal",
    role: "Software Engineer",
    bio: "Software Engineer developing and maintaining applications.",
    image: "",
    email: "avanipersonal7@gmail.com",
    category: "Engineering"
  },
  {
    id: 12,
    name: "Chankyu Kim",
    role: "Software Engineer",
    bio: "Software Engineer focused on development and technical solutions.",
    image: "",
    email: "nehemiahk.perrin@gmail.com",
    category: "Engineering"
  },
  {
    id: 13,
    name: "Cody Coleman",
    role: "Director of Technology",
    bio: "Director of Technology overseeing technical initiatives and strategy.",
    image: "",
    category: "Engineering"
  },
  {
    id: 14,
    name: "Khoa Duong",
    role: "Vice President of Marketing",
    bio: "Vice President of Marketing leading brand strategy and market growth initiatives.",
    image: "",
    email: "duongdangkhoa0328@gmail.com",
    phone: "(+84) 981880698",
    category: "Leadership"
  },
  {
    id: 15,
    name: "Vick Volovnyk",
    role: "Director of Communications",
    bio: "Director of Communications managing external communications and public relations.",
    image: "",
    category: "Leadership"
  },
  {
    id: 16,
    name: "Yiren Jing",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing and developing policy recommendations.",
    image: "",
    email: "jingyiren345@gmail.com",
    category: "Research"
  },
  {
    id: 17,
    name: "Rienat Kharian",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing policy implications and opportunities.",
    image: "",
    category: "Research"
  },
  {
    id: 18,
    name: "Kashaf Alvi",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting research on various policy areas.",
    image: "",
    category: "Research"
  },
  {
    id: 19,
    name: "Aayam Bansal",
    role: "Policy Researcher",
    bio: "Policy Researcher specializing in policy analysis and development.",
    image: "",
    category: "Research"
  },
  {
    id: 20,
    name: "Daniel Tu",
    role: "Policy Researcher",
    bio: "Policy Researcher focusing on policy implementation and evaluation.",
    image: "",
    category: "Research"
  },
  {
    id: 21,
    name: "Lucas Benardete",
    role: "Policy Researcher",
    bio: "Policy Researcher investigating policy impacts and effectiveness.",
    image: "",
    category: "Research"
  },
  {
    id: 22,
    name: "Anirudh Polagani",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative policy solutions.",
    image: "",
    email: "anirudh.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 23,
    name: "Riya Dutta",
    role: "Policy Researcher",
    bio: "Policy Researcher examining policy frameworks and outcomes.",
    image: "",
    email: "rdutta.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 24,
    name: "Jacob Wolmetz",
    role: "Policy Researcher",
    bio: "Policy Researcher studying emerging policy trends and challenges.",
    image: "",
    category: "Research"
  },
  {
    id: 25,
    name: "Yash Laddha",
    role: "Policy Researcher",
    bio: "Policy Researcher contributing to policy innovation and research.",
    image: "",
    email: "yashladdha75@gmail.com",
    category: "Research"
  },
  {
    id: 26,
    name: "Noah Diaz",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing complex policy issues and solutions.",
    image: "",
    category: "Research"
  },
  {
    id: 27,
    name: "Saanvi Gowda",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting thorough policy analysis and research.",
    image: "",
    category: "Research"
  },
  {
    id: 28,
    name: "Shuwei Guo",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative approaches to policy challenges.",
    image: "",
    email: "shuweiguo1@gmail.com",
    category: "Research"
  },
  {
    id: 29,
    name: "Simran Sahoo",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher reviewing and overseeing content publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 30,
    name: "Mohammad Ibrahim",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher contributing to content analysis and publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 31,
    name: "Aaron Zeleke",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher supporting content development and research.",
    image: "",
    category: "Editorial"
  },
  {
    id: 32,
    name: "Rebekah Mekonen",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher and Outreach Chair facilitating research communication.",
    image: "",
    email: "qhu4bv@virginia.edu",
    phone: "5714993544",
    category: "Editorial"
  },
  {
    id: 33,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Research Fellow specializing in technology policy intersection.",
    image: "/experts/kiro.jpg",
    interests: ["Social Justice", "Technology", "Political Science"],
    category: "Research Fellow",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kiro-moussa",
      website: "https://kiromoussa.com"
    }
  },
  {
    id: 34,
    name: "Lexie Hobbs",
    role: "Research Fellow",
    bio: "Research Fellow conducting policy research.",
    image: "/experts/anonymous.jpg",
    interests: ["Government", "Policy Research", "Higher Education"],
    category: "Research Fellow",
    affiliations: {
      education: ["Smith College"]
    }
  },
  {
    id: 35,
    name: "Anaise Lopez-Rodriguez",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy development.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Brown University"]
    }
  },
  {
    id: 36,
    name: "Jawhar Yasin",
    role: "Research Fellow",
    bio: "Research Fellow studying policy implementation.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Princeton University"]
    }
  },
  {
    id: 37,
    name: "Neha Nair",
    role: "Research Fellow",
    bio: "Research Fellow researching policy innovation.",
    image: "/girl1.png",
    interests: ["Environmental Policy", "Technology", "Sustainability"],
    category: "Research Fellow"
  },
  {
    id: 38,
    name: "Lourdes Ronquillo",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy research.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Tufts University"]
    }
  },
  {
    id: 39,
    name: "Christian Wang",
    role: "Research Fellow",
    bio: "Research Fellow focusing on philosophy, politics, and economics.",
    image: "",
    interests: ["Philosophy", "Politics", "Economics"],
    category: "Research Fellow",
    affiliations: {
      education: ["Oxford University"]
    }
  },
  {
    id: 40,
    name: "Oz Smith",
    role: "Research Fellow",
    bio: "Research Fellow conducting independent policy research.",
    image: "",
    category: "Research Fellow"
  },
  {
    id: 41,
    name: "Heba Elkouraichi",
    role: "Research Fellow",
    bio: "Research Fellow studying policy implementation.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Vassar College"]
    }
  },
  {
    id: 42,
    name: "Sophie Sarazin",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy research.",
    image: "/experts/sophie.jpg",
    email: "ssarazin.07@gmail.com",
    category: "Research Fellow",
    interests: ["Educational Policy", "Environmental Policy"]
  },
  {
    id: 43,
    name: "Noah Wondwossen",
    role: "Co-President",
    bio: "Co-President of Perrin at The University of Virginia.",
    image: "",
    email: "kqe8kv@virginia.edu",
    phone: "2408107421",
    category: "UVA Chapter"
  },
  {
    id: 44,
    name: "Nehemiah Kim",
    role: "Treasurer",
    bio: "Treasurer of Perrin at The University of Virginia.",
    image: "",
    email: "kyi5ra@virginia.edu",
    phone: "3176280361",
    category: "UVA Chapter"
  },
  {
    id: 45,
    name: "Naomi Million",
    role: "Secretary",
    bio: "Secretary of Perrin at The University of Virginia.",
    image: "",
    email: "uwm4xh@virginia.edu",
    phone: "7033990711",
    category: "UVA Chapter"
  },
  {
    id: 46,
    name: "Manuella Kodwo",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "pyv7wx@virginia.edu",
    phone: "7038592870",
    category: "UVA Chapter"
  },
  {
    id: 47,
    name: "Mikael Tefferi",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "dne7vg@virginia.edu",
    phone: "7033464967",
    category: "UVA Chapter"
  },
  {
    id: 48,
    name: "Heran Dereje",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "rqh5rc@virginia.edu",
    category: "UVA Chapter"
  },
  {
    id: 49,
    name: "Abel Alexander",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "fct4zy@virginia.edu",
    category: "UVA Chapter"
  },
  // New Research Associates
  {
    id: 51,
    name: "Aashi Jain",
    role: "Research Associate",
    bio: "Research Associate focused on policy development and implementation.",
    image: "",
    email: "foreveraashijain@gmail.com",
    category: "Research Associates"
  },
  {
    id: 52,
    name: "Shivam Bhatt",
    role: "Research Associate",
    bio: "Research Associate specializing in policy analysis and research.",
    image: "",
    email: "shivamb0608@gmail.com",
    category: "Research Associates"
  },
  {
    id: 53,
    name: "Aashrith Tatineni",
    role: "Research Associate",
    bio: "Research Associate examining policy frameworks and outcomes.",
    image: "",
    email: "atatineni09@gmail.com",
    category: "Research Associates"
  },
  {
    id: 54,
    name: "Matthew Ma",
    role: "Research Associate",
    bio: "Research Associate investigating policy impacts and effectiveness.",
    image: "",
    email: "matthewma347@gmail.com",
    category: "Research Associates"
  },
  {
    id: 55,
    name: "Amrith Ponneth",
    role: "Research Associate",
    bio: "Research Associate exploring innovative approaches to policy challenges.",
    image: "",
    email: "amrith.ponneth@gmail.com",
    category: "Research Associates"
  },
  {
    id: 56,
    name: "Afia Mubashir",
    role: "Research Associate",
    bio: "Research Associate conducting policy research and analysis.",
    image: "",
    email: "mubashir.afia@gmail.com",
    category: "Research Associates"
  },
  {
    id: 57,
    name: "Aiyana Bage",
    role: "Research Associate",
    bio: "Research Associate studying policy implications and opportunities.",
    image: "",
    email: "aiyanabag10@gmail.com",
    category: "Research Associates"
  },
  {
    id: 58,
    name: "Nivriti Deshpande",
    role: "Research Associate",
    bio: "Research Associate developing policy recommendations and solutions.",
    image: "",
    email: "nivriti.deshpande@gmail.com",
    category: "Research Associates"
  },
  {
    id: 59,
    name: "Shreshtha Aggarwal",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "shreshtha.aggarwal01@gmail.com",
    category: "Research Associates"
  },
  {
    id: 60,
    name: "Saahir Vazirani",
    role: "Research Associate",
    bio: "Research Associate focused on policy analysis and development.",
    image: "",
    email: "saahir.vazirani@gmail.com",
    category: "Research Associates"
  },
  {
    id: 61,
    name: "Bhavana Karthik",
    role: "Research Associate",
    bio: "Research Associate examining policy trends and challenges.",
    image: "",
    email: "bhavana22.karthik@gmail.com",
    category: "Research Associates"
  },
  {
    id: 62,
    name: "Eva Dubey",
    role: "Research Associate",
    bio: "Research Associate specializing in policy research and evaluation.",
    image: "",
    email: "evasalt92@Gmail.com",
    category: "Research Associates"
  },
  {
    id: 63,
    name: "Arvind Salem",
    role: "Research Associate",
    bio: "Research Associate investigating policy solutions and impacts.",
    image: "",
    email: "arvindsalem1613@gmail.com",
    category: "Research Associates"
  },
  {
    id: 64,
    name: "Daniel Neuner",
    role: "Research Associate",
    bio: "Research Associate focused on policy development and analysis.",
    image: "",
    email: "dxneuner08@gmail.com",
    category: "Research Associates"
  },
  {
    id: 65,
    name: "Iris Tang",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "tangiris2008@gmail.com",
    category: "Research Associates"
  },
  {
    id: 66,
    name: "Tanmay Rai",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research and analysis.",
    image: "",
    email: "tanmayraisa@gmail.com",
    category: "Research Associates"
  },
  {
    id: 67,
    name: "Aaron Kunnikuru",
    role: "Research Associate",
    bio: "Research Associate exploring policy development and implementation.",
    image: "",
    email: "aaronkunnik@gmail.com",
    category: "Research Associates"
  },
  {
    id: 68,
    name: "Jared Rodnick",
    role: "Research Associate",
    bio: "Research Associate specializing in policy analysis and research.",
    image: "",
    email: "jaredrodnick@gmail.com",
    category: "Research Associates"
  },
  {
    id: 69,
    name: "Samarth Pandey",
    role: "Research Associate",
    bio: "Research Associate examining policy frameworks and outcomes.",
    image: "",
    email: "samarthpan945@gmail.com",
    category: "Research Associates"
  },
  {
    id: 70,
    name: "Danielle Kim",
    role: "Research Associate",
    bio: "Research Associate investigating policy impacts and effectiveness.",
    image: "",
    email: "kimelledani@gmail.com",
    category: "Research Associates"
  },
  {
    id: 71,
    name: "Serra Aksoy",
    role: "Research Associate",
    bio: "Research Associate exploring innovative approaches to policy challenges.",
    image: "",
    email: "serurays@gmail.com",
    category: "Research Associates"
  },
  {
    id: 72,
    name: "Mahanth Komuravelli",
    role: "Research Associate",
    bio: "Research Associate conducting policy research and analysis.",
    image: "",
    email: "mahanthf112@gmail.com",
    category: "Research Associates"
  },
  {
    id: 73,
    name: "Vaishnavi Singh",
    role: "Research Associate",
    bio: "Research Associate studying policy implications and opportunities.",
    image: "",
    email: "vaish2003singh@gmail.com",
    category: "Research Associates"
  },
  {
    id: 74,
    name: "Sunkalp Chandra",
    role: "Research Associate",
    bio: "Research Associate developing policy recommendations and solutions.",
    image: "",
    email: "sunkalp.chandra@gmail.com",
    category: "Research Associates"
  },
  {
    id: 75,
    name: "Sophie Glass",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "sophieglass212@gmail.com",
    category: "Research Associates"
  },
  {
    id: 76,
    name: "Cason Noll",
    role: "Research Associate",
    bio: "Research Associate focused on policy analysis and development.",
    image: "",
    email: "casonnoll1@gmail.com",
    category: "Research Associates"
  },
  {
    id: 77,
    name: "Neel Iyer",
    role: "Research Associate",
    bio: "Research Associate examining policy trends and challenges.",
    image: "",
    email: "neeliyer14@gmail.com",
    category: "Research Associates"
  }
]

// Get all unique categories
const allCategories = Array.from(new Set(EXPERTS.map(expert => expert.category || 'Other')));

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);
  
  const totalEmployees = EXPERTS.length;

  useEffect(() => {
    let result = EXPERTS;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(expert => expert.category === selectedCategory);
    }
    
    setFilteredExperts(result);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Head>
        <title>Expert Directory | The Perrin Institution</title>
        <meta name="description" content="Meet our team of experts at The Perrin Institution - researchers, policy analysts, and leaders dedicated to technology governance and legal innovation." />
        <meta name="keywords" content="Perrin Institution experts, Perrin Institute team, policy researchers, technology governance experts" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Expert Directory - The Perrin Institution",
              "description": "Meet our team of experts at The Perrin Institution",
              "url": "https://perrininstitution.com/experts",
              "isPartOf": {
                "@type": "WebSite",
                "name": "The Perrin Institution",
                "url": "https://perrininstitution.com"
              },
              "about": {
                "@type": "Organization",
                "name": "The Perrin Institution",
                "url": "https://perrininstitution.com"
              }
            })
          }}
        />
      </Head>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-slate-200/20 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Decorative lines */}
        <div className="absolute inset-0">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="rgba(148, 163, 184, 0.1)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d="M0,50 L100,50" 
              fill="none" 
              stroke="rgba(148, 163, 184, 0.1)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d="M50,0 L50,100" 
              fill="none" 
              stroke="rgba(148, 163, 184, 0.1)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="h-1 w-12 bg-slate-400 rounded-full"></div>
                <span className="text-slate-600 font-semibold tracking-wider uppercase">
                  Our Team
                </span>
                <div className="h-1 w-12 bg-slate-400 rounded-full"></div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Meet Our Team
              </h1>
              
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center bg-slate-100 p-3 rounded-full border border-slate-200"
                >
                  <FiUsers className="text-slate-700 text-xl" />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-slate-600"
                >
                  <span className="font-bold text-2xl text-slate-900">{totalEmployees}</span> experts shaping the future of public policy
                </motion.p>
              </div>
              
              {/* Decorative element */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-10 h-1 w-full max-w-xl mx-auto bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-full origin-left"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900 placeholder-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300"
              >
                <FiFilter className="text-slate-600" />
                <span className="text-slate-700">Filters</span>
              </motion.button>
              
              {(selectedCategory || searchTerm) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm('');
                  }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <FiX />
                  <span>Clear</span>
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-3 flex items-center gap-2">
                      <HiOutlineUserGroup className="text-slate-600" />
                      Filter by Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map(category => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? 'bg-slate-900 text-white shadow-lg'
                              : 'bg-slate-100 border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Results Count */}
          <div className="mt-4 text-slate-600 text-center md:text-left">
            Showing <span className="text-slate-900 font-medium">{filteredExperts.length}</span> of <span className="text-slate-900 font-medium">{totalEmployees}</span> team members
          </div>
        </div>
      </section>

      {/* Classic Directory-Style Experts Table */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence>
            {filteredExperts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-2xl font-medium text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <>
                {/* Desktop View - Hidden on mobile */}
                <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Table Headers */}
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-700 uppercase tracking-wider">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-1">Details</div>
                  </div>
                  
                  {/* Expert Rows */}
                  {filteredExperts.map((expert, index) => (
                    <motion.div
                      key={`desktop-${expert.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      exit={{ opacity: 0 }}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      {/* Name Column */}
                      <div className="col-span-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-medium">
                            {expert.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-slate-900">{expert.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Role Column */}
                      <div className="col-span-3 text-slate-600">
                        {expert.role}
                      </div>
                      
                      {/* Email Column */}
                      <div className="col-span-5">
                        {expert.email && (
                          <a 
                            href={`mailto:${expert.email}`}
                            className="text-slate-700 hover:text-slate-900 transition-colors flex items-center truncate"
                          >
                            {expert.email}
                          </a>
                        )}
                      </div>
                      
                      {/* Details Link Column */}
                      <div className="col-span-1 text-right">
                        <Link href={`/experts/${expert.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors border border-slate-200"
                          >
                            <FiChevronRight size={16} />
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile View - Card Layout */}
                <div className="md:hidden space-y-4">
                  {filteredExperts.map((expert, index) => (
                    <motion.div
                      key={`mobile-${expert.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-medium text-lg">
                            {expert.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-slate-900 text-lg">{expert.name}</p>
                            <p className="text-sm text-slate-600">{expert.category}</p>
                          </div>
                        </div>
                        <Link href={`/experts/${expert.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                          >
                            <FiChevronRight size={18} />
                          </motion.div>
                        </Link>
                      </div>
                      
                      <div className="py-2 border-t border-slate-200">
                        <div className="mb-2">
                          <span className="text-xs text-slate-500 uppercase tracking-wider">Role</span>
                          <p className="text-slate-700">{expert.role}</p>
                        </div>
                        
                        {expert.email && (
                          <div>
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Email</span>
                            <a 
                              href={`mailto:${expert.email}`}
                              className="text-slate-700 hover:text-slate-900 transition-colors block truncate"
                            >
                              {expert.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
} 