
print("Hello World!")

import lib




def helloWorld(tc, inputParams, taskInputParams):
  print('aaaa')
  dd = {"name": "John", "age": 30, "city": "New York"}
  
  res = {
    "fatal": False,
    "error": False, 
    "errorMsg": None,
    "outputParams": dd
  }

  print(base.jsonToString(res))

  return base.jsonToString(res)
