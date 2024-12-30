import style from './App.module.css'
import RouterPage from './RouterComponent/Router';
import Header from './Header/Header.jsx';
import { ContextProvider, useMyContext} from './ContextAPIs/ContextApi.jsx'

function App() {
  console.log("user_id = ",localStorage.getItem('user_id'));
  
  return (
    <div className={style.app}>
      <ContextProvider>
        <Header />
        <RouterPage />
      </ContextProvider>
    </div>
  )
}

export default App;