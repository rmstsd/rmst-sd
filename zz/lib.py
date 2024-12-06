import json
from enum import Enum


class TraceContext:
    pass


class Date:
    pass


class JavaMap:
    pass


class FailureLevel(Enum):
    CRITICAL = 'CRITICAL'
    MAJOR = 'MAJOR'
    MINOR = 'MINOR'


class FailureRecordReq:
    def __init__(self, kind: str, desc: str, sub_kind: str = None, level: FailureLevel = None,
                 source: str = None, part: str = None):
        self.kind = kind  # 类别
        self.sub_kind = sub_kind  # 子类别
        self.level = level
        self.source = source  # 来源
        self.part = part  # 对象
        self.desc = desc


class UserNoticeReq:
    def __init__(self, title: str, targetUsers: list[str], actionType: str, hasContent: bool = None,
                 content: str = None, entityName: str = None, entityId: str = None):
        self.title = title
        self.hasContent = hasContent
        self.content = content
        self.targetUsers = targetUsers
        self.actionType = actionType  # "None" | "OpenLink" | "ReadOneEntity"
        self.entityName = entityName
        self.entityId = entityId


class ScriptBase:

    def traceContext(self) -> TraceContext:
        pass

    def logDebug(self, tc: TraceContext, msg: str):
        pass

    def logInfo(self, tc: TraceContext, msg: str):
        pass

    def logError(self, tc: TraceContext, msg: str, err: object | None):
        pass

    def scheduledAtFixedDelay(self, name: str, delay: float, work: callable):
        pass

    def robustExecute(self, tc: TraceContext, description: str, func: str, args):
        pass

    def runOnce(self, tc: TraceContext, mainId: str, actionId: str, work: callable) -> object:
        pass

    def withLock(self, name: str, action: callable):
        pass

    def parseJsonString(self, string: str):
        pass

    def jsonToString(self, o) -> str | None:
        pass

    def xmlToJsonStr(self, o) -> object | None:
        pass

    def now(self) -> Date:
        pass

    def throwBzError(self, code: str, args: []) -> object:
        pass

    def assignJavaMapToJsMap(self, jsMap, javaMap: JavaMap):
        pass

    def setScriptButtons(self, buttons: str):
        pass

    def getGlobalValue(self, key: str) -> object | None:
        pass

    def setGlobalValue(self, key: str, value: object | None):
        pass

    def recordFailure(self, tc: TraceContext, failure: FailureRecordReq):
        pass

    def createUserNotice(self, tc: TraceContext, req: UserNoticeReq):
        pass


base: ScriptBase


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class ScriptThread:
    def createThread(self, name: str, func: str):
        pass

    def sleep(self, ms: int):
        pass

    def interrupted(self) -> bool:
        pass


thread: ScriptThread


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class HttpServer:
    def registerHandler(self, method: str, path: str, func: str, auth: bool):
        pass


httpServer: HttpServer


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


class HttpResult:
    def __init__(self, successful: bool, ioError: bool, ioErrorMsg: str | None, code: int, bodyString: str | None,
                 checkRes: bool | None, checkMsg: str | None):
        self.successful = successful
        self.ioError = ioError
        self.ioErrorMsg = ioErrorMsg
        self.code = code
        self.bodyString = bodyString
        self.checkRes = checkRes
        self.checkMsg = checkMsg


class HttpClient:
    def syncCall(self, tc: TraceContext, reqStr: str, okChecker, oStr: str | None) -> HttpResult:
        pass

    def asyncCallback(self, tc: TraceContext, reqStr: str, okChecker: str, oStr: str | None) -> str:
        pass

    # 反复轮训直到成功。使用此方法的好处：不用自己写循环。优化日志，开始结束时打印日志。中间如果一致是相同结果，不重复打印日志。
    # purpose 是目的，写好了方便差错。
    # 后面会与 SOC 结合。
    def requestJsonUntil(self, method: str, url: str, reqBody: object | None, headers: object | None,
                         purpose: str, delay: int, check) -> HttpResult:
        pass


