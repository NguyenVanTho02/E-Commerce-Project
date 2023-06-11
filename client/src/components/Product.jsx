import React from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/new.png";
import trending from "../assets/trending.png";

const Product = ({ productData, isNew }) => {
    return (
        <div className="w-full text-base px-[10px]">
            <div className="w-full border p-[15px] flex flex-col items-center">
                <div className="w-full relative">
                    <img
                        src={
                            productData?.thumb ||
                            "https://2.bp.blogspot.com/-MowVHfLkoZU/VhgIRyPbIoI/AAAAAAAATtI/fHk-j_MYUBs/s640/placeholder-image.jpg"
                        }
                        alt=""
                        className="w-[243px] h-[243px] object-cover"
                    />
                    <img
                        src={isNew ? label : trending}
                        alt=""
                        className={`absolute w-[100px] h-[35px] top-[0] right-[0] object-cover`}
                    />
                </div>
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
