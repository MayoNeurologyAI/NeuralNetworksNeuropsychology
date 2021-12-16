import mplDrvHtan from './mplDrvHtan'
import mplDrvLogSig from './mplDrvLogSig';
import Transform from './mplTransEnum'

export default function mplDrvTransform(x: number, t: Transform): number {
    switch (t) {
        case Transform.linear:
            return x
        case Transform.logsig:
            return mplDrvLogSig(x);
        case Transform.htan:
            return mplDrvHtan(x);
    }
}