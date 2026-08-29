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

const TRANSLATIONS_PROFILE = {
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
    pageTitle: 'प्रोफ़ाइल',
    pageSubtitle: 'अपने प्रोफ़ाइल की जानकारी देखें और अपडेट करें।',
    card1Title: 'प्रोफ़ाइल जानकारी',
    editBtn: 'संपादित करें',
    nameLabel: 'नाम',
    deptLabel: 'विभाग',
    emailLabel: 'ईमेल',
    phoneLabel: 'मोबाइल नंबर',
    designationLabel: 'पदनाम',
    officeAddressLabel: 'कार्यालय पता',
    card2Title: 'पासवर्ड बदलें',
    changePassBtn: 'पासवर्ड बदलें',
    currentPass: 'वर्तमान पासवर्ड',
    newPass: 'नया पासवर्ड',
    confirmPass: 'पासवर्ड की पुष्टि करें',
    card3Title: 'भाषा और क्षेत्र',
    langLabel: 'भाषा',
    timezoneLabel: 'समय क्षेत्र',
    dateFormatLabel: 'दिनांक प्रारूप',
    updateBtn: 'अपडेट करें',
    card4Title: 'खाता सेटिंग्स',
    notifEmail: 'ईमेल द्वारा सूचनाएं प्राप्त करें',
    notifSms: 'एसएमएस द्वारा सूचनाएं प्राप्त करें',
    notifTender: 'टेंडर अपडेट',
    notifBids: 'बिड अलर्ट',
    notifSystem: 'सिस्टम घोषणाएं',
    card5Title: 'त्वरित क्रियाएं',
    viewMyActivity: 'मेरी गतिविधि देखें',
    downloadDetails: 'डाउनलोड विवरण',
    deactivateAccount: 'खाता निष्क्रिय करें',
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
    pageTitle: 'Profile',
    pageSubtitle: 'View and update your profile information.',
    card1Title: 'Profile Information',
    editBtn: 'Edit',
    nameLabel: 'Name',
    deptLabel: 'Department',
    emailLabel: 'Email',
    phoneLabel: 'Mobile Number',
    designationLabel: 'Designation',
    officeAddressLabel: 'Office Address',
    card2Title: 'Change Password',
    changePassBtn: 'Change Password',
    currentPass: 'Current Password',
    newPass: 'New Password',
    confirmPass: 'Confirm Password',
    card3Title: 'Language & Region',
    langLabel: 'Language',
    timezoneLabel: 'Timezone',
    dateFormatLabel: 'Date Format',
    updateBtn: 'Update',
    card4Title: 'Account Settings',
    notifEmail: 'Receive Notifications via Email',
    notifSms: 'Receive Notifications via SMS',
    notifTender: 'Tender Updates',
    notifBids: 'Bid Alerts',
    notifSystem: 'System Announcements',
    card5Title: 'Quick Actions',
    viewMyActivity: 'View My Activity',
    downloadDetails: 'Download Details',
    deactivateAccount: 'Deactivate Account',
  },
};

