import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import store from "./store";
import {Provider} from "react-redux";
import {ErrorBoundary} from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
        <Provider store={store}>
            <App/>
        </Provider>
    </ErrorBoundary>

)
