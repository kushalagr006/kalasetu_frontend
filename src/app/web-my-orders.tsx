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

const TRANSLATIONS_MY_ORDERS = {
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
    breadcrumb: 'होम > मेरे ऑर्डर',
    pageTitle: 'मेरे ऑर्डर (My Orders)',
    pageSubtitle: 'आपके द्वारा खरीदे गए ऑर्डर का इतिहास और स्थिति विवरण।',
    tabAll: 'सभी ऑर्डर (3)',
    tabInTransit: 'मार्ग में (1)',
    tabDelivered: 'डिलीवर (2)',
    trackOrderBtn: '🚚 ऑर्डर ट्रैक करें',
    chatArtisanBtn: '💬 कारीगर से बात करें',
    rateBtn: '⭐ रेटिंग दें',
    reorderBtn: 'पुनः ऑर्डर करें',
    downloadInvoiceBtn: 'इन्वॉइस',
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
    breadcrumb: 'Home > My Orders',
    pageTitle: 'My Orders',
    pageSubtitle: 'Your purchase order history and real-time delivery status.',
    tabAll: 'All Orders (3)',
    tabInTransit: 'In Transit (1)',
    tabDelivered: 'Delivered (2)',
    trackOrderBtn: '🚚 Track Order',
    chatArtisanBtn: '💬 Chat Artisan',
    rateBtn: '⭐ Rate Product',
    reorderBtn: 'Reorder',
    downloadInvoiceBtn: 'Invoice',
  },
};

const ORDERS_LIST = [
  {
    id: 'KS-98421',
    dateHi: '25 अगस्त 2026',
    dateEn: '25 Aug 2026',
    totalPrice: '650',
    statusHi: '🚚 मार्ग में है (In Transit)',
    statusEn: '🚚 In Transit',
    statusBg: '#E8F5E9',
    statusText: '#2E7D32',
    productTitleHi: 'बाँस की हस्तनिर्मित टोकरी',
    productTitleEn: 'Handcrafted Bamboo Basket',
    artisanHi: 'सीमा देवी (कांकेर, छत्तीसगढ़)',
    artisanEn: 'Seema Devi (Kanker, CG)',
    qty: 1,
    image: require('@/assets/images/govt_item_basket.png'),
    active: true,
  },
  {
    id: 'KS-87210',
    dateHi: '12 अगस्त 2026',
    dateEn: '12 Aug 2026',
    totalPrice: '1,250',
    statusHi: '✅ सफलतापूर्वक डिलीवर',
    statusEn: '✅ Delivered',
    statusBg: '#E8F5E9',
    statusText: '#2E7D32',
    productTitleHi: 'मिट्टी का घड़ा सेट (4 पीस)',
    productTitleEn: 'Terracotta Pots Set (4 Pcs)',
    artisanHi: 'रामकुमार साहू (कोंडागांव, छत्तीसगढ़)',
    artisanEn: 'Ramkumar Sahu (Kondagaon, CG)',
    qty: 1,
    image: require('@/assets/images/cust_prod_clay.png'),
    active: false,
  },
  {
    id: 'KS-76192',
    dateHi: '02 जुलाई 2026',
    dateEn: '02 Jul 2026',
    totalPrice: '1,850',
    statusHi: '✅ सफलतापूर्वक डिलीवर',
    statusEn: '✅ Delivered',
    statusBg: '#E8F5E9',
    statusText: '#2E7D32',
    productTitleHi: 'कोसा सिल्क हस्तनिर्मित दुपट्टा',
    productTitleEn: 'Handwoven Kosa Silk Dupatta',
    artisanHi: 'मीना बाई (चांपा, छत्तीसगढ़)',
    artisanEn: 'Meena Bai (Champa, CG)',
    qty: 1,
    image: require('@/assets/images/cust_prod_dupatta.png'),
    active: false,
  },
];

