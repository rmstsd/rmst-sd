
$ServiceName = "A_MyCustomService"
$DisplayName = "A_My Custom Service Demo"
$BinPath = "E:\seer\m4frontend\project\m4-boot-2.0\builds\m4-boot-2-single.exe"
$Description = "这是一个由 PowerShell 注册的服务"
# ===========================================

# 检查管理员权限
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "请以管理员身份运行 PowerShell 后执行此脚本！" -ForegroundColor Red
    exit
}

try {
    # 创建服务
    New-Service -Name $ServiceName -BinaryPathName $BinPath -DisplayName $DisplayName -StartupType Automatic -Description $Description -ErrorAction Stop
    
    Write-Host "服务注册成功！" -ForegroundColor Green
    
    # 启动服务
    Start-Service -Name $ServiceName
    Write-Host "服务已启动。" -ForegroundColor Green
}
catch {
    Write-Host "发生错误: $_" -ForegroundColor Red
    Write-Host "提示：如果该 EXE 不是原生服务程序，请使用 NSSM 工具注册。" -ForegroundColor Yellow
}