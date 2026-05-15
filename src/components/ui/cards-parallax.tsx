"use client";
import {FC} from "react";
import Image from "next/image";

// Types
export interface iCardItem {
	title: string;
	description: string;
	tag: string;
	src: string;
	link: string;
	color: string;
	textColor: string;
}

interface iCardProps extends Omit<iCardItem, "link" | "tag"> {
	i: number;
}

// Components
const Card: FC<iCardProps> = ({
	title,
	description,
	color,
	textColor,
	src,
}) => {
	return (
		<div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
			<div
				className="relative flex flex-col h-[350px] w-full max-w-[800px] py-12 px-10 md:px-12
				rotate-0 md:h-[450px] items-center justify-center mx-auto 
				shadow-2xl overflow-hidden rounded-2xl"
				style={{backgroundColor: color}}
			>
        {/* Background Image Overlay */}
				<div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
					<Image
						className="w-full h-full object-cover"
						src={src}
						alt="Background"
						fill
					/>
				</div>

        {/* Gradient for legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

				<span className="font-bold relative text-5xl md:text-8xl mt-5 z-10">
					<span
						className="relative z-10 font-headline font-black tracking-tighter uppercase"
						style={{color: textColor}}
					>
						{title}
					</span>
				</span>
				<div
					className="font-body text-lg md:text-2xl font-bold text-center mb-0 z-10 mt-4 tracking-tight"
					style={{lineHeight: 1.4, color: textColor}}
				>
					{description}
				</div>
			</div>
		</div>
	);
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
	items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({items}) => {
	return (
		<div className="relative">
			{items.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} />;
			})}
		</div>
	);
};

export {CardsParallax};
