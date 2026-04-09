import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios";
import { speakResponse, openUrlBasedOnType } from '../utils/assistantActions';

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate();


  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`,
        { withCredentials: true })
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }


  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition

    if (!SpeechRecognition) {
      console.error("SpeechRecognition API is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      // Speech recognition started
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log("heard:", transcript)

      // Skip processing if transcript is empty or too short (likely noise)
      if (!transcript || transcript.length < 4) {
        try {
          recognition.start()
        } catch (error) {
          console.error("Failed to restart recognition:", error)
        }
        return
      }

      const data = await getGeminiResponse(transcript)
      console.log("assistant response:", data)

      // Speak the response if available
      speakResponse(data?.response)

      // Handle opening URLs based on assistant response type
      if (data?.type) {
        console.log(`[Main] Triggering action for type: ${data.type}`)
        // Add a small delay to ensure speech synthesis starts before opening URL
        setTimeout(() => {
          openUrlBasedOnType(data.type, data.userInput)
        }, 300)
      }

      // Restart recognition after processing
      try {
        recognition.start()
      } catch (error) {
        console.error("Failed to restart recognition:", error)
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      try {
        recognition.start()
      } catch (error) {
        if (error.name !== 'InvalidStateError') {
          console.error("Failed to restart recognition after error:", error)
        }
      }
    }

    recognition.onend = () => {
      // Speech recognition ended
    }

    try {
      recognition.start()
    } catch (error) {
      console.error("Failed to start speech recognition:", error)
    }

    return () => {
      recognition.stop()
    }
  }, [getGeminiResponse])


  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-hidden" style={{ backgroundColor: '#090b12' }}>
      <header className="fixed top-0 w-full z-50 bg-[#111318]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00f0ff] text-2xl">blur_on</span>
          <span className="text-xl font-bold tracking-[0.2em] text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] font-headline">AETHER</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-outline-variant/30"></div>
        </div>
      </header>

      <main
        className="relative min-h-screen flex flex-col items-center justify-center pt-24"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(132, 148, 149, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(132, 148, 149, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary-container/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>

        <div className="relative group cursor-pointer">
          <div
            className="absolute inset-0 scale-150 opacity-60"
            style={{
              background: "radial-gradient(circle at center, rgba(0, 240, 255, 0.4) 0%, rgba(110, 6, 208, 0.1) 50%, transparent 70%)",
            }}
          ></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-surface-container-lowest border border-primary-container/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5"></div>
            <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border border-primary/10 overflow-hidden flex items-center justify-center">
              {userData?.assistantImage ? (
                <img
                  src={userData.assistantImage}
                  alt="assistant"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00f0ff_0%,_transparent_60%)] opacity-20"></div>
                  <span
                    className="material-symbols-outlined text-7xl md:text-8xl text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    hub
                  </span>
                </>
              )}
            </div>
            <div className="absolute inset-0 border-[1px] border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          </div>
        </div>

        <div className="mt-12 text-center z-10">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary mb-3">Aetheris Intelligence</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-primary-container rounded-full opacity-40"></div>
              <div className="w-1 h-5 bg-primary-container rounded-full opacity-100"></div>
              <div className="w-1 h-3 bg-primary-container rounded-full opacity-40"></div>
            </div>
            <span className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant">Listening...</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-6 z-20">
          <button
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-surface-container-highest/40 backdrop-blur-md border border-outline-variant/30 hover:border-primary-container/70 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            onClick={() => navigate('/customize')}
          >
            <span className="material-symbols-outlined text-primary group-hover:text-[#00dbe9] transition-colors">tune</span>
            <span className="font-label text-sm font-semibold uppercase tracking-widest text-on-surface group-hover:text-[#00dbe9] transition-colors">Customize</span>
          </button>
          <button
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-surface-container-highest/40 backdrop-blur-md border border-outline-variant/30 hover:border-primary-container/70 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            onClick={handleLogOut}
          >
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#00dbe9] transition-colors">logout</span>
            <span className="font-label text-sm font-semibold uppercase tracking-widest text-on-surface group-hover:text-[#00dbe9] transition-colors">Sign Out</span>
          </button>
        </div>

        <div className="absolute bottom-32 left-0 right-0 px-8 hidden lg:flex justify-center pointer-events-none">
          <div className="max-w-4xl w-full grid grid-cols-3 gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 pointer-events-auto">
            <div className="p-6 rounded-2xl bg-surface-container-low backdrop-blur-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-3">neurology</span>
              <h3 className="font-headline text-sm font-bold text-primary mb-1">Neural Processing</h3>
              <p className="text-xs text-on-surface-variant">Deep cognitive mapping for personalized response generation.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low backdrop-blur-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-3">security</span>
              <h3 className="font-headline text-sm font-bold text-primary mb-1">Encrypted Vault</h3>
              <p className="text-xs text-on-surface-variant">End-to-end sovereignty for all personal data streams.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low backdrop-blur-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-3">auto_awesome</span>
              <h3 className="font-headline text-sm font-bold text-primary mb-1">Predictive Tasks</h3>
              <p className="text-xs text-on-surface-variant">Anticipating requirements before they are vocalized.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
