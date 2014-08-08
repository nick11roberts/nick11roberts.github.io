---
title: Atlas Scientific ENV-TMP on Arduino UNO
layout: full_post
category: projects
---

<p>
After contemplating various Arduino projects, I stumbled across an amazing waterproof temperature sensor called the ENV-TMP by Atlas Scientific. 
In addition to being waterproof, it has an outstanding range, and it is quite accurately as well. 
Naturally, when I finally ordered it, and when it finally came in the mail, I was very eager to try it. 
My setup ended up consisting of the ENV-TMP, another (non-waterproof) sensor that came with my Arduino Starter Kit, and an LCD display. 
The code I wrote for it prints the values in degrees Fahrenheit of both sensors, updating every half second. 
One unfortunate feature of the ENV-TMP is that it takes a while for it to heat up or cool down when it is suddenly immersed in hot or cold water.
<br/>
Below, you will find the Arduino code that I ran with the sensors and the LCD. Change values as needed. 
<br/>
This is also available as a forkable <a class="aLink" href="https://gist.github.com/nick11roberts/ff17b9890b35cc7a5136">gist</a>.
<br/><br/>
</p>

<div class="codeBox">

{% highlight c %}

#include <LiquidCrystal.h>
 
// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
// initialize the temperature sensor pin at analog 0
int waterSensorPin = 0;
int atmosSensorPin = 1;
 
void setup(){
  // set up the LCD's number of columns and rows: 
  lcd.begin(16, 2);
  // Print a message to the LCD.
  // column 0, line 0
  lcd.setCursor(0, 0);
  lcd.print("Water tmp sensor");
  // column 0, line 1
  lcd.setCursor(0, 1);
  lcd.print("-----start.-----");
  
  // wait three seconds...
  delay(3000);
  
  //////// RESET THE LCD
  // column 0, line 0
  lcd.setCursor(0, 0);
  lcd.print("                ");
  // column 0, line 1
  lcd.setCursor(0, 1);
  lcd.print("                ");
  
  pinMode(7, OUTPUT);
}
 
void loop(){
  
  float volt = readSensorVoltage(atmosSensorPin);
  float degreeC = readSensorDegreesC(atmosSensorPin);
  float degreeF = readSensorDegreesF(atmosSensorPin);
  float waterDegreeC = read_temp();
  float waterDegreeF = ((9.0/5.0) * waterDegreeC) + 32; 
  
  // column 5, line 0
  lcd.setCursor(5, 0);
  lcd.print((char)223);
  lcd.print("F - atmos");
  
  // column 0, line 0
  lcd.setCursor(0, 0);
  lcd.print(degreeF);
  
  // column 5, line 1
  lcd.setCursor(5, 1);
  lcd.print((char)223);
  lcd.print("F - water");
  
  // column 0, line 1
  lcd.setCursor(0, 1);
  lcd.print(waterDegreeF);
  
  // Wait a second. 
  delay(500);
}
 
float readSensorVoltage(int pinNum){
  float voltage = analogRead(pinNum) * 5.0;
  voltage /= 1024.0; 
  return voltage;
}
 
float readSensorDegreesC(int pinNum){
  float degC = (readSensorVoltage(pinNum) - 0.5) * 100 ;
  return degC;
}
 
float readSensorDegreesF(int pinNum){
  readSensorDegreesC(pinNum);
  float degF = (readSensorDegreesC(pinNum) * 9.0 / 5.0) + 32.0;
  return degF;
}
 
float read_temp(void){
  float v_out; 
  float temp;
  digitalWrite(A0, LOW); 
  digitalWrite(7, HIGH);
  delay(2); 
  v_out = analogRead(waterSensorPin); 
  digitalWrite(7, LOW);
  v_out*=.0048; 
  v_out*=1000; 
  temp= 0.0512 * v_out -20.5128;
  return temp;
} 
	
{% endhighlight %}

</div>
