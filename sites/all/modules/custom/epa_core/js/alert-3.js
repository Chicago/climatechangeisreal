/* alert.js
 To add announcements to pages in snapshot
 */

(function ($) {
  Drupal.behaviors.alert = {
    attach: function(context) {
      var EPA_alert_text = 'This is not the current EPA website. To navigate to the current EPA website, please go to <a style="color:#fff;marging:0 5px;" href="https://www.epa.gov/">www.epa.gov</a>. This website is historical material reflecting the EPA website as it existed on January 19, 2017. This website is no longer updated and links to external websites and some internal pages may not work. ';
     var EPA_alert_container = '<div style="font-size:85%;background-color:#c00;" class="region-alert"><div id="block-epa-admin-epa-admin-public-alert" class="block block-epa-admin contextual-links-region block-alert"><p>' + EPA_alert_text + '<a style="color:#fff;margin:0 5px;" href="snapshot-help.html">More information</a> &raquo;</p></div></div>';
     $('header', context).before(EPA_alert_container);
   }
 }

  /* To alert visitors leaving the snapshot domain */
  var isSnapshotExternalUrl = function(url) {
    var curLocationUrl = location.hostname.toLowerCase();
    var destinationUrl = url.replace(/(https?:)?\/\//, "").split("/")[0].toLowerCase();
    return !(curLocationUrl === destinationUrl);
  };

  jQuery('body a').each(function(){
    var aHrefUrl = jQuery(this).attr('href'); 
    if( aHrefUrl.substr(0,2) !== '//' && (aHrefUrl.substr(0,1) == '/' || aHrefUrl.substr(0,1) == '#') ) {
      return;  // this is a relative link or anchor link
    }
    if(isSnapshotExternalUrl(aHrefUrl)) {
      jQuery(this).click(function (event) {
        event.preventDefault();
        var answer = confirm("You are now leaving the EPA January 19, 2017 Web Snapshot.");
        if (answer) {
          window.location=aHrefUrl;
        }
      });
    }
  });
})(jQuery);
