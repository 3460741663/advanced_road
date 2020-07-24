import React, { PureComponent } from 'react';
import cls from './index.css';
import Chart from './AreaChart';

export default class AreaChart extends PureComponent {
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.state = { chartWidth: 0 };
  }

  componentDidMount() {
    const chartWidth = this.container.getBoundingClientRect().width;
    this.setState({ chartWidth });
  }

  handleMove(e) {
    const { dispatch, startTime } = this.props;
    const newName = e.activePayload ? e.activePayload[0].payload.fullDate : startTime;
    dispatch({
      type: 'DATA_SET_OPTIONS',
      payload: {
        // TODO
        currentTime: newName
      }
    });
  }
  render() {
    const props = this.props;
    const {
      currentTime,
      // 趋势图的数据
      TrendDate,
      indicator,
    } = props;
    const { chartWidth } = this.state;

    return (
      <div
        ref={ref => { this.container = ref; }}
        className={cls.contain}
      >
        <div className={cls.tip}>
          <span className={cls.tipContent}>{currentTime}</span>
        </div>
        {chartWidth > 0 && (
          <Chart handleMove={this.handleMove} TrendDate={TrendDate} chartWidth={chartWidth} currentTime={currentTime && currentTime.slice(-5)} indicator={indicator} />
        )}
      </div>
    );
  }
}
