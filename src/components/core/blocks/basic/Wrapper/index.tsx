import { Panel } from './Panel';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';
export type IWrapper = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'full-width'?: string;
    direction?: 'ltr' | 'rtl';
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
  },
  {}
>;

export const Wrapper = createBlock<IWrapper>({
  name: 'Wrapper',
  type: BasicType.WRAPPER,
  Panel,
  create: (payload) => {
    const defaultData: IWrapper = {
      type: BasicType.WRAPPER,
      data: {
        value: {},
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        border: 'none',
        direction: 'ltr',
        'text-align': 'center',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE],
});
