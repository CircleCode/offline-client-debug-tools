# Tools to debug offline-client

just copy distribution dir in the top directory of dynacase-offline-client (next to the "chrome" directory).

When you start the application with this folder, all extensions in it are loaded.

You'll find:

- DOM inspector (https://developer.mozilla.org/En/DOM_Inspector)
- Venkman debugger (https://developer.mozilla.org/en/Venkman)
- dcpofflinedebug: it adds a debug menu in main window, with entries to start venkman  and dominspector
- anakeenDebug: a sample of custom debug windows. It adds another menu in main window.

The main system used to create these menus is overlays (https://developer.mozilla.org/en/XUL_Overlays)