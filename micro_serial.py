import serial
PORT_NAME = "/dev/tty.usbmodem2402"
ser = serial.Serial(PORT_NAME, 9600)
while True:
     cc=str(ser.readline())
     print(cc[2:][:-5])