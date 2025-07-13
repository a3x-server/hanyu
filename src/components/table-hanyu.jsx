'use client';
import { getHanyu } from '@/app/server/actions.ts'
import ButtonEraser from '@/components/sub-comp/button-eraser.jsx'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function TableHanyu() {
	const router = useRouter()
	const [ HANYU, setHANYU ] = useState( [] )

	// 获取汉语表格数据
	useEffect( () => {
		async function callHanyu() {
			const HANYU = await getHanyu()
			if ( !HANYU ) {
				console.error( '获取汉语数据失败' )
				return
			}
			console.log( '获取汉语数据成功', HANYU )
			setHANYU( HANYU )
		}
		callHanyu()
		router.push( '/' )
	}, [] )

	return (
		<section className="hanyu-table-container">
			<article className="hanyu-table-article">
				<div className="hanyu-table-div">
					<table className="table">
						<thead className="table-header">
							<tr className="header-row">
								<th className="cell first-col">汉字</th>
								<th className="cell">拼音</th>
								<th className="cell tone-col">音调吗</th>
								<th className="cell">西班呀语</th>
								<th className="cell end-col">删除</th>
							</tr>
						</thead>
						<tbody className="table-body">
							{ HANYU?.map( ( elm ) => (
								<tr key={ elm.id }>
									<td className="cell hanzi">{ elm.hanzi }</td>
									<td className="cell">{ elm.pinyin }</td>
									<td className="cell tone-col">{ elm.tone }</td>
									<td className="cell">{ elm.xinbanya }</td>
									<td className="cell delete-col">
										<ButtonEraser target={ elm.id } text="删除" />
									</td>
								</tr>
							) ) }
						</tbody>
						<tfoot className="table-footer">
							<tr>
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
