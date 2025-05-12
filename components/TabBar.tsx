import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  type TabIconProps = {
    color: string;
    size?: number;
    focused?: boolean;
  };

  type IconComponent = React.ComponentType<TabIconProps>;

  const icons: Record<string, IconComponent> = {
    index: ({ color, size = 24 }) => (
      <Ionicons name="home-outline" color={color} size={size} />
    ),
    reflections: ({ color, size = 24 }) => (
      <Ionicons name="book-outline" color={color} size={size} />
    ),
    breathing: ({ color, size = 42 }) => (
      <LinearGradient
        colors={["rgba(25, 145, 230, 0.8)", "rgba(195, 217, 235, 0.8)"]}
        style={styles.cloudIcon}
      >
        <Ionicons name="cloud" color="white" size={size} />
      </LinearGradient>
    ),
    motivation: ({ color, size = 24 }) => (
      <Ionicons name="rose" color={color} size={size} />
    ),
    devs: ({ color, size = 24 }) => (
      <Ionicons name="people-outline" color={color} size={size} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Icon = icons[route.name];
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon
              color={isFocused ? "#5798FB" : "#929292"}
              size={route.name === "breathing" ? 42 : 24}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 4,
    paddingHorizontal: 32,
    marginHorizontal: 40,
    width: "auto",
    borderRadius: 100,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cloudIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#5798FB20",
  },
});
