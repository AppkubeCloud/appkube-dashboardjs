import { uniqBy } from 'lodash';

import { DataFrame, MetricFindValue } from '@grafana/data';
import { ResponseParser } from 'features/plugins/sql/types';

export class MSSqlResponseParser implements ResponseParser {
  transformMetricFindResponse(frame: DataFrame): MetricFindValue[] {
    const values: MetricFindValue[] = [];
    const textField = frame.fields.find((f) => f.name === '__text');
    const valueField = frame.fields.find((f) => f.name === '__value');

    if (textField && valueField) {
      for (let i = 0; i < textField.values.length; i++) {
        values.push({ text: '' + textField.values.get(i), value: '' + valueField.values.get(i) });
      }
    } else {
      values.push(
        ...frame.fields
          .flatMap((f) => f.values.toArray())
          .map((v) => ({
            text: v,
          }))
      );
    }

    return uniqBy(values, 'text');
  }
}
