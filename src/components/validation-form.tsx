import { ArrowRight, CheckCircle } from "lucide-react";
import { MessageAlert } from "./message-alert";
import { Dispatch, SetStateAction } from "react";

export const VerificationForm = ({ code, setCode, onSubmit, message }:{
  code: string
  setCode: Dispatch<SetStateAction<string>>
  onSubmit: (e: any) => Promise<void>;
  message: string
}) => (
  <div className="w-full max-w-md animate-slide-up">
    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 animate-pulse-slow">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Verify Email
        </h1>
        <p className="text-gray-500">Enter the code we sent to your email</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-center text-2xl font-semibold tracking-widest"
            maxLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          Verify & Continue
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {message && <MessageAlert message={message} type={message.includes("invalid") ? "error" : "info"} />}
      </form>

      <div className="text-center text-sm text-gray-500">
        Didn't receive the code?{' '}
        <button className="text-green-600 hover:text-green-700 font-semibold">
          Resend
        </button>
      </div>
    </div>
  </div>
)