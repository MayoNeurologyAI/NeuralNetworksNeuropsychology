export default function mplStdDev(avg: number, scores: number[]): number {
    let ssdiff = 0
    for (let i = 0; i < scores.length; i++) {
        ssdiff += Math.pow(scores[i] - avg, 2)
    }
    let avgDiff = ssdiff / scores.length;
    return Math.sqrt(avgDiff)
}