import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';
type ProductStatus = 'active' | 'inactive' | 'draft';

interface ProductItem {
  id: string;
  nameHi: string;
  nameEn: string;
  price: string;
  stock: number;
  status: ProductStatus;
  image: any;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: '1',
    nameHi: 'मिट्टी का घड़ा',
    nameEn: 'Clay Pot',
    price: '₹450',
    stock: 15,
    status: 'active',
    image: require('@/assets/images/product_pot.png'),
  },
  {
    id: '2',
    nameHi: 'बांस की टोकरी',
    nameEn: 'Bamboo Basket',
    price: '₹300',
    stock: 20,
    status: 'active',
    image: require('@/assets/images/product_basket.png'),
  },
  {
    id: '3',
    nameHi: 'हैंडमेड कपड़ा बैग',
    nameEn: 'Handmade Cloth Bag',
    price: '₹550',
    stock: 10,
    status: 'active',
    image: require('@/assets/images/product_bag.png'),
  },
  {
    id: '4',
    nameHi: 'मिट्टी का दिया (सेट)',
    nameEn: 'Clay Diya Set',
    price: '₹200',
    stock: 30,
    status: 'inactive',
    image: require('@/assets/images/product_diya.png'),
  },
  {
    id: '5',
    nameHi: 'मैक्रामे वॉल हैंगिंग',
    nameEn: 'Macrame Wall Hanging',
    price: '₹650',
    stock: 5,
    status: 'draft',
    image: require('@/assets/images/product_macrame.png'),
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();

  const selectedLang: LangCode = (params.lang as LangCode) || 'hi';
  const isHindi = selectedLang === 'hi';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const name = isHindi ? p.nameHi : p.nameEn;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'active':
        return {
          label: isHindi ? 'सक्रिय' : 'Active',
          bg: '#F0F7ED',
          text: '#3B6029',
        };
      case 'inactive':
        return {
          label: isHindi ? 'निष्क्रिय' : 'Inactive',
          bg: '#FFF0E6',
          text: '#E65100',
        };
      case 'draft':
        return {
          label: isHindi ? 'ड्राफ़्ट' : 'Draft',
          bg: '#E3F2FD',
          text: '#1976D2',
        };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Row: Title, Subtitle, Notification Bell */}
          <View style={styles.headerRow}>
            <View style={styles.headerTextGroup}>
              <Text style={styles.headerTitle}>
                {isHindi ? 'उत्पाद' : 'Products'}
              </Text>
              <Text style={styles.headerSubtitle}>
                {isHindi
                  ? 'अपने सभी उत्पाद देखें और प्रबंधन करें'
                  : 'View and manage all your products'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => router.push({ pathname: '/notifications', params: { lang: selectedLang } })}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={26} color="#1A1A1A" />
              <View style={styles.redBadgeDot} />
            </TouchableOpacity>
          </View>

          {/* Search Bar & Add Product Button Row */}
          <View style={styles.searchActionRow}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#777777" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder={isHindi ? 'उत्पाद खोजें...' : 'Search products...'}
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <TouchableOpacity
              style={styles.addProductBtn}
              onPress={() => alert(isHindi ? 'नया उत्पाद जोड़ने का फॉर्म...' : 'Add Product Form...')}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.addProductBtnText}>
                {isHindi ? 'नया उत्पाद जोड़ें' : 'Add Product'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Products List Cards */}
          <View style={styles.productListContainer}>
            {filteredProducts.map((product) => {
              const badge = getStatusBadge(product.status);
              return (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => alert(`${isHindi ? product.nameHi : product.nameEn} Details`)}
                  activeOpacity={0.85}
                >
                  <Image source={product.image} style={styles.productThumbnail} resizeMode="cover" />

                  <View style={styles.productInfoGroup}>
                    <Text style={styles.productTitle}>
                      {isHindi ? product.nameHi : product.nameEn}
                    </Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.productStock}>
                      {isHindi ? 'स्टॉक: ' : 'Stock: '}{product.stock}
                    </Text>
                  </View>

                  <View style={styles.productRightGroup}>
                    <View style={[styles.statusBadgePill, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#999999" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom "Add More Products" Card Banner */}
          <View style={styles.addMoreBanner}>
            <Image
              source={require('@/assets/images/shg_women.png')}
              style={styles.bannerAvatar}
              resizeMode="contain"
            />

            <View style={styles.bannerTextGroup}>
              <Text style={styles.bannerTitle}>
                {isHindi ? 'अधिक उत्पाद जोड़ें' : 'Add More Products'}
              </Text>
              <Text style={styles.bannerSubtitle}>
                {isHindi
                  ? 'ज्यादा उत्पाद जोड़ने से आपके ऑर्डर बढ़ने की संभावना बढ़ती है।'
                  : 'Adding more products increases your chance of getting orders.'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.bannerAddBtn}
              onPress={() => alert(isHindi ? 'नया उत्पाद जोड़ने का फॉर्म...' : 'Add product form...')}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.bannerAddBtnText}>
                {isHindi ? 'नया उत्पाद जोड़ें' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Village Line Art Background Overlay */}
          <View style={styles.sketchWrapper}>
            <Image
              source={require('@/assets/images/village_sketch.png')}
              style={styles.sketchImage}
              resizeMode="contain"
            />
          </View>
        </ScrollView>

        {/* Floating Action Chat Button */}
        <TouchableOpacity
          style={styles.floatingChatButton}
          onPress={() => alert(isHindi ? 'सहायता चैट / Help Chat' : 'Help Chat')}
          activeOpacity={0.85}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Bottom Navigation Bar (4 Tabs) */}
        <View style={styles.bottomNavContainer}>
          {/* Tab 1: Home */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => router.push({ pathname: '/home', params: { lang: selectedLang } })}
            activeOpacity={0.7}
          >
            <Ionicons name="home-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{isHindi ? 'होम' : 'Home'}</Text>
          </TouchableOpacity>

          {/* Tab 2: Products (Active) */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <Ionicons name="cube" size={22} color="#3B6029" />
            <Text style={[styles.navTabText, styles.navTabTextActive]}>
              {isHindi ? 'उत्पाद' : 'Products'}
            </Text>
          </TouchableOpacity>

          {/* Tab 3: Customers */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => router.push({ pathname: '/customers', params: { lang: selectedLang } })}
            activeOpacity={0.7}
          >
            <Ionicons name="people-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{isHindi ? 'ग्राहक' : 'Customers'}</Text>
          </TouchableOpacity>

          {/* Tab 4: Profile */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => router.push({ pathname: '/profile', params: { lang: selectedLang } })}
            activeOpacity={0.7}
          >
            <Ionicons name="person-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{isHindi ? 'प्रोफाइल' : 'Profile'}</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  /* Header Row */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? 8 : 12) : 8,
    paddingBottom: 14,
  },
  headerTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEA',
    elevation: 1,
  },
  redBadgeDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  /* Search & Add Action Row */
  searchActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  addProductBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B6029',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
  },
  addProductBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  /* Products List Cards */
  productListContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0EFEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  productThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 14,
  },
  productInfoGroup: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B6029',
    marginBottom: 2,
  },
  productStock: {
    fontSize: 12,
    color: '#666666',
  },
  productRightGroup: {
    alignItems: 'flex-end',
  },
  statusBadgePill: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  /* Add More Banner */
  addMoreBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F8F3',
    borderWidth: 1,
    borderColor: '#E2EFE0',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  bannerAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  bannerTextGroup: {
    flex: 1,
    paddingRight: 6,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#555555',
    lineHeight: 16,
  },
  bannerAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B6029',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bannerAddBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  /* Sketch Overlay */
  sketchWrapper: {
    width: '100%',
    height: 100,
    marginTop: 4,
    overflow: 'hidden',
  },
  sketchImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  /* Floating Chat FAB */
  floatingChatButton: {
    position: 'absolute',
    right: 20,
    bottom: 84,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B6029',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#3B6029',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    zIndex: 99,
  },
  /* Bottom Navigation Bar */
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 64,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0EFEA',
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navTabText: {
    fontSize: 11,
    color: '#666666',
    marginTop: 3,
    fontWeight: '500',
  },
  navTabTextActive: {
    color: '#3B6029',
    fontWeight: 'bold',
  },
});
