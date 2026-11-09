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
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { ZocaloBorder } from '../../components/ZocaloBorder';
import {
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  Navigation,
  CheckCircle2,
  DollarSign,
} from 'lucide-react-native';

interface ConductorFlete {
  id: string;
  nombre: string;
  vehiculo: string;
  placa: string;
  capacidad: string;
  distanciaMin: number;
  precioBase: number;
  modalidad: 'milkrun' | 'retorno' | 'directo';
  telefono: string;
  emoji: string;
}

const CONDUCTORES: ConductorFlete[] = [
  {
    id: '1',
    nombre: 'Don Argemiro Ríos',
    vehiculo: 'Jeep Willys Modelo 1964 (Yipao)',
    placa: 'WLY-451',
    capacidad: '1.2 Toneladas (25 Bultos)',
    distanciaMin: 12,
    precioBase: 35000,
    modalidad: 'milkrun',
    telefono: '312 458 9912',
    emoji: '🚙',
  },
  {
    id: '2',
    nombre: 'Nelson Gómez & Hijo',
    vehiculo: 'Toyota Hilux 4x4 de Estacas',
    placa: 'STR-882',
    capacidad: '2.0 Toneladas (40 Bultos)',
    distanciaMin: 18,
    precioBase: 55000,
    modalidad: 'retorno',
    telefono: '315 782 1104',
    emoji: '🛻',
  },
  {
    id: '3',
    nombre: 'Jhon Alexander Torito',
    vehiculo: 'Motocarro de Carga Rural',
    placa: 'MC-109',
    capacidad: '500 kg (10 canastillas)',
    distanciaMin: 8,
    precioBase: 25000,
    modalidad: 'directo',
    telefono: '320 634 7721',
    emoji: '🛺',
  },
];

