var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash-es';
import shouldUpdate from 'recompose/shouldUpdate';
import { motionPropTypes } from '../../props';
import Axis, { axisPropType } from './Axis';

var horizontalPositions = ['top', 'bottom'];
var verticalPositions = ['left', 'right'];
var positions = [].concat(horizontalPositions, verticalPositions);

var Axes = function Axes(_ref) {
    var enableTemplates = _ref.enableTemplates,
        xScale = _ref.xScale,
        yScale = _ref.yScale,
        width = _ref.width,
        height = _ref.height,
        margin = _ref.margin,
        axisFormat = _ref.axisFormat,
        format = _ref.format,
        top = _ref.top,
        right = _ref.right,
        bottom = _ref.bottom,
        left = _ref.left,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping;

    var axes = { top: top, right: right, bottom: bottom, left: left };

    return React.createElement(
        'g',
        null,
        positions.map(function (position) {
            var axis = axes[position];

            if (!axis) return null;

            if (enableTemplates && position === 'bottom') return null;

            var scale = horizontalPositions.includes(position) ? xScale : yScale;

            return React.createElement(Axis, _extends({
                theme: theme
            }, axis, {
                key: position,
                width: width,
                height: height,
                margin: margin,
                position: position,
                axisFormat: axisFormat,
                format: format,
                scale: scale,
                animate: animate,
                motionDamping: motionDamping,
                motionStiffness: motionStiffness
            }));
        })
    );
};

Axes.propTypes = _extends({
    // generic
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object,

    // axes
    top: axisPropType,
    right: axisPropType,
    bottom: axisPropType,
    left: axisPropType,

    // theming
    theme: PropTypes.object.isRequired

}, motionPropTypes);

export default shouldUpdate(function (props, nextProps) {
    return props.xScale !== nextProps.xScale || props.yScale !== nextProps.yScale || props.width !== nextProps.width || props.height !== nextProps.height || props.theme !== nextProps.theme || props.animate !== nextProps.animate || props.motionDamping !== nextProps.motionDamping || props.motionStiffness !== nextProps.motionStiffness || !isEqual(props.top, nextProps.top) || !isEqual(props.right, nextProps.right) || !isEqual(props.bottom, nextProps.bottom) || !isEqual(props.left, nextProps.left);
})(Axes);