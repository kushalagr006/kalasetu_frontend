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

const TRANSLATIONS_CUST_MESSAGES = {
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
    pageTitle: 'कारीगर बातचीत',
    pageSubtitle: 'कारीगरों के साथ सीधे संदेश भेजें और अपने प्रश्नों के उत्तर पाएं।',
    searchChatPlaceholder: 'कारीगर का नाम खोजें...',
    tabAll: 'सभी',
    tabUnread: 'अपठित (1)',
    tabOrders: 'ऑर्डर प्रश्न',
    newMessageBtn: '+ नया संदेश',
    activeOnline: 'ऑनलाइन',
    viewArtisanProducts: 'उत्पाद देखें',
    inputPlaceholder: 'कारीगर को संदेश लिखें...',
    sendBtn: 'भेजें',
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
    pageTitle: 'Artisan Messages',
    pageSubtitle: 'Chat directly with master artisans and track custom product inquiries.',
    searchChatPlaceholder: 'Search artisan name...',
    tabAll: 'All',
    tabUnread: 'Unread (1)',
    tabOrders: 'Order Inquiries',
    newMessageBtn: '+ New Chat',
    activeOnline: 'Online',
    viewArtisanProducts: 'View Products',
    inputPlaceholder: 'Type a message to artisan...',
    sendBtn: 'Send',
  },
};

const ARTISAN_CHATS = [
  {
    id: '1',
    nameHi: 'सीमा देवी (कांकेर)',
    nameEn: 'Seema Devi (Kanker)',
    craftHi: 'बाँस टोकरी निर्माता',
    craftEn: 'Bamboo Basket Artisan',
    lastMessageHi: 'नमस्कार जी, आपका बाँस की टोकरी का ऑर्डर रायपुर हब से निकल गया है। 🌿',
    lastMessageEn: 'Hello, your bamboo basket order has been dispatched from Raipur hub. 🌿',
    time: '10:45 AM',
    unread: 1,
    online: true,
    avatarInitials: 'SD',
    avatarBg: '#2E7D32',
  },
  {
    id: '2',
    nameHi: 'रामकुमार साहू (कोंडागांव)',
    nameEn: 'Ramkumar Sahu (Kondagaon)',
    craftHi: 'टेराकोटा शिल्पी',
    craftEn: 'Terracotta Sculptor',
    lastMessageHi: 'क्या आपको टेराकोटा घड़े की मिट्टी की फिनिशिंग पसंद आई?',
    lastMessageEn: 'Did you like the natural clay finish of the terracotta pot?',
    time: 'कल',
    unread: 0,
    online: false,
    avatarInitials: 'RS',
    avatarBg: '#E65100',
  },
  {
    id: '3',
    nameHi: 'मीना बाई (चांपा)',
    nameEn: 'Meena Bai (Champa)',
    craftHi: 'कोसा सिल्क बुनकर',
    craftEn: 'Kosa Silk Weaver',
    lastMessageHi: 'हैंडलूम सिल्क दुपट्टे की कस्टमाइज्ड रेड डिजाइन तैयार हो रही है।',
    lastMessageEn: 'Customized red design for the handloom silk dupatta is being prepared.',
    time: '26 अगस्त',
    unread: 0,
    online: true,
    avatarInitials: 'MB',
    avatarBg: '#0288D1',
  },
  {
    id: '4',
    nameHi: 'विनय लकड़ा (जगदलपुर)',
    nameEn: 'Vinay Lakra (Jagdalpur)',
    craftHi: 'बस्तर काष्ठ नक्काशी',
    craftEn: 'Bastar Wood Carving',
    lastMessageHi: 'नमस्ते आदित्य जी, नक्काशीदार डिब्बी का साइज 8x6 इंच है।',
    lastMessageEn: 'Namaste Aditya ji, the size of the carved wooden box is 8x6 inches.',
    time: '24 अगस्त',
    unread: 0,
    online: false,
    avatarInitials: 'VL',
    avatarBg: '#7B1FA2',
  },
];

