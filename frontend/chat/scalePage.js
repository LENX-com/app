export default function scalePage() {
    if ( typeof window !== "undefined" && window.innerHeight > 768 && window.innerWidth > 1366) {
        const currentRatio = window.innerHeight / window.innerWidth;
        const ratio = 768 / 1366;
        if (ratio < currentRatio) {
            return {
                width: 1366,
                height: typeof window !== "undefined" && window.innerHeight * (1366 / window.innerWidth),
                transform: `scale(${window.innerWidth / 1366})`
            };
        } else if (ratio > currentRatio) {
            return {
                width: typeof window !== "undefined" && window.innerWidth * (768 / window.innerHeight),
                height: 768,
                transform: `scale(${window.innerHeight / 768})`
            };
        } else {
            return {
                width: 1366,
                height: 768,
                transform: `scale(${window.innerHeight / 768})`
            };    
        };
    };
    return {
        width: typeof window !== "undefined" && window.innerWidth,
        height: typeof window !== "undefined" && window.innerHeight,
        transform: `scale(1)`
    };
};