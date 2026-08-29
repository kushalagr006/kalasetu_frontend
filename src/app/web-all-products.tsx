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

const TRANSLATIONS_ALL_PRODUCTS = {
  hi: {
    breadcrumb: 'होम > सभी उत्पाद',
    title: 'सभी उत्पाद',
    showingCount: '36 में से 1-12 उत्पाद दिखाए जा रहे हैं',
    sortBy: 'क्रमबद्ध करें: सबसे नए पहले',
    filtersTitle: 'फ़िल्टर',
    categoriesGroup: 'श्रेणियाँ',
    allCategories: 'सभी श्रेणियाँ',
    bambooCraft: 'बाँस शिल्प (8)',
    clayCraft: 'मिट्टी शिल्प (6)',
    textiles: 'कपड़े और वस्त्र (7)',
    woodCraft: 'लकड़ी शिल्प (5)',
    metalCraft: 'धातु शिल्प (4)',
    jewelry: 'आभूषण (6)',
    priceRange: 'मूल्य सीमा',
    minPrice: '₹ न्यूनतम',
    maxPrice: '₹ अधिकतम',
    artisanLocation: 'कारीगर का स्थान',
    allLocations: 'सभी स्थान',
    ratingTitle: 'रेटिंग',
    andAbove: '& अधिक',
    clearAllBtn: 'सभी हटाएं',
    applyFiltersBtn: 'फ़िल्टर लागू करें',
    tagNew: 'नया',
    addToCartBtn: 'कार्ट में जोड़ें',
    nextBtn: 'अगला >',
  },
  en: {
    breadcrumb: 'Home > All Products',
    title: 'All Products',
    showingCount: 'Showing 1–12 of 36 products',
    sortBy: 'Sort by: Newest First',
    filtersTitle: 'Filters',
    categoriesGroup: 'Categories',
    allCategories: 'All Categories',
    bambooCraft: 'Bamboo Craft (8)',
    clayCraft: 'Clay Craft (6)',
    textiles: 'Textiles (7)',
    woodCraft: 'Wood Craft (5)',
    metalCraft: 'Metal Craft (4)',
    jewelry: 'Jewelry (6)',
    priceRange: 'Price Range',
    minPrice: '₹ Min',
    maxPrice: '₹ Max',
    artisanLocation: 'Artisan Location',
    allLocations: 'All Locations',
    ratingTitle: 'Rating',
    andAbove: '& above',
    clearAllBtn: 'Clear All',
    applyFiltersBtn: 'Apply Filters',
    tagNew: 'New',
    addToCartBtn: 'Add to Cart',
    nextBtn: 'Next >',
  },
};

