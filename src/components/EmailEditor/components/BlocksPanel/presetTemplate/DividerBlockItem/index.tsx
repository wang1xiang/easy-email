import { IDivider } from '@/components/core/blocks/basic/Divider';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';

const dividerList = [
  {
    'border-width': '2px',
    'border-style': 'solid',
    'border-color': 'lightgrey',
  },
  {
    'border-width': '2px',
    'border-style': 'dashed',
    'border-color': 'lightgrey',
  },
  {
    'border-width': '2px',
    'border-style': 'dotted',
    'border-color': 'lightgrey',
  },
];

export function DividerBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        <Stack.Item />
        <Stack.Item />
        {dividerList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.DIVIDER}
              payload={
                {
                  attributes: { ...item, padding: '10px 0px' },
                } as RecursivePartial<IDivider>
              }
            >
              <Stack alignment='center'>
                <Stack.Item fill>

                  <div
                    style={{
                      backgroundColor: '#fff',
                      padding: '10px 0px 10px 0px',
                    }}
                  >
                    <div
                      style={{
                        borderTopWidth: item['border-width'],
                        borderTopStyle: item['border-style'] as any,
                        borderTopColor: item['border-color'],

                        boxSizing: 'content-box',
                      }}
                    />
                  </div>

                </Stack.Item>
                <TextStyle>{item['border-style']}</TextStyle>
              </Stack>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}
