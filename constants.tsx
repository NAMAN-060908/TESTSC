
import { ProgramTier, Course } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'n1',
    title: 'Digital Fluency 101',
    description: 'Master the essential tools and mental models for modern work.',
    duration: '4 Hours',
    tier: ProgramTier.NANO,
    outcomes: ['Tool Mastery', 'Cloud Workflow', 'Prompt Engineering'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    price: 49
  },
  {
    id: 's1',
    title: 'Rapid Product Management',
    description: 'Hands-on sprint to build a product roadmap from scratch.',
    duration: '12 Hours',
    tier: ProgramTier.SPRINT,
    outcomes: ['Product Roadmap', 'User Stories', 'PRD Writing'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    price: 199
  },
  {
    id: 'p1',
    title: 'Full-Stack Business Analyst',
    description: 'A comprehensive pathway to data-driven decision making.',
    duration: '35 Hours',
    tier: ProgramTier.PATHWAY,
    outcomes: ['Data Viz', 'SQL Mastery', 'Business Strategy'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    price: 499
  },
  {
    id: 'l1',
    title: 'The Launchpad: Leadership & Tech',
    description: 'Our flagship transformation program with 100% placement guarantee.',
    duration: '4 Months',
    tier: ProgramTier.LAUNCHPAD,
    outcomes: ['Job Guarantee', 'Leadership Skills', 'Portfolio Creation'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    price: 1299
  }
];

export const TIER_INFO = {
  [ProgramTier.NANO]: {
    label: '4-6 Hours',
    description: 'Introductory sharp journeys into high-growth tech domains.'
  },
  [ProgramTier.SPRINT]: {
    label: '10-15 Hours',
    description: 'Hands-on speed and intensity for active skillers wanting results fast.'
  },
  [ProgramTier.PATHWAY]: {
    label: '30-40 Hours',
    description: 'Portfolio-oriented structured progress with mentorship.'
  },
  [ProgramTier.LAUNCHPAD]: {
    label: '4 Months',
    description: 'Our Elite Star Program. Internship included with a Placement Guarantee.'
  }
};
