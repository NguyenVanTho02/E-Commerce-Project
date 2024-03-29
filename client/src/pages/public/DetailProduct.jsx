import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../apis";
import {
    Breadcrumb,
    Button,
    SelectQuantity,
    ProductExtraInfoItem,
    ProductInfomation,
    CustomSlider,
} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import {
    formatMoney,
    formatPrice,
    renderStarFromNumber,
} from "../../ultils/helpers";
import { productExtraInformation } from "../../ultils/contants";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) {
            setProduct(response.productData);
        }
    };
    const fetchProducts = async () => {
        const response = await apiGetProducts({ category });
        if (response.success) {
            setRelatedProducts(response.products);
        }
    };
    useEffect(() => {
        if (pid) {
            fetchProductData();
            fetchProducts();
        }
    }, [pid]);

    const handleQuantity = useCallback(
        (number) => {
            if (!Number(number) || Number(number) < 0) {
                return;
            } else {
                setQuantity(number);
            }
        },
        [quantity]
    );

    const handleChangeQuantity = useCallback(
        (flag) => {
            if (flag === "minus" && quantity === 1) return;
            if (flag === "minus") setQuantity((prev) => +prev - 1);
            if (flag === "plus") setQuantity((prev) => +prev + 1);
        },
        [quantity]
    );

    return (
        <div className="w-full">
            <div className="h-[81px] flex justify-center items-center bg-gray-100">
                <div className="w-main">
                    <h3 className="font-semibold">{title}</h3>
                    <Breadcrumb title={title} category={category} />
                </div>
            </div>
            <div className="w-main m-auto mt-4 flex">
                <div className="flex flex-col gap-4 w-2/5">
                    <div className="h-[458px] w-[458px] border">
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: "Wristwatch by Ted Baker London",
                                    isFluidWidth: true,
                                    src: product?.thumb,
                                },
                                largeImage: {
                                    src: product?.thumb,
                                    width: 1800,
                                    height: 1500,
                                },
                            }}
                        />
                    </div>
                    <div className="w-[458px]">
                        <Slider
                            className="image-slider flex gap-2"
                            {...settings}
                        >
                            {product?.images?.map((el) => (
                                <div className="" key={el}>
                                    <img
                                        src={el}
                                        alt="sub-product"
                                        className="h-[143px] w-[143px] border object-contain"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className=" w-2/5 pr-[24px] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] font-semibold">{`${formatMoney(
                            formatPrice(product?.price)
                        )} VNĐ`}</h2>
                        <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {renderStarFromNumber(product?.totalRatings)?.map(
                            (el) => (
                                <span key={el}>{el}</span>
                            )
                        )}
                        <span className="text-sm text-main italic">{`(Đã bán: ${product?.sold} cái)`}</span>
                    </div>
                    <ul className="list-square text-sm text-gray-500 pl-4">
                        {product?.description?.map((el, index) => (
                            <li key={index} className="leading-6">
                                {el}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Quantity</span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button fw>Add to Cart</Button>
                    </div>
                </div>
                <div className="w-1/5">
                    {productExtraInformation.map((el) => (
                        <ProductExtraInfoItem
                            key={el.id}
                            title={el.title}
                            icon={el.icon}
                            sub={el.sub}
                        />
                    ))}
                </div>
            </div>
            <div className="w-main m-auto mt-8">
                <ProductInfomation />
            </div>
            <div className="w-main m-auto mt-8">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    OTHER CUSTOMER ALSO LIKED
                </h3>
                <CustomSlider normal={true} products={relatedProducts}/>
            </div>
            <div className="h-[100px] w-full"></div>
        </div>
    );
};

export default DetailProduct;
