import React, { useMemo } from 'react';
import { NumberField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { TextStyle } from '@/components/UI/TextStyle';

export function Decoration() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle variation='strong' size='large'>
          Decoration
        </TextStyle>
        <TextField
          label='Border radius'
          name={`${focusIdx}.attributes.borderRadius`}
          inline
        />
        <TextField
          label='Border'
          name={`${focusIdx}.attributes.border`}
          inline
          alignment='center'
        />
        <NumberField
          label='Opacity'
          max={1}
          min={0}
          step={0.1}
          name={`${focusIdx}.attributes.opacity`}
          inline
          alignment='center'
        />
      </Stack>
    );
  }, [focusIdx]);
}
