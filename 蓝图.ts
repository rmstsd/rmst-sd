interface Node {
  acceptType: null | string | string[]

  properties: {
    userName: {
      contactIds: null | string | string[]

      title: string
      component: 'Input'
      componentProps?: {}
      initialValue?: any

      enum?: { label: string; value: string | number }[] // component: 'Select' 才有用
    }
    email: {
      contactIds: null | string | string[]

      title: string
      component: 'Input'
      componentProps?: {}
      initialValue?: any
    }
    layout: {
      type: 'void'
      component: 'FormLayout'
      componentProps?: {
        layout: 'vertical'
      }
      properties: {}
    }
  }
}
