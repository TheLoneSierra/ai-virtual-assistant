import React, { useRef, useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import image2 from "../assets/botimg2.jpg"
import image3 from "../assets/botimg3.jpg"
import image4 from "../assets/botimg4.jpg"
import image5 from "../assets/botimg5.jpg"
import image6 from "../assets/botimg6.jpg"
import image7 from "../assets/botimg7.jpg"

function Customize() {
  const { serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage } = useContext(userDataContext)
  const inputImage = useRef()
  const navigate = useNavigate()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBackendImage(file)
      setFrontendImage(imageUrl)
      // Update global context with custom upload
      setUserData(prev => ({ ...prev, assistantImage: imageUrl }))
    }
  }

  const images = [
    { id: 'image2', src: image2, name: 'NEURAL-01' },
    { id: 'image3', src: image3, name: 'VOID-WAVE' },
    { id: 'image4', src: image4, name: 'CRYSTAL-CORE' },
    { id: 'image5', src: image5, name: 'SYNT-04' },
    { id: 'image6', src: image6, name: 'GHOST-ARCH' },
    { id: 'image7', src: image7, name: 'ORBIT-V' },
    { id: 'image8', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMZRy2_jmkM8vJvi714F1XyNGPrinajDwg5kYoFOASX9mttn7-HMlrdtQi9VMfykEsqEUnPNKskQJ50CTslTyxXNWFZRfEWStTZQK8-8ymmJNmW2w9wh0pUNSIOCERL63TVTcnMwgrN0nUOv8kryfK_C0ccjo3sKOzJvi7WhHpwSwVbMxoWrNgKVRdbuJGKPTCsbSXR0gB8E_SptQkac-CM96pVdHBXxzcn454XQIT_Vv336eYNrhTToGHtaXHBY78Uvq9PiEQi8g", name: 'PULSE-NODE' }
  ]

  return (
    <div className="h-screen w-full bg-[#090b12] text-slate-200 font-body overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="shrink-0 w-full z-50 bg-[#111318]/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-all"
            onClick={() => navigate('/')}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <h1 className="text-lg font-headline font-bold tracking-[0.2em] text-[#00f0ff]">AETHER</h1>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/30">
          <img alt="User" src={userData?.assistantImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBqNmArG-xNf_il0sEo4AZvwEmIHQ0pmMPWCy8UvhXFlqDB0y8-ft_0TZpQWGz8lmyWkrvzbjPIzxUIiRSlbLruRQfFySrU-peE_xQaUfNbDMyjHxDjLRp4s8wXDBjaHl6Z_szEEv3KyzM1M3y0yjWF8bGj64_T29Ak6huL_OTRg9IyNyDHaw0gmFwGVI5540JJwvfPHF_rtTQP2yo9E1rvr7i2gxhPd67yn0RVQWgXePoidHESy_ehZLkQnPUvrxnSX2KuFpPPtss"} />
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col justify-center px-4 md:px-10 max-w-7xl mx-auto w-full overflow-hidden py-4">
        <div className="mb-4 md:mb-6 text-center md:text-left">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-1">Configuration Phase</p>
          <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">Identity Matrix</h2>
          <p className="text-slate-400 mt-1 text-xs md:text-sm max-w-xl hidden sm:block">
            Select a visual manifestation for your intelligence.
          </p>
        </div>

        {/* COMPACT CARD GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 w-full">
          {/* CUSTOM UPLOAD CARD */}
          <button
            className={`relative group aspect-[3/4] flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all overflow-hidden ${selectedImage === "input"
              ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'border-white/10 hover:border-cyan-400/50 hover:bg-white/5'
              }`}
            onClick={() => {
              inputImage.current.click()
              setSelectedImage("input")
              if (frontendImage) {
                setUserData(prev => ({ ...prev, assistantImage: frontendImage }))
              }
            }}
          >
            {frontendImage ? (
              <img src={frontendImage} alt="Custom" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-slate-500 group-hover:text-cyan-400 transition-colors">add_circle</span>
                <span className="font-label text-[8px] uppercase tracking-widest text-slate-500">Custom</span>
              </div>
            )}
            {selectedImage === "input" && (
              <div className="absolute top-1 right-1 bg-cyan-400 text-black p-0.5 rounded-full">
                <span className="material-symbols-outlined text-[10px] font-bold">check</span>
              </div>
            )}
          </button>

          {/* PRESET CARDS */}
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative group aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === img.id
                ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'border-white/5 hover:border-cyan-400/40'
                }`}
              onClick={() => {
                setSelectedImage(img.id);
                setUserData(prev => ({ ...prev, assistantImage: img.src }));
              }}
            >
              <img
                alt={img.name}
                className={`w-full h-full object-cover transition-all duration-500 ${selectedImage !== img.id ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' : ''
                  }`}
                src={img.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-2">
                <h3 className="font-headline text-[9px] md:text-[10px] font-bold text-slate-200 truncate w-20">{img.name}</h3>
              </div>
              {selectedImage === img.id && (
                <div className="absolute top-1 right-1 bg-cyan-400 text-black p-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="shrink-0 w-full bg-[#111318]/90 backdrop-blur-2xl px-6 py-2 border-t border-white/5 flex flex-col items-center">
        <button
          className="w-full max-w-md py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-headline font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:text-[#00dbe9] hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          onClick={() => navigate('/customize2')}
          disabled={!selectedImage}
        >
          Initialize AI Name
        </button>
        <p className="mt-2 text-slate-500 font-label text-[8px] uppercase tracking-[0.2em]">
          Protocol: {selectedImage ? (images.find(i => i.id === selectedImage)?.name || 'Custom Core') : 'Awaiting Selection'}
        </p>
      </footer>

      <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage} />
    </div>
  )
}

export default Customize