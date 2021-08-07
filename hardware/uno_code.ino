
#include <SoftwareSerial.h>

//esp8266 module serial communication

SoftwareSerial esp(10, 11);

//initial values
String state;
int value;


// Pin modes

//led pin
const int LED_PIN = 7;

//LDR pin
const int LDR = A1;


void setup() {

//set uno baud rate to 9600
 Serial.begin(9600);

 //esp baudrate to 115200
 esp.begin(115200);

 //initialize the pin modes

 pinMode(LED_PIN, OUTPUT);
 pinMode(LDR, INPUT);
 
}

void loop() {
  
 // read the value from LDR sensor  
 value = analogRead(A1); 

 //print the value in serial moniter for debug prupose
 Serial.println(value);

 //verify if esp8266 is available

  while(esp.available() > 0){
       
       // send the value to esp8266
       esp.println("*" + String(value));

       // get the manual LED state from server
       state = esp.readString();

       // verify if the state is correct
       bool s = state[0] == 't';

       // turn on light if state is true
        if(s){
           digitalWrite(LED_PIN, HIGH);
           //wait 10 s for manual mode and then change to automatic mode
           delay(10000);
        }
        // turn of light if state is false
        else if(!s){
           digitalWrite(LED_PIN, LOW);
        }

        // change the value according to LDR value

        // the the light intensity is high trun off the light
        if(value >300){
           digitalWrite(LED_PIN, LOW);
        }
        // the the light intensity is low trun on the light
        else{
          digitalWrite(LED_PIN,HIGH);
        }
    
  }

   // wait for 8s 
    delay(8000);
  }
