import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { useActiveTab } from '@/hooks/useActiveTab';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { getEditNode } from '@/utils/getEditNode';
import { BasicType, FIXED_CONTAINER_ID } from '@/constants';
import { onDrag } from '@/utils/onDrag';
import { isBoolean } from 'lodash';
import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EnhancerProps } from '../enhancer';
import { InlineTextField } from '../index';
import { InlineTextProps } from '../InlineTextField';
import { TextToolbar } from './components/TextToolbar';

export function RichTextField(
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) {
  const { activeTab } = useActiveTab();
  const isActive = activeTab === ActiveTabKeys.EDIT;

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMove, setIsMove] = useState(false);
  const { idx } = props;

  const container = findBlockNodeByIdx(idx);

  useEffect(() => {
    if (container) {
      const { left, top } = container.getBoundingClientRect();

      setPosition({
        left,
        top: top - 16,
      });
    }
  }, [container]);

  const onChange = useCallback(() => { }, []);

  const editorContainer = container && getEditNode(container);
  const body = document.getElementById(FIXED_CONTAINER_ID) as HTMLDivElement;
  const textToolbar = useMemo(() => {
    if (!body) return false;
    const onMoveTextToolbar = (event: React.MouseEvent) => {
      setIsMove(true);
      onDrag({
        event: event as any,
        onMove(x, y) {
          setPosition({
            left: position.left + x,
            top: position.top + y,
          });
        },
        onEnd() {
          setIsMove(false);
        },
      });
    };

    return createPortal(
      <div
        key={idx}
        style={{
          position: 'fixed',
          ...position,
          transform: 'translate(0,-100%)',
          padding: 16,
          boxSizing: 'border-box',

          zIndex: 1000,
          transition: isMove ? undefined : 'all .3s',
          display: Boolean(isActive) ? undefined : 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#41444d',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            cursor: 'move',
          }}
          onMouseDown={onMoveTextToolbar}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <TextToolbar container={editorContainer} onChange={onChange} />
        </div>
      </div>,
      body
    );
  }, [editorContainer, body, isActive, isMove, onChange, position, idx]);

  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  if (isBoolean(focusBlock?.data.hidden) && focusBlock?.data.hidden || (focusBlock?.data.hidden === 'true')) return null;
  if (focusBlock?.type !== BasicType.TEXT) return null;
  return (
    <>
      <InlineTextField key={idx} {...(props as any)} />
      {editorContainer && body && textToolbar}
    </>
  );
}
