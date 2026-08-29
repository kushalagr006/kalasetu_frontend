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

const TRANSLATIONS_CUSTOMER = {
  hi: {
    searchPlaceholder: 'क्या खोज रहे हैं?',
    searchBtn: 'खोजें',
    wishlist: 'इच्छाएं',
    notifications: 'सूचनाएं',
    cart: 'कार्ट',
    userName: 'आदित्य सिंह',
    // Sidebar
    home: 'होम',
    allProducts: 'सभी उत्पाद',
    categories: 'श्रेणियाँ',
    findArtisans: 'कारीगर खोजें',
    newProducts: 'नए उत्पाद',
    trackOrder: 'ऑर्डर ट्रैक करें',
    myWishlist: 'मेरी इच्छाएं',
    myOrders: 'मेरे ऑर्डर',
    messages: 'संदेश',
    // Hero Banner
    heroTitle: 'भारत की कला,\nआपके घर तक',
    heroSubtitle: 'सीधे कारीगरों से, भरोसे के साथ',
    shopNowBtn: 'अभी खरीदें',
    // Popular Categories
    popularCategories: 'लोकप्रिय श्रेणियाँ',
    catBamboo: 'बाँस शिल्प',
    catClay: 'मिट्टी शिल्प',
    catTextile: 'हस्तनिर्मित वस्त्र',
    catWood: 'लकड़ी शिल्प',
    catMetal: 'धातु शिल्प',
    catJewel: 'आभूषण',
    catMore: 'और अधिक',
    // Special For You
    specialForYou: 'आपके लिए खास',
    tagNew: 'नया',
    tagPopular: 'लोकप्रिय',
    artisanPrefix: 'कारीगर:',
  },
  en: {
    searchPlaceholder: 'What are you looking for?',
    searchBtn: 'Search',
    wishlist: 'Wishlist',
    notifications: 'Notifications',
    cart: 'Cart',
    userName: 'Aditya Singh',
    // Sidebar
    home: 'Home',
    allProducts: 'All Products',
    categories: 'Categories',
    findArtisans: 'Find Artisans',
    newProducts: 'New Products',
    trackOrder: 'Track Order',
    myWishlist: 'My Wishlist',
    myOrders: 'My Orders',
    messages: 'Messages',
    // Hero Banner
    heroTitle: "India's Art,\nTo Your Home",
    heroSubtitle: 'Directly from artisans, with trust',
    shopNowBtn: 'Shop Now',
    // Popular Categories
    popularCategories: 'Popular Categories',
    catBamboo: 'Bamboo Craft',
    catClay: 'Clay Craft',
    catTextile: 'Textiles',
    catWood: 'Wood Craft',
    catMetal: 'Metal Craft',
    catJewel: 'Jewelry',
    catMore: 'More',
    // Special For You
    specialForYou: 'Special For You',
    tagNew: 'New',
    tagPopular: 'Popular',
    artisanPrefix: 'Artisan:',
  },
};

const PRODUCTS_DATA = [
  {
    id: '1',
    titleHi: 'बाँस की टोकरी',
    titleEn: 'Bamboo Basket',
    artisanHi: 'सीमा देवी',
    artisanEn: 'Seema Devi',
    price: '650',
    tag: 'new',
    image: require('@/assets/images/govt_item_basket.png'),
  },
  {
    id: '2',
    titleHi: 'मिट्टी का घड़ा सेट',
    titleEn: 'Clay Pot Set',
    artisanHi: 'रामकुमार साहू',
    artisanEn: 'Ramkumar Sahu',
    price: '1,250',
    image: require('@/assets/images/cust_prod_clay.png'),
  },
  {
    id: '3',
    titleHi: 'हस्तनिर्मित दुपट्टा',
    titleEn: 'Handmade Dupatta',
    artisanHi: 'मीना बाई',
    artisanEn: 'Meena Bai',
    price: '850',
    image: require('@/assets/images/cust_prod_dupatta.png'),
  },
  {
    id: '4',
    titleHi: 'लकड़ी की नक्काशीदार डिब्बी',
    titleEn: 'Carved Wooden Box',
    artisanHi: 'विनय लकड़ा',
    artisanEn: 'Vinay Lakra',
    price: '1,150',
    tag: 'popular',
    image: require('@/assets/images/cust_prod_woodbox.png'),
  },
];

