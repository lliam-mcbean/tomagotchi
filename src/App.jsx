import './App.css'
import World from './components/world'
import { AuthProvider } from './context/auth'

function App() {

  return (
    <AuthProvider>
          <div className='w-screen h-screen'>
            <World />
          </div>
    </AuthProvider>
  )
}

export default App
