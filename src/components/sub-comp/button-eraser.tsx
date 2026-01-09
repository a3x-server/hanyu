"use client"

import { eraserButton } from "@/app/server/actions.ts"

export default function ButtonEraser( { target, text }: { target: string; text: string } ) {
  const handleEraser = async ( target: string, text: string ) => {
    if ( text === "删除" ) {
      await eraserButton( target )
      return { message: "已删除" }
    }

    //   await eraserProductButton( target as string )
    //   // console.log(isErased.message)
    //   return
    // }

    return (
      <button
        type="button"
        onClick={ () => handleEraser( target, text ) }
        className="text-2xl text-wrap text-center text-1-bg tracking-wide bg-1-hover border-1-hover px-4 py-3 font-bold hover:bg-1-button-hover border-0"
      >
        { text }
      </button>
    )
  }
}
