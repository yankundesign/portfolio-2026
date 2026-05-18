export const aboutParagraphs = [
  'I work on systems where the surface is small and the underneath is enormous — admin tools, AI assistants, the kind of software with a thousand settings and no front door. Most of what I do is making that underneath legible. CHAI is the work I’d point at first.',
  'I came to product design from architecture. I kept the part about thinking in floor plans. I let go of the part where you wait eight years to see anything stand up.',
  'I’m in San Francisco, looking for a small team where design and build aren’t different jobs.',
];

export const heroAnnotation = {
  location: 'SAN FRANCISCO, CA',
  date: 'APRIL 2026',
  note: 'THE FRONT-DOOR PROBLEM',
};

export interface AboutCodaItem {
  id: string;
  caption: string;
  fig: number;
  rotation: string;
  tape: 'left' | 'center' | 'right';
}

export const aboutCoda: AboutCodaItem[] = [
  {
    id: 'studio',
    caption: 'STUDIO 2 · 2010',
    fig: 7,
    rotation: '-6deg',
    tape: 'left',
  },
  {
    id: 'sf',
    caption: 'SF · APR 2026',
    fig: 8,
    rotation: '3deg',
    tape: 'center',
  },
  {
    id: 'review',
    caption: 'FIRST REVIEW',
    fig: 9,
    rotation: '-1deg',
    tape: 'right',
  },
];
