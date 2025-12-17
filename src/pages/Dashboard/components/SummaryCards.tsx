import { Package, Layers, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpCard } from "../../../animation";
import AnimatedNumber from "../../../components/ui/AnimatedNumber";

interface Props {
  totalProducts: number;
  totalCategories: number;
  totalSales: number;
  lowStockCount: number;
}

const SummaryCards = ({
  totalProducts,
  totalCategories,
  totalSales,
  lowStockCount,
}: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Products */}
      <motion.div
        variants={fadeUpCard}
        whileHover={{ y: -4 }}
        className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between"
      >
        <div>
          <p className="text-sm text-gray-500">Total Products</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1">
            <AnimatedNumber value={totalProducts} />
          </h3>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Package className="text-indigo-600" size={24} />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={fadeUpCard}
        whileHover={{ y: -4 }}
        className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between"
      >
        <div>
          <p className="text-sm text-gray-500">Categories</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1">
            <AnimatedNumber value={totalCategories} />
          </h3>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <Layers className="text-green-600" size={24} />
        </div>
      </motion.div>

      {/* Sales */}
      <motion.div
        variants={fadeUpCard}
        whileHover={{ y: -4 }}
        className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500">Total Sales</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1 truncate">
            <AnimatedNumber
              value={totalSales}
              format={(v) =>
                v.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                  maximumFractionDigits: 0,
                })
              }
            />
          </h3>
        </div>

        <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
          <span className="text-yellow-600 text-2xl leading-none">₱</span>
        </div>
      </motion.div>

      {/* Low Stock */}
      <motion.div
        variants={fadeUpCard}
        whileHover={{ y: -4 }}
        className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between"
      >
        <div>
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1">
            <AnimatedNumber value={lowStockCount} />
          </h3>
        </div>
        <div className="bg-red-100 p-3 rounded-full">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummaryCards;
