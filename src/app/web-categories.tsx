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

const TRANSLATIONS_CATEGORIES = {
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
    breadcrumb: 'होम > श्रेणियाँ',
    pageTitle: 'उत्पाद श्रेणियाँ',
    pageSubtitle: 'भारत के समृद्ध हस्तशिल्प और कला रूपों की श्रेणीवार खोज करें।',
    searchPlaceholder: 'श्रेणी का नाम खोजें...',
    viewProductsBtn: 'उत्पाद देखें',
    productsCountLabel: 'उत्पाद उपलब्ध',
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
    breadcrumb: 'Home > Categories',
    pageTitle: 'Product Categories',
    pageSubtitle: "Explore India's rich handicrafts and traditional art forms by category.",
    searchPlaceholder: 'Search category name...',
    viewProductsBtn: 'View Products',
    productsCountLabel: 'Products available',
  },
};

const CATEGORIES_LIST = [
  {
    id: 'bamboo',
    titleHi: 'बाँस शिल्प',
    titleEn: 'Bamboo Craft',
    count: '8',
    descHi: 'पूर्वोत्तर और मध्य भारत के प्राकृतिक बांस से निर्मित हस्तशिल्प टोकरियां, चटाइयां और सजावटी वस्तुएं।',
    descEn: 'Handcrafted baskets, mats, and decorative items made from natural bamboo of Central & NE India.',
    image: require('@/assets/images/cust_cat_bamboo.png'),
    badgeColor: '#E8F5E9',
    textColor: '#2E7D32',
  },
  {
    id: 'clay',
    titleHi: 'मिट्टी शिल्प & टेराकोटा',
    titleEn: 'Clay & Terracotta Craft',
    count: '6',
    descHi: 'प्राकृतिक मिट्टी से बने पारंपरिक घड़े, दीये, बर्तन और कलात्मक टेराकोटा की मूर्तियां।',
    descEn: 'Traditional eco-friendly pots, lamps, cookware, and artistic terracotta sculptures.',
    image: require('@/assets/images/cust_cat_clay.png'),
    badgeColor: '#FFF3E0',
    textColor: '#E65100',
  },
  {
    id: 'textiles',
    titleHi: 'हस्तनिर्मित वस्त्र',
    titleEn: 'Handwoven Textiles',
    count: '7',
    descHi: 'सिल्क, कॉटन और जूट से बने बनारसी दुपट्टे, कोसा सिल्क साड़ियां और हाथ से कढ़े हुए वस्त्र।',
    descEn: 'Banarasi dupatta, Kosa silk sarees, and hand-embroidered ethnic wear woven by rural artisans.',
    image: require('@/assets/images/cust_cat_textile.png'),
    badgeColor: '#E1F5FE',
    textColor: '#0288D1',
  },
  {
    id: 'wood',
    titleHi: 'लकड़ी शिल्प & नक्काशी',
    titleEn: 'Wood Craft & Carvings',
    count: '5',
    descHi: 'शीशम और सागौन की नक्काशीदार डिब्बियां, मूर्तियां, खिलौने और नक्काशीदार सजावटी सामान।',
    descEn: 'Carved Sheesham and Teak wooden boxes, idols, toys, and intricately engraved artifacts.',
    image: require('@/assets/images/cust_cat_wood.png'),
    badgeColor: '#F3E5F5',
    textColor: '#7B1FA2',
  },
  {
    id: 'metal',
    titleHi: 'धातु शिल्प & ढोकरा कला',
    titleEn: 'Metal Craft & Dhokra Art',
    count: '4',
    descHi: 'बस्तर ढोकरा कांस्य कला, पीतल के पारंपरिक दीये, मूर्तियां और अलंकृत पूजा बर्तन।',
    descEn: 'Bastar Dhokra bell-metal craft, traditional brass lamps, and handcrafted bronze idols.',
    image: require('@/assets/images/cust_cat_metal.png'),
    badgeColor: '#FFF8E1',
    textColor: '#F57F17',
  },
  {
    id: 'jewelry',
    titleHi: 'पारंपरिक आभूषण',
    titleEn: 'Traditional Handmade Jewelry',
    count: '6',
    descHi: 'लकड़ी, मोतियों, टेराकोटा और धातु से तैयार किए गए स्वदेशी और जनजातीय आभूषण।',
    descEn: 'Tribal and ethnic jewelry crafted from beads, terracotta, natural wood, and metals.',
    image: require('@/assets/images/cust_cat_jewel.png'),
    badgeColor: '#FCE4EC',
    textColor: '#C2185B',
  },
];

