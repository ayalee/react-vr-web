/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTRawText: runtime implementation of the RawText that is generated by <Text>[text]</Text>
 * @class RCTRawText
 * @extends RCTBaseView
 */

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';

export default class RCTRawText extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();

    this.isRawText = true;
    Object.defineProperty(this.props, 'text', {
      set: value => {
        this._text = value || '';
        this._textDirty = true;
        this.markTextDirty();
      },
      get: () => {
        return this._text;
      },
    });
  }

  // mark all parent textnodes dirty
  // must descend right to root as <Text> can be nested
  markTextDirty() {
    let cur = this.getParent();
    while (cur) {
      cur.isDirty = true;
      cur.markTextDirty && cur.markTextDirty();
      cur = cur.getParent();
    }
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the supported properties send from react to native
      NativeProps: {
        text: 'string',
      },
    });
  }
}
