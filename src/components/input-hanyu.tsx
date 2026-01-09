'use client'

import { addHanyu, addImage } from '@/app/server/actions.ts'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Define el esquema de validación con Zod
const hanyuSchema = z.object( {
    hanzi: z.string().min( 1, 'El carácter chino es requerido' ).max( 4, 'Máximo 4 caracteres' ),
    pinyin: z.string().min( 1, 'El pinyin es requerido' ),
    tone: z.string().optional(),
    xinbanya: z.string().min( 1, 'La traducción es requerida' ),
    img: z.any().optional() // Para el archivo de imagen
} )

type HanyuFormData = z.infer<typeof hanyuSchema>

export default function InputHanyu() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<HanyuFormData>( {
        resolver: zodResolver( hanyuSchema )
    } )

    const onSubmit = handleSubmit( async ( formData ) => {
        const img = formData.img?.[ 0 ]
        if ( !img ) {
            console.error( 'No se proporcionó ninguna imagen' )
            return
        }

        const formDATA = new FormData()
        formDATA.append( 'img', img )
        formDATA.append( 'source', 'form-hanyu' )

        try {
            const image = await addImage( formDATA )
            if ( !image?.message ) {
                throw new Error( 'Error al subir la imagen' )
            }

            await addHanyu( {
                hanzi: formData.hanzi,
                pinyin: formData.pinyin,
                xinbanya: formData.xinbanya,
                tone: formData.tone || null,
                img: image.message,
                source: 'form-hanyu'
            } )

            router.refresh()
        } catch ( error ) {
            console.error( 'Error al guardar:', error )
        }
    } )

    return (
        <section className='bg-dark-bg'>
            <article className='input-box-container'>
                <form className='input-form' onSubmit={ onSubmit }>
                    {/* Campo Hanzi */ }
                    <div>
                        <input
                            type='text'
                            placeholder='汉字'
                            className='input-hanzi'
                            { ...register( 'hanzi' ) }
                        />
                        { errors.hanzi && <p className="text-red-500 text-xs">{ errors.hanzi.message }</p> }
                    </div>

                    {/* Campo Pinyin */ }
                    <div>
                        <input
                            type='text'
                            placeholder='拼音'
                            className='input-hanyu'
                            { ...register( 'pinyin' ) }
                        />
                        { errors.pinyin && <p className="text-red-500 text-xs">{ errors.pinyin.message }</p> }
                    </div>

                    {/* Campo Tono */ }
                    <div>
                        <input
                            type='text'
                            placeholder='声调'
                            className='input-hanyu'
                            { ...register( 'tone' ) }
                        />
                    </div>

                    {/* Campo XINBANYA */ }
                    <div>
                        <input
                            type='text'
                            placeholder='西班呀语'
                            className='input-hanyu'
                            { ...register( 'xinbanya' ) }
                        />
                        { errors.xinbanya && <p className="text-red-500 text-xs">{ errors.xinbanya.message }</p> }
                    </div>

                    {/* Campo de imagen */ }
                    <div className='h-12'>
                        <input
                            type='file'
                            accept='image/*'
                            className='w-full h-16 text-md file:text-xs file:px-2 file:h-12 file:bg-x-hover'
                            { ...register( 'img' ) }
                        />
                    </div>

                    {/* Botón de envío */ }
                    <div>
                        <button type='submit' className='btn-main-hanyu'>
                            保持
                        </button>
                    </div>
                </form>
            </article>
        </section>
    )
}
