# Climate Change is Real

This repository contains copies of the climate change websites, data, and other information that was unceremoniously removed from the Environmental Protection Agency. While the EPA removed the websites, it does not eliminate the risk the climate change poses to people. These pages provide scientifically-based information about climate change, the risk it poses, and what we can do to combat it.

This repository allows others to republish information on climate change on their own website, such as [cityofchicago.org/climatechangeisreal](https://www.cityofchicago.org/climatechangeisreal), so people can still access this vital information. Republishing this information across multiple organizations helps raise the profile of climate change risks even higher and makes a statement that the science that demonstrates the rise in global temperatures cannot simply be deleted.

A list of cities who republished these websites are available [here](cities.md).

## Contributing Changes

We invite others to help maintain this repository. If you notice any broken links, missing pages, or if more pages were removed, please [open an issue](/issues) or [submit a pull request](/pulls).

## Hosting climatechangeisreal

There are two ways the website can be hosted in your own domain by either embedding an existing website or hosting the files on your own web servers.

### Embed Website

An unbranded, static copy of the website is hosted at http://climatechangeisreal.s3-website.us-east-2.amazonaws.com/. This website can be embedded using an `<iframe>` on your domain. These files are updated once this repository is updated, ensuring minimal long-term maintenance.

Please note, this is hosted on an "http" URL, so it will result in mixed-content warnings if embedded on "https" sites. 

### Host Your Own

To begin, clone the repository to your preferred web server with `git clone https://github.com/Chicago/climatechangeisreal.git`.

Configure your web server using the following instructions. We also recommend that you automatically update the repository on a regular basis with a cron job or scheduled task with `git pull origin master`.

If git is not a viable solution, you can also simply [download the entire contents](https://github.com/Chicago/climatechangeisreal/archive/master.zip) as a ZIP file.

#### Apache

To host the site in Apache, you need the following Rewrite rules:

```apache
RewriteEngine On

RewriteRule ^/$ /climatechange

RewriteCond %{REQUEST_URI} !^/sites/(.*)
RewriteCond %{REQUEST_URI} !^/branding/(.*)
RewriteRule ^(.+) $1_.html 
```

#### IIS

Use the [web.config](web.config) file included in the repo.

### Custom Branding

This repository is designed to allow custom branding to match your site's name and logo. The `/branding` folder contains customizable HTML stubs to integrate into your own website. 

  * `logo.png` - Logo used in the site header
  * `header.html` - Contains the header, which includes `logo.png`
  * `footer.html` - Contains the site footer, which includes the copyright notice and reference to the organization
  * `menu.html` - Contains a simple "home button" so users can always navigate back to the `/climatechangeisreal` root. This file likely does not need to be changed.

After cloning the repository or pulling in new updates, simply copy your preferred branding to this folder using the above naming conventions.
