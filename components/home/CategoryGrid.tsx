import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import data from "@/assets/data/products.json";

interface CategoryItem {
  id: string;
  title: string;
  imageUrl: string;
  isActive?: boolean;
}

interface CategoryGridProps {
  activeTab: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  activeTab,
  onCategorySelect,
}) => {
  const productData = data as { categories: { [key: string]: CategoryItem[] } };
  
  const availableTabs = Object.keys(productData.categories);
  const matchedTab = availableTabs.find(
    tab => tab.toLowerCase() === activeTab.toLowerCase()
  ) || "All";
  
  const activeCategories = productData.categories[matchedTab] || [];
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  useEffect(() => {
    const defaultCategory = activeCategories.find(cat => cat.isActive)?.id || null;
    setSelectedCategoryId(defaultCategory);
    if (defaultCategory) {
      onCategorySelect(defaultCategory);
    } else {
      onCategorySelect("");
    }
  }, [activeTab, activeCategories]);

  const handleCategoryPress = (categoryId: string) => {
    const newSelectedId = selectedCategoryId === categoryId ? null : categoryId;
    setSelectedCategoryId(newSelectedId);
    onCategorySelect(newSelectedId || "");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {activeCategories.map((category: CategoryItem) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
          >
            <View
              style={[
                styles.imageContainer,
                selectedCategoryId === category.id && styles.activeImageContainer,
              ]}
            >
              <Image 
                source={{ uri: category.imageUrl }} 
                style={styles.categoryImage}
                onError={(e) => console.log(`Image load error for ${category.title}:`, e.nativeEvent.error)}
              />
            </View>
            <Text
              style={[
                styles.categoryTitle,
                selectedCategoryId === category.id && styles.activeTitle,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 5,
    color: "#1E2637",
  },
  categoriesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    width: 90,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  activeImageContainer: {
    borderColor: "#7881FC",
    borderWidth: 2,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryTitle: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
  activeTitle: {
    color: "#7881FC",
    fontWeight: "700",
  },
});

export default CategoryGrid;