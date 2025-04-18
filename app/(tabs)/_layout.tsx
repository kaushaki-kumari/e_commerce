import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

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
          height: 60,
          paddingTop:4
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontFamily: focused ? "HelveticaBold" : "helvetica",
              fontSize: 12,
              color,
             
            }}
          >
            {route.name === "index"
              ? "Home"
              : route.name === "cart"
              ? "Cart"
              : route.name === "categories"
              ? "Categories"
              : "Setting"}
          </Text>
        ),
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="(profile)" />
    </Tabs>
  );
}
