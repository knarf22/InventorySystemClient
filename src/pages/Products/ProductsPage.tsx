import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

export interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    price: number;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        quantity: "",
        price: "",
    });

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                sku: product.sku,
                category: product.category,
                quantity: product.quantity.toString(),
                price: product.price.toString(),
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                sku: "",
                category: "",
                quantity: "",
                price: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: formData.name,
            sku: formData.sku,
            category: formData.category,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
        };

        if (editingProduct) {
            setProducts(
                products.map((p) => (p.id === editingProduct.id ? newProduct : p))
            );
            console.log("Updated product:", newProduct);
        } else {
            setProducts([...products, newProduct]);
            console.log("Added new product:", newProduct);
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((p) => p.id !== id));
        console.log("Deleted product:", id);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">
                Products
            </h2>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="py-3 px-4 text-left">Product Name</th>
                            <th className="py-3 px-4 text-left">SKU</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-center w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-6 text-gray-400 italic"
                                >
                                    No products added yet.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4">{product.name}</td>
                                    <td className="py-3 px-4">{product.sku}</td>
                                    <td className="py-3 px-4">{product.category}</td>
                                    <td className="py-3 px-4">{product.quantity}</td>
                                    <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                                        <button
                                            onClick={() => handleOpenModal(product)}
                                            className="text-blue-500 hover:text-blue-700 transition"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add New Button */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primaryHover transition cursor-pointer"
                >
                    <Plus size={18} /> Add New Product
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
                        <h3 className="text-xl font-semibold text-primary mb-4">
                            {editingProduct ? "Edit Product" : "Add New Product"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 
               placeholder-gray-400 text-gray-900
               focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="text"
                                name="sku"
                                placeholder="SKU"
                                value={formData.sku}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 
               placeholder-gray-400 text-gray-900
               focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 
               placeholder-gray-400 text-gray-900
               focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 
               placeholder-gray-400 text-gray-900
               focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 
               placeholder-gray-400 text-gray-900
               focus:ring-2 focus:ring-primary focus:outline-none"
                            />

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition cursor-pointer"
                                >
                                    {editingProduct ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
