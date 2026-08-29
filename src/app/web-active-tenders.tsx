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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGlobalLang, LangCode } from '@/utils/languageStore';

const TRANSLATIONS_ACTIVE = {
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
    pageTitle: 'एक्टिव टेंडर',
    pageSubtitle: 'यहाँ आपके सभी वर्तमान में चल रहे टेंडर की सूची है।',
    searchPlaceholder: 'टेंडर खोजें (नाम, श्रेणी, कीवर्ड)',
    allCategories: 'सभी श्रेणियाँ',
    statusAll: 'स्थिति: सभी',
    sortBtn: 'सॉर्ट करें',
    thDetail: 'टेंडर विवरण',
    thQty: 'मात्रा',
    thStartPrice: 'शुरुआती मूल्य',
    thBids: 'बिड प्राप्त',
    thDeadline: 'अंतिम तिथि',
    thStatus: 'स्थिति',
    thAction: 'कार्रवाई',
    bidsCountLabel: 'बिड',
    daysLeft: 'दिन शेष',
    statusActive: 'एक्टिव',
    viewDetails: 'विवरण देखें',
    footerInfo: 'कुल 8 टेंडर में से 4 दिखाए जा रहे हैं',
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
    pageTitle: 'Active Tenders',
    pageSubtitle: 'Here is the list of all your currently running tenders.',
    searchPlaceholder: 'Search Tenders (Name, Category, Keyword)',
    allCategories: 'All Categories',
    statusAll: 'Status: All',
    sortBtn: 'Sort',
    thDetail: 'Tender Details',
    thQty: 'Quantity',
    thStartPrice: 'Starting Price',
    thBids: 'Bids Recd.',
    thDeadline: 'Deadline',
    thStatus: 'Status',
    thAction: 'Action',
    bidsCountLabel: 'Bids',
    daysLeft: 'days left',
    statusActive: 'Active',
    viewDetails: 'View Details',
    footerInfo: 'Showing 4 of 8 total tenders',
  },
};

const INITIAL_TENDERS = [
  {
    id: '1',
    titleHi: 'बांस की टोकरी',
    titleEn: 'Bamboo Basket',
    categoryHi: 'हस्तशिल्प सामग्री',
    categoryEn: 'Craft Items',
    qty: '500',
    unitHi: 'पीस',
    unitEn: 'Pcs',
    price: '450',
    bidsCount: 12,
    deadlineDate: '30 मई 2025',
    daysLeft: 5,
    status: 'active',
    image: require('@/assets/images/govt_item_basket.png'),
  },
  {
    id: '2',
    titleHi: 'बांस की कुर्सी',
    titleEn: 'Bamboo Chair',
    categoryHi: 'फर्नीचर',
    categoryEn: 'Furniture',
    qty: '100',
    unitHi: 'पीस',
    unitEn: 'Pcs',
    price: '850',
    bidsCount: 7,
    deadlineDate: '02 जून 2025',
    daysLeft: 8,
    status: 'active',
    image: require('@/assets/images/govt_item_chair.png'),
  },
  {
    id: '3',
    titleHi: 'बांस लैम्पशेड',
    titleEn: 'Bamboo Lampshade',
    categoryHi: 'होम डेकोर',
    categoryEn: 'Home Decor',
    qty: '200',
    unitHi: 'पीस',
    unitEn: 'Pcs',
    price: '550',
    bidsCount: 5,
    deadlineDate: '05 जून 2025',
    daysLeft: 11,
    status: 'active',
    image: require('@/assets/images/govt_item_lampshade.png'),
  },
  {
    id: '4',
    titleHi: 'बांस सर्विंग ट्रे',
    titleEn: 'Bamboo Serving Tray',
    categoryHi: 'रसोई उपयोग',
    categoryEn: 'Kitchenware',
    qty: '300',
    unitHi: 'पीस',
    unitEn: 'Pcs',
    price: '350',
    bidsCount: 3,
    deadlineDate: '10 जून 2025',
    daysLeft: 16,
    status: 'active',
    image: require('@/assets/images/govt_item_tray.png'),
  },
];

