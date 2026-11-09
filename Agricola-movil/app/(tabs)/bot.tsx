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
  Bot,
  Mic,
  Send,
  Play,
  CheckCircle2,
  Calendar,
  Sparkles,
  Truck,
  ShieldCheck,
} from 'lucide-react-native';

interface MensajeWhatsApp {
  id: string;
  remitente: 'campesino' | 'bot';
  texto: string;
  hora: string;
  audio?: boolean;
  duracion?: string;
  datosExtraidos?: {
    alimento: string;
    cantidad: string;
    finca: string;
    vereda: string;
    precosecha: string;
  };
}

const MENSAJES_INICIALES: MensajeWhatsApp[] = [
  {
    id: '1',
    remitente: 'campesino',
    texto: '🎙️ Nota de voz (0:14 seg): "Buenas tardes patrón, habla Don Hernando de Finca La Esperanza en Salento. Tengo unos 15 bultos de plátano verde que van a estar listos para corte en unos 3 días. Pa ver si me consigue comprador y el camión..."',
    hora: '07:15 AM',
    audio: true,
    duracion: '0:14',
  },
  {
    id: '2',
    remitente: 'bot',
    texto: '¡Buenos días Don Hernando! 👋 Recibí su nota de voz. Nuestra IA ya transcribió su cosecha y la programó en la plataforma.',
    hora: '07:15 AM',
    datosExtraidos: {
      alimento: '🍌 Plátano Hartón Verde',
      cantidad: '15 Bultos (~750 kg)',
      finca: 'Finca La Esperanza',
      vereda: 'Vereda El Paraíso, Salento',
      precosecha: 'Corte programado en 3 días (Cero Merma)',
    },
  },
  {
    id: '3',
    remitente: 'bot',
    texto: '✅ Ya agrupamos su plátano con la cosecha de Finca La Cañada. El flete Milk-Run le saldrá en solo $35.000 COP y el restaurante El Portal de Armenia ya reservó 10 bultos.',
    hora: '07:16 AM',
  },
];

