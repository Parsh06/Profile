"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  Download, 
  Lightbulb, 
  Trophy, 
  Star, 
  Sparkles, 
  Target, 
  Zap, 
  Medal, 
  Crown, 
  Flame, 
  Rocket, 
  Brain, 
  Code, 
  FileText, 
  ExternalLink,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react"

export default function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const achievements = [
    {
      icon: Trophy,
      title: "Smart India Hackathon 2023 Finalist",
      description:
        "Our team was selected as a finalist in the Smart India Hackathon 2023 with the project Kriya Drishti. We engineered a system designed to address human activity anomalies using HTML, CSS, JavaScript, Python, SQLite3, OpenCV, and MediaPipe. This achievement highlights our dedication and expertise in solving real-world problems through technology.",
      link: null,
      year: "2023",
      category: "Hackathon",
      highlight: true,
      gradient: "from-yellow-500 to-orange-500",
      technologies: ["Python", "OpenCV", "MediaPipe", "SQLite3"]
    },
    {
      icon: Brain,
      title: "Datathon National Level Hackathon in Core ML 2024 Finalist",
      description:
        "Achieved finalist status in the Datathon National Level Hackathon in Core ML 2024 with the project Satya Kendra. Created a sentiment analysis project utilizing HTML, CSS, JavaScript, Python, machine learning models, and a web scraper. Our project focused on practical application and innovation in data science.",
      link: null,
      year: "2024",
      category: "Machine Learning",
      highlight: true,
      gradient: "from-blue-500 to-purple-500",
      technologies: ["Python", "Machine Learning", "Web Scraping", "JavaScript"]
    },
    {
      icon: Rocket,
      title: "Finalist of DU HACKS 4.0 2025",
      description:
        "Secured a finalist position at DU HACKS 4.0 in 2025 with the project Smart Business Cost Planning. The project utilized AI-driven insights for optimized business cost management and showcased innovation in financial analytics for SMEs.",
      link: null,
      year: "2025",
      category: "Business Intelligence",
      highlight: true,
      gradient: "from-green-500 to-teal-500",
      technologies: ["AI", "Financial Analytics", "Business Intelligence"]
    },
    {
      icon: FileText,
      title: "Intruder Detection Recognition Alert System for Fencing Defence using Image Processing Techniques",
      description:
        "Our research paper on Real-time Human Activity Surveillance System focuses on addressing human activity anomalies using HTML, CSS, JavaScript, Python, SQLite3, OpenCV, and MediaPipe. This work contributes significantly to the field by proposing innovative solutions for real-time surveillance and monitoring.",
      link: "https://ijarsct.co.in/Paper19267.pdf",
      year: "2024",
      category: "Research Publication",
      highlight: false,
      gradient: "from-purple-500 to-pink-500",
      technologies: ["Computer Vision", "Image Processing", "Python", "Research"]
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      "Hackathon": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      "Machine Learning": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Business Intelligence": "bg-green-500/10 text-green-600 border-green-500/20",
      "Research Publication": "bg-purple-500/10 text-purple-600 border-purple-500/20",
    }
    return colors[category as keyof typeof colors] || "bg-primary/10 text-primary border-primary/20"
  }

  return (
    <div className="space-y-8" ref={ref}>
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
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Medal className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">
            My <span className="text-primary">Achievements</span>
          </h2>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Crown className="w-6 h-6 text-amber-500" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mx-auto mb-4"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Recognitions and accomplishments throughout my academic and professional journey, showcasing excellence in innovation and technology.
        </motion.p>
        
        <motion.div 
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {["🏆 Winners", "🎯 Finalist", "📚 Publications"].map((badge, index) => (
            <motion.div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ 
                  rotate: index === 1 ? [0, 360] : [0, -360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                {index === 0 ? (
                  <Trophy className="w-4 h-4 text-yellow-500" />
                ) : index === 1 ? (
                  <Target className="w-4 h-4 text-primary" />
                ) : (
                  <FileText className="w-4 h-4 text-purple-500" />
                )}
              </motion.div>
              <span className="text-sm font-medium">{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-6">
        {achievements.map((achievement, index) => (
          <motion.div key={index} variants={item}>
            <Card className={`overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:border-primary/50 group relative ${
              achievement.highlight ? 'ring-2 ring-primary/20' : ''
            }`}>
                {achievement.highlight && (
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
                        duration: 6, 
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
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.div 
                      className="shrink-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div 
                        className={`p-4 rounded-xl bg-gradient-to-br ${achievement.gradient} text-white shadow-lg relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          animate={{ 
                            y: [0, -2, 0],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {React.createElement(achievement.icon, { className: "w-8 h-8 relative z-10" })}
                        </motion.div>
                      </motion.div>
                      
                      <motion.div
                        className="mt-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {achievement.year}
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.div
                        className="flex items-start justify-between mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex-1">
                          <motion.h3 
                            className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 leading-tight"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {achievement.title}
                          </motion.h3>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getCategoryColor(achievement.category)} mb-3`}
                            >
                              {achievement.category}
                            </Badge>
                          </motion.div>
                        </div>
                        
                        <motion.div
                          className="shrink-0 ml-4"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {React.createElement(achievement.icon, { className: "w-6 h-6 text-primary/60" })}
                        </motion.div>
                      </motion.div>
                      
                      <motion.p 
                        className="text-muted-foreground leading-relaxed mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {achievement.description}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {achievement.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.7 + techIndex * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="secondary" className="text-xs bg-background/50">
                              <Code className="w-3 h-3 mr-1" />
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between pt-4 border-t border-border/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {achievement.link ? "Research Available" : "Competition Achievement"}
                          </span>
                        </div>
                        
                        {achievement.link && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button variant="outline" size="sm" asChild className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                              <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                  <Download className="w-4 h-4" />
                                </motion.div>
                                Download Paper
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
