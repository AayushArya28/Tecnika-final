"use client";
import "@splidejs/react-splide/css/skyblue";
import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const ImageCarousel = () => {
  const imageClassName = "object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64"; 
  const [photosOnScreen, setPhotosOnScreen] = useState(1);
  const [gapSize, setGapSize] = useState("0.8rem");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setPhotosOnScreen(1); 
        setGapSize("0.6rem");
      } else if (width <= 640) {
        setPhotosOnScreen(1); 
        setGapSize("0.7rem");
      } else if (width <= 1024) {
        setPhotosOnScreen(2); 
        setGapSize("0.8rem");
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
    <section className="w-full p-0">
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
        <SplideSlide>
          <img
            src="/slideshow/cultural.webp"
            alt="Cultural Event"
            className={imageClassName}
            style={{ padding: '0.4rem' }} 
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/dance.webp"
            alt="Dance"
            className={imageClassName}
            style={{ padding: '0.4rem' }} 
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/dance2.webp"
            alt="Group Dance"
            className={imageClassName}
            style={{ padding: '0.4rem' }} 
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/dj.webp"
            alt="DJ"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/fashion.webp"
            alt="Fashion"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/paintball.webp"
            alt="Paint Ball"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/pitching.webp"
            alt="Pitching"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/img1.webp"
            alt="Pitching"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/singing.webp"
            alt="Singing"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/tall-tower.webp"
            alt="Tall Tower"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/slideshow/tech.webp"
            alt="Tech Event"
            className={imageClassName}
            style={{ padding: '0.4rem' }}
            loading="lazy"
          />
        </SplideSlide>
        {/* Add more SplideSlides as needed */}
      </Splide>
    </section>
  );
};

export default ImageCarousel;
