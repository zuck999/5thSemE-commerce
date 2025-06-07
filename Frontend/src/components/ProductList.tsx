import { useProductStore } from "@/store/useProductStore";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const ProductsList: React.FC = () => {
  const { deleteProduct,  products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className="bg-[#0d0d0d] text-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="border border-zinc-700 ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#0d0d0d] divide-y divide-gray-700">
          {products?.map((product: Product) => (
            <tr key={product._id} className="hover:bg-[#393a3a4c]">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">${product.price.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;