import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { ZocaloBorder } from '../../components/ZocaloBorder';
import {
  Search,
  Sparkles,
  MapPin,
  Truck,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
} from 'lucide-react-native';

export interface CosechaItem {
  id: string;
  nombre: string;
  categoria: string;
  campesino: string;
  vereda: string;
  precio: number;
  unidad: string;
  emoji: string;
  disponible: number;
  calificacion: number;
}

const COSECHAS: CosechaItem[] = [
  {
    id: '1',
    nombre: 'Café Castillo Pergamino Seco',
    categoria: 'cafe',
    campesino: 'Don Hernando Valencia',
    vereda: 'Vereda El Paraíso, Salento',
    precio: 18500,
    unidad: 'Libra (500g)',
    emoji: '☕',
    disponible: 80,
    calificacion: 4.9,
  },
  {
    id: '2',
    nombre: 'Aguacate Hass Exportación',
    categoria: 'frutas',
    campesino: 'Dra. Luz Marina & Familia',
    vereda: 'Hacienda El Mirador, Circasia',
    precio: 4800,
    unidad: 'Kilo en Malla',
    emoji: '🥑',
    disponible: 350,
    calificacion: 5.0,
  },
  {
    id: '3',
    nombre: 'Plátano Hartón Verde Racimo',
    categoria: 'tuberculos',
    campesino: 'Don Jhon Jairo Patiño',
    vereda: 'Finca La Secreta, Quimbaya',
    precio: 35000,
    unidad: 'Racimo de 20 kg',
    emoji: '🍌',
    disponible: 45,
    calificacion: 4.8,
  },
  {
    id: '4',
    nombre: 'Papa Pastusa Seleccionada',
    categoria: 'tuberculos',
    campesino: 'Don Argemiro Ríos',
    vereda: 'Páramo de las Hermosas',
    precio: 115000,
    unidad: 'Bulto de 50 kg',
    emoji: '🥔',
    disponible: 25,
    calificacion: 4.9,
  },
  {
    id: '5',
    nombre: 'Tomate Chonto de Invernadero',
    categoria: 'hortalizas',
    campesino: 'Cooperativa Veredal Boquía',
    vereda: 'Vereda Boquía, Salento',
    precio: 72000,
    unidad: 'Canastilla 22 kg',
    emoji: '🍅',
    disponible: 60,
    calificacion: 4.7,
  },
];

