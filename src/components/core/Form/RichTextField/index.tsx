import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { BasicType, FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { findBlockNodeByIdx, getEditorRoot } from '@/utils/findBlockNodeByIdx';
import { getEditNode } from '@/utils/getEditNode';
import { onDrag } from '@/utils/onDrag';
import { isBoolean } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocalStorage } from 'react-use';
import { EnhancerProps } from '../enhancer';
import { InlineTextField } from '../index';
import { InlineTextProps } from '../InlineTextField';
import { TextToolbar } from './components/TextToolbar';
import styles from './index.module.scss';
import { getShadowRoot } from '@/utils/findBlockNodeByIdx';

const RichTextFieldItem = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) => {
  const { activeTab } = useActiveTab();
  const isActive = activeTab === ActiveTabKeys.EDIT;

  const { idx } = props;

  const container = findBlockNodeByIdx(idx);

  // useEffect(() => {
  //   const fixContainer = getEditorRoot();
  //   if (fixContainer) {
  //     const { left, top } = fixContainer.getBoundingClientRect();

  //     setPosition({
  //       left: left,
  //       top: top - 46,
  //     });
  //   }

  // }, [locationState]);

  const editorContainer = container && getEditNode(container);
  console.log(editorContainer);
  const textToolbar = useMemo(() => {
    if (editorContainer) {
      // 获取shadow内的节点 需要使用getShadowRoot
      const rootContainer = getShadowRoot().getElementById('shadow-container')!;
      const c = rootContainer.getBoundingClientRect();
      const { left, top } = editorContainer.getBoundingClientRect();
      return createPortal(
        <div
          className={styles.container}
          key={idx}
          style={{
            position: 'absolute',
            left: left - c.left - 25,
            top: top - c.top - 32 + rootContainer.scrollTop,
            transform: 'translate(0,-100%)',
            padding: '10px 12px',
            boxSizing: 'border-box',

            zIndex: 100,
            display: Boolean(isActive) ? undefined : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#41444d',
              height: '46px',
              width: '560px',
              left: 0,
              top: 0,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <TextToolbar container={editorContainer} onChange={() => { }} />
          </div>
        </div>,
        getShadowRoot().getElementById('shadow-container') as HTMLDivElement
      );
    }
  }, [idx, isActive, editorContainer]);

  return (
    <>
      <InlineTextField {...(props as any)} />
      {editorContainer && textToolbar}
    </>
  );
};

export const RichTextField = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) => {
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  if (isBoolean(focusBlock?.data.hidden) && focusBlock?.data.hidden || (focusBlock?.data.hidden === 'true')) return null;
  if (focusBlock?.type !== BasicType.TEXT) return null;
  return <RichTextFieldItem key={focusIdx} {...props} />;
};
