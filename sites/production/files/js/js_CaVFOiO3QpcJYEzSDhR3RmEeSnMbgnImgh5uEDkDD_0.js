(function ($, Drupal) {

// Remove no-js class
Drupal.behaviors.epa = {
  attach: function (context) {
    $('html.no-js', context).removeClass('no-js');
  }
};

// Accessible skiplinks
Drupal.behaviors.skiplinks = {
  attach: function (context) {
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;

    // Set tabindex on the skiplink targets so IE knows they are focusable, and
    // so Webkit browsers will focus() them.
    $('#main-content, #site-navigation', context).attr('tabindex', -1);

    // Set focus to skiplink targets in Webkit and Opera.
    if (isWebkit || isOpera) {
      $('.skip-links a[href^="#"]', context).click(function() {
        var clickAnchor = '#' + this.href.split('#')[1];
        $(clickAnchor).focus();
      });
    }
  }
};

// Add 'new' class if content is less than 30 days old.
Drupal.behaviors.epaNew = {
  attach: function (context) {
    var now = new Date();
    now = now.getTime();

    $('ins[data-date]', context).each(function () {
      var data = $(this).data(),
        offset = 30 * 24 * 60 * 60 * 1000,
        date = data.date.replace(/\,/g, '/'), // Replace , with / for IE9.
        expired = Date.parse(date) + offset;

      if (now < expired) {
        $(this).addClass('new');
      }
    });
  }
};

// Use jQuery tablesorter plugin.
Drupal.behaviors.tablesorter = {
  attach: function (context) {
    $('table.tablesorter', context).tablesorter();
  }
};

// Add simple accordion behavior.
Drupal.behaviors.accordion = {
  attach: function (context) {
    $('.accordion', context).each(function () {
      var $titles = $(this).find('.accordion-title'),
          $panes = $titles.next('.accordion-pane');
      $panes.hide();
      $titles.each(function () {
        var $target = $(this).next('.accordion-pane');
        $(this).click(function (e) {
          if(!$(this).hasClass('active')) {
            $titles.removeClass('active');
            $panes.slideUp().removeClass('active');
            $(this).addClass('active');
            $target.slideDown().addClass('active');
          }
          else {
            $(this).removeClass('active');
            $target.slideUp().removeClass('active');
          }
          e.preventDefault();
        });
      });
    });
  }
};

// Move header images before .pane-content.
Drupal.behaviors.headerImages = {
  attach: function (context) {
    $('.box', context).each(function() {
        var $image = $('.image.view-mode-block_header:not(.caption, .block_header-processed)', this).first(),
            $box = $(this);

        // Avoid processing this again in the case of nested boxes.
        $image.addClass("block_header-processed");
        $image.detach();
        $box.prepend($image);
    });
  }
};

// Share Links
Drupal.behaviors.shareLinks = {
  attach: function (context) {
    // Add dropdown effect.
    $('#share').find('.share-button').click(function () {
      $(this).toggleClass('on');
    });
  }
};

Drupal.behaviors.setLoginFocus = {
  attach: function (context) {
    $('body.page-user #edit-name').focus();
  }
};

})(jQuery, Drupal);
;
(function ($) {

// Convert main menu into a mobile menu and move original menu.
Drupal.behaviors.mobileMenu = {
  attach: function (context) {
     
    // Create mobile menu container, create mobile bar, and clone the main menu.
    var $mobileNav = $('<div id="mobile-nav" class="mobile-nav"></div>'),
       // $mobileBar = $('<div class="mobile-bar clearfix"><a class="mobile-home" href="/climatechange" rel="home"><span class="mobile-home-icon">Home</span></a> <a class="menu-button" href="#mobile-links">Menu</a></div>'),
        $mobileBar = $('<div class="mobile-bar clearfix"><a class="mobile-home" href="/climatechange" rel="home"><span class="mobile-home-icon">Home</span></a> </div>'),
        $mobileLinks = $('<div id="mobile-links" class="mobile-links element-hidden"></div>'),
        $mainNav = $('.simple-main-nav', context),
        $secondaryNav = $('.simple-secondary-nav', context),
        $newMenu = $mainNav.find('> .nav__inner > .menu').clone();

    // Reset menu list class and remove second level menu items.
    $newMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu sub-menu');
    });
    $newMenu.find('ul').remove();

    // Insert the cloned menus into the mobile menu container.
    $newMenu.appendTo($mobileLinks);

    // Insert the top bar into mobile menu container.
    $mobileBar.prependTo($mobileNav);

    // Insert the mobile links into mobile menu container.
    $mobileLinks.appendTo($mobileNav);

    // Add mobile menu to the page.
    $('.masthead', context).before($mobileNav);

    // Open/Close mobile menu when menu button is clicked.
    var $mobileMenuWrapper = $('#mobile-nav', context).find('.mobile-links'),
        $mobileMenuLinks = $mobileMenuWrapper.find('a');

    $mobileMenuLinks.attr('tabindex', -1);
    $('.mobile-bar .menu-button', context).click(function(e) {
      $(this).toggleClass('menu-button-active');
      $mobileMenuWrapper.toggleClass('element-hidden');
      // Take mobile menu links out of tab flow if hidden.
      if ($mobileMenuWrapper.hasClass('element-hidden')) {
        $mobileMenuLinks.attr('tabindex', -1);
      }
      else {
        $mobileMenuLinks.removeAttr('tabindex');
      }
      e.preventDefault();
    });

    // Set the height of the menu.
    $mobileMenuWrapper.height($(document).height());

    // Detach original menus and reset classes.
    $mainNav.detach().attr('class', 'nav main-nav clearfix');
    $secondaryNav.detach().attr('class', 'nav secondary-nav');

    // Add pipeline class to secondary menu.
    $secondaryNav.find('.secondary-menu').addClass('pipeline');

    // Move main and secondary menus to the top of the page for wide screens.
    $('.masthead').before($secondaryNav);
    $('.masthead').after($mainNav);
  }
};

})(jQuery);
;
(function ($) {

// Accessible drop-down menus
Drupal.behaviors.dropDownMenu = {
  attach: function (context) {

    var $mainMenu = $('.main-nav', context).find('> .nav__inner > .menu'),
        $topItems = $mainMenu.find('> .menu-item'),
        $topLinks = $topItems.find('> .menu-link'),
        $subLinks = $topItems.find('> .menu > .menu-item > .menu-link');

    // Add ARIA roles to menu elements.
    $mainMenu.attr('role', 'menu');
    $topItems.attr('role', 'presentation');
    $topLinks.attr('role', 'menuitem');

    // Add show-menu class when top links are focused.
    $topLinks.focusin(function () {
      $(this).parent().addClass('show-menu');
    });
    $topLinks.focusout(function () {
      $(this).parent().removeClass('show-menu');
    });

    // Add show-menu class when links are focused.
    $subLinks.focusin(function () {
      $(this).parent().parent().parent().addClass('show-menu');
    });
    $subLinks.focusout(function () {
      $(this).parent().parent().parent().removeClass('show-menu');
    });
  }
};

// hoverIntent
Drupal.behaviors.epaHoverIntent = {
  attach: function (context, settings) {
    if ($().hoverIntent) {
      var config = {
        sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
        interval: 200,   // number = milliseconds of polling interval
        over: Drupal.epa.epaHoverIntentOver,
        timeout: 250,   // number = milliseconds delay before onMouseOut function call
        out: Drupal.epa.epaHoverIntentOut
      };
      $('.main-nav > .nav__inner > .menu > .menu-item').hoverIntent(config);
    }
  }
};

Drupal.epa = Drupal.epa || {};

Drupal.epa.epaHoverIntentOver = function () {
  "use strict";
  $(this).addClass('show-menu');
}

Drupal.epa.epaHoverIntentOut = function() {
  "use strict";
  $(this).removeClass('show-menu');
}

})(jQuery);
;

$ = jQuery;
$(document).ready(function () {

    $("#brand-header").load("/branding/header.html"
       , function (response, status, xhr) {
           if (status == "error") {
               var msg = "Sorry but there was an error: ";
               alert('error');
               // $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
           }
       }
    );

    $("#brand-menu").load("/branding/menu.html");
    $("#brand-footer").load("/branding/footer.html");

    $("a").on("click", function () {
        var href = $(this).attr("href");
        if (href.indexOf("#") >-1 ) {
            return true;
        } 
         
        if (href.startsWith("/")) {
            if (href.endsWith("/")) {
                href = href.slice(0, -1);
                alert(href);
            }
            href = href + "_.html";
            document.location.href = href;
            return false; 
        }
        return true;
    });



});