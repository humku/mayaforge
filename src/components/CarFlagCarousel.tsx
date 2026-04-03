"use client";
import DesignCarousel from "./DesignCarousel";

const images = [
  "car_flag_design1.png",
  "car_flag_design1 (2).png",
  "car_flag_design1 (3).png",
  "car_flag_design1 (4).png",
  "car_flag_design1 (5).png",
  "car_flag_design12.png",
  "car_flag_design2.png",
  "car_flag_design3.png",
  "car_flag_design5.png",
  "Custom_flag_design.png",
  "Custom_flag_design (2).png",
  "Custom_flag_design (3).png",
  "Custom_flag_design (4).png",
  "Custom_flag_design (5).png",
  "Custom_flag_design2.png",
  "Custom_flag_design2 (2).png",
  "Custom_flag_design2 (3).png",
  "Custom_flag_design2 (4).png",
  "Custom_flag_design2 (5).png",
  "Custom_flag_design3.png",
  "Custom_flag_design3 (2).png",
  "Custom_flag_design3 (3).png",
  "Custom_flag_design3 (4).png",
  "Custom_flag_design3 (5).png",
];

export default function CarFlagCarousel() {
  return <DesignCarousel images={images} alt="Car Flag Design" />;
}