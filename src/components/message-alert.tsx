export const MessageAlert = ({ message, type = "info" }:{
  message: string
  type: string
}) => {
  const bgColor = type === "success" ? "bg-green-50 border-green-200 text-green-800" : 
                  type === "error" ? "bg-red-50 border-red-200 text-red-800" : 
                  "bg-blue-50 border-blue-200 text-blue-800"
  
  return (
    <div className={`p-4 rounded-xl border ${bgColor} animate-fade-in`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}