"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, FileText, Briefcase, Award, MessageSquare, Star, X, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingNavProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function FloatingNav({ activeSection, setActiveSection }: FloatingNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  // Update window dimensions when resized
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { id: "about", label: "About", icon: Home },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "contact", label: "Contact", icon: MessageSquare },
   { id: "ChatNow", label: "ChatNow", icon: Bot }

  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Calculate positions in a circle around the center button
  const getButtonPosition = (index: number, totalItems: number) => {
    // Adjust radius based on screen size with better spacing
    const isMobile = windowSize.width < 640
    const radius = isMobile ? 80 : 100 // Increased radius for better spacing
    
    // Create a semi-circle arc upward (top half of circle)
    // Total arc of 180 degrees (π radians) - from left to right via top
    const totalAngle = Math.PI // 180 degrees
    const angleStep = totalAngle / (totalItems - 1) // Divide arc evenly
    
    // Start from left (π radians) and go to right (0 radians) via top
    // This creates an upward semicircle
    const startAngle = Math.PI
    const angle = startAngle - (index * angleStep) // Subtract to go counter-clockwise
    
    const x = radius * Math.cos(angle)
    const y = -radius * Math.sin(angle) // Negative y to flip upward
    
    return { x, y }
  }

  return (
    <div className="fixed bottom-8 right-16 z-50 md:bottom-10 md:right-20">
      {/* Backdrop for closing menu when clicking outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-50">
        {/* Navigation items */}
        <AnimatePresence>
          {isOpen &&
            navItems.map((item, index) => {
              const position = getButtonPosition(index, navItems.length)

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    x: position.x,
                    y: position.y,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.05 * index,
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "absolute flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl transition-all backdrop-blur-sm border-2",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground border-primary scale-110 shadow-primary/30"
                      : "bg-white/90 text-gray-700 hover:bg-primary/10 border-white/20 hover:border-primary/30 hover:text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="sr-only">{item.label}</span>
                </motion.button>
              )
            })}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          onClick={toggleMenu}
          initial={{ scale: 1 }}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl border-4 border-white/20 backdrop-blur-sm hover:shadow-primary/30 transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: 180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-7 h-7 md:w-8 md:h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -180 }}
                transition={{ duration: 0.3 }}
              >
                <Star className="w-7 h-7 md:w-8 md:h-8" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse effect when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </motion.button>
      </div>
    </div>
  )
}