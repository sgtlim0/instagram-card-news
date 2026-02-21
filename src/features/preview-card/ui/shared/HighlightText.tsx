'use client'

import React from 'react'

interface HighlightTextProps {
  text: string
  accentColor: string
}

export function parseHighlight(text: string, accentColor: string): React.ReactNode {
  const parts = text.split(/(<span class=['"]highlight['"]>.*?<\/span>)/g)

  return parts.map((part, index) => {
    const match = part.match(/<span class=['"]highlight['"]>(.*?)<\/span>/)
    if (match) {
      return (
        <span
          key={index}
          style={{
            backgroundColor: accentColor,
            color: '#000',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 600,
          }}
        >
          {match[1]}
        </span>
      )
    }
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

export function HighlightText({ text, accentColor }: HighlightTextProps) {
  return <>{parseHighlight(text, accentColor)}</>
}
