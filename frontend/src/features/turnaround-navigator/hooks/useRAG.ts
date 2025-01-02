// src/features/turnaround-navigator/hooks/useRAG.ts

import { useState } from 'react';

interface RAGResponse {
  answer: string;
  source_documents: Array<{
    content: string;
    metadata: {
      score: number;
      location: string;
    };
  }>;
  error: string | null;
}

interface UseRAGOptions {
  streaming?: boolean;
  onToken?: (token: string) => void;
}

const API_BASE_URL = 'http://localhost:8001';

export function useRAG({ streaming = false, onToken }: UseRAGOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = async (question: string): Promise<RAGResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = streaming ? '/api/rag/stream' : '/api/rag/query';
      
      if (streaming && onToken) {
        const eventSource = new EventSource(
          `${API_BASE_URL}${endpoint}?question=${encodeURIComponent(question)}`
        );
        
        return new Promise((resolve, reject) => {
          let fullResponse = '';
          
          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            fullResponse += data.token;
            onToken(data.token);
          };
          
          eventSource.onerror = (error) => {
            eventSource.close();
            reject(error);
          };
          
          eventSource.addEventListener('end', () => {
            eventSource.close();
            resolve({ 
              answer: fullResponse, 
              source_documents: [],
              error: null 
            });
          });
        });
      }
      
      // Non-streaming request
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('RAG query error:', err);
      setError(errorMessage);
      return { 
        answer: '', 
        source_documents: [],
        error: errorMessage 
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    isLoading,
    error
  };
}