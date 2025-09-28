import { useState } from 'react'
import MetroAILanding from "./MetroAILanding.jsx"
import New from "./New.jsx"
import AddTrain from './AddTrain.jsx'

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing' or 'dashboard'

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleNavigateToLanding = () => {
    setCurrentView('landing')
  }

  return (
    <div className="min-h-screen w-full">
      {currentView === 'landing' ? (
        <MetroAILanding onNavigateToDashboard={handleNavigateToDashboard} />
      ) : (
        <New onNavigateToLanding={handleNavigateToLanding} />
      )}
    </div>
  )
}

export default App;
