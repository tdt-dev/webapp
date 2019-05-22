"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.scss");
var React = require("react");
var RATING_TO_COLOR = {
    'A': 'rating-a',
    'B': 'rating-b',
    'C': 'rating-c',
    'D': 'rating-d',
    'F': 'rating-f',
    '?': 'rating-na'
};
var getColorForRating = function (rating) {
    return RATING_TO_COLOR[rating];
};
var RatingComponent = /** @class */ (function (_super) {
    __extends(RatingComponent, _super);
    function RatingComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RatingComponent.prototype.render = function () {
        var rating = this.props.rating;
        return (<div className='rating-component'>
                {this.props.children}
                <div className={["rating-box", getColorForRating(rating)].join(' ')}>{rating}</div>
            </div>);
    };
    return RatingComponent;
}(React.Component));
exports.default = RatingComponent;
