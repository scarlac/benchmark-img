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
9. Flip off the switch again
10. Wait 30 seconds
11. Take note of where it settles (e.g. 30 MB)
12. Force quit app and re-run the test with the other library/switch

## Results

Memory usage test performed on an iPhone 14 Pro, iOS 18.7.3:

| Run | Library     | Cold Boot | Peak    | Settled | Unmounted |
| --- | ----------- | --------- | ------- | ------- | --------- |
| 1   | RN Image    | 28.3 MB   | 169 MB  | 169 MB  | 169 MB    |
| 2   | RN Image    | 28.3 MB   | 169 MB  | 168 MB  | 168 MB    |
| 3   | RN Image    | 28.6 MB   | 169 MB  | 169 MB  | 169 MB    |
| 4   | Expo Image  | 28.3 MB   | 198 MB  | 40.1 MB | 40 MB     |
| 5   | Expo Image  | 28.2 MB   | 40.4 MB | 40.1 MB | 40 MB     |
| 6   | Expo Image  | 28.6 MB   | 40.8 MB | 40.4 MB | 40.4 MB   |
| 7   | Nitro Image | 28.4 MB   | 169 MB  | 168 MB  | 28.9 MB   |
| 8   | Nitro Image | 28.3 MB   | 169 MB  | 168 MB  | 29 MB     |
| 9   | Nitro Image | 28.1 MB   | 169 MB  | 169 MB  | 29.2 MB   |

**Observations:**

- RN Image consistently peaks at 168 MB and stays there (no memory release)
- Expo Image has a brief large memory spike but always settles down to ~40 MB
- Expo Image releases memory after loading; RN Image does not
- Using `ExpoImage.clearDiskCache()` and/or `ExpoImage.clearMemoryCache()` provided no immediate memory benefits (possibly due to much-delayed garbage collection?)
- When unmounted, then remounted, Expo Image still causes a large spike, but re-settles in the low ~40 MB again
- Only Nitro Image seemed to release most of its memory on unmount, the rest seemed to cache/leak it
- Between RN, Expo, and Nitro, Nitro was the only one that had degraded image quality

Overall, Expo Image is more memory memory efficient, even if it can sometimes cause high spikes.
In an app with many large images, this will greatly reduce memory usage (by 75%) and may improve scrolling performance, which would be most noticable on a phone with 120 fps.
