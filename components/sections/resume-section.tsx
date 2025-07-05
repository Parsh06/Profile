"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Briefcase, 
  Users, 
  Download, 
  CheckCircle2, 
  GraduationCap,
  Building2,
  Heart,
  Code,
  Database,
  Palette,
  Wrench,
  Globe,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  Zap,
  Trophy,
  Target,
  Sparkles,
  FileText,
  Award,
  Camera,
  X
} from "lucide-react"

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState("education")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const education = [
    {
      title: "KJ Somaiya College Of Engineering",
      period: "2022 — 2026",
      description:
        "Currently pursuing my Bachelor's degree in Engineering. Studying various subjects related to my field of interest and actively participating in extracurricular activities.",
      icon: GraduationCap,
      level: "Bachelor's Degree",
      image: "/Kjsomaiya.png"
    },
    {
      title: "Pace Junior Science College",
      period: "2020 — 2022",
      description:
        "Completed my higher secondary education with a focus on science and mathematics. Developed a strong foundation in these subjects, preparing for college-level studies.",
      icon: BookOpen,
      level: "Higher Secondary",
      image: "/PaceCollege.png"
    },
    {
      title: "ST. Peter's High School",
      period: "2006 — 2020",
      description:
        "Completed my secondary education with a well-rounded curriculum including languages, sciences, and humanities. Participated in various extracurricular activities, developing interpersonal skills alongside academic achievements.",
      icon: Trophy,
      level: "Secondary Education",
      image: "/Stpeters.png"
    },
  ]

  const experience = [
    {
      title: "Barclays",
      period: "June 2025 — July 2025",
      description:
        "Software Testing Intern in Pune, focused on automation testing and UI validation for trading applications.",
      responsibilities: [
        "Automated test workflows for trade setup applications using Selenium.",
        "Validated branding guidelines and UI compliance across Barclays platforms using Axe Core, Lighthouse, and Percy.",
        "Collaborated with Agile teams including QA, DevOps, and Product during CI/CD pipeline deployments.",
      ],
      icon: Building2,
      type: "Internship",
      image: "/Barclays.png"
    },
    {
      title: "MBP Trust",
      period: "April 2024 — July 2024",
      description:
        "Web Developer for a non-profit organization, focusing on user engagement and donation integration.",
      responsibilities: [
        "Created a responsive website using React and Node.js.",
        "Integrated Razorpay for secure donation processing.",
        "Implemented event management features and testimonials section.",
        "Ensured accessibility and user-friendly navigation.",
      ],
      icon: Heart,
      type: "Non-Profit",
      image: "/MbpTrust.png"
    },
    {
      title: "Falcon X",
      period: "March 2024 — June 2024",
      description:
        "Web Developer Intern responsible for developing and maintaining company websites.",
      responsibilities: [
        "Developed and maintained company websites.",
        "Provided technical support to clients and implemented new features.",
        "Collaborated with senior developers on projects and learned industry best practices.",
      ],
      icon: Code,
      type: "Internship",
      image: "/FalconX.png"
    },
    {
      title: "Freelance",
      period: "January 2023 — June 2024",
      description:
        "Working as a Web Developer, focusing on creating responsive and user-friendly websites for clients.",
      responsibilities: [
        "Developing and maintaining websites, ensuring high performance and reliability.",
        "Providing technical support and implementing updates to enhance website functionality.",
        "Creating responsive designs that work across all devices.",
      ],
      icon: Globe,
      type: "Freelance",
      image: "/Freelance.png"
    },
  ]

  const volunteering = [
    {
      title: "KJSCE CodeCell",
      period: "July 2023 — July 2025",
      description:
        "Committee Head, managing alumni repositories and organizing national-level events and workshops for tech enthusiasts.",
      responsibilities: [
        "Enhancing the management of alumni repositories to facilitate better connections and resource sharing.",
        "Organizing workshops and events that promote skill development and knowledge sharing among participants.",
        "Encouraging collaboration on open-source projects to foster a community of tech enthusiasts.",
      ],
      icon: Users,
      type: "Leadership",
      image: "/Kjscecodecell.png"
    },
    {
      title: "Redshift Racing India",
      period: "November 2022 — October 2023",
      description:
        "Web Developer Intern in Mumbai, collaborating on enhancing the Redshift Racing India website for improved user experience and functionality.",
      responsibilities: [
        "Ensuring website stability and compatibility across various platforms.",
        "Conducting thorough testing, debugging, and optimization to enhance website performance.",
      ],
      icon: Zap,
      type: "Development",
      image: "/Redshiftracing.png"
    },
  ]

 const skills = [
  // Frontend
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", category: "Frontend" },
  { name: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },

  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg", whiteBg: true, category: "Backend" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg", whiteBg: true, category: "Backend" },

  // Databases
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Database" },

  // Languages
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", category: "Language" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Language" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Language" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Language" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Language" },

  // Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tool" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg", whiteBg: true, category: "Tool" },
  { name: "VSCode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tool" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Tool" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", category: "Tool" },
  { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", category: "Tool" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", category: "Tool" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tool" },
  // Deployment
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original-wordmark.svg", whiteBg: true, category: "Deployment" },
  { name: "Replit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/replit/replit-original.svg", category: "Deployment" },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", category: "Deployment" }
]

