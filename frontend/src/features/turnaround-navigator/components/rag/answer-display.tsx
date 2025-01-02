import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

interface SourceDocument {
  content: string;
  metadata: {
    location: string;
    score: number;
  };
}

interface AnswerDisplayProps {
  answer: string;
  sources: SourceDocument[];
}

export const AnswerDisplay = ({ answer, sources }: AnswerDisplayProps) => {
  const renderAnswer = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Numbered points
      if (/^\d+\./.test(trimmedLine)) {
        return (
          <div key={index} className="mt-3 mb-2">
            <p className="font-semibold text-gray-900">{trimmedLine}</p>
          </div>
        );
      }
      
      // Bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('*')) {
        return (
          <div key={index} className="ml-4 my-2">
            <p className="text-gray-800">{trimmedLine}</p>
          </div>
        );
      }
      
      // Sub-points or additional information
      if (trimmedLine && line.startsWith(' ')) {
        return (
          <div key={index} className="ml-6 my-1">
            <p className="text-gray-700 text-sm">{trimmedLine}</p>
          </div>
        );
      }
      
      // Regular text
      if (trimmedLine) {
        return (
          <div key={index} className="my-2">
            <p className="text-gray-800">{trimmedLine}</p>
          </div>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="space-y-4">
      <div className="prose dark:prose-invert max-w-none">
        {renderAnswer(answer)}
      </div>

      {/* Compact Sources */}
      <div className="mt-4">
        <details className="bg-gray-50 rounded-lg text-sm">
          <summary className="cursor-pointer p-2 text-blue-600 hover:text-blue-800 font-medium">
            View Sources ({sources.length})
          </summary>
          <div className="p-3 space-y-2">
            {sources.map((source, idx) => (
              <div key={idx} className="bg-white p-2 rounded border">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700">
                    {source.metadata.location || `Source ${idx + 1}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.round(source.metadata.score * 100)}% relevant
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{source.content}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};