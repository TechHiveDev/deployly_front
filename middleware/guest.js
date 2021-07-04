export default function({ store, redirect }) {
  if (store.getters['user.js/authenticated']) {
    return redirect('/');
  }
}
