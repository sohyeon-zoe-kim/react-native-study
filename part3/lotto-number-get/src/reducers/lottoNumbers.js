import { CREATE_NEW_NUMBERS } from "../actions/lottoNumbers"

const defaultState = {
  currentNumbers: [],
  history: [],
}

export const lottoNumbersReducers = (state = defaultState, action) => {
  if (action.type === CREATE_NEW_NUMBERS) {
    return {
      ...state,
      currentNumbers: action.numbers,
      history: state.history.concat([
        {
          date: new Date(),
          numbers: action.numbers
        }
      ])
    }
  }

  return {
    ...state
  }
}