const ALL_PRODUCTS_LIST = [
  {
    id: '1',
    titleHi: 'बाँस की टोकरी',
    titleEn: 'Bamboo Basket',
    categoryHi: 'बाँस शिल्प',
    categoryEn: 'Bamboo Craft',
    price: '650',
    rating: '4.6',
    reviewsCount: '28',
    tag: 'new',
    image: require('@/assets/images/govt_item_basket.png'),
  },
  {
    id: '2',
    titleHi: 'मिट्टी का घड़ा सेट',
    titleEn: 'Terracotta Pots Set',
    categoryHi: 'मिट्टी शिल्प',
    categoryEn: 'Clay Craft',
    price: '1,250',
    rating: '4.8',
    reviewsCount: '16',
    tag: 'new',
    image: require('@/assets/images/cust_prod_clay.png'),
  },
  {
    id: '3',
    titleHi: 'हस्तनिर्मित साड़ी',
    titleEn: 'Handwoven Saree',
    categoryHi: 'वस्त्र',
    categoryEn: 'Textiles',
    price: '1,850',
    rating: '4.7',
    reviewsCount: '14',
    image: require('@/assets/images/cust_prod_dupatta.png'),
  },
  {
    id: '4',
    titleHi: 'लकड़ी की नक्काशीदार डिब्बी',
    titleEn: 'Wooden Storage Box',
    categoryHi: 'लकड़ी शिल्प',
    categoryEn: 'Wood Craft',
    price: '1,150',
    rating: '4.9',
    reviewsCount: '10',
    image: require('@/assets/images/cust_prod_woodbox.png'),
  },
  {
    id: '5',
    titleHi: 'पीतल का दिया/दीपक',
    titleEn: 'Brass Lamp',
    categoryHi: 'धातु शिल्प',
    categoryEn: 'Metal Craft',
    price: '1,350',
    rating: '4.8',
    reviewsCount: '12',
    image: require('@/assets/images/cust_prod_lamp.png'),
  },
  {
    id: '6',
    titleHi: 'चित्रित मिट्टी का मटका',
    titleEn: 'Hand Painted Pot',
    categoryHi: 'मिट्टी शिल्प',
    categoryEn: 'Clay Craft',
    price: '850',
    rating: '4.6',
    reviewsCount: '8',
    image: require('@/assets/images/cust_prod_painted_pot.png'),
  },
  {
    id: '7',
    titleHi: 'जूट का हैंडबैग',
    titleEn: 'Jute Handbag',
    categoryHi: 'वस्त्र',
    categoryEn: 'Textiles',
    price: '750',
    rating: '4.7',
    reviewsCount: '9',
    image: require('@/assets/images/cust_prod_handbag.png'),
  },
  {
    id: '8',
    titleHi: 'मोतियों का हार',
    titleEn: 'Beaded Necklace',
    categoryHi: 'आभूषण',
    categoryEn: 'Jewelry',
    price: '950',
    rating: '4.5',
    reviewsCount: '11',
    image: require('@/assets/images/cust_prod_necklace.png'),
  },
];

