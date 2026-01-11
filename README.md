# Spiritual AI Advisor

A spiritual guidance application that provides wisdom from sacred texts and spiritual masters through AI-powered conversations.

## Features

### 🔄 Dual Chat Modes

1. **Universal Wisdom**: Ask questions and get answers from all sacred texts
   - Searches across Bhagavad Gita, Quran, and Bible simultaneously
   - Provides comprehensive spiritual guidance with source references

2. **Character Guidance**: Seek wisdom from spiritual masters and saints
   - Hindu masters: Lord Krishna, Patanjali, Rishi Vyasa, Swami Vivekananda, Sadhguru
   - Islamic guides: Rumi, Hazrat Ali, Imam Al-Ghazali, Khwaja Moinuddin Chishti
   - Christian saints: Jesus Christ, Mother Teresa, St. Francis of Assisi, St. Teresa of Avila
   - **Visual Experience**: Each character displays with their portrait image

### 🌐 Multi-language Support
- English
- Hindi (हिन्दी)
- Marathi (मराठी)

## API Integration

The application integrates with a REST API backend hosted on Hugging Face Spaces:

### Universal Chat API
```
POST https://pylord-gptdharma.hf.space/chat
Body: {"message": "Your spiritual question"}
Response: {"reply": "...", "sources": {"gita": [...], "quran": [...], "bible": [...]}}
```

### Character Chat API
```
POST https://pylord-gptdharma.hf.space/character-chat  
Body: {"character_name": "Character Name", "query": "Your question"}
Response: {"reply": "...", "character": "...", "sources": {...}}
```

## Files Structure

- `index.html` - Main selection page with mode and character/book selection
- `chat.html` - Chat interface for conversations
- `script.js` - JavaScript handling API calls and UI interactions
- `style.css` - Comprehensive styling with responsive design
- `characters.json` - Character data with personalities, teaching methods, and traits
- `test-api.html` - API testing utility
- `assets/` - Character portrait images and background images

## Usage

1. **Select Language**: Choose your preferred language from the dropdown
2. **Choose Mode**: Select between Universal Wisdom or Character Guidance
3. **Make Selection**: 
   - For Universal: Start chatting immediately with all sacred texts
   - For Character: Select from available spiritual masters
4. **Start Conversation**: Ask questions and receive personalized spiritual guidance

## Character Personalities

Each character has detailed personality traits including:
- **Tone & Voice Style**: How they communicate
- **Core Principles**: Their fundamental teachings
- **Teaching Method**: Their approach to guidance
- **Vocabulary**: Preferred words and phrases to avoid

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Testing

Use `test-api.html` to verify API connectivity and test both endpoints before using the main application.

## Browser Compatibility

- Modern browsers with ES6+ support
- Backdrop filter support for visual effects
- Fetch API for network requests