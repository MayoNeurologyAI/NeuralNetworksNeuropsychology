// Return a random value between min (included) & max (excluded)
export default function mplRandom(min: number, max: number) {
    min = +min;
    max = +max;
    max -= min;
    return Math.random() * max + min;
}