module.exports.rules = {
  required: [
    v => !!v || 'Field is required',
  ],
  min: v => (v && v.length >= 6) || 'Min 6 characters',
}
