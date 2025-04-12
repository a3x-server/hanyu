'use client'
//! import { updateProduct, getOneProduct } from '@/app/server/actions.js'
import { useRouter } from 'next/navigation'
//[...]
export default function ButtonUpdate({ target }) {
    const { refresh, push } = useRouter()

    const handleUpdate = async (target) => {
        // const isExists = await getOneProduct(target)
        // console.log({ isExists })
        push(`/labs/update/${target}`)
    }

    return (
        <button
            onClick={() => handleUpdate(target)}
            className="text-2xl text-wrap text-center text-2-color tracking-wide bg-3-color border-3-color px-4 py-3 font-bold hover:bg-cyan-400 border-0"
        >
            update
        </button>
    )
}
