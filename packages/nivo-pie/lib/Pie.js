'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _core = require('@nivo/core');

var _d3Shape = require('d3-shape');

var _PieRadialLabels = require('./PieRadialLabels');

var _PieRadialLabels2 = _interopRequireDefault(_PieRadialLabels);

var _PieSlicesLabels = require('./PieSlicesLabels');

var _PieSlicesLabels2 = _interopRequireDefault(_PieSlicesLabels);

var _props = require('./props');

var _enhance = require('./enhance');

var _enhance2 = _interopRequireDefault(_enhance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pie = function Pie(_ref) {
    var data = _ref.data,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        sortByValue = _ref.sortByValue,
        _innerRadius = _ref.innerRadius,
        _padAngle = _ref.padAngle,
        cornerRadius = _ref.cornerRadius,
        borderWidth = _ref.borderWidth,
        _borderColor = _ref.borderColor,
        enableRadialLabels = _ref.enableRadialLabels,
        radialLabel = _ref.radialLabel,
        radialLabelsSkipAngle = _ref.radialLabelsSkipAngle,
        radialLabelsLinkOffset = _ref.radialLabelsLinkOffset,
        radialLabelsLinkDiagonalLength = _ref.radialLabelsLinkDiagonalLength,
        radialLabelsLinkHorizontalLength = _ref.radialLabelsLinkHorizontalLength,
        radialLabelsLinkStrokeWidth = _ref.radialLabelsLinkStrokeWidth,
        radialLabelsTextXOffset = _ref.radialLabelsTextXOffset,
        radialLabelsTextColor = _ref.radialLabelsTextColor,
        radialLabelsLinkColor = _ref.radialLabelsLinkColor,
        enableSlicesLabels = _ref.enableSlicesLabels,
        sliceLabel = _ref.sliceLabel,
        slicesLabelsSkipAngle = _ref.slicesLabelsSkipAngle,
        slicesLabelsTextColor = _ref.slicesLabelsTextColor,
        theme = _ref.theme,
        getColor = _ref.getColor,
        defs = _ref.defs,
        fill = _ref.fill,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive,
        tooltipFormat = _ref.tooltipFormat;

    var centerX = width / 2;
    var centerY = height / 2;

    var padAngle = (0, _core.degreesToRadians)(_padAngle);

    var borderColor = (0, _core.getInheritedColorGenerator)(_borderColor);

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
    };

    var radialLabelsProps = {
        label: (0, _core.getLabelGenerator)(radialLabel),
        skipAngle: radialLabelsSkipAngle,
        linkOffset: radialLabelsLinkOffset,
        linkDiagonalLength: radialLabelsLinkDiagonalLength,
        linkHorizontalLength: radialLabelsLinkHorizontalLength,
        linkStrokeWidth: radialLabelsLinkStrokeWidth,
        textXOffset: radialLabelsTextXOffset,
        textColor: (0, _core.getInheritedColorGenerator)(radialLabelsTextColor, 'labels.textColor'),
        linkColor: (0, _core.getInheritedColorGenerator)(radialLabelsLinkColor, 'axis.tickColor')
    };

    var slicesLabelsProps = {
        label: (0, _core.getLabelGenerator)(sliceLabel),
        skipAngle: slicesLabelsSkipAngle,
        textColor: (0, _core.getInheritedColorGenerator)(slicesLabelsTextColor, 'labels.textColor')
    };

    var radius = Math.min(width, height) / 2;
    var innerRadius = radius * Math.min(_innerRadius, 1);

    var pie = (0, _d3Shape.pie)();
    pie.value(function (d) {
        return d.value;
    });
    if (sortByValue !== true) pie.sortValues(null);

    var arc = (0, _d3Shape.arc)();
    arc.outerRadius(radius);

    var enhancedData = data.map(function (d) {
        var color = getColor(d);
        return _extends({}, d, { color: color });
    });

    var boundDefs = (0, _core.bindDefs)(defs, enhancedData, fill);

    return _react2.default.createElement(
        _core.Container,
        { isInteractive: isInteractive, theme: theme },
        function (_ref2) {
            var showTooltip = _ref2.showTooltip,
                hideTooltip = _ref2.hideTooltip;
            return _react2.default.createElement(
                _core.SvgWrapper,
                {
                    width: outerWidth,
                    height: outerHeight,
                    margin: margin,
                    defs: boundDefs
                },
                _react2.default.createElement(
                    _reactMotion.Motion,
                    {
                        style: {
                            centerX: (0, _reactMotion.spring)(centerX, motionProps),
                            centerY: (0, _reactMotion.spring)(centerY, motionProps),
                            innerRadius: (0, _reactMotion.spring)(innerRadius),
                            padAngle: (0, _reactMotion.spring)(padAngle, motionProps),
                            cornerRadius: (0, _reactMotion.spring)(cornerRadius, motionProps)
                        }
                    },
                    function (interpolatingStyle) {
                        var interpolatedPie = pie.padAngle(interpolatingStyle.padAngle);
                        var interpolatedArc = arc.cornerRadius(interpolatingStyle.cornerRadius).innerRadius(interpolatingStyle.innerRadius);

                        var arcsData = interpolatedPie(enhancedData).map(function (d) {
                            var angle = d.endAngle - d.startAngle;

                            return _extends({}, d, {
                                angle: angle,
                                angleDegrees: (0, _core.radiansToDegrees)(angle),
                                data: d.data
                            });
                        });

                        return _react2.default.createElement(
                            'g',
                            {
                                transform: 'translate(' + interpolatingStyle.centerX + ', ' + interpolatingStyle.centerY + ')'
                            },
                            arcsData.map(function (d) {
                                var handleTooltip = function handleTooltip(e) {
                                    return showTooltip(_react2.default.createElement(_core.BasicTooltip, {
                                        id: d.data.label,
                                        value: d.data.value,
                                        enableChip: true,
                                        color: d.data.color,
                                        theme: theme,
                                        format: tooltipFormat
                                    }), e);
                                };

                                return _react2.default.createElement('path', {
                                    key: d.data.id,
                                    d: interpolatedArc(d),
                                    fill: d.data.fill ? d.data.fill : d.data.color,
                                    strokeWidth: borderWidth,
                                    stroke: borderColor(d.data),
                                    onMouseEnter: handleTooltip,
                                    onMouseMove: handleTooltip,
                                    onMouseLeave: hideTooltip
                                });
                            }),
                            enableSlicesLabels && _react2.default.createElement(_PieSlicesLabels2.default, _extends({
                                data: arcsData,
                                radius: radius,
                                innerRadius: interpolatingStyle.innerRadius,
                                theme: theme
                            }, slicesLabelsProps)),
                            enableRadialLabels && _react2.default.createElement(_PieRadialLabels2.default, _extends({
                                data: arcsData,
                                radius: radius,
                                theme: theme
                            }, radialLabelsProps))
                        );
                    }
                )
            );
        }
    );
};

Pie.propTypes = _props.PiePropTypes;

var enhancedPie = (0, _enhance2.default)(Pie);
enhancedPie.displayName = 'enhance(Pie)';

exports.default = enhancedPie;