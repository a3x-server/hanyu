import InputHanyu from "@/components/input-hanyu.jsx";
import TableHanyu from "@/components/table-hanyu.jsx";

export default function page() {
	return (
		<section className="bg-1-bg pb-12">
			<h1 className="card text-center text-8xl italic font-bold py-6 text-1-hover">汉语</h1>
			<InputHanyu />
			<TableHanyu />
		</section>
	);
}
