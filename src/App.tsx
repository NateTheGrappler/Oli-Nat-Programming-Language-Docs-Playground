import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element = {<Layout />}/>

        {/*Just have it redirect since changing the way that everything loads in at this point in the project is too much hassle */}
        <Route path="/" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/contributing" element={<Navigate to="/docs/contributing/getting-started" replace />} />
        <Route path="/docs/guides" element={<Navigate to="/docs/guides/syntax" replace />} />
        <Route path="/docs/stdlib" element={<Navigate to="/docs/stdlib/overview" replace />} />
        <Route path="/docs/advanced-guides/" element={<Navigate to="/docs/advanced-guides/recursion" replace />} />
        <Route path="/docs/system-design" element={<Navigate to="/docs/system-design/introductionToDesign" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