export default function WebMyOrdersScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [orderTab, setOrderTab] = useState('all');

  const t = TRANSLATIONS_MY_ORDERS[selectedLang as keyof typeof TRANSLATIONS_MY_ORDERS];
  const isHindi = selectedLang === 'hi';

  const filteredOrders = ORDERS_LIST.filter((o) => {
    if (orderTab === 'transit') return o.active;
    if (orderTab === 'delivered') return !o.active;
    return true;
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

                  {/* Active My Orders */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="bag-handle" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.myOrders}</Text>
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
                  <Text style={styles.breadcrumbText}> {'>'} {isHindi ? 'मेरे ऑर्डर' : 'My Orders'}</Text>
                </View>

                <Text style={styles.pageTitleText}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitleText}>{t.pageSubtitle}</Text>
              </View>
            </View>

            {/* Filter Tabs Bar */}
            <View style={styles.orderFilterTabsRow}>
              <TouchableOpacity
                style={[styles.orderTabBtn, orderTab === 'all' && styles.orderTabBtnActive]}
                onPress={() => setOrderTab('all')}
              >
                <Text style={[styles.orderTabText, orderTab === 'all' && styles.orderTabTextActive]}>{t.tabAll}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.orderTabBtn, orderTab === 'transit' && styles.orderTabBtnActive]}
                onPress={() => setOrderTab('transit')}
              >
                <Text style={[styles.orderTabText, orderTab === 'transit' && styles.orderTabTextActive]}>{t.tabInTransit}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.orderTabBtn, orderTab === 'delivered' && styles.orderTabBtnActive]}
                onPress={() => setOrderTab('delivered')}
              >
                <Text style={[styles.orderTabText, orderTab === 'delivered' && styles.orderTabTextActive]}>{t.tabDelivered}</Text>
              </TouchableOpacity>
            </View>

            {/* Orders List */}
            <View style={styles.ordersListContainer}>
              {filteredOrders.map((order) => (
                <View style={styles.orderCard} key={order.id}>
                  {/* Order Card Top Header */}
                  <View style={styles.orderCardHeader}>
                    <View>
                      <Text style={styles.orderIdText}>ऑर्डर #{order.id}</Text>
                      <Text style={styles.orderDateText}>📅 {isHindi ? order.dateHi : order.dateEn}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end', gap: 4 }}>
                      <View style={[styles.statusPillBadge, { backgroundColor: order.statusBg }]}>
                        <Text style={[styles.statusPillBadgeText, { color: order.statusText }]}>
                          {isHindi ? order.statusHi : order.statusEn}
                        </Text>
                      </View>
                      <Text style={styles.orderPriceText}>कुल: ₹{order.totalPrice}</Text>
                    </View>
                  </View>

                  {/* Order Product Details Row */}
                  <View style={styles.orderProductRow}>
                    <Image source={order.image} style={styles.orderProductImage} resizeMode="contain" />

                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.productTitleText}>{isHindi ? order.productTitleHi : order.productTitleEn}</Text>
                      <Text style={styles.artisanNameText}>👤 {isHindi ? order.artisanHi : order.artisanEn}</Text>
                      <Text style={styles.qtyText}>मात्रा / Qty: {order.qty}</Text>
                    </View>
                  </View>

                  {/* Order Actions Footer Row */}
                  <View style={styles.orderActionsRow}>
                    {order.active ? (
                      <>
                        <TouchableOpacity
                          style={styles.trackOrderSolidBtn}
                          onPress={() => router.push('/web-track-order')}
                        >
                          <Text style={styles.trackOrderSolidBtnText}>{t.trackOrderBtn}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.chatArtisanOutlineBtn}
                          onPress={() => router.push('/web-customer-messages')}
                        >
                          <Text style={styles.chatArtisanOutlineBtnText}>{t.chatArtisanBtn}</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity style={styles.rateOutlineBtn}>
                          <Text style={styles.rateOutlineBtnText}>{t.rateBtn}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.reorderOutlineBtn}>
                          <Text style={styles.reorderOutlineBtnText}>{t.reorderBtn}</Text>
                        </TouchableOpacity>
                      </>
                    )}

                    <TouchableOpacity style={styles.invoiceBtn}>
                      <Ionicons name="document-text-outline" size={14} color="#555555" style={{ marginRight: 4 }} />
                      <Text style={styles.invoiceBtnText}>{t.downloadInvoiceBtn}</Text>
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
    marginBottom: 4,
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

  /* Filter Tabs */
  orderFilterTabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  orderTabBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  orderTabBtnActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  orderTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
  },
  orderTabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* Orders List */
  ordersListContainer: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 18,
    gap: 14,
  },
  orderCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  orderDateText: {
    fontSize: 12,
    color: '#777777',
  },
  statusPillBadge: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  statusPillBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  orderPriceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  orderProductRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  orderProductImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  productTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  artisanNameText: {
    fontSize: 12,
    color: '#555555',
  },
  qtyText: {
    fontSize: 11,
    color: '#888888',
  },

  /* Order Actions Footer */
  orderActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  trackOrderSolidBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  trackOrderSolidBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatArtisanOutlineBtn: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  chatArtisanOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  rateOutlineBtn: {
    borderWidth: 1,
    borderColor: '#E65100',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  rateOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E65100',
  },
  reorderOutlineBtn: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  reorderOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  invoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  invoiceBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },
});