httpClient: HttpClient


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class SocAttention(Enum):
    NONE = 'None'
    GREEN = 'Green'
    YELLOW = 'Yellow'
    RED = 'Red'


class SocNode:
    def getId(self) -> str:
        pass

    def getLabel(self) -> str:
        pass

    def getValue(self) -> object:
        pass

    def getAttention(self) -> SocAttention:
        pass


class Soc:
    def updatestrNode(self, id: str, desc: str, content: str, attention: SocAttention):
        pass

    def updateIntNode(self, id: str, desc: str, value: int, attention: SocAttention):
        pass

    def updateJsonNode(self, id: str, desc: str, content: object, attention: SocAttention):
        pass

    def getNode(self, id: str) -> SocNode | None:
        pass

    def removeNode(self, id: str):
        pass


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class ComplexQuery:
    pass


class Cq:
    def all(self) -> ComplexQuery:
        pass

    def cqAnd(self) -> ComplexQuery:
        pass

    def cqOr(self) -> ComplexQuery:
        pass

    def eq(self, field1: str, v) -> ComplexQuery:
        pass

    def ne(self, field1: str, v) -> ComplexQuery:
        pass

    def lt(self, field1: str, v) -> ComplexQuery:
        pass

    def lte(self, field1: str, v) -> ComplexQuery:
        pass

    def gt(self, field1: str, v) -> ComplexQuery:
        pass

    def gte(self, field1: str, v) -> ComplexQuery:
        pass

    def idEq(self, id: str) -> ComplexQuery:
        pass

    def include(self, field1: str, items: list) -> ComplexQuery:
        pass

    def empty(self, field1: str) -> ComplexQuery:
        pass

    def notEmpty(self, field1: str) -> ComplexQuery:
        pass


cq: Cq


class CreateOptions:
    def __init__(self, keepId: bool = None):
        self.keepId = keepId


class UpdateOptions:
    def __init__(self, limit: int = None):
        self.limit = limit


class RemoveOptions:
    def __init__(self, limit: int = None):
        self.limit = limit


class FindOptions:
    def __init__(self, projection: list = None, sort: list = None, skip: int = None, limit: int = None):
        self.projection = projection
        self.sort = sort
        self.skip = skip
        self.limit = limit


class ScriptEntity:
    def createOne(self, tc: TraceContext, entityName: str, evJson: object, o: CreateOptions | None) -> str:
        pass

    def createMany(self, tc: TraceContext, entityName: str, evJsonList: list, o: CreateOptions | None) -> list:
        pass

    def buildCreateOptions(self, keepId: bool) -> CreateOptions:
        pass

    def updateOne(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery, updateJson: object) -> object:
        pass

    def updateOneById(self, tc: TraceContext, entityName: str, id: str, updateJson: object) -> object:
        pass

    def updateMany(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery, updateJson: object,
                   o: UpdateOptions | None) -> object:
        pass

    def buildUpdateOptions(self, limit) -> UpdateOptions:
        pass

    def removeOne(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery):
        pass

    def removeMany(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery, o: RemoveOptions | None) -> object:
        pass

    def buildRemoveOptions(self, limit) -> RemoveOptions:
        pass

    def count(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery) -> object:
        pass

    def findOne(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery,
                o: FindOptions | None) -> object | None:
        pass

    def findOneById(self, tc: TraceContext, entityName: str, id: str, o: FindOptions | None) -> object | None:
        pass

    def findMany(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery, o: FindOptions | None) -> list:
        pass

    def exists(self, tc: TraceContext, entityName: str, queryJson: ComplexQuery) -> bool:
        pass

    def buildFindOptions(self, projection: list | None, sort: list | None, skip: int | None,
                         limit: int | None) -> FindOptions:
        pass

    def clearCacheAll(self):
        pass

    def clearCacheByEntity(self, entityName: str):
        pass


entity: ScriptEntity