const skillCategories = ["Frontend", "Backend", "Database", "Language", "Deployment", "Tool"]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const downloadResume = () => {
    window.open("https://drive.google.com/file/d/1F4XGi_6BhYxufPdBxubLJfJ66Z2Mi9Nh/view?usp=sharing", "_blank")
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <motion.h2 
            className="text-3xl font-bold tracking-tight pb-2 border-b border-primary/20 flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FileText className="w-8 h-8 text-primary" />
            </motion.div>
            My <span className="text-primary">Resume</span>
          </motion.h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={downloadResume}
              className="gap-2 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-primary-foreground relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Download className="w-4 h-4" />
              </motion.div>
              Download CV
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Tabs defaultValue="education" value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <TabsList className="grid grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm p-1 rounded-full relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-amber-500/10 rounded-full"
              animate={{ 
                background: [
                  "linear-gradient(90deg, rgba(var(--primary),0.1) 0%, rgba(245,158,11,0.1) 100%)",
                  "linear-gradient(90deg, rgba(245,158,11,0.1) 0%, rgba(var(--primary),0.1) 100%)",
                  "linear-gradient(90deg, rgba(var(--primary),0.1) 0%, rgba(245,158,11,0.1) 100%)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <TabsTrigger
              value="education"
              className="gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative z-10 transition-all duration-300"
            >
              <motion.div
                animate={activeTab === "education" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <BookOpen className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative z-10 transition-all duration-300"
            >
              <motion.div
                animate={activeTab === "experience" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Briefcase className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger
              value="volunteering"
              className="gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative z-10 transition-all duration-300"
            >
              <motion.div
                animate={activeTab === "volunteering" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">Volunteering</span>
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <AnimatePresence mode="wait">
          <TabsContent value="education" key="education">
            <motion.div 
              variants={container} 
              initial="hidden" 
              animate="show" 
              exit="hidden"
              className="space-y-6"
            >
              {education.map((edu, index) => (
                <motion.div key={index} variants={childVariant}>
                  <TimelineItem 
                    title={edu.title} 
                    period={edu.period} 
                    description={edu.description}
                    icon={edu.icon}
                    type={edu.level}
                    image={edu.image}
                    onImageClick={() => setSelectedImage(edu.image)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="experience" key="experience">
            <motion.div 
              variants={container} 
              initial="hidden" 
              animate="show" 
              exit="hidden"
              className="space-y-6"
            >
              {experience.map((exp, index) => (
                <motion.div key={index} variants={childVariant}>
                  <TimelineItem
                    title={exp.title}
                    period={exp.period}
                    description={exp.description}
                    responsibilities={exp.responsibilities}
                    icon={exp.icon}
                    type={exp.type}
                    image={exp.image}
                    onImageClick={() => setSelectedImage(exp.image)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="volunteering" key="volunteering">
            <motion.div 
              variants={container} 
              initial="hidden" 
              animate="show" 
              exit="hidden"
              className="space-y-6"
            >
              {volunteering.map((vol, index) => (
                <motion.div key={index} variants={childVariant}>
                  <TimelineItem
                    title={vol.title}
                    period={vol.period}
                    description={vol.description}
                    responsibilities={vol.responsibilities}
                    icon={vol.icon}
                    type={vol.type}
                    image={vol.image}
                    onImageClick={() => setSelectedImage(vol.image!)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      <div className="mt-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="text-2xl font-semibold">
            My <span className="text-primary">Skills</span>
          </h3>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Award className="w-6 h-6 text-amber-500" />
          </motion.div>
        </motion.div>
        <div className="space-y-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="absolute -left-2 top-0 w-1 h-8 bg-gradient-to-b from-primary to-amber-500 rounded-full"
                initial={{ height: 0 }}
                animate={isInView ? { height: 32 } : { height: 0 }}
                transition={{ delay: categoryIndex * 0.1 + 0.2, duration: 0.4 }}
              />
              <h4 className="text-lg font-medium mb-3 text-primary pl-4">{category}</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 180 }}
                      transition={{ delay: index * 0.05 + categoryIndex * 0.1, duration: 0.4 }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotateY: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-card/50 hover:bg-primary/10 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-primary/50"
                      title={skill.name}
                    >
                      <motion.div
                        className={`w-8 h-8 mb-2 opacity-70 group-hover:opacity-100 transition-opacity ${
                          skill.whiteBg ? "p-1 bg-white rounded" : ""
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={skill.icon || "/placeholder.svg"}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute -top-4 -right-4 p-2 bg-background border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.img
                src={selectedImage}
                alt="Institution"
                className="w-full h-full max-h-[80vh] object-contain rounded-lg border-2 border-border bg-background/50"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface TimelineItemProps {
  title: string
  period: string
  description: string
  responsibilities?: string[]
  icon?: React.ElementType
  type?: string
  image?: string
  onImageClick?: () => void
}

function TimelineItem({ title, period, description, responsibilities, icon: Icon, type, image, onImageClick }: TimelineItemProps) {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-primary/50 group relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section - Only for education items */}
          {image && (
            <motion.div 
              className="lg:w-1/3 shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="relative group/img">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-amber-500/20 rounded-xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <div className="p-2 bg-background/30 rounded-xl border-2 border-border/30 group-hover:border-primary/50 transition-all duration-300 shadow-md">
                  <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-44 lg:h-52 object-contain rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div
                  className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Icon && React.createElement(Icon, { className: "w-4 h-4 text-primary" })}
                </motion.div>
                {onImageClick && (
                  <motion.button
                    className="absolute top-3 left-3 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
                    onClick={onImageClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Content Section */}
          <div className={`${image ? 'lg:w-2/3' : 'w-full'}`}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="md:w-1/4 shrink-0 space-y-2">
                <motion.span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {period}
                </motion.span>
                {type && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-2 py-1 rounded-md text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  >
                    {type}
                  </motion.div>
                )}
              </div>
              <div className="md:w-3/4">
                <div className="flex items-start gap-3 mb-2">
                  {/* Show icon only if no image */}
                  {!image && Icon && (
                    <motion.div
                      className="mt-1 p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {React.createElement(Icon, { className: "w-4 h-4" })}
                    </motion.div>
                  )}
                  <motion.h4 
                    className="text-xl font-medium group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.h4>
                </div>
                <motion.p 
                  className="text-muted-foreground mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {description}
                </motion.p>
                {responsibilities && responsibilities.length > 0 && (
                  <motion.ul 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {responsibilities.map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <motion.div
                          className="mt-0.5 shrink-0"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}