import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGlobalLang, LangCode } from '@/utils/languageStore';

const TRANSLATIONS_CUST_PROFILE = {
  hi: {
    home: 'होम',
    allProducts: 'सभी उत्पाद',
    categories: 'श्रेणियाँ',
    findArtisans: 'कारीगर खोजें',
    newProducts: 'नए उत्पाद',
    trackOrder: 'ऑर्डर ट्रैक करें',
    myWishlist: 'मेरी इच्छाएं',
    myOrders: 'मेरे ऑर्डर',
    messages: 'संदेश',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    userName: 'आदित्य सिंह',
    userRole: 'ग्राहक / खरीदार',
    pageTitle: 'मेरी प्रोफाइल',
    pageSubtitle: 'अपनी व्यक्तिगत जानकारी, डिलीवरी पते और खाता प्राथमिकताओं को प्रबंधित करें।',
    personalInfoTitle: 'व्यक्तिगत जानकारी',
    editBtn: 'संपादित करें',
    saveBtn: 'सहेजें',
    fullNameLabel: 'पूरा नाम',
    emailLabel: 'ईमेल पता',
    phoneLabel: 'मोबाइल नंबर',
    genderLabel: 'लिंग',
    dobLabel: 'जन्म तिथि',
    addressesTitle: 'सहेजे गए डिलीवरी पते',
    addAddressBtn: '+ नया पता जोड़ें',
    primaryPill: 'प्राथमिक',
    homeAddressTitle: 'घर का पता',
    homeAddressVal: '124, सनशाइन एन्क्लेव, सिविल लाइंस, रायपुर, छत्तीसगढ़ - 492001',
    workAddressTitle: 'कार्यालय का पता',
    workAddressVal: 'ब्लॉक 3, आईटी पार्क, नया रायपुर, छत्तीसगढ़ - 492002',
    securityTitle: 'सुरक्षा और पासवर्ड बदलें',
    currentPassLabel: 'वर्तमान पासवर्ड',
    newPassLabel: 'नया पासवर्ड',
    confirmPassLabel: 'पासवर्ड की पुष्टि करें',
    updatePassBtn: 'पासवर्ड अपडेट करें',
    notifPrefTitle: 'अधिसूचना प्राथमिकताएं',
    notifSmsLabel: 'एसएमएस द्वारा ऑर्डर अपडेट प्राप्त करें',
    notifWhatsappLabel: 'व्हाट्सएप द्वारा ट्रैकिंग अलर्ट प्राप्त करें',
    notifPromosLabel: 'विशेष ऑफ़र और कारीगर कहानियों का न्यूज़लेटर',
  },
  en: {
    home: 'Home',
    allProducts: 'All Products',
    categories: 'Categories',
    findArtisans: 'Find Artisans',
    newProducts: 'New Products',
    trackOrder: 'Track Order',
    myWishlist: 'My Wishlist',
    myOrders: 'My Orders',
    messages: 'Messages',
    profile: 'Profile',
    logout: 'Logout',
    userName: 'Aditya Singh',
    userRole: 'Customer / Buyer',
    pageTitle: 'My Profile',
    pageSubtitle: 'Manage your personal details, delivery addresses, and account preferences.',
    personalInfoTitle: 'Personal Information',
    editBtn: 'Edit',
    saveBtn: 'Save Details',
    fullNameLabel: 'Full Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Mobile Number',
    genderLabel: 'Gender',
    dobLabel: 'Date of Birth',
    addressesTitle: 'Saved Delivery Addresses',
    addAddressBtn: '+ Add New Address',
    primaryPill: 'Default',
    homeAddressTitle: 'Home Address',
    homeAddressVal: '124, Sunshine Enclave, Civil Lines, Raipur, Chhattisgarh - 492001',
    workAddressTitle: 'Work Address',
    workAddressVal: 'Block 3, IT Park, Naya Raipur, Chhattisgarh - 492002',
    securityTitle: 'Security & Change Password',
    currentPassLabel: 'Current Password',
    newPassLabel: 'New Password',
    confirmPassLabel: 'Confirm New Password',
    updatePassBtn: 'Update Password',
    notifPrefTitle: 'Notification Preferences',
    notifSmsLabel: 'Receive Order updates via SMS',
    notifWhatsappLabel: 'Receive Tracking alerts via WhatsApp',
    notifPromosLabel: 'Promotional deals & Artisan stories newsletter',
  },
};

