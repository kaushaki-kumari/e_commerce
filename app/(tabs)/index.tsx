import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import ProductCard from "@/components/home/ProductCard";
import { router, useNavigation } from "expo-router";

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
}

const products: Product[] = [
  {
    id: "1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyRRIVWSL4QuEhb2u6a-0lzXgrSzJ3aAnpw&s",
    title: "Black Leather Jacket",
    price: "89.99",
  },
  {
    id: "2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUljjiDjJ5OtWjV7urp8NCsYOyCXo6z5PZhQ&s",
    title: "Women Flared High-Rise jeans",
    price: "49.99",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    title: "shirts and tops",
    price: "79.99",
  },
  {
    id: "4",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRzunvdCuPz4dBfd8qz-_hIsiegYKiDztlKFerTZBlvP06baUJFuXFX0AMWXzpEmvW3Tiz29LTIHFnxUEFl8h33gPxJhcZNmh93xZI9TZjG",
    title: "Mast & Harbour Women's Party Mojaris",
    price: "55.00",
  },
  {
    id: "5",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTCBHZqMAjxs_ukqpxXwmbRH-zBswTy-opUyame4LHon3ImIYhtuvDK-WJTV-cXRJNLCqtqZKydmqyQGiAVoiZxYlqLEbep",
    title: "Women's Casual Slip Ons ",
    price: "60.00",
  },
  {
    id: "6",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOg_YDbBxp94t5kq-4JFhE-f_BN0BL5hrOu_RX2OZSyknAfuBbFbwUAicVSO6xjeTn2k7QAmwj1zrb7jhb-u27tMNO8YJnUqvYElbrPt8vxO3tpZV2Eww2jg",
    title: " Sleeveless V-neck Dress",
    price: "49.00",
  },
  {
    id: "7",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKLwW-mxhMza3P7Jx7AjuwhPMfSllYOYDRtQ&s",
    title: "A-line kurta set",
    price: "68.00",
  },
  {
    id: "8",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjml9iU6SIoq1nvaBb66VglGs-4zG-wfV2w&s",
    title: "Black Chiffon Dress with Embroidery Yoke",
    price: "52.00",
  },
  {
    id: "9",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSE8fZhrUbU3YEvEFGi1j1GoLw05pzN6NSEUa5F1NhsVopNyRjhHEtlAN_iNwGB5pVP9-wSDTM67GXqzwK9tqW1Uf2hYVFvBAjysPN5sewV",
    title: "Raiyani Fashion V-Neck Fit & Flare ",
    price: "40.00",
  },
  {
    id: "10",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTBWrzO7CE2er50L1EXr5o9USv4bO1c7OVd3R8bTpeP_z5SN7_ufgNx67LV7sg8MUL-fzW_JGH60px5y-Uiucn00vIfeiBt4AUWAPgzqSo",
    title: " Red Georgette Saree",
    price: "38.00",
  },
  {
    id: "11",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTrunehSuY_MI-q0IdeShXwcaToXVVwl2qy_RzCgRUqcjFS-ABJ_Sjkt8BSx5WI9hx1U5EZFZvT-RRkS4OJD53kpYu6-bB6CbdDonTgLIPs8pLfXbn9uR9r",
    title: "Solid Georgette Saree",
    price: "45.00",
  },
  {
    id: "12",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5Qik0lPoefmO1aBRL0F0we5bdA-812oMT-3a2vmx5QsO9nc1MLhmbaDgZDV0lIa0fyJ4Y9yA8q4F6PSy1XU8W_1MrGvyGMskgxmG1Nr_P",
    title: "Regular Kurta with Palazzos",
    price: "50.00",
  },
  {
    id: "13",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVZFNgPBtpiVipnrUPZtECa0PL47Wmw9qPJA&s",
    title: " Printed Straight Kurta",
    price: "57.00",
  },
  {
    id: "14",
    image: "https://images.meesho.com/images/products/295590244/gcjsh_512.webp",
    title: "Nyra Cut kurti",
    price: "65.00",
  },
  {
    id: "15",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlksgpECthiiePEDR-GM3Q5u5mF7McUprYA&s",
    title: "Peach Cotton Ethnic Motifs Dress",
    price: "59.00",
  },
  {
    id: "16",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTt_oDu_O-Lj842X8KxIGKyOiZvlvxT5v0GS4HpP1uP5fVXUCuPKdZGCJqp7o3RqUcTurSh88t6u5DURxH7pv_RudOlHIYvO6fX75QcM4o",
    title: " Embellished Tissue Saree",
    price: "42.00",
  },
  {
    id: "17",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGV_fOrDA6s5zmTxOXOUnx8_gzc-PC3ERQ5g&s",
    title: "Georgette Lucknowi Sequence Work Rosy ",
    price: "48.00",
  },
  {
    id: "18",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtauQLCbVUaVbOux6VLDayqanzTO6VKjyfsQ&s",
    title: "Embroidered Georgette Anarkali Kurta",
    price: "53.00",
  },
  {
    id: "19",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScIxr4OeDtm5xDBpIURCDJc440kEbSC2uXTA&s",
    title: "Kashvi Alluring Women Lehenga",
    price: "20.00",
  },
  {
    id: "20",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyNKSYYFe0zUfIrjDY1NFfGHISrUn4h1hjQ&s",
    title: "gown with attached dupatta",
    price: "89.00",
  },
];

const HomeScreen: React.FC = () => {
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const navigation = useNavigation();
  const handleUserIconPress = () => {
    router.push("/profile"); 
  };
  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      {...item}
      liked={likedItems.includes(item.id)}
      onLikePress={() => toggleLike(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentWrapper}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />

        {/* Location */}
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <Ionicons name="location-outline" size={20} color="#333" />
            <Text style={styles.addressText}>Add Address</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-down" size={28} color="#333" />
        </View>

        {/* Search + Icons */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search products..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="heart" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleUserIconPress}>
            <Feather name="user" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 40,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  addressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#333",
  },
  iconButton: {
    marginLeft: 12,
  },
});
