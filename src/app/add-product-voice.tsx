import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';

export default function AddProductVoiceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();

  const selectedLang: LangCode = (params.lang as LangCode) || 'hi';
  const isHindi = selectedLang === 'hi';

  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${formattedMins}:${formattedSecs}`;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    alert(
      isHindi
        ? 'रिकॉर्डिंग पूरी हो गई! उत्पाद की जानकारी प्रोफ़ाइल में जोड़ी जा रही है...'
        : 'Recording complete! Product details are being generated...'
    );
  };

  const handleMicTap = () => {
    setIsRecording(!isRecording);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Row with Back Button and Help */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#3B6029" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {isHindi ? 'आवाज़ से उत्पाद जोड़ें' : 'Add Product by Voice'}
          </Text>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => alert(isHindi ? 'सहायता केन्द्र' : 'Help Center')}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle-outline" size={22} color="#3B6029" />
            <Text style={styles.helpText}>{isHindi ? 'सहायता' : 'Help'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Info Banner Card */}
          <View style={styles.infoBanner}>
            <View style={styles.micCircleSmall}>
              <Ionicons name="mic" size={26} color="#3B6029" />
            </View>

            <View style={styles.infoTextGroup}>
              <Text style={styles.infoTitle}>
                {isHindi
                  ? 'आप बोलकर अपने उत्पाद की जानकारी दें'
                  : 'Speak and give details of your product'}
              </Text>
              <Text style={styles.infoSubtitle}>
                {isHindi
                  ? 'नाम, कीमत, विवरण आदि सब अपने आप लिख जाएगा'
                  : 'Name, price, description etc. will be written automatically'}
              </Text>
            </View>
          </View>

          {/* Central Voice Recording Container Card */}
          <View style={styles.recordingCard}>
            <Text style={styles.recordingSectionTitle}>
              {isHindi ? 'बोलना शुरू करें' : 'Start Speaking'}
            </Text>

            {/* Pulse Mic Circle Button */}
            <TouchableOpacity
              style={styles.outerPulseCircle}
              onPress={handleMicTap}
              activeOpacity={0.85}
            >
              <View style={styles.innerPulseCircle}>
                <Ionicons name="mic" size={54} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <Text style={styles.listeningText}>
              {isRecording
                ? isHindi
                  ? 'मैं आपकी बात सुन रहा हूँ...'
                  : 'I am listening to you...'
                : isHindi
                ? 'रिकॉर्डिंग रुकी हुई है। पुनः शुरू करने के लिए माइक दबाएं।'
                : 'Recording paused. Tap mic to resume.'}
            </Text>

            {/* Recording Timer Badge */}
            <View style={styles.timerBadge}>
              <View
                style={[
                  styles.timerDot,
                  { backgroundColor: isRecording ? '#3B6029' : '#999999' },
                ]}
              />
              <Text style={styles.timerText}>{formatTimer(seconds)}</Text>
            </View>

            {/* "उदाहरण के लिए बोलें" (Examples Box) */}
            <View style={styles.exampleBox}>
              <Text style={styles.exampleBoxTitle}>
                {isHindi ? 'उदाहरण के लिए बोलें' : 'Speak like this example'}
              </Text>

              <View style={styles.exampleBulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.exampleBulletText}>
                  {isHindi
                    ? 'मिट्टी का घड़ा, कीमत 450 रुपये, अच्छा और टिकाऊ है'
                    : 'Clay pot, price 450 rupees, good and durable'}
                </Text>
              </View>

              <View style={styles.exampleBulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.exampleBulletText}>
                  {isHindi
                    ? 'बांस की टोकरी, कीमत 200 रुपये, हाथ से बनी हुई'
                    : 'Bamboo basket, price 200 rupees, handmade'}
                </Text>
              </View>

              <View style={styles.exampleBulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.exampleBulletText}>
                  {isHindi
                    ? 'लकड़ी की सजावटी दीवार घड़ी, कीमत 650 रुपये'
                    : 'Wooden decorative wall clock, price 650 rupees'}
                </Text>
              </View>
            </View>

            {/* "बोलना बंद करें" (Stop Button) */}
            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleStopRecording}
              activeOpacity={0.85}
            >
              <View style={styles.stopSquareCircle}>
                <View style={styles.stopSquareInner} />
              </View>
              <Text style={styles.stopButtonText}>
                {isHindi ? 'बोलना बंद करें' : 'Stop Speaking'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? 8 : 12) : 10,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  helpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  helpText: {
    fontSize: 11,
    color: '#3B6029',
    fontWeight: '600',
    marginTop: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  /* Top Info Banner */
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF5',
    borderWidth: 1,
    borderColor: '#EAEFE8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  micCircleSmall: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EEF5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 17,
  },
  /* Central Recording Card */
  recordingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F0EFEA',
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  recordingSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  outerPulseCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#F0F6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  innerPulseCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#527D37',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#527D37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  listeningText: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 14,
    textAlign: 'center',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  timerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    fontVariant: ['tabular-nums'],
  },
  /* Examples Box */
  exampleBox: {
    backgroundColor: '#F9F9F4',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  exampleBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B6029',
    marginBottom: 12,
  },
  exampleBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B6029',
    marginTop: 6,
    marginRight: 10,
  },
  exampleBulletText: {
    flex: 1,
    fontSize: 13,
    color: '#444444',
    lineHeight: 18,
  },
  /* Stop Button */
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0EFEA',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 1,
  },
  stopSquareCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FDECEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stopSquareInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#D32F2F',
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
});
