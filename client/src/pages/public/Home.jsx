import React from "react";
import {
    Sidebar,
    Banner,
    BestSeller,
    DealDaily,
    FeatureProducts,
    CustomSlider
} from "../../components";


const Home = () => {
    return (
        <>
            <div className="w-main flex">
                <div className="flex flex-col gap-5 w-[25%] flex-auto">
                    <Sidebar />
                    <DealDaily />
                </div>

                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <FeatureProducts />
            </div>
            <div className="my-8 w-full">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    NEW ARRIVALS
                </h3>
                <div className="w-full">
                    <CustomSlider/>
                </div>
            </div>
            <div className="w-full h-[500px]"></div>
        </>
    );
};

export default Home;
