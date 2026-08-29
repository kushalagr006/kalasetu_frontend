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

const TRANSLATIONS_MESSAGES = {
  hi: {
    dashboard: 'डैशबोर्ड',
    createTender: 'नया टेंडर बनाएं',
    activeTenders: 'एक्टिव टेंडर',
    myTenders: 'मेरे टेंडर',
    bidsReceived: 'बिड प्राप्त',
    awardedTenders: 'पुरस्कारित टेंडर',
    notifications: 'सूचनाएं',
    messages: 'संदेश',
    settings: 'सेटिंग्स',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    deptName: 'छत्तीसगढ़ शासन',
    deptState: 'खरीद विभाग',
    pageTitle: 'संदेश',
    pageSubtitle: 'सभी आपकी बातचीत एक जगह पर।',
    newMessageBtn: 'नया संदेश',
    searchPlaceholder: 'खोजें...',
    tabAll: 'सभी',
    tabUnread: 'अनपढ़े (3)',
    tabArchive: 'आर्काइव',
    onlineStatus: 'ऑनलाइन',
    inputPlaceholder: 'यहाँ संदेश लिखें...',
    dateDivider: '20 मई 2025',
  },
  en: {
    dashboard: 'Dashboard',
    createTender: 'Create New Tender',
    activeTenders: 'Active Tenders',
    myTenders: 'My Tenders',
    bidsReceived: 'Bids Received',
    awardedTenders: 'Awarded Tenders',
    notifications: 'Notifications',
    messages: 'Messages',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    deptName: 'Govt of Chhattisgarh',
    deptState: 'Procurement Dept',
    pageTitle: 'Messages',
    pageSubtitle: 'All your conversations in one place.',
    newMessageBtn: 'New Message',
    searchPlaceholder: 'Search...',
    tabAll: 'All',
    tabUnread: 'Unread (3)',
    tabArchive: 'Archived',
    onlineStatus: 'Online',
    inputPlaceholder: 'Type a message here...',
    dateDivider: '20 May 2025',
  },
};

interface ChatItem {
  id: string;
  nameHi: string;
  nameEn: string;
  avatarBg: string;
  initials?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  lastMessageHi: string;
  lastMessageEn: string;
  timeHi: string;
  timeEn: string;
  unreadCount?: number;
  active?: boolean;
}

const CHAT_CONVERSATIONS: ChatItem[] = [
  {
    id: '1',
    nameHi: 'रामकुमार बांस शिल्प समूह',
    nameEn: 'Ramkumar Bamboo Craft Group',
    avatarBg: '#C8E6C9',
    initials: 'RK',
    lastMessageHi: 'उत्पाद की उपलब्धता के बारे में...',
    lastMessageEn: 'Regarding product availability...',
    timeHi: '10:30 AM',
    timeEn: '10:30 AM',
    unreadCount: 2,
    active: true,
  },
  {
    id: '2',
    nameHi: 'सीमा देवी (कारीगर)',
    nameEn: 'Seema Devi (Artisan)',
    avatarBg: '#FFCCBC',
    initials: 'SD',
    lastMessageHi: 'धन्यवाद! हमारी टोकरियां आ गईं।',
    lastMessageEn: 'Thank you! Our baskets have arrived.',
    timeHi: '09:15 AM',
    timeEn: '09:15 AM',
    unreadCount: 1,
  },
  {
    id: '3',
    nameHi: 'टेंडर टीम',
    nameEn: 'Tender Team',
    avatarBg: '#C8E6C9',
    iconName: 'clipboard-outline',
    lastMessageHi: 'टेंडर TND-2025-008 में दस्तावेज...',
    lastMessageEn: 'Documents for Tender TND-2025-008...',
    timeHi: 'कल',
    timeEn: 'Yesterday',
    unreadCount: 1,
  },
  {
    id: '4',
    nameHi: 'विनायक वुड क्राफ्ट्स',
    nameEn: 'Vinayak Wood Crafts',
    avatarBg: '#FFE0B2',
    initials: 'VW',
    lastMessageHi: 'बैठक का समय बदल दिया गया है।',
    lastMessageEn: 'Meeting time has been changed.',
    timeHi: '20 मई',
    timeEn: '20 May',
  },
  {
    id: '5',
    nameHi: 'पंचायत नारायणपुर',
    nameEn: 'Panchayat Narayanpur',
    avatarBg: '#E1BEE7',
    initials: 'PN',
    lastMessageHi: 'स्थानीय कारीगर पंजीकरण के बारे में।',
    lastMessageEn: 'Regarding local artisan registration.',
    timeHi: '19 मई',
    timeEn: '19 May',
  },
  {
    id: '6',
    nameHi: 'मधु स्टोर्स',
    nameEn: 'Madhu Stores',
    avatarBg: '#BBDEFB',
    initials: 'MS',
    lastMessageHi: 'ऑर्डर #KS1024 के संबंध में...',
    lastMessageEn: 'Regarding Order #KS1024...',
    timeHi: '18 मई',
    timeEn: '18 May',
  },
  {
    id: '7',
    nameHi: 'सहायता केंद्र',
    nameEn: 'Help Desk',
    avatarBg: '#C8E6C9',
    iconName: 'headset-outline',
    lastMessageHi: 'आपके प्रश्न का उत्तर उपलब्ध है।',
    lastMessageEn: 'Answer to your query is available.',
    timeHi: '17 मई',
    timeEn: '17 May',
  },
];

