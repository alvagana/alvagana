//import '../styles/index.scss';
import registerPlugin from './plugin';

// Adds this plugin to the LibreEditor for later activation
// this will ensure that `registerPlugin()` be called after
// CKeditor is initialized on Libretexts page
LibreEditor.a11yplugin = (config) => {
  registerPlugin();
  config.toolbar[12].push('a11ychecker');
};