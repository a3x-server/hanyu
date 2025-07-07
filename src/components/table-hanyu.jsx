'use client';
import { getHanyu } from '@/app/server/actions.ts'
import ButtonEraser from '@/components/sub-comp/button-eraser.jsx'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function TableHanyu() {
	const router = useRouter()
	const [HANYU, setHANYU] = useState([])

// 获取汉语表格数据
	useEffect(() => {async function callHanyu() {
	const HANYU = await getHanyu()
	if (!HANYU) {
		console.error('获取汉语数据失败')
		return
	}
	console.log('获取汉语数据成功', HANYU)
	setHANYU(HANYU)}
	callHanyu()
	router.refresh()
}, [])

	return (
		<section className="bg-1-bg text-1-hover/70 mt-12">
			<article className="w-full px-1 py-2 mx-auto">
				<div className="lg:w-1/2 w-full mx-auto overflow-hidden">
					<table className="table-auto w-full text-center whitespace-wrap mx-auto">
						<thead className="text-3xl px-auto">
							<tr className="bg-1-hover/90 text-1-bg">
								<th className="px-4 py-3 title-font tracking-wider font-medium text-3-color text-md bg-2-color rounded-tl rounded-bl">汉字</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-md text-3-color text-md bg-2-color">拼音</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-md text-3-color text-md bg-2-color md:block hidden">音调吗</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-md text-3-color text-md bg-2-color">西班呀语</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-md text-3-color text-md bg-2-color rounded-tr md:block hidden">删除</th>
							</tr>
						</thead>
						<tbody className="text-2xl">
							{HANYU?.map((elm) => <tr key={elm.id}>
								<td className="text-4xl px-4 py-3">{elm.hanzi}</td>
								<td className="px-4 py-3">{elm.pinyin}</td>
								<td className="px-4 py-3 md:block hidden">{elm.tone}</td>
								<td className="px-4 py-3">{elm.xinbanya}</td>
								{/* 删除 */}
								<td className="px-4 py-3 md:block hidden text-1-accent">
									<ButtonEraser target={elm.id} text={'删除'} />
								</td>
							</tr>)}
						</tbody>
						<tfoot className="bg-1-bg text-1-bg mt-16">
							<tr >
								<th>1</th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</article>
		</section>
	)
}
