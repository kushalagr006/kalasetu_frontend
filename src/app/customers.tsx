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
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';
type CustomerFilter = 'all' | 'new' | 'active' | 'repeat';

interface CustomerItem {
  id: string;
  nameHi: string;
  nameEn: string;
  locationHi: string;
  locationEn: string;
  phone: string;
  ordersCountHi: string;
  ordersCountEn: string;
  totalSpent: string;
  category: 'new' | 'active' | 'repeat';
}

const CUSTOMERS_DATA: CustomerItem[] = [
  {
    id: '1',
    nameHi: 'रीना शर्मा',
    nameEn: 'Reena Sharma',
    locationHi: 'भोपाल, मध्य प्रदेश',
    locationEn: 'Bhopal, Madhya Pradesh',
    phone: '+91 98765 43210',
    ordersCountHi: '2 ऑर्डर',
    ordersCountEn: '2 Orders',
    totalSpent: '₹2,450',
    category: 'active',
  },
  {
    id: '2',
    nameHi: 'किरण चौहान',
    nameEn: 'Kiran Chauhan',
    locationHi: 'रायपुर, छत्तीसगढ़',
    locationEn: 'Raipur, Chhattisgarh',
    phone: '+91 99876 54321',
    ordersCountHi: '1 ऑर्डर',
    ordersCountEn: '1 Order',
    totalSpent: '₹1,850',
    category: 'new',
  },
  {
    id: '3',
    nameHi: 'पूजा पटेल',
    nameEn: 'Pooja Patel',
    locationHi: 'इंदौर, मध्य प्रदेश',
    locationEn: 'Indore, Madhya Pradesh',
    phone: '+91 96325 67890',
    ordersCountHi: '3 ऑर्डर',
    ordersCountEn: '3 Orders',
    totalSpent: '₹3,600',
    category: 'repeat',
  },
  {
    id: '4',
    nameHi: 'अमित वर्मा',
    nameEn: 'Amit Verma',
    locationHi: 'जयपुर, राजस्थान',
    locationEn: 'Jaipur, Rajasthan',
    phone: '+91 94123 45678',
    ordersCountHi: '1 ऑर्डर',
    ordersCountEn: '1 Order',
    totalSpent: '₹950',
    category: 'new',
  },
  {
    id: '5',
    nameHi: 'नेहा गुप्ता',
    nameEn: 'Neha Gupta',
    locationHi: 'दिल्ली, दिल्ली',
    locationEn: 'Delhi, Delhi',
    phone: '+91 91234 56789',
    ordersCountHi: '2 ऑर्डर',
    ordersCountEn: '2 Orders',
    totalSpent: '₹2,100',
    category: 'repeat',
  },
];

