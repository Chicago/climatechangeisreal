"# climatechangeisreal" 

To Host the site in Apache, you need the following Rewrite rules
    RewriteEngine On

    RewriteRule ^/$ /climatechange

    RewriteCond %{REQUEST_URI} !^/sites/(.*)
    RewriteCond %{REQUEST_URI} !^/branding/(.*)
    RewriteRule ^(.+) $1_.html 


To Host the site in IIS, use the web.config included.
