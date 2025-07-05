"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Zap, Star, Rocket, Brain, Heart, Coffee } from "lucide-react"

const floatingIcons = [Code, Palette, Zap, Star, Rocket, Brain, Heart, Coffee]

const statusMessages = [
  "Initializing workspace...",
  "Loading projects...",
  "Configuring experience...",
  "Preparing portfolio...",
  "Almost ready..."
]

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let progressValue = 0
    const timer = setInterval(() => {
      progressValue += Math.random() * 8 + 2 // Ensure steady progress
      
      if (progressValue >= 95 && progressValue < 100) {
        // Slow down near the end for dramatic effect
        progressValue += 0.5
      } else if (progressValue >= 100) {
        progressValue = 100
        setIsComplete(true)
        clearInterval(timer)
      }
      
      setProgress(progressValue)
    }, 150)

    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % statusMessages.length)
    }, 1200)

    return () => {
      clearInterval(timer)
      clearInterval(messageTimer)
    }
  }, [])

  // Calculate the angle for the PJ circle position (0 to 360 degrees)
  const angle = (progress / 100) * 360
  const radius = 80
  const centerX = 120
  const centerY = 120
  
  // Calculate position on the circle
  const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180))
  const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180))

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
              backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.3 + 0.1})`
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          >
            <div 
              className="bg-gradient-to-r from-primary/20 to-purple-500/20 blur-sm"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                borderRadius: Math.random() > 0.5 ? '50%' : '20%'
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative text-center"
      >
        {/* Floating Icons */}
        {floatingIcons.map((Icon, index) => {
          const iconAngle = (index * 45) + (progress * 2)
          const iconRadius = 150 + Math.sin(Date.now() * 0.001 + index) * 20
          const iconX = centerX + iconRadius * Math.cos(iconAngle * (Math.PI / 180))
          const iconY = centerY + iconRadius * Math.sin(iconAngle * (Math.PI / 180))
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: iconX - 12,
                top: iconY - 12
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, delay: index * 0.2 }
              }}
            >
              <Icon className="w-6 h-6 text-primary/40" />
            </motion.div>
          )
        })}

        {/* Main circular progress container */}
        <div className="relative w-60 h-60 mb-8">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
            <circle
              cx="120"
              cy="120"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="120"
              cy="120"
              r="80"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 80}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - progress / 100) }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* PJ Circle that moves along the progress ring */}
          <motion.div
            className="absolute"
            style={{
              left: x - 20,
              top: y - 20
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 hsl(var(--primary) / 0.7)",
                  "0 0 0 10px hsl(var(--primary) / 0)",
                  "0 0 0 0 hsl(var(--primary) / 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"
            >
              <motion.span
                className="text-sm font-bold text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                PJ
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 mb-2 mx-auto text-primary"
              >
                <Zap className="w-full h-full" />
              </motion.div>
              <motion.div
                key={progress}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl font-bold text-primary"
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl font-bold mb-2"
        >
          <motion.span
            animate={{ color: ["hsl(var(--primary))", "#8b5cf6", "hsl(var(--primary))"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Parsh
          </motion.span>{" "}
          <span className="text-foreground">Jain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-muted-foreground mb-6 text-lg"
        >
          Developer & Designer
        </motion.p>

        {/* Animated status messages */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              {statusMessages[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
