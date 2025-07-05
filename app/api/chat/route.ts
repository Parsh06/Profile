import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import personalData from '@/data/personal.json'

// Initialize Gemini AI with optimized settings
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Rate limiting storage (in production, use Redis or database)
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 20 // Increased limit for better user experience
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = requestCounts.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false
  }
  
  userLimit.count++
  return true
}

function createSystemPrompt(userMessage: string) {
  return `You are Parsh Jain's AI Assistant. You have access to his complete professional profile and must provide accurate, helpful responses.

COMPLETE PERSONAL DATA:
${JSON.stringify(personalData, null, 1)}

IMPORTANT EXPERIENCE DETAILS:
- Parsh has ${personalData.personalInfo.yearsOfExperience} years of experience
- He has completed 3 internships: Barclays (Software Testing), MBP Trust (Web Developer), Falcon X (Web Developer)
- He has 2 volunteering experiences: KJSCE CodeCell (Committee Head), Redshift Racing India (Web Developer)
- Total projects completed: ${personalData.personalInfo.projectsCompleted}
- Hackathons participated: ${personalData.personalInfo.hackathonsParticipated}

RESPONSE GUIDELINES:
- Answer in 100-200 words max
- Use **bold** for key achievements and technologies
- Be enthusiastic and professional
- Always reference accurate data from the profile above
- Focus on what's most relevant to the user's question

USER QUESTION: ${userMessage}

RESPONSE:`
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded',
        response: "I'm receiving too many requests right now. Please wait a moment before asking another question.",
        timestamp: new Date().toISOString()
      }, { status: 429 })
    }

    // Parse request body with enhanced error handling
    let message: string
    try {
      const body = await request.json()
      message = body?.message || ''
    } catch (error) {
      console.error('JSON parsing error:', error)
      // Return a helpful fallback instead of error
      return NextResponse.json({ 
        response: getFastFallbackResponse("tell me about parsh"),
        timestamp: new Date().toISOString(),
        source: 'fallback',
        note: "Request parsing issue - showing general info"
      })
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ 
        error: 'No message provided',
        response: "Please provide a message to get started!",
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Try Gemini API first with ultra-fast settings
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      try {
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash', // Fastest model available
          generationConfig: {
            maxOutputTokens: 200, // Reduced for faster responses
            temperature: 0.2, // Lower for faster, focused responses
            topP: 0.6, // Reduced for speed
            topK: 10 // Reduced for speed
          }
        })
        
        const optimizedPrompt = createSystemPrompt(message)
        
        // Ultra-fast timeout - 3 seconds max
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Gemini timeout')), 3000)
        )
        
        const geminiPromise = model.generateContent(optimizedPrompt).then(result => result.response.text())
        
        const text = await Promise.race([geminiPromise, timeoutPromise]) as string

        if (text && text.trim()) {
          return NextResponse.json({
            response: text.trim(),
            timestamp: new Date().toISOString(),
            source: 'gemini'
          })
        }
      } catch (error: any) {
        console.error('Gemini API Error:', error)
        
        // Log specific error types for debugging
        if (error.status === 429 || error.message?.includes('429') || 
            error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          console.log('Gemini API quota exceeded - using intelligent fallback')
        } else if (error.message?.includes('timeout')) {
          console.log('Gemini API timeout - using fast fallback')
        } else if (error.message?.includes('API_KEY')) {
          console.log('Gemini API key issue - using fallback')
        } else {
          console.log('Gemini API unavailable - using fallback:', error.message)
        }
        
        // Continue to fallback regardless of error type
      }
    }

    // Use ultra-fast intelligent fallback response
    const fallbackResponse = getFastFallbackResponse(message)
    
    return NextResponse.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      source: 'fallback',
      note: "💡 Fast response from knowledge base!"
    })

  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json({
      response: "⚡ **Quick Info**: Parsh is a Full Stack Developer with Barclays experience, skilled in React, Python, JavaScript. Available for opportunities!",
      timestamp: new Date().toISOString(),
      source: 'error'
    }, { status: 500 })
  }
}

function getFastFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  // Experience and years questions
  if (message.includes('experience') || message.includes('years') || message.includes('how long') || message.includes('how many')) {
    return `**💼 Parsh's Professional Experience:**

**${personalData.personalInfo.yearsOfExperience} years** of professional experience in software development!

**3 Key Internships:**
• **${personalData.workExperience[0].company}** - ${personalData.workExperience[0].position} (${personalData.workExperience[0].duration})
• **${personalData.workExperience[1].company}** - ${personalData.workExperience[1].position} (${personalData.workExperience[1].duration})
• **${personalData.workExperience[2].company}** - ${personalData.workExperience[2].position} (${personalData.workExperience[2].duration})

**Volunteering:** ${personalData.volunteeringExperience.length} leadership roles including **KJSCE CodeCell Committee Head** 🏆`
  }

  // Skills and technology questions
  if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('programming')) {
    return `**🚀 Parsh's Technical Skills:**

**Frontend:** ${personalData.technicalSkills.frontend.frameworks.join(', ')} | ${personalData.technicalSkills.frontend.languages.join(', ')}
**Backend:** ${personalData.technicalSkills.backend.languages.join(', ')} | ${personalData.technicalSkills.backend.frameworks.join(', ')}
**AI/ML:** ${personalData.technicalSkills.aiMl.languages.join(', ')} | ${personalData.technicalSkills.aiMl.libraries.slice(0, 3).join(', ')}
**Databases:** ${personalData.technicalSkills.backend.databases.join(', ')}

**${personalData.personalInfo.yearsOfExperience}** years experience | **${personalData.personalInfo.technologiesMastered}** technologies mastered! 💻`
  }

  // Internship specific questions
  if (message.includes('internship') || message.includes('barclays') || message.includes('mbp') || message.includes('falcon')) {
    return `**🏢 Parsh's Internship Journey:**

**1. ${personalData.workExperience[0].company}** - ${personalData.workExperience[0].position}
   📅 ${personalData.workExperience[0].duration} | � ${personalData.workExperience[0].location}
   🔧 ${personalData.workExperience[0].technologies.slice(0, 4).join(', ')}

**2. ${personalData.workExperience[1].company}** - ${personalData.workExperience[1].position}
   📅 ${personalData.workExperience[1].duration} | 📍 ${personalData.workExperience[1].location}

**3. ${personalData.workExperience[2].company}** - ${personalData.workExperience[2].position}
   📅 ${personalData.workExperience[2].duration} | 📍 ${personalData.workExperience[2].location}

Total: **3 successful internships** with increasing responsibilities! 🚀`
  }

  // Projects questions
  if (message.includes('project') || message.includes('portfolio') || message.includes('built') || message.includes('developed')) {
    const topProjects = personalData.projects.slice(0, 4)
    return `**🛠️ Parsh's Key Projects (${personalData.personalInfo.projectsCompleted} total):**

${topProjects.map(project => `• **${project.title}** - ${project.description.slice(0, 80)}...`).join('\n')}

**Categories:** Web Development, AI/ML, Data Analysis
**Technologies:** React, Python, TensorFlow, Node.js, Firebase 📈`
  }

  // Education questions
  if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('college')) {
    const currentEducation = personalData.education[0]
    return `**🎓 Parsh's Education:**

**${currentEducation.degree}**
${currentEducation.institution}, ${personalData.personalInfo.location}
${currentEducation.duration} (${currentEducation.status})

**Key Coursework:** ${currentEducation.coursework ? currentEducation.coursework.slice(0, 5).join(', ') : 'AI, ML, Web Development, Data Structures, Computer Vision'}

**Academic Focus:** Artificial Intelligence & Full-Stack Development 📚`
  }

  // Achievements questions
  if (message.includes('achievement') || message.includes('award') || message.includes('recognition') || message.includes('accomplishment')) {
    return `**🏆 Parsh's Key Achievements:**

• **${personalData.achievements[0].title}** - ${personalData.achievements[0].description}
• **${personalData.achievements[1].title}** - ${personalData.achievements[1].description}
• **${personalData.achievements[2].title}** - ${personalData.achievements[2].description}

**Stats:** ${personalData.personalInfo.hackathonsParticipated} hackathons | ${personalData.personalInfo.projectsCompleted} projects | ${personalData.personalInfo.yearsOfExperience} years experience ⭐`
  }

  // Availability questions
  if (message.includes('available') || message.includes('hire') || message.includes('opportunity') || message.includes('job')) {
    return `**✅ Parsh is ${personalData.availability.status} for Opportunities!**

**Looking for:**
${personalData.availability.lookingFor.slice(0, 4).map(item => `• ${item}`).join('\n')}

**Work Preferences:** ${personalData.availability.workPreferences.join(', ')}
**Location:** ${personalData.personalInfo.location}
**Experience:** ${personalData.personalInfo.yearsOfExperience} years

Ready to contribute to innovative projects! 🚀`
  }

  // Contact questions
  if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('linkedin')) {
    return `**📞 Get in Touch with Parsh:**

**Email:** ${personalData.personalInfo.email}
**Phone:** ${personalData.personalInfo.phone}
**Location:** ${personalData.personalInfo.location}
**LinkedIn:** ${personalData.socialMedia.linkedin}
**GitHub:** ${personalData.socialMedia.github}

Feel free to connect for opportunities, collaborations, or project discussions! 💬`
  }

  // Default comprehensive response
  return `**👋 About Parsh Jain:**

**${personalData.personalInfo.title}**
📍 ${personalData.personalInfo.location} | � ${personalData.education[0].degree}

**Experience:** ${personalData.personalInfo.yearsOfExperience} years | **3 Internships** (Barclays, MBP Trust, Falcon X)
**Projects:** ${personalData.personalInfo.projectsCompleted} completed | **Hackathons:** ${personalData.personalInfo.hackathonsParticipated}
**Skills:** React, Python, JavaScript, AI/ML, Full-Stack Development

**Ask me about:** Experience, internships, projects, skills, education, or availability! 🚀`
}
