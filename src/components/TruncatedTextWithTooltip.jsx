import React from 'react';
import { Tooltip } from '@mui/material';

// Utility function to truncate text to 10 words and add tooltip
export const truncateTextWithTooltip = (text, maxWords = 10) => {
  if (!text || typeof text !== 'string') return { displayText: '', showTooltip: false };
  
  const words = text.trim().split(/\s+/);
  const showTooltip = words.length > maxWords;
  
  if (showTooltip) {
    const truncatedWords = words.slice(0, maxWords);
    const displayText = truncatedWords.join(' ') + '...';
    return { displayText, showTooltip: true, fullText: text };
  }
  
  return { displayText: text, showTooltip: false };
};

// Tooltip component for truncated text
export const TruncatedTextWithTooltip = ({ text, maxWords = 10, className = "" }) => {
  const { displayText, showTooltip, fullText } = truncateTextWithTooltip(text, maxWords);
  
  // Handle empty text
  if (!text || text.trim() === '') {
    return <span className={className}>-</span>;
  }
  
  // Always show tooltip on hover, even if text is not truncated
  return (
    <Tooltip 
      title={fullText || text} 
      arrow 
      placement="top"
      enterDelay={300}
      leaveDelay={100}
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'rgba(0, 0, 0, 0.87)',
            color: 'white',
            fontSize: '12px',
            maxWidth: '300px',
            wordWrap: 'break-word'
          }
        }
      }}
    >
      <span className={`${className} cursor-help hover:underline transition-all duration-200`}>
        {displayText}
      </span>
    </Tooltip>
  );
};
