export default function({ store, redirect }) {
  if (store.getters['user.js/authenticated'] && store.getters['user.js/authenticated'].isAdmin) {
    return redirect('/notAllowed')
  }
}
