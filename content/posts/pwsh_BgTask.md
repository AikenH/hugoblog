---
calendar_date: 2024-01-28
catalog: true
categories:
- Windows
cover:
  image: /cover/cover26.jpeg
date: 2024-01-28 15:44:25
description: null
lang: cn
mathjax: false
tags:
- Windows
- Powershell
thumbnail: /img/header_img/lml_bg1.jpg
title: Windows Powershell 01 后台任务
toc: true
---

>[!summary]+
> 有一些希望能在后台运行的任务，例如 nohup,tmux,screen 可实现的一些功能，简单介绍以下 powershell 中的类似用法和功能。

To run a Command Prompt (cmd.exe) command in the background from PowerShell and retrieve it later, similar to sessions in `tmux`, you can use PowerShell Jobs. PowerShell Jobs allow you to start a command or script in the background and then retrieve the results later. Here's how you can do it:

从 PowerShell 在后台运行命令提示符 (cmd.exe) 命令并稍后检索它（与 `tmux` 中的会话类似），可以使用 PowerShell Jobs。 PowerShell Jobs 允许在后台启动命令或脚本，然后稍后检索结果。

具体的一些操作如下：

### Start a Job in the background

使用 Start-Job 和 ScriptBlock 参数执行选定的命令

```powershell
$job = Start-Job -ScriptBlock { pwsh.exe /c "your_command_here" }
```

这里将 `your_command_here` 改为自己需要执行的命令，例如启动局域网内可访问的 Stable-Diffusion Webui：

```powershell
$job = Start-Job -ScriptBlock { pwsh.exe /c ".\webui.bat --xformers --listen" }
```

如果需要同时执行多条命令（例如执行 python 命令之前需要切换环境，默认为 base 环境）可以使用 `&&`

```powershell
 $job = Start-Job -ScriptBlock { pwsh.exe /c "conda activate flask && python .\app.py" }
```



### **Check the Job Status** && **Retrieving the Results**

将任务放置于后台执行之后，可能需要检查执行的状态、结果决定是否要将其常驻于后台，可以使用 `Get-Job` 和 `Receive-Job` 命令实现

使用 Get-Job 可列出所有任务 ID 及状态

```poewrshell
Get-Job
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240128155711.png)

也可使用 Get-Job -ID your-task-id 只查看特定 ID 的任务，通过 Get-Job 获得 ID 和基本状态后可以使用 Receive-Job 对任务的运行进行检查。

```powershell
Receive-Job -Id $job.Id
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240128160103.png)

可以查看当前任务的运行状态决定是否要继续执行或者终止。

### **Stop the Job** && Remove the Code

当计划中止并移除后台任务，就需要使用到 Stop-Job 和 Remove-Job 命令，指令的名称都相当直观。

但是在移除指令之前要记得**中止指令**，否则会有类似的报错，同时无法移除任务：

> To remove the job, first stop the job, or use the Force parameter. (Parameter 'SessionId')

```powershell
Stop-Job -Id <JobId>
Stop-Job -Name <JobName>
```

中止完任务就可以安全的移除后台任务：

```powershell
Remove-Job -Id <JobId>
Remove-Job -Name <JobName>
```

如果想要直接删除作业而不停止，就需要使用 Force 参数，通常用于强制删除无响应或者停止时间过长的任务。

```powershell
Remove-Job -Id <JobId> -Force
Remove-Job -Name <JobName> -Force
```

请记住将 `<JobId>` 或 `<JobName>` 替换为您要停止或删除的作业的实际 ID 或名称。这种方法可确保作业安全终止并从系统中删除，从而释放其正在使用的所有资源。

### FI