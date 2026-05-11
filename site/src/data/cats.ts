/**
 * Cat roulette data.
 *
 * Six moods of Yogurt (Yankun's British Shorthair). Each id corresponds to a
 * hand-drawn PNG at /public/cats/{id}.png.
 *
 * Labels are first-person, cat-voice, short. They read as captions on a
 * field-notebook page, not marketing copy.
 */

export type YogurtPose =
  | 'lounge'
  | 'feed'
  | 'caught'
  | 'belly'
  | 'yarn'
  | 'sleep';

export interface Cat {
  id: YogurtPose;
  label: string;
  ariaLabel: string;
}

export const cats: Cat[] = [
  {
    id: 'lounge',
    label: 'long mode: engaged',
    ariaLabel: 'Yogurt stretched out along a cat scratcher',
  },
  {
    id: 'feed',
    label: 'where is the food',
    ariaLabel: 'Yogurt sitting upright, wide-eyed and attentive',
  },
  {
    id: 'caught',
    label: 'this is my chair now',
    ariaLabel: 'Yogurt on a small stool with front paws dangling off the edge',
  },
  {
    id: 'belly',
    label: 'belly access: granted',
    ariaLabel: 'Yogurt lying on his back with his belly exposed',
  },
  {
    id: 'yarn',
    label: 'the yarn lost',
    ariaLabel: 'Yogurt lying on his side with a ball of yarn',
  },
  {
    id: 'sleep',
    label: 'currently unavailable',
    ariaLabel: 'Yogurt curled up asleep',
  },
];