export default function WebCategoriesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS_CATEGORIES[selectedLang as keyof typeof TRANSLATIONS_CATEGORIES];
  const isHindi = selectedLang === 'hi';

  const filteredCategories = CATEGORIES_LIST.filter((cat) => {
    const title = isHindi ? cat.titleHi : cat.titleEn;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
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

                  {/* Active Categories Item */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="grid" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.categories}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-find-artisans')}>
                    <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.findArtisans}</Text>
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
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <TouchableOpacity onPress={() => router.push('/web-customer')} activeOpacity={0.7}>
                    <Text style={[styles.breadcrumbText, { color: '#2E7D32', fontWeight: 'bold' }]}>
                      {isHindi ? 'होम' : 'Home'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.breadcrumbText}> {'>'} {isHindi ? 'श्रेणियाँ' : 'Categories'}</Text>
                </View>

                <Text style={styles.pageTitleText}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitleText}>{t.pageSubtitle}</Text>
              </View>

              {/* Category Search Filter Input */}
              <View style={styles.categoryFilterSearchInputWrapper}>
                <Ionicons name="filter-outline" size={16} color="#777777" style={{ marginRight: 6 }} />
                <TextInput
                  placeholder={t.searchPlaceholder}
                  placeholderTextColor="#888888"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.categoryFilterSearchInput}
                />
              </View>
            </View>

            {/* Categories Grid Container */}
            <View style={styles.categoriesGridRow}>
              {filteredCategories.map((cat) => (
                <View style={styles.categoryCard} key={cat.id}>
                  {/* Category Image Header Container */}
                  <View style={styles.categoryImageContainer}>
                    <Image source={cat.image} style={styles.categoryCardImage} resizeMode="contain" />
                    <View style={[styles.productCountPill, { backgroundColor: cat.badgeColor }]}>
                      <Text style={[styles.productCountPillText, { color: cat.textColor }]}>
                        {cat.count} {t.productsCountLabel}
                      </Text>
                    </View>
                  </View>

                  {/* Body Content */}
                  <View style={styles.categoryCardBody}>
                    <Text style={styles.categoryTitleText}>{isHindi ? cat.titleHi : cat.titleEn}</Text>
                    <Text style={styles.categoryDescText}>{isHindi ? cat.descHi : cat.descEn}</Text>

                    {/* View Products Action Button */}
                    <TouchableOpacity
                      style={styles.viewProductsBtn}
                      onPress={() => router.push('/web-all-products')}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.viewProductsBtnText}>{t.viewProductsBtn}</Text>
                      <Ionicons name="arrow-forward" size={14} color="#2E7D32" style={{ marginLeft: 4 }} />
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
  categoryFilterSearchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    width: 240,
  },
  categoryFilterSearchInput: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
  },

  /* Categories Grid Row */
  categoriesGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  categoryCard: {
    width: '31%',
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
  },
  categoryImageContainer: {
    height: 150,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 16,
  },
  categoryCardImage: {
    width: '100%',
    height: '100%',
  },
  productCountPill: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  productCountPillText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  categoryCardBody: {
    padding: 18,
    gap: 8,
  },
  categoryTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  categoryDescText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
  viewProductsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  viewProductsBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
});
