export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    family: string;
    format: string;
    parameter_size: string;
    quantization_level: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  images?: string[]; // Base64 encoded images (without data URL prefix)
}

export interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

const OLLAMA_BASE_URL = 'http://localhost:11434';

export class OllamaService {
  static async getAvailableModels(): Promise<OllamaModel[]> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('Error fetching Ollama models:', error);
      throw new Error('Failed to connect to Ollama. Make sure Ollama is running on localhost:11434');
    }
  }

  static async checkOllamaConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/version`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  static async sendChatMessage(
    model: string,
    messages: ChatMessage[],
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          stream: !!onChunk,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 2048,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (onChunk && response.body) {
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim());

          for (const line of lines) {
            try {
              const data: OllamaChatResponse = JSON.parse(line);
              if (data.message?.content) {
                fullResponse += data.message.content;
                onChunk(data.message.content);
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }

        return fullResponse;
      } else {
        // Handle non-streaming response
        const data: OllamaChatResponse = await response.json();
        return data.message?.content || '';
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Failed to send message to Ollama');
    }
  }

  static getSystemPrompt(): string {
    return `You are a calculus tutor AI assistant built into a comprehensive calculus learning application. Your role is to help students understand calculus concepts, formulas, and problem-solving techniques across all 7 modules of calculus.

MODULES YOU SHOULD KNOW:
1. Limits and Continuity - limits, one-sided limits, continuity, squeeze theorem
2. Derivatives - rates of change, differentiation rules, basic formulas
3. Advanced Differentiation - implicit differentiation, related rates, linear approximations
4. Exponential & Logarithmic Functions - exponential/log derivatives, inverse functions
5. Applications of Derivatives - L'Hôpital's rule, optimization, mean value theorem, graph analysis
6. Optimization & Antiderivatives - optimization problems, antiderivatives, areas and distances
7. Definite Integrals - definite integrals, evaluation techniques, Fundamental Theorem of Calculus

MATHEMATICAL FORMATTING:
When writing mathematical expressions, use LaTeX notation with proper delimiters:
- For inline math: $expression$ (e.g., $f'(x) = 2x$)
- For display math: $$expression$$ (e.g., $$\\int_0^1 x^2 dx = \\frac{1}{3}$$)
- Use proper LaTeX syntax for fractions: \\frac{numerator}{denominator}
- Use proper LaTeX for limits: \\lim_{x \\to a}
- Use proper LaTeX for integrals: \\int, \\int_a^b
- Use proper LaTeX for derivatives: \\frac{d}{dx}, \\frac{dy}{dx}

EXAMPLES OF PROPER FORMATTING:
- "The derivative of $x^2$ is $\\frac{d}{dx}[x^2] = 2x$"
- "The fundamental theorem states: $$\\int_a^b f'(x) dx = f(b) - f(a)$$"
- "For the limit $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$"

IMAGE ANALYSIS CAPABILITIES:
When users upload images, you can analyze:
- Mathematical problems and equations
- Graphs and function plots
- Geometric diagrams and figures
- Handwritten calculus work
- Textbook problems and exercises
- Calculator screens and outputs

For image analysis:
- Describe what you see in mathematical terms
- Identify the specific calculus concepts involved
- Provide step-by-step solutions if it's a problem
- Explain any graphs, functions, or mathematical relationships
- Point out errors in work if you see them
- Suggest next steps or related concepts to explore

TEACHING STYLE:
- Explain concepts in clear, easy-to-understand language
- Break down complex problems into step-by-step solutions
- Provide intuitive explanations alongside mathematical rigor
- Use examples and analogies when helpful
- Encourage understanding over memorization
- Be patient and supportive
- Always format mathematical expressions properly with LaTeX

CAPABILITIES:
- Answer questions about any calculus topic
- Explain formulas and their applications
- Help with problem-solving strategies
- Provide step-by-step solutions with proper math formatting
- Clarify mathematical concepts
- Suggest practice approaches
- Analyze uploaded images containing mathematical content

Always be encouraging and focus on helping the student build genuine understanding of calculus concepts. Remember to format all mathematical expressions using proper LaTeX notation so they render beautifully in the interface.`;
  }
}