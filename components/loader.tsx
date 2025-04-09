"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-600 blur opacity-70 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-card flex items-center justify-center border-2 border-primary">
            <span className="text-3xl font-bold text-primary">PJ</span>
          </div>
        </motion.div>

        <h1 className="text-2xl font-bold mb-2">
          <span className="text-primary">Parsh</span> Jain
        </h1>
        <p className="text-muted-foreground mb-6">Developer & Designer</p>

        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-muted-foreground">Loading experience... {Math.round(progress)}%</p>
      </motion.div>
    </div>
  )
}
