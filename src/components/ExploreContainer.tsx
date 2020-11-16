import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSlide,
  IonSlides,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

const SlidingSegments: React.FC = () => {
  const [segments, setSegments] = useState<string[]>(["friends", "enemies"]);
  const slider = useRef<HTMLIonSlidesElement>(null);
  const [value, setValue] = useState("friends");

  const handleSegmentChange = async (e: any) => {
    const selectedSegment = segments.findIndex((el) => el === e.detail.value!);
    setValue(e.detail.value!);
    slider.current!.slideTo(selectedSegment);
  };

  const handleSlideChange = async (e: any) => {
    const activeSlide = await slider.current?.getActiveIndex();
    setValue(segments[activeSlide!]);
  };

  useEffect(() => {
    const init = async () => {
      const swiper = await slider.current?.getSwiper();
      console.log(swiper);

      setTimeout(() => {
        setSegments(["fiends", "enemies", "heroes"]);
      (swiper as any).update();

      }, 2000);

    };
    init();
  }, [slider]);

  return (
    <>
      <IonSegment onIonChange={(e) => handleSegmentChange(e)} value={value}>
        {segments.map((segment, idx) => (
          <IonSegmentButton key={idx} value={segment}>
            <IonLabel>{segment}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
      <IonSlides
        pager={true}
        ref={slider}
        onIonSlideDidChange={(e) => handleSlideChange(e)}
      >
        {segments.map((segment, idx) => (<IonSlide key={idx}><p>{segment}</p></IonSlide>))}


      </IonSlides>
    </>
  );
};

export default SlidingSegments;