import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const { serverUrl, userData, setUserData } = useContext(userDataContext)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                name, email, password
            }, { withCredentials: true })
            setUserData(result.data)
            setLoading(false)
            navigate("/customize")
        } catch (error) {
            console.log(error)
            setUserData(null)
            setLoading(false)
            setErr(error.response?.data?.message || "An error occurred")
        }
    }

    return (
        <div className="bg-surface text-slate-200 font-body overflow-hidden min-h-screen" style={{ backgroundColor: '#111318' }}>
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl flex items-center justify-between px-8 py-6" style={{ backgroundColor: 'rgba(17, 19, 24, 0.8)' }}>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-2xl">blur_on</span>
                    <span className="font-headline text-xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">AETHERIS</span>
                </div>
                <div className="hidden md:flex gap-8">
                    <a className="font-headline text-xs tracking-widest text-slate-400 hover:text-cyan-300 transition-colors uppercase">Neural Network</a>
                    <a className="font-headline text-xs tracking-widest text-slate-400 hover:text-cyan-300 transition-colors uppercase">Sync Protocol</a>
                </div>
            </nav>
            <main className="relative w-full flex items-center justify-center px-4 overflow-hidden" style={{ minHeight: 'calc(100vh - 5rem)', paddingTop: '5rem' }}>
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-container opacity-10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-container opacity-5 blur-[150px] rounded-full"></div>
                </div>
                <div className="relative z-10 w-full max-w-[1200px] grid md:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
                    <div className="hidden lg:flex flex-col space-y-6 pr-8">
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-fixed-dim text-[10px] tracking-[0.3em] font-headline uppercase">Biometric Authenticated</span>
                            <h1 className="text-6xl lg:text-7xl font-headline font-bold leading-[0.9] text-primary tracking-tighter">
                                Create Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary-fixed" style={{ textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>Intelligence</span>
                            </h1>
                            <p className="text-slate-300 text-base max-w-sm font-light leading-relaxed">
                                Initialize your unique neural frequency and unlock the full potential of Aetheris intelligence.
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-8">
                            <div className="p-6 rounded-2xl glass-panel border border-outline-variant/10 space-y-3">
                                <span className="material-symbols-outlined text-primary-fixed-dim">hub</span>
                                <p className="text-[10px] font-headline tracking-widest text-slate-400 uppercase">Latency</p>
                                <p className="text-sm font-headline text-primary">0.02ms</p>
                            </div>
                            <div className="p-6 rounded-2xl glass-panel border border-outline-variant/10 space-y-3">
                                <span className="material-symbols-outlined text-secondary">memory</span>
                                <p className="text-[10px] font-headline tracking-widest text-slate-400 uppercase">Load</p>
                                <p className="text-sm font-headline text-primary">14.2%</p>
                            </div>
                            <div className="p-6 rounded-2xl glass-panel border border-outline-variant/10 space-y-3">
                                <span className="material-symbols-outlined text-cyan-400">security</span>
                                <p className="text-[10px] font-headline tracking-widest text-slate-400 uppercase">Level</p>
                                <p className="text-sm font-headline text-primary">X-12</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start justify-center">
                        <div className="w-full max-w-sm p-4 md:p-6 rounded-[2rem] glass-panel border border-black shadow-2xl relative">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-container/20 blur-2xl rounded-full"></div>
                            <div className="md:hidden text-center mb-4">
                                <h2 className="text-xl font-headline font-bold text-primary tracking-tight">Initialize Account</h2>
                                <p className="text-slate-300 text-xs mt-1">Create your neural frequency.</p>
                            </div>
                            <form className="space-y-12" onSubmit={handleSignUp}>
                                <div className="space-y-2 relative group">
                                    <label className="block text-[10px] font-headline tracking-[0.2em] text-slate-400 uppercase ml-1">Identity Identifier</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-transparent border-0 border-b border-slate-700 py-2 px-1 text-primary focus:ring-0 focus:border-primary-container focus:outline-none placeholder:text-slate-600 font-headline tracking-widest text-sm transition-all"
                                            placeholder="FULL NAME"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 text-sm">person</span>
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-container transition-all duration-500 group-focus-within:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 relative group">
                                    <label className="block text-[10px] font-headline tracking-[0.2em] text-slate-400 uppercase ml-1">Digital Vector</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-transparent border-0 border-b border-slate-700 py-2 px-1 text-primary focus:ring-0 focus:border-primary-container focus:outline-none placeholder:text-slate-600 font-headline tracking-widest text-sm transition-all"
                                            placeholder="IDENTITY@AETHERIS.OS"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 text-sm">alternate_email</span>
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-container transition-all duration-500 group-focus-within:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 relative group">
                                    <label className="block text-[10px] font-headline tracking-[0.2em] text-slate-400 uppercase ml-1">Security Cipher</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-transparent border-0 border-b border-slate-700 py-2 px-1 text-primary focus:ring-0 focus:border-primary-container focus:outline-none placeholder:text-slate-600 font-headline tracking-widest text-sm transition-all"
                                            placeholder="••••••••••••"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-primary-container transition-colors text-sm"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "lock_open"}</span>
                                        </button>
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-container transition-all duration-500 group-focus-within:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                                    </div>
                                </div>
                                {err && <p className="text-error text-xs">*{err}</p>}
                                <div className="pt-2">
                                    <button
                                        className="w-full py-2 rounded-full bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary font-headline font-bold tracking-[0.15em] text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "INITIALIZING..." : "CREATE ACCOUNT"}
                                        <span className="material-symbols-outlined text-xl">bolt</span>
                                    </button>
                                </div>
                            </form>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-outline-variant/30"></div>
                                    <span className="text-[8px] font-headline tracking-[0.1em] text-slate-500 uppercase">External Arrays</span>
                                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-outline-variant/30"></div>
                                </div>
                                <div className="flex justify-center gap-6">
                                    <button className="w-10 h-10 rounded-full glass-panel border border-outline-variant/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                                        <span className="material-symbols-outlined text-lg">language</span>
                                    </button>
                                    <button className="w-10 h-10 rounded-full glass-panel border border-outline-variant/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                                        <span className="material-symbols-outlined text-lg">fingerprint</span>
                                    </button>
                                    <button className="w-10 h-10 rounded-full glass-panel border border-outline-variant/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                                        <span className="material-symbols-outlined text-lg">mail</span>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <a className="text-[8px] font-headline tracking-[0.1em] text-cyan-400/70 hover:text-cyan-400 transition-colors uppercase cursor-pointer" onClick={() => navigate('/signin')}>Already Have An Identity?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-0 left-0 w-full p-8 hidden md:flex justify-between items-end opacity-40 pointer-events-none">
                <div className="space-y-1">
                    <p className="text-[8px] font-headline tracking-[0.4em] text-slate-500 uppercase">Terminal Status</p>
                    <p className="text-[10px] font-headline tracking-[0.2em] text-primary">ENCRYPTED END-TO-END</p>
                </div>
                <div className="flex gap-4">
                    <div className="w-1 h-1 rounded-full bg-primary-container animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-primary-container/50"></div>
                    <div className="w-1 h-1 rounded-full bg-primary-container/20"></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
