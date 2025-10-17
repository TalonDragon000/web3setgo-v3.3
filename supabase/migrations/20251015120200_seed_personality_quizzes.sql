/*
  # Seed Personality Quizzes
  
  Migrate the three hardcoded personality quizzes from QuizPage.tsx into the database:
  1. Is Web3 For Me? (web3-for-me)
  2. Web3 Career Assessment (career-assessment)
  3. Are You Bull or Bear? (bull-or-bear)
*/

-- Insert: Is Web3 For Me?
INSERT INTO quizzes (
  slug,
  title,
  description,
  quiz_type,
  icon,
  color_scheme,
  questions,
  result_categories,
  order_index,
  published
) VALUES (
  'web3-for-me',
  'Is Web3 For Me?',
  'Discover which Web3 features could benefit your work and lifestyle',
  'personality',
  'Target',
  'from-mint-500 to-ocean-500',
  '[
    {
      "id": "work-type",
      "question": "What best describes your work?",
      "options": [
        {"id": "creative", "text": "Creative work (art, writing, music)", "value": 3, "category": "creator"},
        {"id": "business", "text": "Business/entrepreneurship", "value": 2, "category": "business"},
        {"id": "tech", "text": "Technology/development", "value": 3, "category": "tech"},
        {"id": "finance", "text": "Finance/investing", "value": 3, "category": "finance"},
        {"id": "other", "text": "Other profession", "value": 1, "category": "general"}
      ]
    },
    {
      "id": "pain-points",
      "question": "What frustrates you most about current systems?",
      "options": [
        {"id": "middlemen", "text": "Too many middlemen taking cuts", "value": 3, "category": "creator"},
        {"id": "control", "text": "Lack of control over my data", "value": 2, "category": "privacy"},
        {"id": "access", "text": "Limited access to global markets", "value": 3, "category": "business"},
        {"id": "fees", "text": "High transaction fees", "value": 2, "category": "finance"},
        {"id": "none", "text": "Current systems work fine for me", "value": 0, "category": "general"}
      ]
    },
    {
      "id": "interests",
      "question": "Which Web3 concept interests you most?",
      "options": [
        {"id": "nfts", "text": "Owning digital assets (NFTs)", "value": 3, "category": "creator"},
        {"id": "defi", "text": "Decentralized finance (DeFi)", "value": 3, "category": "finance"},
        {"id": "dao", "text": "Community governance (DAOs)", "value": 2, "category": "business"},
        {"id": "identity", "text": "Digital identity control", "value": 2, "category": "privacy"},
        {"id": "unsure", "text": "Not sure yet", "value": 1, "category": "general"}
      ]
    }
  ]'::jsonb,
  '{
    "creator": {
      "title": "Web3 Creator",
      "description": "Web3 offers powerful tools for creators like you!",
      "advice": "Explore NFT marketplaces, creator DAOs, and direct fan monetization. You could benefit from royalty systems and cutting out traditional middlemen."
    },
    "finance": {
      "title": "DeFi Explorer",
      "description": "Decentralized finance could revolutionize your financial activities.",
      "advice": "Start with yield farming, liquidity pools, and decentralized exchanges. Learn about lending protocols and automated market makers."
    },
    "business": {
      "title": "Web3 Entrepreneur",
      "description": "Web3 opens new business models and global opportunities.",
      "advice": "Investigate DAOs, tokenomics, and blockchain-based business models. Consider how smart contracts could automate your processes."
    },
    "tech": {
      "title": "Web3 Builder",
      "description": "Your technical skills are perfect for the Web3 ecosystem.",
      "advice": "Dive into smart contract development, dApp creation, and blockchain protocols. The demand for Web3 developers is huge!"
    },
    "privacy": {
      "title": "Digital Sovereignty Seeker",
      "description": "Web3 aligns with your desire for data control and privacy.",
      "advice": "Focus on self-sovereign identity, decentralized storage, and privacy-focused protocols. You will love having control over your digital footprint."
    },
    "general": {
      "title": "Web3 Curious",
      "description": "Web3 might not be immediately relevant, but it is worth understanding.",
      "advice": "Start with basic education about blockchain and cryptocurrency. Keep an eye on developments that might affect your industry in the future."
    }
  }'::jsonb,
  1,
  true
) ON CONFLICT (slug) DO NOTHING;

