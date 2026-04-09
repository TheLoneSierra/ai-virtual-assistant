import React, { useState, useContext } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import image4 from "../assets/botimg4.jpg"
import image5 from "../assets/botimg5.jpg"
import image6 from "../assets/botimg6.jpg"
import image7 from "../assets/botimg7.jpg"

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const presetImages = {
    image2: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0YttaPtIbCFGEEJ7kY8DBC5yYnnWo_wblBT5KELklXNdPD6wD2aX5k5E1wTgvfAm-SAiub6f8kRXwG9pnK5_mEKQ5TAlCNqf6fbsfNZkVlfgY_m6WhQG2Eo0gUEhEsu8S9MKRThyAND50M2pBlvW5snahk_ZpYK7-rkaXlQLwVAsAI3MaYahicp365S_EJCO1BllRyX9ORyq6fAXvxI0POkyLIo4xz5gVLzBlfYX6zYBCx4grr_yP1NaCaKgH8siHwopTdXxm7ck",
    image3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMZRy2_jmkM8vJvi714F1XyNGPrinajDwg5kYoFOASX9mttn7-HMlrdtQi9VMfykEsqEUnPNKskQJ50CTslTyxXNWFZRfEWStTZQK8-8ymmJNmW2w9wh0pUNSIOCERL63TVTcnMwgrN0nUOv8kryfK_C0ccjo3sKOzJvi7WhHpwSwVbMxoWrNgKVRdbuJGKPTCsbSXR0gB8E_SptQkac-CM96pVdHBXxzcn454XQIT_Vv336eYNrhTToGHtaXHBY78Uvq9PiEQi8g",
    image4: image4,
    image5: image5,
    image6: image6,
    image7: image7,
    image8: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMZRy2_jmkM8vJvi714F1XyNGPrinajDwg5kYoFOASX9mttn7-HMlrdtQi9VMfykEsqEUnPNKskQJ50CTslTyxXNWFZRfEWStTZQK8-8ymmJNmW2w9wh0pUNSIOCERL63TVTcnMwgrN0nUOv8kryfK_C0ccjo3sKOzJvi7WhHpwSwVbMxoWrNgKVRdbuJGKPTCsbSXR0gB8E_SptQkac-CM96pVdHBXxzcn454XQIT_Vv336eYNrhTToGHtaXHBY78Uvq9PiEQi8g",
  }

  const getImageUrl = () => {
    if (backendImage) return null
    if (selectedImage === "input") return null
    return presetImages[selectedImage] || selectedImage
  }

  const handleUpdateAssistant = async () => {
    try {
      setLoading(true)
      const imageUrl = getImageUrl()

      let result
      if (backendImage) {
        const formData = new FormData()
        formData.append("assistantName", assistantName)
        formData.append('assistantImage', backendImage)
        result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
      } else {
        const payload = {
          assistantName,
          ...(imageUrl ? { imageUrl } : {}),
        }
        result = await axios.post(`${serverUrl}/api/user/update`, payload, { withCredentials: true })
      }

      console.log(result.data)
      setUserData(result.data)
      navigate('/assistant')
    } catch (error) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] text-white font-body selection:bg-primary-container/30 relative overflow-hidden'>
      {/* Shell Suppression: This is a task-focused screen (customization step), so BottomNavBar is suppressed. */}
      {/* Top Bar (Back Action Focus) */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-8">
        <button className="group flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-highest/20 backdrop-blur-md transition-all duration-300 hover:bg-surface-container-highest/40" onClick={() => navigate("/customize")}>
          <span className="material-symbols-outlined text-white group-hover:text-primary transition-colors">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-on-surface-variant/30"></span>
          <span className="w-8 h-1 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.5)]"></span>
          <span className="w-2 h-2 rounded-full bg-on-surface-variant/30"></span>
        </div>
        <div className="w-12"></div> {/* Spacer for symmetry */}
      </header>
      {/* Main Content Canvas */}
      <main className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-32 overflow-hidden">
        {/* Ambient Light Leak */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="w-full max-w-2xl text-center space-y-12 relative z-10">
          {/* Header Section */}
          <div className="space-y-4">
            <p className="font-headline text-primary-fixed-dim text-xs uppercase tracking-[0.4em] font-semibold opacity-80">Phase 02 / Identification</p>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-white">
              Assign Identity
            </h1>
            <p className="text-white/80 font-body text-lg max-w-md mx-auto">
              Define the semantic anchor for your customized Aether intelligence unit.
            </p>
          </div>
          {/* Input Section */}
          <div className="relative group max-w-md mx-auto w-full">
            <label className="absolute -top-3 left-6 px-2 bg-background font-label text-[10px] uppercase tracking-widest text-white z-20">Assistant Moniker</label>
            <input
              className="w-full bg-surface-container-lowest/40 backdrop-blur-xl border-b-2 border-outline-variant py-6 px-8 text-2xl font-headline text-white placeholder:text-white/20 focus:outline-none focus:border-primary-container transition-all duration-500 rounded-t-2xl glow-input shadow-[0_0_20px_rgba(0,240,255,0.3)]" style={{
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)'
              }}
              placeholder="e.g., Nova"
              type="text"
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
            />
            {/* Decorative Underline Glow */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all duration-700 group-focus-within:w-full"></div>
          </div>
          {/* Hint Text */}
          <div className="flex items-center justify-center gap-4 text-white/60">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="font-label text-xs uppercase tracking-widest">Naming influences initial neural weightings</span>
          </div>
        </div>
        {/* Floating Button Anchor (Bottom) */}
        <div className="fixed bottom-12 w-full max-w-md px-6 left-1/2 -translate-x-1/2">
          <button
            className="w-full group relative overflow-hidden rounded-full py-5 px-8 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-fixed-dim text-on-primary font-headline font-bold text-lg tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,219,233,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" style={{
              boxShadow: '0 0 25px rgba(0, 219, 233, 0.4), 0 0 15px rgba(0, 240, 255, 0.2)'
            }}
            disabled={loading || !assistantName}
            onClick={handleUpdateAssistant}
          >
            <span className="relative z-10">{loading ? "Loading..." : "Initialize Assistant"}</span>
            <span className="material-symbols-outlined relative z-10 transition-transform duration-300 group-hover:translate-x-1">bolt</span>
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <p className="mt-4 text-center font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
            System: AETHER v4.0.2 Ready
          </p>
        </div>
      </main >
      {/* Decoration Layer: Faint Data Stream */}
      < div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10" >
        <div className="absolute top-0 right-10 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        <div className="absolute top-0 right-40 h-full w-[1px] bg-gradient-to-b from-transparent via-primary-container to-transparent opacity-30"></div>
        <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-20"></div>
      </div >
    </div >
  )
}

export default Customize2
