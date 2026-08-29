import React from 'react';
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

export default function AddProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();

  const selectedLang: LangCode = (params.lang as LangCode) || 'hi';
  const isHindi = selectedLang === 'hi';

  const handleVoiceOption = () => {
    router.push({ pathname: '/add-product-voice', params: { lang: selectedLang } });
  };

  const handleTextOption = () => {
    router.push({ pathname: '/add-product-text', params: { lang: selectedLang } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Row with Back Arrow */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <View style={styles.headerTitleCenter}>
            <Text style={styles.headerTitle}>
              {isHindi ? 'नया उत्पाद जोड़ें' : 'Add New Product'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isHindi
                ? 'अपना उत्पाद जोड़ने का तरीका चुनें'
                : 'Choose how you want to add your product'}
            </Text>
          </View>

          {/* Balance spacing offset for centered title */}
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Option 1: By Voice (आवाज़ से) Card */}
          <TouchableOpacity
            style={[styles.optionCard, styles.voiceCard]}
            onPress={handleVoiceOption}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, styles.voiceIconCircle]}>
              <Ionicons name="mic" size={38} color="#3B6029" />
            </View>

            <Text style={styles.optionTitle}>
              {isHindi ? 'आवाज़ से' : 'By Voice'}
            </Text>

            <Text style={styles.optionDesc}>
              {isHindi ? 'बोलकर जानकारी दें' : 'Speak and give information'}
            </Text>
            <Text style={styles.optionDesc}>
              {isHindi ? 'हम भर देंगे' : 'We will fill it for you'}
            </Text>
          </TouchableOpacity>

          {/* Option 2: By Writing (लिखकर) Card */}
          <TouchableOpacity
            style={[styles.optionCard, styles.textCard]}
            onPress={handleTextOption}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, styles.textIconCircle]}>
              <Ionicons name="pencil" size={34} color="#1D6BB0" />
            </View>

            <Text style={styles.optionTitle}>
              {isHindi ? 'लिखकर' : 'By Writing'}
            </Text>

            <Text style={styles.optionDesc}>
              {isHindi ? 'टेक्स्ट में जानकारी भरें' : 'Fill information in text'}
            </Text>
            <Text style={styles.optionDesc}>
              {isHindi ? 'और उत्पाद जोड़ें' : 'and add product'}
            </Text>
          </TouchableOpacity>

          {/* Bottom Tip Banner */}
          <View style={styles.tipRow}>
            <View style={styles.bulbCircle}>
              <Ionicons name="bulb-outline" size={22} color="#3B6029" />
            </View>
            <View style={styles.tipTextGroup}>
              <Text style={styles.tipText}>
                {isHindi
                  ? 'दोनों तरीकों से उत्पाद जोड़ना आसान है।'
                  : 'Adding products is easy with both methods.'}
              </Text>
              <Text style={styles.tipText}>
                {isHindi
                  ? 'आप अपनी सुविधा के अनुसार चुनें।'
                  : 'Choose according to your convenience.'}
              </Text>
            </View>
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
  headerTitleCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E342E',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  /* Option Cards */
  optionCard: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1.5,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  voiceCard: {
    backgroundColor: '#F8FAF6',
    borderColor: '#E2ECE0',
  },
  textCard: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E1EDF7',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  voiceIconCircle: {
    backgroundColor: '#EEF5EC',
  },
  textIconCircle: {
    backgroundColor: '#EBF3FA',
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  optionDesc: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  /* Tip Banner */
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  bulbCircle: {
    marginRight: 10,
  },
  tipTextGroup: {
    flex: 1,
  },
  tipText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 18,
  },
});
