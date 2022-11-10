import json
import asyncio
import serial
import websockets
from requests import post
#/dev/tty.usbmodem14302
PORT_NAME = input("PORT NAME: ")
ser = serial.Serial(PORT_NAME, 9600)
data = {}
async def read_serial(websocket, path):	
	while True:
		cc = str(ser.readline())[2:][:-5]
		key, val = cc.split(":")
		try:
			data[key] = int(val.strip())
		except:
			pass
		await websocket.send(str(json.dumps(data)))


start_server = websockets.serve(read_serial, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

#asyncio.run(write_serial())
#/dev/tty.usbmodem14302