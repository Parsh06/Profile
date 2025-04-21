"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Github, ExternalLink } from "lucide-react"
import { Tilt } from "@/components/ui/tilt"

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: "Stock Broking",
      image: "/stockbroking.png",
      demoUrl: "https://stock-62eb3.web.app/",
      githubUrl: null,
      category: ["Artificial Intelligence", "Web Development"],
      description:
        "A dynamic web-based platform for real-time stock market visualization and trading simulations. Features live data integration, interactive financial charts, and predictive analytics powered by AI models.",
    },
    {
      title: "Chess Game Prediction",
      image: "/chesspredict.png",
      demoUrl: "https://chesspredictoutcome.vercel.app/",
      githubUrl: "https://github.com/Parsh06/chess",
      category: ["Machine Learning", "Web Development"],
      description:
        "An AI-driven chess prediction web app that analyzes historical moves and board positions to forecast game outcomes. Utilizes machine learning models to simulate strategies and suggest optimal plays.",
    },
    {
      title: "Smart Business Cost Planning",
      image: "/smartbuisnesscostplaning.png",
      demoUrl: "https://du-hacks.web.app/",
      githubUrl: "https://github.com/Parsh06/du-hacks",
      category: ["Artificial Intelligence", "Web Development"],
      description:
        "A smart cost-planning tool tailored for small and medium enterprises (SMEs). Automates expense tracking, generates financial reports, and offers AI-based suggestions to optimize budget allocations and operational costs.",
    },
    {
      title: "Redshift Racing India",
      image: "/Redshift.png",
      demoUrl: "http://www.redshift-racing.in/",
      githubUrl: "https://github.com/Parsh06/Redshift-website",
      category: ["Web Development"],
      description:
        "A sleek, high-performance website for a collegiate racing team. Showcases event highlights, team rosters, project galleries, and real-time announcements with a mobile-first, responsive design.",
    },
    {
      title: "Dautyam Club",
      image: "/dautyam.png",
      demoUrl: "https://dautyam-website.vercel.app/",
      githubUrl: "https://github.com/Parsh06/Dautyam-Website",
      category: ["Web Development"],
      description:
        "Official club portal built for a college council. Offers event scheduling, photo galleries, member highlights, and a CMS-friendly admin panel for seamless content updates and announcements.",
    },
    {
      title: "MBP Trust NGO",
      image: "/mbp.png",
      demoUrl: "https://mbptrust.org/",
      githubUrl: null,
      category: ["Web Development"],
      description:
        "A professionally developed website for a non-profit organization. Includes donation integration via Razorpay, event pages, testimonials, and a responsive layout that ensures accessibility across all devices.",
    },
    {
      title: "Food Recipe",
      image: "/FoodRecipe.png",
      demoUrl: "https://foodingrediants.netlify.app/",
      githubUrl: null,
      category: ["Web Development"],
      description:
        "An intuitive recipe finder app allowing users to search meals by ingredients or keywords. Includes detailed instructions, nutritional breakdowns, and responsive UI for a delightful cooking experience.",
    },
    {
      title: "Kriya Dhrishti",
      image: "/Kriya.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Sih-Final",
      category: ["Machine Learning", "Web Development"],
      description:
        "A real-time anomaly detection system using computer vision and deep learning. Designed to identify irregular human activity in surveillance footage for use in smart cities and security infrastructure.",
    },
    {
      title: "Satya Kendra",
      image: "/satya_kendra.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Team-Should",
      category: ["Machine Learning", "Web Development"],
      description:
        "Sentiment analysis platform that processes user-generated text and classifies sentiments with high accuracy. Features an interactive dashboard for data visualization and NLP model performance tracking.",
    },
    {
      title: "Ecommerce Website",
      image: "/Fashio_hub.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Website_ECO",
      category: ["Web Development"],
      description:
        "A full-stack ecommerce web application featuring secure user authentication, product filtering, cart management, and order processing. Built for scalability and optimized for high-performance browsing.",
    },
    {
      title: "Automatic Email Sender",
      image: "/Automatic.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Automatic-Email-Sender",
      category: ["Web Development", "Automation"],
      description:
        "A utility tool that enables scheduled email delivery with dynamic content templates. Designed for marketing automation and bulk communication, with Google Apps Script and Gmail API integration.",
    },
    {
      title: "Expenditure Budget",
      image: "/expenditure.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/Expenditure-budget",
      category: ["Web Development"],
      description:
        "An interactive budgeting web app that helps users manage daily, weekly, and monthly expenses. Includes visual graphs, categorized spending, and data export functionality for financial planning.",
    },
    {
      title: "Data Analysis",
      image: "/PowerBi.png",
      demoUrl: null,
      githubUrl: "https://github.com/Parsh06/PowerBi-",
      category: ["Data Analysis"],
      description:
        "A business intelligence project using Microsoft Power BI. Offers visual dashboards, KPI tracking, and deep insights through interactive charts and slicers, making data-driven decisions seamless.",
    },
  ]
  
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight mb-4 pb-2 border-b border-primary/20">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground mb-8">A showcase of my recent work and personal projects.</p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item}>
            <Tilt scale={1.05} perspective={1000} transitionSpeed={1000}>
              <Card
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50 h-full flex flex-col"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{
                      transform: hoveredProject === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300"
                    style={{
                      opacity: hoveredProject === index ? 1 : 0,
                    }}
                  >
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      {project.demoUrl && (
                        <Button size="sm" variant="secondary" asChild className="gap-1">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild className="gap-1">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.category.map((cat, catIndex) => (
                      <Badge 
                        key={catIndex} 
                        variant="outline" 
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  
                  <div className="mt-auto pt-4 flex justify-end">
                    {(project.demoUrl || project.githubUrl) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="gap-1 text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <a href={project.demoUrl || project.githubUrl || undefined} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          <span className="sr-only">View Project</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}