-- Insert: Web3 Career Assessment
INSERT INTO quizzes (
  slug,
  title,
  description,
  quiz_type,
  icon,
  color_scheme,
  questions,
  result_categories,
  order_index,
  published
) VALUES (
  'career-assessment',
  'Web3 Career Assessment',
  'Find your ideal Web3 career path based on your interests and skills',
  'personality',
  'Briefcase',
  'from-success-500 to-mint-500',
  '[
    {
      "id": "skills",
      "question": "What are your strongest skills?",
      "options": [
        {"id": "coding", "text": "Programming and development", "value": 3, "category": "developer"},
        {"id": "design", "text": "Design and user experience", "value": 2, "category": "designer"},
        {"id": "writing", "text": "Writing and communication", "value": 2, "category": "content"},
        {"id": "analysis", "text": "Data analysis and research", "value": 3, "category": "analyst"},
        {"id": "people", "text": "Working with people and teams", "value": 2, "category": "community"}
      ]
    },
    {
      "id": "work-style",
      "question": "What work environment do you prefer?",
      "options": [
        {"id": "technical", "text": "Deep technical problem-solving", "value": 3, "category": "developer"},
        {"id": "creative", "text": "Creative and visual projects", "value": 3, "category": "designer"},
        {"id": "research", "text": "Research and analysis", "value": 3, "category": "analyst"},
        {"id": "social", "text": "Community building and engagement", "value": 3, "category": "community"},
        {"id": "education", "text": "Teaching and content creation", "value": 3, "category": "content"}
      ]
    },
    {
      "id": "motivation",
      "question": "What motivates you most about Web3?",
      "options": [
        {"id": "innovation", "text": "Building cutting-edge technology", "value": 3, "category": "developer"},
        {"id": "adoption", "text": "Making Web3 accessible to everyone", "value": 2, "category": "designer"},
        {"id": "education", "text": "Helping others understand Web3", "value": 3, "category": "content"},
        {"id": "data", "text": "Understanding market trends", "value": 3, "category": "analyst"},
        {"id": "community", "text": "Building strong communities", "value": 3, "category": "community"}
      ]
    }
  ]'::jsonb,
  '{
    "developer": {
      "title": "Web3 Developer",
      "description": "You are perfect for building the future of the internet!",
      "advice": "Focus on Solidity, smart contract development, and dApp creation. Consider specializing in DeFi protocols, NFT platforms, or Layer 2 solutions."
    },
    "designer": {
      "title": "Web3 UX/UI Designer",
      "description": "Web3 desperately needs great designers to improve user experience.",
      "advice": "Learn about wallet UX, DeFi interfaces, and NFT marketplaces. Your skills in making complex systems simple are invaluable in Web3."
    },
    "analyst": {
      "title": "Web3 Analyst",
      "description": "Your analytical skills are crucial for understanding Web3 markets.",
      "advice": "Dive into on-chain analytics, tokenomics research, and DeFi protocol analysis. Consider roles at crypto funds or research firms."
    },
    "content": {
      "title": "Web3 Content Creator",
      "description": "Web3 needs clear communicators to bridge the knowledge gap.",
      "advice": "Create educational content, technical documentation, or community resources. Consider roles in developer relations or content marketing."
    },
    "community": {
      "title": "Web3 Community Manager",
      "description": "Strong communities are the backbone of successful Web3 projects.",
      "advice": "Focus on Discord/Telegram management, DAO governance, and community growth strategies. Your people skills are essential for Web3 adoption."
    }
  }'::jsonb,
  2,
  true
) ON CONFLICT (slug) DO NOTHING;

-- Insert: Are You Bull or Bear?
INSERT INTO quizzes (
  slug,
  title,
  description,
  quiz_type,
  icon,
  color_scheme,
  questions,
  result_categories,
  order_index,
  published
) VALUES (
  'bull-or-bear',
  'Are You Bull or Bear?',
  'Discover your Web3 and crypto sentiment and investment personality',
  'personality',
  'TrendingUp',
  'from-accentYellow-500 to-orange-500',
  '[
    {
      "id": "market-view",
      "question": "How do you view the current crypto market?",
      "options": [
        {"id": "bullish", "text": "Very optimistic - we are going to the moon! 🚀", "value": 3, "category": "bull"},
        {"id": "cautious-bull", "text": "Optimistic but cautious", "value": 2, "category": "bull"},
        {"id": "neutral", "text": "Neutral - waiting to see what happens", "value": 0, "category": "neutral"},
        {"id": "cautious-bear", "text": "Pessimistic but open-minded", "value": -2, "category": "bear"},
        {"id": "bearish", "text": "Very pessimistic - it is all going to crash", "value": -3, "category": "bear"}
      ]
    },
    {
      "id": "investment-style",
      "question": "What is your investment approach?",
      "options": [
        {"id": "hodl", "text": "HODL forever - diamond hands 💎", "value": 3, "category": "bull"},
        {"id": "dca", "text": "Dollar-cost averaging regularly", "value": 2, "category": "bull"},
        {"id": "swing", "text": "Buy dips, sell peaks", "value": 0, "category": "neutral"},
        {"id": "minimal", "text": "Very small, experimental amounts", "value": -1, "category": "bear"},
        {"id": "none", "text": "I do not invest in crypto", "value": -3, "category": "bear"}
      ]
    },
    {
      "id": "future-outlook",
      "question": "Where do you see Web3 in 5 years?",
      "options": [
        {"id": "mainstream", "text": "Mainstream adoption everywhere", "value": 3, "category": "bull"},
        {"id": "growing", "text": "Steady growth and real use cases", "value": 2, "category": "bull"},
        {"id": "niche", "text": "Useful but still niche", "value": 0, "category": "neutral"},
        {"id": "struggling", "text": "Still struggling with adoption", "value": -2, "category": "bear"},
        {"id": "failed", "text": "Mostly failed experiment", "value": -3, "category": "bear"}
      ]
    }
  ]'::jsonb,
  '{
    "bull": {
      "title": "🐂 Crypto Bull",
      "description": "You are optimistic about Web3 future and ready to ride the waves!",
      "advice": "Your enthusiasm is great, but remember to manage risk. Consider DCA strategies, diversification, and never invest more than you can afford to lose. Stay informed about market cycles."
    },
    "bear": {
      "title": "🐻 Crypto Bear",
      "description": "You are skeptical about Web3 and prefer to be cautious.",
      "advice": "Your caution is valuable in volatile markets. Consider starting with education rather than investment. If you do invest, start very small and focus on established projects with real utility."
    },
    "neutral": {
      "title": "🦎 Crypto Chameleon",
      "description": "You adapt to market conditions and stay balanced.",
      "advice": "Your balanced approach is wise. Focus on fundamental analysis, diversification, and having both bull and bear market strategies. You are well-positioned for long-term success."
    }
  }'::jsonb,
  3,
  true
) ON CONFLICT (slug) DO NOTHING;

