import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '@clerk/clerk-expo';
import { toggleLike } from '../actions/post.action';
import Toast from 'react-native-toast-message';

const PostCard = ({ post }) => {
  const { user } = useUser();
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === user?.id)
  );
  const [likesCount, setLikesCount] = useState(post._count.likes);

  const handleLike = async () => {
    try {
      setHasLiked((prev) => !prev);
      setLikesCount((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      setHasLiked((prev) => !prev);
      setLikesCount((prev) => prev + (hasLiked ? 1 : -1));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to like post',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: post.author.image || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{post.author.name}</Text>
          <Text style={styles.username}>@{post.author.username}</Text>
          <Text style={styles.time}>
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <Ionicons
            name={hasLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={hasLiked ? '#ff3b30' : '#666'}
          />
          <Text style={styles.actionText}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post._count.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    color: '#666',
    fontSize: 14,
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: Dimensions.get('window').width - 30,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    color: '#666',
    fontSize: 14,
  },
});

export default PostCard;