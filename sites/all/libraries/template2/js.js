(function ($) {

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
                $('.skip-links a[href^="#"]', context).click(function () {
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
        expired = Date.parse(data.date) + offset;

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
                        if (!$(this).hasClass('active')) {
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
            $('.image.mode-block_header:not(.caption)', context).each(function () {
                var $image = $(this),
          $parent = $image.parent();

                $image.detach();
                $parent.before($image);
            });
        }
    };

    // Convert main menu into a mobile menu and move original menu.
    Drupal.behaviors.mobileMenu = {
        attach: function (context) {
            alert(1); 
            // Create mobile menu container, create mobile bar, and clone the main menu.
            var $mobileNav = $('<nav id="mobile-nav" class="mobile-nav"></nav>'),
        $mobileBar = $('<div class="mobile-bar clearfix"><a class="mobile-home" href="https://www.epa.gov/" rel="home"><span class="mobile-home-icon">Home</span></a> <a class="menu-button" href="#mobile-links">Menu</a></div>'),
        $mobileLinks = $('<div id="mobile-links" class="mobile-links element-hidden"></div>'),
        $mainNav = $('.simple-main-nav', context),
        $secondaryNav = $('.simple-secondary-nav', context),
        $newMenu = $mainNav.find('> .menu').clone();

            // Reset menu list class and remove second level menu items.
            $newMenu.attr('class', 'menu').find('ul').each(function () {
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
            $('.mobile-bar .menu-button', context).click(function (e) {
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

            var breakpoint = 640; /* 40em */
            if (document.documentElement.clientWidth >= breakpoint) {

                // Detach original menus and reset classes.
                $mainNav.detach().attr('class', 'nav main-nav clearfix');
                $secondaryNav.detach().attr('class', 'nav secondary-nav');

                // Add pipeline class to secondary menu.
                $secondaryNav.find('.secondary-menu').addClass('pipeline');

                // Move main and secondary menus to the top of the page for wide screens.
                $('.masthead').before($secondaryNav);
                $('.masthead').after($mainNav);
            }

        }
    };

    // Share Links
    Drupal.behaviors.shareLinks = {
        attach: function (context) {
            var popURL = encodeURIComponent(window.location.href),
        title = encodeURIComponent(document.title),
        fb = 'https://www.facebook.com/sharer.php?u=' + popURL + '&t=' + title,
        pin_media = encodeURIComponent('https://www.epa.gov/sites/all/themes/epa/img/epa-seal.png'),
        twitter = 'https://twitter.com/intent/tweet?original_referer=' + popURL + '&text=' + title + '&url=' + popURL + '&via=EPA&count=none&lang=en',
        gplus = 'https://plus.google.com/share?url=' + popURL,
        pin = 'http://pinterest.com/pin/create/button/?url=' + popURL + '&description=' + title + 'media=' + pin_media,
        $shareLinks = $('<li id="share" class="menu-item"><button class="share-button">Share</button><ul><li class="share-facebook"><a class="share-link" href="' + fb + '" title="Share this page">Facebook</a></li><li class="share-twitter"><a class="share-link" href="' + twitter + '" title="Tweet this page">Twitter</a></li><li class="share-googleplus"><a class="share-link" href="' + gplus + '" title="Plus 1 this page">Google+</a></li><li class="share-pinterest"><a class="share-link" href="' + pin + '" title="Pin this page">Pinterest</a></li></ul></li>');

            // Add dropdown effect.
            $shareLinks.find('.share-button').click(function () {
                $(this).toggleClass('on');
            });

            // Add share links to utility menu.
            $('#block-pane-epa-web-area-connect .utility-menu', context).append($shareLinks);
        }
    };

})(jQuery);
