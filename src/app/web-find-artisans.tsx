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

const TRANSLATIONS_FIND_ARTISANS = {
  hi: {
    home: 'होम',
    allProducts: 'सभी उत्पाद',
    categories: 'श्रेणियाँ',
    findArtisans: 'कारीगर खोजें',
    trackOrder: 'ऑर्डर ट्रैक करें',
    myWishlist: 'मेरी इच्छाएं',
    myOrders: 'मेरे ऑर्डर',
    messages: 'संदेश',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    userName: 'आदित्य सिंह',
    breadcrumb: 'होम > कारीगर खोजें',
    pageTitle: 'ग्रामीण मास्टर कारीगर',
    pageSubtitle: 'भारत के दूर-दराज के गांवों से मास्टर शिल्पकारों और उनके प्रामाणिक उत्पादों से जुड़ें।',
    searchPlaceholder: 'कारीगर का नाम, कला या राज्य खोजें...',
    stateFilter: 'सभी राज्य ⌄',
    verifiedBadge: 'प्रमाणित कारीगर',
    masterWeaverBadge: 'मास्टर बुनकर',
    awardeeBadge: 'राष्ट्रीय पुरस्कार विजेता',
    productsListed: 'उत्पाद सूचीबद्ध',
    reviewsCount: 'समीक्षाएं',
    viewProfileBtn: 'प्रोफाइल देखें',
    messageBtn: 'संदेश भेजें',
  },
  en: {
    home: 'Home',
    allProducts: 'All Products',
    categories: 'Categories',
    findArtisans: 'Find Artisans',
    trackOrder: 'Track Order',
    myWishlist: 'My Wishlist',
    myOrders: 'My Orders',
    messages: 'Messages',
    profile: 'Profile',
    logout: 'Logout',
    userName: 'Aditya Singh',
    breadcrumb: 'Home > Find Artisans',
    pageTitle: 'Rural Master Artisans',
    pageSubtitle: 'Connect directly with master craftspeople from rural India and explore authentic handmade heritage.',
    searchPlaceholder: 'Search by artisan name, craft, or state...',
    stateFilter: 'All States ⌄',
    verifiedBadge: 'Verified Artisan',
    masterWeaverBadge: 'Master Weaver',
    awardeeBadge: 'National Awardee',
    productsListed: 'Products Listed',
    reviewsCount: 'Reviews',
    viewProfileBtn: 'View Profile',
    messageBtn: 'Send Message',
  },
};

