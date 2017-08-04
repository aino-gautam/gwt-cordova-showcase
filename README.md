# gwt-cordova-showcase


A project to demonstrate the GWT Cordova library which is an experimental Wrapper for the Apache Cordova API, similar to GWT Phonegap.

Process to build and launch showcase:

1. Run `mvn clean package` to build and package the library locally.

2. To run gwt project using `codesvr` run `gwt:codeserver` goal provided by net.ltgt.gwt.maven - `gwt-maven-plugin`.

3. The above goal will provide codesvr url to launch application e.g. : The code server is ready at http://127.0.0.1:9876/
   Hit the url given in your browser. If it doesn't lunches actual showcase, append emulated html to url  e.g. http://127.0.0.1:9876/gwtcordovashowcase/index-emul.html 


   
