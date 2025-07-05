"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Loader2, MessageCircle, Sparkles, Zap, Brain, Cpu, Briefcase, BookOpen, Users, Rocket, Star, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const BACKEND_URL = '/api'

export default function ChatSectionEnhanced() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hello! I'm Parsh's AI assistant with comprehensive knowledge about his professional journey.\n\n🚀 **Key Highlights:**\n• **3+ years** of experience\n• **3 successful internships** (Barclays, MBP Trust, Falcon X)\n• **13+ completed projects**\n• **3+ hackathons** participated\n\n🤔 **What would you like to know about Parsh?**\n\n💡 Try asking about his internships, technical skills, projects, or availability for opportunities!\n\n**Note**: I provide detailed, accurate information from his complete professional profile! ✨",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isTyping])

  // Focus input after sending message
  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus()
    }
  }, [isTyping])

  // Call Parsh API through Next.js API route with ultra-fast settings
  const getBotResponse = async (userInput: string): Promise<string> => {
    try {
      // Create AbortController with faster timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000) // 4 second timeout

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userInput.trim()
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 429) {
          return "⏰ I'm receiving many requests right now. Here's what I know about Parsh: He's a **Full Stack Developer** with **Barclays experience**, skilled in **React, Python, JavaScript, AI/ML**. Try again in a moment! 😊"
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Add source indicator to response
      let responseText = data.response || "I'm sorry, I couldn't generate a response. Please try again."
      
      if (data.source === 'fallback') {
        responseText += `\n\n*💡 Fast response from knowledge base!*`
      }
      
      return responseText
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return "⚡ **Quick Info**: Parsh is a talented **Full Stack Developer** with **Barclays experience**, skilled in **React, Python, JavaScript, TypeScript, AI/ML**. **B.Tech with AI Honours** graduate. **Available for opportunities!** 🚀"
      }
      console.error('Error calling API:', error)
      return "🔧 **Quick Overview**: Parsh is an experienced developer with expertise in **modern web technologies** and **AI/ML**. **Barclays intern** with strong skills in **React, Python, and full-stack development**. Try asking again! 💪"
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input.trim()
    setInput("")
    setIsTyping(true)

    // Show immediate "thinking" message for faster perceived response
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "⚡ Analyzing...",
      sender: "bot",
      timestamp: new Date(),
    }
    
    // Add thinking message after very short delay
    setTimeout(() => {
      if (isTyping) {
        setMessages(prev => [...prev, thinkingMessage])
      }
    }, 150)

    try {
      // Start the API call immediately
      const startTime = Date.now()
      const botResponse = await getBotResponse(currentInput)
      const responseTime = Date.now() - startTime
      
      // If response was very fast, add small delay to show thinking message
      const minDisplayTime = 600
      const remainingTime = Math.max(0, minDisplayTime - responseTime)
      
      setTimeout(() => {
        // Remove thinking message and add real response
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== thinkingMessage.id)
          const realBotMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: botResponse,
            sender: "bot",
            timestamp: new Date(),
          }
          return [...filtered, realBotMessage]
        })
        setIsTyping(false)
      }, remainingTime)
      
    } catch (error) {
      console.error('Error getting bot response:', error)
      
      // Remove thinking message and add error response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== thinkingMessage.id)
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: "I'm sorry, I encountered an error. Please try again!",
          sender: "bot",
          timestamp: new Date(),
        }
        return [...filtered, errorMessage]
      })
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to JSX
    const parts = content.split(/(\*\*.*?\*\*|\n)/g)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-primary">{part.slice(2, -2)}</strong>
      }
      if (part === "\n") {
        return <br key={index} />
      }
      return part
    })
  }

  const suggestedQuestions = [
    { text: "What are Parsh's technical skills?", icon: Cpu, gradient: "from-blue-500/10 to-cyan-500/10", accent: "text-blue-500" },
   { text: "What's his educational background?", icon: BookOpen, gradient: "from-orange-500/10 to-red-500/10", accent: "text-orange-500" },
    { text: "Tell me about his volunteering experience", icon: Users, gradient: "from-green-500/10 to-lime-500/10", accent: "text-green-500" },
    { text: "Is he available for new opportunities?", icon: Rocket, gradient: "from-indigo-500/10 to-violet-500/10", accent: "text-indigo-500" },
  ]

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10 px-4 md:px-6 lg:px-8 relative">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary relative overflow-hidden">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 relative z-10" />
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </div>
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-background"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                ChatNow
              </motion.h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                </motion.div>
                <motion.span 
                  className="text-xs md:text-sm text-muted-foreground"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                Parsh AI
                </motion.span>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                </motion.div>
              </div>
            </div>
          </div>
          <motion.p 
            className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ask me anything about Parsh's experience, skills, projects, and background. 
            I'm here to provide detailed insights about his professional journey!
          </motion.p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:h-[700px]">
        {/* AI-Powered Assistant Card - First on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="xl:hidden order-1"
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
            <CardContent className="p-4 md:p-6">
              <div className="text-center space-y-3 md:space-y-4">
                <div className="relative mx-auto w-12 h-12 md:w-16 md:h-16">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-primary to-purple-500 rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-background"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-lg mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    AI-Powered Assistant
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    I have comprehensive knowledge about Parsh's background, skills, projects, and achievements. 
                    Ask me anything and I'll provide detailed, accurate responses!
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Powered by Parsh AI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat Interface - Second on Mobile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:col-span-2 order-2 xl:order-1 xl:h-full relative"
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          
          <Card className="h-[500px] md:h-[600px] xl:h-full flex flex-col bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden relative z-10">
            <CardHeader className="pb-3 md:pb-4 border-b border-border/50 flex-shrink-0 relative">
              {/* Sound wave animation when active */}
              {isTyping && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-full"
                      animate={{
                        height: [4, 12, 4],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
              
              <CardTitle className="flex items-center gap-2 md:gap-3 text-base md:text-lg lg:text-xl">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Bot className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary" />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-bold truncate">
                      Parsh's AI Assistant
                    </span>
                    <motion.div 
                      className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500 border border-green-500/20 flex-shrink-0 flex items-center gap-1"
                      animate={{
                        boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.1)', '0 0 0 4px rgba(34, 197, 94, 0.1)', '0 0 0 0 rgba(34, 197, 94, 0.1)']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        animate={{
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                      Online
                    </motion.div>
                  </div>
                  <motion.p 
                    className="text-xs text-muted-foreground mt-1 hidden md:block"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    Ready to answer your questions!
                  </motion.p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-3 md:gap-4 p-0 min-h-0 overflow-hidden">
              {/* Messages Area */}
              <ScrollArea className="flex-1 px-3 md:px-4 lg:px-6 max-h-[350px] md:max-h-[450px] lg:max-h-[550px] overflow-y-auto" ref={scrollAreaRef}>
                <div className="space-y-3 md:space-y-4 lg:space-y-6 py-3 md:py-4 min-h-0">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex gap-3 md:gap-4",
                          message.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.sender === "bot" && (
                          <motion.div 
                            className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg relative overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {/* Animated background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl"
                              animate={{
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                            />
                            <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary relative z-10" />
                          </motion.div>
                        )}
                        
                        <motion.div
                          className={cn(
                            "max-w-[90%] md:max-w-[85%] lg:max-w-[75%] rounded-2xl px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 break-words shadow-lg relative overflow-hidden",
                            message.sender === "user"
                              ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ml-auto"
                              : "bg-gradient-to-br from-muted/80 to-muted/60 backdrop-blur-sm border border-border/50"
                          )}
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {/* Message shimmer effect */}
                          {message.sender === "bot" && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                              }}
                            />
                          )}
                          
                          <div className="text-xs md:text-sm lg:text-base leading-relaxed whitespace-pre-wrap relative z-10">
                            {formatMessage(message.content)}
                          </div>
                          <motion.div 
                            className={cn(
                              "text-xs mt-2 flex items-center gap-1 relative z-10",
                              message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span>{message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</span>
                            {message.sender === "bot" && (
                              <>
                                <span>•</span>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Sparkles className="w-3 h-3" />
                                </motion.div>
                                <span>AI</span>
                              </>
                            )}
                          </motion.div>
                        </motion.div>

                        {message.sender === "user" && (
                          <motion.div 
                            className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/60 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg relative overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {/* User avatar glow */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl"
                              animate={{
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            />
                            <User className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex gap-3 md:gap-4"
                    >
                      <motion.div 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 shadow-lg relative"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </motion.div>
                      </motion.div>
                      <motion.div 
                        className="bg-gradient-to-br from-muted/80 to-muted/60 backdrop-blur-sm border border-border/50 rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-lg relative overflow-hidden"
                      >
                        {/* Animated background shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                        
                        <div className="flex items-center gap-2 relative z-10">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div 
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                          <motion.span 
                            className="text-sm text-muted-foreground"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            AI is analyzing...
                          </motion.span>
                          <motion.div
                            animate={{ 
                              rotate: 360,
                              scale: [1, 1.2, 1],
                            }}
                            transition={{ 
                              rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                              scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-primary" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <motion.div 
                className="p-3 md:p-4 lg:p-6 border-t border-border/50 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm flex-shrink-0 relative"
              >
                {/* Animated border top */}
                <motion.div
                  className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
                  animate={{
                    width: ['0%', '100%', '0%'],
                    left: ['0%', '0%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                
                <div className="flex gap-2 md:gap-3 items-end">
                  <div className="flex-1 relative min-w-0">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about Parsh's skills, experience..."
                        className="pr-10 md:pr-12 py-2 md:py-3 rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 resize-none text-sm md:text-base transition-all duration-300"
                        disabled={isTyping}
                      />
                    </motion.div>
                    <motion.div 
                      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2"
                      animate={{
                        rotate: input ? 360 : 0,
                        scale: input ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        rotate: { duration: 0.5 },
                        scale: { duration: 0.3, repeat: input ? Number.POSITIVE_INFINITY : 0, repeatDelay: 2 },
                      }}
                    >
                      {input ? (
                        <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                      ) : (
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!input.trim() || isTyping}
                      size="icon"
                      className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                      {/* Button glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                      
                      <motion.div
                        className="relative z-10"
                        animate={isTyping ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: isTyping ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                      >
                        {isTyping ? (
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <motion.div
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.div>
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Suggested Questions Sidebar - Third on Mobile, Hidden Quick Questions on Desktop in Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 md:space-y-6 lg:space-y-8 order-3 xl:order-2 xl:h-full"
        >
          {/* Quick Questions Card - Third on Mobile */}
          <Card className="xl:hidden bg-gradient-to-br from-card/10 to-card/10 backdrop-blur-xl border-border/50 shadow-xl">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg lg:text-xl flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent truncate">
                  Quick Questions
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3 pb-4 md:pb-6">
              {suggestedQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-full text-left justify-start h-auto p-2 md:p-3 lg:p-4 text-wrap text-xs md:text-sm lg:text-base group border-border/50 rounded-xl transition-all duration-300 relative overflow-hidden",
                      `hover:bg-gradient-to-r hover:${question.gradient} hover:border-primary/30`
                    )}
                    onClick={() => {
                      setInput(question.text)
                      setTimeout(() => handleSendMessage(), 100)
                    }}
                    disabled={isTyping}
                  >
                    {/* Animated background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${question.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      whileHover={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    
                    <div className="flex items-center gap-2 md:gap-3 w-full min-w-0 relative z-10">
                      <motion.div 
                        className={cn(
                          "p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all duration-300 flex-shrink-0",
                          question.gradient.replace('/10', '/20')
                        )}
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: 1.1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <question.icon className={cn("w-3 h-3 md:w-4 md:h-4 transition-colors duration-300", question.accent, "group-hover:scale-110")} />
                      </motion.div>
                      <span className="flex-1 text-left truncate md:whitespace-normal group-hover:text-foreground transition-colors duration-300">{question.text}</span>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          x: [0, 3, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                      </motion.div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden xl:block space-y-4 md:space-y-6 lg:space-y-8">
            <Card className="bg-gradient-to-br from-card/10 to-card/10 backdrop-blur-xl border-border/50 shadow-xl">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-base md:text-lg lg:text-xl flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent truncate">
                    Quick Questions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3 pb-4 md:pb-6">
                {suggestedQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3,
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10 
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-full text-left justify-start h-auto p-2 md:p-3 lg:p-4 text-wrap text-xs md:text-sm lg:text-base group border-border/50 rounded-xl transition-all duration-300 relative overflow-hidden",
                        `hover:bg-gradient-to-r hover:${question.gradient} hover:border-primary/30`
                      )}
                      onClick={() => {
                        setInput(question.text)
                        setTimeout(() => handleSendMessage(), 100)
                      }}
                      disabled={isTyping}
                    >
                      {/* Animated background on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${question.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        whileHover={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                      
                      <div className="flex items-center gap-2 md:gap-3 w-full min-w-0 relative z-10">
                        <motion.div 
                          className={cn(
                            "p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all duration-300 flex-shrink-0",
                            question.gradient.replace('/10', '/20')
                          )}
                          whileHover={{
                            rotate: [0, -10, 10, 0],
                            scale: 1.1,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                        >
                          <question.icon className={cn("w-3 h-3 md:w-4 md:h-4 transition-colors duration-300", question.accent, "group-hover:scale-110")} />
                        </motion.div>
                        <span className="flex-1 text-left truncate md:whitespace-normal group-hover:text-foreground transition-colors duration-300">{question.text}</span>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            x: [0, 3, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        </motion.div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
