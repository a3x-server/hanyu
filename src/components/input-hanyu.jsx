'use client'
import { useForm } from 'react-hook-form'
import { addImage, addHanyu } from '@/app/server/actions.ts'
import { useRouter } from 'next/navigation'

export default function InputHanyu() {
    const router = useRouter()
    const { register, handleSubmit } = useForm( {} )

    const onSubmit = handleSubmit( async ( data ) => {
        const img = data.img[ 0 ]
        const formDATA = new FormData()
        formDATA.append( 'img', img )
        formDATA.append( 'source', 'form-hanyu' )

        const image = await addImage( formDATA )

        //if (!image) return

        try {
            data.img = image.message
            await addHanyu( data )
            router.refresh()
            return
        } catch ( error ) {
            console.error( error )
        }
    } )

    return (
        <section className='bg-dark-bg'>
            <article className='input-box-container'>
                <form
                    className='input-form'
                    onSubmit={ onSubmit }
                >
                    {/* <!-- hanzi --> */ }
                    <div>
                        <input type='text'
                            placeholder='汉字'
                            maxLength={ 4 }
                            className='input-hanzi'
                            { ...register( 'hanzi', {
                                required: {
                                    value: true,
                                    message: '怎么样'
                                }
                            } ) }
                        />
                    </div>
                    {/* <!-- pinyin --> */ }
                    <div>
                        <input type='text'
                            placeholder='拼音'
                            maxLength={ 16 }
                            className='input-hanyu'
                            { ...register( 'pinyin' ) }
                        />
                    </div>
                    {/* <Hanyutone /> */ }
                    {/* <!-- 声调 shēngdiào --> */ }
                    <div >
                        <input type='text'
                            placeholder='声调'
                            maxLength={ 8 }
                            className='input-hanyu'
                            { ...register( 'tone' ) }
                        />
                    </div>
                    {/* <!-- XIMBANYA --> */ }
                    <div>
                        <input type='text' placeholder='西班呀语' className='input-hanyu'
                            { ...register( 'xinbanya' ) }
                        />
                    </div>
                    <div className='h-12'>
                        <input type='file'
                            accept='image/*'
                            className='w-full h-16 text-md file:text-xs file:px-2 file:h-12 file:bg-x-hover'
                            { ...register( 'img' ) }
                        />
                    </div>
                    {/* button baochi:guardar */ }
                    <div>
                        <button type='submit' className='btn-main-hanyu'>
                            保持
                        </button>
                    </div>
                </form>
            </article >
            {/* {false && <HanyuTable />} */ }
        </section >
    )
}
