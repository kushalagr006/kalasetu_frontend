import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
];

const TRANSLATIONS: Record<LangCode, {
  headerBadge: string;
  bannerTitle: string;
  bannerSub: string;
  formTitle: string;
  formSub: string;
  phonePlaceholder: string;
  submitBtn: string;
  trust1: string;
  trust2: string;
  trust3: string;
  alertError: string;
  modalTitle: string;
}> = {
  hi: {
    headerBadge: 'महिला SHG लॉगिन',
    bannerTitle: 'KALASETU SHG',
    bannerSub: 'महिला स्व-सहायता समूह डिजिटल मंच',
    formTitle: 'मोबाइल नंबर दर्ज करें',
    formSub: 'अपने महिला SHG खाते में लॉगिन करने के लिए अपना 10 अंकों का मोबाइल नंबर लिखें।',
    phonePlaceholder: '10 अंकों का मोबाइल नंबर',
    submitBtn: 'आगे बढ़ें (OTP पाएं)',
    trust1: 'सुरक्षित लॉगिन',
    trust2: 'आसान OTP',
    trust3: '100% नि:शुल्क',
    alertError: 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।',
    modalTitle: 'भाषा चुनें / Select Language',
  },
  en: {
    headerBadge: 'Women SHG Login',
    bannerTitle: 'KALASETU SHG',
    bannerSub: 'Women Self-Help Group Digital Platform',
    formTitle: 'Enter Mobile Number',
    formSub: 'Enter your 10-digit mobile number to log into your Women SHG account.',
    phonePlaceholder: '10-digit mobile number',
    submitBtn: 'Continue (Get OTP)',
    trust1: 'Secure Login',
    trust2: 'Easy OTP',
    trust3: '100% Free',
    alertError: 'Please enter a valid 10-digit mobile number.',
    modalTitle: 'Select Language / भाषा चुनें',
  },
};

export default function SHGLoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const initialLang: LangCode = (params.lang as LangCode) || 'hi';

  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLang, setSelectedLang] = useState<LangCode>(initialLang);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  const t = TRANSLATIONS[selectedLang];
  const currentLangLabel = LANGUAGES.find((l) => l.code === selectedLang)?.label || 'हिंदी';

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) {
      alert(t.alertError);
      return;
    }

    router.push({
      pathname: '/otp',
      params: { phone: phoneNumber, role: 'shg', lang: selectedLang },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3B6029" translucent={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Bar with Back Arrow & Header Badge & Language Selector */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#3B6029" />
            </TouchableOpacity>

            <View style={styles.shgHeaderBadge}>
              <Ionicons name="people" size={18} color="#3B6029" />
              <Text style={styles.shgHeaderBadgeText}>{t.headerBadge}</Text>
            </View>

            {/* Language Selector */}
            <TouchableOpacity
              style={styles.langSelectorBtn}
              onPress={() => setIsLangModalVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="globe-outline" size={14} color="#3B6029" />
              <Text style={styles.langSelectorText}>{currentLangLabel}</Text>
              <Ionicons name="chevron-down" size={12} color="#3B6029" />
            </TouchableOpacity>
          </View>

          {/* Women SHG Banner Card */}
          <View style={styles.bannerCard}>
            <View style={styles.womenAvatarCircle}>
              <Ionicons name="people" size={42} color="#3B6029" />
            </View>

            <Text style={styles.bannerTitle}>{t.bannerTitle}</Text>
            <Text style={styles.bannerSub}>{t.bannerSub}</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.formHeaderGroup}>
              <Ionicons name="call-outline" size={22} color="#3B6029" style={{ marginRight: 8 }} />
              <Text style={styles.formTitleText}>{t.formTitle}</Text>
            </View>

            <Text style={styles.formSubText}>{t.formSub}</Text>

            {/* Phone Number Input Row */}
            <View style={styles.phoneInputRow}>
              <View style={styles.countryCodePill}>
                <Text style={styles.countryFlag}>🇮🇳</Text>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>

              <TextInput
                style={styles.phoneInput}
                placeholder={t.phonePlaceholder}
                placeholderTextColor="#999999"
                keyboardType="number-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={(val) => setPhoneNumber(val.replace(/[^0-9]/g, ''))}
              />

              {phoneNumber.length === 10 && (
                <Ionicons name="checkmark-circle" size={22} color="#3B6029" style={{ marginRight: 10 }} />
              )}
            </View>

            {/* Primary Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitBtn,
                phoneNumber.length === 10 ? styles.submitBtnActive : styles.submitBtnDisabled,
              ]}
              onPress={handleSendOtp}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>{t.submitBtn}</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          {/* Trust Highlights Row */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#3B6029" />
              <Text style={styles.trustText}>{t.trust1}</Text>
            </View>

            <View style={styles.trustDivider} />

            <View style={styles.trustItem}>
              <Ionicons name="sparkles-outline" size={20} color="#3B6029" />
              <Text style={styles.trustText}>{t.trust2}</Text>
            </View>

            <View style={styles.trustDivider} />

            <View style={styles.trustItem}>
              <Ionicons name="ribbon-outline" size={20} color="#3B6029" />
              <Text style={styles.trustText}>{t.trust3}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Language Selection Modal */}
        <Modal
          visible={isLangModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsLangModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsLangModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t.modalTitle}</Text>
              <FlatList
                data={LANGUAGES}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.langOptionItem,
                      selectedLang === item.code ? styles.langOptionSelected : null,
                    ]}
                    onPress={() => {
                      setSelectedLang(item.code);
                      setIsLangModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.langOptionText,
                        selectedLang === item.code ? styles.langOptionTextSelected : null,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {selectedLang === item.code && (
                      <Ionicons name="checkmark" size={20} color="#3B6029" />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    gap: 18,
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 6,
  },
  shgHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7ED',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  shgHeaderBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  langSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  langSelectorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },

  /* Banner Card */
  bannerCard: {
    backgroundColor: '#F0F7ED',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  womenAvatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#EAF2E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#3B6029',
    letterSpacing: 1,
  },
  bannerSub: {
    fontSize: 13,
    color: '#555555',
    marginTop: 4,
    textAlign: 'center',
  },

  /* Form Card */
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
    gap: 14,
  },
  formHeaderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  formSubText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginTop: -4,
  },

  /* Phone Input Row */
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1.5,
    borderColor: '#3B6029',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 52,
    marginTop: 4,
  },
  countryCodePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    marginRight: 10,
    gap: 4,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    paddingVertical: 8,
  },

  /* Submit Button */
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 6,
  },
  submitBtnActive: {
    backgroundColor: '#3B6029',
  },
  submitBtnDisabled: {
    backgroundColor: '#A3BC97',
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Trust Row */
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
  },
  trustDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#E0E0E0',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 320,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  langOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FAF8F5',
  },
  langOptionSelected: {
    backgroundColor: '#F0F7ED',
    borderWidth: 1,
    borderColor: '#3B6029',
  },
  langOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  langOptionTextSelected: {
    fontWeight: 'bold',
    color: '#3B6029',
  },
});
