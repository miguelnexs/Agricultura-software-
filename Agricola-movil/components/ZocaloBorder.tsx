import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ZocaloBorder: React.FC<{ height?: number }> = ({ height = 4 }) => {
  return (
    <View style={[styles.container, { height }]}>
      {Array.from({ length: 24 }).map((_, i) => {
        const colors = ['#206a37', '#d97706', '#b91c1c', '#0284c7'];
        const color = colors[i % colors.length];
        return <View key={i} style={[styles.block, { backgroundColor: color }]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  block: {
    flex: 1,
    height: '100%',
  },
});

