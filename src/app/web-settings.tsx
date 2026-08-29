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

const TRANSLATIONS_SETTINGS = {
  hi: {
    dashboard: 'डैशबोर्ड',
    createTender: 'नया टेंडर बनाएं',
    activeTenders: 'एक्टिव टेंडर',
    myTenders: 'मेरे टेंडर',
    bidsReceived: 'बिड प्राप्त',
    awardedTenders: 'पुरस्कारित टेंडर',
    notifications: 'सूचनाएं',
    messages: 'संदेश',
    settings: 'सेटिंग्स',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    deptName: 'छत्तीसगढ़ शासन',
    deptState: 'खरीद विभाग',
    pageTitle: 'सेटिंग्स',
    pageSubtitle: 'अपने खाते और प्राथमिकताएं प्रबंधित करें',
    card1Title: 'प्रोफाइल जानकारी',
    editBtn: 'संपादित करें',
    nameLabel: 'नाम',
    deptLabel: 'विभाग',
    emailLabel: 'ईमेल',
    phoneLabel: 'मोबाइल नंबर',
    card2Title: 'पासवर्ड बदलें',
    changePassBtn: 'पासवर्ड बदलें',
    currentPass: 'वर्तमान पासवर्ड',
    newPass: 'नया पासवर्ड',
    confirmPass: 'पासवर्ड की पुष्टि करें',
    card3Title: 'सूचना प्राथमिकताएं',
    notifEmail: 'ईमेल द्वारा सूचनाएं प्राप्त करें',
    notifSms: 'एसएमएस द्वारा सूचनाएं प्राप्त करें',
    notifTender: 'टेंडर अपडेट',
    notifBids: 'बिड अलर्ट',
    notifSystem: 'सिस्टम घोषणाएं',
    card4Title: 'अन्य सेटिंग्स',
    langLabel: 'भाषा',
    themeLabel: 'थीम',
    timezoneLabel: 'समय क्षेत्र',
    themeLight: 'लाइट',
    timezoneVal: '(GMT+05:30) भारत मानक समय',
  },
  en: {
    dashboard: 'Dashboard',
    createTender: 'Create New Tender',
    activeTenders: 'Active Tenders',
    myTenders: 'My Tenders',
    bidsReceived: 'Bids Received',
    awardedTenders: 'Awarded Tenders',
    notifications: 'Notifications',
    messages: 'Messages',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    deptName: 'Govt of Chhattisgarh',
    deptState: 'Procurement Dept',
    pageTitle: 'Settings',
    pageSubtitle: 'Manage your account and preferences',
    card1Title: 'Profile Information',
    editBtn: 'Edit',
    nameLabel: 'Name',
    deptLabel: 'Department',
    emailLabel: 'Email',
    phoneLabel: 'Mobile Number',
    card2Title: 'Change Password',
    changePassBtn: 'Change Password',
    currentPass: 'Current Password',
    newPass: 'New Password',
    confirmPass: 'Confirm Password',
    card3Title: 'Notification Preferences',
    notifEmail: 'Receive Notifications via Email',
    notifSms: 'Receive Notifications via SMS',
    notifTender: 'Tender Updates',
    notifBids: 'Bid Alerts',
    notifSystem: 'System Announcements',
    card4Title: 'Other Settings',
    langLabel: 'Language',
    themeLabel: 'Theme',
    timezoneLabel: 'Timezone',
    themeLight: 'Light',
    timezoneVal: '(GMT+05:30) India Standard Time',
  },
};

