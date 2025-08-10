import React from 'react'

export default function SlotButton({ link, children }) {

    return (
        <div className="slider__btn wow fadeInUp mt-0" data-wow-delay="1.2s">
            <button href={link} className="tg-btn-1 min-w-full md:min-w-[195px] px-4 md:px-auto" style={{ border: 0, background: 'none' }}>
                <span>{children}</span>
                <svg preserveAspectRatio="none" viewBox="0 0 197 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="cls-1" fillRule="evenodd" clipRule="evenodd"
                        d="M30.976 0.755987L0.75499 30.977L29.717 58.677H165.717L195.938 30.977L165.717 0.755987H30.976Z" stroke="white"
                        strokeWidth="1.5"></path>
                    <path className="cls-2" fillRule="evenodd" clipRule="evenodd"
                        d="M166.712 2.01899L196.933 30.98L166.712 58.68L188.118 29.719L166.712 2.01899Z" fill="white"></path>
                    <path className="cls-2" fillRule="evenodd" clipRule="evenodd"
                        d="M30.235 2.01899L0.0139923 30.977L30.235 58.677L8.82899 29.719L30.235 2.01899Z" fill="white"></path>
                </svg>
            </button>
        </div>
    )
}
