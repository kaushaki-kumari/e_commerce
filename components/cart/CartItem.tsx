import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CartItemProps = {
  id: string;
  title: string;
  size: string;
  price: number;
  image: { uri: string };
  quantity: number;
  onDelete: (id: string) => void;
  
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  size,
  price,
  image,
  quantity: initialQuantity,
  onDelete,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <View style={styles.cartItem}>
      <Image source={image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSize}>Size: {size}</Text>
        <Text style={styles.itemPrice}>${price}</Text>
      </View>
      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.qtyDecBtn} onPress={decreaseQuantity}>
          <Ionicons name="remove" size={16} color="#000" />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyIncBtn} onPress={increaseQuantity}>
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(id)}>
          <Ionicons name="trash-outline" size={20} color="#ff3b30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemImage: {
    width: 80,
    height: 85,
    borderRadius: 10,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontFamily:'HelveticaBold',
    fontSize: 16,
  },
  itemSize: {
    color: "#888",
    marginTop: 4,
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  qtyIncBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#1A1651",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyDecBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderColor:'#1A1651',
    borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    marginHorizontal: 8,
    fontWeight: "600",
  },
  deleteBtn: {
    marginLeft: 10,
    padding: 4,
  },
});
