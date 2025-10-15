export const shouldUseDefaultImage = (imageUrl: string | undefined | null): boolean => {
  if (!imageUrl) return true;

  const oldDefaultImages = [
    '/nova-come-trans.png',
    '/nova-come.png',
    '/nova-intro.png',
    '/nova-404.png'
  ];

  return oldDefaultImages.includes(imageUrl);
};

export const getDefaultImageType = (type: string): string => {
  const validTypes = ['lesson', 'devlog', 'news', 'article'];
  return validTypes.includes(type) ? type : 'article';
};
