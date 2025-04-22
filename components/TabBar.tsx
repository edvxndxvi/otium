import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  BookOpen,
  Cloudy,
  House,
  LucideProps,
  Quote,
  UsersRound,
} from "lucide-react-native";
import { JSX } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function TabBar({state,descriptors,navigation,}: BottomTabBarProps) {
  type TabIconProps = {
    color: string;
    size?: number;
    focused?: boolean;
  };

  type IconComponent = React.ComponentType<TabIconProps>;

  const icons: Record<string, IconComponent> = {
    index: ({ color, size = 24, ...props }) => (
      <House color={color} size={size} {...props} />
    ),
    reflections: ({ color, size = 24, ...props }) => (
      <BookOpen color={color} size={size} {...props} />
    ),
    breathing: ({ color, size = 42, ...props }) => (
      <LinearGradient colors={['rgba(25, 145, 230, 0.8)', 'rgba(195, 217, 235, 0.8)']} style={styles.cloudIcon}>
        <Cloudy color="white" size={size} {...props} />
      </LinearGradient>
    ),
    motivation: ({ color, size = 24, ...props }) => (
      <Quote color={color} size={size} {...props} />
    ),
    devs: ({ color, size = 24, ...props }) => (
      <UsersRound color={color} size={size} {...props} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key as string];
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
    padding: 8,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#5798FB20",
  },
});
