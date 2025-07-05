"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { Card, CardContent } from "../ui/card"
import { 
  Code, 
  Cpu, 
  Database, 
  Layout, 
  GraduationCap,
  MapPin,
  Calendar,
  Trophy,
  Zap,
  Star,
  Target,
  Brain,
  Rocket,
  Heart,
  Users,
  Award,
  Sparkles,
  Coffee,
  GitBranch,
  Lightbulb,
  Globe
} from "lucide-react"
import { StarsCanvas } from "@/components/canvas/stars"
import { Tilt } from "@/components/ui/tilt"

export default function AboutSection() {
  const ref = useRef(null)
  const aboutRef = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true })
  const isAboutInView = useInView(aboutRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })

  // Animated counter for stats
  const [projectCount, setProjectCount] = useState(0)
  const [techCount, setTechCount] = useState(0)
  const [hackathonCount, setHackathonCount] = useState(0)
  const [experienceCount, setExperienceCount] = useState(0)

  useEffect(() => {
    if (isStatsInView) {
      // Animate numbers when stats come into view
      const projectAnimation = animate(0, 13, {
        duration: 2,
        onUpdate: (value) => setProjectCount(Math.floor(value))
      })
      const techAnimation = animate(0, 15, {
        duration: 2.2,
        onUpdate: (value) => setTechCount(Math.floor(value))
      })
      const hackathonAnimation = animate(0, 5, {
        duration: 1.8,
        onUpdate: (value) => setHackathonCount(Math.floor(value))
      })
      const expAnimation = animate(0, 3, {
        duration: 1.5,
        onUpdate: (value) => setExperienceCount(Math.floor(value))
      })

      return () => {
        projectAnimation.stop()
        techAnimation.stop()
        hackathonAnimation.stop()
        expAnimation.stop()
      }
    }
  }, [isStatsInView])

  const services = [
    {
      icon: Layout,
      title: "Web Design",
      description: "Create high quality website design as per required.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Write codes for the Designed Website Integrating full features to it.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Database,
      title: "Data Analysis",
      description: "Analyzing and interpreting data to derive meaningful insights and make informed decisions.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Cpu,
      title: "Hackathon",
      description: "Participate in Hackathons to solve real world problems.",
      gradient: "from-purple-500 to-pink-500"
    },
  ]

  const highlights = [
    { icon: GraduationCap, label: "B.Tech AI Student", color: "text-blue-500" },
    { icon: MapPin, label: "Mumbai, India", color: "text-green-500" },
    { icon: Trophy, label: "Multiple Awards", color: "text-yellow-500" },
    { icon: Users, label: "Team Player", color: "text-purple-500" },
    { icon: Coffee, label: "Coffee Lover", color: "text-orange-500" },
    { icon: Lightbulb, label: "Problem Solver", color: "text-cyan-500" }
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="space-y-12 relative">
      <StarsCanvas />

      {/* About Me Section */}
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Grid layout: Text (with image) + Stats card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column: Image + About Me Text */}
          <div className="md:col-span-2 space-y-8">
            {/* Animated profile section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image with floating animation */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur opacity-30 animate-pulse"></div>
                <img
                  src="/Parsh_photoCopy1.jpg"
                  alt="Parsh Jain"
                  className="
                    relative w-32 h-32 md:w-40 md:h-40
                    rounded-full object-cover
                    border-4 border-primary/50
                    shadow-2xl
                  "
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Name and title */}
              <div className="text-center md:text-left">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                  Parsh Jain
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-2"
                >
                  <Brain className="w-5 h-5 text-primary" />
                  Full-Stack Developer & AI Enthusiast
                </motion.p>
              </div>
            </div>

            {/* Animated highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isAboutInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <highlight.icon className={`w-4 h-4 ${highlight.color}`} />
                  <span className="text-sm font-medium">{highlight.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* About text with typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tight pb-2 border-b border-primary/20 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary" />
                About <span className="text-primary">Me</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer and B.Tech student with Honours in Artificial Intelligence at K.J. Somaiya College of Engineering. I specialize in crafting dynamic, user-friendly web applications and integrating machine learning to solve impactful problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a strong foundation in technologies like React, Node.js, Python, and Firebase, I love turning ideas into functional digital experiences. Whether it's building scalable systems, analyzing data, or contributing to hackathons, I'm driven by curiosity and the desire to create meaningful tech solutions.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Enhanced Stats Card */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-6 border border-border/50">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  My Journey
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">{experienceCount}+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </motion.div>
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Rocket className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">{projectCount}+</h3>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </motion.div>
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">{techCount}+</h3>
                  <p className="text-sm text-muted-foreground">Technologies</p>
                </motion.div>
                <motion.div
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">{hackathonCount}+</h3>
                  <p className="text-sm text-muted-foreground">Hackathons</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Section with enhanced cards */}
      <div ref={ref} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-primary" />
            What I'm <span className="text-primary">Doing</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating innovative solutions through technology, design, and data-driven insights.
          </p>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Tilt>
                <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:border-primary/50 min-h-[180px] relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`}></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <service.icon className="w-6 h-6" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Floating icons for visual appeal */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-10"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <service.icon className="w-16 h-16" />
                    </motion.div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
