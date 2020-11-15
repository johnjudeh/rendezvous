import * as Segment from 'expo-analytics-segment';

export function initialize(): void {
    if (!__DEV__) {
        Segment.initialize({
            iosWriteKey: "GbbXfM4ReUdYFxmMSPegjaLZQ3dMFYTg",
            androidWriteKey: "onBrGs4IbG2v9RM04LB0WvMU4828vlRC",
        });
    }
}
