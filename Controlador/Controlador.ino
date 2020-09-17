#include "SoftwareSerial.h"

SoftwareSerial bluetooth(0, 1); //TX, RX do bluetooth
const int led = 6;
const int led2 = 5;
const int led3 = 9;
const int led4 = 10;
int start = 0;
int controlador = 0;
int qualidade = 0;
int intencidade = 255;
int valor = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(led, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(A0, INPUT);
  Serial.begin(38400);
  bluetooth.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char r = Serial.read(); // Lê o dado e salva em registrador
    bluetooth.print(r);
  }
  if (bluetooth.available()) {
    char r = bluetooth.read();// Envia o dado recebido do serial para o Bluetooth
    Serial.println(r); //Imprime o dado recebido
    if (r == '0') start = 0;
    if (r == '1') start = 1;
    if (r == '2') controlador = 0;
    if (r == '3') controlador = 1;
    if (r == '4' && controlador == 0 && qualidade == 0) intencidade -= 30;
    if (r == '5' && controlador == 0 && qualidade == 0) intencidade += 30;
    if (r == '6') qualidade = 1;
    if (r == '7') qualidade = 0;
  }
  if (start == 0) {
    analogWrite(led, 0);
    analogWrite(led2, 0);
    analogWrite(led3, 0);
    analogWrite(led4, 0);
  } else {
    if (controlador == 0) {
      if (intencidade < 10)intencidade = 0;
      if (intencidade > 255)intencidade = 255;
      analogWrite(led, intencidade);
      analogWrite(led2, intencidade);
      analogWrite(led3, intencidade);
      analogWrite(led4, intencidade);
      if (qualidade == 1) {
        if (intencidade > 30) {
          intencidade -= 10;
          delay(1000);
        }
      }
    } else {
      valor = analogRead(A0);
      Serial.println(valor);

      if (valor < 750 )intencidade = intencidade + 10;
      if (valor > 760 )intencidade = intencidade - 10;
      if (intencidade > 255) intencidade = 255;
      if (intencidade < 10)intencidade = 0;

      delay(100);
      analogWrite(led, intencidade);
      analogWrite(led2, intencidade);
      analogWrite(led3, intencidade);
      analogWrite(led4, intencidade);
      delay(100);
    }

  }
}
