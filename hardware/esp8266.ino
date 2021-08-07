#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// iot-server address

#define SERVER_IP "7e79a9ae5139.ngrok.io"
//wifi username and password
#ifndef STASSID
#define STASSID "One plus 7"
#define STAPSK  "password"
#endif

// initial values

String value = "0";


void setup() {

  //baud rate to 115200

  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.println();
 

  //connect to network

  WiFi.begin(STASSID, STAPSK);


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

        //verify the value from arduino uno (LDR sensor value)
        value.replace('*', ' '); 
      }
    }
    }
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/values"); 
    http.addHeader("Content-Type", "application/json");
    
    //http GET Request

    int httpGetCode = http.GET();

      // httpCode will be negative on error
    if (httpGetCode > 0) {

        // file found at server
      if (httpGetCode == HTTP_CODE_OK || httpGetCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String payload = http.getString();
        Serial.println(payload);
      }
    
    }

    //http post request
    
    //adding http header to text
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
  //wait fot 10 seconds
  delay(10000);
}
