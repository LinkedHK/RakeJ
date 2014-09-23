CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for a single toolbar row

    config.toolbar = [
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline'] },
        { name: 'links', items: [ 'Link', 'Unlink' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList','-','JustifyLeft', 'JustifyCenter', 'JustifyRight']}
    ];

    config.toolbarGroups = [
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] }
    ];

    // The default plugins included in the basic setup define some buttons that
    // are not needed in a basic editor. They are removed here.
    config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
    config.removePlugins = 'contextmenu';

    // Dialog windows are also simplified.
    config.removeDialogTabs = 'link:advanced';
    config.linkShowAdvancedTab = false;
    config.linkShowTargetTab = false;
    config.linkElement = false;
    config.removeButtons = 'Anchor';


};
