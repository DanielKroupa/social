// Prevent flash of wrong theme
const colorSchemeScript = `
  (function() {
    function getInitialColorScheme() {
      const persistedColorPreference = window.localStorage.getItem('theme');
      const hasPersistedPreference = typeof persistedColorPreference === 'string';

      if (hasPersistedPreference) {
        return persistedColorPreference;
      }

      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';

      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }

      return 'light';
    }

    const colorScheme = getInitialColorScheme();
    
    document.documentElement.style.setProperty('color-scheme', colorScheme);
    
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default colorSchemeScript;
