import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { userDataContext } from "./context/UserContext"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Customize from "./pages/Customize"
import Home from "./pages/Home"
import Customize2 from "./pages/Customize2"
import AssistantDisplay from "./pages/AssistantDisplay"

function App() {
  const { userData, loading } = useContext(userDataContext)

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName
            ? <Home />
            : <Navigate to="/customize" />
        }
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />

      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
      <Route
        path="/assistant"
        element={userData ? <AssistantDisplay /> : <Navigate to="/signin" />}
      />
    </Routes>

  )
}

export default App
