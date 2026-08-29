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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGlobalLang, LangCode } from '@/utils/languageStore';

type NotifTab = 'all' | 'unread' | 'important';

const TRANSLATIONS_NOTIF = {
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
    pageTitle: 'सूचनाएं',
    markAllRead: 'सभी को पढ़ा हुआ मार्क करें',
    tabAll: 'सभी',
    tabUnread: 'अनपढ़ी',
    tabImportant: 'महत्वपूर्ण',
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
    pageTitle: 'Notifications',
    markAllRead: 'Mark all as read',
    tabAll: 'All',
    tabUnread: 'Unread',
    tabImportant: 'Important',
  },
};

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    unread: true,
    important: true,
    titleHi: 'नई बिड प्राप्त हुई',
    titleEn: 'New Bid Received',
    descHi: 'आपके टेंडर "बांस की टोकरी" (TND-2025-008) पर शिवम हस्तशिल्प समूह द्वारा नई बिड दी गई है।',
    descEn: 'New bid submitted by Shivam Handicrafts Group on your tender "Bamboo Basket" (TND-2025-008).',
    timeHi: '10 मिनट पहले',
    timeEn: '10 mins ago',
    icon: 'document-text-outline',
    iconBg: '#E8F5E9',
    iconColor: '#2E7D32',
  },
  {
    id: '2',
    unread: true,
    important: true,
    titleHi: 'टेंडर पुरस्कारित',
    titleEn: 'Tender Awarded',
    descHi: 'टेंडर "बांस लैम्पशेड" (TND-2025-005) सफलतापूर्वक शिवम हस्तशिल्प समूह को आवंटित किया गया।',
    descEn: 'Tender "Bamboo Lampshade" (TND-2025-005) successfully awarded to Shivam Handicrafts Group.',
    timeHi: '2 घंटे पहले',
    timeEn: '2 hours ago',
    icon: 'trophy-outline',
    iconBg: '#F3E5F5',
    iconColor: '#7B1FA2',
  },
  {
    id: '3',
    unread: true,
    important: true,
    titleHi: 'टेंडर की अंतिम तिथि निकट',
    titleEn: 'Tender Deadline Approaching',
    descHi: 'टेंडर "बांस की कुर्सी" (TND-2025-007) की अंतिम तिथि 2 जून 2025, 05:00 PM है।',
    descEn: 'Deadline for tender "Bamboo Chair" (TND-2025-007) is 2 June 2025, 05:00 PM.',
    timeHi: '5 घंटे पहले',
    timeEn: '5 hours ago',
    icon: 'calendar-outline',
    iconBg: '#E3F2FD',
    iconColor: '#1565C0',
  },
  {
    id: '4',
    unread: false,
    important: false,
    titleHi: 'टेंडर देखा गया',
    titleEn: 'Tender Viewed',
    descHi: 'आपके टेंडर "बांस सर्विंग ट्रे" (TND-2025-006) को 5 विक्रेताओं ने देखा है।',
    descEn: 'Your tender "Bamboo Serving Tray" (TND-2025-006) was viewed by 5 vendors.',
    timeHi: '1 दिन पहले',
    timeEn: '1 day ago',
    icon: 'eye-outline',
    iconBg: '#FFF8E1',
    iconColor: '#F57F17',
  },
  {
    id: '5',
    unread: false,
    important: false,
    titleHi: 'बिड स्वीकृत',
    titleEn: 'Bid Accepted',
    descHi: 'आपकी बिड (₹415) टेंडर "बांस की टोकरी" के लिए सफलतापूर्वक जमा हो गई है।',
    descEn: 'Your bid (₹415) for tender "Bamboo Basket" submitted successfully.',
    timeHi: '2 दिन पहले',
    timeEn: '2 days ago',
    icon: 'checkmark-circle-outline',
    iconBg: '#E8F5E9',
    iconColor: '#2E7D32',
  },
  {
    id: '6',
    unread: false,
    important: false,
    titleHi: 'बिड अस्वीकृत',
    titleEn: 'Bid Rejected',
    descHi: 'टेंडर "बांस चटाई" (TND-2025-004) के लिए आपकी बिड न्यूनतम मूल्य से अधिक होने के कारण अस्वीकृत की गई।',
    descEn: 'Your bid for tender "Bamboo Mat" (TND-2025-004) was rejected due to being above minimum price.',
    timeHi: '3 दिन पहले',
    timeEn: '3 days ago',
    icon: 'close-circle-outline',
    iconBg: '#FFEBEE',
    iconColor: '#C62828',
  },
  {
    id: '7',
    unread: false,
    important: false,
    titleHi: 'नई घोषणा',
    titleEn: 'New Announcement',
    descHi: 'हस्तशिल्प सामग्रियों से संबंधित नए टेंडर जारी किए गए हैं।',
    descEn: 'New tenders related to handicraft materials have been published.',
    timeHi: '5 दिन पहले',
    timeEn: '5 days ago',
    icon: 'megaphone-outline',
    iconBg: '#E8EAF6',
    iconColor: '#3F51B5',
  },
];