class ScriptEntityExt:
    # 注意实体生命周期拦截器：实体新建前
    def extBeforeCreating(self, entityName: str, func: str):
        pass

    # 注意实体生命周期拦截器：实体新建后
    def extAfterCreating(self, entityName: str, func: str):
        pass

    # 注意实体生命周期拦截器：实体更新前
    def extBeforeUpdating(self, entityName: str, func: str):
        pass

    # 注意实体生命周期拦截器：实体更新后
    def extAfterUpdating(self, entityName: str, func: str):
        pass

    # 实体删除前
    def extBeforeRemoving(self, entityName: str, func: str):
        pass

    # 实体删除后
    def extAfterRemoving(self, entityName: str, func: str):
        pass


entityExt: ScriptEntityExt


class ScriptFalcon:
    def runTaskByLabelAsync(self, tc: TraceContext, defLabel: str, jsInputParams: object) -> str:
        pass


falcon: ScriptFalcon


class MrRobotAlert:
    def __init__(self, level: str, code: str | None, message: str | None, times: int | None, timestamp: object | None):
        self.level = level
        self.code = code
        self.message = message
        self.times = times
        self.timestamp = timestamp


class MrRobotSelfReportMain:
    def __init__(self, battery: float | None, x: float | None, y: float | None, direction: float | None,
                 currentSite: str | None, blocked: bool | None, charging: bool | None, currentMap: str | None,
                 currentMapMd5: str | None, alerts: list[MrRobotAlert] | None):
        self.battery = battery
        self.x = x
        self.y = y
        self.direction = direction
        self.currentSite = currentSite
        self.blocked = blocked
        self.charging = charging
        self.currentMap = currentMap
        self.currentMapMd5 = currentMapMd5
        self.alerts = alerts


class MrRobotSelfReport:
    def __init__(self, error: bool = None, errorMsg: str | None = None, main: MrRobotSelfReportMain | None = None,
                 selfReport: object | None = None, rawReport: object | None = None, ):
        self.error = error
        self.errorMsg = errorMsg
        self.main = main
        self.selfReport = selfReport
        self.rawReport = rawReport


class MrRobotInfoAll:
    def __init__(self, id: str, systemConfig: object, runtimeRecord: object | None,
                 selfReport: MrRobotSelfReport | None,
                 online: bool):
        self.id = id
        self.systemConfig = systemConfig
        self.runtimeRecord = runtimeRecord
        self.selfReport = selfReport
        self.online = online


class BinRobotArgs:
    def __init__(self, bin: str, action: str, site: str, fields: object, rbkFields: object):
        self.bin = bin
        self.action = action
        self.site = site
        self.fields = fields
        self.rbkFields = rbkFields


class ScriptWcs:
    # 机器人是否在线
    def isRobotOnline(self, robotName: str) -> bool:
        pass

    def mustGetRobotInfoAll(self, id: str) -> MrRobotInfoAll:
        pass

    # 寻找离机器人最近的通讯点
    def findClosestRobotConnectedPoint(self, robotName: str) -> object | None:
        pass

    def findClosestRobotConnectedPointBySite(self, sceneId: str, siteId: str) -> object | None:
        pass

    def buildHaiMoves(self, tc: TraceContext, robotId: str, rawSteps: str) -> list:
        pass

    def buildSeerMoves(self, tc: TraceContext, robotId: str, rawSteps: str) -> list:
        pass

    # 未禁用、可接单、在线的机器人
    def listWorkableRobots(self) -> list[MrRobotInfoAll]:
        pass

    # 未禁用、可接单、在线、空闲（扩展任务状态）的机器人
    def listExtIdleRobots(self) -> list[MrRobotInfoAll]:
        pass

    # 采用RunOnce 的方式，创建直接运单，并等待其完成
    def awaitRunOnceDirectRobotOrder(self, tc: TraceContext, robotName: str, mainId: str, action: str,
                                     moves: list) -> str:
        pass

    def mustGetBinRobotArgs(self, bin: str, action: str) -> BinRobotArgs:
        pass

    def mustGet3051Params(self, bin: str, action: str) -> object:
        pass

    def unlockByRobot(self, tc: TraceContext, robotId: str):
        pass

    def tryLockOneSiteByName(self, tc: TraceContext, robotId: str, siteIds: list) -> str | None:
        pass

    # 重置所有扩展机器人，终止所有后台任务，清楚所有地图资源锁
    def resetExtRobots(self, tc: TraceContext):
        pass


