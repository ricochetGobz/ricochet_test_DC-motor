int motorPin = 3;
 
void setup() 
{ 
  pinMode(motorPin, OUTPUT);
  Serial.begin(9600);
  while (! Serial);
  Serial.println("Speed 0 to 255");
}
 
void loop() 
{
  float something = millis()/1000.0;
  int speed = 150 + (100 * sin( something * PI  ));
  analogWrite(motorPin, speed);
} 
