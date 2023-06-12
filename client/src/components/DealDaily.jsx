import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import {
    renderStarFromNumber,
    formatMoney,
    sencondsToHms,
} from "../ultils/helpers";
import { Countdown } from "./";
import moment from "moment";

const { AiFillStar, AiOutlineMenu } = icons;

let idInterval;

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({
            limit: 1,
            page: Math.round(Math.random() * 10),
            totalRatings: 5,
        });
        if (response.success) {
            setDealDaily(response.products[0]);
            const today = `${moment().format("MM/DD/YYYY")} 05:00:00`;
            const seconds =
                new Date(today).getTime() -
                new Date().getTime() +
                24 * 3600 * 1000;
            const number = sencondsToHms(seconds);

            setHour(number.h);
            setMinute(number.m);
            setMinute(number.s);
        } else {
            setHour(0);
            setMinute(59);
            setMinute(59);
        }
    };
    // useEffect(() => {
    //     fetchDealDaily();
    // }, []);

    useEffect(() => {
        idInterval && clearInterval(idInterval);
        fetchDealDaily();
    }, [expireTime]);

    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond((prev) => prev - 1);
            else {
                if (minute > 0) {
                    setMinute((prev) => prev - 1);
                    setSecond(59);
                } else {
                    if (hour > 0) {
                        setHour((prev) => prev - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval);
        };
    }, [hour, second, minute, expireTime]);

    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4 w-full">
                <span className="flex-1 flex justify-center">
                    <AiFillStar color="#DD1111" />
                </span>
                <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
                    DEAL DAILY
                </span>
                <span className="flex-1"></span>
            </div>
            <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
                <img
                    src={
                        dealDaily?.thumb ||
                        "https://2.bp.blogspot.com/-MowVHfLkoZU/VhgIRyPbIoI/AAAAAAAATtI/fHk-j_MYUBs/s640/placeholder-image.jpg"
                    }
                    alt=""
                    className="w-full object-contain"
                />
                <span className="line-clamp-1 text-center">
                    {dealDaily?.title}
                </span>
                <span className="flex h-4">
                    {renderStarFromNumber(dealDaily?.totalRatings, 20)}
                </span>
                <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
            </div>
            <div className="px-4 mt-8">
                <div className="flex justify-center gap-2 items-center mb-4">
                    <Countdown unit={"Hours"} number={hour} />
                    <Countdown unit={"Minutes"} number={minute} />
                    <Countdown unit={"Seconds"} number={second} />
                </div>
                <button
                    type="button"
                    className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
                >
                    <AiOutlineMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);
