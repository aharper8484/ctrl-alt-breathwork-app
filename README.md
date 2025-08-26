# Breathwork App (Expo React Native)

Simple breathwork app with customizable inhale / hold / exhale durations and a calming visualizer.

## Getting started

Prereqs: Node 18+, npm 9+, iOS Simulator or Android Emulator (optional), Expo Go app on your phone (optional).

1. Install dependencies

```bash
npm install
```

2. Start the app

```bash
npm run start
```

Scan the QR code with the Expo Go app, or press i to launch iOS simulator, a to launch Android.

## Features

- Inhale / Hold / Exhale phases with configurable seconds
- Start, Pause, Reset controls
- Animated circle visualizer that expands/contracts with phases

## Editing durations

Use the three inputs to set seconds (0-60). Common patterns:

- Box breathing: 4-4-4
- Relaxation: 4-7-8

## Tech

- Expo SDK 53, React Native 0.76, TypeScript

## Project structure

```
src/
  components/
    Buttons.tsx
    DurationInput.tsx
    Visualizer.tsx
  hooks/
    useBreathTimer.ts
  constants/
    breath.ts
  utils/
    number.ts
App.tsx
```
