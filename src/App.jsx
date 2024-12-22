import style from './App.module.css'
import RouterPage from './RouterComponent/Router';
import Header from './Header/Header.jsx';

function App() {
  return (
    <div className={style.app}>
      <Header/>
      <RouterPage />
    </div>
  )
}

export default App;