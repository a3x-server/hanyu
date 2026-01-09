'use client'

import { addHanyu, addImage } from '@/app/server/actions.ts'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// 📌 Esquema de validación con Zod
const hanyuSchema = z.object( {
    hanzi: z.string().min( 1, 'El carácter chino es requerido' ).max( 4, 'Máximo 4 caracteres' ),
    pinyin: z.string().min( 1, 'El pinyin es requerido' ),
    tone: z.string().optional(),
    xinbanya: z.string().min( 1, 'La traducción es requerida' ),
    img: z
        .any()
        .refine(
            ( files ) => !files || ( files.length > 0 && files[ 0 ].type.startsWith( 'image/' ) ),
            'Debe ser una imagen válida'
        )
        .optional()
} )

type HanyuFormData = z.infer<typeof hanyuSchema>

export default function InputHanyu() {
    const router = useRouter()
    const [ preview, setPreview ] = useState<string | null>( null )

    const { register, handleSubmit, formState: { errors } } = useForm<HanyuFormData>( {
        resolver: zodResolver( hanyuSchema )
    } )

    const onSubmit = handleSubmit( async ( formData ) => {
        const imgFile = formData.img?.[ 0 ]

        let imageUrl: string | null = null

        let formDATA = new FormData()
        formDATA.append( "source", "form-hanyu" )

        if ( imgFile ) {
            formDATA.append( "img", imgFile )
            const image = await addImage( formDATA )
            if ( !image?.message ) {
                throw new Error( "Error al subir la imagen" )
            }
            imageUrl = image.message
        }

        await addHanyu( {
            hanzi: formData.hanzi,
            pinyin: formData.pinyin,
            xinbanya: formData.xinbanya,
            tone: formData.tone || null,
            img: imageUrl, // puede ser null si no se subió nada
            source: "form-hanyu"
        } )

        router.refresh()
    } )

    // const onSubmit = handleSubmit( async ( formData ) => {
    //     const imgFile = formData.img?.[ 0 ]
    //     if ( !imgFile ) {
    //         console.error( 'No se proporcionó ninguna imagen' )
    //         return
    //     }

    //     const formDATA = new FormData()
    //     formDATA.append( 'img', imgFile )
    //     formDATA.append( 'source', 'form-hanyu' )

    //     try {
    //         const image = await addImage( formDATA )
    //         if ( !image?.message ) {
    //             throw new Error( 'Error al subir la imagen' )
    //         }

    //         await addHanyu( {
    //             hanzi: formData.hanzi,
    //             pinyin: formData.pinyin,
    //             xinbanya: formData.xinbanya,
    //             tone: formData.tone || null,
    //             img: image.message,
    //             source: 'form-hanyu'
    //         } )

    //         router.refresh()
    //     } catch ( error ) {
    //         console.error( 'Error al guardar:', error )
    //     }
    // } )

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
                        { errors.hanzi && <p className="text-red-500 text-xs">{ String( errors.hanzi.message ) }</p> }
                    </div>

                    {/* Campo Pinyin */ }
                    <div>
                        <input
                            type='text'
                            placeholder='拼音'
                            className='input-hanyu'
                            { ...register( 'pinyin' ) }
                        />
                        { errors.pinyin && <p className="text-red-500 text-xs">{ String( errors.pinyin.message ) }</p> }
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

                    {/* Campo Xinbanya */ }
                    <div>
                        <input
                            type='text'
                            placeholder='西班呀语'
                            className='input-hanyu'
                            { ...register( 'xinbanya' ) }
                        />
                        { errors.xinbanya && <p className="text-red-500 text-xs">{ String( errors.xinbanya.message ) }</p> }
                    </div>

                    {/* Campo de imagen */ }
                    <div className='h-12'>
                        <input
                            type='file'
                            accept='image/*'
                            className='w-full h-16 text-md file:text-xs file:px-2 file:h-12 file:bg-x-hover'
                            { ...register( 'img' ) }
                            onChange={ ( e ) => {
                                const file = e.target.files?.[ 0 ]
                                if ( file ) setPreview( URL.createObjectURL( file ) )
                            } }
                        />
                        { errors.img && <p className="text-red-500 text-xs">{ String( errors.img.message ) }</p> }
                    </div>

                    {/* Preview de la imagen */ }
                    { preview && (
                        <div className="mt-2">
                            <img src={ preview } alt="preview" className="w-32 h-32 object-cover rounded-md" />
                        </div>
                    ) }

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
