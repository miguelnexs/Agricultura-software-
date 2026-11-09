import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { ZocaloBorder } from '../../components/ZocaloBorder';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Scale,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react-native';

interface CotizacionAlimento {
  id: string;
  nombre: string;
  emoji: string;
  presentacion: string;
  precioHoy: number;
  precioAyer: number;
  precioFinca: number;
  precioMayorista: number;
  precioMinorista: number;
  variacion: number;
  plaza: string;
}

const COTIZACIONES: CotizacionAlimento[] = [
  {
    id: 'papa',
    nombre: 'Papa Pastusa Suprema',
    emoji: '🥔',
    presentacion: 'Bulto 50 kg',
    precioHoy: 115000,
    precioAyer: 108000,
    precioFinca: 90000,
    precioMayorista: 115000,
    precioMinorista: 145000,
    variacion: 6.48,
    plaza: 'Corabastos / Mercar',
  },
  {
    id: 'tomate',
    nombre: 'Tomate Chonto Primera',
    emoji: '🍅',
    presentacion: 'Canastilla 22 kg',
    precioHoy: 72000,
    precioAyer: 74000,
    precioFinca: 55000,
    precioMayorista: 72000,
    precioMinorista: 98000,
    variacion: -2.7,
    plaza: 'Cavasa / Armenia',
  },
  {
    id: 'aguacate',
    nombre: 'Aguacate Hass Calibre Extra',
    emoji: '🥑',
    presentacion: 'Kilo',
    precioHoy: 5800,
    precioAyer: 5600,
    precioFinca: 4400,
    precioMayorista: 5800,
    precioMinorista: 8500,
    variacion: 3.57,
    plaza: 'Mercado Nacional / Export.',
  },
  {
    id: 'platano',
    nombre: 'Plátano Hartón Verde',
    emoji: '🍌',
    presentacion: 'Racimo 20 kg',
    precioHoy: 35000,
    precioAyer: 34500,
    precioFinca: 28000,
    precioMayorista: 35000,
    precioMinorista: 48000,
    variacion: 1.45,
    plaza: 'Mercar / Corabastos',
  },
  {
    id: 'cafe',
    nombre: 'Café Pergamino Seco Finca',
    emoji: '☕',
    presentacion: 'Carga 125 kg',
    precioHoy: 1980000,
    precioAyer: 1940000,
    precioFinca: 1850000,
    precioMayorista: 1980000,
    precioMinorista: 2350000,
    variacion: 2.06,
    plaza: 'Comité de Cafeteros',
  },
  {
    id: 'cebolla',
    nombre: 'Cebolla Junca Larga',
    emoji: '🧅',
    presentacion: 'Rollo 25 kg',
    precioHoy: 48000,
    precioAyer: 49000,
    precioFinca: 36000,
    precioMayorista: 48000,
    precioMinorista: 68000,
    variacion: -2.04,
    plaza: 'Corabastos Bogotá',
  },
];