export default function WebAllProductsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const t = TRANSLATIONS_ALL_PRODUCTS[selectedLang as keyof typeof TRANSLATIONS_ALL_PRODUCTS];
  const isHindi = selectedLang === 'hi';

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
          </View>
        </View>

        {/* Main 2-Column Layout */}
        <View style={styles.mainLayoutRow}>
          {/* Left Customer Navigation Sidebar */}
          {isDesktop && (
            <View style={styles.sidebarCol}>
              <View style={styles.sidebarTopGroup}>
                <View style={styles.sidebarMenuGroup}>
                  {/* 1. होम */}
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-customer')}
                  >
                    <Ionicons name="home-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'होम' : 'Home'}</Text>
                  </TouchableOpacity>

                  {/* 2. सभी उत्पाद (Active) */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="cube" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{isHindi ? 'सभी उत्पाद' : 'All Products'}</Text>
                  </TouchableOpacity>

                  {/* 3. श्रेणियाँ */}
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-categories')}>
                    <Ionicons name="grid-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'श्रेणियाँ' : 'Categories'}</Text>
                  </TouchableOpacity>

                  {/* 4. कारीगर खोजें */}
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-find-artisans')}>
                    <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'कारीगर खोजें' : 'Find Artisans'}</Text>
                  </TouchableOpacity>

                  {/* 5. ऑर्डर ट्रैक करें */}
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-track-order')}>
                    <Ionicons name="bus-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'ऑर्डर ट्रैक करें' : 'Track Order'}</Text>
                  </TouchableOpacity>

                  {/* 7. मेरी इच्छाएं */}
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-wishlist')}>
                    <Ionicons name="heart-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'मेरी इच्छाएं' : 'My Wishlist'}</Text>
                  </TouchableOpacity>

                  {/* 8. मेरे ऑर्डर */}
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-my-orders')}>
                    <Ionicons name="bag-handle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'मेरे ऑर्डर' : 'My Orders'}</Text>
                  </TouchableOpacity>

                  {/* 9. संदेश */}
                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-customer-messages')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{isHindi ? 'संदेश' : 'Messages'}</Text>
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

          {/* Scroll Body */}
          <ScrollView style={styles.mainScrollView} contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
            {/* Breadcrumb & Header Title Bar */}
            <View style={styles.breadcrumbHeaderRow}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <TouchableOpacity onPress={() => router.push('/web-customer')} activeOpacity={0.7}>
                    <Text style={[styles.breadcrumbText, { color: '#2E7D32', fontWeight: 'bold' }]}>
                      {isHindi ? 'होम' : 'Home'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.breadcrumbText}> {'>'} {isHindi ? 'सभी उत्पाद' : 'All Products'}</Text>
                </View>
                <Text style={styles.pageTitle}>{t.title}</Text>
                <Text style={styles.showingCountText}>{t.showingCount}</Text>
              </View>

              {/* Sort Dropdown */}
              <TouchableOpacity style={styles.sortByDropdownBtn}>
                <Text style={styles.sortByDropdownText}>{t.sortBy}</Text>
                <Ionicons name="chevron-down" size={14} color="#555555" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>

          {/* 2-Column Split Layout */}
          <View style={styles.splitLayoutRow}>
            {/* 1. Left Sidebar Filter Panel (Width ~ 240px) */}
            {isDesktop && (
              <View style={styles.filterSidebarCol}>
                <Text style={styles.filterSidebarTitle}>{t.filtersTitle}</Text>

                {/* Price Range */}
                <View style={styles.filterSectionBox}>
                  <Text style={styles.filterSectionLabel}>{t.priceRange}</Text>
                  <View style={styles.priceInputsRow}>
                    <TextInput placeholder={t.minPrice} placeholderTextColor="#999999" style={styles.priceInput} />
                    <TextInput placeholder={t.maxPrice} placeholderTextColor="#999999" style={styles.priceInput} />
                  </View>
                </View>

                {/* Artisan Location */}
                <View style={styles.filterSectionBox}>
                  <Text style={styles.filterSectionLabel}>{t.artisanLocation}</Text>
                  <TouchableOpacity style={styles.locationDropdownBtn}>
                    <Text style={styles.locationDropdownText}>{t.allLocations}</Text>
                    <Ionicons name="chevron-down" size={14} color="#777777" />
                  </TouchableOpacity>
                </View>

                {/* Rating Filter */}
                <View style={styles.filterSectionBox}>
                  <Text style={styles.filterSectionLabel}>{t.ratingTitle}</Text>
                  <View style={styles.checkboxListGroup}>
                    {[5, 4, 3, 2].map((stars) => (
                      <TouchableOpacity
                        key={stars}
                        style={styles.checkboxRow}
                        onPress={() => setSelectedRating(selectedRating === stars ? null : stars)}
                      >
                        <Ionicons
                          name={selectedRating === stars ? 'checkbox' : 'square-outline'}
                          size={18}
                          color={selectedRating === stars ? '#2E7D32' : '#888888'}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          {[...Array(5)].map((_, idx) => (
                            <Ionicons
                              key={idx}
                              name={idx < stars ? 'star' : 'star-outline'}
                              size={14}
                              color="#FFA000"
                            />
                          ))}
                          {stars < 5 && <Text style={styles.ratingAndAboveText}> {t.andAbove}</Text>}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Filter Actions Buttons */}
                <View style={styles.filterActionButtonsRow}>
                  <TouchableOpacity style={styles.clearAllOutlineBtn}>
                    <Text style={styles.clearAllOutlineBtnText}>{t.clearAllBtn}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.applyFiltersSolidBtn}>
                    <Text style={styles.applyFiltersSolidBtnText}>{t.applyFiltersBtn}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* 2. Main Product Grid Area */}
            <View style={styles.productsGridCol}>
              <View style={styles.productsGridRow}>
                {ALL_PRODUCTS_LIST.map((prod) => (
                  <View style={styles.productCard} key={prod.id}>
                    {/* Header Tag & Wishlist */}
                    <View style={styles.productCardHeader}>
                      {prod.tag === 'new' ? (
                        <View style={styles.productTagPill}>
                          <Text style={styles.productTagText}>{t.tagNew}</Text>
                        </View>
                      ) : (
                        <View />
                      )}

                      <TouchableOpacity style={styles.wishlistHeartBtn}>
                        <Ionicons name="heart-outline" size={16} color="#444444" />
                      </TouchableOpacity>
                    </View>

                    {/* Image */}
                    <Image source={prod.image} style={styles.productImage} resizeMode="contain" />

                    {/* Details */}
                    <View style={styles.productInfoArea}>
                      <Text style={styles.productTitleText}>{isHindi ? prod.titleHi : prod.titleEn}</Text>
                      <Text style={styles.productCategoryText}>{isHindi ? prod.categoryHi : prod.categoryEn}</Text>
                      <Text style={styles.productPriceText}>₹{prod.price}</Text>

                      {/* Rating & Add to Cart Action */}
                      <View style={styles.productFooterRow}>
                        <View style={styles.ratingBadgeRow}>
                          <Ionicons name="star" size={13} color="#FFA000" style={{ marginRight: 3 }} />
                          <Text style={styles.ratingScoreText}>{prod.rating}</Text>
                          <Text style={styles.ratingCountText}>({prod.reviewsCount})</Text>
                        </View>

                        <TouchableOpacity style={styles.addToCartOutlineBtn}>
                          <Ionicons name="cart-outline" size={14} color="#2E7D32" style={{ marginRight: 4 }} />
                          <Text style={styles.addToCartBtnText}>{t.addToCartBtn}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Bottom Pagination Row */}
              <View style={styles.paginationRow}>
                <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}>
                  <Text style={styles.pageBtnTextActive}>1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pageBtn}>
                  <Text style={styles.pageBtnText}>2</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pageBtn}>
                  <Text style={styles.pageBtnText}>3</Text>
                </TouchableOpacity>

                <Text style={styles.dotsPaginationText}>...</Text>

                <TouchableOpacity style={styles.nextPageBtn}>
                  <Text style={styles.nextPageBtnText}>{t.nextBtn}</Text>
                </TouchableOpacity>
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

  /* Breadcrumb & Header */
  breadcrumbHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  breadcrumbText: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  showingCountText: {
    fontSize: 12,
    color: '#666666',
  },
  sortByDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  sortByDropdownText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },

  /* 2-Column Split Layout */
  splitLayoutRow: {
    flexDirection: 'row',
    gap: 20,
  },

  /* 1. Left Filter Sidebar */
  filterSidebarCol: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 16,
    gap: 16,
  },
  filterSidebarTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  filterSectionBox: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    gap: 8,
  },
  filterSectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterSectionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  checkboxListGroup: {
    gap: 8,
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabelText: {
    fontSize: 12,
    color: '#444444',
    marginLeft: 8,
  },
  ratingAndAboveText: {
    fontSize: 11,
    color: '#777777',
  },
  priceInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    width: '100%',
  },
  priceInput: {
    flex: 1,
    minWidth: 0,
    width: 0,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 34,
    fontSize: 12,
    color: '#333333',
  },
  locationDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 34,
    marginTop: 4,
  },
  locationDropdownText: {
    fontSize: 12,
    color: '#444444',
  },
  filterActionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  clearAllOutlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  clearAllOutlineBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },
  applyFiltersSolidBtn: {
    flex: 1.2,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  applyFiltersSolidBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* 2. Main Product Grid Area */
  productsGridCol: {
    flex: 1,
    gap: 24,
  },
  productsGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: '23%',
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
    marginBottom: 6,
  },
  productTagPill: {
    backgroundColor: '#2E7D32',
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
    borderRadius: 8,
    marginBottom: 8,
  },
  productInfoArea: {
    gap: 3,
  },
  productTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  productCategoryText: {
    fontSize: 11,
    color: '#888888',
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 2,
  },
  productFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
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
  addToCartOutlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  addToCartBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  /* Pagination Bar */
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  pageBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
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
  dotsPaginationText: {
    fontSize: 14,
    color: '#888888',
    marginHorizontal: 4,
  },
  nextPageBtn: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  nextPageBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
  },
});
