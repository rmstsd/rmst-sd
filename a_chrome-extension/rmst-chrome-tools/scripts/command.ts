const count = 10
const commands = {}

for (let i = 0; i < count; i++) {
  const commandName = `command_${i}`
  commands[commandName] = {
    description: `自动绑定的命令 ${i}`
  }
}

console.log(commands)
