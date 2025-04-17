import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === "index") iconName = "home";
          if (route.name === "cart") iconName = "cart";
          if (route.name === "categories") iconName = "grid";
          if (route.name === "(profile)") iconName = "settings";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7881FC",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontFamily: "helvetica", 
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="categories" options={{ title: "Categories" }} />
      <Tabs.Screen name="(profile)" options={{ title: "Setting" }} />
    </Tabs>
  );
}
