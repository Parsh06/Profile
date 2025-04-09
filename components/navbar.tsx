"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  toggleSidebar: () => void // ✅ added this
}

export default function Navbar({ activeSection, setActiveSection, toggleSidebar }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold"
        >
          <span className="text-primary">Parsh</span> Jain
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center space-x-1">
            {["about", "resume", "projects", "achievements", "contact"].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? "default" : "ghost"}
                onClick={() => setActiveSection(section)}
                className="capitalize"
              >
                {section}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}