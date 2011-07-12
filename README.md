# Tools to debug offline-client

This repo provides tools to debug offline-client:

- go: a script erasing all jsm cache to force reload of all source files at startup
- distribution: 
When you start the application with this directory, all extensions in it are automatically loaded. It contains:
	- DOM inspector (https://developer.mozilla.org/En/DOM_Inspector)
	- Venkman debugger (https://developer.mozilla.org/en/Venkman)
	- sqlite-manager (http://code.google.com/p/sqlite-manager/)
	- dcpofflinedebug: it adds a debug menu in main window, with entries to start venkman, dominspector and sqlite-manager
	- anakeenDebug: a sample of custom debug windows. It adds another menu in main window.


just copy provided files in the top directory of dynacase-offline-client (next to the "chrome" directory).


The main system used to create these menus is overlays (https://developer.mozilla.org/en/XUL_Overlays)