export default function CustomersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();

  const selectedLang: LangCode = (params.lang as LangCode) || 'hi';
  const isHindi = selectedLang === 'hi';
  const [activeFilter, setActiveFilter] = useState<CustomerFilter>('all');

  const filteredCustomers = CUSTOMERS_DATA.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.category === activeFilter;
  });

  const handleCallPhone = (phoneNum: string) => {
    const raw = phoneNum.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${raw}`).catch(() => alert(`Call ${phoneNum}`));
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
                {isHindi ? 'ग्राहक' : 'Customers'}
              </Text>
              <Text style={styles.headerSubtitle}>
                {isHindi
                  ? 'अपने सभी ग्राहकों से जुड़ें और ऑर्डर संभालें'
                  : 'Connect with all your customers & manage orders'}
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

          {/* Search & Filter Action Bar */}
          <View style={styles.actionToolRow}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => alert(isHindi ? 'ग्राहक खोजें...' : 'Search customers...')}
              activeOpacity={0.7}
            >
              <Ionicons name="search-outline" size={20} color="#555555" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => alert(isHindi ? 'फ़िल्टर विकल्प' : 'Filter options')}
              activeOpacity={0.7}
            >
              <Ionicons name="funnel-outline" size={20} color="#555555" />
            </TouchableOpacity>
          </View>

          {/* Metric Cards Row (4 Grid Cards) */}
          <View style={styles.metricsGridContainer}>
            {/* Card 1: Total Customers */}
            <View style={styles.metricCard}>
              <View style={[styles.metricIconCircle, { backgroundColor: '#EAF2E8' }]}>
                <Ionicons name="people-outline" size={22} color="#3B6029" />
              </View>
              <Text style={[styles.metricValueText, { color: '#3B6029' }]}>48</Text>
              <Text style={styles.metricLabelText}>
                {isHindi ? 'कुल ग्राहक' : 'Total Customers'}
              </Text>
            </View>

            {/* Card 2: Active Customers */}
            <View style={styles.metricCard}>
              <View style={[styles.metricIconCircle, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="cube-outline" size={22} color="#1976D2" />
              </View>
              <Text style={[styles.metricValueText, { color: '#1976D2' }]}>26</Text>
              <Text style={styles.metricLabelText}>
                {isHindi ? 'सक्रिय ग्राहक' : 'Active Customers'}
              </Text>
            </View>

            {/* Card 3: Repeat Orders */}
            <View style={styles.metricCard}>
              <View style={[styles.metricIconCircle, { backgroundColor: '#FFF0E6' }]}>
                <Ionicons name="bag-handle-outline" size={22} color="#E65100" />
              </View>
              <Text style={[styles.metricValueText, { color: '#E65100' }]}>12</Text>
              <Text style={styles.metricLabelText}>
                {isHindi ? 'पुनः ऑर्डर दिए' : 'Repeat Orders'}
              </Text>
            </View>

            {/* Card 4: Average Rating */}
            <View style={styles.metricCard}>
              <View style={[styles.metricIconCircle, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="star-outline" size={22} color="#5E35B1" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.metricValueText, { color: '#5E35B1' }]}>4.6</Text>
                <Ionicons name="star" size={14} color="#FFB300" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.metricLabelText}>
                {isHindi ? 'औसत रेटिंग' : 'Avg Rating'}
              </Text>
            </View>
          </View>

          {/* Filter Category Tabs Header */}
          <View style={styles.categoryTabsRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => setActiveFilter('all')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    activeFilter === 'all' && styles.tabItemTextActive,
                  ]}
                >
                  {isHindi ? 'सभी ग्राहक' : 'All Customers'}
                </Text>
                {activeFilter === 'all' && <View style={styles.tabActiveIndicator} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => setActiveFilter('new')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    activeFilter === 'new' && styles.tabItemTextActive,
                  ]}
                >
                  {isHindi ? 'नए ग्राहक' : 'New Customers'}
                </Text>
                {activeFilter === 'new' && <View style={styles.tabActiveIndicator} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => setActiveFilter('active')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    activeFilter === 'active' && styles.tabItemTextActive,
                  ]}
                >
                  {isHindi ? 'सक्रिय ग्राहक' : 'Active Customers'}
                </Text>
                {activeFilter === 'active' && <View style={styles.tabActiveIndicator} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => setActiveFilter('repeat')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    activeFilter === 'repeat' && styles.tabItemTextActive,
                  ]}
                >
                  {isHindi ? 'पुनः ऑर्डर वाले' : 'Repeat Orders'}
                </Text>
                {activeFilter === 'repeat' && <View style={styles.tabActiveIndicator} />}
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Customer List Card Container */}
          <View style={styles.customerListCard}>
            {filteredCustomers.map((customer, index) => (
              <React.Fragment key={customer.id}>
                <TouchableOpacity
                  style={styles.customerRowItem}
                  onPress={() => alert(`${customer.nameHi} - ${customer.phone}`)}
                  activeOpacity={0.8}
                >
                  {/* Left Avatar Icon Circle */}
                  <View style={styles.customerAvatarCircle}>
                    <Ionicons name="person-outline" size={22} color="#3B6029" />
                  </View>

                  {/* Center Info Group */}
                  <View style={styles.customerInfoGroup}>
                    <Text style={styles.customerName}>
                      {isHindi ? customer.nameHi : customer.nameEn}
                    </Text>

                    <View style={styles.customerDetailRow}>
                      <Ionicons name="location-outline" size={13} color="#3B6029" style={{ marginRight: 4 }} />
                      <Text style={styles.customerDetailText}>
                        {isHindi ? customer.locationHi : customer.locationEn}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.customerDetailRow}
                      onPress={() => handleCallPhone(customer.phone)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="call-outline" size={13} color="#3B6029" style={{ marginRight: 4 }} />
                      <Text style={styles.customerDetailText}>{customer.phone}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Right Badges & Amount */}
                  <View style={styles.customerRightGroup}>
                    <View style={styles.orderBadgePill}>
                      <Text style={styles.orderBadgeText}>
                        {isHindi ? customer.ordersCountHi : customer.ordersCountEn}
                      </Text>
                    </View>

                    <Text style={styles.spentLabel}>
                      {isHindi ? 'कुल खर्च ' : 'Spent '}
                      <Text style={styles.spentAmount}>{customer.totalSpent}</Text>
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#999999" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                {index < filteredCustomers.length - 1 && (
                  <View style={styles.customerRowDivider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Bottom "Add New Customer" Card Banner */}
          <View style={styles.addCustomerBanner}>
            <Image
              source={require('@/assets/images/shg_women.png')}
              style={styles.bannerAvatar}
              resizeMode="contain"
            />
            <View style={styles.bannerTextGroup}>
              <Text style={styles.bannerTitle}>
                {isHindi ? 'नए ग्राहक जोड़ें' : 'Add New Customers'}
              </Text>
              <Text style={styles.bannerSubtitle}>
                {isHindi
                  ? 'अपने ग्राहकों से जुड़े रहें और ज्यादा ऑर्डर पाएं'
                  : 'Stay connected with customers and get more orders'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.bannerAddButton}
              onPress={() => alert(isHindi ? 'नया ग्राहक जोड़ें...' : 'Add customer form...')}
              activeOpacity={0.85}
            >
              <Ionicons name="person-add-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.bannerAddButtonText}>
                {isHindi ? 'ग्राहक जोड़ें' : 'Add'}
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

          {/* Tab 2: Products */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => router.push({ pathname: '/products', params: { lang: selectedLang } })}
            activeOpacity={0.7}
          >
            <Ionicons name="cube-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{isHindi ? 'उत्पाद' : 'Products'}</Text>
          </TouchableOpacity>

          {/* Tab 3: Customers (Active) */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <Ionicons name="people" size={22} color="#3B6029" />
            <Text style={[styles.navTabText, styles.navTabTextActive]}>
              {isHindi ? 'ग्राहक' : 'Customers'}
            </Text>
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
    paddingBottom: 8,
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
  /* Action Tools Row */
  actionToolRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
    gap: 10,
  },
  searchButton: {
    padding: 6,
  },
  filterButton: {
    padding: 6,
  },
  /* Metrics Grid (4 Cards) */
  metricsGridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 6,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EFEA',
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  metricIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricValueText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricLabelText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
    textAlign: 'center',
  },
  /* Category Tabs Row */
  categoryTabsRow: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFEA',
  },
  tabsScrollContent: {
    paddingHorizontal: 20,
    gap: 20,
  },
  tabItem: {
    paddingBottom: 10,
    position: 'relative',
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tabItemTextActive: {
    color: '#3B6029',
    fontWeight: 'bold',
  },
  tabActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#3B6029',
    borderRadius: 2,
  },
  /* Customer List Card Container */
  customerListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0EFEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  customerRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  customerAvatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EAF2E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  customerInfoGroup: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  customerDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  customerDetailText: {
    fontSize: 12,
    color: '#666666',
  },
  customerRightGroup: {
    alignItems: 'flex-end',
  },
  orderBadgePill: {
    backgroundColor: '#F0F7ED',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 6,
  },
  orderBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3B6029',
  },
  spentLabel: {
    fontSize: 11,
    color: '#666666',
  },
  spentAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  customerRowDivider: {
    height: 1,
    backgroundColor: '#F5F4EF',
    marginLeft: 74,
  },
  /* Add Customer Banner Card */
  addCustomerBanner: {
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
  bannerAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B6029',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bannerAddButtonText: {
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
