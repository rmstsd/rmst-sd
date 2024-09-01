# script 标签

## `<script>`

1. 遇到 script 后 等待 js 文件下载完后 立刻执行, 会阻塞 html 的解析

## `<script async>`

1. 边解析 html 边下载 js
2. 下载后立刻执行, 执行期间会阻塞 html 的解析

## `<script defer>`

1. 边解析 html 边下载 js
2. 等待 html 被解析之后 执行
3. 且在触发 DOMContentLoaded 事件之前执行
4. 按照出现在文档的顺序执行
