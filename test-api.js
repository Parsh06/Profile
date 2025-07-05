#!/usr/bin/env node

// Simple script to test the ChatNow API
const testAPI = async () => {
  try {
    console.log('🧪 Testing ChatNow API...\n')
    
    // Test health endpoint
    console.log('1. Testing health endpoint...')
    const healthResponse = await fetch('http://localhost:3000/api/chat')
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData.status)
    
    // Test chat endpoint
    console.log('\n2. Testing chat endpoint...')
    const chatResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What are Parsh\'s technical skills?' })
    })
    
    const chatData = await chatResponse.json()
    if (chatData.response) {
      console.log('✅ Chat API working!')
      console.log('📝 Sample response:', chatData.response.substring(0, 100) + '...')
    } else {
      console.log('❌ Chat API error:', chatData.error)
    }
    
    console.log('\n🎉 API test complete!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('\n💡 Make sure the server is running: npm run dev')
  }
}

// Run the test
testAPI()
