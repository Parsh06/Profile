"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Briefcase, Users, Download, CheckCircle2 } from "lucide-react"
import { Tilt } from "@/components/ui/tilt"

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState("education")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const education = [
    {
      title: "KJ Somaiya College Of Engineering",
      period: "2022 — 2026",
      description:
        "Currently pursuing my Bachelor's degree in Engineering. Studying various subjects related to my field of interest and actively participating in extracurricular activities.",
    },
    {
      title: "Pace Junior Science College",
      period: "2020 — 2022",
      description:
        "Completed my higher secondary education with a focus on science and mathematics. Developed a strong foundation in these subjects, preparing for college-level studies.",
    },
    {
      title: "ST. Peter's High School",
      period: "2006 — 2020",
      description:
        "Completed my secondary education with a well-rounded curriculum including languages, sciences, and humanities. Participated in various extracurricular activities, developing interpersonal skills alongside academic achievements.",
    },
  ]

  const experience = [
    {
      title: "Freelance",
      period: "January 2023 — Present",
      description:
        "Working as a Web Developer, focusing on creating responsive and user-friendly websites for clients.",
      responsibilities: [
        "Developing and maintaining websites, ensuring high performance and reliability.",
        "Providing technical support and implementing updates to enhance website functionality.",
      ],
    },
    {
      title: "Falcon X",
      period: "March 2024 — June 2024",
      description:
        "Software Intern in Mumbai, responsible for working with live data and assisting in backend development and maintenance.",
      responsibilities: [
        "Handling live data for data analysis purposes.",
        "Contributing to backend development to ensure seamless integration and data consistency.",
      ],
    },
  ]

  const volunteering = [
    {
      title: "KJSCE CodeCell",
      period: "July 2023 — Present",
      description:
        "Committee Head, managing alumni repositories and organizing national-level events and workshops for tech enthusiasts.",
      responsibilities: [
        "Enhancing the management of alumni repositories to facilitate better connections and resource sharing.",
        "Organizing workshops and events that promote skill development and knowledge sharing among participants.",
        "Encouraging collaboration on open-source projects to foster a community of tech enthusiasts.",
      ],
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight pb-2 border-b border-primary/20">
            My <span className="text-primary">Resume</span>
          </h2>
          <Button
            onClick={downloadResume}
            className="gap-2 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-primary-foreground"
          >
            <Download className="w-4 h-4" />
            Download CV
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="education" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm p-1 rounded-full">
          <TabsTrigger
            value="education"
            className="gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger
            value="volunteering"
            className="gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Volunteering</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="education">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {education.map((edu, index) => (
              <motion.div key={index} variants={childVariant}>
                <Tilt scale={1.02} perspective={1000} transitionSpeed={1000}>
                  <TimelineItem title={edu.title} period={edu.period} description={edu.description} />
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="experience">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div key={index} variants={childVariant}>
                <Tilt scale={1.02} perspective={1000} transitionSpeed={1000}>
                  <TimelineItem
                    title={exp.title}
                    period={exp.period}
                    description={exp.description}
                    responsibilities={exp.responsibilities}
                  />
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="volunteering">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {volunteering.map((vol, index) => (
              <motion.div key={index} variants={childVariant}>
                <Tilt scale={1.02} perspective={1000} transitionSpeed={1000}>
                  <TimelineItem
                    title={vol.title}
                    period={vol.period}
                    description={vol.description}
                    responsibilities={vol.responsibilities}
                  />
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="mt-12" ref={ref}>
        <h3 className="text-2xl font-semibold mb-6">
          My <span className="text-primary">Skills</span>
        </h3>
        <div className="space-y-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <h4 className="text-lg font-medium mb-3 text-primary">{category}</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 + categoryIndex * 0.1, duration: 0.3 }}
                      className="flex flex-col items-center justify-center p-2 rounded-lg bg-card/50 hover:bg-primary/10 transition-colors group"
                      title={skill.name}
                    >
                      <div
                        className={`w-8 h-8 mb-2 opacity-70 group-hover:opacity-100 transition-opacity ${
                          skill.whiteBg ? "p-1 bg-white rounded" : ""
                        }`}
                      >
                        <img
                          src={skill.icon || "/placeholder.svg"}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
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
    </div>
  )
}

interface TimelineItemProps {
  title: string
  period: string
  description: string
  responsibilities?: string[]
}

function TimelineItem({ title, period, description, responsibilities }: TimelineItemProps) {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 group">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="md:w-1/4 shrink-0">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {period}
            </span>
          </div>
          <div className="md:w-3/4">
            <h4 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-muted-foreground mb-4">{description}</p>
            {responsibilities && responsibilities.length > 0 && (
              <ul className="space-y-2">
                {responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}