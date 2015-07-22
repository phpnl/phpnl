# phpnl
phpnl.nl website, best site!

# Using gulp.

You can install gulp with the command `npm install`. So all the required modules wil be installed. Further if you want to use gulp.
Navigate to the root direcotry of the website. And run `gulp <task name>`. And the selected task will run.
The list of avaible commands can you find when u press gulp help.

# steps to set it up locally
1. git clone to a directory
2. move into your directory
3. php composer.phar install
4. copy `./config/slack.php-dist` to `./config/slack.php` and change the `slack.team` and `slack.token` in the slack.php
   to generate a token, go to this URL: <https://api.slack.com/web> (bottom of the page)
5. set write permissions to `./var/log` and `./var/cache` and point your browser to your local URL.

_note: all assets are currently pointing to /, so you need to configure the site as a vhost ;)_
