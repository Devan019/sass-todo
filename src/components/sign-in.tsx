import { Lock, LogIn, Mail, Sparkles } from "lucide-react";
import { InputField } from "./input";
import { MessageAlert } from "./message-alert";

export const SignInForm = ({ userData, setUserData, onSubmit, message, showPassword, setShowPassword }:{
  userData: { email: string; password: string };
  setUserData: (data: { email: string; password: string }) => void;
  onSubmit: (e:any) => Promise<void>;
  message: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) => (
  <div className="w-full max-w-md animate-slide-up">
    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4 animate-bounce-slow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-500">Sign in to continue your journey</p>
      </div>

      <div onSubmit={onSubmit} className="space-y-4">
        <InputField
          icon={Mail}
          type="email"
          placeholder="Email address"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        
        <InputField
          icon={Lock}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          onClick={onSubmit}
          type="button"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </button>

        {message && <MessageAlert message={message} type="error" />}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

    
      <div className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <a href="/sign-up" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
          Sign up
        </a>
      </div>
    </div>
  </div>
)
