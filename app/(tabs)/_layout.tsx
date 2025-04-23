import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, Platform, SafeAreaView } from "react-native";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === "index") {
              return (
                <Image
                  source={require("@/assets/images/favicon.png")}
                  style={{
                    width: 28,
                    height: 28,
                    resizeMode: "contain",
                  }}
                />
              );
            }

            let iconName: any;
            if (route.name === "cart") iconName = focused ? "cart" : "cart-outline";
            if (route.name === "(profile)") iconName = focused ? "settings" : "settings-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1E2637",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            height: Platform.OS === "ios" ? 80 : 60, 
            paddingTop: 4,
            paddingBottom: Platform.OS === "ios" ? 20 : 0,
          },
          contentStyle: { backgroundColor: "#fff" },
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
                : "Setting"}
            </Text>
          ),
          headerShown: false,
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="cart" />
        <Tabs.Screen name="(profile)" />
      </Tabs>
    </SafeAreaView>
  );
}
