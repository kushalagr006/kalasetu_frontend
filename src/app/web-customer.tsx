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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';

interface CustomerProductItem {
  id: string;
  titleHi: string;
  titleEn: string;
  price: string;
  artisanHi: string;
  artisanEn: string;
  rating: string;
  reviewsCount: number;
  image: any;
}

const CUSTOMER_PRODUCTS_DATA: CustomerProductItem[] = [
  {
    id: '1',
    titleHi: 'हस्तनिर्मित मिट्टी का घड़ा (जैविक प्राकृतिक मटका)',
    titleEn: 'Handmade Clay Pot (Organic Natural Matka)',
    price: '₹450',
    artisanHi: 'सुनीता देवी (खुरई, मध्य प्रदेश)',
    artisanEn: 'Sunita Devi (Khurai, MP)',
    rating: '4.9',
    reviewsCount: 128,
    image: require('@/assets/images/product_pot.png'),
  },
  {
    id: '2',
    titleHi: 'पारंपरिक बांस की सुंदर टोकरी',
    titleEn: 'Traditional Beautiful Bamboo Basket',
    price: '₹300',
    artisanHi: 'रीना चौहान (रायपुर, छत्तीसगढ़)',
    artisanEn: 'Reena Chauhan (Raipur, CG)',
    rating: '4.8',
    reviewsCount: 95,
    image: require('@/assets/images/product_basket.png'),
  },
  {
    id: '3',
    titleHi: 'रंगबिरंगा एम्ब्रॉयडरी कपड़ा बैग',
    titleEn: 'Colorful Handmade Embroidery Tote Bag',
    price: '₹550',
    artisanHi: 'पूजा पटेल (इन्दौर, मध्य प्रदेश)',
    artisanEn: 'Pooja Patel (Indore, MP)',
    rating: '4.7',
    reviewsCount: 82,
    image: require('@/assets/images/product_bag.png'),
  },
  {
    id: '4',
    titleHi: 'पेंटेड मिट्टी का दीया सेट (12 पीस कांबो)',
    titleEn: 'Handpainted Clay Diya Set (12 Pcs Combo)',
    price: '₹200',
    artisanHi: 'सुनीता क्राफ्ट्स (मध्य प्रदेश)',
    artisanEn: 'Sunita Crafts (MP)',
    rating: '4.9',
    reviewsCount: 210,
    image: require('@/assets/images/product_diya.png'),
  },
  {
    id: '5',
    titleHi: 'हैंड-वोवन मैक्रामे वॉल हैंगिंग डेकोर',
    titleEn: 'Hand-Woven Macrame Wall Hanging Decor',
    price: '₹650',
    artisanHi: 'नेहा गुप्ता (जयपुर, राजस्थान)',
    artisanEn: 'Neha Gupta (Jaipur, RJ)',
    rating: '4.8',
    reviewsCount: 64,
    image: require('@/assets/images/product_macrame.png'),
  },
];

