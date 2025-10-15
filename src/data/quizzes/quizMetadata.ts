export interface QuizMetadata {
  slug: string;
  title: string;
  description: string;
  icon: string;
  colorScheme: string;
}

export const quizMetadata: QuizMetadata[] = [
  {
    slug: 'web3-for-me',
    title: 'Is Web3 For Me?',
    description: 'Discover which Web3 features could benefit your work and lifestyle',
    icon: 'Target',
    colorScheme: 'from-mint-500 to-ocean-500'
  },
  {
    slug: 'career-assessment',
    title: 'Web3 Career Assessment',
    description: 'Find your ideal Web3 career path based on your interests and skills',
    icon: 'Briefcase',
    colorScheme: 'from-success-500 to-mint-500'
  },
  {
    slug: 'bull-or-bear',
    title: 'Are You Bull or Bear?',
    description: 'Discover your Web3 and crypto sentiment and investment personality',
    icon: 'TrendingUp',
    colorScheme: 'from-accentYellow-500 to-orange-500'
  }
];
