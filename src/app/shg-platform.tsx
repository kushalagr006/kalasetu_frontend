import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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
  headerSub: string;
  namasteTitle: string;
  welcomeSub: string;
  letGrow: string;
  sectionHeader: string;
  card1Title: string;
  card1Sub: string;
  card2Title: string;
  card2Sub: string;
  card3Title: string;
  card3Sub: string;
  card4Title: string;
  card4Sub: string;
  card5Title: string;
  card5Sub: string;
  card6Title: string;
  card6Sub: string;
  dashedTitle: string;
  dashedSub: string;
  action1Title: string;
  action1Sub: string;
  action2Title: string;
  action2Sub: string;
  navHome: string;
  navMySHG: string;
  navProducts: string;
  navOrders: string;
  navProfile: string;
  modalTitle: string;
}> = {
  hi: {
    headerSub: 'महिला SHG प्लेटफॉर्म',
    namasteTitle: 'नमस्ते!',
    welcomeSub: 'कलासेतु में आपका स्वागत है',
    letGrow: 'आइए मिलकर अपने SHG को आगे बढ़ाएं',
    sectionHeader: 'आज क्या करना चाहेंगी?',
    card1Title: 'मेरा SHG',
    card1Sub: 'समूह विवरण देखें',
    card2Title: 'मेरे उत्पाद',
    card2Sub: 'उत्पाद जोड़ें / देखें',
    card3Title: 'मेरे ऑर्डर',
    card3Sub: 'ऑर्डर स्टेटस जांचें',
    card4Title: 'टेंडर',
    card4Sub: 'सरकारी टेंडर देखें',
    card5Title: 'ग्राहक',
    card5Sub: 'संदेश और पूछताछ',
    card6Title: 'कमाई',
    card6Sub: 'कुल बिक्री देखें',
    dashedTitle: 'उत्पाद जोड़ें',
    dashedSub: 'नया उत्पाद जोड़कर बेचना शुरू करें',
    action1Title: 'नई सूचनाएं',
    action1Sub: 'अपने ऑर्डर और टेंडर अपडेट देखें',
    action2Title: 'सहायता केंद्र',
    action2Sub: 'हमें कॉल करें या सहायताएं पाएं',
    navHome: 'होम',
    navMySHG: 'मेरा SHG',
    navProducts: 'उत्पाद',
    navOrders: 'ऑर्डर',
    navProfile: 'प्रोफ़ाइल',
    modalTitle: 'भाषा चुनें / Select Language',
  },
  en: {
    headerSub: 'Women SHG Platform',
    namasteTitle: 'Namaste!',
    welcomeSub: 'Welcome to KalaSetu',
    letGrow: 'Let us grow our SHG together',
    sectionHeader: 'What would you like to do today?',
    card1Title: 'My SHG',
    card1Sub: 'View group details',
    card2Title: 'My Products',
    card2Sub: 'Add / view products',
    card3Title: 'My Orders',
    card3Sub: 'Check order status',
    card4Title: 'Tenders',
    card4Sub: 'View Govt Tenders',
    card5Title: 'Customers',
    card5Sub: 'Messages & inquiries',
    card6Title: 'Earnings',
    card6Sub: 'View total sales',
    dashedTitle: 'Add Product',
    dashedSub: 'Add a new product to start selling',
    action1Title: 'Notifications',
    action1Sub: 'View your order & tender updates',
    action2Title: 'Help Center',
    action2Sub: 'Call us or get assistance',
    navHome: 'Home',
    navMySHG: 'My SHG',
    navProducts: 'Products',
    navOrders: 'Orders',
    navProfile: 'Profile',
    modalTitle: 'Select Language / भाषा चुनें',
  },
};

