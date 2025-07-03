"use client"
import { eraserButton } from "@/app/server/actions.js"

export default function ButtonEraser({ target, text }) {
  const handleEraser = async (target, text) => {
    if (text === "删除") {
      const isErased = await eraserButton(target)
      console.log(isErased.message)
      return
    }

    const isErased = await eraserProductButton(target)
    console.log(isErased.message)
    return
  }

  return (
    <button
      onClick={() => handleEraser(target, text)}
      className="text-2xl text-wrap text-center text-2-color tracking-wide bg-3-color border-3-color px-4 py-3 font-bold hover:bg-cyan-400 border-0"
    >
      {text}
    </button>
  )
}
