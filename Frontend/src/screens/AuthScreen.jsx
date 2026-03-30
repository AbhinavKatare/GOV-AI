import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { palette, radii, typography, spacing } from '../theme/tokens.js';

const providers = [
  { label: 'Continue with Apple', glyph: '' },
  { label: 'Continue with Google', glyph: 'G' },
  { label: 'Sign up with email', glyph: '✉︎' },
];

const AuthScreen = () => (
  <View style={styles.screen}>
    <View style={styles.hero}>
      <Text style={styles.brand}>Govai</Text>
    </View>

    <View style={styles.sheet}>
      {providers.map((provider) => (
        <Pressable key={provider.label} style={styles.providerButton}>
          <Text style={styles.providerGlyph}>{provider.glyph}</Text>
          <Text style={styles.providerLabel}>{provider.label}</Text>
        </Pressable>
      ))}

      <Pressable style={[styles.actionButton, styles.loginButton]}>
        <Text style={styles.loginLabel}>Log in</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.primary,
    borderRadius: radii.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    fontSize: 38,
    color: palette.surface,
    fontFamily: typography.family,
    fontWeight: '600',
  },
  sheet: {
    backgroundColor: palette.surface,
    padding: spacing(3),
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    gap: spacing(1.5),
  },
  providerButton: {
    backgroundColor: '#f7f5f2',
    borderRadius: radii.lg,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  providerGlyph: {
    fontSize: 18,
    marginRight: spacing(1.5),
    color: palette.primary,
  },
  providerLabel: {
    fontSize: 16,
    color: palette.text,
    fontFamily: typography.family,
  },
  actionButton: {
    borderRadius: radii.md,
    paddingVertical: spacing(1.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: palette.primary,
  },
  loginLabel: {
    color: palette.surface,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});

export default AuthScreen;