export default function MercadoHome() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const [modalidad, setModalidad] = useState<'b2b' | 'b2c'>('b2b');
  const [categoria, setCategoria] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  const filtrados = COSECHAS.filter((item) => {
    const coincideCat = categoria === 'todos' || item.categoria === categoria;
    const coincideTxt =
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.campesino.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.vereda.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCat && coincideTxt;
  });

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
          {/* 1. Cabecera Veredal */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.brandRow}>
                <View style={[styles.brandIcon, { backgroundColor: colors.primary }]}>
                  <Text style={styles.brandEmoji}>🌱</Text>
                </View>
                <View>
                  <Text style={[styles.brandTitle, { color: colors.text }]}>AgroConexión</Text>
                  <Text style={[styles.brandSubtitle, { color: colors.primary }]}>
                    🇨🇴 Red Agro-Logística Rural
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.networkBadge,
                  { backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : '#dcfce7' },
                ]}
              >
                <View style={styles.pulseDot} />
                <Text style={styles.networkText}>En Línea</Text>
              </View>
            </View>

            {/* Banner Hero */}
            <View
              style={[
                styles.heroBanner,
                {
                  backgroundColor: isDark ? '#14291c' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.heroBadge}>
                <Sparkles size={13} color={colors.primary} />
                <Text style={[styles.heroBadgeText, { color: colors.primary }]}>
                  Cero Intermediarios • 100% al Campesino
                </Text>
              </View>

              <Text style={[styles.heroTitle, { color: colors.text }]}>
                De la Mata a tu Negocio y Hogar
              </Text>
              <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
                Cosechas frescas recolectadas hoy en veredas colombianas con transporte tipo Uber y
                custodia Escrow.
              </Text>

              {/* Selector B2B / B2C */}
              <View style={[styles.toggleContainer, { backgroundColor: colors.surfaceLight }]}>
                <TouchableOpacity
                  onPress={() => setModalidad('b2b')}
                  style={[
                    styles.toggleBtn,
                    modalidad === 'b2b' && { backgroundColor: colors.primary },
                  ]}
                >
                  <Building2 size={14} color={modalidad === 'b2b' ? '#FFF' : colors.textSecondary} />
                  <Text
                    style={[
                      styles.toggleText,
                      { color: modalidad === 'b2b' ? '#FFF' : colors.textSecondary },
                    ]}
                  >
                    Restaurantes (B2B)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalidad('b2c')}
                  style={[
                    styles.toggleBtn,
                    modalidad === 'b2c' && { backgroundColor: colors.primary },
                  ]}
                >
                  <Users size={14} color={modalidad === 'b2c' ? '#FFF' : colors.textSecondary} />
                  <Text
                    style={[
                      styles.toggleText,
                      { color: modalidad === 'b2c' ? '#FFF' : colors.textSecondary },
                    ]}
                  >
                    Familias (B2C)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 2. Barra de Búsqueda */}
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: isDark ? '#13261a' : '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <Search size={18} color={colors.textSecondary} />
            <TextInput
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar café, aguacate, plátano o vereda..."
              placeholderTextColor={colors.textSecondary}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>

          {/* 3. Filtros Horizontales de Categorías */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {[
              { id: 'todos', label: '🌾 Todos' },
              { id: 'cafe', label: '☕ Café' },
              { id: 'frutas', label: '🥑 Frutas' },
              { id: 'tuberculos', label: '🍌 Plátano y Papa' },
              { id: 'hortalizas', label: '🍅 Hortalizas' },
            ].map((cat) => {
              const active = categoria === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setCategoria(cat.id)}
                  style={[
                    styles.catChip,
                    {
                      backgroundColor: active ? colors.primary : colors.surface,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.catText,
                      { color: active ? '#ffffff' : colors.text },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* 4. Lista de Cosechas en Tarjetas Campesinas */}
          <View style={styles.harvestList}>
            {filtrados.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.harvestCard,
                  {
                    backgroundColor: isDark ? '#13261a' : '#ffffff',
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.campesinoRow}>
                    <Text style={styles.cardEmoji}>{item.emoji}</Text>
                    <View style={styles.campesinoInfo}>
                      <Text style={[styles.cardTitle, { color: colors.text }]}>{item.nombre}</Text>
                      <View style={styles.locationRow}>
                        <MapPin size={12} color={colors.primary} />
                        <Text style={[styles.cardLocation, { color: colors.textSecondary }]}>
                          {item.vereda}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.starBadge, { backgroundColor: isDark ? '#2a2415' : '#fef3c7' }]}>
                    <Text style={styles.starText}>★ {item.calificacion.toFixed(1)}</Text>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>
                      Precio Directo en Finca:
                    </Text>
                    <Text style={[styles.priceValue, { color: colors.primary }]}>
                      ${item.precio.toLocaleString('es-CO')}{' '}
                      <Text style={[styles.priceUnit, { color: colors.textSecondary }]}>
                        / {item.unidad}
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.push('/details')}
                    style={[styles.buyBtn, { backgroundColor: colors.primary }]}
                  >
                    <Truck size={14} color="#FFF" />
                    <Text style={styles.buyBtnText}>Pedir con Flete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  header: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandEmoji: {
    fontSize: 20,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#16a34a',
  },
  networkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  heroBanner: {
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.04)' },
      default: { elevation: 2 },
    }),
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    gap: 4,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  categoryScroll: {
    gap: 8,
    paddingBottom: 12,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  catText: {
    fontSize: 12,
    fontWeight: '700',
  },
  harvestList: {
    gap: 12,
  },
  harvestCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    ...Platform.select({
      web: { boxShadow: '0 3px 10px rgba(0,0,0,0.03)' },
      default: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  campesinoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  cardEmoji: {
    fontSize: 32,
  },
  campesinoInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  cardLocation: {
    fontSize: 11,
    fontWeight: '600',
  },
  starBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  starText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#b45309',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  priceUnit: {
    fontSize: 11,
    fontWeight: '600',
  },
  buyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  buyBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
