import { useState } from "react"

export default function ImageSlider(props) {

    const images = props.images
    const [activeimage, setActiveImage] = useState(0)

    return (
        <div className="w-[400px]">
            {/* Main Image */}
            <div
                key={activeimage}
                className="relative w-full h-[400px]
                           rounded-2xl overflow-hidden
                           bg-primary
                           shadow-[0_35px_90px_rgba(0,0,0,0.12)]
                           group
                           transition-all duration-700"
            >
                {/* Light reflection */}
                <div
                    className="absolute inset-0 z-10
                               bg-gradient-to-tr from-white/10 via-transparent to-transparent
                               opacity-0 group-hover:opacity-100
                               transition-opacity duration-700"
                />

                <img
                    className="w-full h-full object-cover
                               transition-all duration-700 ease-out
                               scale-[1.03]
                               group-hover:scale-[1.08]"
                    src={images[activeimage]}
                    alt=""
                />
            </div>

            {/* Thumbnails */}
            <div
                className="w-full mt-7
                           flex gap-5
                           overflow-x-auto lg:overflow-visible
                           justify-start lg:justify-center
                           pb-3
                           scrollbar-hide"
            >
                {images.map((img, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setActiveImage(index)
                            }}
                            className="flex flex-col items-center gap-2
                                       cursor-pointer flex-shrink-0
                                       group"
                        >
                            {/* Thumbnail */}
                            <div
                                className={
                                    "rounded-xl overflow-hidden transition-all duration-300 " +
                                    (activeimage == index
                                        ? "opacity-100"
                                        : "opacity-50 group-hover:opacity-90")
                                }
                            >
                                <img
                                    className="w-[78px] h-[78px] object-cover
                                               transition-transform duration-300
                                               group-hover:scale-110"
                                    src={img}
                                    alt=""
                                />
                            </div>

                            {/* Apple-style active indicator */}
                            <div
                                className={
                                    "h-[2px] rounded-full transition-all duration-300 " +
                                    (activeimage == index
                                        ? "w-8 bg-accent"
                                        : "w-3 bg-transparent")
                                }
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
