import * as Segment from 'expo-analytics-segment';

export function initialize(): void {
    if (!__DEV__) {
        Segment.initialize({
            iosWriteKey: "gv4OfhvA4Cj3WwyPNUk0Qm3fyfLvj1Uc",
            androidWriteKey: "YEGyUJecngvXSJKRT1FWc8yKvizYROCx",
        });
    }
}
