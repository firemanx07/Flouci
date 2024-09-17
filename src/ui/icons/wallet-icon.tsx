import * as React from "react"
import Svg, { Path,type SvgProps } from "react-native-svg"
export const Wallet = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill="#818283"
            d="M12.167 3.167H11.5V2.5a2 2 0 0 0-2-2H2.833a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.334a2 2 0 0 0 2-2V5.167a2 2 0 0 0-2-2ZM2.833 1.833H9.5a.667.667 0 0 1 .667.667v.667H2.833a.667.667 0 1 1 0-1.334Zm10 6.667h-.666a.667.667 0 1 1 0-1.333h.666V8.5Zm0-2.667h-.666a2 2 0 1 0 0 4h.666v.667a.667.667 0 0 1-.666.667H2.833a.667.667 0 0 1-.666-.667V4.387a2 2 0 0 0 .666.113h9.334a.667.667 0 0 1 .666.667v.666Z"
        />
    </Svg>
)
