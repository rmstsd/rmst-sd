# dukou

[https://dukou.gitbook.io/dukou](https://dukou.gitbook.io/dukou)

一些有用的地址
用户面板: <https://dukou.icu>
防失联地址: <https://dukoucloud.github.io/dukou/>
客服邮箱: <support@dukou.icu>
防失联邮箱: <system@dukou.icu>

---

`notepad $profile.AllUsersAllHosts`

```bash
$Host.UI.RawUI.WindowTitle = Split-Path -Path $PWD.Path -Leaf

set-alias -name pp -value pnpm
set-alias -name nn -value npm
set-alias -name yy -value yarn

$proxy = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' | Select-Object -ExpandProperty ProxyServer
if ($proxy) {
    $env:http_proxy = "http://$proxy"
    $env:https_proxy = "http://$proxy"
}
```