export default function WebCustomerProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const t = TRANSLATIONS_CUST_PROFILE[selectedLang as keyof typeof TRANSLATIONS_CUST_PROFILE];
  const isHindi = selectedLang === 'hi';

  // State
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [smsNotif, setSmsNotif] = useState(true);
  const [whatsappNotif, setWhatsappNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.push('/web-customer')}>
            <Image
              source={require('@/assets/images/logo_icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Search Input */}
          <View style={styles.searchBarContainer}>
            <Ionicons name="search-outline" size={18} color="#777777" style={{ marginRight: 8 }} />
            <TextInput
              placeholder={isHindi ? 'क्या खोज रहे हैं?' : 'What are you looking for?'}
              placeholderTextColor="#888888"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.searchSolidBtn} activeOpacity={0.8}>
              <Ionicons name="search-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.searchSolidBtnText}>{isHindi ? 'खोजें' : 'Search'}</Text>
            </TouchableOpacity>
          </View>

          {/* Right Header Controls */}
          <View style={styles.headerRightActions}>
            <View style={styles.langSegmentContainer}>
              <TouchableOpacity
                style={[styles.langSegmentBtn, selectedLang === 'hi' && styles.langSegmentBtnActive]}
                onPress={() => setSelectedLang('hi')}
              >
                <Text style={[styles.langSegmentText, selectedLang === 'hi' && styles.langSegmentTextActive]}>
                  हिंदी
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langSegmentBtn, selectedLang === 'en' && styles.langSegmentBtnActive]}
                onPress={() => setSelectedLang('en')}
              >
                <Text style={[styles.langSegmentText, selectedLang === 'en' && styles.langSegmentTextActive]}>
                  En
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="heart-outline" size={20} color="#333333" />
              <Text style={styles.headerActionText}>{isHindi ? 'इच्छाएं' : 'Wishlist'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerActionBtn}>
              <View style={{ position: 'relative' }}>
                <Ionicons name="cart-outline" size={20} color="#333333" />
                <View style={styles.headerBadgeCircle}>
                  <Text style={styles.headerBadgeText}>1</Text>
                </View>
              </View>
              <Text style={styles.headerActionText}>{isHindi ? 'कार्ट' : 'Cart'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userProfileDropdownBtn} activeOpacity={0.8}>
              <View style={styles.userAvatarCircle}>
                <Ionicons name="person" size={14} color="#2E7D32" />
              </View>
              <Text style={styles.userProfileNameText}>{t.userName}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main 2-Column Layout */}
        <View style={styles.mainLayoutRow}>
          {/* Left Customer Sidebar Navigation */}
          {isDesktop && (
            <View style={styles.sidebarCol}>
              <View style={styles.sidebarTopGroup}>
                <View style={styles.sidebarMenuGroup}>
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-customer')}>
                    <Ionicons name="home-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.home}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-all-products')}>
                    <Ionicons name="cube-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.allProducts}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-categories')}>
                    <Ionicons name="grid-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.categories}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-find-artisans')}>
                    <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.findArtisans}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-track-order')}>
                    <Ionicons name="bus-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.trackOrder}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-all-products')}>
                    <Ionicons name="heart-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myWishlist}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-track-order')}>
                    <Ionicons name="bag-handle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myOrders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-customer-messages')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.messages}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Group */}
              <View style={styles.sidebarBottomGroup}>
                <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                  <Ionicons name="person" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                  <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.profile}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-login')}>
                  <Ionicons name="log-out-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{t.logout}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Right Scroll Content */}
          <ScrollView style={styles.mainScrollView} contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
            {/* Header Title Section */}
            <View style={styles.pageTitleHeaderRow}>
              <View>
                <Text style={styles.pageTitleText}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitleText}>{t.pageSubtitle}</Text>
              </View>
            </View>

            {/* 1. Customer Profile Avatar & Personal Info Card */}
            <View style={styles.sectionCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderTitleText}>{t.personalInfoTitle}</Text>
                <TouchableOpacity style={styles.editOutlineBtn}>
                  <Ionicons name="create-outline" size={14} color="#2E7D32" style={{ marginRight: 4 }} />
                  <Text style={styles.editOutlineBtnText}>{t.editBtn}</Text>
                </TouchableOpacity>
              </View>

              {/* Avatar Header Row */}
              <View style={styles.avatarProfileRow}>
                <View style={styles.largeAvatarCircle}>
                  <Text style={styles.largeAvatarInitialText}>AS</Text>
                  <TouchableOpacity style={styles.avatarCameraBadge}>
                    <Ionicons name="camera" size={12} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.profileNameTitleText}>{t.userName}</Text>
                  <View style={styles.roleBadgeTag}>
                    <Text style={styles.roleBadgeTagText}>{t.userRole}</Text>
                  </View>
                </View>
              </View>

              {/* Form Grid */}
              <View style={styles.formGridRow}>
                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.fullNameLabel}</Text>
                  <TextInput value="आदित्य सिंह" style={styles.formInputVal} readOnly />
                </View>

                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.emailLabel}</Text>
                  <TextInput value="aditya.singh@gmail.com" style={styles.formInputVal} readOnly />
                </View>

                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.phoneLabel}</Text>
                  <TextInput value="+91 98765 43210" style={styles.formInputVal} readOnly />
                </View>

                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.genderLabel}</Text>
                  <TextInput value="पुरुष / Male" style={styles.formInputVal} readOnly />
                </View>

                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.dobLabel}</Text>
                  <TextInput value="15-08-1992" style={styles.formInputVal} readOnly />
                </View>
              </View>
            </View>

            {/* 2. Saved Delivery Addresses Card */}
            <View style={styles.sectionCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderTitleText}>{t.addressesTitle}</Text>
                <TouchableOpacity style={styles.addAddressOutlineBtn}>
                  <Text style={styles.addAddressOutlineBtnText}>{t.addAddressBtn}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.addressesGridRow}>
                {/* Address Box 1: Home (Default) */}
                <View style={[styles.addressBoxCard, styles.addressBoxCardActive]}>
                  <View style={styles.addressBoxHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="home" size={16} color="#2E7D32" />
                      <Text style={styles.addressBoxTitleText}>{t.homeAddressTitle}</Text>
                    </View>
                    <View style={styles.primaryTagPill}>
                      <Text style={styles.primaryTagPillText}>{t.primaryPill}</Text>
                    </View>
                  </View>
                  <Text style={styles.addressBodyText}>{t.homeAddressVal}</Text>
                  <Text style={styles.addressPhoneText}>📞 +91 98765 43210</Text>
                </View>

                {/* Address Box 2: Work */}
                <View style={styles.addressBoxCard}>
                  <View style={styles.addressBoxHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="briefcase-outline" size={16} color="#555555" />
                      <Text style={styles.addressBoxTitleText}>{t.workAddressTitle}</Text>
                    </View>
                  </View>
                  <Text style={styles.addressBodyText}>{t.workAddressVal}</Text>
                  <Text style={styles.addressPhoneText}>📞 +91 98765 43210</Text>
                </View>
              </View>
            </View>

            {/* 3. Security & Password Change */}
            <View style={styles.sectionCard}>
              <Text style={[styles.cardHeaderTitleText, { marginBottom: 16 }]}>{t.securityTitle}</Text>

              <View style={styles.formGridRow}>
                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.currentPassLabel}</Text>
                  <View style={styles.passInputWrapper}>
                    <TextInput
                      secureTextEntry={!showCurrentPass}
                      value="••••••••••••"
                      style={styles.passInputFlex}
                    />
                    <TouchableOpacity onPress={() => setShowCurrentPass(!showCurrentPass)}>
                      <Ionicons name={showCurrentPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#777777" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.newPassLabel}</Text>
                  <View style={styles.passInputWrapper}>
                    <TextInput
                      secureTextEntry={!showNewPass}
                      placeholder="••••••••••••"
                      style={styles.passInputFlex}
                    />
                    <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                      <Ionicons name={showNewPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#777777" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formFieldItem}>
                  <Text style={styles.formFieldLabel}>{t.confirmPassLabel}</Text>
                  <TextInput placeholder="••••••••••••" secureTextEntry style={styles.formInputVal} />
                </View>
              </View>

              <TouchableOpacity style={styles.updatePassSolidBtn}>
                <Text style={styles.updatePassSolidBtnText}>{t.updatePassBtn}</Text>
              </TouchableOpacity>
            </View>

            {/* 4. Notification Preferences */}
            <View style={styles.sectionCard}>
              <Text style={[styles.cardHeaderTitleText, { marginBottom: 16 }]}>{t.notifPrefTitle}</Text>

              <View style={styles.toggleListGroup}>
                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabelText}>{t.notifSmsLabel}</Text>
                  <Switch
                    value={smsNotif}
                    onValueChange={setSmsNotif}
                    trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
                    thumbColor={smsNotif ? '#2E7D32' : '#FFFFFF'}
                  />
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabelText}>{t.notifWhatsappLabel}</Text>
                  <Switch
                    value={whatsappNotif}
                    onValueChange={setWhatsappNotif}
                    trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
                    thumbColor={whatsappNotif ? '#2E7D32' : '#FFFFFF'}
                  />
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabelText}>{t.notifPromosLabel}</Text>
                  <Switch
                    value={promoNotif}
                    onValueChange={setPromoNotif}
                    trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
                    thumbColor={promoNotif ? '#2E7D32' : '#FFFFFF'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  logoImage: {
    width: 170,
    height: 50,
  },
  searchBarContainer: {
    flex: 1,
    maxWidth: 480,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingLeft: 12,
    height: 38,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333333',
  },
  searchSolidBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    height: '100%',
    paddingHorizontal: 16,
  },
  searchSolidBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langSegmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 2,
  },
  langSegmentBtn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  langSegmentBtnActive: {
    backgroundColor: '#E65100',
  },
  langSegmentText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555555',
  },
  langSegmentTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerActionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionText: {
    fontSize: 10,
    color: '#444444',
    marginTop: 2,
  },
  headerBadgeCircle: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#C62828',
    borderRadius: 8,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userProfileDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  userAvatarCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  userProfileNameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  /* Main Layout */
  mainLayoutRow: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarCol: {
    width: 210,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  sidebarTopGroup: {
    gap: 4,
  },
  sidebarBottomGroup: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    gap: 4,
  },
  sidebarMenuGroup: {
    gap: 4,
  },
  sidebarNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  sidebarNavItemActive: {
    backgroundColor: '#E8F5E9',
  },
  sidebarNavText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
  },
  sidebarNavTextActive: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },

  /* Main Content Scrollable Col */
  mainScrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 24,
    gap: 20,
  },
  pageTitleHeaderRow: {
    marginBottom: 4,
  },
  pageTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  pageSubtitleText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },

  /* Card Container */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  editOutlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  editOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  /* Avatar Row */
  avatarProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  largeAvatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  largeAvatarInitialText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarCameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E65100',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileNameTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  roleBadgeTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  roleBadgeTagText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  /* Form Grid */
  formGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  formFieldItem: {
    width: '31%',
    minWidth: 220,
    gap: 4,
  },
  formFieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },
  formInputVal: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 38,
    fontSize: 13,
    color: '#333333',
  },

  /* Saved Addresses */
  addAddressOutlineBtn: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  addAddressOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  addressesGridRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  addressBoxCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  addressBoxCardActive: {
    borderColor: '#2E7D32',
    backgroundColor: '#F4FBF5',
  },
  addressBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressBoxTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  primaryTagPill: {
    backgroundColor: '#2E7D32',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  primaryTagPillText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addressBodyText: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 18,
  },
  addressPhoneText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },

  /* Password Security */
  passInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 38,
  },
  passInputFlex: {
    flex: 1,
    fontSize: 13,
    color: '#333333',
  },
  updatePassSolidBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  updatePassSolidBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Notification Toggles */
  toggleListGroup: {
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
  toggleLabelText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
});
