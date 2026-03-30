export const palette = {
  background: '#f5f3f1',
  surface: '#ffffff',
  card: '#f0ebe5',
  primary: '#7c5b4e',
  primarySoft: '#a98676',
  accent: '#d0b499',
  secondary: '#c6a27f',
  text: '#2a2019',
  textMuted: '#7c6d63',
  border: '#e5ddd4',
  positive: '#4caf50',
};

export const radii = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
};

export const typography = {
  family: '"Sora", "Inter", "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weightBold: 600,
  weightMedium: 500,
  weightRegular: 400,
};

export const elevation = {
  card: '0 25px 45px rgba(46, 35, 28, 0.08)',
  subtle: '0 10px 25px rgba(46, 35, 28, 0.05)',
};

export const spacing = (multiplier = 1) => multiplier * 8;

export const shadowStyle = (type = 'card') => ({
  shadowColor: 'rgba(0,0,0,0.15)',
  shadowOffset: { width: 0, height: type === 'card' ? 20 : 8 },
  shadowOpacity: type === 'card' ? 0.08 : 0.05,
  shadowRadius: type === 'card' ? 35 : 16,
  elevation: type === 'card' ? 8 : 4,
});

export const tokens = {
  palette,
  radii,
  typography,
  elevation,
  spacing,
};
