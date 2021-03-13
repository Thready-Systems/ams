import sys
from sys import argv
import random
import requests as req
import threading
import time

file_name = argv[1]
array = []
token = 'RUo2hJI8l3B1bjWPVYdP'
api = 'http://localhost:3002/login/asset/' #+ token +'/telemetry'

with open(file_name) as file:
    while(True):
        line = file.readline()
        array.append(line.replace('\n','').split(','))
        if not line:
            break
            file.close

def speedGen():
    return random.randint(30,100)

def pushData(i):
    payload = {"mac" : "car_02",'name' : 'carro 02', 'type' : 'car',"value" : 8,"active" : 1  ,"status" : "ok", "lastRepair" : "14/02/2020", "nextRepair" : "26/09/2020","temp" : speedGen() + 20, "pression" : speedGen() +300 ,"coord" : { "lat" : str(array[i][0]),"lon" : str(array[i][1]) } }
    req.post(api,json=payload)
    
starttime = time.time()
i = 0
while True:
    pushData(i)
    print(str(i) + '/' + str(len(array)))
    time.sleep(5 - ((time.time() - starttime) % 5))
    i = i+1
    if(i == len(array)-1):
        i=0
