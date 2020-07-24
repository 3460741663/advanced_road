import React, { PureComponent } from 'react';
import cx from 'classnames';
import cls from './index.css';
import { HEADERLIST } from '../../constants';
import { numToPercent, numToThousand, splitK } from '../../util';

export default class TrendDetail extends PureComponent {
    static styles() {
        return [
            cls.toString()
        ].join('\n');
    }
    render() {
        const props = this.props;
        const {
            title,
            onChange,
            select = false,
            selectDateTypeObj,
            indicator,
            dataDetail,
        } = props;
        const isLast = title === '去年同期' ? '_last' : '';

        const headerItem = HEADERLIST.find(i => i.value === indicator);

        // let percentValue = headerItem.type === 'percent' && (`${numToPercent(dataDetail[`value${isLast}`])}` || '');
        // if (typeof percentValue === 'string') {
        //   percentValue = percentValue.replace('+', '');
        // }

        return (
            <div className={cx(cls.part, select ? cls.select : '')} onClick={onChange}>
                <div className={cls.time}><span>{title}</span></div>
                {headerItem && (
                  <div className={cls.number}>
                      {headerItem.type === 'percent' && numToPercent(dataDetail[`value${isLast}`], false)}
                      {headerItem.type === 'thousand' && numToThousand(dataDetail[`value${isLast}`])}
                      {!headerItem.type && splitK(Math.floor(dataDetail[`value${isLast}`]))}
                  </div>
                )}
                <div className={cls.data_concrete}>
                    <div className={cls.list_item}>
                        <span className={cls.name}>YOY</span>
                        <span className={cx(cls.value, dataDetail[`yoy${isLast}`] <= 0 ? cls.special : '')}>{numToPercent(dataDetail[`yoy${isLast}`])}</span>
                    </div>
                    {selectDateTypeObj.type !== 'month' && (
                      <div className={cls.list_item}>
                          <span className={cls.name}>WOW</span>
                          <span className={cx(cls.value, dataDetail[`wow${isLast}`] <= 0 ? cls.special : '')}>{numToPercent(dataDetail[`wow${isLast}`])}</span>
                      </div>
                    )}
                    {selectDateTypeObj.type === 'date' && (
                      <div className={cls.list_item}>
                          <span className={cls.name}>日环比</span>
                          <span className={cx(cls.value, dataDetail[`dod${isLast}`] <= 0 ? cls.special : '')}>{numToPercent(dataDetail[`dod${isLast}`])}</span>
                      </div>
                    )}
                </div>
            </div>
        );
    }
}
