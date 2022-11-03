onload = () => {
  const { createApp, ref, reactive, onMounted, toRefs } = Vue
  const app = createApp({
    setup() {
      const inputDom = ref(null)
      const mList = ref([
        { label: '百 度', link: 'https://www.baidu.com/s?wd=' },
        { label: '谷 歌', link: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=' }
      ])
      const cList = ref([
        { label: '知 乎', link: 'https://www.zhihu.com/search?type=content&q=' },
        { label: 'B 站', link: 'https://search.bilibili.com/all?keyword=' },
        { label: '掘 金', link: 'https://juejin.cn/search?query=' },
        { label: 'npm', link: 'https://www.npmjs.com/search?q=' },
        { label: 'mdn', link: 'https://developer.mozilla.org/zh-CN/search?q=' }
      ])

      const clickSearch = link => {
        openUrl(link + inputDom.value.value)
      }

      onMounted(() => {
        inputDom.value.focus()

        document.execCommand('paste')
      })

      return {
        inputDom,
        mList,
        cList,
        clickSearch
      }
    }
  })

  app.use(ElementPlus)
  app.mount('#app')
}

const openUrl = url => {
  let a = document.createElement('a')
  a.setAttribute('target', '_blank')
  a.setAttribute('href', url)
  a.click()
  a = null
}
