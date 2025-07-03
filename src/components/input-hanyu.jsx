'use client'
import { useForm } from 'react-hook-form'
import { addImage, addHanyu } from '@/app/server/actions.js'
import { useRouter } from 'next/navigation'

export default function InputHanyu() {
    const { refresh } = useRouter()
    const { register, handleSubmit } = useForm({})

    const onSubmit = handleSubmit(async (data) => {
        const img = data.img[ 0 ]
        const formDATA = new FormData()
        formDATA.append('img', img)
        formDATA.append('source', 'form-hanyu')

        const image = await addImage(formDATA)

        //if (!image) return

        try {
            data.img = image.message
            await addHanyu(data)
            refresh()
            return
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <section className='bg-1-bg'>
            <article className='w-full flex flex-col justify-center items-center'>
                <form
                    className='card min-w-sm max-w-md mt-10 bg-2-text/30 rounded-md py-4 px-2 flex flex-col gap-0.5'
                    onSubmit={onSubmit}
                >
                    {/* <!-- hanzi --> */}
                    <div>
                        <input type='text'
                            placeholder='汉字'
                            maxLength={4}
                            className='w-full h-64 text-9xl bg-1-hover text-dark-text placeholder:text-2-bg text-center rounded-md focus:bg-2-text/30 focus:text-1-accent focus:outline-2 focus:outline-3-color'
                            {...register('hanzi', {
                                required: {
                                    value: true,
                                    message: '怎么样'
                                }
                            })}
                        />
                    </div>
                    {/* <!-- pinyin --> */}
                    <div>
                        <input type='text'
                            placeholder='拼音'
                            maxLength={16}
                            className='input_hanyu'
                            {...register('pinyin')}
                        />
                    </div>
                    {/* <Hanyutone /> */}
                    {/* <!-- 声调 shēngdiào --> */}
                    <div className='flex items-center justify-between py-0 bg-1-hover'>
                        <input type='text'
                            placeholder='声调'
                            maxLength={8}
                            className='input_hanyu'
                            {...register('tone')}
                        />
                    </div>
                    {/* <!-- XIMBANYA --> */}
                    <div className='w-full flex flex-col bg-1-hover' >
                        <input type='text' placeholder='西班呀语' className='input_hanyu'
                            {...register('xinbanya')}
                        />
                    </div>
                    <div className='h-12'>
                        <input type='file'
                            accept='image/*'
                            className='w-full h-16 text-md file:text-xs file:px-2 file:h-12 file:bg-1-hover'
                            {...register('img')}
                        />
                    </div>
                    {/* button baochi:guardar */}
                    <div className='w-full text-center'>
                        <button type='button' className='input_hanyu hover:bg-1-link cursor-pointer'>
                            保持
                        </button>
                    </div>
                </form>
            </article >
            {/* {false && <HanyuTable />} */}
        </section >
    )
}
