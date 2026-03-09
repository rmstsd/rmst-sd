# 1. 定义服务名称（注意：是服务名 ServiceName，不是显示名称 DisplayName）
$ServiceName = "RmstsdSeaService"

# 2. 先尝试停止服务（如果它正在运行，直接删除可能会报错或变成“标记为删除”）
Stop-Service -Name $ServiceName -Force -ErrorAction SilentlyContinue

# 3. 删除服务
Remove-Service -Name $ServiceName

# 4. 验证是否删除成功
if (-not (Get-Service -Name $ServiceName -ErrorAction SilentlyContinue)) {
    Write-Host "服务 [$ServiceName] 已成功删除。" -ForegroundColor Green
} else {
    Write-Host "删除失败，请检查名称或权限。" -ForegroundColor Red
}