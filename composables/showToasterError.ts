import { useToasterStore } from '~/stores/toaster'

export default (error: any) => {
  const toasterStore = useToasterStore()

  switch (error.statusCode) {
    case 404:
      toasterStore.showErrorToaster('no Data to show')
      break
    case 500:
      toasterStore.showErrorToaster('Unexpected error happened')
      break
    default:
      toasterStore.showErrorToaster(error.message)
      break
  }
}
