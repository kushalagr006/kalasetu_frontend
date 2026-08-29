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

const TRANSLATIONS_TRACK_ORDER = {
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
    breadcrumb: 'होम > ऑर्डर ट्रैक करें',
    pageTitle: 'ऑर्डर ट्रैकिंग',
    pageSubtitle: 'अपने ऑर्डर की रीयल-टाइम स्थिति जांचने के लिए ऑर्डर आईडी दर्ज करें।',
    inputPlaceholder: 'ऑर्डर आईडी या AWB नंबर दर्ज करें (उदा. #KS-98421)...',
    trackBtn: 'ट्रैक करें',
    activeOrderTitle: 'ऑर्डर विवरण #KS-98421',
    orderDateLabel: 'ऑर्डर तिथि: 25 अगस्त 2026',
    estimatedDeliveryLabel: 'अनुमानित डिलीवरी: 30 अगस्त 2026 (कल)',
    courierPartnerLabel: 'कूरियर पार्टनर: स्पीड पोस्ट / इंडिया पोस्ट (AWB: IP984210042IN)',
    step1Title: 'ऑर्डर कन्फर्म हुआ',
    step1Date: '25 अगस्त, 10:30 AM',
    step2Title: 'कारीगर द्वारा पैक किया गया',
    step2Sub: 'सीमा देवी (कांकेर)',
    step2Date: '26 अगस्त, 02:15 PM',
    step3Title: 'मार्ग में है (In Transit)',
    step3Sub: 'रायपुर हब से प्रस्थान',
    step3Date: '28 अगस्त, 09:00 AM',
    step4Title: 'डिलीवरी के लिए निकला',
    step4Date: '30 अगस्त (संभावित)',
    orderItemsTitle: 'ऑर्डर में शामिल उत्पाद',
    itemTitle: 'बाँस की हस्तनिर्मित टोकरी',
    itemCraft: 'बाँस शिल्प • कारीगर: सीमा देवी (कांकेर, छत्तीसगढ़)',
    itemPrice: '₹650 (मात्रा: 1)',
    helpSupportBtn: 'सहयोग या सवाल? ग्राहक सेवा से बात करें',
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
    breadcrumb: 'Home > Track Order',
    pageTitle: 'Track Your Order',
    pageSubtitle: 'Enter your Order ID or AWB Tracking Number to check live delivery status.',
    inputPlaceholder: 'Enter Order ID or AWB Number (e.g. #KS-98421)...',
    trackBtn: 'Track Order',
    activeOrderTitle: 'Order Details #KS-98421',
    orderDateLabel: 'Ordered Date: 25 Aug 2026',
    estimatedDeliveryLabel: 'Est. Delivery: 30 Aug 2026 (Tomorrow)',
    courierPartnerLabel: 'Courier Partner: Speed Post / India Post (AWB: IP984210042IN)',
    step1Title: 'Order Confirmed',
    step1Date: '25 Aug, 10:30 AM',
    step2Title: 'Packed by Artisan',
    step2Sub: 'Seema Devi (Kanker)',
    step2Date: '26 Aug, 02:15 PM',
    step3Title: 'In Transit',
    step3Sub: 'Dispatched from Raipur Hub',
    step3Date: '28 Aug, 09:00 AM',
    step4Title: 'Out for Delivery',
    step4Date: '30 Aug (Expected)',
    orderItemsTitle: 'Items in this Order',
    itemTitle: 'Handcrafted Bamboo Basket',
    itemCraft: 'Bamboo Craft • Artisan: Seema Devi (Kanker, CG)',
    itemPrice: '₹650 (Qty: 1)',
    helpSupportBtn: 'Need help? Contact Customer Support',
  },
};

