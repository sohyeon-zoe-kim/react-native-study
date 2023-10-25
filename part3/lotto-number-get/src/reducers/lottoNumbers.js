import { CREATE_NEW_NUMBERS } from "../actions/lottoNumbers"

const defaultState = {
  currentNumbers: [],
  history: [],
}

export const lottoNumbersReducers = (state = defaultState, action) => {
  if (action.type === CREATE_NEW_NUMBERS) {
    const date = new Date()

    return {
      ...state,
      currentNumbers: action.numbers,
      history: state.history.concat([
        {
          date: `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDay()} ${date.getHours()} : ${date.getMinutes()}`,
          numbers: action.numbers
        }
      ])
    }
  }

  return {
    ...state
  }
}