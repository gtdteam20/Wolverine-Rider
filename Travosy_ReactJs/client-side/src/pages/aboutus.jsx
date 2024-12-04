import React, { useState } from 'react'
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import About from '../components/about'
import Footer from '../components/footer';
import Switcher from '../components/switcher';

import { teamData,placeImage } from "../data/data";

import {FiFacebook, FiInstagram, FiLinkedin} from "../assets/icons/vander"

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

import Lightbox from 'react-18-image-lightbox';
import "react-18-image-lightbox/style.css"

export default function Aboutus(){
    let [isOpen, setisOpen] = useState(false);
    let [currentImageIndex, setCurrentImageIndex] = useState(0);

    let handleMovePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + placeImage.length - 1) % placeImage.length);
    };

    let handleMoveNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % placeImage.length);
    };
    let currentImage = placeImage[currentImageIndex];

    let handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };

    const settings = {  
        container: '.tiny-twelve-item',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            1025: {
                items: 12
            },

            992: {
                items: 8
            },

            767: {
                items: 6
            },

            575: {
                items: 5
            },

            420: {
                items: 3
            },

            320: {
                items: 2
            },
        },
      };
    return(
        <>
        <Navbar navclass="defaultscroll is-sticky" navlight={true} manuclass="justify-end nav-light"/>
        <section className="relative table w-full items-center py-36 bg-[url('../../assets/images/bg/cta.jpg')] bg-top bg-no-repeat bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center mt-10">
                    <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">Wolverine Rider Travel Agency</h3>
                </div>
            </div>
            
            <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                <ul className="tracking-[0.5px] mb-0 inline-block">
                    <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Wolverine-Rider</Link></li>
                    <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                    <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">About Us</li>
                </ul>
            </div>
        </section>

        <section className="relative md:pb-24 pb-16">
            <About/>

            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">MY AIM</h3>

                    <p className="text-slate-800 max-w-xxl mx-auto text-justify">My aim is to inspire people to get out of their mundane life and explore this world and provide them all the tools to make this happen. From budgets and travel itinerates to travel insurance and accommodation. Its all here and I am personally there all along this journey ensuring you experience this to the fullest and not just tick one item off your bucket list!</p>
                </div>
            </div>
            <div className="container relative md:mt-10 mt-8">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">OUR SERVICES
                    </h3>

                    <p className="text-slate-800 max-w-xxl mx-auto text-justify">In my pursuit to finding happiness through travel, I founded Wolverine Rider in 2017 from my one beddy apartment in Delhi. Just like you, I have always aimed for stars believing even if I miss, it would surely land me on the moon and the sight would still be awesome! With that thought in mind, we started our ambitious but yet humble journey by organizing adventure trips in India, with the epitome of adventure of course – “Leh-Ladakh”. You are right again! Obviously a bike trip! Its indeed challenging and mind boggling, but those mountains are meant to be conquered and we surely did the same not just once but numerous times with passionate people like yourself. But mind you, the trip is just not only about the beauty of those majestic mountains but it’s the sheer ability of them that humbles you as a person but inspires you to keep the journey and adventure on. We soon found our mojo and perfected the experience and this was enough fuel that we needed to our fire and soon ventured to Spiti Valley trekking and rafting to add some more spice to the gravy!<br></br><br></br><b>Today our services range from organizing Domestic and International trips with  Leh, Ladakh & Spiti Valley still at the heart of it.</b><br></br><br></br>Do let us know if you share the same energy, passion and momentum towards life like me and my team does. I am sure if our energies match I will see you on the other side!<br></br><br></br>Take care and follow your dreams, its totally worth it!
                    </p>
                </div>
            </div>

         
        </section>
        <div className="container-fluid relative">
            <div className="grid grid-cols-1 relative">
                <div className="tiny-twelve-item">
                    <TinySlider settings={settings}>
                        {placeImage.map((item,index)=>{
                            return(
                                <div className="tiny-slide" key={index}>
                                    <Link to="" onClick={() => handleImageClick(index)} className="lightbox d-inline-block" title="">
                                        <img src={item} className="sm:size-40 object-cover" alt=""/>
                                    </Link>
                                </div>
                            )
                        })}
                    </TinySlider>
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={currentImage}
                        prevSrc={placeImage[(currentImageIndex + placeImage.length - 1) % placeImage.length]}
                        nextSrc={placeImage[(currentImageIndex + 1) % placeImage.length]}

                        onCloseRequest={() => setisOpen(false)}
                        onMovePrevRequest={handleMovePrev}
                        onMoveNextRequest={handleMoveNext}
                    />
                )}

                <div className="absolute top-2/4 -translate-y-2/4 start-2/4 ltr:-translate-x-2/4 rtl:translate-x-2/4 text-center">
                    <Link to="https://www.instagram.com/shreethemes/" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border border-red-500 bg-red-500 text-white"><FiInstagram className="size-4"></FiInstagram></Link>
                </div>
            </div>
        </div>
        <Footer/>
        <Switcher/>
        </>
    )
}