import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  star: number;
  liked: boolean;
  onLikePress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  star,
  liked,
  onLikePress,
}) => {
  const discountPercentage = Math.floor(Math.random() * 41) + 10;
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(star);
    const hasHalfStar = star - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome
          key={`full-${i}`}
          name="star"
          size={14}
          color="#FFD700"
          style={styles.starIcon}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-o"
          size={14}
          color="#FFD700"
          style={styles.starIcon}
        />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star-o"
          size={14}
          color="#FFD700"
          style={styles.starIcon}
        />
      );
    }

    return stars;
  };

  return (
    <View style={styles.card}>
      {/* Image with like button */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
          <FontAwesome
            name={liked ? "heart" : "heart-o"}
            size={18}
            color={liked ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {title}
        </Text>

        {/* Star Rating */}
        <View style={styles.starContainer}>
          {renderStars()}
          <Text style={styles.ratingText}>({star.toFixed(1)})</Text>
        </View>

        {/* Price */}
        <Text style={styles.cardPrice}>${price}</Text>

        {/* Discount */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width / 2 - 25,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 7,
    borderRadius: 20,
  },
  cardContainer:{
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    height:43,
    paddingHorizontal: 12,
    paddingTop: 10,
    lineHeight: 18,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E2637",
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  discountBadge: {
    alignSelf: "flex-start",
    marginHorizontal: 12,
    marginVertical: 4,
  },
  discountText: {
    color: "#FF8C00",
    fontSize: 10,
    fontWeight: "bold",
  },
});
