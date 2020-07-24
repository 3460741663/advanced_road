import React, { Component } from 'react';
import styles from './index.css';

import cx from 'classnames';

class Notice extends Component {
  static styles() {
    return [
      styles.toString()
    ].join('\n');
  }
  componentDidUpdate(preProps) {
    if (this.props.notice && this.props.notice !== preProps.notice && this.refs.info) {
      this.scroll();
    }
  }
  scroll = () => {
    clearInterval(this.timer);
    const info = this.refs.info;
    const text = this.refs.txt;
    const textWidth = text && text.offsetWidth;
    const infoWidth = info && info.offsetWidth;
    const text2 = this.refs.txt2;

    // 无需滚动
    if (infoWidth > textWidth) {
      return false;
    }

    // 需要滚动，显示第二段内容
    text2.style.opacity = 1;
    // 容器偏移量
    let containOffset = 150;

    this.timer = setInterval(() => {
      if (containOffset * (-1) >= textWidth) {
        // 向右偏移大于文本长度
        containOffset = 150;
      } else {
        // 每次偏移量
        containOffset -= 0.5;
      }
      info.style.transform = `translate3d(${containOffset}px, 0, 0)`;
    }, 16.67);
    return '';
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { notice } = this.props;
    if (notice) {
      return (
        <div className={cx(styles.wrap)}>
          <div className={styles.info} ref="info">
            <div className={styles.inner} ref="wrap">
              <p className={styles.txt} ref="txt">{notice}</p>
              <p className={styles.txt2} ref="txt2">{notice}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Notice;
