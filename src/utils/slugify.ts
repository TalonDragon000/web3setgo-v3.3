export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateUniqueSlug = (title: string, existingSlugs: string[] = []): string => {
  let slug = slugify(title);
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${slugify(title)}-${counter}`;
    counter++;
  }

  return slug;
};
