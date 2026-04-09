import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from "axios"
import axiosRateLimit from 'axios-rate-limit'

export const userDataContext = createContext()
function UserContext({ children }) {
  const serverUrl = import.meta.env.BACKEND_URL || "http://localhost:8000"
  const [userData, setUserData] = useState(null)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const rateLimitedAxios = axiosRateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 60000 }) // 5 requests per minute

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGeminiResponse = async (command) => {
    try {
      const result = await rateLimitedAxios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      )
      return result.data
    } catch (error) {
      console.error("Error getting Gemini response:", error.message)
      return { response: "I'm sorry, I couldn't process your request right now. Please try again later." }
    }
  }

  useEffect(() => {
    handleCurrentUser()
  }, [])

  const value = {
    serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage,
    setFrontendImage, selectedImage, setSelectedImage, getGeminiResponse
  }
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
