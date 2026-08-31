import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type LangCode = 'hi' | 'en';

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
];

const TRANSLATIONS: Record<LangCode, {
  headerTitle: string;
  shgName: string;
  location: string;
  members: string;
  joined: string;
  editProfile: string;
  aboutTitle: string;
  aboutBody: string;
  whatWeMakeTitle: string;
  categoryCount: string;
  whatWeMakeBody: string;
  metricProducts: string;
  metricOrders: string;
  metricTenders: string;
  metricEarnings: string;
  quickActions: string;
  qaAddProduct: string;
  qaMyProducts: string;
  qaMyOrders: string;
  qaMyTenders: string;
  logoutBtn: string;
  logoutTitle: string;
  logoutMsg: string;
  cancel: string;
  navHome: string;
  navMySHG: string;
  navProducts: string;
  navOrders: string;
  navProfile: string;
  modalTitle: string;
}> = {
  hi: {
    headerTitle: 'मेरा SHG',
    shgName: 'सखी महिला SHG',
    location: 'रामपुर गांव, धमतरी',
    members: '12 सदस्य',
    joined: 'जुड़े: मई 2025',
    editProfile: 'प्रोफ़ाइल बदलें',
    aboutTitle: 'हमारे SHG के बारे में',
    aboutBody: 'हम रामपुर गांव की 12 कुशल महिला कारीगरों का समूह हैं जो बांस कला और हस्तनिर्मित गृह सजावट उत्पाद बनाते हैं।',
    whatWeMakeTitle: 'हम क्या बनाते हैं',
    categoryCount: '1 श्रेणी',
    whatWeMakeBody: 'बांस के शिल्प, टोकरियां, डिब्बे और सजावटी दीवार लटकन।',
    metricProducts: 'उत्पाद',
    metricOrders: 'ऑर्डर',
    metricTenders: 'टेंडर',
    metricEarnings: 'कुल कमाई',
    quickActions: 'त्वरित कार्य',
    qaAddProduct: 'उत्पाद जोड़ें',
    qaMyProducts: 'मेरे उत्पाद',
    qaMyOrders: 'मेरे ऑर्डर',
    qaMyTenders: 'मेरे टेंडर',
    logoutBtn: 'लॉग आउट (Log Out)',
    logoutTitle: 'लॉग आउट करें?',
    logoutMsg: 'क्या आप सचमुच ऐप से लॉग आउट करना चाहते हैं?',
    cancel: 'रद्द करें',
    navHome: 'होम',
    navMySHG: 'मेरा SHG',
    navProducts: 'उत्पाद',
    navOrders: 'ऑर्डर',
    navProfile: 'प्रोफ़ाइल',
    modalTitle: 'भाषा चुनें / Select Language',
  },
  en: {
    headerTitle: 'MY SHG',
    shgName: 'SAKHI WOMEN SHG',
    location: 'Rampur Village, Dhamtari',
    members: '12 Members',
    joined: 'Joined May 2025',
    editProfile: 'Edit Profile',
    aboutTitle: 'About Our SHG',
    aboutBody: 'We are a collective of 12 skilled women artisans from Rampur village creating authentic bamboo craft and handmade home decor products.',
    whatWeMakeTitle: 'What We Make',
    categoryCount: '1 Category',
    whatWeMakeBody: 'Bamboo Crafts, Baskets, Storage Containers & Decorative Wall Hangings.',
    metricProducts: 'Products',
    metricOrders: 'Orders',
    metricTenders: 'Tenders',
    metricEarnings: 'Earnings',
    quickActions: 'Quick Actions',
    qaAddProduct: 'Add Product',
    qaMyProducts: 'My Products',
    qaMyOrders: 'My Orders',
    qaMyTenders: 'My Tenders',
    logoutBtn: 'Log Out',
    logoutTitle: 'Log Out?',
    logoutMsg: 'Are you sure you want to log out?',
    cancel: 'Cancel',
    navHome: 'Home',
    navMySHG: 'My SHG',
    navProducts: 'Products',
    navOrders: 'Orders',
    navProfile: 'Profile',
    modalTitle: 'Select Language / भाषा चुनें',
  },
};

