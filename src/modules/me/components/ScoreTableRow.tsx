//@ts-nocheck
import * as React from 'react';
import { get } from 'lodash';

export default class ScoreTableRow extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    const getMinimumScore = (value: number) => {
      return Math.floor(value * 0.6);
    };

    const getPassStatus = (value: number) => {
      if (
        parseInt(value) >=
        parseInt(getMinimumScore(get(this.props.value, '[0]', 0)))
      )
        return <span style={{ color: 'green' }}>{value}</span>;
      else return <span style={{ color: 'red' }}>{value}</span>;
    };

    const defaultStyle = {
      borderBottom: '1px solid #000',
      borderRight: '1px solid #000',
      padding: 6,
    };

    const rightmostStyle = {
      borderBottom: '1px solid #000',
      padding: 6,
    };

    return (
      <tr
        style={{
          fontWeight: !this.props.value ? 'bold' : '',
        }}
      >
        <td
          style={{
            textAlign: 'left',
            borderBottom: '1px solid #000',
            borderRight: '1px solid #000',
            padding: 6,
          }}
        >
          {this.props.title}
        </td>
        {!this.props.isHeader ? (
          <>
            <td style={defaultStyle}>
              {this.props.value && get(this.props.value, '[0]', 0)}
            </td>
            <td style={defaultStyle}>
              {this.props.value &&
                getMinimumScore(get(this.props.value, '[0]', 0))}
            </td>
            <td style={defaultStyle}>
              {this.props.value &&
                getPassStatus(get(this.props.value, '[1]', 0))}
            </td>
            <td style={rightmostStyle}>
              {this.props.value &&
                getPassStatus(get(this.props.value, '[2]', 0))}
            </td>
          </>
        ) : (
          <>
            <td style={defaultStyle}>จำนวนข้อ</td>
            <td style={defaultStyle}>60%</td>
            <td style={defaultStyle}>คะแนน Pre-test</td>
            <td style={rightmostStyle}>คะแนน Post-test</td>
          </>
        )}
      </tr>
    );
  }
}
