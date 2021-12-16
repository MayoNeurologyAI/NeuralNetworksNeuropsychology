import mplHtan from "./mplHtan";
import mplLogSig from "./mplLogSig";
import Transform from "./mplTransEnum";

export default function mplTransform(x: number, t: Transform) {
    switch (t) {
        case Transform.linear:
            return x
        case Transform.logsig:
            return mplLogSig(x)
        case Transform.htan:
            return mplHtan(x);
    }
}