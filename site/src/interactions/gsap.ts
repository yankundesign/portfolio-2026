import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, CustomEase);

export { gsap, useGSAP, CustomEase };
