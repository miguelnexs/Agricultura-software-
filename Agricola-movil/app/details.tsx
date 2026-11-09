import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { ZocaloBorder } from '../components/ZocaloBorder';
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  QrCode,
  DollarSign,
} from 'lucide-react-native';

export default function DetailsScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const [cantidad, setCantidad] = useState(2);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const precioUnitario = 35000; // Plátano Hartón Verde Racimo
  const fleteMilkRun = 35000;
  const subtotal = cantidad * precioUnitario;
  const total = subtotal + fleteMilkRun;

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
          {/* Barra Superior con botón Volver */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[
                styles.backButton,
                {
                  backgroundColor: isDark ? '#14291c' : '#ffffff',
                  borderColor: colors.border,
                },
              ]}
            >
              <ArrowLeft size={18} color={colors.text} />
              <Text style={[styles.backText, { color: colors.text }]}>Volver</Text>
            </TouchableOpacity>

            <View style={[styles.escrowPill, { backgroundColor: isDark ? '#143820' : '#dcfce7' }]}>
              <ShieldCheck size={14} color="#16a34a" />
              <Text style={styles.escrowPillText}>Blindaje Escrow 100%</Text>
            </View>
          </View>

          {/* Tarjeta Principal de Cosecha */}
          <View
            style={[
              styles.mainCard,
              {
                backgroundColor: isDark ? '#13261a' : '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.harvestHero}>
              <Text style={styles.heroEmoji}>🍌</Text>
              <View style={styles.heroText}>
                <Text style={[styles.harvestTitle, { color: colors.text }]}>
                  Plátano Hartón Verde Selección
                </Text>
                <View style={styles.locationRow}>
                  <MapPin size={13} color={colors.primary} />
                  <Text style={[styles.locationText, { color: colors.textSecondary }]}>
                    Finca La Secreta • Quimbaya, Quindío (1.350 m)
                  </Text>
                </View>
                <Text style={[styles.farmerText, { color: colors.primary }]}>
                  Cultivado por Don Jhon Jairo Patiño
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Selector de Cantidad */}
            <View style={styles.selectorRow}>
              <View>
                <Text style={[styles.selectorLabel, { color: colors.textSecondary }]}>
                  Cantidad a Comprar:
                </Text>
                <Text style={[styles.unitDesc, { color: colors.textSecondary }]}>
                  Racimos de 20 kg c/u
                </Text>
              </View>

              <View style={[styles.counterBox, { borderColor: colors.border }]}>
                <TouchableOpacity
                  onPress={() => setCantidad((c) => Math.max(1, c - 1))}
                  style={[styles.counterBtn, { backgroundColor: colors.surfaceLight }]}
                >
                  <Text style={[styles.counterBtnText, { color: colors.text }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.counterNumber, { color: colors.text }]}>
                  {cantidad}
                </Text>

                <TouchableOpacity
                  onPress={() => setCantidad((c) => c + 1)}
                  style={[styles.counterBtn, { backgroundColor: colors.surfaceLight }]}
                >
                  <Text style={[styles.counterBtnText, { color: colors.text }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Sistema Antifraude Escrow en 4 Pasos (Del PDF de Negocio) */}
          <View
            style={[
              styles.escrowCard,
              {
                backgroundColor: isDark ? '#13261a' : '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Seguridad Antifraude AgroConexión
            </Text>
            <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
              Flujo oficial de 4 pasos garantizado para campesino y comprador:
            </Text>

            <View style={styles.stepsList}>
              {[
                {
                  step: '1',
                  title: 'Retención en Custodia (Escrow)',
                  desc: 'El pago se custodia de forma segura sin liberarse hasta verificar el producto.',
                },
                {
                  step: '2',
                  title: 'Asignación de Conductor Veredal',
                  desc: 'Un Jeep Willys o camioneta local recibe la orden para subir a la finca.',
                },
                {
                  step: '3',
                  title: 'Inspección en Finca & Pago Inmediato',
                  desc: 'Al subir la carga al vehículo, el campesino recibe su dinero en Nequi al instante.',
                },
                {
                  step: '4',
                  title: 'Validación QR & Entrega',
                  desc: 'El comprador escanea el código QR al recibir y se liquida el flete al transportador.',
                },
              ].map((s) => (
                <View key={s.step} style={styles.stepItem}>
                  <View style={[styles.stepBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.stepBadgeText}>{s.step}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: colors.text }]}>{s.title}</Text>
                    <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
                      {s.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Liquidación de Pago y Flete */}
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: isDark ? '#13261a' : '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumen del Pedido</Text>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                Cosecha ({cantidad} racimos x $35.000):
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                ${subtotal.toLocaleString('es-CO')} COP
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                Flete Consolidado Milk-Run (Willys):
              </Text>
              <Text style={[styles.summaryValue, { color: colors.primary }]}>
                +${fleteMilkRun.toLocaleString('es-CO')} COP
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total Garantizado:</Text>
              <Text style={[styles.totalAmount, { color: colors.primary }]}>
                ${total.toLocaleString('es-CO')} COP
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setPedidoConfirmado(true)}
              style={[styles.confirmBtn, { backgroundColor: colors.primary }]}
            >
              <Truck size={18} color="#FFF" />
              <Text style={styles.confirmBtnText}>
                {pedidoConfirmado ? '¡Orden Confirmada con Willys!' : 'Confirmar Pedido & Flete'}
              </Text>
            </TouchableOpacity>

            {pedidoConfirmado && (
              <View
                style={[
                  styles.successBox,
                  { backgroundColor: isDark ? '#143820' : '#dcfce7' },
                ]}
              >
                <CheckCircle2 size={16} color="#16a34a" />
                <Text style={styles.successBoxText}>
                  Orden #AGR-8821 generada. Don Argemiro Ríos (Willys WLY-451) iniciará el recorrido Milk-Run en 35 min.
                </Text>
              </View>
            )}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
  },
  escrowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  escrowPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16a34a',
  },
  mainCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  harvestHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroEmoji: {
    fontSize: 42,
  },
  heroText: {
    flex: 1,
  },
  harvestTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  farmerText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  unitDesc: {
    fontSize: 10,
    fontWeight: '500',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 4,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    fontSize: 16,
    fontWeight: '800',
  },
  counterNumber: {
    fontSize: 15,
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
  },
  escrowCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  sectionSub: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
    marginBottom: 12,
  },
  stepsList: {
    gap: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  stepDesc: {
    fontSize: 10,
    lineHeight: 14,
    marginTop: 1,
  },
  summaryCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '900',
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
  },
  successBoxText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
    lineHeight: 15,
  },
});
