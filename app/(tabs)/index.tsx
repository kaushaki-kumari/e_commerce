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
  ScrollView,
  Image,
  Platform,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import ProductCard from "@/components/home/ProductCard";
import { router } from "expo-router";
import data from "../../assets/data/products.json";
import Navbar from "@/components/home/Navbar";
import CategoryGrid from "@/components/home/CategoryGrid";
import ImageSlider from "@/components/home/ImageSlider";
import bannerData from "../../assets/data/banner.json";
import PromotionalCards from "@/components/home/PromotionalCards";
import promotionalData from "../../assets/data/promotionalData.json";

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  star: number;
  categories: string[];
}

interface Category {
  id: string;
  title: string;
  imageUrl: string;
  isActive?: boolean;
}

interface ProductData {
  categories: {
    All: Category[];
    Men: Category[];
    Women: Category[];
  };
  products: Product[];
}

const HomeScreen: React.FC = () => {
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productData = data as ProductData;

  const getFilteredProducts = () => {
    let filtered = productData.products;

    if (activeTab !== "All") {
      const tabLower = activeTab.toLowerCase();
      filtered = filtered.filter((product) =>
        product.categories.includes(tabLower)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.categories.includes(selectedCategory)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const tabs = ["All", "Men", "Women", "Kids", "Categories"];

  const handleUserIconPress = () => {
    router.push("/profile");
  };

  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId || null);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      {...item}
      liked={likedItems.includes(item.id)}
      onLikePress={() => toggleLike(item.id)}
    />
  );

  const ListHeader = () => (
    <>
      {activeTab !== "Categories" && (
        <CategoryGrid
          activeTab={activeTab}
          onCategorySelect={handleCategorySelect}
        />
      )}
      <ImageSlider slides={bannerData} />
      <PromotionalCards cards={promotionalData.promotionalCards} />
    </>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentWrapper}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <FontAwesome6 name="location-dot" size={14} color="#1E2637" />
            <Text style={styles.addressText}>Add Delivery Address</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#1E2637" />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Image
              source={require("../../assets/images/favicon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Search products..."
              style={styles.searchInput}
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <Ionicons name="search" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleUserIconPress}
          >
            <MaterialIcons
              name="notifications-none"
              size={22}
              color="#1E2637"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="heart" size={22} color="#1E2637" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleUserIconPress}
          >
            <FontAwesome6 name="user-circle" size={22} color="#1E2637" />
          </TouchableOpacity>
        </View>

        <Navbar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <FlatList
          data={getFilteredProducts()}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fbff",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Platform.OS === "ios" ? 20 : 16,
    paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 40,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    marginHorizontal: Platform.OS === "ios" ? 5 : 0,
  },
  addressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: "500",
    color: "#1E2637",
    marginRight: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: Platform.OS === "ios" ? 5 : 0,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },

  logo: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 12,
    color: "#333",
  },

  searchIconRight: {
    paddingLeft: 8,
  },

  iconButton: {
    marginLeft: 15,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default HomeScreen;
