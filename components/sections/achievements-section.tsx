"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Lightbulb } from "lucide-react"
import { Tilt } from "@/components/ui/tilt"

export default function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const achievements = [
    {
      icon: Lightbulb,
      title: "Smart India Hackathon 2023 Finalist",
      description:
        "Our team was selected as a finalist in the Smart India Hackathon 2023 with the project Kriya Drishti. We engineered a system designed to address human activity anomalies using HTML, CSS, JavaScript, Python, SQLite3, OpenCV, and MediaPipe. This achievement highlights our dedication and expertise in solving real-world problems through technology.",
      link: null,
    },
    {
      icon: Lightbulb,
      title: "Datathon National Level Hackathon in Core ML 2024 Finalist",
      description:
        "Achieved finalist status in the Datathon National Level Hackathon in Core ML 2024 with the project Satya Kendra. Created a sentiment analysis project utilizing HTML, CSS, JavaScript, Python, machine learning models, and a web scraper. Our project focused on practical application and innovation in data science.",
      link: null,
    },
    {
      icon: Lightbulb,
      title: "Finalist of DU HACKS 4.0 2025",
      description:
        "Secured a finalist position at DU HACKS 4.0 in 2025 with the project Smart Business Cost Planning. The project utilized AI-driven insights for optimized business cost management and showcased innovation in financial analytics for SMEs.",
      link: null,
    },
    {
      icon: Award,
      title: "Intruder Detection Recognition Alert System for Fencing Defence using Image Processing Techniques",
      description:
        "Our research paper on Real-time Human Activity Surveillance System focuses on addressing human activity anomalies using HTML, CSS, JavaScript, Python, SQLite3, OpenCV, and MediaPipe. This work contributes significantly to the field by proposing innovative solutions for real-time surveillance and monitoring.",
      link: "https://ijarsct.co.in/Paper19267.pdf",
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
    <div className="space-y-8" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight mb-4 pb-2 border-b border-primary/20">
          My <span className="text-primary">Achievements</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          Recognitions and accomplishments throughout my academic and professional journey.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-6">
        {achievements.map((achievement, index) => (
          <motion.div key={index} variants={item}>
            <Tilt scale={1.02} perspective={1000} transitionSpeed={1000}>
              <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="shrink-0">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <achievement.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{achievement.description}</p>
                      {achievement.link && (
                        <Button variant="outline" size="sm" asChild className="gap-2">
                          <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
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
