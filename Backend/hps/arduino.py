import serial
import time
import json

Hmax = 80
Hmin = 40
Tmax = 23
Tmin = 21
pass_word = 'adon'
phone_number = '0930488346'

data_sent = {
    "Hmax": Hmax,
    "Hmin": Hmin,
    "Tmax": Tmax,
    "Tmin": Tmin,
    "password": pass_word,
    "phone_no": '22',
    "parameter": '28'
}


def ard(str1,str2):
    arduino = serial.Serial(port='COM4', baudrate=9600, timeout=5, bytesize=8, parity='N')


    time.sleep(1)
    msg = data_sent["parameter"]
    msg2 = data_sent["phone_no"]
    msg = msg + '\r'
    msg2 = msg2 + '\r'
    time.sleep(1)
    arduino.write(msg.encode())
    print(arduino.readline().decode('ascii'))
    time.sleep(2)
    arduino.write(msg2.encode())
    print(arduino.readline().decode('ascii'))
    time.sleep(2)

    data1 = arduino.readline().decode('ascii')
    time.sleep(0.05)
    data2 = arduino.readline().decode('ascii')

    sensory_data = {

        "Humidity": data1.strip(),
        "Temperature": data2.strip()
    }

    print(sensory_data["Humidity"])
    print(sensory_data["Temperature"])

    return sensory_data

