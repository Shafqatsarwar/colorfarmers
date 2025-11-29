const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

async function testGeminiConnection() {
    console.log("🧪 Starting Gemini API Connection Test...");

    // 1. Read API Key from .env.local
    let apiKey = '';
    try {
        const envPath = path.join(__dirname, '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=["']?([^"'\n]+)["']?/);
            if (match) {
                apiKey = match[1];
                console.log("✅ API Key found in .env.local");
            }
        }
    } catch (err) {
        console.error("❌ Error reading .env.local:", err.message);
        return;
    }

    if (!apiKey) {
        console.error("❌ API Key not found in .env.local");
        return;
    }

    // 2. Initialize Client
    const genAI = new GoogleGenerativeAI(apiKey);

    // 3. Test Model Configuration
    const modelName = 'gemini-2.5-flash';
    console.log(`🤖 Testing model: ${modelName}`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });

        // 4. Send Test Message
        console.log("📤 Sending test prompt: 'Hello, are you working?'");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        const text = response.text();

        console.log("\n✨ SUCCESS! Received response from Gemini:");
        console.log("----------------------------------------");
        console.log(text);
        console.log("----------------------------------------");
        console.log("\n✅ Chatbot settings are CORRECT.");
        console.log("✅ API Key is VALID.");
        console.log("✅ Model 'gemini-2.5-flash' is ACCESSIBLE.");

    } catch (error) {
        console.error("\n❌ CONNECTION FAILED");
        console.error("Error details:", error.message);

        if (error.message.includes('API key not valid')) {
            console.error("👉 Suggestion: Check if the API key is copied correctly.");
        } else if (error.message.includes('not found')) {
            console.error("👉 Suggestion: The model 'gemini-2.5-flash' might not be available to your account or region, or the name is incorrect.");
        }
    }
}

testGeminiConnection();
