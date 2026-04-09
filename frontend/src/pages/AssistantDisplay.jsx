import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { speakResponse, openUrlBasedOnType } from '../utils/assistantActions'

function AssistantDisplay() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  const assistantName = userData?.assistantName || 'AETHER'
  const assistantImage = userData?.assistantImage

  useEffect(() => {
    const refreshUserData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })

        // Merge logic: Use backend data but prioritize our session's assistantImage selection
        setUserData(prev => ({
          ...response.data,
          assistantImage: prev?.assistantImage || response.data?.assistantImage
        }))
      } catch (error) {
        console.error("Failed to refresh user data:", error)
      }
    }
    refreshUserData()
  }, [serverUrl, setUserData])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported")
      return
    }

    const recognitionInstance = new SpeechRecognition()
    recognitionInstance.continuous = false
    recognitionInstance.interimResults = false
    recognitionInstance.lang = 'en-US'

    recognitionInstance.onstart = () => setIsListening(true)
    recognitionInstance.onend = () => setIsListening(false)

    recognitionInstance.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      if (!transcript || transcript.length < 4) {
        try { recognitionInstance.start() } catch (err) { }
        return
      }

      const data = await getGeminiResponse(transcript)
      speakResponse(data?.response)

      if (data?.type) {
        setTimeout(() => {
          openUrlBasedOnType(data.type, data.userInput)
        }, 300)
      }

      try { recognitionInstance.start() } catch (err) { }
    }

    recognitionInstance.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        try { recognitionInstance.start() } catch (err) { }
      }
    }

    setRecognition(recognitionInstance)
  }, [getGeminiResponse])

  const handleMicClick = () => {
    if (recognition) {
      isListening ? recognition.stop() : recognition.start()
    }
  }

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      navigate('/signin')
    } catch (error) {
      navigate('/signin')
    }
  }

  return (
    <div className='w-full h-screen bg-[#090b12] text-slate-200 font-body overflow-hidden flex flex-col'>
      {/* Fixed Header */}
      <header className='shrink-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <span className='material-symbols-outlined text-cyan-400 text-lg sm:text-2xl'>sensors</span>
          <span className='font-headline tracking-tight text-xs sm:text-lg font-bold text-cyan-400'>System Active</span>
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          <button
            onClick={handleLogOut}
            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all'
          >
            <span className='material-symbols-outlined text-xs sm:text-sm text-slate-300'>logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 relative flex flex-col items-center justify-center p-4 overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none opacity-30'>
          <div className='absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[100px]'></div>
        </div>

        <div className='relative flex flex-col items-center w-full text-center z-10'>
          <div className='mb-4 sm:mb-8'>
            <span className='font-headline font-medium text-[7px] sm:text-[10px] tracking-[0.3em] text-cyan-400/60 uppercase py-1 px-3 border border-cyan-400/20 rounded-full'>
              Visualization Node
            </span>
          </div>

          {/* Avatar Area - Displays your Selected Image */}
          <div className='relative mb-6 sm:mb-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72'>
            <div className='absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-20'></div>
            <div className='w-full h-full rounded-full p-1 bg-gradient-to-tr from-cyan-400/30 to-transparent'>
              <div className='w-full h-full rounded-full overflow-hidden border border-cyan-400/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]'>
                {assistantImage ? (
                  <img
                    alt='Avatar'
                    className='w-full h-full object-cover grayscale brightness-110 contrast-110'
                    src={assistantImage}
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-slate-900'>
                    <span className='material-symbols-outlined text-4xl sm:text-6xl text-cyan-400/30'>smart_toy</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='w-full max-w-sm sm:max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 sm:p-10 mx-auto'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 truncate'>
              {assistantName}
            </h1>
            <p className='text-[10px] sm:text-sm text-slate-400 mb-6 sm:mb-8 uppercase tracking-widest'>
              {isListening ? 'Processing audio stream...' : 'Awaiting verbal command'}
            </p>

            <div className='flex items-end justify-center gap-1 h-6 sm:h-8'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${isListening ? 'animate-bounce h-full' : 'h-1 opacity-20'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Nav */}
      <nav className='shrink-0 w-full z-50 bg-[#0d0d12]/90 backdrop-blur-2xl border-t border-white/5 px-4 pb-6 pt-2 flex justify-around items-center'>
        <button className='p-3 text-slate-500 hover:text-cyan-400'><span className='material-symbols-outlined'>history</span></button>
        <button className='p-3 text-slate-500 hover:text-cyan-400'><span className='material-symbols-outlined'>settings</span></button>
        <button
          onClick={handleMicClick}
          className={`relative -top-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isListening ? 'bg-cyan-400 text-black scale-110 shadow-cyan-400/40' : 'bg-slate-800 text-cyan-400'
            }`}
        >
          <span className='material-symbols-outlined text-2xl sm:text-3xl'>{isListening ? 'mic' : 'mic_none'}</span>
        </button>
        <button className='p-3 text-slate-500 hover:text-cyan-400'><span className='material-symbols-outlined'>home</span></button>
        <button onClick={() => navigate('/')} className='p-3 text-slate-500 hover:text-cyan-400'><span className='material-symbols-outlined'>hub</span></button>
      </nav>
    </div>
  )
}

export default AssistantDisplay