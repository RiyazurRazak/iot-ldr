/**
   PostHTTPClient.ino

    Created on: 21.11.2016

*/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

/* this can be run with an emulated server on host:
        cd esp8266-core-root-dir
        cd tests/host
        make ../../libraries/ESP8266WebServer/examples/PostServer/PostServer
        bin/PostServer/PostServer
   then put your PC's IP address in SERVER_IP below, port 9080 (instead of default 80):
*/
//#define SERVER_IP "10.0.1.7:9080" // PC address with emulation on host
#define SERVER_IP "7e79a9ae5139.ngrok.io"

#ifndef STASSID
#define STASSID "One plus 7"
#define STAPSK  "noushath"
#endif

String value = "0";


void setup() {

  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  Serial.println("ESP");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

}

void loop() {
  // wait for WiFi connection

  if(Serial.available() >0){
    delay(100);
    while (Serial.available() > 0){
      value = Serial.readString();
      if(value[0] == '*'){
        value.replace('*', ' '); 
      }
    }
    }
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/values"); //HTTP
    http.addHeader("Content-Type", "application/json");
    
          int httpGetCode = http.GET();

      // httpCode will be negative on error
      if (httpGetCode > 0) {
        // HTTP header has been send and Server response header has been handled
     

        // file found at server
        if (httpGetCode == HTTP_CODE_OK || httpGetCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
        }
      }
       http.addHeader("Content-Type", "text/plain");

    
    // start connection and send HTTP header and body
    int httpCode = http.POST(value);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
     

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
     
      }
    }

    http.end();
  }

  delay(10000);
}
