import { IApp } from "../../types/app-types"
import {appReducer} from "../app-reducer";
import {SetAppError, SetAppStatus} from "../../actions/app-actions";


let startState: IApp

beforeEach(() => {

    startState = {
        status: 'idle',
        error: null

    }
})

test('correct status should be set', () => {
    const endState = appReducer(startState, SetAppStatus('loading'))

    expect(endState.status).toBe('loading')
})
test('error should be set', () => {
    const endState = appReducer(startState, SetAppError('some error!1'))

    expect(endState.error).toBe('some error!1')
})
