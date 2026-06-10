'use client'

import { addHanyu, addImage } from '@/app/server/actions.ts'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Definimos los 5 tonos disponibles
const CHINESE_TONES = [
    { value: '1', label: '¯' },
    { value: '2', label: '´' },
    { value: '3', label: 'ˇ' },
    { value: '4', label: '`' },
    { value: '5', label: '·' }
]

// 📌 Esquema de validación actualizado con Zod
const hanyuSchema = z.object({
    hanzi: z.string().min(1, 'El carácter chino es requerido').max(4, 'Máximo 4 caracteres'),
    pinyin: z.string().min(1, 'El pinyin es requerido'),
    // Modificado: Ahora acepta un arreglo de strings mapeado desde los checkboxes
    tone: z.array(z.string()).default([]).optional(),
    riyu: z.string().optional(),
    xinbanya: z.string().min(1, 'La traducción es requerida'),
    img: z
        .any()
        .refine(
            (files) => !files || files.length === 0 || (files.length > 0 && files[0].type.startsWith('image/')),
            'Debe ser una imagen válida'
        )
        .optional()
})

type HanyuFormData = z.infer<typeof hanyuSchema>

export default function InputHanyu() {
    const router = useRouter()
    const [preview, setPreview] = useState<string | null>(null)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<HanyuFormData>({
        resolver: zodResolver(hanyuSchema),
        defaultValues: {
            tone: [] // Inicializamos como arreglo vacío
        }
    })

    const onSubmit = handleSubmit(async (formData) => {
        const imgFile = formData.img && formData.img.length > 0 ? formData.img[0] : null
        let imageUrl: string | null = null

        if (imgFile) {
            let formDATA = new FormData()
            formDATA.append("source", "form-hanyu")
            formDATA.append("img", imgFile)

            const image = await addImage(formDATA)
            if (!image?.message) {
                throw new Error("Error al subir la imagen")
            }
            imageUrl = image.message
        }

        // Convertimos el arreglo ['1', '3'] en un string ordenado "1, 3" para Prisma
        const toneString = formData.tone && formData.tone.length > 0
            ? formData.tone.sort().join(', ')
            : null

        try {
            const result = await addHanyu({
                hanzi: formData.hanzi,
                pinyin: formData.pinyin,
                xinbanya: formData.xinbanya,
                riyu: formData.riyu || null,
                tone: toneString, // Enviamos el string formateado
                img: imageUrl,
            });

            if (result?.message) {
                alert(result.message);
                reset();
                setPreview(null);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error en la solicitud:", error.message);
            } else {
                console.error("Error inesperado:", error);
            }
        }

        router.refresh()
    })

    const { onChange, ...imgRegister } = register('img')

    return (
        <section className='bg-dark-bg'>
            <article className='input-box-container'>
                <form className='input-form' onSubmit={onSubmit}>

                    {/* Campo Hanzi */}
                    <div>
                        <input
                            type='text'
                            placeholder='汉字'
                            className='input-hanzi'
                            {...register('hanzi')}
                        />
                        {errors.hanzi && <p className="text-red-500 text-xs">{String(errors.hanzi.message)}</p>}
                    </div>

                    {/* Campo Pinyin */}
                    <div>
                        <input
                            type='text'
                            placeholder='拼音'
                            className='input-hanyu'
                            {...register('pinyin')}
                        />
                        {errors.pinyin && <p className="text-red-500 text-xs">{String(errors.pinyin.message)}</p>}
                    </div>

                    {/* Campo Tonos (Selección Múltiple mediante Checkboxes) */}
                    {/* Campo Tonos (Botones de Selección Múltiple) */}
                    <div className='w-full mx-auto text-center flex flex-col items-center gap-2 p-3 bg-x-hover'>
                        <span className='input-hanyu'>
                            音调
                        </span>
                        <div className='flex flex-wrap gap-2'>
                            {CHINESE_TONES.map((tone) => {
                                const isSelected = watch('tone')?.includes(tone.value);

                                return (
                                    <label
                                        key={tone.value}
                                        className={`w-8 h-8 
                        px-3 py-1 rounded-full text-xl text-center font-semibold cursor-pointer 
                        transition-all duration-200 select-none 
                        ${isSelected
                                                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-900/20'
                                                : 'bg-dark-bg text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }
                    `}
                                    >
                                        <input
                                            type='checkbox'
                                            value={tone.value}
                                            className='hidden' // Ocultamos el checkbox cuadrado nativo
                                            {...register('tone')}
                                        />
                                        {tone.label}
                                    </label>
                                );
                            })}
                        </div>
                    </div>


                    { /* Campo Riyu */}
                    <div>
                        <input
                            type='text'
                            placeholder='日语'
                            className='input-hanyu'
                            {...register('riyu')}
                        />
                        {errors.riyu && <p className="text-red-500 text-xs">{String(errors.riyu.message)}</p>}
                    </div>

                    {/* Campo Xinbanya */}
                    <div>
                        <input
                            type='text'
                            placeholder='西班呀语'
                            className='input-hanyu'
                            {...register('xinbanya')}
                        />
                        {errors.xinbanya && <p className="text-red-500 text-xs">{String(errors.xinbanya.message)}</p>}
                    </div>

                    {/* Campo de imagen */}
                    <div className='h-12'>
                        <input
                            type='file'
                            accept='image/*'
                            className='w-full h-16 text-md file:text-xs file:px-2 file:h-12 file:bg-x-hover'
                            {...imgRegister}
                            onChange={(e) => {
                                onChange(e);
                                const file = e.target.files?.[0]
                                if (file) setPreview(URL.createObjectURL(file))
                            }}
                        />
                        {errors.img && <p className="text-red-500 text-xs">{String(errors.img.message)}</p>}
                    </div>

                    {/* Preview de la imagen */}
                    {preview && (
                        <div className="mt-2">
                            <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-md" />
                        </div>
                    )}

                    {/* Botón de envío */}
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
