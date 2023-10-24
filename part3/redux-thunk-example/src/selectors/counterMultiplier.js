import { selector } from "recoil";
import { counterState } from "../states/counter";

export const counterMultipiler = selector({
  key: 'MAIN/counterMultipiler',
  get: ({get}) => {
    const result = get(counterState)

    return result * 5
  }
})