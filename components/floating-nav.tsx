"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, FileText, Briefcase, Award, MessageSquare, Star, X } from "lucide-react"
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
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Calculate positions in a circle around the center button
  const getButtonPosition = (index: number, totalItems: number) => {
    // Adjust radius based on screen size
    const isMobile = windowSize.width < 640
    const radius = isMobile ? 55 : 65
    
    // For smaller screens, use a semi-circle instead of full circle
    // to prevent items from going off screen
    const angleStep = isMobile 
      ? Math.PI / (totalItems - 1) // Semi-circle for mobile
      : (2 * Math.PI) / totalItems // Full circle for larger screens
    
    // Start from left on mobile (to keep items on screen)
    const startAngle = isMobile ? Math.PI : -Math.PI / 2
    const angle = startAngle + (index * angleStep)
    
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    
    return { x, y }
  }

  return (
    <div className="fixed bottom-6 right-12 z-50 md:right-24"> {/* Increased right property */}{/* Adjusted right property */}
  {/* Backdrop for closing menu when clicking outside */}
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-40"
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
                duration: 0.3,
                delay: 0.05 * index,
              }}
              onClick={() => {
                setActiveSection(item.id)
                setIsOpen(false)
              }}
              className={cn(
                "absolute flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full shadow-lg transition-all",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground scale-110"
                  : "bg-white text-gray-700 hover:bg-primary/20"
              )}
            >
              <item.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="sr-only">{item.label}</span>
            </motion.button>
          )
        })}
    </AnimatePresence>

    {/* Main toggle button */}
    <motion.button
      onClick={toggleMenu}
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground shadow-xl"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Star className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  </div>
</div>
  )
}