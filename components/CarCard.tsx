"use client"

import { useState } from 'react'
import Image from 'next/image'
import { CarProps } from '@/types'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import { CustomButton, CarDetails } from '.'

interface CarCardProps {
    car: CarProps
}

const CarCard = ({ car }: CarCardProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const { city_mpg, year, make, model, transmission, drive } = car

    const carRent = calculateCarRent(city_mpg, year)
    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>{make} {model}</h2>
            </div>
            <p className='flex mt-6 font-extrabold text-[32px]'>
                <span className='self-start text-[14px] font-semibold'>$</span>
                {carRent}
                <span className='self-end text=[14px] font-medium'>/day</span>
            </p>
            {/* image of the cars */}
            <div className='relative h-40 w-full my-3 object-contain'>
                <Image src={generateCarImageUrl(car)} className='object-contain' alt='car model' fill priority />
            </div>
            {/* details of the car */}
            <div className='relative mt-3 w-full flex'>
                <div className='flex justify-between group-hover:invisible w-full text-gray'>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <Image src='/steering-wheel.svg' alt='steering' width={20} height={20} />
                        <p className='text-[14px]'>{transmission === 'a' ? "Automatic" : "Manual"}</p>
                    </div>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <Image src='/tire.svg' alt='tire' width={20} height={20} />
                        <p className='text-[14px]'>{drive.toUpperCase()}</p>
                    </div>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <Image src='/gas.svg' alt='gas' width={20} height={20} />
                        <p className='text-[14px]'>{city_mpg} MPG</p>
                    </div>
                </div>
                {/* button of full width */}
                <div className='car-card__btn-container'>
                    <CustomButton
                        title='View More'
                        customStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />

                </div>
            </div>

            {/* car details model should be displayed */}
            <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />

        </div>
    )
}

export default CarCard