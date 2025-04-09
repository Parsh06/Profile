"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  FileText,
  Briefcase,
  Award,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  X,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isMobile: boolean
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
  isMobile,
}: SidebarProps) {
  const navItems = [
    { id: "about", label: "About", icon: Home },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "contact", label: "Contact", icon: MessageSquare },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/Parsh06", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/parsh-jain-a50091253/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/parshjain_06/", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/PARSHMJAIN", label: "Twitter" },
  ]

  const contactInfo = [
    { icon: Mail, label: "Email", value: "parshjain46@gmail.com", href: "mailto:parshjain46@gmail.com" },
    { icon: Phone, label: "Phone", value: "9619261352", href: "tel:9619261352" },
    { icon: Calendar, label: "Birthday", value: "06/04/2004", href: null },
    { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra", href: null },
  ]

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isOpen) {
        const target = e.target as HTMLElement
        if (!target.closest(".sidebar") && !target.closest("[data-sidebar-toggle]")) {
          setIsOpen(false)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isOpen, setIsOpen])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, isOpen])

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: isMobile ? "-100%" : 0,
      opacity: isMobile ? 0 : 1,
      width: isMobile ? "0" : "5rem",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  }

  if (isMobile) {
    // In mobile view, render a centered modal container with extra right margin.
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="flex flex-col items-center space-y-6 p-4 mr-12 bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg rounded-full">
                {/* Navigation Options arranged in a centered horizontal row */}
                <div className="flex items-center justify-center space-x-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all"
                      onClick={() => {
                        setActiveSection(item.id)
                        setIsOpen(false)
                      }}
                    >
                      <item.icon
                        className={`w-5 h-5 ${activeSection === item.id ? "text-primary-foreground" : "text-muted-foreground"}`}
                      />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  ))}
                </div>
                {/* You may include additional elements (social links or contact info) here if needed */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop Sidebar view
  return (
    <>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.aside
        className={`sidebar fixed top-0 left-0 z-50 h-screen bg-card/80 backdrop-blur-lg border-r border-border/50 shadow-xl overflow-hidden ${
          isMobile ? "w-3/4 max-w-xs" : isOpen ? "w-72" : "w-20"
        }`}
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isOpen || !isMobile ? "open" : "closed"}
      >
        {isMobile && (
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        )}
        <ScrollArea className="h-full">
          <div className="flex flex-col items-center p-4">
            {/* Profile */}
            <div className={`flex flex-col items-center space-y-4 my-6 ${!isOpen && !isMobile ? "scale-75" : ""}`}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-purple-600 blur opacity-70 animate-pulse" />
                <Avatar className="w-24 h-24 border-2 border-primary relative">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Parsh Jain" />
                  <AvatarFallback className="text-2xl">PJ</AvatarFallback>
                </Avatar>
              </motion.div>
              {(isOpen || isMobile) && (
                <div className="text-center">
                  <motion.h1
                    className="text-xl font-bold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Parsh Jain
                  </motion.h1>
                  <motion.div
                    className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mt-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Developer
                  </motion.div>
                </div>
              )}
            </div>
            {/* Navigation */}
            <nav className="w-full mt-8 mr-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${!isOpen && !isMobile ? "justify-center px-2" : ""}`}
                      onClick={() => {
                        setActiveSection(item.id)
                        if (isMobile) setIsOpen(false)
                      }}
                    >
                      <item.icon className={`w-5 h-5 ${activeSection === item.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      {(isOpen || isMobile) && <span>{item.label}</span>}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Contact Info */}
            {(isOpen || isMobile) && (
              <>
                <Separator className="my-6" />
                <div className="w-full space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 rounded-md bg-primary/10 text-primary">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Social Links */}
                <Separator className="my-6" />
                <div className="flex justify-center gap-4 w-full">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      aria-label={link.label}
                    >
                      <link.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </>
            )}
            {/* Collapsed Social Links (for desktop when sidebar is collapsed) */}
            {!isOpen && !isMobile && (
              <div className="mt-auto pt-6 pb-4 w-full">
                <div className="flex flex-col items-center gap-3">
                  {socialLinks.slice(0, 3).map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      aria-label={link.label}
                    >
                      <link.icon className="w-3.5 h-3.5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </motion.aside>
    </>
  )
}
