import { HfInference } from '@huggingface/inference';

// Use the token from Vite's environment variables
const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);

/**
 * Generic text generation helper using Hugging Face
 */
export async function generateText(prompt) {
  try {
    const result = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
        return_full_text: false
      }
    }, {
      wait_for_model: true
    });
    return result.generated_text;
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    throw new Error(error.message || "Failed to connect to Hugging Face AI.");
  }
}
