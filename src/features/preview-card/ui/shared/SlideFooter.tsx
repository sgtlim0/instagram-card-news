'use client'

interface SlideFooterProps {
  account: string
  index: number
  total: number
  subtextColor: string
  font: string
}

export function SlideFooter({
  account,
  index,
  total,
  subtextColor,
  font,
}: SlideFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        color: subtextColor,
        fontFamily: font,
        marginTop: 'auto',
      }}
    >
      <span style={{ fontWeight: 500 }}>{account}</span>
      <span style={{ opacity: 0.7 }}>
        {index + 1} / {total}
      </span>
    </div>
  )
}
