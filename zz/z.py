
print("Hello World!")

import lib

lib.cq.include("name", ["age", "city"])


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


def FindBinByFbInvLayoutId(tc, inputParams, taskInputParams):
    id = inputParams["id"]


    res = entity.findMany(tc, "FbInvLayout", cq.include("btMaterial", ["11001"]), None)
    print(base.jsonToString(res))