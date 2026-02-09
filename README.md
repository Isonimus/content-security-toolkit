# Content Security Toolkit

[![npm version](https://img.shields.io/npm/v/content-security-toolkit.svg)](https://www.npmjs.com/package/content-security-toolkit) [![Build Status](https://github.com/Isonimus/content-security-toolkit/actions/workflows/publish.yml/badge.svg)](https://github.com/Isonimus/content-security-toolkit/actions) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A comprehensive toolkit for implementing content security measures in web applications — lightweight, modular, and TypeScript-friendly.

## Features

- Developer tools detection and response (DevTools detection)
- Screenshot detection and response (blur, warnings, callbacks)
- Watermarking with automatic regeneration (MutationObserver-protected)
- Keyboard shortcut prevention (copy/print/inspect shortcuts)
- Context menu blocking
- Print prevention and watermark-on-print support
- Selection / copy prevention
- Extension detection (detect suspicious browser extensions)
- Frame embedding protection (prevent unauthorized iframe embedding)
- Modular, strategy-based architecture — enable/disable strategies independently
- TypeScript typings, tests, and CI-ready workflow
- Lightweight and easy to integrate into web apps

## Installation

```bash
npm install content-security-toolkit
# or
yarn add content-security-toolkit
```

## Usage

### Simple usage (quick start)

```javascript
import { ContentProtector } from 'content-security-toolkit'

// Protect the whole document with sensible defaults
const protector = new ContentProtector()
protector.protect()

// Later...
protector.unprotect()
protector.dispose()
```

### Custom usage (advanced configuration)

```javascript
import { ContentProtector } from 'content-security-toolkit'

const protector = new ContentProtector({
  targetElement: '#viewer',            // CSS selector or HTMLElement
  enableWatermark: true,
  watermarkOptions: {
    text: 'CONFIDENTIAL',
    opacity: 0.12,
    density: 3,
  },
  preventDevTools: true,
  preventScreenshots: true,
  preventEmbedding: true,
  debugMode: false,
  // Optional callbacks
  customHandlers: {
    onDevToolsDetected: () => console.warn('DevTools opened'),
    onScreenshotDetected: () => alert('Screenshot detected'),
  },
})

protector.protect()
```

### Framework quick examples

React (hooks):

```jsx
import React, { useEffect } from 'react'
import { ContentProtector } from 'content-security-toolkit'

function Viewer() {
  useEffect(() => {
    const protector = new ContentProtector({ enableWatermark: true })
    protector.protect()
    return () => protector.dispose()
  }, [])

  return <div id="protected-content">Protected content</div>
}
```

Vue 3 (Composition API):

```js
import { onMounted, onUnmounted } from 'vue'
import { ContentProtector } from 'content-security-toolkit'

export default {
  setup() {
    let protector
    onMounted(() => {
      protector = new ContentProtector({ targetElement: '#protected-content' })
      protector.protect()
    })
    onUnmounted(() => protector?.dispose())
  },
}
```

### API highlights

- `ContentProtector.protect()` — enable protection
- `ContentProtector.unprotect()` — disable protection
- `ContentProtector.dispose()` — cleanup resources
- `ContentProtector.getStrategy(name)` — access a strategy instance for advanced control
- Options include: `targetElement`, `enableWatermark`, `watermarkOptions`, `preventDevTools`, `preventScreenshots`, `preventEmbedding`, `debugMode`, `customHandlers`

_For full examples, see `examples/` and `examples/advanced/advanced_example.ts`._
### Where to start

- Use the simple example to get protection running quickly.
- Add `customHandlers` and `watermarkOptions` to tailor behaviour.
- See `examples/` for runnable demos and the `src/` folder for strategy implementations.

Content Security Toolkit is a comprehensive JavaScript/TypeScript library designed to protect sensitive web content from unauthorized copying, extraction, and distribution. It implements multiple layers of protection strategies that work together to safeguard digital content while maintaining a good user experience for legitimate users.

Unlike traditional DRM (Digital Rights Management) systems that often require specialized software or hardware, Content Security Toolkit operates entirely within the browser environment, making it lightweight, easy to implement, and compatible with standard web applications.

## Core Architecture

The library is built on a modular, strategy-based architecture:

- **ContentProtector**: The main class that orchestrates all protection strategies
- **ProtectionStrategy**: The interface implemented by all protection mechanisms
- **Strategy Implementations**: Individual protection mechanisms that can be enabled/disabled independently


This architecture allows for flexible configuration and easy extension with new protection strategies.

## Available Protection Strategies

### 1. Keyboard Shortcut Protection (KeyboardStrategy)

**Purpose**: Prevents users from using keyboard shortcuts to copy, save, print, or otherwise extract content.

**Implementation Details**:

- Intercepts key combinations like Ctrl/Cmd+C, Ctrl/Cmd+P, Ctrl/Cmd+S, Ctrl+Shift+I
- Configurable to block specific shortcuts
- Provides custom event handlers for blocked shortcuts


### 2. Clipboard Protection (ClipboardStrategy)

**Purpose**: Intercepts clipboard operations to prevent programmatic copying or tampering via clipboard events.

**Implementation Details**:

- Listens to `copy`, `cut` and `paste` events
- Can clear or override clipboard data or present a custom handler
- Useful in combination with selection and context menu protections


### 3. Context Menu Protection (ContextMenuStrategy)

**Purpose**: Prevents users from accessing the browser's context menu (right-click menu) to copy content, save assets, or inspect elements.

**Implementation Details**:

- Intercepts the `contextmenu` event on specified elements
- Can be applied to the entire document or specific elements
- Supports custom handler for right-click attempts


### 4. Print Protection (PrintStrategy)

**Purpose**: Prevents or modifies the browser's print behavior to protect content (optionally watermark on print).

**Implementation Details**:

- Intercepts `window.print` and print keyboard shortcuts
- Optionally adds a print-only watermark or blocks printing
- Provides hooks for custom messaging when print is attempted


### 5. Selection Protection (SelectionStrategy)

**Purpose**: Prevents users from selecting and copying text content.

**Implementation Details**:

- Disables text selection via CSS and JavaScript
- Intercepts selection events and clears selection ranges
- Can be applied selectively to elements or site-wide


### 6. Watermark Protection (WatermarkStrategy)

**Purpose**: Adds visible watermarks to the content to discourage unauthorized sharing and identify the source.

**Implementation Details**:

- Creates a grid of semi-transparent watermarks across the content
- Supports customization of text, opacity, density, and positioning
- Includes user identification (userId) to trace leaked content
- **Observer Mechanism**: Implements a MutationObserver to detect when watermarks are removed from the DOM and automatically regenerates them


### 7. DevTools Protection (DevToolsStrategy)

**Purpose**: Detects and responds to attempts to open browser developer tools, which could be used to inspect and modify the page.

**Implementation Details**:

- Uses multiple detection techniques (console timing, resize detection, feature checks)
- Provides callbacks when DevTools are opened or closed
- Can be configured to take specific actions (log, blur, overlay) when DevTools are detected


### 8. Screenshot Protection (ScreenshotStrategy)

**Purpose**: Detects and responds to screenshot attempts.

**Implementation Details**:

- Monitors clipboard events and screen capture API usage
- Blurs content or displays a warning message during screenshot attempts
- Provides callbacks when screenshot attempts are detected
- Uses visual techniques to make screenshots less useful (temporary content blurring)


### 9. Extension Detection (BrowserExtensionDetectionStrategy)

**Purpose**: Detects suspicious or known browser extensions that may bypass protections.

**Implementation Details**:

- Heuristics and detection strategies to identify extensions
- Callbacks for detected extensions
- Optionally disable protections or report detections to a backend


### 10. Frame Embedding Protection (FrameEmbeddingProtectionStrategy)

**Purpose**: Detects and prevents the page from being embedded into unauthorized frames.

**Implementation Details**:

- Checks `top`/`window` relationships and hostnames
- Optionally break out of frames or display a blocking overlay
- Configurable whitelist of allowed origins


## Technical Deep Dive

### Watermark Observer Mechanism

The watermark protection includes a sophisticated observer system that ensures watermarks remain present even if they're removed from the DOM.
This observer continuously monitors the DOM for any attempts to remove watermark elements and immediately regenerates them when such attempts are detected.

### DevTools Detection Techniques

The DevTools protection strategy employs multiple detection methods to identify when developer tools are opened:

1. **Console Timing Difference**: Measures the execution time difference between regular code and code that triggers debugger features
2. **Window Size Monitoring**: Detects the window size changes that occur when DevTools are opened
3. **Feature Detection**: Checks for the presence of DevTools-specific objects and properties
4. **Debugger Statement Handling**: Uses strategic debugger statements that behave differently when DevTools are open


### Screenshot Detection

The screenshot protection uses several techniques to detect and respond to screenshot attempts:

1. **Clipboard Event Monitoring**: Detects copy events that might indicate a screenshot
2. **Visual Feedback**: Can temporarily blur content or display a warning when screenshot attempts are detected
3. **Screen Capture API Interception**: Monitors and responds to browser screen capture API calls


## Known Limitations and Issues

While Content Security Toolkit provides robust protection, it's important to understand its limitations and where protections are best applied.

### Browser compatibility & limitations

| Feature | Desktop | Mobile | Notes |
|---|---:|---:|---|
| DevTools detection | Good on modern Chromium & Firefox | Limited | Mobile devices have limited toolsets; detection techniques may be unreliable.
| Screenshot detection | Partial | Partial | Can detect some screen-capture APIs and clipboard activity; cannot prevent OS-level screenshots or photos.
| Watermarking | Good | Good | MutationObserver + DOM-based watermarks work on modern browsers; heavy density may impact layout and perf.
| Extension detection | Limited | N/A | Heuristic-based; may produce false positives and won't detect all malicious extensions.
| Frame embedding protection | Good | Good | Works when combined with proper server headers (CSP/X-Frame-Options) for stronger enforcement.

> Notes: Protections operate in the browser and are best used as a **deterrent** and part of defense-in-depth. They are not a substitute for server-side access control or legal protections.

### Other important limitations

- **Client-Side Only**: All protections run in the browser and can potentially be bypassed by determined attackers.
- **Accessibility Impact**: Some protections can affect accessibility tools; test and provide alternative access for users who need it.
- **Performance Considerations**: High-density watermarks or many simultaneous observers may impact rendering performance on low-end devices.
- **Hardware Screenshots**: Cannot prevent photos taken with external cameras or devices.
- **Browser Extensions**: Extensions may interfere with or bypass protections; treat extension detection as heuristic rather than absolute.

Unlike DRM systems that encrypt content and control playback through specialized software, Content Security Toolkit focuses on preventing common extraction methods while maintaining compatibility with standard web browsers. It's designed as a deterrent rather than an unbreakable protection system.

## Best Practices for Implementation

For optimal protection, consider these implementation guidelines:

1. **Layer Multiple Strategies**: Enable multiple protection mechanisms for defense in depth
2. **Custom Handlers**: Implement custom handlers to log protection events and take appropriate actions
3. **User Education**: Inform users about content protection and acceptable use policies
4. **Selective Protection**: Apply protection only to sensitive content to minimize performance impact
5. **Regular Updates**: Keep the library updated to benefit from security improvements
6. **Complementary Measures**: Combine with server-side protections and legal terms of use
7. **Accessibility Considerations**: Test with accessibility tools and provide alternative access methods for legitimate users with special needs

## Contributing

Contributions are welcome! To contribute:

- Fork the repository and create a feature branch from `main`.
- Run `npm install`, `npm run lint`, `npm test`, and `npm run build` locally before pushing.
- Open a clear pull request explaining the change and link any relevant issues.
- Add tests for new behavior and update the README/examples when adding features.

Please be respectful and follow the project's Code of Conduct (see below).

## Code of Conduct

This project follows the Contributor Covenant. By participating you agree to the terms in `CODE_OF_CONDUCT.md`.

---
