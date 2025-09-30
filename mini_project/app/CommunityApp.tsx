import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Simple icon components to replace external icons
const HomeIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>🏠</Text>
  </View>
);

const MenuIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>⋮</Text>
  </View>
);

const PlusIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>+</Text>
  </View>
);

const SendIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.boldIconText}>→</Text>
  </View>
);

// Sample message data
const sampleMessages = [
  {
    id: 1,
    user: 'Alex Chen',
    message: 'Good morning everyone! The community garden project is progressing well.',
    time: '9:30 AM',
    isOwn: false,
    isAnnouncement: false,
  },
  {
    id: 2,
    user: 'You',
    message: 'That\'s great news! When will it be ready for use?',
    time: '9:32 AM',
    isOwn: true,
    isAnnouncement: false,
  },
  {
    id: 3,
    user: 'Community Admin',
    message: '📢 ANNOUNCEMENT: Monthly community meeting scheduled for Saturday 3 PM at the main hall.',
    time: '10:15 AM',
    isOwn: false,
    isAnnouncement: true,
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    message: 'Thanks for organizing this! Looking forward to discussing the new initiatives.',
    time: '10:17 AM',
    isOwn: false,
    isAnnouncement: false,
  },
  {
    id: 5,
    user: 'Mike Johnson',
    message: 'The maintenance team did a great job fixing the elevator yesterday.',
    time: '11:45 AM',
    isOwn: false,
    isAnnouncement: false,
  },
];

// Member Features - removed Feedback
const memberFeatures = [
  { id: 1, title: 'Raise Complaint', icon: '⚠️', color: '#FF6B6B' },
  { id: 2, title: 'Raise Petition', icon: '📝', color: '#4ECDC4' },
  { id: 3, title: 'Anonymous Chat', icon: '💬', color: '#45B7D1' },
  { id: 4, title: 'Community Events', icon: '📅', color: '#96CEB4' },
  { id: 5, title: 'Resources', icon: '📚', color: '#FECA57' },
];

// Admin Features
const adminFeatures = [
  { id: 1, title: 'View Complaints', icon: '⚠️', color: '#FF6B6B' },
  { id: 2, title: 'View Petitions', icon: '📝', color: '#4ECDC4' },
  { id: 3, title: 'Add Announcement', icon: '📢', color: '#45B7D1' },
  { id: 4, title: 'Manage Budgets', icon: '💰', color: '#96CEB4' },
  { id: 5, title: 'Send SOS Alert', icon: '🚨', color: '#FF4757' },
  { id: 6, title: 'Voting Management', icon: '✅', color: '#3742fa' },
  { id: 7, title: 'AI Assistant', icon: '🤖', color: '#7B68EE' },
  { id: 8, title: 'Analytics', icon: '📊', color: '#FFA502' },
];

// Media options for attachment modal
const mediaOptions = [
  { id: 1, title: 'Photos', icon: '📷', color: '#4ECDC4' },
  { id: 2, title: 'Videos', icon: '🎥', color: '#FF6B6B' },
  { id: 3, title: 'Documents', icon: '📄', color: '#45B7D1' },
  { id: 4, title: 'Audio', icon: '🎵', color: '#96CEB4' },
  { id: 5, title: 'Location', icon: '📍', color: '#FECA57' },
  { id: 6, title: 'Contact', icon: '👤', color: '#FF9FF3' },
];

