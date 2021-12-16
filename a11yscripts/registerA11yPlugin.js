const registerPlugin = () => {
  CKEDITOR.plugins.addExternal('a11ychecker', './a11ychecker/plugin.js');

  if (CKEDITOR.config.extraPlugins.length === 0)
    CKEDITOR.config.extraPlugins += 'a11ychecker';
  else
    CKEDITOR.config.extraPlugins += ',a11ychecker';
};

// Adds this plugin to the LibreEditor for later activation
// this will ensure that `registerPlugin()` be called after
// CKeditor is initialized on Libretexts page
LibreEditor.a11yplugin = (config) => {
  registerPlugin();
  config.toolbar[12].push('a11ychecker');
};