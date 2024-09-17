import * as React from "react"
import Svg, { Path,Rect, type SvgProps } from "react-native-svg"
export const ErrorCross = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Rect width={32} height={32} fill="#BD0F1B" rx={16} />
        <Path
            fill="#fff"
            d="m17.128 16 5.04-5.032a.803.803 0 0 0-1.136-1.136L16 14.872l-5.032-5.04a.803.803 0 0 0-1.136 1.136L14.872 16l-5.04 5.032a.801.801 0 0 0 .26 1.311.8.8 0 0 0 .876-.175L16 17.128l5.032 5.04a.798.798 0 0 0 1.136 0 .801.801 0 0 0 0-1.136L17.128 16Z"
        />
    </Svg>
)
