import * as React from 'react';
import {useTheme} from '@mui/material/styles';

import {CardMedia} from "@mui/material";
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import {Box, IconButton} from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import {useState} from "react";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


interface ImageSliderProps
{
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images || images.length === 0) {
        return null; // Если нет фотографий
    }

    return (
        <Box position="relative" width="100%" overflow="hidden">
            <Box
                component="img"
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                sx={{
                    width: '100%',
                    height: 250,
                    objectFit: 'cover',
                    borderRadius: 2,
                }}
            />

            {/* Левая стрелка */}
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    '&:hover': {backgroundColor: 'rgba(255,255,255,0.8)'},
                }}
            >
                <ArrowBackIos/>
            </IconButton>

            {/* Правая стрелка */}
            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    '&:hover': {backgroundColor: 'rgba(255,255,255,0.8)'},
                }}
            >
                <ArrowForwardIos/>
            </IconButton>
        </Box>
    );
};
export default ImageSlider;