export default function WebNotificationsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [activeTab, setActiveTab] = useState<NotifTab>('all');
  const [notifList, setNotifList] = useState(INITIAL_NOTIFICATIONS);

  const t = TRANSLATIONS_NOTIF[selectedLang as keyof typeof TRANSLATIONS_NOTIF];
  const isHindi = selectedLang === 'hi';

  const handleMarkAllRead = () => {
    setNotifList((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const filteredNotifs = notifList.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return item.unread;
    if (activeTab === 'important') return item.important;
    return true;
  });

  const unreadCount = notifList.filter((item) => item.unread).length;
  const importantCount = notifList.filter((item) => item.important).length;

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

                  {/* 7. सूचनाएं (Active) */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="notifications" size={18} color="#E65100" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.notifications}</Text>
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
                <TouchableOpacity style={styles.notifBtn}>
                  <Ionicons name="notifications-outline" size={22} color="#444444" />
                  {unreadCount > 0 && (
                    <View style={styles.notifBadge}>
                      <Text style={styles.notifBadgeText}>{unreadCount}</Text>
                    </View>
                  )}
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
              {/* Page Title & Mark All Read Link */}
              <View style={styles.pageTitleHeaderRow}>
                <Text style={styles.pageTitle}>{t.pageTitle}</Text>
                <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.8}>
                  <Text style={styles.markAllReadText}>{t.markAllRead} ✓</Text>
                </TouchableOpacity>
              </View>

              {/* Status Filter Tabs Row */}
              <View style={styles.tabsRow}>
                <TouchableOpacity
                  style={[styles.tabItem, activeTab === 'all' && styles.tabItemActive]}
                  onPress={() => setActiveTab('all')}
                >
                  <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
                    {t.tabAll} ({notifList.length})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tabItem, activeTab === 'unread' && styles.tabItemActive]}
                  onPress={() => setActiveTab('unread')}
                >
                  <Text style={[styles.tabText, activeTab === 'unread' && styles.tabTextActive]}>
                    {t.tabUnread} ({unreadCount})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tabItem, activeTab === 'important' && styles.tabItemActive]}
                  onPress={() => setActiveTab('important')}
                >
                  <Text style={[styles.tabText, activeTab === 'important' && styles.tabTextActive]}>
                    {t.tabImportant} ({importantCount})
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Notification Cards List */}
              <View style={styles.notifCardsStack}>
                {filteredNotifs.map((item) => (
                  <View key={item.id} style={styles.notifCardContainer}>
                    {/* Left Colored Icon Circle */}
                    <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                      <Ionicons name={item.icon as any} size={22} color={item.iconColor} />
                    </View>

                    {/* Middle Title & Description */}
                    <View style={styles.notifTextCol}>
                      <Text style={styles.notifTitleText}>
                        {isHindi ? item.titleHi : item.titleEn}
                      </Text>
                      <Text style={styles.notifDescText}>
                        {isHindi ? item.descHi : item.descEn}
                      </Text>
                    </View>

                    {/* Right Time & Unread Orange Dot */}
                    <View style={styles.notifRightCol}>
                      <Text style={styles.notifTimeText}>
                        {isHindi ? item.timeHi : item.timeEn}
                      </Text>
                      {item.unread && <View style={styles.unreadOrangeDot} />}
                    </View>
                  </View>
                ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  markAllReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1565C0',
  },

  /* Tabs Row */
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    marginBottom: 8,
  },
  tabItem: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#E65100',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#E65100',
    fontWeight: 'bold',
  },

  /* Cards Stack */
  notifCardsStack: {
    gap: 12,
  },
  notifCardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  notifTextCol: {
    flex: 1,
    marginRight: 12,
  },
  notifTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notifDescText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
  notifRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    minHeight: 44,
  },
  notifTimeText: {
    fontSize: 11,
    color: '#888888',
  },
  unreadOrangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E65100',
    marginTop: 8,
  },
});
