import json
import asyncio
import serial
import websockets

#/dev/tty.usbmodem14302
PORT_NAME = input("PORT NAME: ")
ser = serial.Serial(PORT_NAME, 9600)

# async def write_serial():
#      while True:
#           async with websockets.connect("ws://localhost:8001") as websocket:
#                cc=str(ser.readline())
#                await websocket.send(cc[2:][:-5])
#                print(cc[2:][:-5])


async def read_serial(websocket, path):
	while True:
	    cc = str(ser.readline())[2:][:-5]
	    await websocket.send(cc)


start_server = websockets.serve(read_serial, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

#asyncio.run(write_serial())
