export const aboutParagraphs = [
  'I work on systems where the surface is small and the underneath is enormous — admin tools, AI assistants, the kind of software with a thousand settings and no front door. Most of what I do is making that underneath legible. CHAI is the work I’d point at first.',
  'I came to product design from architecture. I kept the part about thinking in floor plans. I let go of the part where you wait eight years to see anything stand up.',
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
  image: string;
  alt: string;
}

export const aboutCoda: AboutCodaItem[] = [
  {
    id: 'yogurt',
    caption: 'MY CAT - YOGURT',
    fig: 7,
    rotation: '-6deg',
    image: '/images/about/yogurt.png',
    alt: 'A jar of homemade yogurt on the kitchen counter.',
  },
  {
    id: 'outdoor',
    caption: 'OUTSIDE · SOMETIMES',
    fig: 8,
    rotation: '3deg',
    image: '/images/about/outdoor.png',
    alt: 'Outside, somewhere in the Bay Area.',
  },
  {
    id: 'hobby',
    caption: 'OFF-HOURS',
    fig: 9,
    rotation: '-1deg',
    image: '/images/about/hobby.png',
    alt: 'An off-hours hobby moment.',
  },
];
