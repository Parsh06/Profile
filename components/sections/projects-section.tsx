"use client"

import React, { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  Github, 
  ExternalLink, 
  Folder, 
  Star, 
  Code2,
  Sparkles,
  Zap,
  TrendingUp,
  Globe,
  Database,
  Brain,
  Palette,
  BarChart3,
  Mail,
  DollarSign,
  Users,
  Bot,
  Gamepad2,
  Car,
  Heart,
  Utensils,
  Camera,
  ShoppingCart,
  PieChart
} from "lucide-react"
import { Tilt } from "@/components/ui/tilt"

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: "Stock Broking",
      image: "/stockbroking.png",
      demoUrl: "https://stock-62eb3.web.app/",
      githubUrl: null,
      category: ["Artificial Intelligence", "Web Development"],
      description:
        "A dynamic web-based platform for real-time stock market visualization and trading simulations. Features live data integration, interactive financial charts, and predictive analytics powered by AI models.",
      icon: TrendingUp,
      featured: true,
    },
    {
      title: "Chess Game Prediction",
      image: "/chesspredict.png",
      demoUrl: "https://chesspredictoutcome.vercel.app/",
      githubUrl: "https://github.com/Parsh06/chess",
      category: ["Machine Learning", "Web Development"],
      description:
        "An AI-driven chess prediction web app that analyzes historical moves and board positions to forecast game outcomes. Utilizes machine learning models to simulate strategies and suggest optimal plays.",
      icon: Gamepad2,
      featured: true,
    },
    {
      title: "Smart Business Cost Planning",
      image: "/smartbuisnesscostplaning.png",
      demoUrl: "https://du-hacks.web.app/",
      githubUrl: "https://github.com/Parsh06/du-hacks",
      category: ["Artificial Intelligence", "Web Development"],
      description:
        "A smart cost-planning tool tailored for small and medium enterprises (SMEs). Automates expense tracking, generates financial reports, and offers AI-based suggestions to optimize budget allocations and operational costs.",
      icon: DollarSign,
      featured: true,
    },
    {
      title: "Redshift Racing India",
      image: "/Redshift.png",
      demoUrl: "http://www.redshift-racing.in/",
      githubUrl: "https://github.com/Parsh06/Redshift-website",
      category: ["Web Development"],
      description:
        "A sleek, high-performance website for a collegiate racing team. Showcases event highlights, team rosters, project galleries, and real-time announcements with a mobile-first, responsive design.",
      icon: Car,
      featured: false,
    },
    {
      title: "Dautyam Club",
      image: "/dautyam.png",
      demoUrl: "https://dautyam-website.vercel.app/",
      githubUrl: "https://github.com/Parsh06/Dautyam-Website",
      category: ["Web Development"],
      description:
        "Official club portal built for a college council. Offers event scheduling, photo galleries, member highlights, and a CMS-friendly admin panel for seamless content updates and announcements.",
      icon: Users,
      featured: false,
    },
    {
      title: "MBP Trust NGO",
      image: "/mbp.png",
      demoUrl: "https://mbptrust.org/",
      githubUrl: null,
      category: ["Web Development"],
      description:
        "A professionally developed website for a non-profit organization. Includes donation integration via Razorpay, event pages, testimonials, and a responsive layout that ensures accessibility across all devices.",
      icon: Heart,
      featured: false,
    },
    {
      title: "Food Recipe",
      image: "/FoodRecipe.png",
      demoUrl: "https://foodingrediants.netlify.app/",
      githubUrl: null,
      category: ["Web Development"],
      description:
        "An intuitive recipe finder app allowing users to search meals by ingredients or keywords. Includes detailed instructions, nutritional breakdowns, and responsive UI for a delightful cooking experience.",
      icon: Utensils,
      featured: false,
    },
    {
      title: "Kriya Dhrishti",
      image: "/Kriya.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Sih-Final",
      category: ["Machine Learning", "Web Development"],
      description:
        "A real-time anomaly detection system using computer vision and deep learning. Designed to identify irregular human activity in surveillance footage for use in smart cities and security infrastructure.",
      icon: Camera,
      featured: false,
    },
    {
      title: "Satya Kendra",
      image: "/satya_kendra.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Team-Should",
      category: ["Machine Learning", "Web Development"],
      description:
        "Sentiment analysis platform that processes user-generated text and classifies sentiments with high accuracy. Features an interactive dashboard for data visualization and NLP model performance tracking.",
      icon: Brain,
      featured: false,
    },
    {
      title: "Ecommerce Website",
      image: "/Fashio_hub.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Website_ECO",
      category: ["Web Development"],
      description:
        "A full-stack ecommerce web application featuring secure user authentication, product filtering, cart management, and order processing. Built for scalability and optimized for high-performance browsing.",
      icon: ShoppingCart,
      featured: false,
    },
    {
      title: "Automatic Email Sender",
      image: "/Automatic.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Automatic-Email-Sender",
      category: ["Web Development", "Automation"],
      description:
        "A utility tool that enables scheduled email delivery with dynamic content templates. Designed for marketing automation and bulk communication, with Google Apps Script and Gmail API integration.",
      icon: Mail,
      featured: false,
    },
    {
      title: "Expenditure Budget",
      image: "/expenditure.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Expenditure-budget",
      category: ["Web Development"],
      description:
        "An interactive budgeting web app that helps users manage daily, weekly, and monthly expenses. Includes visual graphs, categorized spending, and data export functionality for financial planning.",
      icon: PieChart,
      featured: false,
    },
    {
      title: "Data Analysis",
      image: "/PowerBi.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/PowerBi-",
      category: ["Data Analysis"],
      description:
        "A business intelligence project using Microsoft Power BI. Offers visual dashboards, KPI tracking, and deep insights through interactive charts and slicers, making data-driven decisions seamless.",
      icon: BarChart3,
      featured: false,
    },
  ]
  
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        bounce: 0.3
      } 
    },
  }

  const headerAnimation = {
    hidden: { opacity: 0, y: -20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Artificial Intelligence": "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "Machine Learning": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Web Development": "bg-green-500/10 text-green-600 border-green-500/20",
      "Data Analysis": "bg-orange-500/10 text-orange-600 border-orange-500/20",
      "Automation": "bg-pink-500/10 text-pink-600 border-pink-500/20",
    }
    return colors[category as keyof typeof colors] || "bg-primary/10 text-primary border-primary/20"
  }

  return (
    <div className="space-y-8">
      <motion.div 
        variants={headerAnimation}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.div 
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Folder className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">
            My <span className="text-primary">Projects</span>
          </h2>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Sparkles className="w-6 h-6 text-amber-500" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-20 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mx-auto mb-4"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          A showcase of my recent work and personal projects, featuring cutting-edge technologies and innovative solutions.
        </motion.p>
        
        <motion.div 
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {["Featured", "All Projects"].map((filter, index) => (
            <motion.div
              key={filter}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ 
                  rotate: index === 0 ? [0, 360] : [0, -360]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                {index === 0 ? (
                  <Star className="w-4 h-4 text-amber-500" />
                ) : (
                  <Code2 className="w-4 h-4 text-primary" />
                )}
              </motion.div>
              <span className="text-sm font-medium">{filter}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item}>
            <Tilt scale={1.05} perspective={1000} transitionSpeed={1000}>
              <Card
                className={`overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50 h-full flex flex-col relative group min-h-[500px] ${
                  project.featured ? 'ring-2 ring-primary/20' : ''
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {project.featured && (
                  <motion.div
                    className="absolute -top-2 -right-2 z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-full shadow-lg"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Star className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                )}
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                <div className="relative overflow-hidden aspect-video">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    style={{
                      transform: hoveredProject === index ? "scale(1.1)" : "scale(1)",
                      filter: hoveredProject === index ? "brightness(1.1)" : "brightness(1)",
                    }}
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  <motion.div
                    className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {React.createElement(project.icon, { className: "w-5 h-5 text-primary" })}
                    </motion.div>
                  </motion.div>
                  
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"
                    style={{
                      opacity: hoveredProject === index ? 1 : 0,
                    }}
                  >
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4 flex gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredProject === index ? 0 : 20,
                        opacity: hoveredProject === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.demoUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="sm" variant="secondary" asChild className="gap-1 backdrop-blur-sm">
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <Eye className="w-4 h-4" />
                              </motion.div>
                              Demo
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      {project.githubUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="sm" variant="outline" asChild className="gap-1 backdrop-blur-sm">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <Github className="w-4 h-4" />
                              </motion.div>
                              Code
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow relative z-10">
                  <motion.div
                    className="flex items-start justify-between mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <motion.div
                      className="shrink-0 ml-2"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {React.createElement(project.icon, { className: "w-5 h-5 text-primary/60" })}
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.category.map((cat, catIndex) => (
                      <motion.div
                        key={catIndex}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: catIndex * 0.1 + 0.4 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(cat)}`}
                        >
                          {cat}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow min-h-[80px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center justify-between pt-4 border-t border-border/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      {project.demoUrl && (
                        <motion.div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      {project.githubUrl && (
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {project.demoUrl && project.githubUrl ? "Live & Code" : 
                         project.demoUrl ? "Live Demo" : 
                         project.githubUrl ? "Source Code" : "Coming Soon"}
                      </span>
                    </div>
                    
                    {(project.demoUrl || project.githubUrl) && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="gap-1 text-primary hover:text-primary hover:bg-primary/10 p-2"
                        >
                          <a href={project.demoUrl || project.githubUrl || undefined} target="_blank" rel="noopener noreferrer">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.div>
                            <span className="sr-only">View Project</span>
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}