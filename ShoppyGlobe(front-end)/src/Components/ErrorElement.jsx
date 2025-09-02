import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorElement() {
  const navigate = useNavigate()
  const error = useRouteError()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e6f6ff] to-[#b3e0ff] text-[#22223b] font-sans">
      <div className="bg-white px-8 py-10 rounded-2xl shadow-xl text-center max-w-md border-2 border-[#00BFFF]/20">
        <svg
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 24 24"
          className="mx-auto mb-4"
        >
          <circle cx="12" cy="12" r="10" fill="#00BFFF" fillOpacity="0.15" />
          <path
            d="M9.17 9.17a3 3 0 0 1 5.66 0M9 15h6"
            stroke="#00BFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#00BFFF' }}>
          404 - Page Not Found
        </h2>
        <p className="mb-4 text-[#3a506b]">
          Oops! The page you are looking for does not exist or has been moved.<br />
          {error?.statusText || error?.message ? (
            <span className="text-red-500 text-base">{error.statusText || error.message}</span>
          ) : null}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-[#00BFFF] text-white rounded-lg font-semibold shadow hover:bg-[#009acd] transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}