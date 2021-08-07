
#include <SoftwareSerial.h>

SoftwareSerial esp(10, 11);

String state;
const int LED_PIN = 7;
const int LDR = A1;
int value;

void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);
 esp.begin(115200);
 pinMode(LED_PIN, OUTPUT);
 pinMode(LDR, INPUT);
 
}

void loop() {
  // put your main code here, to run repeatedly:
 value = analogRead(A1);  
 Serial.println(value);
  while(esp.available() > 0){
       esp.println("*" + String(value));
       state = esp.readString();
       bool s = state[0] == 't';
        if(s){
           digitalWrite(LED_PIN, HIGH);
           delay(10000);
        }else if(!s){
           digitalWrite(LED_PIN, LOW);
        }
        if(value >300){
           digitalWrite(LED_PIN, LOW);
        }else{
          digitalWrite(LED_PIN,HIGH);
        }
    
  }

  
  
    delay(5000);
  }