export default function WebTrackOrderScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [orderInputVal, setOrderInputVal] = useState('#KS-98421');

  const t = TRANSLATIONS_TRACK_ORDER[selectedLang as keyof typeof TRANSLATIONS_TRACK_ORDER];
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

                  {/* Active Track Order */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="bus" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.trackOrder}</Text>
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
                  <Text style={styles.breadcrumbText}> {'>'} {isHindi ? 'ऑर्डर ट्रैक करें' : 'Track Order'}</Text>
                </View>

                <Text style={styles.pageTitleText}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitleText}>{t.pageSubtitle}</Text>
              </View>
            </View>

            {/* 1. Track Order Input Card */}
            <View style={styles.sectionCard}>
              <View style={styles.trackInputFormRow}>
                <View style={styles.trackInputWrapper}>
                  <Ionicons name="barcode-outline" size={18} color="#777777" style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder={t.inputPlaceholder}
                    placeholderTextColor="#888888"
                    value={orderInputVal}
                    onChangeText={setOrderInputVal}
                    style={styles.trackInputFlex}
                  />
                </View>

                <TouchableOpacity style={styles.trackOrderBtn} activeOpacity={0.8}>
                  <Ionicons name="bus-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.trackOrderBtnText}>{t.trackBtn}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 2. Live Order Tracking Status Card */}
            <View style={styles.sectionCard}>
              {/* Order Meta Header */}
              <View style={styles.activeOrderHeaderRow}>
                <View>
                  <Text style={styles.activeOrderTitleText}>{t.activeOrderTitle}</Text>
                  <Text style={styles.activeOrderSubText}>{t.orderDateLabel}</Text>
                </View>

                <View style={styles.deliveryBadgePill}>
                  <Text style={styles.deliveryBadgePillText}>{t.estimatedDeliveryLabel}</Text>
                </View>
              </View>

              <Text style={styles.courierInfoText}>{t.courierPartnerLabel}</Text>

              {/* Progress Stepper Timeline */}
              <View style={styles.stepperContainer}>
                {/* Step 1: Confirmed */}
                <View style={styles.stepItemRow}>
                  <View style={styles.stepIndicatorCol}>
                    <View style={[styles.stepCircleIcon, styles.stepCircleDone]}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                    <View style={[styles.stepLine, styles.stepLineDone]} />
                  </View>

                  <View style={styles.stepTextCol}>
                    <Text style={styles.stepTitleTextDone}>{t.step1Title}</Text>
                    <Text style={styles.stepDateText}>{t.step1Date}</Text>
                  </View>
                </View>

                {/* Step 2: Packed */}
                <View style={styles.stepItemRow}>
                  <View style={styles.stepIndicatorCol}>
                    <View style={[styles.stepCircleIcon, styles.stepCircleDone]}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                    <View style={[styles.stepLine, styles.stepLineDone]} />
                  </View>

                  <View style={styles.stepTextCol}>
                    <Text style={styles.stepTitleTextDone}>{t.step2Title}</Text>
                    <Text style={styles.stepSubText}>{t.step2Sub}</Text>
                    <Text style={styles.stepDateText}>{t.step2Date}</Text>
                  </View>
                </View>

                {/* Step 3: In Transit (Active) */}
                <View style={styles.stepItemRow}>
                  <View style={styles.stepIndicatorCol}>
                    <View style={[styles.stepCircleIcon, styles.stepCircleActive]}>
                      <Ionicons name="bus" size={14} color="#FFFFFF" />
                    </View>
                    <View style={styles.stepLine} />
                  </View>

                  <View style={styles.stepTextCol}>
                    <Text style={styles.stepTitleTextActive}>{t.step3Title}</Text>
                    <Text style={styles.stepSubText}>{t.step3Sub}</Text>
                    <Text style={styles.stepDateText}>{t.step3Date}</Text>
                  </View>
                </View>

                {/* Step 4: Out for Delivery */}
                <View style={styles.stepItemRow}>
                  <View style={styles.stepIndicatorCol}>
                    <View style={[styles.stepCircleIcon, styles.stepCirclePending]}>
                      <Ionicons name="ellipsis-horizontal" size={14} color="#888888" />
                    </View>
                  </View>

                  <View style={styles.stepTextCol}>
                    <Text style={styles.stepTitleTextPending}>{t.step4Title}</Text>
                    <Text style={styles.stepDateText}>{t.step4Date}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 3. Items in Order Card */}
            <View style={styles.sectionCard}>
              <Text style={[styles.cardHeaderTitleText, { marginBottom: 16 }]}>{t.orderItemsTitle}</Text>

              <View style={styles.orderItemCardRow}>
                <Image source={require('@/assets/images/govt_item_basket.png')} style={styles.orderItemImage} resizeMode="contain" />

                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.itemTitleText}>{t.itemTitle}</Text>
                  <Text style={styles.itemCraftText}>{t.itemCraft}</Text>
                  <Text style={styles.itemPriceText}>{t.itemPrice}</Text>
                </View>

                <TouchableOpacity style={styles.helpSupportBtn} activeOpacity={0.8}>
                  <Ionicons name="headset-outline" size={14} color="#2E7D32" style={{ marginRight: 6 }} />
                  <Text style={styles.helpSupportBtnText}>{t.helpSupportBtn}</Text>
                </TouchableOpacity>
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

  /* Section Card */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
  },
  trackInputFormRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  trackInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
  },
  trackInputFlex: {
    flex: 1,
    fontSize: 13,
    color: '#333333',
  },
  trackOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingHorizontal: 22,
    height: 42,
  },
  trackOrderBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Active Order */
  activeOrderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  activeOrderTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  activeOrderSubText: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },
  deliveryBadgePill: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deliveryBadgePillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  courierInfoText: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 20,
  },

  /* Stepper */
  stepperContainer: {
    paddingLeft: 8,
    gap: 16,
  },
  stepItemRow: {
    flexDirection: 'row',
    gap: 16,
  },
  stepIndicatorCol: {
    alignItems: 'center',
    width: 24,
  },
  stepCircleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepCircleDone: {
    backgroundColor: '#2E7D32',
  },
  stepCircleActive: {
    backgroundColor: '#E65100',
  },
  stepCirclePending: {
    backgroundColor: '#E0E0E0',
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 2,
  },
  stepLineDone: {
    backgroundColor: '#2E7D32',
  },
  stepTextCol: {
    flex: 1,
    paddingBottom: 4,
  },
  stepTitleTextDone: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  stepTitleTextActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
  },
  stepTitleTextPending: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  stepSubText: {
    fontSize: 12,
    color: '#555555',
    marginTop: 2,
  },
  stepDateText: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },

  /* Order Items */
  cardHeaderTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  orderItemCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FAF8F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 14,
  },
  orderItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  itemCraftText: {
    fontSize: 12,
    color: '#666666',
  },
  itemPriceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  helpSupportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  helpSupportBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
});