const ARTISANS_LIST = [
  {
    id: '1',
    nameHi: 'सीमा देवी',
    nameEn: 'Seema Devi',
    locationHi: 'कांकेर, छत्तीसगढ़',
    locationEn: 'Kanker, Chhattisgarh',
    craftHi: 'बाँस एवं बेत शिल्प (Bamboo Craft)',
    craftEn: 'Bamboo & Cane Craft',
    experienceHi: '18 वर्षों का अनुभव',
    experienceEn: '18 Years Experience',
    rating: '4.9',
    reviewsCount: '42',
    productsCount: '15',
    badgeKey: 'verifiedBadge',
    badgeBg: '#E8F5E9',
    badgeTextColor: '#2E7D32',
    avatarInitials: 'SD',
  },
  {
    id: '2',
    nameHi: 'रामकुमार साहू',
    nameEn: 'Ramkumar Sahu',
    locationHi: 'कोंडागांव, छत्तीसगढ़',
    locationEn: 'Kondagaon, Chhattisgarh',
    craftHi: 'टेराकोटा एवं मिट्टी कला (Terracotta)',
    craftEn: 'Terracotta & Clay Art',
    experienceHi: '22 वर्षों का अनुभव',
    experienceEn: '22 Years Experience',
    rating: '4.8',
    reviewsCount: '36',
    productsCount: '12',
    badgeKey: 'verifiedBadge',
    badgeBg: '#FFF3E0',
    badgeTextColor: '#E65100',
    avatarInitials: 'RS',
  },
  {
    id: '3',
    nameHi: 'मीना बाई',
    nameEn: 'Meena Bai',
    locationHi: 'चांपा, छत्तीसगढ़',
    locationEn: 'Champa, Chhattisgarh',
    craftHi: 'कोसा सिल्क एवं हाथकरघा (Kosa Silk Weaving)',
    craftEn: 'Kosa Silk & Handloom Weaving',
    experienceHi: '25 वर्षों का अनुभव',
    experienceEn: '25 Years Experience',
    rating: '4.9',
    reviewsCount: '58',
    productsCount: '24',
    badgeKey: 'masterWeaverBadge',
    badgeBg: '#E1F5FE',
    badgeTextColor: '#0288D1',
    avatarInitials: 'MB',
  },
  {
    id: '4',
    nameHi: 'विनय लकड़ा',
    nameEn: 'Vinay Lakra',
    locationHi: 'जगदलपुर, छत्तीसगढ़',
    locationEn: 'Jagdalpur, Chhattisgarh',
    craftHi: 'बस्तर काष्ठ नक्काशी (Bastar Woodcraft)',
    craftEn: 'Bastar Wood Carving',
    experienceHi: '20 वर्षों का अनुभव',
    experienceEn: '20 Years Experience',
    rating: '4.7',
    reviewsCount: '29',
    productsCount: '18',
    badgeKey: 'awardeeBadge',
    badgeBg: '#F3E5F5',
    badgeTextColor: '#7B1FA2',
    avatarInitials: 'VL',
  },
];

