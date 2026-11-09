import React from 'react';
import { MaterialTopTabs } from '../../components/MaterialTopTabs';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Truck, TrendingUp, Bot, User } from 'lucide-react-native';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: colors.surface, 
          borderTopWidth: 1, 
          borderTopColor: colors.border,
          elevation: 8, 
          shadowOpacity: 0.08,
          paddingBottom: 4,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIndicatorStyle: { 
          backgroundColor: colors.primary, 
          height: 3, 
          top: 0
        },
        tabBarLabelStyle: { 
          fontSize: 9, 
          fontWeight: '700', 
          textTransform: 'capitalize',
          marginTop: -3,
        },
        tabBarIconStyle: {
          height: 20,
          width: 20,
        },
        tabBarShowIcon: true,
        swipeEnabled: true,
        animationEnabled: true,
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: 'Mercado',
          tabBarIcon: ({ color }) => <ShoppingBag color={color} size={20} />,
        }}
      />
      <MaterialTopTabs.Screen
        name="explore"
        options={{
          title: 'AgroFlete',
          tabBarIcon: ({ color }) => <Truck color={color} size={20} />,
        }}
      />
      <MaterialTopTabs.Screen
        name="precios"
        options={{
          title: 'Precios',
          tabBarIcon: ({ color }) => <TrendingUp color={color} size={20} />,
        }}
      />
      <MaterialTopTabs.Screen
        name="bot"
        options={{
          title: 'Bot IA',
          tabBarIcon: ({ color }) => <Bot color={color} size={20} />,
        }}
      />
      <MaterialTopTabs.Screen
        name="profile"
        options={{
          title: 'Mi Finca',
          tabBarIcon: ({ color }) => <User color={color} size={20} />,
        }}
      />
    </MaterialTopTabs>
  );
}
