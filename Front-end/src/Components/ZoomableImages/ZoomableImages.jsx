
import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const ZoomableImages = () => {
    return (
        <TransformWrapper
            initialScale={1}
            initialPositionX={200}
            initialPositionY={100}
        >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={() => zoomIn()}>+</button>
                        <button onClick={() => zoomOut()}>-</button>
                        <button onClick={() => resetTransform()}>x</button>
                    </div>
                    <TransformComponent className="tools">
                        <img src="https://source.unsplash.com/WLUHO9A_xik/1600x900" alt="test" />
                        <div>Example</div>
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
}