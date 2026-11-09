import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { ZocaloBorder } from '../../components/ZocaloBorder';
import {
  User,
  Sprout,
  Scale,
  CreditCard,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  ChevronRight,
  LogOut,
  MapPin,
  Coffee,
} from 'lucide-react-native';

export default function MiFincaProfile() {
  const { colors, theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [notificaciones, setNotificaciones] = useState(true);
  const [nequiActivo, setNequiActivo] = useState(true);

  return (
    <LinearGradient
      colors={[colors.background, isDark ? '#0d1f14' : colors.surfaceLight]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ZocaloBorder height={4} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header de Mayordomo / Productor */}
          <View style={styles.profileHeader}>
            <View
              style={[
                styles.avatarRing,
                {
                  backgroundColor: colors.primary,
                  borderColor: isDark ? '#22c55e' : '#15803d',
                },
              ]}
            >
              <Text style={styles.avatarInitial}>DH</Text>
            </View>

            <Text style={[styles.profileName, { color: colors.text }]}>
              Don Hernando Valencia
            </Text>
            <View style={styles.profileLocation}>
              <MapPin size={13} color={colors.primary} />
              <Text style={[styles.profileSub, { color: colors.textSecondary }]}>
                Finca La Esperanza • Vereda El Paraíso, Salento
              </Text>
            </View>

            <View style={[styles.verifiedPill, { backgroundColor: isDark ? '#143820' : '#dcfce7' }]}>
              <ShieldCheck size={13} color="#16a34a" />
              <Text style={styles.verifiedText}>Campesino Verificado • 1.650 m.s.n.m.</Text>
            </View>
          </View>

          {/* Estadísticas de Operación en Finca */}
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: isDark ? '#13261a' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.statNumber, { color: colors.primary }]}>4.8</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Hectáreas Café & Plátano
              </Text>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: isDark ? '#13261a' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.statNumber, { color: colors.text }]}>320</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Bultos Despachados
              </Text>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: isDark ? '#13261a' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.statNumber, { color: '#16a34a' }]}>100%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Pagos en Escrow Nequi
              </Text>
            </View>
          </View>

          {/* Secciones de Configuración y Operación */}
          <View style={styles.sectionGroup}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>
              Gestión Operativa de la Finca
            </Text>

            <View
              style={[
                styles.cardBox,
                {
                  backgroundColor: isDark ? '#13261a' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.surfaceLight }]}>
                    <Sprout size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>Mis Lotes de Cultivo</Text>
                    <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                      Lote El Mirador, La Cañada, Alto de los Guamos
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.surfaceLight }]}>
                    <Scale size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>
                      Báscula & Liquidación de Cosecheros
                    </Text>
                    <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                      Pesaje por arroba y pagos semanales
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.menuItem}>
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.surfaceLight }]}>
                    <CreditCard size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>
                      Pago Inmediato Nequi / Daviplata
                    </Text>
                    <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                      312 458 9912 • Desembolso al cargar en Willys
                    </Text>
                  </View>
                </View>
                <Switch
                  value={nequiActivo}
                  onValueChange={setNequiActivo}
                  trackColor={{ false: '#767577', true: colors.primary }}
                  thumbColor="#FFF"
                />
              </View>
            </View>
          </View>

          {/* Preferencias de la Aplicación */}
          <View style={styles.sectionGroup}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>
              Ambiente & Preferencias
            </Text>

            <View
              style={[
                styles.cardBox,
                {
                  backgroundColor: isDark ? '#13261a' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.menuItem}>
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.surfaceLight }]}>
                    {isDark ? (
                      <Moon size={18} color="#f59e0b" />
                    ) : (
                      <Sun size={18} color="#b45309" />
                    )}
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>
                      {isDark ? 'Noche en el Cafetal' : 'Amanecer en la Cordillera'}
                    </Text>
                    <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                      {isDark ? 'Tema oscuro activo' : 'Tema claro campirano'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: '#767577', true: colors.primary }}
                  thumbColor="#FFF"
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.menuItem}>
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.surfaceLight }]}>
                    <Bell size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>Alertas de Cosecha & Flete</Text>
                    <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                      Notificar cuando un Willys esté cerca
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificaciones}
                  onValueChange={setNotificaciones}
                  trackColor={{ false: '#767577', true: colors.primary }}
                  thumbColor="#FFF"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    marginBottom: 10,
  },
  avatarInitial: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
  },
  profileLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  profileSub: {
    fontSize: 11,
    fontWeight: '600',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 3,
  },
  sectionGroup: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  cardBox: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
      default: { elevation: 2 },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  itemSub: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  divider: {
    height: 1,
  },
});
