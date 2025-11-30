import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { InputField } from "./input";
import { MessageAlert } from "./message-alert";
import { Dispatch, SetStateAction } from "react";

export const RegistrationForm = ({ email, setEmail, password, setPassword, onSubmit, message }:{
  email: string;
  setEmail: Dispatch<SetStateAction<string>>
  password: string,
  setPassword: Dispatch<SetStateAction<string>>
  onSubmit: (e: any) => Promise<void>;
  message : string
}) => (
  <div className="w-full max-w-md animate-slide-up">
    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 animate-bounce-slow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-gray-500">Join us and start your journey</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          icon={Mail}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <InputField
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          Create Account
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        <div id="clerk-captcha"></div>

        {message && <MessageAlert message={message} type={message.includes("sent") ? "success" : "error"} />}
      </form>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/sign-in" className="text-purple-600 hover:text-purple-700 font-semibold">
          Sign in
        </a>
      </div>
    </div>
  </div>
)