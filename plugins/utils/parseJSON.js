export const parseJSON = jsonStr => {
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}
