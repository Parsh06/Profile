"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import FloatingNav from "@/components/floating-nav"
import Loader from "@/components/loader"
import ParticlesBackground from "@/components/particles-background"
import AboutSection from "@/components/sections/about-section"
import ResumeSection from "@/components/sections/resume-section"
import ProjectsSection from "@/components/sections/projects-section"
import AchievementsSection from "@/components/sections/achievements-section"
import ContactSection from "@/components/sections/contact-section"
import { StarsCanvas } from "@/components/canvas/stars"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const sections = {
    about: <AboutSection />,
    resume: <ResumeSection />,
    projects: <ProjectsSection />,
    achievements: <AchievementsSection />,
    contact: <ContactSection />,
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className="min-h-screen animated-gradient">
      <div className="relative z-0">
        <StarsCanvas />
        <ParticlesBackground />

        <Navbar
          toggleSidebar={toggleSidebar}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="container mx-auto px-4 pt-24 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-full max-w-5xl mx-auto",
                "bg-card/50 backdrop-blur-sm rounded-xl shadow-lg",
                "p-6 md:p-8 border border-border/50",
                "card-3d",
              )}
            >
              {sections[activeSection as keyof typeof sections]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:hidden">
          <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
      </div>
    </main>
  )
}
