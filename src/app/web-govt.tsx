import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGlobalLang, LangCode } from '@/utils/languageStore';

const TRANSLATIONS_GOVT = {
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
    deptName: 'उद्योग एवं वाणिज्य विभाग',
    deptState: 'छत्तीसगढ़ शासन',
    officerTitle: 'अधिकारी',
    welcomeTitle: 'नमस्ते, अधिकारी महोदय 👋',
    welcomeSub: 'यहाँ आपके सभी टेंडर की जानकारी और गतिविधियाँ उपलब्ध हैं।',
    activeTendersCard: 'सक्रिय टेंडर',
    totalBids: 'कुल बिड प्राप्त',
    underEval: 'मूल्यांकानाधीन टेंडर',
    actionRequired: 'आपकी कार्रवाई अपेक्षित',
    awarded: 'पुरस्कारित टेंडर',
    inLast30Days: 'पिछले 30 दिनों में',
    recentActiveTenders: 'हाल के सक्रिय टेंडर',
    viewAll: 'सभी देखें →',
    thTitle: 'टेंडर शीर्षक',
    thQty: 'मात्रा',
    thStartPrice: 'आरंभिक मूल्य',
    thBids: 'बिड प्राप्त',
    thDeadline: 'अंतिम तिथि',
    thStatus: 'स्थिति',
    thAction: 'कार्रवाई',
    viewDetails: 'विवरण देखें',
    statusActive: 'सक्रिय',
    statusEval: 'मूल्यांकानाधीन',
    quickInfo: 'त्वरित जानकारी',
    deadlineToday: 'आज की अंतिम तिथि वाले टेंडर',
    evalPending: 'बिड मूल्यांकन लंबित',
    draftTenders: 'ड्राफ्ट टेंडर',
    actionReqTitle: 'आवश्यक कार्रवाई',
    actionReqSub: '3 टेंडर में आपकी कार्रवाई अपेक्षित है।',
    viewBtn: 'देखें',
    notif1: "टेंडर 'बांस की टोकरी' में नई बिड प्राप्त हुई है।",
    notif2: "टेंडर 'बांस की कुर्सी' का मूल्यांकन करना है।",
    notif3: "टेंडर 'बांस लैम्पशेड' की अंतिम तिथि नजदीक है।",
    time10m: '10 मिनट पहले',
    time1h: '1 घंटा पहले',
    time2h: '2 घंटे पहले',
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
    deptName: 'Dept of Industry & Commerce',
    deptState: 'Govt of Chhattisgarh',
    officerTitle: 'Officer',
    welcomeTitle: 'Hello, Officer Sir 👋',
    welcomeSub: 'Here is a summary of all your tender information and activities.',
    activeTendersCard: 'Active Tenders',
    totalBids: 'Total Bids Received',
    underEval: 'Tenders Under Eval',
    actionRequired: 'Action Expected',
    awarded: 'Awarded Tenders',
    inLast30Days: 'In last 30 days',
    recentActiveTenders: 'Recent Active Tenders',
    viewAll: 'View All →',
    thTitle: 'Tender Title',
    thQty: 'Quantity',
    thStartPrice: 'Starting Price',
    thBids: 'Bids Recd.',
    thDeadline: 'Deadline',
    thStatus: 'Status',
    thAction: 'Action',
    viewDetails: 'View Details',
    statusActive: 'Active',
    statusEval: 'Under Eval',
    quickInfo: 'Quick Information',
    deadlineToday: 'Tenders Expiring Today',
    evalPending: 'Bid Evaluation Pending',
    draftTenders: 'Draft Tenders',
    actionReqTitle: 'Action Required',
    actionReqSub: 'Action expected in 3 tenders.',
    viewBtn: 'View',
    notif1: "New bid received for tender 'Bamboo Basket'.",
    notif2: "Evaluation pending for tender 'Bamboo Chair'.",
    notif3: "Deadline approaching for tender 'Bamboo Lampshade'.",
    time10m: '10 mins ago',
    time1h: '1 hour ago',
    time2h: '2 hours ago',
  },
};

