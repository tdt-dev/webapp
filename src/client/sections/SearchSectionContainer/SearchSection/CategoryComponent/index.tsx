import "./styles.scss"

import * as React from "react"


interface CategoryComponentProps {
    title: string;
}

class CategoryComponent extends React.Component<CategoryComponentProps, {}> {
    render() {
        return (
            <div className='category-component-container'>
                <div className='grid-container'>
                    <div className='grid-x'>
                        <div className='cell'>
                            <h3>{ this.props.title }</h3>
                        </div>
                    </div>
                    <div className='grid-x grid-margin-x items'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryComponent;