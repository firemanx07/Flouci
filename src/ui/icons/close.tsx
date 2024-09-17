import * as React from "react"
import Svg, { Path,type SvgProps } from "react-native-svg"
export const Close = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill="#818283"
            d="m6.94 6 4.2-4.193a.67.67 0 1 0-.947-.947L6 5.06 1.807.86a.67.67 0 0 0-.947.947L5.06 6l-4.2 4.193a.667.667 0 0 0 .217 1.093.666.666 0 0 0 .73-.146L6 6.94l4.193 4.2a.666.666 0 0 0 .947 0 .668.668 0 0 0 0-.947L6.94 6Z"
        />
    </Svg>
)
