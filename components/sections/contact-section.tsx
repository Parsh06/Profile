"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import emailjs from "emailjs-com"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { 
  AlertCircle, 
  Mail, 
  Send, 
  Check, 
  ExternalLink, 
  X, 
  Instagram, 
  Github, 
  Linkedin,
  MapPin,
  Globe,
  MessageCircle,
  Phone,
  Clock,
  User,
  MessageSquare,
  Sparkles,
  Zap,
  Rocket,
  Heart,
  Star,
  Coffee,
  Wifi
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid and active email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onChange",
  })
  const { handleSubmit, formState, reset } = form
  const { isValid } = formState

  const socialLinks = [
    { 
      icon: X, 
      title: "X", 
      link: "https://x.com/PARSHMJAIN",
      color: "hover:bg-black hover:text-white",
      gradient: "from-gray-600 to-black"
    },
    { 
      icon: Instagram, 
      title: "Instagram", 
      link: "https://www.instagram.com/parshjain_06/",
      color: "hover:bg-pink-500 hover:text-white",
      gradient: "from-pink-500 to-purple-600"
    },
    { 
      icon: Github, 
      title: "GitHub", 
      link: "https://github.com/Parsh06",
      color: "hover:bg-gray-800 hover:text-white",
      gradient: "from-gray-700 to-gray-900"
    },
    { 
      icon: Linkedin, 
      title: "LinkedIn", 
      link: "https://www.linkedin.com/in/parsh-jain-a50091253/",
      color: "hover:bg-blue-600 hover:text-white",
      gradient: "from-blue-500 to-blue-700"
    },
    { 
      icon: Mail, 
      title: "Email", 
      link: "mailto:parshjain46@gmail.com",
      color: "hover:bg-red-500 hover:text-white",
      gradient: "from-red-500 to-orange-500"
    },
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      value: "Mumbai, India",
      description: "Available for remote work worldwide",
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24-48 hours",
      description: "I'll get back to you quickly",
      color: "text-blue-500"
    },
    {
      icon: Coffee,
      title: "Let's Chat",
      value: "Always Open",
      description: "Coffee chat or project discussion",
      color: "text-orange-500"
    }
  ]
  

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      // Google Sheets Integration
      const sheetUrl =
        "https://script.google.com/macros/s/AKfycbxg30NKDAbK3qAh5F2f9yRjIuV5uV2KmU63XW03jvD0r7j8Yc8iZ4Y7wPu5VeZnV-Vz/exec"
      const sheetData = new FormData()
      sheetData.append("name", values.name)
      sheetData.append("email", values.email)
      sheetData.append("subject", values.subject || "No Subject")
      sheetData.append("message", values.message)

      try {
        await fetch(sheetUrl, {
          method: "POST",
          body: sheetData,
          mode: "no-cors",
        })
      } catch {
        // ignore sheet errors
      }

      // EmailJS Integration
      const templateParams = {
        name: values.name,
        email: values.email,
        subject: values.subject || "Contact Form Submission",
        message: values.message,
        date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        website_url: "https://parshportfolio.vercel.app/",
      }

      const emailResponse = await emailjs.send(
        "service_jeml01f",
        "template_j0ysepg",
        templateParams,
        "Zgo7mVEjjmlF__AdF",
      )

      if (emailResponse.status !== 200) throw new Error("Failed to send email notification")

      reset()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting me. I'll get back to you soon.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: (error as Error).message || "Failed to send your message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8" ref={ref}>
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative inline-block"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 pb-2 border-b border-primary/20 relative">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Contact
            </motion.span>
            <motion.span 
              className="text-primary ml-2"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Me
            </motion.span>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </h2>
        </motion.div>
        <motion.p 
          className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Let's connect and create something amazing together! I'm always excited about new opportunities and collaborations.
        </motion.p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {contactInfo.map((info, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="group"
          >
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30">
              <CardContent className="p-6 text-center">
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${
                    idx === 0 ? 'from-green-500 to-emerald-600' :
                    idx === 1 ? 'from-blue-500 to-cyan-600' :
                    'from-orange-500 to-red-500'
                  } flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <info.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {info.title}
                </h3>
                <p className="text-primary font-medium mb-1">{info.value}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {/* Enhanced Social Media Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-8"
      >
        <motion.h3 
          className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Heart className="w-6 h-6 text-red-500" />
          Let's Connect
          <Zap className="w-6 h-6 text-yellow-500" />
        </motion.h3>
        
        <div className={`
          flex
          ${isMobile ? "flex-nowrap overflow-x-auto gap-3 pb-4" : "flex-wrap gap-6"}
          justify-center
          px-4
        `}>
          {socialLinks.map(({ icon: Icon, title, link, gradient }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.7 + idx * 0.1,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredSocial(title)}
              onHoverEnd={() => setHoveredSocial(null)}
              className="relative group"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={title}
                      className={`
                        relative flex items-center justify-center
                        ${isMobile ? "w-12 h-12" : "w-16 h-16"}
                        rounded-2xl shadow-lg
                        bg-gradient-to-r ${gradient}
                        text-white
                        transform transition-all duration-300
                        hover:shadow-2xl hover:shadow-primary/25
                        group-hover:animate-pulse
                        overflow-hidden
                      `}
                    >
                      <Icon className={`${isMobile ? "w-5 h-5" : "w-7 h-7"} relative z-10`} />
                      
                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-2xl"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ 
                          scale: 1, 
                          opacity: 1,
                          transition: { duration: 0.3 }
                        }}
                      />
                      
                      {/* Sparkle effect */}
                      <motion.div
                        className="absolute top-1 right-1"
                        animate={{ 
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.5
                        }}
                      >
                        <Star className="w-3 h-3 text-white/80" />
                      </motion.div>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-background/90 backdrop-blur-sm border-primary/20">
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 font-medium"
                    >
                      <Icon className="w-4 h-4" />
                      Connect on {title}
                      <ExternalLink className="w-3 h-3" />
                    </motion.p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Hover label */}
              <AnimatePresence>
                {hoveredSocial === title && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 whitespace-nowrap z-20"
                  >
                    <div className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary" />
                        {title}
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
        {/* Enhanced Map & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Map Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="h-full order-2 lg:order-1 group"
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/30 relative">
              <CardContent className="p-0 relative">
                <motion.div
                  className="absolute top-4 left-4 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <div className="bg-background/90 backdrop-blur-sm rounded-full p-2 border border-border/50 shadow-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute top-4 right-4 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Wifi className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                </motion.div>

                <div className="relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651052186532!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-700 h-[350px] sm:h-[500px] group-hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </CardContent>
              
              <motion.div 
                className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      Mumbai, India
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Globe className="w-4 h-4 text-primary" />
                      </motion.div>
                    </h3>
                    <p className="text-sm text-muted-foreground">Available for remote work worldwide 🌍</p>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Enhanced Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="h-full order-1 lg:order-2 group"
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/30 relative">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  className="absolute top-10 right-10 w-20 h-20 bg-primary rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-10 left-10 w-16 h-16 bg-secondary rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </div>

              <CardContent className="p-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold">Send a Message</h3>
                    <p className="text-sm text-muted-foreground">I'd love to hear from you!</p>
                  </div>
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: 2
                    }}
                    className="ml-auto"
                  >
                    <Rocket className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/20 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-green-500/5"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        <Check className="h-5 w-5" />
                        <AlertTitle className="flex items-center gap-2">
                          Success! 
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Star className="w-4 h-4" />
                          </motion.div>
                        </AlertTitle>
                        <AlertDescription>Your message has been sent successfully. I'll get back to you soon!</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              Name
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Input 
                                  placeholder="Your awesome name" 
                                  {...field} 
                                  className="focus:ring-primary transition-all duration-300 border-border/50 focus:border-primary/50"
                                  onFocus={() => setFocusedField('name')}
                                  onBlur={() => setFocusedField(null)}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Input 
                                  placeholder="your.email@example.com" 
                                  type="email" 
                                  {...field} 
                                  className="focus:ring-primary transition-all duration-300 border-border/50 focus:border-primary/50"
                                  onFocus={() => setFocusedField('email')}
                                  onBlur={() => setFocusedField(null)}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-primary" />
                              Subject (Optional)
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Input 
                                  placeholder="What's this about?" 
                                  {...field} 
                                  className="focus:ring-primary transition-all duration-300 border-border/50 focus:border-primary/50"
                                  onFocus={() => setFocusedField('subject')}
                                  onBlur={() => setFocusedField(null)}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-primary" />
                              Message
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Textarea
                                  placeholder="Tell me about your project ideas, questions, or just say hi! 👋"
                                  {...field}
                                  className="focus:ring-primary min-h-[200px] resize-y transition-all duration-300 border-border/50 focus:border-primary/50"
                                  onFocus={() => setFocusedField('message')}
                                  onBlur={() => setFocusedField(null)}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full gap-3 py-6 mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl relative overflow-hidden group"
                          disabled={!isValid || isSubmitting}
                        >
                          {/* Button background animation */}
                          <motion.div
                            className="absolute inset-0 bg-white/10"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                          
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <svg
                                  className="w-5 h-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                              </motion.div>
                              Sending your message...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              Send Message
                              <motion.div
                                animate={{ 
                                  x: [0, 5, 0],
                                  transition: { 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }
                                }}
                              >
                                <Zap className="w-4 h-4" />
                              </motion.div>
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </div>
  )
}
