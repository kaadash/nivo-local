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
import { Motion, TransitionMotion, spring } from 'react-motion';
import { getInheritedColorGenerator } from '@nivo/core';
import { getLabelGenerator } from '@nivo/core';
import { degreesToRadians, radiansToDegrees } from '@nivo/core';
import { bindDefs } from '@nivo/core';
import { Container, SvgWrapper } from '@nivo/core';
import { BasicTooltip } from '@nivo/core';
import { pie as d3Pie, arc as d3Arc } from 'd3-shape';
import PieRadialLabels from './PieRadialLabels';
import PieSlicesLabels from './PieSlicesLabels';
import { PiePropTypes } from './props';
import enhance from './enhance';

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

    var padAngle = degreesToRadians(_padAngle);

    var borderColor = getInheritedColorGenerator(_borderColor);

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
    };

    var radialLabelsProps = {
        label: getLabelGenerator(radialLabel),
        skipAngle: radialLabelsSkipAngle,
        linkOffset: radialLabelsLinkOffset,
        linkDiagonalLength: radialLabelsLinkDiagonalLength,
        linkHorizontalLength: radialLabelsLinkHorizontalLength,
        linkStrokeWidth: radialLabelsLinkStrokeWidth,
        textXOffset: radialLabelsTextXOffset,
        textColor: getInheritedColorGenerator(radialLabelsTextColor, 'labels.textColor'),
        linkColor: getInheritedColorGenerator(radialLabelsLinkColor, 'axis.tickColor')
    };

    var slicesLabelsProps = {
        label: getLabelGenerator(sliceLabel),
        skipAngle: slicesLabelsSkipAngle,
        textColor: getInheritedColorGenerator(slicesLabelsTextColor, 'labels.textColor')
    };

    var radius = Math.min(width, height) / 2;
    var innerRadius = radius * Math.min(_innerRadius, 1);

    var pie = d3Pie();
    pie.value(function (d) {
        return d.value;
    });
    if (sortByValue !== true) pie.sortValues(null);

    var arc = d3Arc();
    arc.outerRadius(radius);

    var enhancedData = data.map(function (d) {
        var color = getColor(d);
        return _extends({}, d, { color: color });
    });

    var boundDefs = bindDefs(defs, enhancedData, fill);

    return React.createElement(
        Container,
        { isInteractive: isInteractive, theme: theme },
        function (_ref2) {
            var showTooltip = _ref2.showTooltip,
                hideTooltip = _ref2.hideTooltip;
            return React.createElement(
                SvgWrapper,
                {
                    width: outerWidth,
                    height: outerHeight,
                    margin: margin,
                    defs: boundDefs
                },
                React.createElement(
                    Motion,
                    {
                        style: {
                            centerX: spring(centerX, motionProps),
                            centerY: spring(centerY, motionProps),
                            innerRadius: spring(innerRadius),
                            padAngle: spring(padAngle, motionProps),
                            cornerRadius: spring(cornerRadius, motionProps)
                        }
                    },
                    function (interpolatingStyle) {
                        var interpolatedPie = pie.padAngle(interpolatingStyle.padAngle);
                        var interpolatedArc = arc.cornerRadius(interpolatingStyle.cornerRadius).innerRadius(interpolatingStyle.innerRadius);

                        var arcsData = interpolatedPie(enhancedData).map(function (d) {
                            var angle = d.endAngle - d.startAngle;

                            return _extends({}, d, {
                                angle: angle,
                                angleDegrees: radiansToDegrees(angle),
                                data: d.data
                            });
                        });

                        return React.createElement(
                            'g',
                            {
                                transform: 'translate(' + interpolatingStyle.centerX + ', ' + interpolatingStyle.centerY + ')'
                            },
                            arcsData.map(function (d) {
                                var handleTooltip = function handleTooltip(e) {
                                    return showTooltip(React.createElement(BasicTooltip, {
                                        id: d.data.label,
                                        value: d.data.value,
                                        enableChip: true,
                                        color: d.data.color,
                                        theme: theme,
                                        format: tooltipFormat
                                    }), e);
                                };

                                return React.createElement('path', {
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
                            enableSlicesLabels && React.createElement(PieSlicesLabels, _extends({
                                data: arcsData,
                                radius: radius,
                                innerRadius: interpolatingStyle.innerRadius,
                                theme: theme
                            }, slicesLabelsProps)),
                            enableRadialLabels && React.createElement(PieRadialLabels, _extends({
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

Pie.propTypes = PiePropTypes;

var enhancedPie = enhance(Pie);
enhancedPie.displayName = 'enhance(Pie)';

export default enhancedPie;