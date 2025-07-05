#!/bin/bash

echo "🔍 Verifying Parsh Portfolio Setup..."
echo "=================================="

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Environment file exists"
    if grep -q "GEMINI_API_KEY=" .env.local; then
        echo "✅ Gemini API key configured"
    else
        echo "❌ Gemini API key not found in .env.local"
    fi
else
    echo "❌ .env.local file missing"
fi

# Check if personal.json exists
if [ -f "data/personal.json" ]; then
    echo "✅ Personal data file exists"
else
    echo "❌ personal.json missing"
fi

# Check if API route exists
if [ -f "app/api/chat/route.ts" ]; then
    echo "✅ Chat API route exists"
else
    echo "❌ Chat API route missing"
fi

# Check if main components exist
components=("app/page.tsx" "components/sections/chat-section.tsx" "components/floating-nav.tsx")
for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $component exists"
    else
        echo "❌ $component missing"
    fi
done

echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "🌐 Your portfolio will be available at:"
echo "   http://localhost:3000"
echo ""
