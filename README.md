# CALCULUS.EXE - 8-Bit Learning System

A comprehensive calculus reference and tutoring application with an integrated AI assistant powered by Ollama. Features a retro 8-bit aesthetic with complete formulas, theorems, and concepts for all 8 calculus chunks including sample practice questions.

![Screenshot 2025-06-16 at 1 34 14 PM](https://github.com/user-attachments/assets/4e4c366a-07ce-4b65-8b33-e94872ebfe1e)

## 🎮 Features

- **Complete Calculus Reference**: All 8 chunks with formulas, theorems, and explanations
- **Sample Practice Questions**: Chunk 8 includes practice problems for all calculus topics
- **AI Tutor Integration**: Powered by Ollama for personalized calculus help with vision support
- **Image Analysis**: Upload mathematical problems, graphs, and diagrams for AI analysis
- **8-Bit Retro Design**: Nostalgic gaming aesthetic with modern functionality
- **LaTeX Formula Rendering**: Properly formatted mathematical expressions
- **Resizable AI Sidebar**: Drag to resize the AI assistant panel
- **Real-time Streaming**: AI responses stream in real-time for better UX
- **Vision Model Support**: Automatic detection and testing of vision-capable models
- **Responsive Design**: Works on desktop and mobile devices

## 📚 Calculus Chunks Covered

1. **Limits and Continuity** - Function limits, one-sided limits, continuity theorems
2. **Derivatives** - Rates of change, differentiation rules, basic formulas
3. **Advanced Differentiation** - Implicit differentiation, related rates, linear approximations
4. **Exponential & Logarithmic Functions** - Exponential/log derivatives, inverse functions
5. **Applications of Derivatives** - L'Hôpital's rule, optimization, mean value theorem
6. **Optimization & Antiderivatives** - Optimization problems, antiderivatives, areas
7. **Definite Integrals** - Definite integrals, evaluation techniques, Fundamental Theorem
8. **Sample Questions** - Practice problems covering all chunks with detailed examples

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Ollama** (for AI assistant functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lalomorales22/calculus-dot-exe-ollama.git
   cd calculus-dot-exe-ollama
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🤖 Setting Up Ollama (AI Assistant)

The AI tutor requires Ollama to be running locally. Follow these steps:

### Install Ollama

**macOS/Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download from [ollama.ai](https://ollama.ai/download)

### Download a Model

```bash
# Recommended models for calculus tutoring:
ollama pull llama2:7b          # Good balance of speed and quality
ollama pull mistral:7b         # Fast and efficient
ollama pull gemma:7b           # Excellent for math with vision support
ollama pull llava:7b           # Vision model for image analysis
ollama pull codellama:7b       # Good for mathematical reasoning
ollama pull llama2:13b         # Higher quality (requires more RAM)
```

### Start Ollama

```bash
ollama serve
```

The AI assistant will automatically connect when Ollama is running on `localhost:11434`.

## 🎯 Usage

### Calculus Reference System

- **Browse Chunks**: Click on any chunk header to expand and view content
- **View Formulas**: All mathematical expressions are rendered with LaTeX
- **Study Concepts**: Each topic includes explanations and key concepts
- **Practice Problems**: Chunk 8 provides sample questions for all topics
- **Navigate Easily**: Collapsible sections for organized learning

### AI Tutor Assistant

1. **Connect**: Ensure Ollama is running and models are downloaded
2. **Select Model**: Use the settings gear to choose your preferred model
3. **Test Connection**: Click CONNECT to verify the model is working
4. **Ask Questions**: Type calculus questions in natural language
5. **Upload Images**: Drag and drop or upload mathematical problems and diagrams
6. **Get Help**: Receive step-by-step explanations and solutions
7. **Stream Responses**: Watch answers appear in real-time
8. **Resize Sidebar**: Drag the divider to adjust the AI assistant width

### Vision Model Features

- **Automatic Detection**: The app detects which models support vision
- **Image Analysis**: Upload photos of mathematical problems, graphs, or handwritten work
- **Problem Solving**: Get step-by-step solutions for visual math problems
- **Graph Analysis**: Analyze function plots and mathematical diagrams
- **Handwriting Recognition**: Get help with handwritten calculus work

### Example AI Interactions

```
User: "Explain the chain rule"
AI: "The Chain Rule is crucial for composite functions! If y = f(g(x)), 
     then dy/dx = f'(g(x)) · g'(x)..."

User: "How do I find the limit of sin(x)/x as x approaches 0?"
AI: "This is a famous limit! As x→0, sin(x)/x = 1. Here's why..."

User: [Uploads image of a calculus problem]
AI: "I can see this is a related rates problem involving a cone. 
     Let me break down the solution step by step..."

User: "Help me with optimization problems from Chunk 6"
AI: "Optimization problems follow a systematic approach. First, identify 
     what you're maximizing or minimizing..."
```

## 🛠️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with logo
│   ├── ModuleCard.tsx  # Expandable chunk cards
│   └── AIAssistant.tsx # AI chat interface with vision support
├── data/              # Static data
│   └── modulesData.ts # Calculus content and formulas
├── services/          # External services
│   └── ollamaService.ts # Ollama API integration
└── styles/            # CSS and styling
    └── index.css      # Global styles and 8-bit theme
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom 8-bit theme
- **Math Rendering**: KaTeX + react-katex
- **Icons**: Lucide React
- **AI Integration**: Ollama REST API with vision support
- **Build Tool**: Vite

## 🎨 Customization

### Themes

The app features a dark 8-bit aesthetic with:

- **Colors**: Blue accent colors (#3B82F6) with black/white base
- **Typography**: JetBrains Mono for retro computing feel
- **Borders**: Pixelated 2px borders throughout
- **Scrollbars**: Custom styled to match theme
- **Animations**: Smooth transitions and hover effects

### Adding Content

To add new calculus topics or chunks:

1. Edit `src/data/modulesData.ts`
2. Follow the existing structure for topics
3. Use LaTeX syntax for mathematical formulas
4. Include explanations and key concepts

### AI Tutor Customization

Modify the system prompt in `src/services/ollamaService.ts` to:
- Change the AI's teaching style
- Add specific focus areas
- Customize response format
- Include additional context

## 🔧 Troubleshooting

### Common Issues

**AI Assistant not connecting:**
- Ensure Ollama is installed and running (`ollama serve`)
- Check that port 11434 is not blocked
- Verify at least one model is downloaded
- Click the CONNECT button to test the model

**Vision features not working:**
- Use a vision-capable model (gemma, llava, etc.)
- Check the vision status indicator (eye icon)
- Ensure images are under 10MB
- Try different image formats (PNG, JPG)

**Formulas not rendering:**
- Check browser console for KaTeX errors
- Ensure LaTeX syntax is correct in modulesData.ts
- Verify KaTeX CSS is loaded

**Performance issues:**
- Use smaller models (7B) for faster responses
- Reduce image sizes before uploading
- Close unused browser tabs

### Performance Tips

- **Model Selection**: Smaller models (7B) are faster but less capable
- **Memory Usage**: Larger models require more RAM
- **Response Speed**: Adjust temperature and max_tokens in ollamaService.ts
- **Image Size**: Compress images before uploading for faster analysis

## 📱 Mobile Support

The app is fully responsive and works on mobile devices:
- Touch-friendly interface
- Resizable AI assistant sidebar
- Optimized formula rendering
- Drag and drop image support
- Swipe gestures supported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain the 8-bit aesthetic
- Add proper LaTeX formatting for math
- Test AI assistant integration
- Update documentation as needed
- Include sample questions for new topics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ollama** - Local LLM inference with vision support
- **KaTeX** - Mathematical formula rendering
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library
- **React** - UI framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/lalomorales22/calculus-dot-exe-ollama/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lalomorales22/calculus-dot-exe-ollama/discussions)
- **Email**: lalo@laloadrianmorales.com