export default function WhatsAppBotTab() {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const [mensajes, setMensajes] = useState<MensajeWhatsApp[]>(MENSAJES_INICIALES);
  const [inputTexto, setInputTexto] = useState('');
  const [grabando, setGrabando] = useState(false);

  const enviarMensaje = (texto: string, esAudio = false, datos?: any) => {
    if (!texto.trim()) return;

    const nuevoMsg: MensajeWhatsApp = {
      id: String(Date.now()),
      remitente: 'campesino',
      texto,
      hora: 'Ahora',
      audio: esAudio,
      duracion: esAudio ? '0:12' : undefined,
    };

    setMensajes((prev) => [...prev, nuevoMsg]);
    setInputTexto('');

    // Respuesta automática de la IA simulada
    setTimeout(() => {
      const respBot: MensajeWhatsApp = {
        id: String(Date.now() + 1),
        remitente: 'bot',
        texto: esAudio
          ? '🤖 Audio procesado por AgroConexión IA: He extraído la oferta y la he puesto en la Bolsa de Precios en Venta Pre-Cosecha.'
          : '¡Entendido! Hemos registrado su mensaje en la central veredal.',
        hora: 'Ahora',
        datosExtraidos: datos || {
          alimento: '🥑 Cosecha Registrada',
          cantidad: 'Por confirmar',
          finca: 'Finca Campesina',
          vereda: 'Vereda Local',
          precosecha: 'Venta Pre-Cosecha a 3 días',
        },
      };
      setMensajes((prev) => [...prev, respBot]);
    }, 1200);
  };

  const simularAudio = (tipo: 'platano' | 'aguacate' | 'retorno') => {
    if (tipo === 'platano') {
      enviarMensaje(
        '🎙️ Nota de voz (0:18 seg): "Hola amigos, habla Hernando. Tengo listos 20 bultos de plátano para el jueves. ¿Me mandan el Willys de Argemiro?"',
        true,
        {
          alimento: '🍌 Plátano Hartón',
          cantidad: '20 Bultos',
          finca: 'Finca La Esperanza',
          vereda: 'Vereda El Paraíso',
          precosecha: 'Jueves (Milk-Run)',
        }
      );
    } else if (tipo === 'aguacate') {
      enviarMensaje(
        '🎙️ Nota de voz (0:15 seg): "Buen día, de Hacienda El Mirador en Circasia. Vamos a descolgar 30 canastillas de aguacate Hass exportación para el viernes."',
        true,
        {
          alimento: '🥑 Aguacate Hass Exportación',
          cantidad: '30 Canastillas (~660 kg)',
          finca: 'Hacienda El Mirador',
          vereda: 'Circasia',
          precosecha: 'Viernes ($4.800/kg)',
        }
      );
    } else {
      enviarMensaje(
        '🎙️ Nota de voz (0:10 seg): "Argemiro al habla. Vengo bajando de Boquía con el Jeep vacío a las 2 de la tarde. Si hay carga en el camino me avisan pa no perder el viaje."',
        true,
        {
          alimento: '🚙 Flete de Retorno Vacío',
          cantidad: 'Capacidad 1.2 Ton',
          finca: 'En ruta Boquía ➔ Armenia',
          vereda: 'Corredor Quindío',
          precosecha: 'Tarifa con -30% Descuento',
        }
      );
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, isDark ? '#0d1f14' : colors.surfaceLight]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ZocaloBorder height={4} />

        {/* Encabezado del Bot */}
        <View style={[styles.header, { backgroundColor: isDark ? '#14291c' : '#ffffff', borderColor: colors.border }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.botIcon, { backgroundColor: colors.primary }]}>
              <Bot size={22} color="#FFF" />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>WhatsApp Bot + IA</Text>
              <Text style={[styles.headerSub, { color: colors.primary }]}>
                Pilar A • Notas de Voz Sin Señal 4G
              </Text>
            </View>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: isDark ? '#143820' : '#dcfce7' }]}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>IA Activa</Text>
          </View>
        </View>

        {/* Botones de Prueba Rápida de Audios */}
        <View style={styles.audioQuickBar}>
          <Text style={[styles.quickBarTitle, { color: colors.textSecondary }]}>
            Simular Audio Real del Campo:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickScroll}>
            <TouchableOpacity
              onPress={() => simularAudio('platano')}
              style={[styles.audioPill, { backgroundColor: isDark ? '#13261a' : '#ffffff', borderColor: colors.border }]}
            >
              <Play size={11} color={colors.primary} />
              <Text style={[styles.audioPillText, { color: colors.text }]}>🍌 20 Bultos Plátano</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => simularAudio('aguacate')}
              style={[styles.audioPill, { backgroundColor: isDark ? '#13261a' : '#ffffff', borderColor: colors.border }]}
            >
              <Play size={11} color={colors.primary} />
              <Text style={[styles.audioPillText, { color: colors.text }]}>🥑 30 Cajas Aguacate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => simularAudio('retorno')}
              style={[styles.audioPill, { backgroundColor: isDark ? '#13261a' : '#ffffff', borderColor: colors.border }]}
            >
              <Play size={11} color="#b45309" />
              <Text style={[styles.audioPillText, { color: '#b45309' }]}>🚙 Retorno Vacío (-30%)</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Chat de Mensajes */}
        <ScrollView
          contentContainerStyle={styles.chatScroll}
          showsVerticalScrollIndicator={false}
        >
          {mensajes.map((m) => {
            const esCampesino = m.remitente === 'campesino';

            return (
              <View
                key={m.id}
                style={[
                  styles.msgRow,
                  esCampesino ? styles.msgRowRight : styles.msgRowLeft,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    esCampesino
                      ? {
                          backgroundColor: isDark ? '#1b4329' : '#dcfce7',
                          borderTopRightRadius: 2,
                        }
                      : {
                          backgroundColor: isDark ? '#16281e' : '#ffffff',
                          borderTopLeftRadius: 2,
                          borderWidth: 1,
                          borderColor: colors.border,
                        },
                  ]}
                >
                  <Text style={[styles.bubbleText, { color: colors.text }]}>{m.texto}</Text>

                  {/* Tarjeta de Extracción IA */}
                  {m.datosExtraidos && (
                    <View
                      style={[
                        styles.extractionCard,
                        {
                          backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(21, 128, 61, 0.08)',
                          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(21, 128, 61, 0.2)',
                        },
                      ]}
                    >
                      <View style={styles.extractionHeader}>
                        <Sparkles size={12} color={colors.primary} />
                        <Text style={[styles.extractionTitle, { color: colors.primary }]}>
                          Extracción IA Verificada
                        </Text>
                      </View>

                      <Text style={[styles.extractLine, { color: colors.text }]}>
                        • Alimento: <Text style={styles.bold}>{m.datosExtraidos.alimento}</Text>
                      </Text>
                      <Text style={[styles.extractLine, { color: colors.text }]}>
                        • Cantidad: <Text style={styles.bold}>{m.datosExtraidos.cantidad}</Text>
                      </Text>
                      <Text style={[styles.extractLine, { color: colors.text }]}>
                        • Finca: <Text style={styles.bold}>{m.datosExtraidos.finca}</Text>
                      </Text>
                      <Text style={[styles.extractLine, { color: colors.primary }]}>
                        • {m.datosExtraidos.precosecha}
                      </Text>
                    </View>
                  )}

                  <Text style={[styles.msgTime, { color: colors.textSecondary }]}>{m.hora}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Barra de Entrada / Grabación de Audio */}
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: isDark ? '#14291c' : '#ffffff',
              borderTopColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setGrabando(!grabando);
              if (!grabando) {
                setTimeout(() => {
                  setGrabando(false);
                  simularAudio('platano');
                }, 2000);
              }
            }}
            style={[
              styles.micBtn,
              { backgroundColor: grabando ? '#dc2626' : colors.primary },
            ]}
          >
            <Mic size={18} color="#FFF" />
          </TouchableOpacity>

          <TextInput
            value={inputTexto}
            onChangeText={setInputTexto}
            placeholder={grabando ? 'Grabando audio de voz...' : 'Escribe o presiona el micrófono...'}
            placeholderTextColor={colors.textSecondary}
            style={[styles.chatInput, { color: colors.text }]}
          />

          <TouchableOpacity
            onPress={() => enviarMensaje(inputTexto)}
            style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          >
            <Send size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16a34a',
  },
  audioQuickBar: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  quickBarTitle: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  quickScroll: {
    gap: 8,
  },
  audioPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  audioPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  chatScroll: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  msgRow: {
    flexDirection: 'row',
    width: '100%',
  },
  msgRowRight: {
    justifyContent: 'flex-end',
  },
  msgRowLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 18,
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  extractionCard: {
    marginTop: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 3,
  },
  extractionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  extractionTitle: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  extractLine: {
    fontSize: 11,
    lineHeight: 15,
  },
  bold: {
    fontWeight: '800',
  },
  msgTime: {
    fontSize: 9,
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    gap: 8,
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

