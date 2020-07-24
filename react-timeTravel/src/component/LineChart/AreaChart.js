import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';


const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
      <text x={0} y={-10} dy={15} textAnchor="end" fontSize="12" fontWeight="200" fill="#D1D1D1" >{payload.value}</text>
  </g>
);


const isRate = (name) => (/(rate|ratio)/.test(name));

const CustomizedYAxisTick = ({ x, y, payload, indicator }) => {
  let v = payload.value;

  if (isRate(indicator)) {
    v = `${v}%`;
  }
  return (
    <g transform={`translate(${x},${y})`}>
        <text x={0} y={-10} dy={15} textAnchor="end" fontSize="12" fontWeight="200" fill="#D1D1D1" >{v}</text>
    </g>
  );
};


export default class Chart extends PureComponent {
    render() {
        const props = this.props;
        const {
            handleMove,
            TrendDate,
            chartWidth,
            indicator,
        } = props;

        return (
            <ResponsiveContainer width={chartWidth} height={200} >
              <AreaChart
                data={TrendDate}
                margin={{ top: 10, left: 10, right: 0, bottom: 0 }}
                onMouseMove={(e) => { handleMove(e); }}
              >
                  <defs>
                      <linearGradient id="colorlast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0590FB" stopOpacity={1} />
                          <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                      </linearGradient>
                  </defs>

                  <XAxis padding={{ left: 10 }} axisLine={{ stroke: '#f6f6f6' }} dataKey="date" tickLine={false} tick={<CustomizedAxisTick />} padding={{ right: 5 }}  />
                  <YAxis axisLine={false} tickLine={false} tick={<CustomizedYAxisTick indicator={indicator} />} />

                  <CartesianGrid y={200} strokeDasharray="0.5 1.5" vertical={false} />

                  <Tooltip cursor={{ stroke: '#0590FB', strokeWidth: 1 }} contentStyle={{ display: 'none' }} />

                  <Area type="monotone" dataKey="value_last" stroke="#888888" fillOpacity={0} fill="url(#colorcurrent)" />
                  <Area type="monotone" dataKey="value" stroke="#0590FB" fillOpacity={0.15} fill="url(#colorlast)" />

                  <ReferenceLine x={props.currentTime} stroke="#0590FB" label="" />
              </AreaChart>
            </ResponsiveContainer>
        );
    }
}
