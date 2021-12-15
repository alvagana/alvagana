const registerPlugin = () => {
  CKEDITOR.plugins.addExternal('a11ychecker', './a11ychecker/plugin.js');

  if (CKEDITOR.config.extraPlugins.length === 0)
    CKEDITOR.config.extraPlugins += 'a11ychecker';
  else
    CKEDITOR.config.extraPlugins += ',a11ychecker';
};

export default registerPlugin;