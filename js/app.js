(function() {
  $(function() {
    this.App = new Backbone.Marionette.Application;
    this.App.addRegions({
      headerRegion: "#header-region",
      mainRegion: "#main-region",
      footerRegion: "#footer-region"
    });
    return this.App.on("initialize:after", function(options) {
      if (Backbone.history) {
        return Backbone.history.start();
      }
    });
  });

}).call(this);