export default function WebFindArtisansScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS_FIND_ARTISANS[selectedLang as keyof typeof TRANSLATIONS_FIND_ARTISANS];
  const isHindi = selectedLang === 'hi';

  const filteredArtisans = ARTISANS_LIST.filter((item) => {
    const name = isHindi ? item.nameHi : item.nameEn;
    const craft = isHindi ? item.craftHi : item.craftEn;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      craft.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

            <TouchableOpacity style={styles.headerActionBtn} onPress={() => router.push('/web-wishlist')}>
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

            <TouchableOpacity
              style={styles.userProfileDropdownBtn}
              onPress={() => router.push('/web-customer-profile')}
            >
              <View style={styles.userAvatarCircle}>
                <Ionicons name="person" size={14} color="#2E7D32" />
              </View>
              <Text style={styles.userProfileNameText}>{t.userName}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main 2-Column Layout */}
        <View style={styles.mainLayoutRow}>
          {/* Left Customer Navigation Sidebar */}
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

                  {/* Active Find Artisans */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="person" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.findArtisans}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-track-order')}>
                    <Ionicons name="bus-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.trackOrder}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-wishlist')}>
                    <Ionicons name="heart-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myWishlist}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-my-orders')}>
                    <Ionicons name="bag-handle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myOrders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-customer-messages')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.messages}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Sidebar Group */}
              <View style={styles.sidebarBottomGroup}>
                <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-customer-profile')}>
                  <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{t.profile}</Text>
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
            <View style={styles.headerTitleRow}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <TouchableOpacity onPress={() => router.push('/web-customer')} activeOpacity={0.7}>
                    <Text style={[styles.breadcrumbText, { color: '#2E7D32', fontWeight: 'bold' }]}>
                      {isHindi ? 'होम' : 'Home'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.breadcrumbText}> {'>'} {isHindi ? 'कारीगर खोजें' : 'Find Artisans'}</Text>
                </View>

                <Text style={styles.pageTitleText}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitleText}>{t.pageSubtitle}</Text>
              </View>

              {/* Search Bar & State Filter */}
              <View style={styles.artisanSearchFilterRow}>
                <View style={styles.searchBarInputWrapper}>
                  <Ionicons name="search-outline" size={16} color="#777777" style={{ marginRight: 6 }} />
                  <TextInput
                    placeholder={t.searchPlaceholder}
                    placeholderTextColor="#888888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBarInputFlex}
                  />
                </View>

                <TouchableOpacity style={styles.stateDropdownBtn}>
                  <Text style={styles.stateDropdownBtnText}>{t.stateFilter}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Artisans Grid */}
            <View style={styles.artisansGridRow}>
              {filteredArtisans.map((artisan) => (
                <View style={styles.artisanCard} key={artisan.id}>
                  {/* Top Badge & Header */}
                  <View style={styles.artisanCardHeader}>
                    <View style={[styles.badgeTagPill, { backgroundColor: artisan.badgeBg }]}>
                      <Text style={[styles.badgeTagPillText, { color: artisan.badgeTextColor }]}>
                        {t[artisan.badgeKey as keyof typeof t]}
                      </Text>
                    </View>

                    <View style={styles.ratingBadgeRow}>
                      <Ionicons name="star" size={13} color="#FFA000" style={{ marginRight: 3 }} />
                      <Text style={styles.ratingScoreText}>{artisan.rating}</Text>
                      <Text style={styles.ratingCountText}>({artisan.reviewsCount})</Text>
                    </View>
                  </View>

                  {/* Profile Info */}
                  <View style={styles.artisanProfileMainRow}>
                    <View style={styles.artisanAvatarCircle}>
                      <Text style={styles.artisanAvatarText}>{artisan.avatarInitials}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.artisanNameText}>{isHindi ? artisan.nameHi : artisan.nameEn}</Text>
                      <Text style={styles.artisanLocationText}>📍 {isHindi ? artisan.locationHi : artisan.locationEn}</Text>
                      <Text style={styles.artisanCraftText}>🎨 {isHindi ? artisan.craftHi : artisan.craftEn}</Text>
                      <Text style={styles.artisanExpText}>⌛ {isHindi ? artisan.experienceHi : artisan.experienceEn}</Text>
                    </View>
                  </View>

                  {/* Products Stats Bar */}
                  <View style={styles.productsCountBar}>
                    <Text style={styles.productsCountBarText}>
                      📦 <Text style={{ fontWeight: 'bold', color: '#2E7D32' }}>{artisan.productsCount}</Text> {t.productsListed}
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.artisanCardActionsRow}>
                    <TouchableOpacity
                      style={styles.viewProfileOutlineBtn}
                      onPress={() => router.push('/web-all-products')}
                    >
                      <Text style={styles.viewProfileOutlineBtnText}>{t.viewProfileBtn}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.messageArtisanSolidBtn}
                      onPress={() => router.push('/web-customer-messages')}
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                      <Text style={styles.messageArtisanSolidBtnText}>{t.messageBtn}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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

  /* Scroll Body */
  mainScrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 24,
    gap: 20,
  },

  /* Header Title Row */
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breadcrumbText: {
    fontSize: 12,
    color: '#777777',
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
  artisanSearchFilterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchBarInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    width: 260,
  },
  searchBarInputFlex: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
  },
  stateDropdownBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    height: 36,
  },
  stateDropdownBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },

  /* Artisans Grid Row */
  artisansGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  artisanCard: {
    width: '48%',
    minWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
    gap: 16,
  },
  artisanCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeTagPill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  badgeTagPillText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  ratingBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginRight: 2,
  },
  ratingCountText: {
    fontSize: 11,
    color: '#888888',
  },
  artisanProfileMainRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  artisanAvatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artisanAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  artisanNameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  artisanLocationText: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 2,
  },
  artisanCraftText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 2,
  },
  artisanExpText: {
    fontSize: 11,
    color: '#888888',
  },
  productsCountBar: {
    backgroundColor: '#FAF8F5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  productsCountBarText: {
    fontSize: 12,
    color: '#444444',
  },
  artisanCardActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  viewProfileOutlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewProfileOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  messageArtisanSolidBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 8,
  },
  messageArtisanSolidBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