export default function AgroFleteTab() {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const [origen, setOrigen] = useState('Vereda Boquía, Salento');
  const [destino, setDestino] = useState('Plaza Minorista / Restaurante');
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState<'milkrun' | 'retorno' | 'directo'>('milkrun');
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

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
          {/* Header AgroFlete */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                <Truck size={20} color="#FFF" />
              </View>
              <View>
                <Text style={[styles.title, { color: colors.text }]}>AgroFlete (Tipo Uber)</Text>
                <Text style={[styles.subtitle, { color: colors.primary }]}>
                  Logística Colaborativa en Trocha Veredal
                </Text>
              </View>
            </View>
          </View>

          {/* Formulario de Solicitud de Flete */}
          <View
            style={[
              styles.cardBox,
              {
                backgroundColor: isDark ? '#13261a' : '#ffffff',
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Cotizar Recogida en Finca
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                Punto de Recogida (Finca / Vereda):
              </Text>
              <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                <MapPin size={16} color={colors.primary} />
                <TextInput
                  value={origen}
                  onChangeText={setOrigen}
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                Destino (Plaza / Comercio / Domicilio):
              </Text>
              <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                <Navigation size={16} color={colors.primary} />
                <TextInput
                  value={destino}
                  onChangeText={setDestino}
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            </View>

            {/* Selector de Modalidades del PDF */}
            <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 4 }]}>
              Modalidad de Transporte:
            </Text>

            <View style={styles.modalidadGrid}>
              <TouchableOpacity
                onPress={() => setModalidadSeleccionada('milkrun')}
                style={[
                  styles.modalidadCard,
                  {
                    backgroundColor:
                      modalidadSeleccionada === 'milkrun'
                        ? isDark
                          ? '#183a24'
                          : '#e8f5e9'
                        : isDark
                        ? '#14291c'
                        : '#f9f9f9',
                    borderColor:
                      modalidadSeleccionada === 'milkrun' ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={styles.modalidadEmoji}>🥛</Text>
                <Text style={[styles.modalidadTitle, { color: colors.text }]}>Milk-Run</Text>
                <Text style={[styles.modalidadPrice, { color: colors.primary }]}>$35.000 COP</Text>
                <Text style={[styles.modalidadDesc, { color: colors.textSecondary }]}>
                  Flete compartido entre 3-4 fincas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalidadSeleccionada('retorno')}
                style={[
                  styles.modalidadCard,
                  {
                    backgroundColor:
                      modalidadSeleccionada === 'retorno'
                        ? isDark
                          ? '#183a24'
                          : '#e8f5e9'
                        : isDark
                        ? '#14291c'
                        : '#f9f9f9',
                    borderColor:
                      modalidadSeleccionada === 'retorno' ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={styles.modalidadEmoji}>🔄</Text>
                <Text style={[styles.modalidadTitle, { color: colors.text }]}>Flete Retorno</Text>
                <Text style={[styles.modalidadPrice, { color: '#b45309' }]}>-30% Dcto</Text>
                <Text style={[styles.modalidadDesc, { color: colors.textSecondary }]}>
                  Aprovechar viaje de regreso vacío
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setSolicitudEnviada(true)}
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            >
              <Truck size={16} color="#FFF" />
              <Text style={styles.actionBtnText}>
                {solicitudEnviada ? '¡Conductor Asignado en Camino!' : 'Pedir Flete Campesino'}
              </Text>
            </TouchableOpacity>

            {solicitudEnviada && (
              <View style={[styles.successBanner, { backgroundColor: isDark ? '#143820' : '#dcfce7' }]}>
                <CheckCircle2 size={16} color="#16a34a" />
                <Text style={styles.successText}>
                  Don Argemiro Ríos (Willys WLY-451) va hacia tu finca. Llegada aprox: 12 min.
                </Text>
              </View>
            )}
          </View>

          {/* Conductores Veredales Disponibles */}
          <View style={styles.conductoresSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Vehículos en la Vereda ({CONDUCTORES.length})
            </Text>

            {CONDUCTORES.map((c) => (
              <View
                key={c.id}
                style={[
                  styles.conductorCard,
                  {
                    backgroundColor: isDark ? '#13261a' : '#ffffff',
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.conductorLeft}>
                  <Text style={styles.conductorEmoji}>{c.emoji}</Text>
                  <View style={styles.conductorInfo}>
                    <Text style={[styles.conductorNombre, { color: colors.text }]}>
                      {c.nombre}
                    </Text>
                    <Text style={[styles.conductorVehiculo, { color: colors.textSecondary }]}>
                      {c.vehiculo} • {c.placa}
                    </Text>
                    <Text style={[styles.conductorCapacidad, { color: colors.primary }]}>
                      Capacidad: {c.capacidad}
                    </Text>
                  </View>
                </View>

                <View style={styles.conductorRight}>
                  <Text style={[styles.conductorPrecio, { color: colors.text }]}>
                    ${c.precioBase.toLocaleString('es-CO')}
                  </Text>
                  <Text style={[styles.conductorDistancia, { color: colors.textSecondary }]}>
                    A {c.distanciaMin} min
                  </Text>

                  <TouchableOpacity
                    onPress={() => alert(`Llamando al conductor: ${c.telefono}`)}
                    style={[styles.callBtn, { borderColor: colors.primary }]}
                  >
                    <Phone size={12} color={colors.primary} />
                    <Text style={[styles.callBtnText, { color: colors.primary }]}>Llamar</Text>
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  cardBox: {
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 16,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.04)' },
      default: { elevation: 2 },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  modalidadGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    marginBottom: 14,
  },
  modalidadCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  modalidadEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  modalidadTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  modalidadPrice: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  modalidadDesc: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '500',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
  },
  successText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  conductoresSection: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  conductorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  conductorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  conductorEmoji: {
    fontSize: 28,
  },
  conductorInfo: {
    flex: 1,
  },
  conductorNombre: {
    fontSize: 13,
    fontWeight: '800',
  },
  conductorVehiculo: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  conductorCapacidad: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  conductorRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  conductorPrecio: {
    fontSize: 14,
    fontWeight: '800',
  },
  conductorDistancia: {
    fontSize: 10,
    fontWeight: '600',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 4,
  },
  callBtnText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