export default function WebActiveTendersScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  const t = TRANSLATIONS_ACTIVE[selectedLang as keyof typeof TRANSLATIONS_ACTIVE];
  const isHindi = selectedLang === 'hi';

  const filteredTenders = INITIAL_TENDERS.filter((item) => {
    const title = isHindi ? item.titleHi : item.titleEn;
    const category = isHindi ? item.categoryHi : item.categoryEn;
    const searchLower = searchQuery.toLowerCase();
    return title.toLowerCase().includes(searchLower) || category.toLowerCase().includes(searchLower);
  });

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
                  {/* 1. डैशबोर्ड */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-govt')}
                  >
                    <Ionicons name="home-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.dashboard}</Text>
                  </TouchableOpacity>

                  {/* 2. नया टेंडर बनाएं */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-create-tender')}
                  >
                    <Ionicons name="add-circle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.createTender}</Text>
                  </TouchableOpacity>

                  {/* 3. एक्टिव टेंडर (Active) */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="document-text" size={18} color="#E65100" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.activeTenders}</Text>
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

            {/* Scrollable Dashboard Body */}
            <ScrollView
              style={styles.dashboardScrollView}
              contentContainerStyle={styles.dashboardScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Page Title Header */}
              <View style={styles.pageHeaderRow}>
                <Text style={styles.pageTitle}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitle}>{t.pageSubtitle}</Text>
              </View>

              {/* Table Container Card */}
              <View style={styles.tableCardContainer}>
                {/* Search & Filter Controls Bar */}
                <View style={styles.filterControlsBar}>
                  {/* Search Input Box */}
                  <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} color="#888888" style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.searchInputText}
                      placeholder={t.searchPlaceholder}
                      placeholderTextColor="#999999"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>

                  {/* Category Filter Dropdown */}
                  <TouchableOpacity style={styles.filterDropdownBtn}>
                    <Text style={styles.filterDropdownText}>{t.allCategories}</Text>
                    <Ionicons name="chevron-down" size={14} color="#555555" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>

                  {/* Status Filter Dropdown */}
                  <TouchableOpacity style={styles.filterDropdownBtn}>
                    <Text style={styles.filterDropdownText}>{t.statusAll}</Text>
                    <Ionicons name="chevron-down" size={14} color="#555555" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>

                  {/* Sort Button */}
                  <TouchableOpacity style={styles.sortBtn}>
                    <Ionicons name="swap-vertical" size={16} color="#333333" style={{ marginRight: 6 }} />
                    <Text style={styles.sortBtnText}>{t.sortBtn}</Text>
                  </TouchableOpacity>
                </View>

                {/* Main Data Table */}
                <View style={styles.tableWrapper}>
                  {/* Table Header Row */}
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCellText, { flex: 2.2 }]}>{t.thDetail}</Text>
                    <Text style={[styles.thCellText, { flex: 1.1 }]}>{t.thQty}</Text>
                    <Text style={[styles.thCellText, { flex: 1.2 }]}>{t.thStartPrice}</Text>
                    <Text style={[styles.thCellText, { flex: 1, textAlign: 'center' }]}>{t.thBids}</Text>
                    <Text style={[styles.thCellText, { flex: 1.4 }]}>{t.thDeadline}</Text>
                    <Text style={[styles.thCellText, { flex: 1 }]}>{t.thStatus}</Text>
                    <Text style={[styles.thCellText, { flex: 1.4, textAlign: 'center' }]}>{t.thAction}</Text>
                  </View>

                  {/* Table Data Rows */}
                  {filteredTenders.map((item) => (
                    <View style={styles.tableDataRow} key={item.id}>
                      {/* Item Thumbnail & Title */}
                      <View style={[styles.tdCell, { flex: 2.2, flexDirection: 'row', alignItems: 'center' }]}>
                        <Image source={item.image} style={styles.itemThumb} />
                        <View>
                          <Text style={styles.itemTitleText}>{isHindi ? item.titleHi : item.titleEn}</Text>
                          <Text style={styles.itemCategoryText}>{isHindi ? item.categoryHi : item.categoryEn}</Text>
                        </View>
                      </View>

                      {/* Quantity */}
                      <Text style={[styles.tdCellText, { flex: 1.1 }]}>
                        {item.qty} {isHindi ? item.unitHi : item.unitEn}
                      </Text>

                      {/* Starting Price */}
                      <Text style={[styles.tdCellText, { flex: 1.2 }]}>
                        ₹{item.price} / {isHindi ? item.unitHi : item.unitEn}
                      </Text>

                      {/* Bids Received */}
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.bidsCountVal}>{item.bidsCount}</Text>
                        <Text style={styles.bidsCountLabel}>{t.bidsCountLabel}</Text>
                      </View>

                      {/* Deadline Date */}
                      <View style={{ flex: 1.4 }}>
                        <Text style={styles.deadlineDateText}>{item.deadlineDate}</Text>
                        <Text style={styles.daysLeftSubtext}>{item.daysLeft} {t.daysLeft}</Text>
                      </View>

                      {/* Status Pill */}
                      <View style={{ flex: 1 }}>
                        <View style={[styles.statusPill, { backgroundColor: '#E8F5E9' }]}>
                          <Text style={[styles.statusPillText, { color: '#2E7D32' }]}>{t.statusActive}</Text>
                        </View>
                      </View>

                      {/* Action Button & Options Menu */}
                      <View style={{ flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <TouchableOpacity style={styles.actionBtn}>
                          <Text style={styles.actionBtnText}>{t.viewDetails}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 4 }}>
                          <Ionicons name="ellipsis-vertical" size={16} color="#777777" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Bottom Footer Pagination */}
                <View style={styles.tableFooterRow}>
                  <Text style={styles.tableFooterInfoText}>{t.footerInfo}</Text>

                  <View style={styles.paginationControlsRow}>
                    <TouchableOpacity style={[styles.pageBtn, styles.pageBtnDisabled]} disabled>
                      <Ionicons name="chevron-back" size={16} color="#B0B0B0" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}>
                      <Text style={styles.pageBtnTextActive}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pageBtn}>
                      <Text style={styles.pageBtnText}>2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pageBtn}>
                      <Ionicons name="chevron-forward" size={16} color="#444444" />
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

  /* Scrollable Dashboard Body */
  dashboardScrollView: {
    flex: 1,
  },
  dashboardScrollContent: {
    padding: 24,
    gap: 20,
  },
  pageHeaderRow: {
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

  /* Table Card Container */
  tableCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  filterControlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  searchBox: {
    flex: 1.8,
    minWidth: 240,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInputText: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
  },
  filterDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 42,
  },
  filterDropdownText: {
    fontSize: 13,
    color: '#444444',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 42,
  },
  sortBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },

  /* Data Table */
  tableWrapper: {},
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#FAF8F5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  thCellText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666',
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  tdCell: {},
  itemThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 12,
  },
  itemTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  itemCategoryText: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },
  tdCellText: {
    fontSize: 13,
    color: '#444444',
  },
  bidsCountVal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  bidsCountLabel: {
    fontSize: 10,
    color: '#777777',
  },
  deadlineDateText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '600',
  },
  daysLeftSubtext: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
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
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
  },

  /* Table Footer Pagination */
  tableFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tableFooterInfoText: {
    fontSize: 12,
    color: '#777777',
  },
  paginationControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  pageBtnDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E8E8E8',
  },
  pageBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
  },
  pageBtnTextActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
