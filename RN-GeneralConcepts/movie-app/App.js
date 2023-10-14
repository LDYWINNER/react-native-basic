import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => {
    setReady(true);
  };
  const startLoading = async () => {
    const images = loadImages([require("./"), require("./")]);
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts, ...images]);
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return null;
}
