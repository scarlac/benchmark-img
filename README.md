# Image Library Memory Benchmark

A React Native project for comparing memory usage between the built-in React Native `Image` component and the `expo-image` component when loading large images.

## Test Method

1. Use Xcode to run a "Release" configuration of the app, with debugging enabled (without Metro running)
2. Wait 10 seconds for memory to settle after app start and all UI elements appear
3. Take note of the memory use (e.g. 30 MB - if you see 200+ MB you are using a debug build)
4. Flip one of the switches for the image library
5. Watch Xcode's Debug Navigator under Memory to see memory peak
6. Take note of the peak (e.g. 150 MB)
7. Wait 20 seconds
8. Take note of where it settles (e.g. 40 MB)
9. Force quit app and re-run the test with the other library/switch

## Results

Memory usage in MB:

| Run | Library    | Cold Boot | Peak    | Settled |
| --- | ---------- | --------- | ------- | ------- |
| 1   | RN Image   | 28.3 MB   | 168 MB  | 168 MB  |
| 2   | Expo Image | 28.1 MB   | 235 MB  | 40.1 MB |
| 3   | RN Image   | 28.2 MB   | 168 MB  | 168 MB  |
| 4   | Expo Image | 28.5 MB   | 130 MB  | 40.3 MB |
| 5   | RN Image   | 28.2 MB   | 168 MB  | 168 MB  |
| 6   | Expo Image | 28.6 MB   | 40.7 MB | 40.3 MB |

**Observations:**

- RN Image consistently peaks at 168 MB and stays there (no memory release)
- Expo Image has variable peak usage but always settles down to ~40 MB
- Expo Image releases memory after loading; RN Image does not
- Using `ExpoImage.clearDiskCache()` and/or `ExpoImage.clearMemoryCache()` provided no immediate memory benefits (possibly due to much-delayed garbage collection?)

Overall, Expo Image is long term more memory efficient, even if it can sometimes cause high spikes.
In an app with many large images, this will greatly reduce memory usage (by 75%) and may improve scrolling performance, which would be most noticable on a phone with 120 fps.