export default function WebProfileScreen() {
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

  const t = TRANSLATIONS_PROFILE[selectedLang as keyof typeof TRANSLATIONS_PROFILE];
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
                    <View style={styles.sidebarBadge}>
                      <Text style={styles.sidebarBadgeText}>2</Text>
                    </View>
                  </TouchableOpacity>

                  {/* 8. संदेश */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-messages')}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.messages}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-settings')}
                  >
                    <Ionicons name="settings-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.settings}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Sidebar Controls */}
              <View style={styles.sidebarBottomGroup}>
                {/* 10. प्रोफाइल (Active) */}
                <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                  <Ionicons name="person" size={18} color="#E65100" style={{ marginRight: 12 }} />
                  <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.profile}</Text>
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

              {/* Card 1: प्रोफाइल जानकारी */}
              <View style={styles.profileCard}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitleText}>{t.card1Title}</Text>
                  <TouchableOpacity style={styles.greenOutlineBtn} activeOpacity={0.8}>
                    <Ionicons name="pencil" size={14} color="#2E7D32" style={{ marginRight: 6 }} />
                    <Text style={styles.greenOutlineBtnText}>{t.editBtn}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.profileContentRow}>
                  {/* Left Avatar with Camera Badge */}
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircleBg}>
                      <Ionicons name="shield" size={48} color="#2E7D32" />
                    </View>
                    <TouchableOpacity style={styles.cameraBadge}>
                      <Ionicons name="camera" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  {/* Right Info Key-Value Table */}
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
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.designationLabel}</Text>
                      <Text style={styles.infoValueText}>{isHindi ? 'उप संचालक (खरीद)' : 'Deputy Director (Procurement)'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabelText}>{t.officeAddressLabel}</Text>
                      <Text style={styles.infoValueText}>
                        {isHindi
                          ? 'मंत्रालय, महानदी भवन, नया रायपुर, छत्तीसगढ़ - 492002'
                          : 'Ministry, Mahanadi Bhawan, Naya Raipur, CG - 492002'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Card 2: पासवर्ड बदलें */}
              <View style={styles.profileCard}>
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
                    <Ionicons name="eye-outline" size={16} color="#888888" style={{ marginLeft: 'auto' }} />
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabelText}>{t.newPass}</Text>
                    <Text style={styles.infoValueText}>********</Text>
                    <Ionicons name="eye-outline" size={16} color="#888888" style={{ marginLeft: 'auto' }} />
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabelText}>{t.confirmPass}</Text>
                    <Text style={styles.infoValueText}>********</Text>
                    <Ionicons name="eye-outline" size={16} color="#888888" style={{ marginLeft: 'auto' }} />
                  </View>
                </View>
              </View>

              {/* Bottom 3-Column Grid Layout */}
              <View style={styles.bottomGridRow}>
                {/* Box 1: भाषा और क्षेत्र */}
                <View style={styles.bottomGridCard}>
                  <View style={styles.cardTitleGroup}>
                    <Ionicons name="globe-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                    <Text style={styles.cardTitleText}>{t.card3Title}</Text>
                  </View>

                  <View style={styles.boxContentStack}>
                    <View style={styles.dropdownFieldBox}>
                      <Text style={styles.fieldLabelText}>{t.langLabel}</Text>
                      <TouchableOpacity style={styles.selectDropdownBtn}>
                        <Text style={styles.selectDropdownText}>{isHindi ? 'हिंदी' : 'English'}</Text>
                        <Ionicons name="chevron-down" size={14} color="#777777" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.dropdownFieldBox}>
                      <Text style={styles.fieldLabelText}>{t.timezoneLabel}</Text>
                      <TouchableOpacity style={styles.selectDropdownBtn}>
                        <Text style={styles.selectDropdownText}>
                          {isHindi ? '(GMT+05:30) भारत मानक समय' : '(GMT+05:30) India Standard Time'}
                        </Text>
                        <Ionicons name="chevron-down" size={14} color="#777777" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.dropdownFieldBox}>
                      <Text style={styles.fieldLabelText}>{t.dateFormatLabel}</Text>
                      <TouchableOpacity style={styles.selectDropdownBtn}>
                        <Text style={styles.selectDropdownText}>DD/MM/YYYY</Text>
                        <Ionicons name="chevron-down" size={14} color="#777777" />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.cardUpdateBtn}>
                      <Text style={styles.cardUpdateBtnText}>{t.updateBtn}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Box 2: खाता सेटिंग्स */}
                <View style={styles.bottomGridCard}>
                  <View style={styles.cardTitleGroup}>
                    <Ionicons name="settings-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                    <Text style={styles.cardTitleText}>{t.card4Title}</Text>
                  </View>

                  <View style={styles.boxContentStack}>
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

                    <TouchableOpacity style={styles.cardUpdateBtn}>
                      <Text style={styles.cardUpdateBtnText}>{t.updateBtn}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Box 3: त्वरित क्रियाएं */}
                <View style={styles.bottomGridCard}>
                  <View style={styles.cardTitleGroup}>
                    <Ionicons name="flash-outline" size={18} color="#444444" style={{ marginRight: 8 }} />
                    <Text style={styles.cardTitleText}>{t.card5Title}</Text>
                  </View>

                  <View style={styles.boxContentStack}>
                    <TouchableOpacity style={styles.quickActionItem}>
                      <Ionicons name="time-outline" size={18} color="#444444" style={{ marginRight: 10 }} />
                      <Text style={styles.quickActionLabelText}>{t.viewMyActivity}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#777777" style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                      <Ionicons name="download-outline" size={18} color="#444444" style={{ marginRight: 10 }} />
                      <Text style={styles.quickActionLabelText}>{t.downloadDetails}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#777777" style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                      <Ionicons name="person-remove-outline" size={18} color="#C62828" style={{ marginRight: 10 }} />
                      <Text style={[styles.quickActionLabelText, { color: '#C62828' }]}>{t.deactivateAccount}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#C62828" style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>
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
  sidebarBadge: {
    marginLeft: 'auto',
    backgroundColor: '#E65100',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
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

  /* Cards */
  profileCard: {
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
    flexDirection: 'row',
    alignItems: 'center',
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

  /* Profile Avatar & Info */
  profileContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarCircleBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C8E6C9',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  /* Info Table Group */
  infoTableGroup: {
    flex: 1,
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

  /* Bottom 3-Column Grid */
  bottomGridRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  bottomGridCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  boxContentStack: {
    gap: 14,
    marginTop: 14,
  },
  dropdownFieldBox: {
    gap: 4,
  },
  fieldLabelText: {
    fontSize: 12,
    color: '#666666',
  },
  selectDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 38,
  },
  selectDropdownText: {
    fontSize: 12,
    color: '#333333',
  },
  cardUpdateBtn: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 6,
  },
  cardUpdateBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  /* Toggles Group */
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabelText: {
    fontSize: 12,
    color: '#333333',
  },

  /* Quick Actions Group */
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  quickActionLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
});
