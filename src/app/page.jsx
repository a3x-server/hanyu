import InputHanyu from "@/components/input-hanyu.jsx";
import HanyuTable from "@/components/table-hanyu.jsx";

export default function page() {
	return (
		<section className="bg-1-bg pb-12">
			<h1 className="w-full text-center text-7xl text-1-hover">
				汉语
			</h1>
			<InputHanyu />
			<HanyuTable />
		</section>
	);
}
