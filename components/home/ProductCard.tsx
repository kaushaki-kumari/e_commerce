import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  liked: boolean;
  onLikePress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, liked, onLikePress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
        <FontAwesome name={liked ? "heart" : "heart-o"} size={18} color={liked ? "red" : "#fff"} />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardPrice}>${price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width / 2 - 24,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },
  imageWrapper: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 7,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF8C00",
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
});
