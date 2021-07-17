import { openBrowserAsync } from "expo-web-browser";
import Color from "common/constants/colors";

export const openBrowser = (url: string) => openBrowserAsync(url, {
    toolbarColor: Color.OFF_WHITE,
    controlsColor: Color.ORANGE,
    secondaryToolbarColor: Color.OFF_WHITE,
});
