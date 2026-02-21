import type { SlideFieldSchema, SlideType } from '@/shared/types/slide'

export const SLIDE_ICONS: Record<SlideType, string> = {
  'cover': '\u2726',
  'content': '\u25C8',
  'content-stat': '\u25C9',
  'content-list': '\u2261',
  'content-quote': '\u275D',
  'content-steps': '\u27F6',
  'content-split': '\u229E',
  'content-grid': '\u2637',
  'content-highlight': '\u2605',
  'content-bigdata': '\u25CF',
  'content-badge': '\u2606',
  'content-image': '\u25A3',
  'content-fullimage': '\u25A0',
  'cta': '\u2192',
} as const

export const SLIDE_TYPE_LABELS: Record<SlideType, string> = {
  'cover': 'Cover',
  'content': 'Content',
  'content-stat': 'Stat',
  'content-list': 'List',
  'content-quote': 'Quote',
  'content-steps': 'Steps',
  'content-split': 'Split',
  'content-grid': 'Grid',
  'content-highlight': 'Highlight',
  'content-bigdata': 'Big Data',
  'content-badge': 'Badge',
  'content-image': 'Image',
  'content-fullimage': 'Full Image',
  'cta': 'CTA',
} as const

export const ALL_SLIDE_TYPES: readonly SlideType[] = [
  'cover', 'content', 'content-stat', 'content-quote', 'content-badge',
  'content-steps', 'content-list', 'content-split', 'content-highlight',
  'content-image', 'content-grid', 'content-bigdata', 'content-fullimage', 'cta',
] as const

export const SLIDE_SCHEMAS: Record<SlideType, readonly SlideFieldSchema[]> = {
  'cover': [
    { key: 'headline_label', label: 'Label', type: 'text', placeholder: 'TRENDING' },
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Main title...' },
    { key: 'subtext', label: 'Subtext', type: 'textarea', placeholder: 'Short description...' },
  ],
  'content': [
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Section title...' },
    { key: 'body', label: 'Body', type: 'textarea', placeholder: 'Content text...' },
    { key: 'emphasis', label: 'Emphasis', type: 'text', placeholder: 'Key point...' },
  ],
  'content-badge': [
    { key: 'badge_text', label: 'Badge', type: 'text', placeholder: 'TIP' },
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Section title...' },
    { key: 'body', label: 'Body', type: 'textarea', placeholder: 'Content text...' },
  ],
  'content-stat': [
    { key: 'headline', label: 'Label', type: 'text', placeholder: 'Metric name...' },
    { key: 'emphasis', label: 'Number', type: 'text', placeholder: '73%' },
    { key: 'body', label: 'Description', type: 'textarea', placeholder: 'Context...' },
  ],
  'content-quote': [
    { key: 'body', label: 'Quote', type: 'textarea', placeholder: 'Quote text...' },
    { key: 'headline', label: 'Source', type: 'text', placeholder: 'Author / Source' },
  ],
  'content-list': [
    { key: 'headline', label: 'Title', type: 'textarea', placeholder: 'List title...' },
    { key: 'item1', label: 'Item 1', type: 'text', placeholder: 'First item...' },
    { key: 'item2', label: 'Item 2', type: 'text', placeholder: 'Second item...' },
    { key: 'item3', label: 'Item 3', type: 'text', placeholder: 'Third item...' },
    { key: 'item4', label: 'Item 4', type: 'text', placeholder: 'Fourth item...' },
    { key: 'item5', label: 'Item 5', type: 'text', placeholder: 'Fifth item...' },
  ],
  'content-steps': [
    { key: 'headline', label: 'Title', type: 'textarea', placeholder: 'Steps title...' },
    { key: 'step1', label: 'Step 1', type: 'text', placeholder: 'First step...' },
    { key: 'step2', label: 'Step 2', type: 'text', placeholder: 'Second step...' },
    { key: 'step3', label: 'Step 3', type: 'text', placeholder: 'Third step...' },
  ],
  'content-split': [
    { key: 'headline', label: 'Title', type: 'textarea', placeholder: 'Comparison title...' },
    { key: 'left_title', label: 'Left Title', type: 'text', placeholder: 'Before...' },
    { key: 'left_body', label: 'Left Body', type: 'textarea', placeholder: 'Left content...' },
    { key: 'right_title', label: 'Right Title', type: 'text', placeholder: 'After...' },
    { key: 'right_body', label: 'Right Body', type: 'textarea', placeholder: 'Right content...' },
  ],
  'content-grid': [
    { key: 'headline', label: 'Title', type: 'textarea', placeholder: 'Grid title...' },
    { key: 'item1', label: 'Item 1', type: 'text', placeholder: 'Grid item 1...' },
    { key: 'item2', label: 'Item 2', type: 'text', placeholder: 'Grid item 2...' },
    { key: 'item3', label: 'Item 3', type: 'text', placeholder: 'Grid item 3...' },
    { key: 'item4', label: 'Item 4', type: 'text', placeholder: 'Grid item 4...' },
  ],
  'content-highlight': [
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Key message...' },
    { key: 'body', label: 'Body', type: 'textarea', placeholder: 'Supporting text...' },
  ],
  'content-bigdata': [
    { key: 'headline', label: 'Label', type: 'text', placeholder: 'Metric name...' },
    { key: 'bigdata_number', label: 'Number', type: 'text', placeholder: '1,000,000' },
    { key: 'bigdata_unit', label: 'Unit', type: 'text', placeholder: 'Users' },
    { key: 'body', label: 'Description', type: 'textarea', placeholder: 'Context...' },
  ],
  'content-image': [
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Image caption...' },
    { key: 'body', label: 'Body', type: 'textarea', placeholder: 'Description...' },
    { key: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
  ],
  'content-fullimage': [
    { key: 'headline', label: 'Overlay Text', type: 'textarea', placeholder: 'Bold statement...' },
    { key: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
  ],
  'cta': [
    { key: 'headline', label: 'CTA Headline', type: 'textarea', placeholder: 'Call to action...' },
    { key: 'cta_text', label: 'Button Text', type: 'text', placeholder: 'Follow Now' },
    { key: 'tag1', label: 'Tag 1', type: 'text', placeholder: 'Hashtag...' },
    { key: 'tag2', label: 'Tag 2', type: 'text', placeholder: 'Hashtag...' },
    { key: 'tag3', label: 'Tag 3', type: 'text', placeholder: 'Hashtag...' },
  ],
} as const
