import React, { PureComponent } from 'react';
import TrendDetail from './TrendDetail';
import LineChart from '../LineChart';
import cls from './index.css';
import cx from 'classnames';
import closeIcon from './close.png';
import { HEADERLIST } from '../../constants';

export default class FloatLayer extends PureComponent {
  static styles() {
    return [
      cls.toString()
    ].join('\n');
  }
  constructor() {
    super();
    this.state = {
      select: '本期'
    };
  }
  handlClick(msg) {
    this.setState({
      select: msg
    });
  }
  filterDate(data, indicatorName, currentTime) {
    let result = '';
    if (data[`${indicatorName}_tendency`]) {
      data[`${indicatorName}_tendency`].map((item) => {
        if (item.date === currentTime) {
          result = item;
        }
        return '';
      });
    }
    return result;
  }
  render() {
    const props = this.props;
    const {
      dispatch,
      startTime,
      isHind = false,
      // 根据currentTime, name,查到详情
      showData,
      indicator,
      currentTime,
    } = props;

    const dataDetail = this.filterDate(showData, indicator, currentTime);
    const trendDate = showData[`${indicator}_tendency`];
    const headerItem = HEADERLIST.find(i => i.value === indicator);
    const newTrendDate = trendDate.map(i => {
      const {
        value,
        date,
      } = i;
      // eslint-disable-next-line camelcase
      const { type } = headerItem;
      const valueLast = i['value_last'];
      // eslint-disable-next-line consistent-return
      if (type === 'percent') {
        return Object.assign({}, i, {
          value: (value * 100 || 0).toFixed(2),
          // eslint-disable-next-line camelcase
          value_last: (valueLast * 100 || 0).toFixed(2),
          date: date && date.slice(-5),
          fullDate: date,
        });
      }
      // eslint-disable-next-line consistent-return
      if (type === 'thousand') {
        return Object.assign({}, i, {
          value: (value / 10000 || 0).toFixed(2),
          // eslint-disable-next-line camelcase
          value_last: (valueLast / 10000 || 0).toFixed(2),
          date: date && date.slice(-5),
          fullDate: date,
        });
      }
      // eslint-disable-next-line consistent-return
      return Object.assign({}, i, { date: date && date.slice(-5), fullDate: date, });
    });
    return (
      <div className={cx(cls.contain, isHind ? cls.isHind : '')}>
        <div className={cls.title}>趋势图</div>
        <div>
          <img
            className={cls.close}
            src={closeIcon} alt="close"
            onClick={() => {
              this.props.dispatch({
                type: 'DATA_SET_OPTIONS',
                payload: {
                  isShowPoiDetailpop: false,
                }
              });
            }}
          />
        </div>
        <div className={cls.data_list}>
          <TrendDetail
            indicator={indicator}
            selectDateTypeObj={props.selectDateTypeObj}
            title="本期"
            select={this.state.select === '本期'}
            onChange={() => this.handlClick('本期')}
            dataDetail={dataDetail}
          />
          <TrendDetail
            indicator={indicator}
            selectDateTypeObj={props.selectDateTypeObj}
            title="去年同期"
            select={this.state.select === '去年同期'}
            onChange={() => this.handlClick('去年同期')}
            dataDetail={dataDetail}
          />
        </div>
        <div className={cls.chart}>
          <LineChart startTime={startTime} currentTime={currentTime} dispatch={dispatch} TrendDate={newTrendDate} indicator={this.props.indicator} />
        </div>
      </div>
    );
  }
}
