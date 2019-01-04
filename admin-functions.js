(function($) {

    var MyYoastPlugin = function()
    {
        YoastSEO.app.registerPlugin('myYoastPlugin', {status: 'loading'});

        this.getData();
    };

    MyYoastPlugin.prototype.getData = function()
    {

        var _self = this,
            $text = $('#acf-field-yoast_text');

        _self.custom_content = $text.val();

        YoastSEO.app.pluginReady('myYoastPlugin');

        YoastSEO.app.registerModification('content', $.proxy(_self.getCustomContent, _self), 'myYoastPlugin', 5);

    };

    MyYoastPlugin.prototype.getCustomContent = function (content)
    {
      var mceid = $('#acf-yoast_fancyeditor textarea').prop('id');
      return this.custom_content + tinymce.editors[mceid].getContent() + content;
    };

    $(window).on('YoastSEO:ready', function ()
    {
      new MyYoastPlugin();
    });
})(jQuery);