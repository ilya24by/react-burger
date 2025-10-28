
import { SET_PRICE, setPrice } from './action'

describe('Action creators', () => {
    it('should create an action with correct price', () => {
        const price = 145600;

        // Эталонный экшен
        const expectedAction = {
            type: SET_PRICE,
            price
        }

        // Проверяем экшены на равенство
        expect(setPrice(price)).toEqual(expectedAction)
    })
})