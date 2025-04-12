'use client'
import { useForm } from 'react-hook-form'
import { addImage, addHanyu } from '@/app/server/actions.js'
import { useRouter } from 'next/navigation'

export default function Hanyu() {
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
        <section className='bg-x-color'>
            <article className='w-full flex flex-col justify-center items-center'>
                <form
                    className='min-w-sm max-w-md mt-10 bg-slate-700 rounded-md hover:shadow-lg hover:shadow-3-color p-2 flex flex-col gap-1'
                    onSubmit={onSubmit}
                >
                    {/* <!-- hanzi --> */}
                    <div>
                        <h1 className='w-full text-center text-3xl text-3-color uppercase pb-3'>汉语</h1>
                        <input type='text'
                            placeholder='汉字'
                            maxLength={4}
                            className='w-full h-[160px] text-9xl placeholder:text-12xl bg-2-color text-3-color placeholder:text-3-color text-center rounded-md focus:outline-4 focus:outline-3-color'
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
                            maxLength={24}
                            className='w-full h-16 text-3xl placeholder:text-12xl bg-2-color text-3-color placeholder:text-3-color italic text-center rounded-md'
                            {...register('pinyin')}
                        />
                    </div>
                    {/* <Hanyutone /> */}
                    {/* <!-- 声调 shēngdiào --> */}
                    <div className='flex items-center justify-between py-0 bg-indigo-600'>
                        <input type='text'
                            placeholder='声调'
                            maxLength={24}
                            className='w-full h-16 text-3xl placeholder:text-12xl bg-2-color text-3-color placeholder:text-3-color italic text-center rounded-md'
                            {...register('tone')}
                        />
                    </div>
                    {/* <!-- XIMBANYA --> */}
                    <div div className='w-full flex flex-col bg-2-color' >
                        <input type='text' placeholder='西班呀语' className='h-[50px] text-4xl text-center text-slate-50  placeholder:text-3-color rounded-md bg-2-color focus:ring-1 focus:ring-3-color '
                            {...register('xinbanya')}
                        />
                    </div>
                    <div className='my-2'>
                        <input type='file'
                            {...register('img')}
                        />
                    </div>
                    {/* button baochi:guardar */}
                    <div className='w-full text-center'>
                        <button className='w-2/3 py-2 text-2xl 
							hover:bg-3-color bg-2-color  hover:text-2-color text-3-color'>
                            保持
                        </button>
                    </div>
                </form>
            </article >
            {/* {false && <HanyuTable />} */}
        </section >
    )
}
