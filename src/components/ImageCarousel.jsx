"use client";
import "@splidejs/react-splide/css/skyblue";
import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const ImageCarousel = () => {
  const imageClassName = "object-contain w-full h-40 sm:h-48 md:h-56 lg:h-64"; 
  const [photosOnScreen, setPhotosOnScreen] = useState(1);
  const [gapSize, setGapSize] = useState("0.2rem");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width <= 640) {
        setPhotosOnScreen(1); 
        setGapSize("0.2rem");  
      } else if (width <= 1024) {
        setPhotosOnScreen(2); 
        setGapSize("0.5rem");  
      } else {
        setPhotosOnScreen(3); 
        setGapSize("1rem");    
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-full">
      <Splide
        options={{
          type: "loop",
          gap: gapSize, 
          drag: "free",
          focus: "center",
          height: "auto",
          arrows: false,
          pagination: false,
          perPage: photosOnScreen,
          lazyLoad: "nearby", 
          autoScroll: {
            pauseOnHover: true,
            pauseOnFocus: false,
            rewind: true,
            speed: 1,
          },
        }}
        extensions={{ AutoScroll }}
        aria-label="Image Carousel"
      >
        {/* Image slides */}
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 1"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/src/assets/num anine.jpg"
            alt="Image 2"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1578632749014-ca77efd052eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 3"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 4"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1578632749014-ca77efd052eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 5"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 6"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 7"
            className={imageClassName}
            loading="lazy"
          />
        </SplideSlide>
      </Splide>
    </section>
  );
};

export default ImageCarousel;
