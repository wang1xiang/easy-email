import { Panel } from './Panel';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { merge } from 'lodash';
import { Button } from '../Button';
import { Text } from '../Text';
import { createBlock } from '@/utils/createBlock';
import { IMAGE_LIST } from 'src/assets/image';
export type IHero = IBlockData<
  {
    'background-color'?: string;
    'background-height'?: string;
    'background-position'?: string;
    'background-url'?: string;
    'background-width'?: string;
    'vertical-align'?: string;
    'border-radius'?: string;
    width?: string;
    height?: string;
    mode: 'fluid-height' | 'fixed-height';
    padding?: string;
  },
  {}
>;

export const Hero = createBlock<IHero>({
  name: 'Hero',
  type: BasicType.HERO,
  Panel,
  create: (payload) => {
    const defaultData: IHero = {
      type: BasicType.HERO,
      data: {
        value: {},
      },
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        padding: '100px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': IMAGE_LIST.IMAGE_72
      },
      children: [
        Text.create({
          data: {
            value: {
              content: 'GO TO SPACE',
            },
          },
          attributes: {
            color: '#ffffff',
            align: 'center',
            'font-size': '45px',
            'line-height': '45px',
          },
        }),
        Button.create({
          data: {
            value: {
              content: 'ORDER YOUR TICKET NOW',
            },
          },
          attributes: {
            href: '#',
          },
        }),
      ],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
});