export default function PreciosTab() {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const [seleccionado, setSeleccionado] = useState<CotizacionAlimento>(COTIZACIONES[0]);

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
          {/* Header Pizarra */}
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                <TrendingUp size={20} color="#FFF" />
              </View>
              <View>
                <Text style={[styles.title, { color: colors.text }]}>Pizarra de Precios</Text>
                <Text style={[styles.subtitle, { color: colors.primary }]}>
                  Cotizaciones en Tiempo Real • SIPSA / DANE
                </Text>
              </View>
            </View>

            <View style={[styles.liveBadge, { backgroundColor: isDark ? '#143820' : '#dcfce7' }]}>
              <Activity size={13} color="#16a34a" />
              <Text style={styles.liveText}>Bolsa Agropecuaria Abierta</Text>
            </View>
          </View>

          {/* Tarjeta de Detalle del Alimento Seleccionado */}
          <View
            style={[
              styles.selectedCard,
              {
                backgroundColor: isDark ? '#13261a' : '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.selectedHeader}>
              <Text style={styles.selectedEmoji}>{seleccionado.emoji}</Text>
              <View style={styles.selectedInfo}>
                <Text style={[styles.selectedTitle, { color: colors.text }]}>
                  {seleccionado.nombre}
                </Text>
                <Text style={[styles.selectedSub, { color: colors.textSecondary }]}>
                  {seleccionado.presentacion} • {seleccionado.plaza}
                </Text>
              </View>

              <View
                style={[
                  styles.varBadge,
                  {
                    backgroundColor:
                      seleccionado.variacion >= 0
                        ? isDark
                          ? '#143820'
                          : '#dcfce7'
                        : isDark
                        ? '#381414'
                        : '#fee2e2',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.varText,
                    { color: seleccionado.variacion >= 0 ? '#16a34a' : '#dc2626' },
                  ]}
                >
                  {seleccionado.variacion >= 0 ? '▲ +' : '▼ '}
                  {seleccionado.variacion.toFixed(1)}%
                </Text>
              </View>
            </View>

            {/* Gran Precio Mayorista */}
            <View style={styles.bigPriceBox}>
              <Text style={[styles.priceTag, { color: colors.textSecondary }]}>
                Precio Mayorista de Referencia:
              </Text>
              <Text style={[styles.bigPrice, { color: colors.text }]}>
                ${seleccionado.precioHoy.toLocaleString('es-CO')}{' '}
                <Text style={[styles.currency, { color: colors.primary }]}>COP</Text>
              </Text>
            </View>

            {/* Desglose Cadena de Valor */}
            <Text style={[styles.chainTitle, { color: colors.text }]}>
              Cadena de Valor Transparente:
            </Text>

            <View style={styles.chainGrid}>
              <View
                style={[
                  styles.chainItem,
                  { backgroundColor: isDark ? '#14291c' : '#f5ede0' },
                ]}
              >
                <Text style={[styles.chainLabel, { color: colors.primary }]}>1. En Finca</Text>
                <Text style={[styles.chainValue, { color: colors.text }]}>
                  ${seleccionado.precioFinca.toLocaleString('es-CO')}
                </Text>
                <Text style={[styles.chainDesc, { color: colors.textSecondary }]}>
                  Al campesino
                </Text>
              </View>

              <View
                style={[
                  styles.chainItem,
                  { backgroundColor: isDark ? '#14291c' : '#f5ede0' },
                ]}
              >
                <Text style={[styles.chainLabel, { color: '#b45309' }]}>2. Mayorista</Text>
                <Text style={[styles.chainValue, { color: colors.text }]}>
                  ${seleccionado.precioMayorista.toLocaleString('es-CO')}
                </Text>
                <Text style={[styles.chainDesc, { color: colors.textSecondary }]}>
                  Corabastos
                </Text>
              </View>

              <View
                style={[
                  styles.chainItem,
                  { backgroundColor: isDark ? '#14291c' : '#f5ede0' },
                ]}
              >
                <Text style={[styles.chainLabel, { color: '#dc2626' }]}>3. Supermercado</Text>
                <Text style={[styles.chainValue, { color: colors.text }]}>
                  ${seleccionado.precioMinorista.toLocaleString('es-CO')}
                </Text>
                <Text style={[styles.chainDesc, { color: colors.textSecondary }]}>
                  Ciudad final
                </Text>
              </View>
            </View>

            <View style={[styles.savingsBox, { backgroundColor: isDark ? '#143820' : '#dcfce7' }]}>
              <Sparkles size={14} color="#16a34a" />
              <Text style={styles.savingsText}>
                Comprando directo en AgroConexión ahorras $
                {(seleccionado.precioMinorista - seleccionado.precioMayorista).toLocaleString('es-CO')}{' '}
                por {seleccionado.presentacion.toLowerCase()} sin intermediarios.
              </Text>
            </View>
          </View>

          {/* Lista de Alimentos para Seleccionar */}
          <Text style={[styles.listHeader, { color: colors.text }]}>
            Todos los Alimentos de la Canasta Familiar
          </Text>

          <View style={styles.alimentosList}>
            {COTIZACIONES.map((item) => {
              const active = item.id === seleccionado.id;
              const sube = item.variacion >= 0;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSeleccionado(item)}
                  style={[
                    styles.itemRow,
                    {
                      backgroundColor: isDark ? '#13261a' : '#ffffff',
                      borderColor: active ? colors.primary : colors.border,
                      borderWidth: active ? 2 : 1,
                    },
                  ]}
                >
                  <View style={styles.itemRowLeft}>
                    <Text style={styles.itemEmoji}>{item.emoji}</Text>
                    <View>
                      <Text style={[styles.itemName, { color: colors.text }]}>{item.nombre}</Text>
                      <Text style={[styles.itemPresentacion, { color: colors.textSecondary }]}>
                        {item.presentacion}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.itemRowRight}>
                    <Text style={[styles.itemPrice, { color: colors.text }]}>
                      ${item.precioHoy.toLocaleString('es-CO')}
                    </Text>
                    <View style={styles.itemVarRow}>
                      {sube ? (
                        <TrendingUp size={12} color="#16a34a" />
                      ) : (
                        <TrendingDown size={12} color="#dc2626" />
                      )}
                      <Text
                        style={[
                          styles.itemVarText,
                          { color: sube ? '#16a34a' : '#dc2626' },
                        ]}
                      >
                        {sube ? '+' : ''}
                        {item.variacion.toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16a34a',
  },
  selectedCard: {
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 18,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.04)' },
      default: { elevation: 2 },
    }),
  },
  selectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedEmoji: {
    fontSize: 34,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  selectedSub: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  varBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  varText: {
    fontSize: 12,
    fontWeight: '800',
  },
  bigPriceBox: {
    marginVertical: 14,
  },
  priceTag: {
    fontSize: 11,
    fontWeight: '600',
  },
  bigPrice: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 2,
  },
  currency: {
    fontSize: 14,
    fontWeight: '800',
  },
  chainTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
  },
  chainGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  chainItem: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  chainLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  chainValue: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  chainDesc: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
  savingsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
  },
  savingsText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
    lineHeight: 15,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  alimentosList: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
  },
  itemRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  itemEmoji: {
    fontSize: 26,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '800',
  },
  itemPresentacion: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  itemRowRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  itemVarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  itemVarText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

