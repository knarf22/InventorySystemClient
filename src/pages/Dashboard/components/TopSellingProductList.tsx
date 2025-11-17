interface Props {
  topSellingProducts: { name: string; sold: number }[];
}

const TopSellingProductsList = ({ topSellingProducts }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Selling Products</h2>

      <ul className="divide-y">
        {topSellingProducts.map((item, idx) => (
          <li key={idx} className="flex justify-between py-2">
            <span>{item.name}</span>
            <span className="text-gray-700 font-medium">{item.sold} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProductsList;
