"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cpu, Database, Layout } from "lucide-react"
import { StarsCanvas } from "@/components/canvas/stars"
import { Tilt } from "@/components/ui/tilt"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const services = [
    {
      icon: Layout,
      title: "Web Design",
      description: "Create high quality website design as per required.",
    },
    {
      icon: Code,
      title: "Web Development",
      description:
        "Write codes for the Designed Website Integrating full features to it.",
    },
    {
      icon: Database,
      title: "Data Analysis",
      description:
        "Analyzing and interpreting data to derive meaningful insights and make informed decisions.",
    },
    {
      icon: Cpu,
      title: "Hackathon",
      description: "Participate in Hackathons to solve real world problems.",
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
    <div className="space-y-8 relative">
      <StarsCanvas />

      {/* About Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Grid layout: Text (with image) + Stats card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Column: Image + About Me Text */}
          <div className="md:col-span-2 space-y-6">
            {/* Circular image container */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/parsh_pic_withoutbg.png"
                alt="Parsh Jain"
                className="
                  w-30 h-40           /* mobile default: 4rem × 4rem */
                  sm:w-20 sm:h-20     /* small screens ≥640px: 5rem × 5rem */
                  md:w-24 md:h-24     /* medium screens ≥768px: 6rem × 6rem */
                  lg:w-32 lg:h-32     /* large screens ≥1024px: 8rem × 8rem */
                  rounded-full
                  object-cover
                  border-4 border-primary
                  shadow-lg
                "
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight pb-2 border-b border-primary/20">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer and B.Tech student with Honours in Artificial Intelligence at K.J. Somaiya College of Engineering. I specialize in crafting dynamic, user-friendly web applications and integrating machine learning to solve impactful problems.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              With a strong foundation in technologies like React, Node.js, Python, and Firebase, I love turning ideas into functional digital experiences. Whether it's building scalable systems, analyzing data, or contributing to hackathons, I’m driven by curiosity and the desire to create meaningful tech solutions.
            </p>
          </div>

          {/* Right Column: Stats Card */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-75 transition duration-1000 animate-pulse"></div>
            <div className="relative bg-card rounded-lg p-5">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-4">
                  <h3 className="text-3xl font-bold text-primary">3+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="p-4">
                  <h3 className="text-3xl font-bold text-primary">10+</h3>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div className="p-4">
                  <h3 className="text-3xl font-bold text-primary">10+</h3>
                  <p className="text-sm text-muted-foreground">Technologies</p>
                </div>
                <div className="p-4">
                  <h3 className="text-3xl font-bold text-primary">3+</h3>
                  <p className="text-sm text-muted-foreground">Hackathons</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <div ref={ref} className="relative z-10">
        <h3 className="text-2xl font-semibold mb-6">What I'm Doing</h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Tilt>
                <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 min-h-[150px]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-2">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}