import { IMAGE_LIST } from '@/assets/image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

export function ColumnBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.COLUMN}
              payload={item.payload}
            >
              <ShadowDom>
                <div style={{ position: 'relative' }}>
                  <Picture src={item.thumbnail} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 2,
                    }}
                  />
                </div>
              </ShadowDom>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

const list = [
  {
    thumbnail: IMAGE_LIST.IMAGE_20,
    payload: {
      type: 'column',
      data: {
        value: {},
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        border: 'none',
        'vertical-align': 'top',
        'background-color': '#ffffff',
      },
      children: [
        {
          type: 'image',
          data: {
            value: {},
          },
          attributes: {
            align: 'center',
            height: 'auto',
            padding: '0px 0px 0px 0px',
            src: IMAGE_LIST.IMAGE_21,
            width: '150px',
          },
          children: [],
        },
        {
          type: 'text',
          data: {
            value: {
              content: 'Business Key to Success',
            },
          },
          attributes: {
            'font-size': '20px',
            padding: '10px 0px 10px 0px',
            'line-height': '1.7',
            align: 'center',
            'font-family': '"Nunito Sans", sans-serif',
          },
          children: [],
        },
        {
          type: 'text',
          data: {
            value: {
              content: 'POSTED ON FEB 18, 2019 FOOD',
            },
          },
          attributes: {
            'font-size': '15px',
            padding: '0px 0px 10px 0px',
            'line-height': '1.7',
            align: 'center',
            color: '#9b9b9b',
            'font-family': '"Nunito Sans", sans-serif',
          },
          children: [],
        },
        {
          type: 'text',
          data: {
            value: {
              content:
                'Far far away, behind the word mountains, far from the countries',
            },
          },
          attributes: {
            'font-size': '15px',
            padding: '0px 0px 0px 0px',
            'line-height': '1.7',
            align: 'center',
            color: '#9b9b9b',
            'font-family': '"Nunito Sans", sans-serif',
          },
          children: [],
        },
      ],
    },
  },
];
