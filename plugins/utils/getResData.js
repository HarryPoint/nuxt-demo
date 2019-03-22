import fp from 'lodash/fp'

export const getResData = (res, rs = []) => {
  return fp.get('data.data', res) || rs
}
