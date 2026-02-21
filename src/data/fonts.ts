import { FontOption } from '@/types/configurator';

export const fontOptions: FontOption[] = [
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    family: "'Playfair Display', serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
    previewText: 'Elegant Serif',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: "'Montserrat', sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap',
    previewText: 'Modern Sans',
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    family: "'Dancing Script', cursive",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap',
    previewText: 'Flowing Script',
  },
  {
    id: 'cormorant-garamond',
    name: 'Cormorant Garamond',
    family: "'Cormorant Garamond', serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&display=swap',
    previewText: 'Classic Elegance',
  },
  {
    id: 'raleway',
    name: 'Raleway',
    family: "'Raleway', sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap',
    previewText: 'Clean Modern',
  },
  {
    id: 'great-vibes',
    name: 'Great Vibes',
    family: "'Great Vibes', cursive",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap',
    previewText: 'Artistic Calligraphy',
  },
];

// Generate combined Google Fonts URL for preloading all fonts
export function getAllFontsUrl(): string {
  const families = fontOptions.map(font => {
    const name = font.name.replace(/ /g, '+');
    return `family=${name}:wght@400;600;700`;
  });
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

// Helper function to get font by ID
export function getFontById(id: string): FontOption | undefined {
  return fontOptions.find(font => font.id === id);
}

// Default font (first option)
export const defaultFont = fontOptions[0];

export default fontOptions;
