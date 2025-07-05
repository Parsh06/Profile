"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  User, 
  FileText, 
  FolderOpen, 
  Trophy, 
  Mail, 
  MessageCircle, 
  Sparkles,
  Code
} from "lucide-react"

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  toggleSidebar: () => void
}

export default function Navbar({ activeSection, setActiveSection, toggleSidebar }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { id: "about", label: "About", icon: User },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "ChatNow", label: "ChatNow", icon: MessageCircle },
  ]

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
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2 text-xl font-bold cursor-pointer group"
          onClick={() => setActiveSection("about")}
        >
          <motion.div 
            className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code className="w-5 h-5 text-primary" />
          </motion.div>
          <div className="relative">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Parsh
            </span>
            <span className="ml-1 text-foreground">Jain</span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: activeSection === "about" ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="ml-1"
          >
            <Sparkles className="w-4 h-4 text-primary opacity-60" />
          </motion.div>
        </motion.div>

        {/* Desktop Navigation - Only visible on desktop */}
        <motion.div 
          className="hidden lg:flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <nav className="flex items-center space-x-1 p-2 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm border border-border/50">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => setActiveSection(item.id)}
                    className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-gradient-to-r from-primary to-purple-500 text-primary-foreground shadow-lg hover:shadow-xl" 
                        : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-primary"}`} />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    {/* Active indicator */}
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  </Button>
                </motion.div>
              )
            })}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  )
}