export default function WebMessagesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedLang, setSelectedLang] = useGlobalLang();
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'archive'>('all');
  const [selectedChatId, setSelectedChatId] = useState('1');
  const [messageText, setMessageText] = useState('');

  const t = TRANSLATIONS_MESSAGES[selectedLang as keyof typeof TRANSLATIONS_MESSAGES];
  const isHindi = selectedLang === 'hi';

  const activeChat = CHAT_CONVERSATIONS.find((c) => c.id === selectedChatId) || CHAT_CONVERSATIONS[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" translucent={false} />
      <View style={styles.container}>
        <View style={styles.mainLayoutRow}>
          {/* 1. Unified Left Sidebar Navigation */}
          {isDesktop && (
            <View style={styles.sidebarCol}>
              <View style={styles.sidebarTopGroup}>
                {/* Brand Logo Header */}
                <View style={styles.sidebarBrandRow}>
                  <Image
                    source={require('@/assets/images/logo_icon.png')}
                    style={styles.sidebarLogoImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Sidebar Navigation Items */}
                <View style={styles.sidebarMenuGroup}>
                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-govt')}
                  >
                    <Ionicons name="home-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.dashboard}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-create-tender')}
                  >
                    <Ionicons name="add-circle-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.createTender}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-active-tenders')}
                  >
                    <Ionicons name="document-text-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.activeTenders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-my-tenders')}
                  >
                    <Ionicons name="folder-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.myTenders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-bids-received')}
                  >
                    <Ionicons name="people-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.bidsReceived}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-awarded-tenders')}
                  >
                    <Ionicons name="trophy-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.awardedTenders}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-notifications')}
                  >
                    <Ionicons name="notifications-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.notifications}</Text>
                    <View style={styles.sidebarBadge}>
                      <Text style={styles.sidebarBadgeText}>3</Text>
                    </View>
                  </TouchableOpacity>

                  {/* 8. संदेश (Active) */}
                  <TouchableOpacity style={[styles.sidebarNavItem, styles.sidebarNavItemActive]}>
                    <Ionicons name="chatbubble-ellipses" size={18} color="#E65100" style={{ marginRight: 12 }} />
                    <Text style={[styles.sidebarNavText, styles.sidebarNavTextActive]}>{t.messages}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sidebarNavItem}
                    onPress={() => router.push('/web-settings')}
                  >
                    <Ionicons name="settings-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                    <Text style={styles.sidebarNavText}>{t.settings}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Sidebar Controls */}
              <View style={styles.sidebarBottomGroup}>
                <TouchableOpacity
                  style={styles.sidebarNavItem}
                  onPress={() => router.push('/web-profile')}
                >
                  <Ionicons name="person-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{t.profile}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sidebarNavItem}
                  onPress={() => router.push('/web-login')}
                >
                  <Ionicons name="log-out-outline" size={18} color="#555555" style={{ marginRight: 12 }} />
                  <Text style={styles.sidebarNavText}>{t.logout}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 2. Main Content Area */}
          <View style={styles.contentCol}>
            {/* Header Bar */}
            <View style={styles.headerBar}>
              <TouchableOpacity style={styles.menuToggleBtn}>
                <Ionicons name="menu" size={24} color="#1A1A1A" />
              </TouchableOpacity>

              <View style={styles.headerRightGroup}>
                {/* 1-Click Language Switcher (Segmented Toggle) */}
                <View style={styles.langSegmentContainer}>
                  <Ionicons name="globe-outline" size={16} color="#E65100" style={{ marginRight: 6 }} />
                  <TouchableOpacity
                    style={[styles.langSegmentBtn, selectedLang === 'hi' && styles.langSegmentBtnActive]}
                    onPress={() => setSelectedLang('hi')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.langSegmentText, selectedLang === 'hi' && styles.langSegmentTextActive]}>
                      हिंदी
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.langSegmentBtn, selectedLang === 'en' && styles.langSegmentBtnActive]}
                    onPress={() => setSelectedLang('en')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.langSegmentText, selectedLang === 'en' && styles.langSegmentTextActive]}>
                      English
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Notification Bell */}
                <TouchableOpacity
                  style={styles.notifBtn}
                  onPress={() => router.push('/web-notifications')}
                >
                  <Ionicons name="notifications-outline" size={22} color="#444444" />
                  <View style={styles.notifBadge}>
                    <Text style={styles.notifBadgeText}>3</Text>
                  </View>
                </TouchableOpacity>

                {/* State Govt Badge */}
                <View style={styles.govtDeptBadge}>
                  <View style={styles.govtEmblemCircle}>
                    <Ionicons name="shield" size={14} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.govtDeptName}>{t.deptName}</Text>
                    <Text style={styles.govtStateSubtitle}>{t.deptState}</Text>
                  </View>
                  <Ionicons name="chevron-down" size={14} color="#777777" style={{ marginLeft: 6 }} />
                </View>
              </View>
            </View>

            {/* Page Body Wrapper */}
            <View style={styles.messagesPageBody}>
              {/* Page Title & Green New Message Button Header */}
              <View style={styles.pageTitleHeaderRow}>
                <View style={styles.pageTitleGroup}>
                  <Text style={styles.pageTitle}>{t.pageTitle}</Text>
                  <Text style={styles.pageSubtitle}>{t.pageSubtitle}</Text>
                </View>

                <TouchableOpacity style={styles.greenNewMsgBtn} activeOpacity={0.8}>
                  <Ionicons name="create-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.greenNewMsgBtnText}>{t.newMessageBtn}</Text>
                </TouchableOpacity>
              </View>

              {/* 2-Column Split Chat Container */}
              <View style={styles.chatSplitLayoutRow}>
                {/* Left Column: Conversations List (Width ~ 320px) */}
                <View style={styles.conversationsSidebarCol}>
                  {/* Search Bar with Filter Icon */}
                  <View style={styles.searchBarRow}>
                    <View style={styles.searchInputBox}>
                      <Ionicons name="search-outline" size={16} color="#888888" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder={t.searchPlaceholder}
                        placeholderTextColor="#888888"
                        style={styles.searchInput}
                      />
                    </View>
                    <TouchableOpacity style={styles.filterIconButton}>
                      <Ionicons name="options-outline" size={18} color="#444444" />
                    </TouchableOpacity>
                  </View>

                  {/* Filter Tabs Row */}
                  <View style={styles.chatFilterTabsRow}>
                    <TouchableOpacity
                      style={[styles.chatFilterTabBtn, activeTab === 'all' && styles.chatFilterTabBtnActive]}
                      onPress={() => setActiveTab('all')}
                    >
                      <Text style={[styles.chatFilterTabText, activeTab === 'all' && styles.chatFilterTabTextActive]}>
                        {t.tabAll}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.chatFilterTabBtn, activeTab === 'unread' && styles.chatFilterTabBtnActive]}
                      onPress={() => setActiveTab('unread')}
                    >
                      <Text style={[styles.chatFilterTabText, activeTab === 'unread' && styles.chatFilterTabTextActive]}>
                        {t.tabUnread}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.chatFilterTabBtn, activeTab === 'archive' && styles.chatFilterTabBtnActive]}
                      onPress={() => setActiveTab('archive')}
                    >
                      <Text style={[styles.chatFilterTabText, activeTab === 'archive' && styles.chatFilterTabTextActive]}>
                        {t.tabArchive}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Conversation List Scroll Area */}
                  <ScrollView style={styles.conversationsListScroll} showsVerticalScrollIndicator={false}>
                    {CHAT_CONVERSATIONS.map((chat) => {
                      const isSelected = chat.id === selectedChatId;
                      return (
                        <TouchableOpacity
                          key={chat.id}
                          style={[styles.chatListItemRow, isSelected && styles.chatListItemRowActive]}
                          onPress={() => setSelectedChatId(chat.id)}
                          activeOpacity={0.8}
                        >
                          {/* Avatar Circle */}
                          <View style={[styles.chatAvatarCircle, { backgroundColor: chat.avatarBg }]}>
                            {chat.iconName ? (
                              <Ionicons name={chat.iconName} size={18} color="#2E7D32" />
                            ) : (
                              <Text style={styles.chatAvatarInitialsText}>{chat.initials}</Text>
                            )}
                          </View>

                          {/* Chat Title & Subtitle Snippet */}
                          <View style={styles.chatListTextCol}>
                            <Text style={styles.chatListNameText} numberOfLines={1}>
                              {isHindi ? chat.nameHi : chat.nameEn}
                            </Text>
                            <Text style={styles.chatListSnippetText} numberOfLines={1}>
                              {isHindi ? chat.lastMessageHi : chat.lastMessageEn}
                            </Text>
                          </View>

                          {/* Timestamp & Unread Badge */}
                          <View style={styles.chatListMetaCol}>
                            <Text style={styles.chatListTimeText}>{isHindi ? chat.timeHi : chat.timeEn}</Text>
                            {chat.unreadCount ? (
                              <View style={styles.chatUnreadBadge}>
                                <Text style={styles.chatUnreadBadgeText}>{chat.unreadCount}</Text>
                              </View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* Right Column: Active Chat Box (Flex 1) */}
                <View style={styles.chatMainAreaCol}>
                  {/* Chat Top Header */}
                  <View style={styles.activeChatHeaderRow}>
                    <View style={styles.activeChatHeaderLeft}>
                      <View style={[styles.chatAvatarCircle, { backgroundColor: activeChat.avatarBg, width: 38, height: 38 }]}>
                        {activeChat.iconName ? (
                          <Ionicons name={activeChat.iconName} size={18} color="#2E7D32" />
                        ) : (
                          <Text style={styles.chatAvatarInitialsText}>{activeChat.initials}</Text>
                        )}
                      </View>
                      <View>
                        <Text style={styles.activeChatNameText}>{isHindi ? activeChat.nameHi : activeChat.nameEn}</Text>
                        <View style={styles.onlineStatusRow}>
                          <View style={styles.onlineDot} />
                          <Text style={styles.onlineStatusText}>{t.onlineStatus}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.activeChatHeaderRightIcons}>
                      <TouchableOpacity style={{ padding: 6 }}>
                        <Ionicons name="search-outline" size={18} color="#555555" />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 6 }}>
                        <Ionicons name="call-outline" size={18} color="#555555" />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 6 }}>
                        <Ionicons name="ellipsis-vertical" size={18} color="#555555" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Chat Messages Body Scroll */}
                  <ScrollView style={styles.chatMessagesScroll} contentContainerStyle={styles.chatMessagesContent}>
                    {/* Date Divider */}
                    <View style={styles.dateDividerRow}>
                      <View style={styles.dateDividerLine} />
                      <Text style={styles.dateDividerText}>{t.dateDivider}</Text>
                      <View style={styles.dateDividerLine} />
                    </View>

                    {/* Message 1: Incoming */}
                    <View style={styles.incomingMsgRow}>
                      <View style={[styles.chatAvatarCircle, { backgroundColor: '#C8E6C9', width: 28, height: 28, marginRight: 8 }]}>
                        <Text style={[styles.chatAvatarInitialsText, { fontSize: 11 }]}>RK</Text>
                      </View>
                      <View style={styles.incomingBubble}>
                        <Text style={styles.msgBubbleText}>
                          {isHindi
                            ? 'नमस्कार,\nहमारे उत्पाद "बांस की टोकरी" की बड़ी मात्रा में उपलब्धता के बारे में जानकारी चाहिए।'
                            : 'Hello,\nNeed information regarding the large scale availability of our product "Bamboo Basket".'}
                        </Text>
                        <Text style={styles.msgTimeTextIncoming}>10:28 AM</Text>
                      </View>
                    </View>

                    {/* Message 2: Outgoing (Light Green #DCF8C6) */}
                    <View style={styles.outgoingMsgRow}>
                      <View style={styles.outgoingBubble}>
                        <Text style={styles.msgBubbleText}>
                          {isHindi
                            ? 'नमस्कार!\nहाँ, हमारे पास पर्याप्त स्टॉक उपलब्ध है।\nकृपया आवश्यक मात्रा बताएं ताकि हम आपको उचित कोटेशन भेज सकें।'
                            : 'Hello!\nYes, we have sufficient stock available.\nPlease specify the required quantity so we can send a proper quote.'}
                        </Text>
                        <View style={styles.outgoingMetaRow}>
                          <Text style={styles.msgTimeTextOutgoing}>10:30 AM</Text>
                          <Ionicons name="checkmark-done" size={15} color="#2E7D32" style={{ marginLeft: 4 }} />
                        </View>
                      </View>
                    </View>

                    {/* Message 3: Incoming */}
                    <View style={styles.incomingMsgRow}>
                      <View style={[styles.chatAvatarCircle, { backgroundColor: '#C8E6C9', width: 28, height: 28, marginRight: 8 }]}>
                        <Text style={[styles.chatAvatarInitialsText, { fontSize: 11 }]}>RK</Text>
                      </View>
                      <View style={styles.incomingBubble}>
                        <Text style={styles.msgBubbleText}>
                          {isHindi
                            ? 'हमें 200 पीस चाहिए। क्या इसकी कीमत और डिलीवरी समय बताएंगे?'
                            : 'We need 200 pieces. Could you inform us about price and delivery time?'}
                        </Text>
                        <Text style={styles.msgTimeTextIncoming}>10:31 AM</Text>
                      </View>
                    </View>

                    {/* Message 4: Outgoing */}
                    <View style={styles.outgoingMsgRow}>
                      <View style={styles.outgoingBubble}>
                        <Text style={styles.msgBubbleText}>
                          {isHindi
                            ? 'जी हाँ, हम आपको 15 मिनट में कोटेशन भेज रहे हैं।'
                            : 'Yes, we are sending you the quotation in 15 minutes.'}
                        </Text>
                        <View style={styles.outgoingMetaRow}>
                          <Text style={styles.msgTimeTextOutgoing}>10:32 AM</Text>
                          <Ionicons name="checkmark-done" size={15} color="#2E7D32" style={{ marginLeft: 4 }} />
                        </View>
                      </View>
                    </View>
                  </ScrollView>

                  {/* Chat Bottom Input Footer Box */}
                  <View style={styles.chatInputFooterContainer}>
                    <TextInput
                      placeholder={t.inputPlaceholder}
                      placeholderTextColor="#999999"
                      value={messageText}
                      onChangeText={setMessageText}
                      style={styles.chatMessageInput}
                    />

                    <View style={styles.chatInputActionBar}>
                      <View style={styles.attachmentIconsGroup}>
                        <TouchableOpacity style={{ padding: 4 }}>
                          <Ionicons name="attach-outline" size={20} color="#777777" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 4 }}>
                          <Ionicons name="image-outline" size={20} color="#777777" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 4 }}>
                          <Ionicons name="happy-outline" size={20} color="#777777" />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity style={styles.sendGreenCircleBtn}>
                        <Ionicons name="send" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
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
    backgroundColor: '#F7F7F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  mainLayoutRow: {
    flex: 1,
    flexDirection: 'row',
  },
  /* 1. Sidebar */
  sidebarCol: {
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  sidebarTopGroup: {},
  sidebarBrandRow: {
    marginBottom: 20,
  },
  sidebarLogoImage: {
    width: 170,
    height: 60,
  },
  sidebarMenuGroup: {
    gap: 4,
  },
  sidebarNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  sidebarNavItemActive: {
    backgroundColor: '#FFF4EB',
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  sidebarNavText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
  },
  sidebarNavTextActive: {
    color: '#E65100',
    fontWeight: 'bold',
  },
  sidebarBadge: {
    marginLeft: 'auto',
    backgroundColor: '#E65100',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sidebarBottomGroup: {
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },

  /* 2. Main Content Area */
  contentCol: {
    flex: 1,
    backgroundColor: '#F7F7F8',
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
  menuToggleBtn: {
    padding: 6,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langSegmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 20,
    padding: 3,
    paddingLeft: 8,
  },
  langSegmentBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  langSegmentBtnActive: {
    backgroundColor: '#E65100',
  },
  langSegmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },
  langSegmentTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  notifBtn: {
    position: 'relative',
    padding: 6,
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E65100',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  govtDeptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  govtEmblemCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  govtDeptName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  govtStateSubtitle: {
    fontSize: 10,
    color: '#777777',
  },

  /* Messages Page Wrapper */
  messagesPageBody: {
    flex: 1,
    padding: 24,
  },
  pageTitleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pageTitleGroup: {},
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  greenNewMsgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  greenNewMsgBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* 2-Column Split Layout */
  chatSplitLayoutRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },

  /* Left Column: Conversations List */
  conversationsSidebarCol: {
    width: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 14,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
  },
  filterIconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  /* Filter Tabs */
  chatFilterTabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 8,
  },
  chatFilterTabBtn: {
    paddingVertical: 8,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  chatFilterTabBtnActive: {
    borderBottomColor: '#2E7D32',
  },
  chatFilterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777777',
  },
  chatFilterTabTextActive: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },

  /* Conversations List */
  conversationsListScroll: {
    flex: 1,
  },
  chatListItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 2,
  },
  chatListItemRowActive: {
    backgroundColor: '#F1F8E9',
  },
  chatAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  chatAvatarInitialsText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  chatListTextCol: {
    flex: 1,
  },
  chatListNameText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  chatListSnippetText: {
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  chatListMetaCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  chatListTimeText: {
    fontSize: 10,
    color: '#888888',
  },
  chatUnreadBadge: {
    backgroundColor: '#2E7D32',
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatUnreadBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Right Column: Active Chat Area */
  chatMainAreaCol: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
  },
  activeChatHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activeChatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeChatNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  onlineStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
    marginRight: 4,
  },
  onlineStatusText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
  },
  activeChatHeaderRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  /* Chat Body Scroll */
  chatMessagesScroll: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  chatMessagesContent: {
    padding: 16,
    gap: 14,
  },
  dateDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dateDividerLine: {
    width: 60,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dateDividerText: {
    fontSize: 11,
    color: '#999999',
    marginHorizontal: 12,
  },
  incomingMsgRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: '75%',
  },
  incomingBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderTopLeftRadius: 2,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    elevation: 1,
  },
  outgoingMsgRow: {
    alignSelf: 'flex-end',
    maxWidth: '75%',
  },
  outgoingBubble: {
    backgroundColor: '#DCF8C6',
    borderRadius: 14,
    borderTopRightRadius: 2,
    padding: 12,
    elevation: 1,
  },
  msgBubbleText: {
    fontSize: 13,
    color: '#1A1A1A',
    lineHeight: 18,
  },
  msgTimeTextIncoming: {
    fontSize: 10,
    color: '#888888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  outgoingMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  msgTimeTextOutgoing: {
    fontSize: 10,
    color: '#558B2F',
  },

  /* Chat Input Footer Box */
  chatInputFooterContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    padding: 12,
  },
  chatMessageInput: {
    fontSize: 13,
    color: '#1A1A1A',
    marginBottom: 8,
    minHeight: 36,
  },
  chatInputActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attachmentIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sendGreenCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
