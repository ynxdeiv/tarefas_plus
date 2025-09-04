import React from "react"

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex justify-center items-center min-h-[200px] w-full">
      <textarea
        className="w-full max-w-lg min-h-[120px] p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 shadow-md transition-all duration-200
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl"
        {...props}
      />
    </div>
  )
}
