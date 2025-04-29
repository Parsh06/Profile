"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { AlertCircle, Mail, Send, Check, ExternalLink, X, Instagram, Github, Linkedin } from 'lucide-react'
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
  const isMobile = useMediaQuery("(max-width: 768px)")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onChange",
  })
  const { handleSubmit, formState, reset } = form
  const { isValid } = formState

  const socialLinks = [
    { icon: X, title: "X", link: "https://x.com/PARSHMJAIN" },
    { icon: Instagram, title: "Instagram", link: "https://www.instagram.com/parshjain_06/" },
    { icon: Github, title: "GitHub", link: "https://github.com/Parsh06" },
    { icon: Linkedin, title: "LinkedIn", link: "https://www.linkedin.com/in/parsh-jain-a50091253/" },
    { icon: Mail, title: "Email", link: "mailto:parshjain46@gmail.com" },
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
    <div className="container mx-auto px-4 py-12 space-y-8">
    {/* Header */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center md:text-left">
    <h2 className="text-3xl font-bold tracking-tight mb-4 pb-2 border-b border-primary/20">
          Contact <span className="text-primary">Me</span>
        </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
        Feel free to reach out for any inquiries or collaborations.
      </p>
    </motion.div>
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`
          flex
          ${isMobile ? "flex-nowrap overflow-x-auto gap-2" : "flex-wrap gap-6 md:gap-10"}
          justify-center
          mb-8
        `}
      >
        {socialLinks.map(({ icon: Icon, title, link }, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredSocial(title)}
            onHoverEnd={() => setHoveredSocial(null)}
            className="relative"
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
                      flex items-center justify-center
                      ${isMobile ? "w-10 h-10" : "w-14 h-14"}
                      rounded-full shadow-md
                      bg-black/10 text-yellow-500
                      hover:bg-yellow-200
                      transition-all duration-300
                    `}
                  >
                    <Icon className={isMobile ? "w-4 h-4" : "w-6 h-6"} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit {title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AnimatePresence>
              {hoveredSocial === title && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                >
                  <span className="text-sm font-medium flex items-center gap-1">
                    Visit <ExternalLink className="w-3 h-3" />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
        {/* Map & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-full order-2 lg:order-1"
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651052186532!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500 h-[300px] sm:h-[450px]"
                  />
                 
                </div>
              </CardContent>
              <div className="absolute bottom-1 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50">
                    <h3 className="font-medium mb-1">Mumbai, India</h3>
                    <p className="text-sm text-muted-foreground">Available for remote work worldwide</p>
                  </div>
            </Card>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-full order-1 lg:order-2"
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send a Message
                </h3>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className="mb-4 bg-green-500/10 text-green-500 border-green-500/20">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Your message has been sent successfully.</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="focus:ring-primary" />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" type="email" {...field} className="focus:ring-primary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} className="focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              {...field}
                              className="focus:ring-primary min-h-[180px] resize-y"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full gap-2 py-6 mt-2 bg-primary hover:bg-primary/90 transition-colors"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2-647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </div>
  )
}
