import * as React from "react";
import { ImageItem } from "../../../../../../../reducers/movies";
import { reduce } from 'lodash';

interface ResponsiveImageComponentProps {
    imageItems: ImageItem[];
    defaultImage: string;
    sizes: string;
    className?: string;
}

class ResponsiveImageComponent extends React.Component<ResponsiveImageComponentProps, {}>{
    render() {
        const [originalImage, ...rest] = this.props.imageItems;
        const [first, ...restOfRest] = rest;

        return (
            <img
                className={this.props.className}
                src={ originalImage ? originalImage.path : this.props.defaultImage }
                srcSet={ first &&
                            reduce(
                                restOfRest,
                                (s, v) => `${s}, ${v.path} ${v.res}`,
                                `${first.path} ${first.res}`)
                }
                sizes={ this.props.sizes }
            />
        );
    }
}

export default ResponsiveImageComponent;