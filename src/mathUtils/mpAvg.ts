export default function mplAvg(arr: number[]): number {
    if (!arr || arr.length == 0) {
        return 0.0;
    }
    const sum = arr.reduce((n1: number, n2: number) => n1 + n2)
    return sum / arr.length;
}