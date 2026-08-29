import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  useWindowDimensions,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type LangCode = 'hi' | 'en';
type RoleType = 'govt' | 'customer' | 'support';

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
];

export default function WebLoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 850;

  const [selectedLang, setSelectedLang] = useState<LangCode>('hi');
  const [selectedRole, setSelectedRole] = useState<RoleType>('govt');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // OTP Modal Window States
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4', '5', '6']);

  const isHindi = selectedLang === 'hi';

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      alert(
        isHindi
          ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }
    // Open OTP Verification Modal Window
    setIsOtpModalVisible(true);
  };

  const handleVerifyOTP = () => {
    setIsOtpModalVisible(false);

    // Route based on role after successful OTP verification
    if (selectedRole === 'govt') {
      router.push({ pathname: '/web-govt', params: { lang: selectedLang } });
    } else if (selectedRole === 'support') {
      router.push({ pathname: '/web-helper', params: { lang: selectedLang } });
    } else {
      router.push({ pathname: '/web-customer', params: { lang: selectedLang } });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Row with Language Dropdown */}
        <View style={styles.topHeader}>
          <View style={styles.topHeaderContent}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.langSelectorBtn}
              onPress={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              activeOpacity={0.8}
            >
              <Ionicons name="globe-outline" size={16} color="#2C2C2C" style={{ marginRight: 6 }} />
              <Text style={styles.langSelectorText}>
                {selectedLang === 'hi' ? 'हिंदी' : 'English'}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#2C2C2C" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            {isLangDropdownOpen && (
              <View style={styles.langDropdownMenu}>
                {LANGUAGES.map((l) => (
                  <TouchableOpacity
                    key={l.code}
                    style={styles.langOptionItem}
                    onPress={() => {
                      setSelectedLang(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.langOptionText,
                        selectedLang === l.code && styles.langOptionTextSelected,
                      ]}
                    >
                      {l.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content Body: 2 Columns on Desktop, 1 Column on Mobile */}
          <View style={[styles.mainBody, isDesktop ? styles.mainBodyDesktop : styles.mainBodyMobile]}>
            {/* Left Column: Hero & Branding */}
            <View style={[styles.leftHeroCol, isDesktop ? { flex: 1.1 } : { width: '100%' }]}>
              {/* Brand Header */}
              <View style={styles.brandRow}>
                <Image
                  source={require('@/assets/images/logo_icon.png')}
                  style={styles.brandLogoImage}
                  resizeMode="contain"
                />
              </View>

              {/* Main Heading */}
              <View style={styles.heroHeadingGroup}>
                <Text style={styles.heroHeadingDark}>
                  {isHindi ? 'हस्तशिल्पियों को सशक्त बनाएं,' : 'Empowering Artisans,'}
                </Text>
                <Text style={styles.heroHeadingOrange}>
                  {isHindi ? 'भारत की कला को आगे बढ़ाएं' : 'Advancing Indian Craftsmanship'}
                </Text>
              </View>

              {/* Subtitle Description */}
              <Text style={styles.heroSubtitle}>
                {isHindi
                  ? 'सरकारी संस्थाओं, खरीदारों और समाज को जोड़ने वाला एक विश्वसनीय प्लेटफॉर्म।'
                  : 'A trusted platform connecting government bodies, buyers, and society.'}
              </Text>

              {/* 3 Value Pillars Row */}
              <View style={styles.pillarsRow}>
                {/* Pillar 1 */}
                <View style={styles.pillarCard}>
                  <View style={[styles.pillarIconCircle, { backgroundColor: '#EAF2E8' }]}>
                    <Ionicons name="shield-checkmark" size={20} color="#3B6029" />
                  </View>
                  <Text style={styles.pillarTitle}>
                    {isHindi ? 'विश्वसनीय' : 'Trusted'}
                  </Text>
                  <Text style={styles.pillarDesc}>
                    {isHindi ? 'सुरक्षित लॉगिन और प्रमाणित डेटा' : 'Secure login & verified data'}
                  </Text>
                </View>

                {/* Pillar 2 */}
                <View style={styles.pillarCard}>
                  <View style={[styles.pillarIconCircle, { backgroundColor: '#FFF0E6' }]}>
                    <Ionicons name="people" size={20} color="#C65A28" />
                  </View>
                  <Text style={[styles.pillarTitle, { color: '#C65A28' }]}>
                    {isHindi ? 'पारदर्शी' : 'Transparent'}
                  </Text>
                  <Text style={styles.pillarDesc}>
                    {isHindi ? 'आसान प्रक्रिया, बेहतर निगरानी और सहयोग' : 'Easy process, better monitoring & support'}
                  </Text>
                </View>

                {/* Pillar 3 */}
                <View style={styles.pillarCard}>
                  <View style={[styles.pillarIconCircle, { backgroundColor: '#EAF2E8' }]}>
                    <Ionicons name="hand-left" size={20} color="#3B6029" />
                  </View>
                  <Text style={styles.pillarTitle}>
                    {isHindi ? 'समावेशी' : 'Inclusive'}
                  </Text>
                  <Text style={styles.pillarDesc}>
                    {isHindi ? 'बेहतर खरीदार, बेहतर अवसर, बेहतर भविष्य' : 'Better buyers, better opportunities, better future'}
                  </Text>
                </View>
              </View>

              {/* Hero Banner Graphic */}
              <View style={styles.heroImageWrapper}>
                <Image
                  source={require('@/assets/images/web_artisan_hero.png')}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Right Column: Role Selection & Login Card */}
            <View style={[styles.rightLoginCol, isDesktop ? { flex: 0.9 } : { width: '100%', marginTop: 24 }]}>
              <View style={styles.loginCard}>
                {/* Heading */}
                <Text style={styles.loginTitle}>
                  {isHindi ? 'लॉगिन करें' : 'Login'}
                </Text>
                <View style={styles.titleAccentDash} />
                <Text style={styles.loginSubtitle}>
                  {isHindi ? 'कलासेतु पर आपका स्वागत है' : 'Welcome to KalaSetu'}
                </Text>

                {/* Role Selection ("मैं लॉगिन कर रहा हूँ एक रूप में:") */}
                <Text style={styles.roleSectionTitle}>
                  {isHindi ? 'मैं लॉगिन कर रहा हूँ एक रूप में:' : 'I am logging in as:'}
                </Text>

                <View style={styles.rolesRow}>
                  {/* Role 1: Govt Buyer */}
                  <TouchableOpacity
                    style={[
                      styles.roleCard,
                      selectedRole === 'govt' && styles.roleCardActive,
                    ]}
                    onPress={() => setSelectedRole('govt')}
                    activeOpacity={0.85}
                  >
                    {selectedRole === 'govt' && (
                      <View style={styles.roleCheckBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                      </View>
                    )}
                    <Ionicons
                      name="business"
                      size={32}
                      color={selectedRole === 'govt' ? '#3B6029' : '#666666'}
                    />
                    <Text
                      style={[
                        styles.roleCardText,
                        selectedRole === 'govt' && styles.roleCardTextActive,
                      ]}
                    >
                      {isHindi ? 'सरकारी खरीदार' : 'Govt Buyer'}
                    </Text>
                  </TouchableOpacity>

                  {/* Role 2: Customer / Buyer */}
                  <TouchableOpacity
                    style={[
                      styles.roleCard,
                      selectedRole === 'customer' && styles.roleCardActive,
                    ]}
                    onPress={() => setSelectedRole('customer')}
                    activeOpacity={0.85}
                  >
                    {selectedRole === 'customer' && (
                      <View style={styles.roleCheckBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                      </View>
                    )}
                    <Ionicons
                      name="cart-outline"
                      size={32}
                      color={selectedRole === 'customer' ? '#3B6029' : '#C65A28'}
                    />
                    <Text
                      style={[
                        styles.roleCardText,
                        selectedRole === 'customer' && styles.roleCardTextActive,
                      ]}
                    >
                      {isHindi ? 'ग्राहक / खरीदार' : 'Customer / Buyer'}
                    </Text>
                  </TouchableOpacity>

                  {/* Role 3: Support Center */}
                  <TouchableOpacity
                    style={[
                      styles.roleCard,
                      selectedRole === 'support' && styles.roleCardActive,
                    ]}
                    onPress={() => setSelectedRole('support')}
                    activeOpacity={0.85}
                  >
                    {selectedRole === 'support' && (
                      <View style={styles.roleCheckBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                      </View>
                    )}
                    <Ionicons
                      name="headset-outline"
                      size={32}
                      color={selectedRole === 'support' ? '#3B6029' : '#C65A28'}
                    />
                    <Text
                      style={[
                        styles.roleCardText,
                        selectedRole === 'support' && styles.roleCardTextActive,
                      ]}
                    >
                      {isHindi ? 'जिला सहायता केंद्र' : 'Sahayata Kendra'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Divider Line */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>
                    {isHindi ? 'मोबाइल नंबर से लॉगिन करें' : 'Login with Mobile Number'}
                  </Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Mobile Number Input */}
                <Text style={styles.inputLabel}>
                  {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
                </Text>
                <View style={styles.mobileInputBox}>
                  <View style={styles.countryCodePicker}>
                    <Text style={styles.countryCodeText}>+91</Text>
                    <Ionicons name="chevron-down" size={12} color="#666666" style={{ marginLeft: 4 }} />
                  </View>

                  <TextInput
                    style={styles.mobileTextInput}
                    placeholder={
                      isHindi
                        ? 'अपना 10 अंकों का मोबाइल नंबर दर्ज करें'
                        : 'Enter your 10-digit mobile number'
                    }
                    placeholderTextColor="#999999"
                    keyboardType="numeric"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />

                  <Ionicons name="call-outline" size={18} color="#777777" style={{ marginRight: 12 }} />
                </View>

                {/* Security Note */}
                <View style={styles.securityNoteRow}>
                  <Ionicons name="shield-outline" size={14} color="#555555" style={{ marginRight: 6 }} />
                  <Text style={styles.securityNoteText}>
                    {isHindi ? 'हम आपके नंबर को सुरक्षित रखते हैं' : 'We keep your number secure'}
                  </Text>
                </View>

                {/* Primary OTP CTA Button */}
                <TouchableOpacity
                  style={styles.sendOtpButton}
                  onPress={handleSendOTP}
                  activeOpacity={0.88}
                >
                  <Text style={styles.sendOtpButtonText}>
                    {isHindi ? 'OTP भेजें' : 'Send OTP'}
                  </Text>
                  <Ionicons name="paper-plane-outline" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                {/* Security & Simple Login Info Box */}
                <View style={styles.simpleLoginInfoBox}>
                  <Ionicons name="phone-portrait-outline" size={24} color="#3B6029" style={{ marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.simpleLoginTitle}>
                      {isHindi ? 'सुरक्षित और सरल लॉगिन' : 'Secure & Simple Login'}
                    </Text>
                    <Text style={styles.simpleLoginSubtitle}>
                      {isHindi
                        ? 'हम OTP के माध्यम से सुरक्षित और आसान लॉगिन प्रदान करते हैं।'
                        : 'We provide secure & easy login through OTP.'}
                    </Text>
                  </View>
                </View>

                {/* Footer Registration Link */}
                <Text style={styles.registerFooterText}>
                  {isHindi ? 'नया उपयोगकर्ता हैं? ' : 'New user? '}
                  <Text
                    style={styles.registerLinkText}
                    onPress={() => alert(isHindi ? 'पंजीकरण फ़ॉर्म...' : 'Registration Form...')}
                  >
                    {isHindi ? 'पंजीकरण करें' : 'Register'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Trust Footer Bar */}
        <View style={styles.bottomTrustFooter}>
          <View style={styles.trustItemsGroup}>
            {/* Item 1 */}
            <View style={styles.trustItem}>
              <Ionicons name="hand-left-outline" size={20} color="#C65A28" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.trustTitle}>
                  {isHindi ? 'हस्तशिल्प का समर्थन करें' : 'Support Handicrafts'}
                </Text>
                <Text style={styles.trustSubtitle}>
                  {isHindi ? 'स्थानीय कलाकारों को सशक्त बनाएं' : 'Empower local artisans'}
                </Text>
              </View>
            </View>

            {/* Item 2 */}
            <View style={styles.trustItem}>
              <Ionicons name="bag-handle-outline" size={20} color="#3B6029" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.trustTitle}>
                  {isHindi ? 'बेहतर बाजार से जुड़ें' : 'Connect to Better Market'}
                </Text>
                <Text style={styles.trustSubtitle}>
                  {isHindi ? 'गुणवत्तापूर्ण हस्तशिल्प खोजें' : 'Discover quality crafts'}
                </Text>
              </View>
            </View>

            {/* Item 3 */}
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#3B6029" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.trustTitle}>
                  {isHindi ? '100% सुरक्षित प्लेटफॉर्म' : '100% Secure Platform'}
                </Text>
                <Text style={styles.trustSubtitle}>
                  {isHindi ? 'विश्वसनीय और प्रमाणित लेन-देन' : 'Trusted & verified transactions'}
                </Text>
              </View>
            </View>

            {/* Item 4 */}
            <View style={styles.trustItem}>
              <Ionicons name="headset-outline" size={20} color="#C65A28" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.trustTitle}>
                  {isHindi ? 'सहायता चाहिए?' : 'Need Help?'}
                </Text>
                <Text style={styles.trustSubtitle}>
                  {isHindi ? 'हम आपकी सहायता के लिए हैं' : 'We are here to support you'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.contactUsButton}
            onPress={() => alert(isHindi ? 'संपर्क करें...' : 'Contact Us...')}
            activeOpacity={0.8}
          >
            <Text style={styles.contactUsButtonText}>
              {isHindi ? 'संपर्क करें' : 'Contact Us'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* OTP Verification Modal Window Overlay */}
        <Modal
          visible={isOtpModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOtpModalVisible(false)}
        >
          <View style={styles.otpModalOverlay}>
            <View style={styles.otpModalCard}>
              <TouchableOpacity
                style={styles.otpCloseBtn}
                onPress={() => setIsOtpModalVisible(false)}
              >
                <Ionicons name="close" size={20} color="#666666" />
              </TouchableOpacity>

              <View style={styles.otpHeaderCircle}>
                <Ionicons name="shield-checkmark" size={32} color="#3B6029" />
              </View>

              <Text style={styles.otpModalTitle}>
                {isHindi ? 'सत्यापन कोड (OTP) दर्ज करें' : 'Enter OTP Verification Code'}
              </Text>

              <Text style={styles.otpModalSubtitle}>
                {isHindi
                  ? `हम आपके मोबाइल नंबर +91 ${phoneNumber} पर 6 अंकों का OTP भेजा है।`
                  : `We sent a 6-digit OTP code to +91 ${phoneNumber}`}
              </Text>

              <TouchableOpacity
                style={styles.changePhoneRow}
                onPress={() => setIsOtpModalVisible(false)}
              >
                <Ionicons name="create-outline" size={14} color="#3B6029" style={{ marginRight: 4 }} />
                <Text style={styles.changePhoneText}>
                  {isHindi ? 'नंबर संशोधित करें' : 'Change Number'}
                </Text>
              </TouchableOpacity>

              {/* 6 Digit OTP Input Grid */}
              <View style={styles.otpGridRow}>
                {otpDigits.map((digit, idx) => (
                  <View key={idx} style={styles.otpBox}>
                    <Text style={styles.otpBoxText}>{digit}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.otpResendText}>
                ⏱️ {isHindi ? 'पुनः OTP भेजें (00:28)' : 'Resend OTP (00:28)'}
              </Text>

              {/* Verify & Proceed CTA */}
              <TouchableOpacity
                style={styles.verifyOtpButton}
                onPress={handleVerifyOTP}
                activeOpacity={0.88}
              >
                <Text style={styles.verifyOtpButtonText}>
                  {isHindi ? 'सत्यापित करें एवं आगे बढ़ें' : 'Verify & Proceed'}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  /* Top Header */
  topHeader: {
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? 10 : 14) : 12,
    paddingBottom: 8,
    zIndex: 100,
  },
  topHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  langSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  langSelectorText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  langDropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 999,
  },
  langOptionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  langOptionText: {
    fontSize: 13,
    color: '#333333',
  },
  langOptionTextSelected: {
    fontWeight: 'bold',
    color: '#3B6029',
  },
  /* Scroll & Main Body */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  mainBody: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1180,
  },
  mainBodyDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 36,
  },
  mainBodyMobile: {
    flexDirection: 'column',
  },
  /* Left Hero Column */
  leftHeroCol: {
    paddingRight: 10,
  },
  brandRow: {
    marginBottom: 16,
  },
  brandLogoImage: {
    width: 220,
    height: 90,
  },
  heroHeadingGroup: {
    marginBottom: 12,
  },
  heroHeadingDark: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4E342E',
    lineHeight: 36,
  },
  heroHeadingOrange: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C65A28',
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 20,
  },
  /* 3 Value Pillars Row */
  pillarsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  pillarCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0EFEA',
  },
  pillarIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3B6029',
    marginBottom: 2,
    textAlign: 'center',
  },
  pillarDesc: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 14,
  },
  heroImageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  /* Right Login Column */
  rightLoginCol: {},
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    padding: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B6029',
    textAlign: 'center',
  },
  titleAccentDash: {
    width: 30,
    height: 3,
    backgroundColor: '#C65A28',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 6,
  },
  loginSubtitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  rolesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  roleCard: {
    flex: 1,
    height: 100,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E0D8',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'relative',
  },
  roleCardActive: {
    backgroundColor: '#F4F8F3',
    borderColor: '#3B6029',
  },
  roleCheckBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3B6029',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleCardText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#444444',
    marginTop: 8,
    textAlign: 'center',
  },
  roleCardTextActive: {
    fontWeight: 'bold',
    color: '#3B6029',
  },
  /* Divider */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E0D8',
  },
  dividerText: {
    fontSize: 12,
    color: '#777777',
    paddingHorizontal: 10,
  },
  /* Inputs */
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  mobileInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#3B6029',
    borderRadius: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  countryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E0D8',
    height: '100%',
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  mobileTextInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    paddingHorizontal: 12,
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  securityNoteText: {
    fontSize: 12,
    color: '#555555',
  },
  sendOtpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E4D1A',
    borderRadius: 12,
    height: 48,
    marginTop: 4,
    marginBottom: 16,
    elevation: 2,
  },
  sendOtpButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  simpleLoginInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF6',
    borderWidth: 1,
    borderColor: '#E2ECE0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  simpleLoginTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  simpleLoginSubtitle: {
    fontSize: 11,
    color: '#666666',
    lineHeight: 15,
  },
  registerFooterText: {
    fontSize: 13,
    color: '#555555',
    textAlign: 'center',
  },
  registerLinkText: {
    color: '#3B6029',
    fontWeight: 'bold',
  },
  /* Bottom Trust Footer Bar */
  bottomTrustFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFEFEA',
    paddingVertical: 14,
    paddingHorizontal: 32,
    flexWrap: 'wrap',
    gap: 16,
  },
  trustItemsGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    flex: 1,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  trustSubtitle: {
    fontSize: 10,
    color: '#666666',
  },
  contactUsButton: {
    borderWidth: 1,
    borderColor: '#3B6029',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  contactUsButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  /* OTP Verification Modal Window Styles */
  otpModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  otpModalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    position: 'relative',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  otpCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#F0EFEA',
  },
  otpHeaderCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F4F8F3',
    borderWidth: 1.5,
    borderColor: '#C5D8C1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  otpModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
    textAlign: 'center',
  },
  otpModalSubtitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 10,
  },
  changePhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  changePhoneText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  otpGridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#3B6029',
    backgroundColor: '#F4F8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E4D1A',
  },
  otpResendText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
  },
  verifyOtpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E4D1A',
    borderRadius: 14,
    height: 50,
    width: '100%',
    elevation: 3,
  },
  verifyOtpButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