export default function WebCustomerMessagesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [chatTab, setChatTab] = useState('all');

  const t = TRANSLATIONS_CUST_MESSAGES[selectedLang as keyof typeof TRANSLATIONS_CUST_MESSAGES];
  const isHindi = selectedLang === 'hi';

  const activeArtisan = ARTISAN_CHATS.find((c) => c.id === activeChatId) || ARTISAN_CHATS[0];

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

                  <TouchableOpacity style={styles.sidebarNavItem} onPress={() => router.push('/web-my-orders')}>
                    <Ionicons name="bag-handle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myOrders}</Text>
                  </TouchableOpacity>

                  {/* Active Messages */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="chatbubble-ellipses" size={18} color="#2E7D32" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.messages}</Text>
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

          {/* Right Main Messages Container */}
          <View style={styles.messagesMainAreaCol}>
            {/* Header Title Bar */}
            <View style={styles.messagesHeaderRow}>
              <View>
                <Text style={styles.pageTitleText}>{t.pageTitle}</Text>
                <Text style={styles.pageSubtitleText}>{t.pageSubtitle}</Text>
              </View>

              <TouchableOpacity style={styles.newMessageSolidBtn}>
                <Text style={styles.newMessageSolidBtnText}>{t.newMessageBtn}</Text>
              </TouchableOpacity>
            </View>

            {/* Split 2-Column Chat Container */}
            <View style={styles.chatSplitWindowCard}>
              {/* Left Column: Conversations List (Width ~ 320px) */}
              <View style={styles.conversationsListCol}>
                {/* Search Bar */}
                <View style={styles.chatSearchInputWrapper}>
                  <Ionicons name="search-outline" size={16} color="#777777" style={{ marginRight: 6 }} />
                  <TextInput
                    placeholder={t.searchChatPlaceholder}
                    placeholderTextColor="#888888"
                    style={styles.chatSearchInput}
                  />
                </View>

                {/* Filter Tabs */}
                <View style={styles.chatFilterTabsRow}>
                  <TouchableOpacity
                    style={[styles.chatTabBtn, chatTab === 'all' && styles.chatTabBtnActive]}
                    onPress={() => setChatTab('all')}
                  >
                    <Text style={[styles.chatTabText, chatTab === 'all' && styles.chatTabTextActive]}>{t.tabAll}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.chatTabBtn, chatTab === 'unread' && styles.chatTabBtnActive]}
                    onPress={() => setChatTab('unread')}
                  >
                    <Text style={[styles.chatTabText, chatTab === 'unread' && styles.chatTabTextActive]}>{t.tabUnread}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.chatTabBtn, chatTab === 'orders' && styles.chatTabBtnActive]}
                    onPress={() => setChatTab('orders')}
                  >
                    <Text style={[styles.chatTabText, chatTab === 'orders' && styles.chatTabTextActive]}>{t.tabOrders}</Text>
                  </TouchableOpacity>
                </View>

                {/* Conversations Item List */}
                <ScrollView style={styles.conversationsScrollList} showsVerticalScrollIndicator={false}>
                  {ARTISAN_CHATS.map((chat) => (
                    <TouchableOpacity
                      key={chat.id}
                      style={[
                        styles.conversationCardItem,
                        activeChatId === chat.id && styles.conversationCardItemActive,
                      ]}
                      onPress={() => setActiveChatId(chat.id)}
                    >
                      <View style={[styles.chatAvatarCircle, { backgroundColor: chat.avatarBg }]}>
                        <Text style={styles.chatAvatarText}>{chat.avatarInitials}</Text>
                        {chat.online && <View style={styles.onlineBadgeDot} />}
                      </View>

                      <View style={styles.chatContentTextCol}>
                        <View style={styles.chatHeaderNameRow}>
                          <Text style={styles.artisanNameTitle}>{isHindi ? chat.nameHi : chat.nameEn}</Text>
                          <Text style={styles.chatTimeText}>{chat.time}</Text>
                        </View>

                        <Text style={styles.artisanCraftSubText}>{isHindi ? chat.craftHi : chat.craftEn}</Text>
                        <Text style={styles.lastMessageSnippet} numberOfLines={1}>
                          {isHindi ? chat.lastMessageHi : chat.lastMessageEn}
                        </Text>
                      </View>

                      {chat.unread > 0 && (
                        <View style={styles.unreadCounterBadge}>
                          <Text style={styles.unreadCounterBadgeText}>{chat.unread}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Right Column: Active Conversation Chat Window */}
              <View style={styles.activeChatWindowCol}>
                {/* Active Chat Header */}
                <View style={styles.activeChatHeader}>
                  <View style={styles.activeArtisanInfoRow}>
                    <View style={[styles.chatAvatarCircle, { backgroundColor: activeArtisan.avatarBg }]}>
                      <Text style={styles.chatAvatarText}>{activeArtisan.avatarInitials}</Text>
                    </View>

                    <View>
                      <Text style={styles.activeArtisanNameText}>{isHindi ? activeArtisan.nameHi : activeArtisan.nameEn}</Text>
                      <View style={styles.onlineStatusRow}>
                        <View style={styles.greenStatusDot} />
                        <Text style={styles.onlineStatusText}>{t.activeOnline} • {isHindi ? activeArtisan.craftHi : activeArtisan.craftEn}</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.viewProductsOutlineBtn}
                    onPress={() => router.push('/web-all-products')}
                  >
                    <Ionicons name="cube-outline" size={14} color="#2E7D32" style={{ marginRight: 4 }} />
                    <Text style={styles.viewProductsOutlineBtnText}>{t.viewArtisanProducts}</Text>
                  </TouchableOpacity>
                </View>

                {/* Messages Bubbles Stream Area */}
                <ScrollView style={styles.messagesStreamScrollView} contentContainerStyle={styles.messagesStreamContainer} showsVerticalScrollIndicator={false}>
                  {/* Customer Left Bubble */}
                  <View style={[styles.messageBubbleRow, styles.messageBubbleRowRight]}>
                    <View style={styles.customerBubbleCard}>
                      <Text style={styles.customerBubbleText}>
                        {isHindi
                          ? 'नमस्ते सीमा जी, क्या मेरा बाँस की टोकरी का ऑर्डर डिस्पैच हो गया है?'
                          : 'Hello Seema ji, has my bamboo basket order been dispatched?'}
                      </Text>
                      <Text style={styles.bubbleTimeTextRight}>25 Aug, 11:20 AM</Text>
                    </View>
                  </View>

                  {/* Artisan Right Bubble */}
                  <View style={[styles.messageBubbleRow, styles.messageBubbleRowLeft]}>
                    <View style={styles.artisanBubbleCard}>
                      <Text style={styles.artisanBubbleText}>
                        {isHindi
                          ? 'नमस्ते आदित्य जी! जी हाँ, आपका ऑर्डर संख्या #KS-98421 आज सुबह पैक होकर रायपुर स्पीड पोस्ट हब भेज दिया गया है।'
                          : 'Hello Aditya ji! Yes, your order #KS-98421 was packed this morning and sent to Raipur Speed Post hub.'}
                      </Text>
                      <Text style={styles.bubbleTimeTextLeft}>26 Aug, 02:15 PM</Text>
                    </View>
                  </View>

                  {/* Artisan Right Bubble */}
                  <View style={[styles.messageBubbleRow, styles.messageBubbleRowLeft]}>
                    <View style={styles.artisanBubbleCard}>
                      <Text style={styles.artisanBubbleText}>
                        {isHindi
                          ? 'स्पीड पोस्ट AWB नंबर है IP984210042IN। आप ऐप में रीयल-टाइम ट्रैक कर सकते हैं।'
                          : 'Speed Post AWB number is IP984210042IN. You can track real-time in app.'}
                      </Text>
                      <Text style={styles.bubbleTimeTextLeft}>28 Aug, 09:00 AM</Text>
                    </View>
                  </View>

                  {/* Customer Bubble */}
                  <View style={[styles.messageBubbleRow, styles.messageBubbleRowRight]}>
                    <View style={styles.customerBubbleCard}>
                      <Text style={styles.customerBubbleText}>
                        {isHindi
                          ? 'बहुत धन्यवाद सीमा जी! टोकरी की फिनिशिंग फोटो में बहुत सुंदर दिख रही है।'
                          : 'Thank you very much Seema ji! The basket finishing looks beautiful in photo.'}
                      </Text>
                      <Text style={styles.bubbleTimeTextRight}>10:30 AM</Text>
                    </View>
                  </View>

                  {/* Artisan Bubble */}
                  <View style={[styles.messageBubbleRow, styles.messageBubbleRowLeft]}>
                    <View style={styles.artisanBubbleCard}>
                      <Text style={styles.artisanBubbleText}>
                        {isHindi ? activeArtisan.lastMessageHi : activeArtisan.lastMessageEn}
                      </Text>
                      <Text style={styles.bubbleTimeTextLeft}>{activeArtisan.time}</Text>
                    </View>
                  </View>
                </ScrollView>

                {/* Bottom Input Action Bar */}
                <View style={styles.chatInputActionBar}>
                  <TouchableOpacity style={styles.attachFileBtn}>
                    <Ionicons name="attach" size={20} color="#666666" />
                  </TouchableOpacity>

                  <TextInput
                    placeholder={t.inputPlaceholder}
                    placeholderTextColor="#888888"
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.chatInputFlex}
                  />

                  <TouchableOpacity style={styles.sendSolidBtn} activeOpacity={0.8}>
                    <Ionicons name="send" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                    <Text style={styles.sendSolidBtnText}>{t.sendBtn}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
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

  /* Messages Area */
  messagesMainAreaCol: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  messagesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  newMessageSolidBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  newMessageSolidBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Split Window Card */
  chatSplitWindowCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
  },

  /* Left Conversations Column */
  conversationsListCol: {
    width: 320,
    borderRightWidth: 1,
    borderColor: '#EBEBEB',
    padding: 16,
    gap: 12,
  },
  chatSearchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },
  chatSearchInput: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
  },
  chatFilterTabsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  chatTabBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  chatTabBtnActive: {
    backgroundColor: '#2E7D32',
  },
  chatTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555555',
  },
  chatTabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  conversationsScrollList: {
    flex: 1,
  },
  conversationCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 6,
    gap: 12,
  },
  conversationCardItemActive: {
    backgroundColor: '#E8F5E9',
  },
  chatAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  chatAvatarText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  onlineBadgeDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContentTextCol: {
    flex: 1,
  },
  chatHeaderNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artisanNameTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  chatTimeText: {
    fontSize: 10,
    color: '#888888',
  },
  artisanCraftSubText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '500',
  },
  lastMessageSnippet: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  unreadCounterBadge: {
    backgroundColor: '#C62828',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCounterBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Right Active Chat Window */
  activeChatWindowCol: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  activeChatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  activeArtisanInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activeArtisanNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  onlineStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  greenStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  onlineStatusText: {
    fontSize: 11,
    color: '#666666',
  },
  viewProductsOutlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewProductsOutlineBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  /* Stream Area */
  messagesStreamScrollView: {
    flex: 1,
  },
  messagesStreamContainer: {
    padding: 20,
    gap: 14,
  },
  messageBubbleRow: {
    width: '100%',
    flexDirection: 'row',
  },
  messageBubbleRowLeft: {
    justifyContent: 'flex-start',
  },
  messageBubbleRowRight: {
    justifyContent: 'flex-end',
  },
  artisanBubbleCard: {
    maxWidth: '65%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    borderTopLeftRadius: 2,
    padding: 12,
    gap: 4,
  },
  artisanBubbleText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 18,
  },
  bubbleTimeTextLeft: {
    fontSize: 10,
    color: '#888888',
    alignSelf: 'flex-end',
  },
  customerBubbleCard: {
    maxWidth: '65%',
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderRadius: 14,
    borderTopRightRadius: 2,
    padding: 12,
    gap: 4,
  },
  customerBubbleText: {
    fontSize: 13,
    color: '#1B5E20',
    lineHeight: 18,
  },
  bubbleTimeTextRight: {
    fontSize: 10,
    color: '#558B2F',
    alignSelf: 'flex-end',
  },

  /* Input Action Bar */
  chatInputActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 10,
  },
  attachFileBtn: {
    padding: 4,
  },
  chatInputFlex: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 38,
    fontSize: 13,
    color: '#333333',
  },
  sendSolidBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendSolidBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