wcs: ScriptWcs


class ModbusReadReq:
    def __init__(self, code: int, address: int, qty: int, slaveId: int | None = None, maxRetry: int | None = None,
                 retryDelay: int | None = None):
        self.code = code
        self.address = address
        self.qty = qty
        self.slaveId = slaveId
        self.maxRetry = maxRetry
        self.retryDelay = retryDelay


class ModbusWriteReq:
    def __init__(self, code: int, address: int, qty: int, slaveId: int | None = None, maxRetry: int | None = None,
                 retryDelay: int | None = None):
        self.code = code
        self.address = address
        self.qty = qty
        self.slaveId = slaveId
        self.maxRetry = maxRetry
        self.retryDelay = retryDelay


class BlockType(Enum):
    DB = 'DB'
    Q = 'Q'
    I = 'I'
    M = 'M'
    V = 'V'


class DataType(Enum):
    BOOL = 'BOOL'
    BYTE = 'BYTE'
    INT16 = 'INT16'
    UINT16 = 'UINT16'
    INT32 = 'INT32'
    UINT32 = 'UINT32'
    FLOAT32 = 'FLOAT32'
    FLOAT64 = 'FLOAT64'
    STRING = 'STRING'


class S7ReadReq:
    def __init__(self, blockType: BlockType, dataType: DataType, dbId: int, byteOffset: int, bitOffset: int,
                 maxRetry: int | None = None, retryDelay: int | None = None):
        self.blockType = blockType
        self.address = dataType
        self.dbId = dbId
        self.byteOffset = byteOffset
        self.bitOffset = bitOffset
        self.maxRetry = maxRetry
        self.retryDelay = retryDelay


class S7WriteReq:
    def __init__(self, value: object, blockType: BlockType, dataType: DataType, dbId: int, byteOffset: int,
                 bitOffset: int, maxRetry: int | None = None, retryDelay: int | None = None):
        self.value = value
        self.blockType = blockType
        self.address = dataType
        self.dbId = dbId
        self.byteOffset = byteOffset
        self.bitOffset = bitOffset
        self.maxRetry = maxRetry
        self.retryDelay = retryDelay


class ScriptPlc:
    def modbusRead(self, tc: TraceContext, deviceName: str, reqMap: ModbusReadReq) -> list[int]:
        pass

    # 重复读，直到等于某个值；无限尝试
    def modbusReadUtilEq(self, tc: TraceContext, deviceName: str, reqMap: ModbusReadReq, targetValue: int,
                         readDelay: int):
        pass

    # 重复读，直到等于某个值；最多尝试指定次数
    def modbusReadUtilEqMaxRetry(self, tc: TraceContext, deviceName: str, reqMap: ModbusReadReq, targetValue: int,
                                 readDelay: int, maxRetry: int):
        pass

    def modbusWrite(self, tc: TraceContext, deviceName: str, reqMap: ModbusWriteReq, values: list[int]):
        pass

    def s7Read(self, tc: TraceContext, deviceName: str, reqMap: S7ReadReq) -> object:
        pass

    def s7ReadUntilEq(self, tc: TraceContext, deviceName: str, reqMap: S7ReadReq, targetValue: any, readDelay: int):
        pass

    def s7Write(self, tc: TraceContext, deviceName: str, reqMap: S7WriteReq):
        pass


plc: ScriptPlc


class Mode(Enum):
    Edit = 'Edit'
    Read = 'Read'


class ScriptUi:
    # 在指定工位电脑上，打开业务对象的界面
    def openEntityViewPage(self, workSite: str, entityName: str, id: str, mode: Mode):
        pass


ui: ScriptUi


