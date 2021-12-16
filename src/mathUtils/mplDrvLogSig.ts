// expecting x to be the result of mplLogSig
export default function mplDrvLogSig(x: number): number {
    return x * (1 - x)
}