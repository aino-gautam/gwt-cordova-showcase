mvn clean gwt:compile war:exploded;
rm -r app/www/*;
#rm target/gwt-cordova-demo/gwtcordovashowcase/bower_components/web-animations-js/web-animations.min.js.gz;
cp -r target/gwt-cordova-demo/* app/www/;
