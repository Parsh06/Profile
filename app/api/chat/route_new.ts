import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import personalData from '../../../data/personal.json'

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

function createSystemPrompt() {
  return `You are Parsh Jain's AI Assistant. Respond quickly and concisely while being informative.

KEY FACTS ABOUT PARSH:
- Full Stack Developer with experience at Barclays (Investment Banking Division)
- Technologies: React, Next.js, Python, JavaScript, TypeScript, SQL, Power BI, Docker
- Education: B.Tech in Computer Science from Maharaja Agrasen Institute of Technology
- Projects: Chess Prediction System, Fashion Hub E-commerce, Food Recipe App, Stock Analysis
- Skills: Web Development, Data Analysis, Machine Learning, Database Management
- Location: Delhi, India

PERSONAL DATA:
${JSON.stringify(personalData, null, 2)}

INSTRUCTIONS:
1. Keep responses concise but informative (aim for 100-300 words)
2. Use bullet points for lists to improve readability
3. Focus on the most relevant information for the user's question
4. Be conversational and enthusiastic about Parsh's achievements
5. Use **bold** for key terms and achievements
6. If the question is broad, provide a focused overview
7. For specific technical questions, dive into relevant details
8. Always maintain a professional, helpful tone

RESPONSE STYLE: Quick, informative, and engaging.

Remember: You represent Parsh Jain professionally, so always be accurate, helpful, and enthusiastic about his work and capabilities.`
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

    // Parse request body with error handling
    let message: string
    try {
      const body = await request.json()
      message = body.message
    } catch (error) {
      console.error('JSON parsing error:', error)
      return NextResponse.json({ 
        error: 'Invalid request format',
        response: "I received a malformed request. Please try again.",
        timestamp: new Date().toISOString()
      }, { status: 400 })
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
            maxOutputTokens: 300, // Reduced for faster responses
            temperature: 0.3, // Lower for faster, focused responses
            topP: 0.7, // Reduced for speed
            topK: 15 // Reduced for speed
          }
        })
        
        const shortPrompt = `You are Parsh's AI assistant. Answer briefly and accurately.

Key Info: Parsh is a Full Stack Developer with Barclays experience, skilled in React, Python, JavaScript, TypeScript, SQL. B.Tech CS graduate with projects in web dev, data analysis.

USER: ${message}

Give a concise, helpful response (max 150 words):`
        
        // Ultra-fast timeout - 4 seconds max
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Gemini timeout')), 4000)
        )
        
        const geminiPromise = model.generateContent(shortPrompt).then(result => result.response.text())
        
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
  
  // Skills and technology questions
  if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('programming')) {
    return `**🚀 Parsh's Technical Skills:**

**Frontend:** React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind
**Backend:** Python, Node.js, SQL, RESTful APIs
**Tools:** Git, Docker, Power BI, VS Code
**Databases:** MySQL, PostgreSQL

He's proficient in full-stack development with modern frameworks! 💻`
  }

  // Experience questions
  if (message.includes('experience') || message.includes('work') || message.includes('barclays') || message.includes('internship')) {
    return `**💼 Parsh's Professional Experience:**

**Barclays Investment Banking Division** - Software Developer Intern
• Developed trading applications using React and Python
• Worked with real-time data processing systems
• Collaborated with senior developers on critical projects

Strong foundation in enterprise software development! 🏦`
  }

  // Projects questions
  if (message.includes('project') || message.includes('portfolio') || message.includes('built') || message.includes('developed')) {
    return `**🛠️ Parsh's Key Projects:**

• **Chess Prediction System** - ML-based game analysis
• **Fashion Hub E-commerce** - Full-stack shopping platform
• **Food Recipe App** - Interactive recipe discovery
• **Stock Analysis Tool** - Data visualization dashboard

All projects showcase full-stack development skills! 📈`
  }

  // Education questions
  if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('college')) {
    return `**🎓 Parsh's Education:**

**B.Tech in Computer Science**
Maharaja Agrasen Institute of Technology, Delhi

• Strong foundation in algorithms and data structures
• Specialized in software engineering
• Active in coding competitions

Solid academic background in computer science! 📚`
  }

  // Availability questions
  if (message.includes('available') || message.includes('hire') || message.includes('opportunity') || message.includes('job')) {
    return `**✅ Parsh is Available for Opportunities!**

Looking for roles in:
• Full Stack Development
• Frontend Development (React/Next.js)
• Backend Development (Python/Node.js)
• Software Engineering positions

Ready to contribute to innovative projects! 🚀`
  }

  // Contact questions
  if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('linkedin')) {
    return `**📞 Get in Touch with Parsh:**

Feel free to connect through his portfolio or professional networks. He's always open to discussing new opportunities and collaborations!

**Available for:** Full-time roles, consulting, or project collaboration 💬`
  }

  // Default comprehensive response
  return `**👋 About Parsh Jain:**

**Full Stack Developer** with **Barclays experience**
• **Skills:** React, Python, JavaScript, TypeScript, SQL
• **Education:** B.Tech Computer Science
• **Projects:** Web apps, data analysis, ML systems
• **Status:** Available for opportunities

**Ask me about:** Skills, projects, experience, or availability! 🚀`
}
