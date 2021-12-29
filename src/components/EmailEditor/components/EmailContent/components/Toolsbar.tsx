import React, { useContext, useState, useEffect } from 'react';

import { getIndexByIdx, getParentIdx, getSiblingIdx } from '@/utils/block';
import { classnames } from '@/utils/classnames';
import { transformToMjml } from '@/utils/transformToMjml';
import { Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import mjml from 'mjml-browser';
import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { Stack } from '@/components/UI/Stack';
import {
  ImageUploaderField,
  TextAreaField,
  TextField,
} from '@/components/core/Form';
import { BlocksMap } from '@/components/core/blocks';
import { BasicType } from '@/constants';
import { IBlock } from '@/typings';
import { UploaderServer } from '@/utils/Uploader';
const prefix = `<mjml>
<mj-head>
  <mj-attributes>
    <mj-all font-family="lucida Grande,Verdana,Microsoft YaHei" />
    <mj-text font-size="14px" />
    <mj-text color="#000000" />
    <mj-text line-height="1.7" />
    <mj-wrapper background-color="#ffffff" />
    <mj-section background-color="#ffffff" />
  </mj-attributes>
</mj-head>
<mj-body background-color="#efeeea" width="600px" css-class="mjml-body">
  <mj-wrapper padding="20px 0px 20px 0px" border="none" direction="ltr" text-align="center">
    <mj-section padding="20px 0px 20px 0px" background-repeat="repeat" background-size="auto" background-position="top center" border="none" direction="ltr" text-align="center">
      <mj-column padding="0px 0px 0px 0px" border="none" vertical-align="top">`

const afterFix = ` </mj-column>
</mj-section>
</mj-wrapper>
</mj-body>
</mjml>`
const columnBlock = BlocksMap.findBlockByType(BasicType.COLUMN);
const sectionBlock = BlocksMap.findBlockByType(BasicType.SECTION);

export function ToolsBar({ block }: { block: IBlock }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { onAddCollection } = useContext(EditorPropsContext);
  const {
    moveBlock,
    copyBlock,
    removeBlock,
    getBlock,
    focusBlock: focusBlockData,
    addBlock,
  } = useBlock();
  const { onUploadImage } = useContext(EditorPropsContext);
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const isPage = block.type === BasicType.PAGE;
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    label: '',
    helpText: '',
    thumbnail: '',
  });

  const isVerticalBlock = columnBlock.validParentType.some((item) =>
    block.validParentType.some((p) => p === item)
  );
  const isHorizontalBlock = sectionBlock.validParentType.some((item) =>
    block.validParentType.some((p) => p === item)
  );

  const handleMoveUp = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, -1));
  };

  const handleMoveDown = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, 1));
  };

  const handleCopy: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    copyBlock(focusIdx);
  };
  const emailToImage = async (content, onUploadImage: UploaderServer) => {
    const html2canvas = (await import('html2canvas')).default;
    const container = document.createElement('div');
    const parseHtml = transformToMjml({
      data: content,
      mode: 'production',
      context: content,
    });

    const parhtml = `${prefix}${parseHtml}${afterFix}`;
    container.style.width = '600px'
    container.innerHTML = mjml(parhtml, {
      beautify: true,
      validationLevel: 'soft',
    }).html;
    document.body.appendChild(container);

    const blob = await new Promise<any>((resolve) => {
      html2canvas(container, { useCORS: true }).then((canvas) =>
        canvas.toBlob(resolve, 'png', 0.1)
      );
    });

    const picture = await onUploadImage(blob);
    document.body.removeChild(container);
    return picture;
  };

  const handleAddToCollection = async () => {
    setModalVisible(true);
    setIsLoading(true);
    const current = getBlock(focusIdx);
    const picture = await emailToImage(current, onUploadImage as any);
    setInitialValues({ ...initialValues, thumbnail: picture });
    setIsLoading(false);
  };

  const handleDelete = () => {
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  const handleAddRows = () => {
    if (block.type === BasicType.WRAPPER) {
      const parentIdx = getParentIdx(focusIdx)!;
      addBlock({
        type: BasicType.WRAPPER,
        parentIdx: parentIdx,
        positionIndex: getIndexByIdx(focusIdx) + 1,
        payload: {
          children: sectionBlock.create({
            children: [columnBlock.create({})],
          }),
        },
      });
    } else {
      const parentIdx = getParentIdx(focusIdx)!;
      addBlock({
        type: BasicType.SECTION,
        parentIdx: parentIdx,
        positionIndex: getIndexByIdx(focusIdx) + 1,
        payload: {
          children: [columnBlock.create({})],
        },
      });
    }
  };
  const onSubmit = (values: {
    label: string;
    helpText: string;
    thumbnail: string;
  }) => {
    if (!values.label) return;
    const uuid = uuidv4();
    onAddCollection?.({
      label: values.label,
      helpText: values.helpText,
      data: focusBlockData!,
      thumbnail: values.thumbnail,
      id: uuid,
    });
    setModalVisible(false);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          fontSize: 14,
          zIndex: 3,
          color: '#000',
          width: '100%',
          pointerEvents: 'none',
          lineHeight: '22px',
        }}
      >
        <div
          style={{
            color: '#ffffff',
            transform: 'translateY(-100%)',
            display: 'flex',
            // justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              backgroundColor: '#1890ff',
              height: '22px',

              display: 'inline-flex',
              padding: '1px 5px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
            }}
          >
            {block.name}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(ev) => {
              ev.preventDefault();
            }}
            style={{
              display: isPage ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <ToolItem
              width={12}
              iconName="icon-back-parent"
              onClick={handleSelectParent}
            />
            <ToolItem iconName="icon-copy" onClick={handleCopy} />
            <ToolItem
              iconName="icon-collection"
              onClick={handleAddToCollection}
            />
            <ToolItem iconName="icon-delete" onClick={handleDelete} />
          </div>
        </div>
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <Modal
              visible={modalVisible}
              title="Add to collection"
              onOk={() => handleSubmit()}
              onCancel={() => setModalVisible(false)}
            >
              <Stack vertical>
                <Stack.Item />
                <TextField
                  label="Title"
                  name="label"
                  validate={(val: string) => {
                    if (!val) return 'Title required!';
                    return undefined;
                  }}
                />
                <TextAreaField label="Description" name="helpText" />
                <ImageUploaderField
                  parentLoading={isLoading}
                  label="Thusadmbnail"
                  hideText={true}
                  name="thumbnail"
                  uploadHandler={onUploadImage}
                />
              </Stack>
            </Modal>
          )}
        </Form>
      </div>

      {/* add row/ add column */}

      {/* {
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: 14,
            zIndex: 3,
            lineHeight: '22px',
            color: '#000',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {isVerticalBlock && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translate(100%,-50%)',
              }}
            >
              <ToolItem
                width={22}
                iconName='icon-add'
                onClick={handleAddColumn}
              />
            </div>
          )}
          {isHorizontalBlock && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '0',
                transform: 'translate(-50%, 100%)',
              }}
            >
              <ToolItem
                width={22}
                iconName='icon-add'
                onClick={handleAddRows}
              />
            </div>
          )}
        </div>
      } */}
    </>
  );
}

function ToolItem(props: {
  iconName: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  width?: number;
}) {
  return (
    <div
      onClick={props.onClick}
      style={{
        color: '#ffffff',
        backgroundColor: '#1890ff',
        height: 22,
        fontSize: props.width || 14,
        lineHeight: '22px',
        width: 22,
        display: 'flex',
        pointerEvents: 'auto',
        cursor: 'pointer',
        justifyContent: 'center',
      }}
      className={classnames('iconfont', props.iconName)}
    />
  );
}
