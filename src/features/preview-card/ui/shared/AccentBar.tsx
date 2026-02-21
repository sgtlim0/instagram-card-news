'use client'

interface AccentBarProps {
  color: string
}

export function AccentBar({ color }: AccentBarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: color,
      }}
    />
  )
}
