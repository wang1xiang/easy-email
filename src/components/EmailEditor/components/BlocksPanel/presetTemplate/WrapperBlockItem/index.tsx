import { IMAGE_LIST } from '@/assets/image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

export function WrapperBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.WRAPPER}
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
    thumbnail: IMAGE_LIST.IMAGE_56,
    payload: {},
  },
  {
    thumbnail: IMAGE_LIST.IMAGE_57,
    payload: {
      type: 'wrapper',
      data: {
        value: {},
      },
      attributes: {
        padding: '50px 30px',
        border: '1px solid #aaaaaa',
        direction: 'ltr',
        'text-align': 'center',
        'background-color': '#ffffff',
      },
      children: [
        {
          type: 'section',
          data: {
            value: {
              noWrap: false,
            },
          },
          attributes: {
            padding: '20px',
            'background-repeat': 'repeat',
            'background-size': 'auto',
            'background-position': 'top center',
            border: 'none',
            direction: 'ltr',
            'text-align': 'center',
            'border-top': '1px solid #aaaaaa',
            'border-left': '1px solid #aaaaaa',
            'border-right': '1px solid #aaaaaa',
          },
          children: [
            {
              type: 'column',
              data: {
                value: {},
              },
              attributes: {
                padding: '0px 0px 0px 0px',
                border: 'none',
                'vertical-align': 'top',
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
                    padding: '0',
                    src: IMAGE_LIST.IMAGE_58,
                  },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          type: 'section',
          data: {
            value: {
              noWrap: false,
            },
          },
          attributes: {
            padding: '20px',
            'background-repeat': 'repeat',
            'background-size': 'auto',
            'background-position': 'top center',
            border: 'none',
            direction: 'ltr',
            'text-align': 'center',
            'border-left': '1px solid #aaaaaa',
            'border-right': '1px solid #aaaaaa',
            'border-bottom': '1px solid #aaaaaa',
          },
          children: [
            {
              type: 'column',
              data: {
                value: {},
              },
              attributes: {
                padding: '0px 0px 0px 0px',
                border: '1px solid #dddddd',
                'vertical-align': 'top',
              },
              children: [
                {
                  type: 'text',
                  data: {
                    value: {
                      content: 'First line of text',
                    },
                  },
                  attributes: {
                    'font-size': '13px',
                    padding: '20px',
                    'line-height': 1,
                    align: 'left',
                  },
                  children: [],
                },
                {
                  type: 'divider',
                  data: {
                    value: {},
                  },
                  attributes: {
                    align: 'center',
                    'border-width': '1px',
                    'border-style': 'dashed',
                    'border-color': 'lightgrey',
                    padding: '0 20px',
                  },
                  children: [],
                },
                {
                  type: 'text',
                  data: {
                    value: {
                      content: 'Second line of text',
                    },
                  },
                  attributes: {
                    'font-size': '13px',
                    padding: '20px',
                    'line-height': 1,
                    align: 'left',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
