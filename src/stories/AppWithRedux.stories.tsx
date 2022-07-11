import {AppWithRedux} from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <>
        <AppWithRedux/>
    </>
}