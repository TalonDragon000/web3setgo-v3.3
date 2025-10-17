const WORD_LIST = [
  // --- A words (50) ---
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
  'absurd', 'abuse', 'access', 'account', 'accuse', 'achieve', 'acquire', 'across',
  'act', 'action', 'actor', 'actual', 'adapt', 'add', 'address', 'adjust',
  'admit', 'adult', 'advance', 'advice', 'afford', 'afraid', 'again', 'age',
  'agent', 'agree', 'ahead', 'aim', 'air', 'airport', 'alarm', 'album',
  'alert', 'alien', 'allow', 'almost', 'alone', 'alpha', 'already', 'also',
  'alter', 'always',

  // --- B words (50) ---
  'baby', 'bachelor', 'bacon', 'badge', 'bag', 'balance', 'ball', 'bamboo',
  'banana', 'bar', 'barely', 'bargain', 'base', 'basic', 'basket', 'battle',
  'beach', 'bean', 'beauty', 'become', 'before', 'begin', 'behind', 'believe',
  'below', 'benefit', 'best', 'between', 'bicycle', 'bike', 'bird', 'birth',
  'black', 'blade', 'blanket', 'blast', 'blend', 'blind', 'blood', 'blue',
  'board', 'boat', 'body', 'boil', 'book', 'boss', 'bottom', 'bounce',
  'box', 'boy',

  // --- C words (50) ---
  'cabin', 'cable', 'cactus', 'cake', 'call', 'calm', 'camera', 'camp',
  'can', 'canal', 'cancel', 'candy', 'canoe', 'canvas', 'capital', 'captain',
  'car', 'carbon', 'card', 'cargo', 'carpet', 'carry', 'cart', 'case',
  'cash', 'castle', 'cat', 'catch', 'cause', 'cave', 'ceiling', 'cell',
  'century', 'certain', 'chair', 'chalk', 'change', 'charge', 'chase', 'chat',
  'cheap', 'check', 'cheese', 'chef', 'cherry', 'chest', 'chicken', 'chief',
  'child', 'choice'
];


export const generateMockSeedPhrase = (): string[] => {
  const seedPhrase: string[] = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    seedPhrase.push(WORD_LIST[randomIndex]);
  }
  return seedPhrase;
};

export const generateMockAddress = (): string => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

export const generateMockPrivateKey = (): string => {
  const chars = '0123456789abcdef';
  let key = '0x';
  for (let i = 0; i < 64; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
};

export const shortenAddress = (address: string): string => {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatMockBalance = (decimals: number = 2): string => {
  const balance = (Math.random() * 10).toFixed(decimals);
  return balance;
};