class Bz:
    def tryCallContainer(self, tc: TraceContext):
        pass

    def tryOutbound(self, tc: TraceContext):
        pass

    def finishPutOrderByContainer(self, tc: TraceContext, containerId: str):
        pass

    # 修复并创建库存明细。填充物料信息、位置信息、容器等。
    def fixCreateInvLayout(self, tc: TraceContext, layouts: list):
        pass


bz: Bz


class OrderLineSource:
    def __init__(self, orderId: str, lineId: str, lineNo: int):
        self.orderId = orderId
        self.lineId = lineId
        self.lineNo = lineNo


class ShortOption(Enum):
    Stop = 'Stop'
    Read = 'Read'


class javaMap:
    pass


class CallContainerPlan:
    def __init__(self, mixKey: str, materialId: str, feature: javaMap, restQty: float, assignedQty: float, qty: float,
                 callContainerQty: float, sources: list[OrderLineSource]):
        self.mixKey = mixKey
        self.materialId = materialId
        self.feature = feature
        self.restQty = restQty
        self.assignedQty = assignedQty
        self.qty = qty
        self.callContainerQty = callContainerQty
        self.sources = sources


class MaterialContainerMaxQty:
    def __init__(self, containerType: str, subNum: int, maxQty: int):
        self.containerType = containerType
        self.subNum = subNum
        self.maxQty = maxQty


class ResLock:
    def withLock(self, action: callable):
        pass
# Python 初版的 sdk，期间会不定时更新

resLock: ResLock


class EntityMeta:
    def getName(self) -> str:
        pass


class CallEntityExtButtonReq:
    def __init__(self, func: str, entityName: str, selectedIds: list[str] | None = None, evId: str | None = None,
                 ev: object | None = None):
        self.func = func
        self.entityName = entityName
        self.selectedIds = selectedIds
        self.evId = evId
        self.ev = ev


class ScriptUtils:
    def isNullOrBlank(self, string: str | None) -> bool:
        pass

    def substringAfter(self, string: str, sep: str) -> str:
        pass

    def substringBefore(self, string: str, sep: str) -> str:
        pass

    def splitTrim(self, string: str | None, sep: str) -> list:
        pass

    # py 中 int 和 long 统一使用 int, 在转换的时候可能存在问题，使用的时候先测试一下
    def anyToInt(self, v: any) -> int | None:
        pass

    def anyToLong(self, v: any) -> int | None:
        pass

    # py 中 没有单双号精度  统一使用 float, 在转换的时候可能存在问题，使用的时候先测试一下
    def anyToFloat(self, v: any) -> float | None:
        pass

    def anyToDouble(self, v: any) -> float | None:
        pass

    def anyToBool(self, a: any) -> bool:
        pass

    def anyToDate(self, input: any) -> Date:
        pass

    # format 是 Java 的格式
    def formatDate(self, d: Date, format: str) -> str:
        pass

    #  产生 UUID 字符串
    def uuidStr(self, ) -> str:
        pass

    # 产生 ObjectId 字符串
    def oidStr(self, ) -> str:
        pass


utils: ScriptUtils


class File:
    # 文件是否存在
    def exists(self) -> bool:
        pass

    # 文件名
    def getName(self) -> str:
        pass

    # 获取绝对路径
    def getAbsolutePath(self) -> str:
        pass

    # 长度（字节）
    def length(self) -> int:
        pass


class FileUtils:
    # 将路径字符串转换为 Java 的 File 对象
    def strToFile(self, pathStr: str) -> File:
        pass

    # 将表示目录的字符串和文件名的字符串拼起来，得到 File 对象
    def joinDirFile(self, dir: str, file: str) -> File:
        pass

    # 移动文件
    def moveFile(self, srcFile: File, dstFile: File):
        pass

    # 移动目录
    def moveDirectory(self, srcDir: File, dstDir: File):
        pass

    # 删除文件
    def removeFile(self, dir: File):
        pass

    # 删除目录
    def removeDirectory(self, dir: File):
        pass

    # 返回 M4 存放文件的默认根目录
    def ensureFilesDir(self, ) -> File:
        pass

    # 将路径字符串（相对于M4存放文件的默认根目录）转化为 File 对象
    def pathToFile(self, path: str) -> File:
        pass

    # 获取文件相对于 M4 存放文件的默认根目录”的相对路径。数据库和前端存储文件存储的都是这个相对路径。
    def fileToPath(self, file: File) -> str:
        pass

    # 返回 M4 默认临时文件的根目录
    def ensureTmpDir(self) -> File:
        pass

    # 创建一个临时文件。生成的文件名为前缀 + UUID + 后缀 +.扩展名ext 扩展名，最前面不要有点
    def nextTmpFile(self, ext: str, prefix: str, suffix: str) -> File:
        pass