export default function WebGovtPortalScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLang, setSelectedLang] = useGlobalLang();

  const t = TRANSLATIONS_GOVT[selectedLang as keyof typeof TRANSLATIONS_GOVT];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Main 2-Column Layout */}
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
                  {/* 1. डैशबोर्ड (Active) */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeTab === 'dashboard' && styles.sidebarNavItemActive]}
                    onPress={() => setActiveTab('dashboard')}
                  >
                    <Ionicons
                      name="home"
                      size={18}
                      color={activeTab === 'dashboard' ? '#E65100' : '#555555'}
                      style={{ marginRight: 12 }}
                    />
                    <Text
                      style={[
                        styles.sidebarNavText,
                        activeTab === 'dashboard' && styles.sidebarNavTextActive,
                      ]}
                    >
                      {t.dashboard}
                    </Text>
                  </TouchableOpacity>

                  {/* 2. नया टेंडर बनाएं */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-create-tender')}
                  >
                    <Ionicons name="add-circle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.createTender}</Text>
                  </TouchableOpacity>

                  {/* 3. एक्टिव टेंडर */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-active-tenders')}
                  >
                    <Ionicons name="document-text-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.activeTenders}</Text>
                  </TouchableOpacity>

                  {/* 4. मेरे टेंडर */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-my-tenders')}
                  >
                    <Ionicons name="folder-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myTenders}</Text>
                  </TouchableOpacity>

                  {/* 5. बिड प्राप्त */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-bids-received')}
                  >
                    <Ionicons name="people-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.bidsReceived}</Text>
                  </TouchableOpacity>

                  {/* 6. पुरस्कारित टेंडर */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-awarded-tenders')}
                  >
                    <Ionicons name="trophy-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.awardedTenders}</Text>
                  </TouchableOpacity>

                  {/* 7. सूचनाएं */}
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

                  {/* 9. सेटिंग्स */}
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
                {/* Direct 1-Click Language Switcher (Segmented Toggle) */}
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

                {/* State Govt Department Badge */}
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

                {/* Orange Primary Action Button */}
                <TouchableOpacity
                  style={styles.createTenderBtn}
                  onPress={() => router.push('/web-create-tender')}
                  activeOpacity={0.88}
                >
                  <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.createTenderBtnText}>{t.createTender}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Dashboard Body ScrollView */}
            <ScrollView
              style={styles.dashboardScrollView}
              contentContainerStyle={styles.dashboardScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Welcome Title Banner */}
              <View style={styles.welcomeBannerRow}>
                <Text style={styles.welcomeTitle}>
                  {t.welcomeTitle}
                </Text>
                <Text style={styles.welcomeSubtitle}>
                  {t.welcomeSub}
                </Text>
              </View>

              {/* Top 4 Metrics Cards Row */}
              <View style={styles.metricsRow}>
                {/* Card 1: सक्रिय टेंडर */}
                <TouchableOpacity
                  style={styles.metricCard}
                  onPress={() => router.push('/web-active-tenders')}
                  activeOpacity={0.9}
                >
                  <View style={[styles.metricIconCircle, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="list" size={20} color="#2E7D32" />
                  </View>
                  <Text style={styles.metricLabel}>{t.activeTendersCard}</Text>
                  <Text style={styles.metricVal}>8</Text>
                  <Text style={styles.metricSubText}>
                    {t.inLast30Days} <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>↑ 2</Text>
                  </Text>
                </TouchableOpacity>

                {/* Card 2: कुल बिड प्राप्त */}
                <View style={styles.metricCard}>
                  <View style={[styles.metricIconCircle, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="people" size={20} color="#E65100" />
                  </View>
                  <Text style={styles.metricLabel}>{t.totalBids}</Text>
                  <Text style={styles.metricVal}>126</Text>
                  <Text style={styles.metricSubText}>
                    {t.inLast30Days} <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>↑ 28</Text>
                  </Text>
                </View>

                {/* Card 3: मूल्यांकानाधीन टेंडर */}
                <View style={styles.metricCard}>
                  <View style={[styles.metricIconCircle, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="hourglass-outline" size={20} color="#1565C0" />
                  </View>
                  <Text style={styles.metricLabel}>{t.underEval}</Text>
                  <Text style={styles.metricVal}>3</Text>
                  <Text style={[styles.metricSubText, { color: '#666666' }]}>{t.actionRequired}</Text>
                </View>

                {/* Card 4: पुरस्कारित टेंडर */}
                <View style={styles.metricCard}>
                  <View style={[styles.metricIconCircle, { backgroundColor: '#FFEBEE' }]}>
                    <Ionicons name="trophy-outline" size={20} color="#C62828" />
                  </View>
                  <Text style={styles.metricLabel}>{t.awardedTenders}</Text>
                  <Text style={styles.metricVal}>12</Text>
                  <Text style={styles.metricSubText}>
                    {t.inLast30Days} <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>↑ 4</Text>
                  </Text>
                </View>
              </View>

              {/* Middle & Bottom Layout Grid */}
              <View style={styles.contentGridRow}>
                {/* Left Column (Table + Notifications) */}
                <View style={[styles.leftContentCol, { flex: 2.2 }]}>
                  {/* Card 1: हाल के सक्रिय टेंडर (Data Table) */}
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardHeaderTitle}>{t.recentActiveTenders}</Text>
                      <TouchableOpacity onPress={() => router.push('/web-active-tenders')}>
                        <Text style={styles.viewAllLink}>{t.viewAll}</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Data Table */}
                    <View style={styles.tableWrapper}>
                      <View style={styles.tableHeaderRow}>
                        <Text style={[styles.thText, { flex: 2.2 }]}>{t.thTitle}</Text>
                        <Text style={[styles.thText, { flex: 1.1 }]}>{t.thQty}</Text>
                        <Text style={[styles.thText, { flex: 1.3 }]}>{t.thStartPrice}</Text>
                        <Text style={[styles.thText, { flex: 0.9, textAlign: 'center' }]}>{t.thBids}</Text>
                        <Text style={[styles.thText, { flex: 1.3 }]}>{t.thDeadline}</Text>
                        <Text style={[styles.thText, { flex: 1 }]}>{t.thStatus}</Text>
                        <Text style={[styles.thText, { flex: 1.4, textAlign: 'center' }]}>{t.thAction}</Text>
                      </View>

                      {/* Table Row 1 */}
                      <View style={styles.tableDataRow}>
                        <View style={[styles.tdCol, { flex: 2.2, flexDirection: 'row', alignItems: 'center' }]}>
                          <Image source={require('@/assets/images/govt_item_basket.png')} style={styles.itemThumb} />
                          <View>
                            <Text style={styles.itemTitleText}>{selectedLang === 'hi' ? 'बॉस की टोकरी' : 'Bamboo Basket'}</Text>
                            <Text style={styles.itemCategoryText}>{selectedLang === 'hi' ? 'हस्तशिल्प सामग्री' : 'Craft Items'}</Text>
                          </View>
                        </View>
                        <Text style={[styles.tdText, { flex: 1.1 }]}>500 {selectedLang === 'hi' ? 'पीस' : 'Pcs'}</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>₹450 / {selectedLang === 'hi' ? 'पीस' : 'Pc'}</Text>
                        <Text style={[styles.tdText, { flex: 0.9, color: '#2E7D32', fontWeight: 'bold', textAlign: 'center' }]}>12</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>30 May 2025</Text>
                        <View style={{ flex: 1 }}>
                          <View style={[styles.statusPill, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={[styles.statusPillText, { color: '#2E7D32' }]}>{t.statusActive}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/web-active-tenders')}>
                            <Text style={styles.actionBtnText}>{t.viewDetails}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ padding: 4 }}>
                            <Ionicons name="ellipsis-vertical" size={16} color="#777777" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Table Row 2 */}
                      <View style={styles.tableDataRow}>
                        <View style={[styles.tdCol, { flex: 2.2, flexDirection: 'row', alignItems: 'center' }]}>
                          <Image source={require('@/assets/images/govt_item_chair.png')} style={styles.itemThumb} />
                          <View>
                            <Text style={styles.itemTitleText}>{selectedLang === 'hi' ? 'बॉस की कुर्सी' : 'Bamboo Chair'}</Text>
                            <Text style={styles.itemCategoryText}>{selectedLang === 'hi' ? 'फर्नीचर' : 'Furniture'}</Text>
                          </View>
                        </View>
                        <Text style={[styles.tdText, { flex: 1.1 }]}>100 {selectedLang === 'hi' ? 'पीस' : 'Pcs'}</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>₹850 / {selectedLang === 'hi' ? 'पीस' : 'Pc'}</Text>
                        <Text style={[styles.tdText, { flex: 0.9, color: '#2E7D32', fontWeight: 'bold', textAlign: 'center' }]}>7</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>02 Jun 2025</Text>
                        <View style={{ flex: 1 }}>
                          <View style={[styles.statusPill, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={[styles.statusPillText, { color: '#2E7D32' }]}>{t.statusActive}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/web-active-tenders')}>
                            <Text style={styles.actionBtnText}>{t.viewDetails}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ padding: 4 }}>
                            <Ionicons name="ellipsis-vertical" size={16} color="#777777" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Table Row 3 */}
                      <View style={styles.tableDataRow}>
                        <View style={[styles.tdCol, { flex: 2.2, flexDirection: 'row', alignItems: 'center' }]}>
                          <Image source={require('@/assets/images/govt_item_lampshade.png')} style={styles.itemThumb} />
                          <View>
                            <Text style={styles.itemTitleText}>{selectedLang === 'hi' ? 'बॉस लैम्पशेड' : 'Bamboo Lampshade'}</Text>
                            <Text style={styles.itemCategoryText}>{selectedLang === 'hi' ? 'होम डेकोर' : 'Home Decor'}</Text>
                          </View>
                        </View>
                        <Text style={[styles.tdText, { flex: 1.1 }]}>200 {selectedLang === 'hi' ? 'पीस' : 'Pcs'}</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>₹550 / {selectedLang === 'hi' ? 'पीस' : 'Pc'}</Text>
                        <Text style={[styles.tdText, { flex: 0.9, color: '#2E7D32', fontWeight: 'bold', textAlign: 'center' }]}>5</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>05 Jun 2025</Text>
                        <View style={{ flex: 1 }}>
                          <View style={[styles.statusPill, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={[styles.statusPillText, { color: '#2E7D32' }]}>{t.statusActive}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/web-active-tenders')}>
                            <Text style={styles.actionBtnText}>{t.viewDetails}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ padding: 4 }}>
                            <Ionicons name="ellipsis-vertical" size={16} color="#777777" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Table Row 4 */}
                      <View style={styles.tableDataRow}>
                        <View style={[styles.tdCol, { flex: 2.2, flexDirection: 'row', alignItems: 'center' }]}>
                          <Image source={require('@/assets/images/govt_item_tray.png')} style={styles.itemThumb} />
                          <View>
                            <Text style={styles.itemTitleText}>{selectedLang === 'hi' ? 'बॉस सर्विंग ट्रे' : 'Bamboo Serving Tray'}</Text>
                            <Text style={styles.itemCategoryText}>{selectedLang === 'hi' ? 'रसोई उपयोग' : 'Kitchenware'}</Text>
                          </View>
                        </View>
                        <Text style={[styles.tdText, { flex: 1.1 }]}>300 {selectedLang === 'hi' ? 'पीस' : 'Pcs'}</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>₹350 / {selectedLang === 'hi' ? 'पीस' : 'Pc'}</Text>
                        <Text style={[styles.tdText, { flex: 0.9, color: '#2E7D32', fontWeight: 'bold', textAlign: 'center' }]}>3</Text>
                        <Text style={[styles.tdText, { flex: 1.3 }]}>10 Jun 2025</Text>
                        <View style={{ flex: 1 }}>
                          <View style={[styles.statusPill, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={[styles.statusPillText, { color: '#E65100' }]}>{t.statusEval}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/web-active-tenders')}>
                            <Text style={styles.actionBtnText}>{t.viewDetails}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ padding: 4 }}>
                            <Ionicons name="ellipsis-vertical" size={16} color="#777777" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Card 2: सूचनाएं (Notifications Box directly below table) */}
                  <View style={[styles.cardContainer, { marginTop: 16 }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardHeaderTitle}>{t.notifications}</Text>
                      <TouchableOpacity>
                        <Text style={styles.viewAllLink}>{t.viewAll}</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.notifGroup}>
                      {/* Notif 1 */}
                      <View style={styles.notifItemRow}>
                        <View style={[styles.notifDot, { backgroundColor: '#2E7D32' }]} />
                        <Text style={styles.notifText}>{t.notif1}</Text>
                        <Text style={styles.notifTime}>{t.time10m}</Text>
                      </View>

                      {/* Notif 2 */}
                      <View style={styles.notifItemRow}>
                        <View style={[styles.notifDot, { backgroundColor: '#E65100' }]} />
                        <Text style={styles.notifText}>{t.notif2}</Text>
                        <Text style={styles.notifTime}>{t.time1h}</Text>
                      </View>

                      {/* Notif 3 */}
                      <View style={styles.notifItemRow}>
                        <View style={[styles.notifDot, { backgroundColor: '#1565C0' }]} />
                        <Text style={styles.notifText}>{t.notif3}</Text>
                        <Text style={styles.notifTime}>{t.time2h}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Right Column Stack (त्वरित जानकारी + आवश्यक कार्रवाई) */}
                <View style={[styles.rightContentCol, { flex: 1 }]}>
                  {/* Card 1: त्वरित जानकारी */}
                  <View style={styles.cardContainer}>
                    <Text style={[styles.cardHeaderTitle, { marginBottom: 16 }]}>{t.quickInfo}</Text>

                    <View style={styles.quickInfoList}>
                      {/* Item 1 */}
                      <View style={styles.quickInfoRow}>
                        <View style={[styles.quickInfoIconCircle, { backgroundColor: '#E8F5E9' }]}>
                          <Ionicons name="calendar-outline" size={20} color="#2E7D32" />
                        </View>
                        <Text style={styles.quickInfoLabel}>{t.deadlineToday}</Text>
                        <Text style={styles.quickInfoVal}>2</Text>
                      </View>

                      {/* Item 2 */}
                      <View style={styles.quickInfoRow}>
                        <View style={[styles.quickInfoIconCircle, { backgroundColor: '#FFF3E0' }]}>
                          <Ionicons name="people-outline" size={20} color="#E65100" />
                        </View>
                        <Text style={styles.quickInfoLabel}>{t.evalPending}</Text>
                        <Text style={styles.quickInfoVal}>3</Text>
                      </View>

                      {/* Item 3 */}
                      <View style={styles.quickInfoRow}>
                        <View style={[styles.quickInfoIconCircle, { backgroundColor: '#E3F2FD' }]}>
                          <Ionicons name="document-outline" size={20} color="#1565C0" />
                        </View>
                        <Text style={styles.quickInfoLabel}>{t.draftTenders}</Text>
                        <Text style={styles.quickInfoVal}>1</Text>
                      </View>
                    </View>
                  </View>

                  {/* Card 2: आवश्यक कार्रवाई */}
                  <View style={styles.actionRequiredCard}>
                    <Text style={styles.actionRequiredTitle}>{t.actionReqTitle}</Text>
                    <Text style={styles.actionRequiredSubtitle}>
                      {t.actionReqSub}
                    </Text>

                    <TouchableOpacity
                      style={styles.actionRequiredBtn}
                      onPress={() => router.push('/web-active-tenders')}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.actionRequiredBtnText}>{t.viewBtn}</Text>
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
  /* Language Segmented Toggle Pill */
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
  createTenderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E65100',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  createTenderBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Dashboard Scroll */
  dashboardScrollView: {
    flex: 1,
  },
  dashboardScrollContent: {
    padding: 24,
    gap: 20,
  },
  welcomeBannerRow: {
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#666666',
  },

  /* Metrics Row */
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  metricCard: {
    flex: 1,
    minWidth: 190,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  metricIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  metricVal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  metricSubText: {
    fontSize: 11,
    color: '#777777',
  },

  /* Content Grid Row */
  contentGridRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  leftContentCol: {
    minWidth: 500,
  },
  rightContentCol: {
    minWidth: 280,
    gap: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E65100',
  },

  /* Data Table */
  tableWrapper: {},
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#FAF8F5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  thText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#666666',
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tdCol: {},
  itemThumb: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
  },
  itemTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  itemCategoryText: {
    fontSize: 10,
    color: '#888888',
  },
  tdText: {
    fontSize: 12,
    color: '#444444',
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#444444',
  },

  /* Notifications Box */
  notifGroup: {
    gap: 14,
  },
  notifItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  notifText: {
    fontSize: 13,
    color: '#333333',
    flex: 1,
  },
  notifTime: {
    fontSize: 11,
    color: '#888888',
    marginLeft: 12,
  },

  /* Quick Info Box */
  quickInfoList: {
    gap: 14,
  },
  quickInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickInfoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickInfoLabel: {
    fontSize: 13,
    color: '#333333',
    flex: 1,
  },
  quickInfoVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  /* Action Required Card */
  actionRequiredCard: {
    backgroundColor: '#FFF8F2',
    borderWidth: 1,
    borderColor: '#FFEAD6',
    borderRadius: 16,
    padding: 20,
  },
  actionRequiredTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  actionRequiredSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
  },
  actionRequiredBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  actionRequiredBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
});