export default function MySHGProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const initialLang: LangCode = (params.lang as LangCode) || 'hi';

  const [selectedLang, setSelectedLang] = useState<LangCode>(initialLang);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'myshg' | 'products' | 'orders' | 'profile'>('myshg');

  const t = TRANSLATIONS[selectedLang];
  const currentLangLabel = LANGUAGES.find((l) => l.code === selectedLang)?.label || 'हिंदी';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3B6029" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.topGreenHeader}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t.headerTitle}</Text>

          {/* Language Switcher Pill */}
          <TouchableOpacity
            style={styles.langSelectorBtn}
            onPress={() => setIsLangModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="globe-outline" size={14} color="#3B6029" />
            <Text style={styles.langSelectorText}>{currentLangLabel}</Text>
            <Ionicons name="chevron-down" size={12} color="#3B6029" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* SAKHI SHG Hero Card */}
          <View style={styles.shgHeroCard}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroAvatarCircle}>
                <Ionicons name="people" size={38} color="#3B6029" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.shgNameTitle}>{t.shgName}</Text>

                <View style={styles.heroMetaRow}>
                  <Ionicons name="location-outline" size={14} color="#3B6029" />
                  <Text style={styles.heroMetaText}>{t.location}</Text>
                </View>

                <View style={styles.heroMetaRow}>
                  <Ionicons name="people-outline" size={14} color="#3B6029" />
                  <Text style={styles.heroMetaText}>{t.members}</Text>
                </View>

                <View style={styles.heroMetaRow}>
                  <Ionicons name="calendar-outline" size={14} color="#3B6029" />
                  <Text style={styles.heroMetaText}>{t.joined}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.editBtnPill} activeOpacity={0.8}>
              <Ionicons name="pencil-outline" size={15} color="#3B6029" />
              <Text style={styles.editBtnText}>{t.editProfile}</Text>
            </TouchableOpacity>
          </View>

          {/* About Our SHG Card */}
          <View style={styles.infoCardSection}>
            <View style={styles.infoCardHeader}>
              <Ionicons name="information-circle-outline" size={20} color="#3B6029" />
              <Text style={styles.infoCardTitle}>{t.aboutTitle}</Text>
            </View>
            <Text style={styles.infoCardBody}>{t.aboutBody}</Text>
          </View>

          {/* What We Make Card */}
          <View style={styles.infoCardSection}>
            <View style={styles.infoCardHeaderRow}>
              <View style={styles.infoCardHeader}>
                <Ionicons name="basket-outline" size={20} color="#3B6029" />
                <Text style={styles.infoCardTitle}>{t.whatWeMakeTitle}</Text>
              </View>
              <View style={styles.greenBadgePill}>
                <Text style={styles.greenBadgeText}>{t.categoryCount}</Text>
              </View>
            </View>
            <Text style={styles.infoCardBody}>{t.whatWeMakeBody}</Text>
          </View>

          {/* 4 Metrics Containers Grid */}
          <View style={styles.metricsContainerGrid}>
            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValNumber}>18</Text>
                <Text style={styles.metricLabelText}>{t.metricProducts}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricValNumber}>23</Text>
                <Text style={styles.metricLabelText}>{t.metricOrders}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricValNumber}>3</Text>
                <Text style={styles.metricLabelText}>{t.metricTenders}</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricValCurrency}>₹18,450</Text>
                <Text style={styles.metricLabelText}>{t.metricEarnings}</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions Row */}
          <Text style={styles.sectionHeaderTitle}>{t.quickActions}</Text>

          <View style={styles.quickActionCardsRow}>
            {/* 1. Add Product */}
            <TouchableOpacity
              style={styles.qaCardItem}
              onPress={() => router.push({ pathname: '/add-product', params: { lang: selectedLang } })}
              activeOpacity={0.85}
            >
              <View style={styles.qaIconCircleSquare}>
                <Ionicons name="bag-add-outline" size={28} color="#3B6029" />
              </View>
              <Text style={styles.qaCardLabel}>{t.qaAddProduct}</Text>
            </TouchableOpacity>

            {/* 2. My Products */}
            <TouchableOpacity
              style={styles.qaCardItem}
              onPress={() => router.push({ pathname: '/products', params: { lang: selectedLang } })}
              activeOpacity={0.85}
            >
              <View style={styles.qaIconCircleSquare}>
                <Ionicons name="cube-outline" size={28} color="#3B6029" />
              </View>
              <Text style={styles.qaCardLabel}>{t.qaMyProducts}</Text>
            </TouchableOpacity>

            {/* 3. My Orders */}
            <TouchableOpacity
              style={styles.qaCardItem}
              onPress={() => router.push({ pathname: '/orders', params: { lang: selectedLang } })}
              activeOpacity={0.85}
            >
              <View style={styles.qaIconCircleSquare}>
                <Ionicons name="clipboard-outline" size={28} color="#3B6029" />
              </View>
              <Text style={styles.qaCardLabel}>{t.qaMyOrders}</Text>
            </TouchableOpacity>

            {/* 4. My Tenders */}
            <TouchableOpacity
              style={styles.qaCardItem}
              onPress={() => router.push({ pathname: '/web-active-tenders', params: { lang: selectedLang } })}
              activeOpacity={0.85}
            >
              <View style={styles.qaIconCircleSquare}>
                <Ionicons name="hammer-outline" size={28} color="#3B6029" />
              </View>
              <Text style={styles.qaCardLabel}>{t.qaMyTenders}</Text>
            </TouchableOpacity>
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              if (Platform.OS === 'web') {
                if (window.confirm(t.logoutMsg)) {
                  router.replace('/');
                }
              } else {
                Alert.alert(
                  t.logoutTitle,
                  t.logoutMsg,
                  [
                    { text: t.cancel, style: 'cancel' },
                    { text: t.logoutBtn, style: 'destructive', onPress: () => router.replace('/') },
                  ]
                );
              }
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="log-out-outline" size={20} color="#D32F2F" style={{ marginRight: 8 }} />
            <Text style={styles.logoutBtnText}>{t.logoutBtn}</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Tab Navigation Bar */}
        <View style={styles.bottomTabBar}>
          {/* 1. Home */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/shg-platform', params: { lang: selectedLang } })}>
            <Ionicons name="home-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navHome}</Text>
          </TouchableOpacity>

          {/* 2. My SHG */}
          <TouchableOpacity style={[styles.tabBarItem, styles.tabBarItemActivePill]} onPress={() => setActiveTab('myshg')}>
            <Ionicons name="people" size={24} color="#3B6029" />
            <Text style={[styles.tabBarLabel, styles.tabBarLabelActive]}>{t.navMySHG}</Text>
          </TouchableOpacity>

          {/* 3. Products */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/products', params: { lang: selectedLang } })}>
            <Ionicons name="bag-handle-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navProducts}</Text>
          </TouchableOpacity>

          {/* 4. Orders */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/orders', params: { lang: selectedLang } })}>
            <Ionicons name="clipboard-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navOrders}</Text>
          </TouchableOpacity>

          {/* 5. Profile */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/profile', params: { lang: selectedLang } })}>
            <Ionicons name="person-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navProfile}</Text>
          </TouchableOpacity>
        </View>

        {/* Language Selection Modal */}
        <Modal
          visible={isLangModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsLangModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsLangModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t.modalTitle}</Text>
              <FlatList
                data={LANGUAGES}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.langOptionItem,
                      selectedLang === item.code ? styles.langOptionSelected : null,
                    ]}
                    onPress={() => {
                      setSelectedLang(item.code);
                      setIsLangModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.langOptionText,
                        selectedLang === item.code ? styles.langOptionTextSelected : null,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {selectedLang === item.code && (
                      <Ionicons name="checkmark" size={20} color="#3B6029" />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3B6029',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },

  /* Header Bar */
  topGreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3B6029',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerIconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  langSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  langSelectorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },

  /* Scrollable Body Content */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 14,
  },

  /* Hero Card */
  shgHeroCard: {
    backgroundColor: '#F0F7ED',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    gap: 12,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroAvatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EAF2E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shgNameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  heroMetaText: {
    fontSize: 12,
    color: '#3B6029',
  },
  editBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3B6029',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 6,
    marginTop: -10,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B6029',
  },

  /* Info Cards */
  infoCardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    gap: 8,
  },
  infoCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  greenBadgePill: {
    backgroundColor: '#F0F7ED',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  greenBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  infoCardBody: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 18,
  },

  /* Metrics Grid */
  metricsContainerGrid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metricCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  metricValNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  metricValCurrency: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  metricLabelText: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
  },

  /* Section Title */
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B6029',
    marginTop: 4,
  },

  /* Quick Actions Row */
  quickActionCardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  qaCardItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  qaIconCircleSquare: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F0F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaCardLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  /* Logout Button */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderWidth: 1.5,
    borderColor: '#FFCDD2',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F',
  },

  /* Bottom Tab Bar */
  bottomTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingVertical: 8,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 2,
  },
  tabBarItemActivePill: {
    backgroundColor: '#F0F7ED',
    borderRadius: 12,
  },
  tabBarLabel: {
    fontSize: 10,
    color: '#666666',
  },
  tabBarLabelActive: {
    color: '#3B6029',
    fontWeight: 'bold',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 320,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  langOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FAF8F5',
  },
  langOptionSelected: {
    backgroundColor: '#F0F7ED',
    borderWidth: 1,
    borderColor: '#3B6029',
  },
  langOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  langOptionTextSelected: {
    fontWeight: 'bold',
    color: '#3B6029',
  },
});
