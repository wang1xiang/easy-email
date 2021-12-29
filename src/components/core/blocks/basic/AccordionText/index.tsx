import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';

export type IAccordionText = IBlockData<
  {
    color?: string;
    'background-color'?: string;
    'font-size'?: string;
    'font-family'?: string;
    padding?: string;
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
  },
  {}
>;

export const AccordionText: IBlock = createBlock({
  name: 'Accordion text',
  type: BasicType.ACCORDION_TEXT,
  Panel,
  create: (payload) => {
    const defaultData: IAccordionText = {
      type: BasicType.ACCORDION_TEXT,
      data: {
        value: {
          content:
            'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way',
        },
      },
      attributes: {
        'font-size': '13px',
        padding: '16px 16px 16px 16px',
        'line-height': '1',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
});
