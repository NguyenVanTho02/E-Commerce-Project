import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/product";
import { Product } from "./";
import Slider from "react-slick";

const tabs = [
    { id: 1, name: "best sellers" },
    { id: 2, name: "new arrivals" },
];

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await Promise.all([
            apiGetProducts({ sort: "-sold" }),
            apiGetProducts({ sort: "-createAt" }),
        ]);
        if (response[0]?.success) {
            setBestSellers(response[0].products);
            setProducts(response[0].products);
        }
        if (response[1]?.success) setNewProducts(response[1].products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers);
        if (activedTab === 2) setProducts(newProducts);
    }, [activedTab]);
    return (
        <div>
            <div className="flex text-[20px] ml-[-32px]">
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        className={`font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 ${
                            activedTab === el.id ? "text-gray-900" : ""
                        }`}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4 ">
                <Slider {...settings}>
                    {products?.map((el) => (
                        <Product
                            key={el.id}
                            pid={el.id}
                            productData={el}
                            isNew={activedTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            </div>
            <div className="w-full flex gap-4 mt-4">
                <img
                    src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner"
                    className="flex-1 object-contain"
                />
                <img
                    src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner"
                    className="flex-1 object-contain"
                />
            </div>
        </div>
    );
};

export default BestSeller;