const CommunityApp: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [messageText, setMessageText] = useState('');

  const toggleUserType = () => {
    setIsAdmin(!isAdmin);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openMediaModal = () => {
    setMediaModalVisible(true);
  };

  const closeMediaModal = () => {
    setMediaModalVisible(false);
  };

  const handleFeaturePress = (feature: any) => {
    if (feature.title === 'AI Assistant') {
      setAiModalVisible(true);
    } else {
      console.log(`${feature.title} pressed`);
    }
    closeModal();
  };

  const handleMediaOptionPress = (option: any) => {
    console.log(`${option.title} selected`);
    closeMediaModal();
  };

  const MessageBubble = ({ message }: { message: any }) => (
    <View
      style={[
        styles.messageBubble,
        message.isOwn ? styles.ownMessage : styles.otherMessage,
        message.isAnnouncement && styles.announcementMessage,
      ]}
    >
      {!message.isOwn && !message.isAnnouncement && (
        <Text style={styles.userName}>{message.user}</Text>
      )}
      {message.isAnnouncement && (
        <Text style={styles.announcementLabel}>COMMUNITY ANNOUNCEMENT</Text>
      )}
      <Text
        style={[
          styles.messageText,
          message.isOwn && styles.ownMessageText,
          message.isAnnouncement && styles.announcementText,
        ]}
      >
        {message.message}
      </Text>
      <Text
        style={[
          styles.messageTime,
          message.isOwn && styles.ownMessageTime,
          message.isAnnouncement && styles.announcementTime,
        ]}
      >
        {message.time}
      </Text>
    </View>
  );

  const FeatureCard = ({ feature }: { feature: any }) => (
    <TouchableOpacity
      style={[styles.featureCard, { borderLeftColor: feature.color }]}
      onPress={() => handleFeaturePress(feature)}
    >
      <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
        <Text style={styles.featureIconText}>{feature.icon}</Text>
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  const MediaOptionCard = ({ option }: { option: any }) => (
    <TouchableOpacity
      style={[styles.mediaOptionCard, { borderLeftColor: option.color }]}
      onPress={() => handleMediaOptionPress(option)}
    >
      <View style={[styles.mediaOptionIcon, { backgroundColor: option.color }]}>
        <Text style={styles.mediaOptionIconText}>{option.icon}</Text>
      </View>
      <Text style={styles.mediaOptionTitle}>{option.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C5F2D" />
      
      {/* Header - Full WhatsApp-like header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.communityAvatar}>
            <HomeIcon />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.communityName}>Greenwood Hostel</Text>
            <Text style={styles.communitySubtitle}>
              {isAdmin ? 'Admin Panel' : 'Member View'} • 127 members • Online
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleUserType}>
            <Text style={styles.roleToggle}>{isAdmin ? 'M' : 'A'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Area - Full screen chat */}
      <View style={styles.messagesWrapper}>
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {sampleMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>
      </View>

      {/* Floating Action Button - positioned beside message bar */}
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <PlusIcon />
      </TouchableOpacity>

      {/* Message Input Bar - Bottom fixed */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton} onPress={openMediaModal}>
          <Text style={styles.attachText}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <SendIcon />
        </TouchableOpacity>
      </View>

      {/* Features Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={closeModal} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isAdmin ? 'Admin Features' : 'Community Features'}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {(isAdmin ? adminFeatures : memberFeatures).map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Media Attachment Modal */}
      <Modal
        transparent
        visible={mediaModalVisible}
        animationType="slide"
        onRequestClose={closeMediaModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={closeMediaModal} />
          <View style={styles.mediaModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Media</Text>
              <TouchableOpacity onPress={closeMediaModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mediaOptionsGrid}>
              {mediaOptions.map((option) => (
                <MediaOptionCard key={option.id} option={option} />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* AI Assistant Modal (Admin Only) */}
      <Modal
        transparent
        visible={aiModalVisible}
        animationType="slide"
        onRequestClose={() => setAiModalVisible(false)}
      >
        <View style={styles.aiModalOverlay}>
          <View style={styles.aiModalContent}>
            <View style={styles.aiModalHeader}>
              <Text style={styles.aiModalTitle}>🤖 AI Community Assistant</Text>
              <TouchableOpacity onPress={() => setAiModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.aiFeaturesList}>
              <View style={styles.aiFeatureCard}>
                <Text style={styles.aiFeatureIcon}>📊</Text>
                <Text style={styles.aiFeatureTitle}>Smart Summarization</Text>
                <Text style={styles.aiFeatureDesc}>
                  Generate concise summaries of community discussions and complaints
                </Text>
              </View>

              <View style={styles.aiFeatureCard}>
                <Text style={styles.aiFeatureIcon}>📂</Text>
                <Text style={styles.aiFeatureTitle}>Issue Extraction & Grouping</Text>
                <Text style={styles.aiFeatureDesc}>
                  Automatically identify and categorize related complaints for efficient resolution
                </Text>
              </View>

              <View style={styles.aiFeatureCard}>
                <Text style={styles.aiFeatureIcon}>💬</Text>
                <Text style={styles.aiFeatureTitle}>Response Suggestions</Text>
                <Text style={styles.aiFeatureDesc}>
                  Context-aware response templates aligned with community guidelines
                </Text>
              </View>

              <View style={styles.aiFeatureCard}>
                <Text style={styles.aiFeatureIcon}>📈</Text>
                <Text style={styles.aiFeatureTitle}>Trend Analysis</Text>
                <Text style={styles.aiFeatureDesc}>
                  Identify patterns and emerging issues in community feedback
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.aiActivateButton}
              onPress={() => setAiModalVisible(false)}
            >
              <Text style={styles.aiActivateText}>Activate AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5DDD5', // WhatsApp-like background
  },
  iconPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    color: 'white',
  },
  boldIconText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C5F2D',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  communityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  communitySubtitle: {
    fontSize: 12,
    color: '#B8E6B9',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  roleToggle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  messagesWrapper: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // WhatsApp green
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  announcementMessage: {
    alignSelf: 'center',
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    borderRadius: 8,
    maxWidth: '90%',
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C5F2D',
    marginBottom: 4,
  },
  announcementLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#856404',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  ownMessageText: {
    color: '#333',
  },
  announcementText: {
    color: '#856404',
    fontWeight: '500',
  },
  messageTime: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  ownMessageTime: {
    color: '#666',
  },
  announcementTime: {
    color: '#856404',
    opacity: 0.8,
  },
  budgetTime: {
    color: '#155724',
    opacity: 0.8,
  },
  votingTime: {
    color: '#0C63E4',
    opacity: 0.8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 78, // Positioned beside the input bar
    left: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2C5F2D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  attachText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
    backgroundColor: '#F8F9FA',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C5F2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.7,
  },
  mediaModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  chevron: {
    fontSize: 16,
    color: '#666',
  },
  mediaOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mediaOptionCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  mediaOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mediaOptionIconText: {
    fontSize: 24,
  },
  mediaOptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  aiModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    maxHeight: height * 0.8,
    width: width - 40,
  },
  aiModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  aiModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  aiFeaturesList: {
    padding: 20,
  },
  aiFeatureCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7B68EE',
  },
  aiFeatureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  aiFeatureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  aiFeatureDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  aiActivateButton: {
    margin: 20,
    paddingVertical: 16,
    backgroundColor: '#7B68EE',
    borderRadius: 12,
    alignItems: 'center',
  },
  aiActivateText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CommunityApp;

