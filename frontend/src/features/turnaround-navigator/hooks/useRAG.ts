// features/turnaround-navigator/hooks/useRAG.ts
import { RAGResponse } from '../types';

export const useRAG = () => {
  const handleQuery = async (question: string): Promise<RAGResponse> => {
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in RAG query:', error);
      return {
        answer: "I'm sorry, I encountered an error processing your request.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  return { handleQuery };
};