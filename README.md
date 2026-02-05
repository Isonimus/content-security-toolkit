# Content Security Toolkit

A comprehensive toolkit for implementing content security measures in web applications.

## Features

- Prevent keyboard shortcuts (Ctrl+P, Ctrl+S, etc.)
- Disable context menu (right-click)
- Block printing attempts
- Add watermarks to content
- Works across desktop and mobile browsers
- Highly configurable and extensible

## Installation

```bash
npm install content-security-toolkit
# or
yarn add content-security-toolkit


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

- Intercepts key combinations like Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+Shift+I
- Configurable to block specific shortcuts
- Provides custom event handlers for blocked shortcuts


### 2. Context Menu Protection (ContextMenuStrategy)

**Purpose**: Prevents users from accessing the browser's context menu (right-click menu) to copy content or view page source.

**Implementation Details**:

- Intercepts the contextmenu event on specified elements
- Can be applied to the entire document or specific elements
- Supports custom handler for context menu attempts


### 3. Print Protection (PrintStrategy)

**Purpose**: Prevents users from printing the page or using the browser's print functionality.

**Implementation Details**:

- Intercepts print events (window.print, Ctrl+P)
- Optionally displays a custom message when print is attempted
- Can be configured to allow printing but with watermarks


### 4. Selection Protection (SelectionStrategy)

**Purpose**: Prevents users from selecting and copying text content.

**Implementation Details**:

- Disables text selection via CSS and JavaScript
- Intercepts selection events
- Can be applied to specific elements or the entire document
- Supports custom handler for selection attempts


### 5. Watermark Protection (WatermarkStrategy)

**Purpose**: Adds visible watermarks to the content to discourage unauthorized sharing and identify the source.

**Implementation Details**:

- Creates a grid of semi-transparent watermarks across the content
- Supports customization of text, opacity, density, and positioning
- Includes user identification (userId) to trace leaked content
- **Observer Mechanism**: Implements a MutationObserver to detect when watermarks are removed from the DOM and automatically regenerates them
- Watermarks are positioned in a way that makes them difficult to remove without affecting the content


### 6. DevTools Protection (DevToolsStrategy)

**Purpose**: Detects and responds to attempts to open browser developer tools, which could be used to inspect and modify the page.

**Implementation Details**:

- Uses multiple detection techniques (window.devtools, console timing, resize detection)
- Provides callbacks when DevTools are opened or closed
- Can be configured to take specific actions when DevTools are detected


### 7. Screenshot Protection (ScreenshotStrategy)

**Purpose**: Detects and responds to screenshot attempts.

**Implementation Details**:

- Monitors clipboard events and screen capture APIs
- Blurs content or displays warning message during screenshot attempts
- Provides callbacks when screenshot attempts are detected
- Uses visual tricks to make screenshots less useful (temporary content blurring)


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

While Content Security Toolkit provides robust protection, it's important to understand its limitations:

1. **Client-Side Only**: As a JavaScript library, all protections run in the browser and can potentially be circumvented by determined users with technical knowledge.
2. **No Server-Side Validation**: The library doesn't include server-side components to validate content access or enforce permissions beyond the browser.
3. **Browser Compatibility**: Some protection strategies rely on modern browser APIs and may not work in older browsers.
4. **Mobile Limitations**: Some protections (particularly DevTools detection) are less effective on mobile devices.
5. **Accessibility Impact**: Content protection measures can interfere with accessibility tools. Care should be taken to ensure content remains accessible to users with disabilities.
6. **Performance Considerations**: Extensive protection, particularly watermarking with high density, can impact page performance.
7. **Hardware Screenshots**: The library cannot prevent screenshots taken using physical cameras or external hardware.
8. **Browser Extensions**: Some browser extensions might interfere with or bypass certain protection mechanisms.

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