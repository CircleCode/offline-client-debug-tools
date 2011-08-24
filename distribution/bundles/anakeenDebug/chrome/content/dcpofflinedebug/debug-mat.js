// start_venkman();

Components.utils.import("resource://gre/modules/Services.jsm");

Components.utils.import("resource://modules/logger.jsm");
Components.utils.import("resource://modules/docManager.jsm");
Components.utils.import("resource://modules/events.jsm");

function testGetEntities() {

    var nsIFilePicker = Components.interfaces.nsIFilePicker;

    var sourceLocale = [];

    // Select base for all locales
    var baseFp = Components.classes["@mozilla.org/filepicker;1"]
            .createInstance(nsIFilePicker);
    baseFp.init(window, "Locales base directory", nsIFilePicker.modeGetFolder);

    var baseRv = baseFp.show();
    if (baseRv == nsIFilePicker.returnOK) {
        var baseDir = baseFp.file;
        var basePath = baseFp.file.path;

        // select locale from which others should be updated
        var sourceFp = Components.classes["@mozilla.org/filepicker;1"]
                .createInstance(nsIFilePicker);
        sourceFp.init(window, "Source Locale directory",
                nsIFilePicker.modeGetFolder);

        var sourceRv = sourceFp.show();
        if (sourceRv == nsIFilePicker.returnOK) {
            var sourceDir = sourceFp.file;
            var sourcePath = sourceFp.file.path;

            // get directory for each locale
            var localeDirectories = [];
            while (sourceDir.directoryEntries.hasMoreElements()) {
                var file = sourceDir.directoryEntries.getNext();
                if (file.isDirectory()) {
                    localeDirectories.push(file);
                }
            }
        }
    }
    ;

};

function getLocaleFiles(dir, localeFiles, relativePath) {
    while (dir.directoryEntries.hasMoreElements()) {
        var file = sourceDir.directoryEntries.getNext();
        if (file.isDirectory()) {
            relativePath.push(file.leafName);
            getLocaleFiles(file, localeFiles, relativePath);
            relativePath.pop();
        } else {
            localeFiles.push({
                file : file,
                relativePath : relativePath,
                leafName : file.leafName,
                values : getLocaleStrings(file)
            });
        }
    }
}

function getLocaleStrings(file) {
    if(file.leafName.match(/.*\.dtd/)){
        return getLocaleStringsFromDtd(file);
    } else if(file.leafName.match(/.*\.properties/)){
        return getLocaleStringsFromProperties(file);
    } else {
        alert(file.leafName + ' could not be detected as a dtd or properties file');
    }
}

function getLocaleStringsFromDtd(file){
    var bundle = {};
    
    return bundle;
}

function getLocaleStringsFromProperties(file){
    var bundle = {};
    
    return bundle;
}

function checkUpdates() {
    var updateListener = {

        onProgress : function(request, position, totalSize) {
            alert('update check progress : ' + position + '/' + totalSize);
        },

        onCheckComplete : function(request, updates, updateCount) {
            // after retrieve sucessfully updates.xml infos, app
            // will execute this code

            alert('update check complete ( ' + updateCount
                    + ' updates available )');

            if (updateCount > 0) {
                // don't ask user for applying updates. do it at
                // all.
                var updater = Components.classes["@mozilla.org/updates/update-service;1"]
                        .createInstance(Components.interfaces.nsIApplicationUpdateService);

                // select the most important update (major, complete)
                var update = updater.selectUpdate(updates, updateCount);
                var download = updater.downloadUpdate(update, false);

                // if downloadUpdate is async, why return a
                // simple useless state string?
                alert('download status: ' + download);
            }
        },

        onError : function(request, update) {
            alert('update check error');
        },

        QueryInterface : function(aIID) {
            if (!aIID.equals(Components.interfaces.nsIUpdateCheckListener)
                    && !aIID.equals(Components.interfaces.nsISupports))
                throw Components.results.NS_ERROR_NO_INTERFACE;
            return this;
        }
    };

    var checker = Components.classes["@mozilla.org/updates/update-checker;1"].

    createInstance(Components.interfaces.nsIUpdateChecker);

    checker.checkForUpdates(updateListener, true);

};