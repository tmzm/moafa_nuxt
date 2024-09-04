import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// @ts-ignore
// import ImageUploader from 'quill-image-uploader'

// add custom fonts
// let Font = Quill.import('attributors/class/font')
// Font.whitelist = ['Custom - 1', 'Custom - 2']
// Quill.register(Font, true)

export default defineNuxtPlugin(nuxtApp => {
  // Custom Toolbar
  const toolbarOptions = [
    // each sub-array is a group
    ['blockquote'],
    ['bold', 'italic'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: ['right', 'center', 'justify'] }],
    // ['image'],
    ['link'],
    ['clean'] // remove formatting button
  ]

  // // Image Uploader
  // const modules = {
  //   name: 'imageUploader'
  //   module: ImageUploader
  // }

  // define custom default props
  QuillEditor.props.toolbar.default = toolbarOptions
  QuillEditor.props.contentType.default = 'html'
  // QuillEditor.props.modules.default = modules

  nuxtApp.vueApp.component('QuillEditor', QuillEditor)
})
