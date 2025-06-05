import iconTrash from '@/assets/images/icons/icon-trash.svg';

interface Props {
    readonly cartItem: { image: string; name: string; quantity: number; price: string };
}

export function CartItemSliderProduct({ cartItem }: Props) {
    return (
        <li className="single-item">
            <div className="box">
                <a href="" className="image">
                    <img src={cartItem.image} alt="" className="offcanvas-wishlist-image" />
                </a>
                <div className="content">
                    <a href="" className="title">
                        {cartItem.name}
                    </a>
                    <div className="offcanvas-wishlist-item-details">
                        <span className="offcanvas-wishlist-item-details-quantity">{cartItem.quantity} x </span>
                        <span className="offcanvas-wishlist-item-details-price">${cartItem.price}</span>
                    </div>
                </div>
            </div>
            <div className="item-delete text-right">
                <a href="#">
                    <img src={iconTrash} alt="" />
                </a>
            </div>
        </li>
    );
}
