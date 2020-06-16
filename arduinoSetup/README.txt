
Goal: Send an HTTP GET request with sensor data.

Hardware:
Arduino UNO
Specs - ATMega328p
2 kB SRAM
16 MHz clock
_________________________________________________________
W5100 ethernet shield
https://www.sunfounder.com/ethernet-shield-w5100-for-arduino.html
MAC Address: 

Local Network Info:
HP Spectre: 192.168.1.173
255.255.255.0


Example code (HTTP from Arduino):
https://www.arduino.cc/en/Tutorial/WebClient

W5100 Datasheet:
https://www.sparkfun.com/datasheets/DevTools/WIZnet/W5100_Datasheet_v1_1_8.pdf

- Communicates over SPI
- Does not have hardwired HTTP/MQTT/TLS (TCP is highest level protocol)

Wiznet application reference:
https://wizwiki.net/wiki/lib/exe/fetch.php?media=wiznet_app_reference_2012.pdf

TCP/IP stack contained in ethernet Shield

______________________________________________
HOW IT WILL WORK WITH IoT

"Devices publish their state in JSON format, on MQTT topics."
"Communication is protected through the use of X.509 certificates."
- Certificate has to be registered and activated with AWS IoT


- A device is a "thing"

___________________________________________
Supported Application layer protocols:
https://docs.aws.amazon.com/iot/latest/developerguide/protocols.html
MQTT client cert auth - port 8883 or 433
HTTP  client cert auth - port 8883
MQTT + WebSocket Sigv4 auth 

___________________________________________
MQTT: Message Queuing Telemetry Transport
http://mqtt.org/
http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html

Works on top of TCP/IP
JSON: 
https://www.json.org/

Example Arduino using AWS IOT Service:
https://www.instructables.com/id/Arduino-Using-AWS-IoT-Serivce/

MQTT has 93% higher throughput than HTTP?
https://medium.com/mqtt-buddy/mqtt-vs-http-which-one-is-the-best-for-iot-c868169b3105

20% less power utilisation
No constant connect / disconnect - MQTT is kept alive
https://www.bevywise.com/blog/mqtt-vs-rest-iot-implementation/


SUGGESTED DATA PAYLOAD:
Payloads for Amazon's IoT are JSON data
	device ID
	time (uS from reading start) - to keep data ordered and ensure that polling frequency remains consistent
	Reading

e.g.
{
	"deviceid" : "ekg123",
	"count" : 1421,
	"reading" : 1023
}

IoT JSON: https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-json.html


So you use MQTT to connect to the RESTFul API server, the link to which is


______________________________________________
TLS
	"Note that ALPN is not required to open connections using MQTT with X.509 Client Certificate authentication on port 8883. "

	"All traffic to and from AWS IoT must be encrypted over Transport Layer Security (TLS)."

	"For MQTT, TLS encrypts the connection between the device and the broker. TLS client authentication is used by AWS IoT to identify devices."


- is at the application layer
ALPN (port 4something)
https://tools.ietf.org/html/rfc7301
TLS 1.2: 
https://tools.ietf.org/html/rfc5246



MicroTLS:
http://riotsecure.se/microTLS/
https://www.wolfssl.com/?gclid=EAIaIQobChMI0-TBkNqy3gIVicDACh0vyA9pEAAYASAAEgJKDfD_BwE

PROBLEM:
https://forums.aws.amazon.com/thread.jspa?messageID=722991


__________________________________________________
X.509 Certificates:
https://en.wikipedia.org/wiki/X.509

AWS IoT supports the following certificate-signing algorithms:

    SHA256WITHRSA

    SHA384WITHRSA

    SHA384WITHRSA

    SHA512WITHRSA

    RSASSAPSS

    DSA_WITH_SHA256

    ECDSA-WITH-SHA256

    ECDSA-WITH-SHA384

    ECDSA-WITH-SHA512


_____________________________________________
https://www.freertos.org/

https://www.hackster.io/feilipu/using-freertos-multi-tasking-in-arduino-ebc3cc

	

____________________________________________
SOFTWARE STACK:
FreeRTOS - 20% of Arduino Memory
uTLS - 	

actual sensor reading / JSON generation - maybe 1%?
