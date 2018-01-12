'use strict';

exports.__esModule = true;

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _defaultProps = require('recompose/defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _core = require('@nivo/core');

var _props = require('./props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Component) {
    return (0, _compose2.default)((0, _defaultProps2.default)(_props.PieDefaultProps), (0, _core.withTheme)(), (0, _core.withDimensions)(), (0, _core.withColors)(), _pure2.default)(Component);
}; /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */