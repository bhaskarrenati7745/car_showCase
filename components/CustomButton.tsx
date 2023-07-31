import { CustomButtonProps } from '@/types'
import React from 'react'
import Image from 'next/image'

const CustomButton = ({ title, customStyles, handleClick,textStyles,rightIcon }: CustomButtonProps) => {
    return (
        <button
            disabled={false}
            type={"button"}
            className={`custom-btn ${customStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>
                {title}
            </span>
            {rightIcon &&(
                <div className='relative w-6 h-6'>
                    <Image src={rightIcon} fill className='object-contain' alt='right Arrow'/>
                </div>
            )}
        </button>
    )
}

export default CustomButton
