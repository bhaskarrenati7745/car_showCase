'use client'

import React, { useState } from 'react'
import { SearchManufacturer } from '.'
import Image from 'next/image'
import { useRouter } from "next/navigation";


const SearchBtn = ({ otherClasses }: { otherClasses?: string }) => {
    return <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
        <Image src='/magnifying-glass.svg' height={40} width={40} alt='magnifying glass' className='object-contain' />
    </button>
}

const SearchBar = () => {

    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('')
    const Router = useRouter()


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === "" && model === "") {
            return alert("Please fill the Search bars...")
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());

    }

    // function for update the searchParams
    const updateSearchParams = (model: string, manufacturer: string) => {

        const searchParams = new URLSearchParams(window.location.search);

        // search if model is there are not
        if (model) {
            searchParams.set('model', model);
        } else {
            searchParams.delete('model');
        }

        // search if make is there or not
        if (manufacturer) {
            searchParams.set('manufacturer', manufacturer);
        } else {
            searchParams.delete('manufacturer')
        }

        // lets create the newPathname
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`

        Router.push(newPathname)


    }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManuFacturer={setManufacturer}
                />
                <SearchBtn otherClasses='sm:hidden' />

            </div>
            <div className='searchbar__item'>
                <Image
                    src='/model-icon.png'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                    alt='car model'
                />
                <input
                    type='text'
                    name='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='Tiguan...'
                    className='searchbar__input'
                />
                <SearchBtn otherClasses='sm:hidden' />
            </div>
            <SearchBtn otherClasses='max-sm:hidden' />

        </form>
    )
}

export default SearchBar