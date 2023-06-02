onload = () => {
  document.querySelector('button').onclick = aa
}

async function aa() {
  const [currTab] = await chrome.tabs.query({ active: true })

  await chrome.tabs.sendMessage(currTab.id, { evt: 'evt_to-lowercase' })
}
