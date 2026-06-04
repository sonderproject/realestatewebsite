"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

// Catches any render/runtime error in its subtree (e.g. a WebGL/Three.js
// failure) and shows a static fallback instead of crashing the whole page.
export default class SafeBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Swallow — the fallback is shown instead. Logged for debugging.
    if (typeof console !== "undefined") {
      console.warn("SafeBoundary caught an error:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
