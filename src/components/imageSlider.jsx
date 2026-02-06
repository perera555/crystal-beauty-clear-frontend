import { useEffect, useRef, useState } from "react";

export default function ImageSlider({ images = [], video, beforeAfter }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [fullscreen, setFullscreen] = useState(false);
  const sliderRef = useRef(null);

  /* Auto-play */
  useEffect(() => {
    if (hover || fullscreen) return;
    const i = setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(i);
  }, [hover, fullscreen, images.length]);

  /* Cursor magnifier */
  const handleMouseMove = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      {/* MAIN */}
      <div className="w-full max-w-[440px] mx-auto">
        <div
          ref={sliderRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setFullscreen(true)}
          className="
            relative aspect-square
            rounded-[32px]
            overflow-hidden
            bg-primary
            shadow-[0_45px_110px_rgba(57,62,70,0.22)]
            cursor-zoom-in
          "
        >
          {/* IMAGE / VIDEO */}
          {video && active === 0 ? (
            <video
              src={video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={images[active]}
              alt=""
              className="
                w-full h-full object-cover
                transition-transform duration-[1200ms] ease-out
              "
              style={{
                transform: hover
                  ? `scale(1.4) translate(${(50 - zoomPos.x) / 10}%, ${(50 - zoomPos.y) / 10}%)`
                  : "scale(1.05)",
              }}
            />
          )}

          {/* Luxury overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* THUMBNAILS */}
        <div className="mt-8 flex gap-5 justify-center overflow-x-auto pb-3 scrollbar-hide">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <div
                className={`
                  rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(57,62,70,0.18)]
                  transition-all duration-300
                  ${active === i ? "ring-2 ring-accent" : "opacity-60 group-hover:opacity-90"}
                `}
              >
                <img
                  src={img}
                  alt=""
                  className="w-[72px] h-[72px] object-cover group-hover:scale-110 transition"
                />
              </div>
              <div
                className={`h-[3px] rounded-full transition-all ${
                  active === i ? "w-10 bg-accent" : "w-4 bg-secondary/30"
                }`}
              />
            </div>
          ))}
        </div>

        {/* BEFORE / AFTER */}
        {beforeAfter && (
          <div className="mt-10">
            <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} />
          </div>
        )}
      </div>

      {/* FULLSCREEN MODAL */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={images[active]}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
}

/* BEFORE / AFTER COMPONENT */
function BeforeAfter({ before, after }) {
  const [value, setValue] = useState(50);

  return (
    <div className="relative w-full h-[300px] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(57,62,70,0.18)]">
      <img src={before} className="absolute inset-0 w-full h-full object-cover" />
      <img
        src={after}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-accent"
        style={{ left: `${value}%` }}
      />
    </div>
  );
}
