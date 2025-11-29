// Environment Configuration Checker
const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking Environment Configuration...\n');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!');
    console.log('📝 Please create .env.local file with your API keys');
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

const requiredVars = [
    'NEXT_PUBLIC_GEMINI_API_KEY',
    'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
    'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
    'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
    'NEXT_PUBLIC_ADMIN_EMAIL',
    'NEXT_PUBLIC_ADMIN_PASSWORD'
];

const config = {};
let allConfigured = true;

lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        if (key) {
            config[key.trim()] = value;
        }
    }
});

console.log('📋 Configuration Status:\n');

requiredVars.forEach(varName => {
    const value = config[varName];
    const isConfigured = value &&
        value !== 'your_gemini_api_key_here' &&
        value !== 'your_service_id' &&
        value !== 'your_template_id' &&
        value !== 'your_public_key' &&
        value !== 'your_secure_password_here';

    if (isConfigured) {
        if (varName === 'NEXT_PUBLIC_GEMINI_API_KEY') {
            console.log(`✅ ${varName}: CONFIGURED (Length: ${value.length} chars)`);
            if (value.length < 20) {
                console.log(`   ⚠️  Warning: API key seems too short`);
                allConfigured = false;
            }
        } else if (varName.includes('PASSWORD')) {
            console.log(`✅ ${varName}: CONFIGURED (Hidden for security)`);
        } else {
            console.log(`✅ ${varName}: CONFIGURED`);
        }
    } else {
        console.log(`❌ ${varName}: NOT CONFIGURED`);
        allConfigured = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allConfigured) {
    console.log('✅ All environment variables are configured!');
    console.log('🚀 You can now run: npm run dev');
} else {
    console.log('⚠️  Some environment variables are missing or invalid');
    console.log('📖 Please check SETUP_GUIDE.md for instructions');
}

console.log('='.repeat(50) + '\n');

// Check for Gemini model configuration
console.log('🤖 Chatbot Configuration:');
console.log('   Model: gemini-2.5-flash ✓');
console.log('   (Gemini 1.5 and 2.0 are deprecated)\n');
