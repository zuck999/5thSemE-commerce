import CategoryItem from "@/components/ui/Categoryitems";
// import CategoryItem from "../components/CategoryItem";
// import { useProductStore } from "../stores/useProductStore";
// import FeaturedProducts from "../components/FeaturedProducts";
import {motion} from "framer-motion";

const categories = [
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpeg" },
	{ href: "/sweaters", name: "Sweaters", imageUrl: "/sweaters.jpeg" },
	{ href: "/supplements", name: "Supplements", imageUrl: "/Supplement.jpeg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpeg" },
	{ href: "/Perfumes", name: "Perfumes", imageUrl: "/perfumes.jpeg" },
	{ href: "/sports", name: "Sports", imageUrl: "/sports.jpeg" },
	{ href: "/jerseys", name: "jerseys", imageUrl: "/jercy.jpeg" },
	{ href: "/books", name: "books", imageUrl: "/books.jpeg" },
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpeg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpeg" },
];

const HomePage = () => {


	return (
		<motion.div className='relative min-h-screen text-white overflow-hidden'
		initial={{ opacity: 0, y: -30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
				<p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-2 pb-8 text-3xl font-bold text-transparent sm:text-7xl text-center ">
						Shop the Best, Forget the Rest				
				</p>

				<p className='relative z-20 bg-gradient-to-r from-neutral-200 to-neutral-600  bg-clip-text py-2 pb-8  font-bold text-transparent  text-center'>
					Explore a world of fashion, tech, and essentials—all in one place
				</p>

				 <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'> 
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

			</div>
		</motion.div>
	);
};
export default HomePage;
