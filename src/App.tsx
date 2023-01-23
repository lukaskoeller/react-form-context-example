import './App.css'
import { PersonalDetailsCard, PersonalDetailsForm, Hint } from './components'
import { PersonalDetailsProvider } from './contexts/personalDetails'

function App() {

  return (
    <PersonalDetailsProvider>
      <div className="App">
        <h1>Example</h1>
        <Hint />
        <PersonalDetailsForm />
        <PersonalDetailsCard />
      </div>
    </PersonalDetailsProvider>
  )
}

export default App
