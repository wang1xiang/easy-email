import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { BlockType } from '@/constants';
import { IBlockData } from '@/typings';
import { classnames } from '@/utils/classnames';
import { Popconfirm, Tag, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import styles from './index.module.scss';
import { Help } from '@/components/UI/Help';
import { Picture } from '@/components/UI/Picture';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';

type BlockIconProps = {
  id?: string;
  icon?: React.ReactElement;
  text: string;
  thumbnail?: string;
  helpText?: React.ReactNode;
  type: BlockType | string;
  payload?: Partial<IBlockData>;
};

export function BlockIcon(props: BlockIconProps) {
  const { onRemoveCollection } = useContext(EditorPropsContext);

  const removeable = Boolean(props.id);

  const onConfirm = () => {
    props.id && onRemoveCollection?.({ id: props.id });
  };

  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
      <div className={styles.baseComponent}>
        <Stack
          vertical
          alignment="center"
          distribution="center"
          spacing="extraTight"
        >
          <Stack.Item />
          <Stack.Item />
          <span className={styles.icon}>{props.icon}</span>
          <Stack spacing="tight">
            <h3
              title={props.text}
              className={classnames(
                styles.title,
                !props.icon && styles.largeTitle
              )}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                width: '100%',
              }}
            >
              {props.thumbnail ? (
                <Tooltip
                  title={(
                    <Stack>
                      <TextStyle>
                        {props.text}
                        {props.helpText && (
                          <>
                            &nbsp;
                            <Help
                              style={{ fontSize: 12 }}
                              title={props.helpText}
                            />
                          </>
                        )}
                      </TextStyle>
                    </Stack>
                  )}
                >
                  <Picture src={props.thumbnail} />
                </Tooltip>
              ) : (
                <TextStyle>
                  {props.text}
                  {props.helpText && (
                    <>
                      &nbsp;
                      <Help style={{ fontSize: 12 }} title={props.helpText} />
                    </>
                  )}
                </TextStyle>
              )}
            </h3>
            {removeable && (
              <Popconfirm
                title={`Are you want to remove "${props.text}"`}
                onConfirm={onConfirm}
                okText="Yes"
                cancelText="No"
              >
                <div className={styles.closeBtn}>
                  <CloseOutlined style={{ color: '#333' }} />
                </div>
              </Popconfirm>
            )}
          </Stack>
        </Stack>
      </div>
    </BlockAvatarWrapper>
  );
}
