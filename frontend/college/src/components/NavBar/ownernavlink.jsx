import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const OwnerNavLinks = () => {
    const Navigate = useNavigate();
    const links = [
        {
            name: 'Contact', submenu: true, sublinks: [
                {
                    Head: "",
                    sublinks: [
                        { name: "Contact information", link: "/contact" },
                        { name: "About Us", link: "/about" },
                        { name: "Feedback Form", link: "/feedback" },
                    ]
                }
            ]
        },
    ];

    return (
        <>
            {links.map((link, index) => (
                <div key={index}>
                    <div className='px-3 text-left md:cursor-pointer group'>
                        <h1 className='py-7' onClick={() => {
                            if (link.name === 'Book') {
                                Navigate('/book');
                            } else if (link.name === 'Favorites') {
                                Navigate('/fav');
                            }
                        }}>
                            {link.name}
                        </h1>

                        {link.submenu && (
                            <div>
                                <div className='absolute top-20 hidden group-hover:block hover:block'>
                                    <div className='py-3'>
                                        <div className='w-4 h-4 left-3 absolute mt-1 border-t-2 border-l-2 border-black bg-zinc-50 rotate-45'></div>
                                    </div>
                                    <div
                                        className={`bg-zinc-50 pb-2 border-t-2 border-black ${link.name === 'Book' ? 'grid grid-cols-3 gap-10 ' : 'flex flex-col'}`}
                                    >
                                        {link.sublinks.map((mysublinks, subIndex) => (
                                            <div key={subIndex}>
                                                <h1 className={`${link.name === 'Book' ? 'text-lg font-semibold py-2 px-3' : 'font-bold text-green-600'}`}>
                                                    {mysublinks.Head}
                                                </h1>
                                                {mysublinks.sublinks.map((slink, slinkIndex) => (
                                                    <li key={slinkIndex} className={`text-gray-600 my-2.5 px-3 ${link.name === 'Book' ? 'text-sm p-1' : 'font-medium p-3'}`}>
                                                        <Link to={slink.link} className='hover:text-green-600'>
                                                            {slink.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};
