import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

interface Topic {
  title: string;
  formulas?: string[];
  concepts?: string[];
  explanation?: string;
}

interface ModuleCardProps {
  title: string;
  topics: Topic[];
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, topics }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-2 border-blue-500 bg-black mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-blue-950 transition-colors duration-200"
      >
        <h2 className="text-xl font-bold text-white font-mono text-left">
          {title}
        </h2>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-blue-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-blue-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="border-t-2 border-blue-500 p-4 bg-gray-900">
          {topics.map((topic, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-white font-mono mb-3 border-l-4 border-blue-500 pl-3">
                {topic.title}
              </h3>
              
              {topic.explanation && (
                <p className="text-gray-300 mb-3 font-mono text-sm leading-relaxed">
                  {topic.explanation}
                </p>
              )}
              
              {topic.formulas && (
                <div className="mb-3">
                  <h4 className="text-md font-semibold text-blue-400 font-mono mb-2">
                    KEY FORMULAS:
                  </h4>
                  <div className="space-y-2">
                    {topic.formulas.map((formula, fIndex) => (
                      <div key={fIndex} className="p-3 bg-black border border-blue-700">
                        <BlockMath math={formula} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {topic.concepts && (
                <div>
                  <h4 className="text-md font-semibold text-blue-400 font-mono mb-2">
                    CONCEPTS:
                  </h4>
                  <ul className="space-y-1">
                    {topic.concepts.map((concept, cIndex) => (
                      <li key={cIndex} className="text-gray-300 font-mono text-sm">
                        • {concept}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;