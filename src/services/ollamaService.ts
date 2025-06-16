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

TEACHING STYLE:
- Explain concepts in clear, easy-to-understand language
- Break down complex problems into step-by-step solutions
- Provide intuitive explanations alongside mathematical rigor
- Use examples and analogies when helpful
- Encourage understanding over memorization
- Be patient and supportive

CAPABILITIES:
- Answer questions about any calculus topic
- Explain formulas and their applications
- Help with problem-solving strategies
- Provide step-by-step solutions
- Clarify mathematical concepts
- Suggest practice approaches

Always be encouraging and focus on helping the student build genuine understanding of calculus concepts.`;
  }
}