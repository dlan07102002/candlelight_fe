import { CategoryIcon } from "../../assets/icons";

interface IProductItem {
    product: any;
    handleEdit: Function;
    handleDeleteProduct: Function;
}
const ProductItem: React.FC<IProductItem> = ({
    product,
    handleDeleteProduct,
    handleEdit,
}) => {
    return (
        <tr key={product.productId}>
            <td>{product.productName}</td>
            <td>
                {product.category.map((item: any) => (
                    <CategoryIcon key={item} category={item} />
                ))}
            </td>
            <td>${product.sellPrice}</td>
            <td>{product.quantity ? product.quantity : 0}</td>

            <td
                className={
                    product.quantity > 0 ? "text-success" : "text-danger"
                }
                style={{ fontWeight: "bold" }}
            >
                {product.quantity > 0 ? "In Stock" : "Out of stock"}
            </td>
            <td>
                <button
                    style={{ width: "4rem" }}
                    className="btn btn-primary text-white me-2 p-0 mt-2"
                    onClick={() => handleEdit(product)}
                >
                    Edit
                </button>
                <button
                    style={{ width: "4rem" }}
                    className="btn btn-danger text-white p-0 mt-2 "
                    onClick={() => handleDeleteProduct(product.productId)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
export default ProductItem;