export default function WomenSHGPlatformScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const initialLang: LangCode = (params.lang as LangCode) || 'hi';

  const [selectedLang, setSelectedLang] = useState<LangCode>(initialLang);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'myshg' | 'products' | 'orders' | 'profile'>('home');

  const t = TRANSLATIONS[selectedLang];
  const currentLangLabel = LANGUAGES.find((l) => l.code === selectedLang)?.label || 'हिंदी';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3B6029" translucent={false} />
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.topGreenHeader}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerTitleGroup}>
            <View style={styles.headerAvatarCircle}>
              <Ionicons name="people" size={20} color="#3B6029" />
            </View>
            <View>
              <Text style={styles.headerBrandTitle}>KALASETU</Text>
              <Text style={styles.headerBrandSub}>{t.headerSub}</Text>
            </View>
          </View>

          {/* Language Switcher Pill */}
          <TouchableOpacity
            style={styles.langSelectorBtn}
            onPress={() => setIsLangModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="globe-outline" size={15} color="#3B6029" />
            <Text style={styles.langSelectorText}>{currentLangLabel}</Text>
            <Ionicons name="chevron-down" size={13} color="#3B6029" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => router.push('/notifications' as any)}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Main Body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Namaste Welcome Banner Box */}
          <View style={styles.welcomeBannerCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.namasteTitleText}>{t.namasteTitle}</Text>
              <Text style={styles.welcomeSubtitleText}>{t.welcomeSub}</Text>
              <Text style={styles.letGrowText}>{t.letGrow}</Text>
            </View>

            <View style={styles.womenAvatarGroupCircle}>
              <Ionicons name="people" size={32} color="#3B6029" />
            </View>
          </View>

          {/* Section Heading */}
          <Text style={styles.sectionHeaderTitle}>{t.sectionHeader}</Text>

          {/* 3x2 Quick Actions Grid */}
          <View style={styles.quickActionsContainer}>
            {/* Row 1 */}
            <View style={styles.gridRow}>
              {/* Card 1: मेरा SHG */}
              <TouchableOpacity
                style={styles.gridCardItem}
                onPress={() => router.push({ pathname: '/shg-profile', params: { lang: selectedLang } })}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: '#F0F7ED' }]}>
                  <Ionicons name="people-outline" size={24} color="#3B6029" />
                </View>
                <Text style={styles.gridCardTitle}>{t.card1Title}</Text>
                <Text style={styles.gridCardSub}>{t.card1Sub}</Text>
              </TouchableOpacity>

              {/* Card 2: मेरे उत्पाद */}
              <TouchableOpacity
                style={styles.gridCardItem}
                onPress={() => router.push({ pathname: '/products', params: { lang: selectedLang } })}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: '#F0F7ED' }]}>
                  <Ionicons name="bag-handle-outline" size={24} color="#3B6029" />
                </View>
                <Text style={styles.gridCardTitle}>{t.card2Title}</Text>
                <Text style={styles.gridCardSub}>{t.card2Sub}</Text>
              </TouchableOpacity>

              {/* Card 3: मेरे ऑर्डर */}
              <TouchableOpacity
                style={styles.gridCardItem}
                onPress={() => router.push({ pathname: '/orders', params: { lang: selectedLang } })}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: '#F0F7ED' }]}>
                  <Ionicons name="clipboard-outline" size={24} color="#3B6029" />
                </View>
                <Text style={styles.gridCardTitle}>{t.card3Title}</Text>
                <Text style={styles.gridCardSub}>{t.card3Sub}</Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.gridRow}>
              {/* Card 4: टेंडर */}
              <TouchableOpacity
                style={styles.gridCardItem}
                onPress={() => router.push({ pathname: '/web-active-tenders', params: { lang: selectedLang } })}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: '#F0F7ED' }]}>
                  <Ionicons name="hammer-outline" size={24} color="#3B6029" />
                </View>
                <Text style={styles.gridCardTitle}>{t.card4Title}</Text>
                <Text style={styles.gridCardSub}>{t.card4Sub}</Text>
              </TouchableOpacity>

              {/* Card 5: ग्राहक */}
              <TouchableOpacity
                style={styles.gridCardItem}
                onPress={() => router.push({ pathname: '/web-customer-messages', params: { lang: selectedLang } })}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: '#F0F7ED' }]}>
                  <Ionicons name="chatbubbles-outline" size={24} color="#3B6029" />
                </View>
                <Text style={styles.gridCardTitle}>{t.card5Title}</Text>
                <Text style={styles.gridCardSub}>{t.card5Sub}</Text>
              </TouchableOpacity>

              {/* Card 6: कमाई */}
              <TouchableOpacity
                style={styles.gridCardItem}
                onPress={() => alert(selectedLang === 'hi' ? 'कमाई रिपोर्ट सेक्शन' : 'Earnings Report Section')}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: '#F0F7ED' }]}>
                  <Ionicons name="wallet-outline" size={24} color="#3B6029" />
                </View>
                <Text style={styles.gridCardTitle}>{t.card6Title}</Text>
                <Text style={styles.gridCardSub}>{t.card6Sub}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashed Banner: उत्पाद जोड़ें */}
          <TouchableOpacity
            style={styles.dashedAddProductCard}
            onPress={() => router.push({ pathname: '/add-product', params: { lang: selectedLang } })}
            activeOpacity={0.85}
          >
            <View style={styles.dashedIconCircle}>
              <Ionicons name="add-circle" size={28} color="#3B6029" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.dashedTitleText}>{t.dashedTitle}</Text>
              <Text style={styles.dashedSubText}>{t.dashedSub}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#3B6029" />
          </TouchableOpacity>

          {/* Action Bars Group */}
          <View style={styles.actionBarsGroup}>
            {/* 1. नई सूचनाएं */}
            <TouchableOpacity
              style={styles.actionBarRowItem}
              onPress={() => router.push({ pathname: '/notifications', params: { lang: selectedLang } })}
              activeOpacity={0.85}
            >
              <View style={styles.actionIconCircle}>
                <Ionicons name="notifications-outline" size={22} color="#3B6029" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitleText}>{t.action1Title}</Text>
                <Text style={styles.actionSubText}>{t.action1Sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#666666" />
            </TouchableOpacity>

            <View style={styles.actionBarDividerLine} />

            {/* 2. सहायता केंद्र */}
            <TouchableOpacity
              style={styles.actionBarRowItem}
              onPress={() => router.push({ pathname: '/web-help', params: { lang: selectedLang } })}
              activeOpacity={0.85}
            >
              <View style={styles.actionIconCircle}>
                <Ionicons name="headset-outline" size={22} color="#3B6029" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitleText}>{t.action2Title}</Text>
                <Text style={styles.actionSubText}>{t.action2Sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#666666" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Tab Navigation Bar */}
        <View style={styles.bottomTabBar}>
          {/* 1. होम */}
          <TouchableOpacity style={[styles.tabBarItem, styles.tabBarItemActivePill]} onPress={() => setActiveTab('home')}>
            <Ionicons name="home" size={24} color="#3B6029" />
            <Text style={[styles.tabBarLabel, styles.tabBarLabelActive]}>{t.navHome}</Text>
          </TouchableOpacity>

          {/* 2. मेरा SHG */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/shg-profile', params: { lang: selectedLang } })}>
            <Ionicons name="people-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navMySHG}</Text>
          </TouchableOpacity>

          {/* 3. मेरे उत्पाद */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/products', params: { lang: selectedLang } })}>
            <Ionicons name="bag-handle-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navProducts}</Text>
          </TouchableOpacity>

          {/* 4. मेरे ऑर्डर */}
          <TouchableOpacity style={styles.tabBarItem} onPress={() => router.push({ pathname: '/orders', params: { lang: selectedLang } })}>
            <Ionicons name="clipboard-outline" size={24} color="#666666" />
            <Text style={styles.tabBarLabel}>{t.navOrders}</Text>
          </TouchableOpacity>

          {/* 5. प्रोफ़ाइल */}
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
  topGreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3B6029',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerIconBtn: {
    padding: 4,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBrandTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerBrandSub: {
    fontSize: 10,
    color: '#EAF2E8',
    marginTop: -2,
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

  /* Scrollable Body */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 14,
  },

  /* Namaste Banner Card */
  welcomeBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7ED',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  namasteTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  welcomeSubtitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 2,
  },
  letGrowText: {
    fontSize: 12,
    color: '#555555',
    marginTop: 4,
  },
  womenAvatarGroupCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EAF2E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Section Title */
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B6029',
    marginTop: 4,
  },

  /* Quick Actions Grid */
  quickActionsContainer: {
    gap: 10,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  gridCardItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 14,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  gridIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  gridCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  gridCardSub: {
    fontSize: 10,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 12,
  },

  /* Dashed Add Product Banner Card */
  dashedAddProductCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7ED',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#3B6029',
    borderStyle: 'dashed',
    padding: 14,
    gap: 14,
  },
  dashedIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3B6029',
  },
  dashedSubText: {
    fontSize: 11,
    color: '#555555',
    marginTop: 2,
  },

  /* Action Bars Group */
  actionBarsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 4,
  },
  actionBarRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 14,
  },
  actionIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  actionSubText: {
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  actionBarDividerLine: {
    height: 1,
    backgroundColor: '#F0F0F0',
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