fileUtils: FileUtils


class LastDaysParams:
    def __init__(self, startInstant, endInstant, dates: list[str]):
        self.startInstant = startInstant
        self.endInstant = startInstant
        self.dates = dates


class ScriptStats:

    # 添加统计图标组
    def addStatsGroup(self, gStr: str):
        pass

    # 构造最近 N 天统计需要的参数@param days
    def buildLastDaysParams(days: int) -> LastDaysParams:
        pass


stats: ScriptStats

STATS_EXT_PREFIX = "Ext::"


class ChartItem:
    def __init__(self, id: str, label: str, desc: str = None, displayOrder: int = None):
        self.id = id
        self.label = label
        self.desc = desc
        self.displayOrder = displayOrder


class ChartGroup:
    def __init__(self, id: str, label: str, displayOrder: int = None, items: list[ChartItem] = None):
        self.id = id
        self.label = label
        self.displayOrder = displayOrder
        self.items = items


def addStatsGroup(g: ChartGroup):
    stats.addStatsGroup(json.dumps(g))


class ScriptButton:
    def __init__(self, label: str, func: str, confirmText: str | None = None, callTimeout: int | None = None,
                 inputEntityName: str | None = None, inputMaxWidth: int | None = None):
        self.label = label
        self.func = func
        self.confirmText = confirmText
        self.callTimeout = callTimeout
        self.inputEntityName = inputEntityName
        self.inputMaxWidth = inputMaxWidth


def setScriptButtons(buttons: list[ScriptButton]):
    buttonsStr = json.dumps([button.__dict__ for button in buttons])
    base.setScriptButtons(buttonsStr)


class ScriptButtonResult:
    def __init__(self, message: str | None = None):
        self.message = message


class Method:
    Get = 'Get'
    Post = 'Post'
    Put = 'Put'
    Delete = 'Delete'


class ContentType:
    Json = 'Json'
    Xml = 'Xml'
    Plain = 'Plain'


class HttpRequest:
    def __init__(self, url: str, method: Method, contentType: ContentType, reqBody: str | None = None,
                 headers: object | None = None, basicAuth: object | None = None, trace: bool = None,
                 traceReqBody: bool = None, traceResBody: bool = None, reqOn: Date = None):
        self.url = url
        self.method = method
        self.contentType = contentType
        self.reqBody = reqBody
        self.headers = headers
        self.basicAuth = basicAuth
        self.trace = trace
        self.traceReqBody = traceReqBody
        self.traceResBody = traceResBody
        self.reqOn = reqOn


class CallRetryOptions:
    def __init__(self, maxRetryNum: int = None, retryDelay: int = None):
        self.maxRetryNum = maxRetryNum
        self.retryDelay = retryDelay


class CheckResultResult:
    def __init__(self, ok: bool):
        self.ok = ok


def httpAsyncCallback(tc: TraceContext, req: HttpRequest, okChecker: str, o: CallRetryOptions | None = None) -> str:
    return httpClient.asyncCallback(tc, json.dumps(req), okChecker, json.dumps(o) if o is not None else json.dumps({}))


def httpSyncCall(tc: TraceContext, req: HttpRequest, okChecker, o: CallRetryOptions | None = None) -> HttpResult:
    return httpClient.syncCall(tc, json.dumps(req.__dict__), okChecker,
                               json.dumps(o.__dict__) if o is not None else json.dumps({}))