export default function WebSettingsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();

  // Notification Toggles State
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [tenderNotif, setTenderNotif] = useState(true);
  const [bidsNotif, setBidsNotif] = useState(true);
  const [systemNotif, setSystemNotif] = useState(false);

  const t = TRANSLATIONS_SETTINGS[selectedLang as keyof typeof TRANSLATIONS_SETTINGS];
  const isHindi = selectedLang === 'hi';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        <View style={styles.mainLayoutRow}>
          {/* 1. Unified Left Sidebar Navigation */}
          {isDesktop && (
            <View style={styles.sidebarCol}>
              <View style={styles.sidebarTopGroup}>
                {/* Brand Logo Header */}
                <View style={styles.sidebarBrandRow}>
                  <Image
                    source={require('@/assets/images/logo_icon.png')}
                    style={styles.sidebarLogoImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Sidebar Navigation Items */}
                <View style={styles.sidebarMenuGroup}>
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-govt')}
                  >
                    <Ionicons name="home-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.dashboard}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-create-tender')}
                  >
                    <Ionicons name="add-circle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.createTender}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-active-tenders')}
                  >
                    <Ionicons name="document-text-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.activeTenders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-my-tenders')}
                  >
                    <Ionicons name="folder-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myTenders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-bids-received')}
                  >
                    <Ionicons name="people-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.bidsReceived}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-awarded-tenders')}
                  >
                    <Ionicons name="trophy-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.awardedTenders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-notifications')}
                  >
                    <Ionicons name="notifications-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.notifications}</Text>
                  </TouchableOpacity>

                  {/* 8. संदेश */}
                  <TouchableOpacity style={styles.sidebarNavItem}>
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.messages}</Text>
                  </TouchableOpacity>

                  {/* 9. सेटिंग्स (Active) */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="settings" size={18} color="#E65100" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.settings}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Sidebar Controls */}
              <View style={styles.sidebarBottomGroup}>
                <TouchableOpacity
                  style={styles.sidebarNavItem}
                  onPress={() => router.push('/web-profile')}
                >
                  <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{t.profile}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sidebarNavItem}
                  onPress={() => router.push('/web-login')}
                >
                  <Ionicons name="log-out-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{t.logout}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 2. Main Content Area */}
          <View style={styles.contentCol}>
            {/* Header Bar */}
            <View style={styles.headerBar}>
              <TouchableOpacity style={styles.menuToggleBtn}>
                <Ionicons name="menu" size={24} color="#1A1A1A" />
              </TouchableOpacity>

              <View style={styles.headerRightGroup}>
                {/* 1-Click Language Switcher (Segmented Toggle) */}
                <View style={styles.langSegmentContainer}>
                  <Ionicons name="globe-outline" size={16} color="#E65100" style={{ marginRight: 6 }} />
                  <TouchableOpacity
                    style={[styles.langSegmentBtn, selectedLang === 'hi' && styles.langSegmentBtnActive]}
                    onPress={() => setSelectedLang('hi')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.langSegmentText, selectedLang === 'hi' && styles.langSegmentTextActive]}>
                      हिंदी
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.langSegmentBtn, selectedLang === 'en' && styles.langSegmentBtnActive]}
                    onPress={() => setSelectedLang('en')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.langSegmentText, selectedLang === 'en' && styles.langSegmentTextActive]}>
                      English
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Notification Bell */}
                <TouchableOpacity
                  style={styles.notifBtn}
                  onPress={() => router.push('/web-notifications')}
                >
                  <Ionicons name="notifications-outline" size={22} color="#444444" />
                  <View style={styles.notifBadge}>
                    <Text style={styles.notifBadgeText}>2</Text>
                  </View>
                </TouchableOpacity>

                {/* State Govt Badge */}
                <View style={styles.govtDeptBadge}>
                  <View style={styles.govtEmblemCircle}>
                    <Ionicons name="shield" size={14} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.govtDeptName}>{t.deptName}</Text>
                    <Text style={styles.govtStateSubtitle}>{t.deptState}</Text>
                  </View>
                  <Ionicons name="chevron-down" size={14} color="#777777" style={{ marginLeft: 6 }} />
                </View>
              </View>
            </View>

            {/* Scrollable Body */}
            <ScrollView
              style={styles.dashboardScrollView}
              contentContainerStyle={styles.dashboardScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Page Title & Subtitle */}
              <View style={styles.pageTitleHeaderRow}>
                <Text style={styles.pageTitle}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitle}>{t.pageSubtitle}</Text>
              </View>

              {/* Cards Stack */}
              <View style={styles.settingsStack}>
                {/* Card 1: प्रोफाइल जानकारी */}
                <View style={styles.settingsCard}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.cardTitleGroup}>
                      <Ionicons name="person-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                      <Text style={styles.cardTitleText}>{t.card1Title}</Text>
                    </View>
                    <TouchableOpacity style={styles.greenOutlineBtn} activeOpacity={0.8}>
                      <Text style={styles.greenOutlineBtnText}>{t.editBtn}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.infoTableGroup}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.nameLabel}</Text>
                      <Text style={styles.infoValueText}>{isHindi ? 'छत्तीसगढ़ शासन' : 'Govt of Chhattisgarh'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.deptLabel}</Text>
                      <Text style={styles.infoValueText}>{isHindi ? 'खरीद विभाग' : 'Procurement Dept'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.emailLabel}</Text>
                      <Text style={styles.infoValueText}>purchasecg@cg.gov.in</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.phoneLabel}</Text>
                      <Text style={styles.infoValueText}>+91 98765 43210</Text>
                    </View>
                  </View>
                </View>

                {/* Card 2: पासवर्ड बदलें */}
                <View style={styles.settingsCard}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.cardTitleGroup}>
                      <Ionicons name="lock-closed-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                      <Text style={styles.cardTitleText}>{t.card2Title}</Text>
                    </View>
                    <TouchableOpacity style={styles.greenOutlineBtn} activeOpacity={0.8}>
                      <Text style={styles.greenOutlineBtnText}>{t.changePassBtn}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.infoTableGroup}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.currentPass}</Text>
                      <Text style={styles.infoValueText}>********</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.newPass}</Text>
                      <Text style={styles.infoValueText}>********</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.confirmPass}</Text>
                      <Text style={styles.infoValueText}>********</Text>
                    </View>
                  </View>
                </View>

                {/* Card 3: सूचना प्राथमिकताएं */}
                <View style={styles.settingsCard}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.cardTitleGroup}>
                      <Ionicons name="notifications-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                      <Text style={styles.cardTitleText}>{t.card3Title}</Text>
                    </View>
                  </View>

                  <View style={styles.togglesGroup}>
                    <View style={styles.toggleRow}>
                      <Text style={styles.toggleLabelText}>{t.notifEmail}</Text>
                      <Switch
                        value={emailNotif}
                        onValueChange={setEmailNotif}
                        trackColor={{ false: '#D0D0D0', true: '#81C784' }}
                        thumbColor={emailNotif ? '#2E7D32' : '#F5F5F5'}
                      />
                    </View>

                    <View style={styles.toggleRow}>
                      <Text style={styles.toggleLabelText}>{t.notifSms}</Text>
                      <Switch
                        value={smsNotif}
                        onValueChange={setSmsNotif}
                        trackColor={{ false: '#D0D0D0', true: '#81C784' }}
                        thumbColor={smsNotif ? '#2E7D32' : '#F5F5F5'}
                      />
                    </View>

                    <View style={styles.toggleRow}>
                      <Text style={styles.toggleLabelText}>{t.notifTender}</Text>
                      <Switch
                        value={tenderNotif}
                        onValueChange={setTenderNotif}
                        trackColor={{ false: '#D0D0D0', true: '#81C784' }}
                        thumbColor={tenderNotif ? '#2E7D32' : '#F5F5F5'}
                      />
                    </View>

                    <View style={styles.toggleRow}>
                      <Text style={styles.toggleLabelText}>{t.notifBids}</Text>
                      <Switch
                        value={bidsNotif}
                        onValueChange={setBidsNotif}
                        trackColor={{ false: '#D0D0D0', true: '#81C784' }}
                        thumbColor={bidsNotif ? '#2E7D32' : '#F5F5F5'}
                      />
                    </View>

                    <View style={styles.toggleRow}>
                      <Text style={styles.toggleLabelText}>{t.notifSystem}</Text>
                      <Switch
                        value={systemNotif}
                        onValueChange={setSystemNotif}
                        trackColor={{ false: '#D0D0D0', true: '#81C784' }}
                        thumbColor={systemNotif ? '#2E7D32' : '#F5F5F5'}
                      />
                    </View>
                  </View>
                </View>

                {/* Card 4: अन्य सेटिंग्स */}
                <View style={styles.settingsCard}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.cardTitleGroup}>
                      <Ionicons name="settings-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                      <Text style={styles.cardTitleText}>{t.card4Title}</Text>
                    </View>
                  </View>

                  <View style={styles.dropdownsGroup}>
                    {/* Language Dropdown */}
                    <View style={styles.dropdownRow}>
                      <Text style={styles.dropdownLabelText}>{t.langLabel}</Text>
                      <TouchableOpacity style={styles.selectDropdownBtn}>
                        <Text style={styles.selectDropdownText}>{isHindi ? 'हिंदी' : 'English'}</Text>
                        <Ionicons name="chevron-down" size={14} color="#777777" />
                      </TouchableOpacity>
                    </View>

                    {/* Theme Dropdown */}
                    <View style={styles.dropdownRow}>
                      <Text style={styles.dropdownLabelText}>{t.themeLabel}</Text>
                      <TouchableOpacity style={styles.selectDropdownBtn}>
                        <Text style={styles.selectDropdownText}>{t.themeLight}</Text>
                        <Ionicons name="chevron-down" size={14} color="#777777" />
                      </TouchableOpacity>
                    </View>

                    {/* Timezone Dropdown */}
                    <View style={styles.dropdownRow}>
                      <Text style={styles.dropdownLabelText}>{t.timezoneLabel}</Text>
                      <TouchableOpacity style={styles.selectDropdownBtn}>
                        <Text style={styles.selectDropdownText}>{t.timezoneVal}</Text>
                        <Ionicons name="chevron-down" size={14} color="#777777" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  mainLayoutRow: {
    flex: 1,
    flexDirection: 'row',
  },
  /* 1. Sidebar */
  sidebarCol: {
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  sidebarTopGroup: {},
  sidebarBrandRow: {
    marginBottom: 20,
  },
  sidebarLogoImage: {
    width: 170,
    height: 60,
  },
  sidebarMenuGroup: {
    gap: 4,
  },
  sidebarNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  sidebarNavItemActive: {
    backgroundColor: '#FFF4EB',
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  sidebarNavText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
  },
  sidebarNavTextActive: {
    color: '#E65100',
    fontWeight: 'bold',
  },
  sidebarBottomGroup: {
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },

  /* 2. Main Content Area */
  contentCol: {
    flex: 1,
    backgroundColor: '#F7F7F8',
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
  menuToggleBtn: {
    padding: 6,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langSegmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 20,
    padding: 3,
    paddingLeft: 8,
  },
  langSegmentBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  langSegmentBtnActive: {
    backgroundColor: '#E65100',
  },
  langSegmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },
  langSegmentTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  notifBtn: {
    position: 'relative',
    padding: 6,
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E65100',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  govtDeptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  govtEmblemCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  govtDeptName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  govtStateSubtitle: {
    fontSize: 10,
    color: '#777777',
  },

  /* Scroll Body */
  dashboardScrollView: {
    flex: 1,
  },
  dashboardScrollContent: {
    padding: 24,
    gap: 18,
    maxWidth: 800,
  },
  pageTitleHeaderRow: {
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#666666',
  },

  /* Settings Stack */
  settingsStack: {
    gap: 18,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  greenOutlineBtn: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  greenOutlineBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },

  /* Info Table Group */
  infoTableGroup: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabelText: {
    width: 140,
    fontSize: 13,
    color: '#666666',
  },
  infoValueText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  /* Toggles Group */
  togglesGroup: {
    gap: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabelText: {
    fontSize: 13,
    color: '#333333',
  },

  /* Dropdowns Group */
  dropdownsGroup: {
    gap: 14,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLabelText: {
    fontSize: 13,
    color: '#333333',
  },
  selectDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 40,
    minWidth: 200,
  },
  selectDropdownText: {
    fontSize: 13,
    color: '#333333',
  },
});
