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
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';
type ActiveTab = 'home' | 'products' | 'customers' | 'profile';

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
];

const TRANSLATIONS: Record<LangCode, {
  headerTitle: string;
  artisanName: string;
  artisanCraft: string;
  artisanLocation: string;
  storeNameLabel: string;
  storeNameVal: string;
  joinedLabel: string;
  joinedVal: string;
  menuPersonal: string;
  menuShop: string;
  menuBank: string;
  menuNotifications: string;
  menuHelp: string;
  menuAbout: string;
  logoutBtn: string;
  logoutAlertTitle: string;
  logoutAlertMsg: string;
  navHome: string;
  navProducts: string;
  navCustomers: string;
  navProfile: string;
  modalTitle: string;
  notificationAlert: string;
}> = {
  hi: {
    headerTitle: 'मेरा प्रोफाइल',
    artisanName: 'सुनीता देवी',
    artisanCraft: 'मिट्टी के बर्तन कलाकार',
    artisanLocation: 'खुरई, मध्य प्रदेश',
    storeNameLabel: 'स्टोर नाम',
    storeNameVal: 'सुनीता क्राफ्टस',
    joinedLabel: 'जुड़े हुए',
    joinedVal: '15 मई 2024',
    menuPersonal: 'व्यक्तिगत जानकारी',
    menuShop: 'मेरी दुकान',
    menuBank: 'बैंक और भुगतान जानकारी',
    menuNotifications: 'सूचनाएँ',
    menuHelp: 'सहायता और सहयोग',
    menuAbout: 'ऐप के बारे में',
    logoutBtn: 'लॉग आउट',
    logoutAlertTitle: 'लॉग आउट करें?',
    logoutAlertMsg: 'क्या आप सचमुच ऐप से लॉग आउट करना चाहते हैं?',
    navHome: 'होम',
    navProducts: 'उत्पाद',
    navCustomers: 'ग्राहक',
    navProfile: 'प्रोफाइल',
    modalTitle: 'भाषा चुनें / Select Language',
    notificationAlert: 'आपकी 2 नई सूचनाएं मिली हैं!',
  },
  en: {
    headerTitle: 'My Profile',
    artisanName: 'Sunita Devi',
    artisanCraft: 'Pottery Craft Artist',
    artisanLocation: 'Khurai, Madhya Pradesh',
    storeNameLabel: 'Store Name',
    storeNameVal: 'Sunita Crafts',
    joinedLabel: 'Joined On',
    joinedVal: '15 May 2024',
    menuPersonal: 'Personal Information',
    menuShop: 'My Shop',
    menuBank: 'Bank & Payment Info',
    menuNotifications: 'Notifications',
    menuHelp: 'Help & Support',
    menuAbout: 'About App',
    logoutBtn: 'Log Out',
    logoutAlertTitle: 'Log Out?',
    logoutAlertMsg: 'Are you sure you want to log out of the app?',
    navHome: 'Home',
    navProducts: 'Products',
    navCustomers: 'Customers',
    navProfile: 'Profile',
    modalTitle: 'Select Language / भाषा चुनें',
    notificationAlert: 'You have 2 new notifications!',
  },
};

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();

  const initialLang: LangCode = (params.lang as LangCode) || 'hi';
  const [selectedLang, setSelectedLang] = useState<LangCode>(initialLang);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

  const t = TRANSLATIONS[selectedLang];

  const handleLogout = () => {
    Alert.alert(
      t.logoutAlertTitle,
      t.logoutAlertMsg,
      [
        { text: selectedLang === 'hi' ? 'रद्द करें' : 'Cancel', style: 'cancel' },
        {
          text: t.logoutBtn,
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ],
      { cancelable: true }
    );
  };

  const handleMenuPress = (menuName: string) => {
    alert(`${menuName} ${selectedLang === 'hi' ? 'सेक्शन खुल रहा है...' : 'section opening...'}`);
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
          {/* Header Row: Title & Notification Bell */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{t.headerTitle}</Text>

            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => router.push({ pathname: '/notifications', params: { lang: selectedLang } })}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={26} color="#1A1A1A" />
              <View style={styles.redBadgeDot} />
            </TouchableOpacity>
          </View>

          {/* Artisan Profile Card */}
          <TouchableOpacity style={styles.profileCard} activeOpacity={0.9}>
            {/* Top Artisan Info Section */}
            <View style={styles.profileMainRow}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require('@/assets/images/pottery_avatar.png')}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
                <View style={styles.cameraBadgeCircle}>
                  <Ionicons name="camera" size={12} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.artisanTextContainer}>
                <Text style={styles.artisanName}>{t.artisanName}</Text>
                <Text style={styles.artisanCraft}>{t.artisanCraft}</Text>

                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color="#555555" style={{ marginRight: 4 }} />
                  <Text style={styles.artisanLocation}>{t.artisanLocation}</Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#777777" />
            </View>

            <View style={styles.cardDividerLine} />

            {/* Bottom Store & Joined Metrics */}
            <View style={styles.profileSubMetricsRow}>
              {/* Store Name */}
              <View style={styles.subMetricItem}>
                <View style={styles.subMetricIconCircle}>
                  <Ionicons name="storefront-outline" size={20} color="#3B6029" />
                </View>
                <View>
                  <Text style={styles.subMetricLabel}>{t.storeNameLabel}</Text>
                  <Text style={styles.subMetricVal}>{t.storeNameVal}</Text>
                </View>
              </View>

              <View style={styles.subMetricVerticalDivider} />

              {/* Joined On */}
              <View style={styles.subMetricItem}>
                <View style={styles.subMetricIconCircle}>
                  <Ionicons name="calendar-outline" size={20} color="#3B6029" />
                </View>
                <View>
                  <Text style={styles.subMetricLabel}>{t.joinedLabel}</Text>
                  <Text style={styles.subMetricVal}>{t.joinedVal}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Account Settings Menu Card */}
          <View style={styles.menuContainerCard}>
            {/* 1. Personal Information */}
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => handleMenuPress(t.menuPersonal)}
              activeOpacity={0.7}
            >
              <Ionicons name="person-outline" size={22} color="#3B6029" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{t.menuPersonal}</Text>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </TouchableOpacity>

            <View style={styles.menuDividerLine} />

            {/* 2. My Shop */}
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => handleMenuPress(t.menuShop)}
              activeOpacity={0.7}
            >
              <Ionicons name="storefront-outline" size={22} color="#3B6029" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{t.menuShop}</Text>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </TouchableOpacity>

            <View style={styles.menuDividerLine} />

            {/* 3. Bank & Payment Info */}
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => handleMenuPress(t.menuBank)}
              activeOpacity={0.7}
            >
              <Ionicons name="business-outline" size={22} color="#3B6029" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{t.menuBank}</Text>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </TouchableOpacity>

            <View style={styles.menuDividerLine} />

            {/* 4. Notifications */}
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => handleMenuPress(t.menuNotifications)}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={22} color="#3B6029" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{t.menuNotifications}</Text>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </TouchableOpacity>

            <View style={styles.menuDividerLine} />

            {/* 5. Help & Support */}
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => handleMenuPress(t.menuHelp)}
              activeOpacity={0.7}
            >
              <Ionicons name="help-circle-outline" size={22} color="#3B6029" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{t.menuHelp}</Text>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </TouchableOpacity>

            <View style={styles.menuDividerLine} />

            {/* 6. About App */}
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => handleMenuPress(t.menuAbout)}
              activeOpacity={0.7}
            >
              <Ionicons name="information-circle-outline" size={22} color="#3B6029" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{t.menuAbout}</Text>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Feather name="log-out" size={20} color="#E53935" style={{ marginRight: 8 }} />
            <Text style={styles.logoutText}>{t.logoutBtn}</Text>
          </TouchableOpacity>

          {/* Village Line Art Background Overlay */}
          <View style={styles.sketchWrapper}>
            <Image
              source={require('@/assets/images/village_sketch.png')}
              style={styles.sketchImage}
              resizeMode="contain"
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar (4 Tabs) */}
        <View style={styles.bottomNavContainer}>
          {/* Tab 1: Home */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => router.push({ pathname: '/home', params: { lang: selectedLang } })}
            activeOpacity={0.7}
          >
            <Ionicons name="home-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{t.navHome}</Text>
          </TouchableOpacity>

          {/* Tab 2: Products */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => alert(t.navProducts)}
            activeOpacity={0.7}
          >
            <Ionicons name="cube-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{t.navProducts}</Text>
          </TouchableOpacity>

          {/* Tab 3: Customers */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => alert(t.navCustomers)}
            activeOpacity={0.7}
          >
            <Ionicons name="people-outline" size={22} color="#666666" />
            <Text style={styles.navTabText}>{t.navCustomers}</Text>
          </TouchableOpacity>

          {/* Tab 4: Profile (Active) */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => setActiveTab('profile')}
            activeOpacity={0.7}
          >
            <Ionicons name="person" size={22} color="#3B6029" />
            <Text style={[styles.navTabText, styles.navTabTextActive]}>
              {t.navProfile}
            </Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? 8 : 12) : 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3B6029',
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
  /* Artisan Profile Card */
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0EFEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  profileMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  cameraBadgeCircle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3B6029',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  artisanTextContainer: {
    flex: 1,
  },
  artisanName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  artisanCraft: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artisanLocation: {
    fontSize: 13,
    color: '#555555',
  },
  cardDividerLine: {
    height: 1,
    backgroundColor: '#F2F1EC',
    marginBottom: 14,
  },
  profileSubMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  subMetricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMetricIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5ECE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  subMetricLabel: {
    fontSize: 11,
    color: '#777777',
    marginBottom: 1,
  },
  subMetricVal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subMetricVerticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#F0EFEA',
  },
  /* Account Settings Menu Card */
  menuContainerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0EFEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 14,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  menuDividerLine: {
    height: 1,
    backgroundColor: '#F5F4EF',
    marginLeft: 52,
  },
  /* Logout Button */
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE0E0',
    borderRadius: 16,
    height: 52,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
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
