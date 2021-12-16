export default function mplRmseError(expected: number[], outputs: number[]) {
    let ss = 0.0
    for (let i = 0; i < expected.length; i++) {
        let ex = expected[i]
        ss += Math.pow(expected[i] - outputs[i], 2)
    }
    const meanSquares = ss / expected.length
    return Math.sqrt(meanSquares)
}