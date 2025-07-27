import InputHanyu from "@/components/input-hanyu.tsx";
import TableHanyu from "@/components/table-hanyu.tsx";

export default function page() {
	return (
		<section className="page-box">
			<h1 className="h1-main">汉语</h1>
			<InputHanyu />
			<TableHanyu />
		</section>
	);
}
