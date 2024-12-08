import lib

print("Hello World!")


def FindBinByFbInvLayoutId(tc, inputParams, taskInputParams):
    btMtCode = inputParams["btMtCode"]

    res = entity.findMany(tc, "FbInvLayout", cq.include("btMaterial", [btMtCode]), None)

    print(base.jsonToString(res))
    ans = [item["qty"] for item in res]

    return base.jsonToString(
        {"fatal": False, "error": False, "errorMsg": None, "outputParams": {"ans": ans}}
    )


def query(tc, inputParams, taskInputParams):
    btMaterialName = inputParams["btMaterialName"]

    res = entity.findMany(tc, "FbInvLayout", cq.include("btMaterialName", [btMaterialName]), None)

    print(base.jsonToString(res))
    ans = [item.get['locked'] for item in res]

    return base.jsonToString(
        {"fatal": False, "error": False, "errorMsg": None, "outputParams": {"ans": ans}}
    )