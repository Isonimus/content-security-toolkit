import { ContentProtector } from 'content-security-toolkit';

const protector = new ContentProtector({
  // Enable/disable specific protections
  preventKeyboardShortcuts: true,
  preventContextMenu: true,
  preventPrinting: true,
  preventSelection: true,
  
  // Enable watermarking
  enableWatermark: true,
  watermarkOptions: {
    text: 'CONFIDENTIAL',
    userId: 'user-123',
    opacity: 0.2,
    density: 3
  },
  
  // Target specific element (default is document.body)
  targetElement: document.getElementById('protected-content') || undefined,
  
  // Custom event handlers
  customHandlers: {
    onPrintAttempt: (event) => {
      console.log('Print attempt detected');
      alert('Printing is disabled for this content');
    },
    onKeyboardShortcutBlocked: (event) => {
      console.log('Keyboard shortcut blocked', event.key);
    },
    onDevToolsOpen: (isOpen) => {
      console.log(`DevTools is ${isOpen ? 'open' : 'closed'}`);
      if (isOpen) {
        alert('For security reasons, this content is not available while developer tools are open.');
      }
    }
  }
});

// Apply protections
protector.protect();