export default function WebCustomerScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);

  const t = TRANSLATIONS_CUSTOMER[selectedLang as keyof typeof TRANSLATIONS_CUSTOMER];
  const isHindi = selectedLang === 'hi';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          {/* Brand Logo Header */}
          <View style={styles.brandRow}>
            <Image
              source={require('@/assets/images/logo_icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Search Bar Center */}
          <View style={styles.searchBarContainer}>
            <Ionicons name="search-outline" size={18} color="#777777" style={{ marginRight: 8 }} />
            <TextInput
              placeholder={t.searchPlaceholder}
              placeholderTextColor="#888888"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.searchSolidBtn} activeOpacity={0.8}>
              <Ionicons name="search-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.searchSolidBtnText}>{t.searchBtn}</Text>
            </TouchableOpacity>
          </View>

          {/* Right Header Actions */}
          <View style={styles.headerRightActions}>
            {/* Language Switcher */}
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

            {/* Wishlist */}
            <TouchableOpacity style={styles.headerActionBtn} onPress={() => router.push('/web-wishlist')}>
              <Ionicons name="heart-outline" size={20} color="#333333" />
              <Text style={styles.headerActionText}>{t.wishlist}</Text>
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity style={styles.headerActionBtn}>
              <View style={{ position: 'relative' }}>
                <Ionicons name="notifications-outline" size={20} color="#333333" />
                <View style={styles.headerBadgeCircle}>
                  <Text style={styles.headerBadgeText}>2</Text>
                </View>
              </View>
              <Text style={styles.headerActionText}>{t.notifications}</Text>
            </TouchableOpacity>

            {/* Cart */}
            <TouchableOpacity style={styles.headerActionBtn}>
              <View style={{ position: 'relative' }}>
                <Ionicons name="cart-outline" size={20} color="#333333" />
                <View style={styles.headerBadgeCircle}>
                  <Text style={styles.headerBadgeText}>1</Text>
                </View>
              </View>
              <Text style={styles.headerActionText}>{t.cart}</Text>
            </TouchableOpacity>

            {/* User Profile */}
            <TouchableOpacity
              style={styles.userProfileDropdownBtn}
              onPress={() => router.push('/web-customer-profile')}
            >
              <View style={styles.userAvatarCircle}>
                <Ionicons name="person" size={14} color="#2E7D32" />
              </View>
              <Text style={styles.userProfileNameText}>{t.userName}</Text>
              <Ionicons name="chevron-down" size={14} color="#666666" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main 2-Column Layout */}
        <View style={styles.mainLayoutRow}>
          {/* 1. Left Sidebar Navigation */}
          {isDesktop && (
            <View style={styles.sidebarCol}>
              <View style={styles.sidebarTopGroup}>
                <View style={styles.sidebarMenuGroup}>
                  {/* 1. होम (Active) */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 0 && styles.sidebarNavItemActive]}
                    onPress={() => setActiveSidebarIndex(0)}
                  >
                    <Ionicons name="home" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.home}</Text>
                  </TouchableOpacity>

                  {/* 2. सभी उत्पाद */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 1 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-all-products')}
                  >
                    <Ionicons name="cube-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.allProducts}</Text>
                  </TouchableOpacity>

                  {/* 3. श्रेणियाँ */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 2 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-categories')}
                  >
                    <Ionicons name="grid-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.categories}</Text>
                  </TouchableOpacity>

                  {/* 4. कारीगर खोजें */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 3 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-find-artisans')}
                  >
                    <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.findArtisans}</Text>
                  </TouchableOpacity>

                  {/* 5. ऑर्डर ट्रैक करें */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 4 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-track-order')}
                  >
                    <Ionicons name="bus-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.trackOrder}</Text>
                  </TouchableOpacity>

                  {/* 6. मेरी इच्छाएं */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 5 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-wishlist')}
                  >
                    <Ionicons name="heart-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myWishlist}</Text>
                  </TouchableOpacity>

                  {/* 8. मेरे ऑर्डर */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 7 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-track-order')}
                  >
                    <Ionicons name="bag-handle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myOrders}</Text>
                  </TouchableOpacity>

                  {/* 9. संदेश */}
                  <TouchableOpacity
                    style={[styles.sidebarNavItem, activeSidebarIndex === 8 && styles.sidebarNavItemActive]}
                    onPress={() => router.push('/web-customer-messages')}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.messages}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Sidebar Controls */}
              <View style={styles.sidebarBottomGroup}>
                {/* 10. प्रोफाइल */}
                <TouchableOpacity
                  style={styles.sidebarNavItem}
                  onPress={() => router.push('/web-customer-profile')}
                >
                  <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{isHindi ? 'प्रोफाइल' : 'Profile'}</Text>
                </TouchableOpacity>

                {/* 11. लॉगआउट */}
                <TouchableOpacity
                  style={styles.sidebarNavItem}
                  onPress={() => router.push('/web-login')}
                >
                  <Ionicons name="log-out-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{isHindi ? 'लॉगआउट' : 'Logout'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 2. Main Content Scrollable Col */}
          <ScrollView style={styles.contentCol} contentContainerStyle={styles.contentScrollContainer} showsVerticalScrollIndicator={false}>
            {/* A. Hero Banner Card */}
            <View style={styles.heroBannerCard}>
              <View style={styles.heroBannerLeft}>
                <Text style={styles.heroBannerTitleText}>{t.heroTitle}</Text>
                <Text style={styles.heroBannerSubtitleText}>{t.heroSubtitle}</Text>
                <TouchableOpacity style={styles.heroShopNowBtn} activeOpacity={0.8}>
                  <Text style={styles.heroShopNowBtnText}>{t.shopNowBtn}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.heroBannerRight}>
                <Image
                  source={require('@/assets/images/cust_hero_img.png')}
                  style={styles.heroImage}
                  resizeMode="contain"
                />
              </View>

              {/* Pagination Dots */}
              <View style={styles.heroPaginationRow}>
                <View style={[styles.heroDot, styles.heroDotActive]} />
                <View style={styles.heroDot} />
                <View style={styles.heroDot} />
                <View style={styles.heroDot} />
              </View>
            </View>

            {/* B. Popular Categories Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitleText}>{t.popularCategories}</Text>

              <View style={styles.categoriesRow}>
                {/* 1. Bamboo Craft */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <Image source={require('@/assets/images/cust_cat_bamboo.png')} style={styles.categoryCircleImage} />
                  <Text style={styles.categoryItemText}>{t.catBamboo}</Text>
                </TouchableOpacity>

                {/* 2. Clay Craft */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <Image source={require('@/assets/images/cust_cat_clay.png')} style={styles.categoryCircleImage} />
                  <Text style={styles.categoryItemText}>{t.catClay}</Text>
                </TouchableOpacity>

                {/* 3. Handmade Textiles */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <Image source={require('@/assets/images/cust_cat_textile.png')} style={styles.categoryCircleImage} />
                  <Text style={styles.categoryItemText}>{t.catTextile}</Text>
                </TouchableOpacity>

                {/* 4. Wood Craft */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <Image source={require('@/assets/images/cust_cat_wood.png')} style={styles.categoryCircleImage} />
                  <Text style={styles.categoryItemText}>{t.catWood}</Text>
                </TouchableOpacity>

                {/* 5. Metal Craft */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <Image source={require('@/assets/images/cust_cat_metal.png')} style={styles.categoryCircleImage} />
                  <Text style={styles.categoryItemText}>{t.catMetal}</Text>
                </TouchableOpacity>

                {/* 6. Jewelry */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <Image source={require('@/assets/images/cust_cat_jewel.png')} style={styles.categoryCircleImage} />
                  <Text style={styles.categoryItemText}>{t.catJewel}</Text>
                </TouchableOpacity>

                {/* 7. And More */}
                <TouchableOpacity style={styles.categoryItemColumn}>
                  <View style={styles.moreCategoryCircle}>
                    <Ionicons name="grid" size={20} color="#2E7D32" />
                  </View>
                  <Text style={styles.categoryItemText}>{t.catMore}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* C. Special For You Product Grid */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitleText}>{t.specialForYou}</Text>

              <View style={styles.productsGridRow}>
                {PRODUCTS_DATA.map((prod) => (
                  <View style={styles.productCard} key={prod.id}>
                    {/* Top Tag & Heart */}
                    <View style={styles.productCardHeader}>
                      {prod.tag === 'new' ? (
                        <View style={[styles.productTagPill, { backgroundColor: '#2E7D32' }]}>
                          <Text style={styles.productTagText}>{t.tagNew}</Text>
                        </View>
                      ) : prod.tag === 'popular' ? (
                        <View style={[styles.productTagPill, { backgroundColor: '#E65100' }]}>
                          <Text style={styles.productTagText}>{t.tagPopular}</Text>
                        </View>
                      ) : (
                        <View />
                      )}

                      <TouchableOpacity style={styles.wishlistHeartBtn}>
                        <Ionicons name="heart-outline" size={16} color="#444444" />
                      </TouchableOpacity>
                    </View>

                    {/* Product Image */}
                    <Image source={prod.image} style={styles.productImage} resizeMode="contain" />

                    {/* Product Title & Details */}
                    <View style={styles.productInfoArea}>
                      <Text style={styles.productTitleText}>{isHindi ? prod.titleHi : prod.titleEn}</Text>
                      <Text style={styles.productArtisanText}>
                        {t.artisanPrefix} {isHindi ? prod.artisanHi : prod.artisanEn}
                      </Text>

                      {/* Price & Add to Cart Action */}
                      <View style={styles.productFooterRow}>
                        <Text style={styles.productPriceText}>₹{prod.price}</Text>

                        <TouchableOpacity style={styles.addToCartOutlineBtn}>
                          <Ionicons name="cart-outline" size={16} color="#2E7D32" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
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
  brandRow: {
    marginRight: 16,
  },
  logoImage: {
    width: 170,
    height: 50,
  },
  searchBarContainer: {
    flex: 1,
    maxWidth: 500,
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
    gap: 18,
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
    backgroundColor: '#FAF8F5',
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

  /* Content Column */
  contentCol: {
    flex: 1,
  },
  contentScrollContainer: {
    padding: 20,
    gap: 20,
  },

  /* Hero Banner Card */
  heroBannerCard: {
    backgroundColor: '#FAF8F5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFECE6',
    paddingVertical: 24,
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    minHeight: 230,
    overflow: 'hidden',
  },
  heroBannerLeft: {
    flex: 1,
    paddingRight: 20,
    zIndex: 2,
  },
  heroBannerTitleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    lineHeight: 40,
    marginBottom: 8,
  },
  heroBannerSubtitleText: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 22,
  },
  heroShopNowBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  heroShopNowBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroBannerRight: {
    width: '50%',
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPaginationRow: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
  },
  heroDotActive: {
    backgroundColor: '#2E7D32',
    width: 10,
  },

  /* Section Card */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },

  /* Categories Row */
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 14,
  },
  categoryItemColumn: {
    alignItems: 'center',
    width: 80,
  },
  categoryCircleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  moreCategoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryItemText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },

  /* Products Grid */
  productsGridRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  productCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 12,
  },
  productCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    marginBottom: 8,
  },
  productTagPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  productTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  wishlistHeartBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  productImage: {
    width: '100%',
    height: 140,
    marginBottom: 10,
    borderRadius: 8,
  },
  productInfoArea: {
    gap: 4,
  },
  productTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  productArtisanText: {
    fontSize: 11,
    color: '#777777',
  },
  productFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  productPriceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addToCartOutlineBtn: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