export default function WebCustomerPortalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 850;

  const [selectedLang, setSelectedLang] = useState<LangCode>((params.lang as LangCode) || 'hi');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);

  const isHindi = selectedLang === 'hi';

  const handleAddToCart = (productName: string) => {
    setCartCount(cartCount + 1);
    alert(
      isHindi
        ? `${productName} आपके कार्ट में जोड़ दिया गया है!`
        : `${productName} added to your cart!`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        {/* Marketplace Header */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeftGroup}>
            <Image
              source={require('@/assets/images/logo_icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Search Input Box */}
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#777777" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder={isHindi ? 'हस्तशिल्प, मिट्टी के बर्तन, बैग खोजें...' : 'Search crafts, pottery, bags...'}
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Header Right Actions */}
          <View style={styles.headerRightGroup}>
            <TouchableOpacity
              style={styles.langBtn}
              onPress={() => setSelectedLang(isHindi ? 'en' : 'hi')}
            >
              <Ionicons name="globe-outline" size={14} color="#3B6029" style={{ marginRight: 4 }} />
              <Text style={styles.langBtnText}>{isHindi ? 'English' : 'हिंदी'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="heart-outline" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cartBtn}>
              <Ionicons name="cart-outline" size={24} color="#3B6029" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userProfileBtn} onPress={() => router.push('/web-login')}>
              <Text style={styles.userProfileText}>{isHindi ? 'अमित शर्मा' : 'Amit Sharma'}</Text>
              <Ionicons name="chevron-down" size={14} color="#666666" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Filter Pills Bar */}
        <View style={styles.categoryBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            <TouchableOpacity style={[styles.categoryPill, styles.categoryPillActive]}>
              <Text style={styles.categoryPillTextActive}>{isHindi ? 'सभी उत्पाद' : 'All Products'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{isHindi ? '🏺 मिट्टी के बर्तन' : '🏺 Pottery'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{isHindi ? '🧺 बांस व जूट' : '🧺 Bamboo & Jute'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{isHindi ? '🛍️ हैंडमेड बैग' : '🛍️ Handmade Bags'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{isHindi ? '🪔 सजावटी दीये' : '🪔 Decorative Diyas'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{isHindi ? '🧶 मैक्रामे वॉल डेकोर' : '🧶 Macrame Decor'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Marketplace Banner */}
          <View style={styles.heroBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>
                {isHindi ? 'सीधे ग्रामीण कलाकारों से खरीदें 🎨' : 'Buy Directly from Rural Artisans 🎨'}
              </Text>
              <Text style={styles.bannerSubtitle}>
                {isHindi
                  ? '100% प्रामाणिक, हस्तनिर्मित और पर्यावरण के अनुकूल भारतीय हस्तशिल्प उत्पाद।'
                  : '100% authentic, handmade, and eco-friendly Indian handicraft products.'}
              </Text>
            </View>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>{isHindi ? 'उत्पाद खोजें' : 'Explore Crafts'}</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Products Grid */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>
              {isHindi ? 'लोकप्रिय भारतीय हस्तशिल्प' : 'Popular Indian Handicrafts'}
            </Text>
            <Text style={styles.viewAllText}>{isHindi ? 'सभी देखें →' : 'View All →'}</Text>
          </View>

          <View style={[styles.productsGrid, isDesktop ? styles.productsGridDesktop : styles.productsGridMobile]}>
            {CUSTOMER_PRODUCTS_DATA.map((product) => {
              const name = isHindi ? product.titleHi : product.titleEn;
              const artisan = isHindi ? product.artisanHi : product.artisanEn;

              return (
                <View key={product.id} style={styles.productCard}>
                  <Image source={product.image} style={styles.productImage} resizeMode="cover" />

                  <View style={styles.productBody}>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={14} color="#FF9500" style={{ marginRight: 4 }} />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                      <Text style={styles.reviewsCountText}>({product.reviewsCount})</Text>
                    </View>

                    <Text style={styles.productTitle} numberOfLines={2}>{name}</Text>
                    <Text style={styles.artisanName}>{isHindi ? 'कलाकार: ' : 'Artisan: '}{artisan}</Text>

                    <View style={styles.cardFooterRow}>
                      <Text style={styles.productPrice}>{product.price}</Text>

                      <TouchableOpacity
                        style={styles.addToCartBtn}
                        onPress={() => handleAddToCart(name)}
                        activeOpacity={0.85}
                      >
                        <Ionicons name="cart-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                        <Text style={styles.addToCartBtnText}>{isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
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
  /* Header Bar */
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E0D8',
    paddingVertical: 10,
    paddingHorizontal: 32,
    gap: 16,
  },
  headerLeftGroup: {},
  logoImage: {
    width: 140,
    height: 50,
  },
  searchBox: {
    flex: 1,
    maxWidth: 480,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F8F3',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C5D8C1',
  },
  langBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  iconBtn: {
    padding: 6,
  },
  cartBtn: {
    position: 'relative',
    padding: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#C65A28',
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  userProfileText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  /* Category Filter Pills Bar */
  categoryBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E0D8',
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  categoryScroll: {
    gap: 10,
  },
  categoryPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  categoryPillActive: {
    backgroundColor: '#3B6029',
    borderColor: '#3B6029',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
  },
  categoryPillTextActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  /* Scroll & Content */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F8F3',
    borderWidth: 1,
    borderColor: '#E2EFE0',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 16,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#555555',
  },
  bannerBtn: {
    backgroundColor: '#3B6029',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bannerBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  /* Products Grid */
  productsGrid: {
    gap: 16,
  },
  productsGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productsGridMobile: {
    flexDirection: 'column',
  },
  productCard: {
    width: Platform.OS === 'web' ? '31%' : '100%',
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 180,
  },
  productBody: {
    padding: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  reviewsCountText: {
    fontSize: 11,
    color: '#777777',
    marginLeft: 4,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 20,
  },
  artisanName: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 12,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B6029',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addToCartBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
